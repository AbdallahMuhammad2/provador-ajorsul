import {
    CubeTexture,
    CubeTextureLoader,
    EquirectangularReflectionMapping,
    Texture,
    TextureLoader,
    PMREMGenerator,
    WebGLRenderer,
    Scene,
    Color,
    AmbientLight,
    DirectionalLight,
    Vector3,
    SpotLight,
    HemisphereLight,
    Object3D
} from 'webgi'

export interface IBLConfig {
    environmentMap?: string | CubeTexture | Texture
    intensity?: number
    backgroundBlur?: number
    backgroundIntensity?: number
    enableDynamicLighting?: boolean
    adaptToAmbient?: boolean
    lightProbeIntensity?: number
}

export interface LightingPreset {
    name: string
    environmentMap: string
    intensity: number
    ambientColor: Color
    directionalColor: Color
    directionalIntensity: number
    directionalPosition: Vector3
    shadowIntensity: number
}

/**
 * Advanced IBL (Image Based Lighting) Manager for photorealistic jewelry rendering
 * Matches Perfect Corp's lighting quality with dynamic adaptation
 */
export class IBLManager {
    private renderer: WebGLRenderer
    private pmremGenerator: PMREMGenerator
    private cubeTextureLoader: CubeTextureLoader
    private textureLoader: TextureLoader
    
    // Current lighting setup
    private currentEnvironmentMap: CubeTexture | Texture | null = null
    private currentIntensity: number = 1.0
    private backgroundTexture: CubeTexture | Texture | null = null
    
    // Dynamic lighting
    private ambientLight: AmbientLight
    private keyLight: DirectionalLight
    private fillLight: DirectionalLight
    private rimLight: SpotLight
    private environmentLight: HemisphereLight
    
    // Lighting presets
    private presets = new Map<string, LightingPreset>()
    
    // Cache for processed environment maps
    private envMapCache = new Map<string, CubeTexture>()
    
    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
        this.pmremGenerator = new PMREMGenerator(renderer)
        this.cubeTextureLoader = new CubeTextureLoader()
        this.textureLoader = new TextureLoader()
        
        this.setupLights()
        this.setupPresets()
    }
    
    private setupLights() {
        // Ambient lighting for overall brightness
        this.ambientLight = new AmbientLight(0x404040, 0.3)
        
        // Key light (main directional)
        this.keyLight = new DirectionalLight(0xffffff, 1.0)
        this.keyLight.position.set(5, 10, 5)
        this.keyLight.castShadow = true
        this.keyLight.shadow.mapSize.setScalar(2048)
        this.keyLight.shadow.camera.near = 0.1
        this.keyLight.shadow.camera.far = 50
        this.keyLight.shadow.camera.left = -10
        this.keyLight.shadow.camera.right = 10
        this.keyLight.shadow.camera.top = 10
        this.keyLight.shadow.camera.bottom = -10
        
        // Fill light (softer, opposite side)
        this.fillLight = new DirectionalLight(0xffffff, 0.4)
        this.fillLight.position.set(-3, 5, -3)
        
        // Rim light (edge highlighting)
        this.rimLight = new SpotLight(0xffffff, 0.8, 30, Math.PI * 0.1, 0.5, 2)
        this.rimLight.position.set(0, 10, -10)
        
        // Environment hemisphere light
        this.environmentLight = new HemisphereLight(0x87CEEB, 0x362D1D, 0.5)
    }
    
    private setupPresets() {
        // Studio lighting preset
        this.presets.set('studio', {
            name: 'Professional Studio',
            environmentMap: '/assets/hdri/studio.hdr',
            intensity: 1.2,
            ambientColor: new Color(0x404040),
            directionalColor: new Color(0xffffff),
            directionalIntensity: 1.0,
            directionalPosition: new Vector3(5, 10, 5),
            shadowIntensity: 0.3
        })
        
        // Jewelry store preset
        this.presets.set('jewelry-store', {
            name: 'Jewelry Store',
            environmentMap: '/assets/hdri/jewelry-store.hdr',
            intensity: 1.5,
            ambientColor: new Color(0x606060),
            directionalColor: new Color(0xffffff),
            directionalIntensity: 0.8,
            directionalPosition: new Vector3(3, 8, 4),
            shadowIntensity: 0.2
        })
        
        // Natural daylight preset
        this.presets.set('daylight', {
            name: 'Natural Daylight',
            environmentMap: '/assets/hdri/daylight.hdr',
            intensity: 1.0,
            ambientColor: new Color(0x87CEEB),
            directionalColor: new Color(0xffffff),
            directionalIntensity: 1.2,
            directionalPosition: new Vector3(2, 10, 3),
            shadowIntensity: 0.4
        })
        
        // Luxury boutique preset
        this.presets.set('luxury', {
            name: 'Luxury Boutique',
            environmentMap: '/assets/hdri/luxury-interior.hdr',
            intensity: 1.3,
            ambientColor: new Color(0x2D2D2D),
            directionalColor: new Color(0xffffff),
            directionalIntensity: 0.9,
            directionalPosition: new Vector3(4, 8, 6),
            shadowIntensity: 0.25
        })
    }
    
    /**
     * Initialize IBL with configuration
     */
    public async initialize(scene: Scene, config: IBLConfig = {}): Promise<void> {
        try {
            // Load and setup environment map
            if (config.environmentMap) {
                await this.setEnvironmentMap(config.environmentMap, config.intensity)
            } else {
                // Use default studio preset
                await this.applyPreset('studio')
            }
            
            // Add lights to scene
            this.addLightsToScene(scene)
            
            // Configure background
            if (config.backgroundIntensity !== undefined) {
                this.setBackgroundIntensity(config.backgroundIntensity)
            }
            
            console.log('IBLManager: Initialized successfully')
        } catch (error) {
            console.error('IBLManager: Failed to initialize:', error)
            throw error
        }
    }
    
    /**
     * Set environment map from various sources
     */
    public async setEnvironmentMap(
        source: string | CubeTexture | Texture, 
        intensity: number = 1.0
    ): Promise<void> {
        
        let envMap: CubeTexture | Texture
        
        if (typeof source === 'string') {
            // Check cache first
            if (this.envMapCache.has(source)) {
                envMap = this.envMapCache.get(source)!
            } else {
                envMap = await this.loadEnvironmentMap(source)
                this.envMapCache.set(source, envMap as CubeTexture)
            }
        } else {
            envMap = source
        }
        
        // Process with PMREM for proper mipmap generation
        const processedEnvMap = this.pmremGenerator.fromCubemap(envMap as CubeTexture).texture
        
        this.currentEnvironmentMap = processedEnvMap
        this.currentIntensity = intensity
        
        // Update all materials in the scene
        this.updateSceneMaterials()
    }
    
    private async loadEnvironmentMap(url: string): Promise<CubeTexture | Texture> {
        if (url.endsWith('.hdr')) {
            // Load HDR environment map
            return this.loadHDREnvironmentMap(url)
        } else if (url.includes('cube')) {
            // Load cube map
            return this.loadCubeMap(url)
        } else {
            // Load equirectangular map
            return this.loadEquirectangularMap(url)
        }
    }
    
    private async loadHDREnvironmentMap(url: string): Promise<Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {
                    texture.mapping = EquirectangularReflectionMapping
                    resolve(texture)
                },
                undefined,
                reject
            )
        })
    }
    
    private async loadCubeMap(baseUrl: string): Promise<CubeTexture> {
        const urls = [
            `${baseUrl}/px.jpg`, `${baseUrl}/nx.jpg`,
            `${baseUrl}/py.jpg`, `${baseUrl}/ny.jpg`,
            `${baseUrl}/pz.jpg`, `${baseUrl}/nz.jpg`
        ]
        
        return new Promise((resolve, reject) => {
            this.cubeTextureLoader.load(urls, resolve, undefined, reject)
        })
    }
    
    private async loadEquirectangularMap(url: string): Promise<Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {
                    texture.mapping = EquirectangularReflectionMapping
                    resolve(texture)
                },
                undefined,
                reject
            )
        })
    }
    
    /**
     * Apply lighting preset
     */
    public async applyPreset(presetName: string): Promise<void> {
        const preset = this.presets.get(presetName)
        if (!preset) {
            throw new Error(`Preset '${presetName}' not found`)
        }
        
        // Load environment map
        await this.setEnvironmentMap(preset.environmentMap, preset.intensity)
        
        // Update lights
        this.ambientLight.color = preset.ambientColor
        this.keyLight.color = preset.directionalColor
        this.keyLight.intensity = preset.directionalIntensity
        this.keyLight.position.copy(preset.directionalPosition)
        
        // Update shadow intensity
        this.keyLight.shadow.opacity = preset.shadowIntensity
        
        console.log(`Applied preset: ${preset.name}`)
    }
    
    /**
     * Adapt lighting based on ambient conditions
     */
    public adaptToAmbientLighting(ambientBrightness: number) {
        // Adapt environment intensity
        const adaptedIntensity = this.currentIntensity * (1 + ambientBrightness * 0.5)
        
        // Adapt key light
        this.keyLight.intensity = Math.min(1.5, 0.8 + ambientBrightness * 0.7)
        
        // Adapt ambient light
        this.ambientLight.intensity = Math.min(0.6, 0.2 + ambientBrightness * 0.4)
        
        // Update materials
        this.updateSceneMaterials()
    }
    
    /**
     * Set background intensity
     */
    public setBackgroundIntensity(intensity: number) {
        if (this.currentEnvironmentMap) {
            // Update scene background if it's using the environment map
            this.backgroundTexture = this.currentEnvironmentMap
            // TODO: Apply intensity to background
        }
    }
    
    /**
     * Add all lights to scene
     */
    private addLightsToScene(scene: Scene) {
        scene.add(this.ambientLight)
        scene.add(this.keyLight)
        scene.add(this.fillLight)
        scene.add(this.rimLight)
        scene.add(this.environmentLight)
        
        // Set environment map as scene background
        if (this.currentEnvironmentMap) {
            scene.environment = this.currentEnvironmentMap
            scene.background = this.currentEnvironmentMap
        }
    }
    
    /**
     * Update all materials in scene with current environment map
     */
    private updateSceneMaterials() {
        // This would be called with the current scene to update materials
        // Implementation depends on how materials are tracked
    }
    
    /**
     * Update materials for specific object
     */
    public updateObjectMaterials(object: Object3D) {
        object.traverse((child) => {
            if (child instanceof Object3D && 'material' in child) {
                const materials = Array.isArray(child.material) ? child.material : [child.material]
                
                materials.forEach((material: any) => {
                    if (material && 'envMap' in material) {
                        material.envMap = this.currentEnvironmentMap
                        material.envMapIntensity = this.currentIntensity
                        material.needsUpdate = true
                    }
                })
            }
        })
    }
    
    /**
     * Get available presets
     */
    public getAvailablePresets(): string[] {
        return Array.from(this.presets.keys())
    }
    
    /**
     * Add custom preset
     */
    public addPreset(name: string, preset: LightingPreset) {
        this.presets.set(name, preset)
    }
    
    /**
     * Cleanup resources
     */
    public dispose() {
        this.pmremGenerator.dispose()
        this.envMapCache.clear()
        
        // Remove lights from their parent scenes
        this.ambientLight.removeFromParent()
        this.keyLight.removeFromParent()
        this.fillLight.removeFromParent()
        this.rimLight.removeFromParent()
        this.environmentLight.removeFromParent()
    }
}