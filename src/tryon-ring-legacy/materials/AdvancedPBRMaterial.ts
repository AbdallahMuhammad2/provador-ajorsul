import {
    Color,
    MeshPhysicalMaterial,
    Texture,
    Vector3,
    CubeTexture,
    WebGLRenderer,
    Scene,
    Camera,
    Material,
    UniformsUtils,
    ShaderLib,
    ShaderMaterial,
    DoubleSide
} from 'webgi'

export interface PBRMaterialConfig {
    baseColor?: Color
    metallic?: number
    roughness?: number
    normalMap?: Texture
    metallicRoughnessMap?: Texture
    occlusionMap?: Texture
    emissiveMap?: Texture
    emissiveIntensity?: number
    clearcoat?: number
    clearcoatRoughness?: number
    ior?: number
    transmission?: number
    thickness?: number
    envMapIntensity?: number
    sheenColor?: Color
    sheenRoughness?: number
}

/**
 * Advanced PBR Material for jewelry rendering with Perfect Corp level quality
 * Supports glTF 2.0 specification with full PBR workflow
 */
export class AdvancedPBRMaterial extends MeshPhysicalMaterial {
    public iridescence: number = 0
    public iridescenceIOR: number = 1.3
    public iridescenceThicknessRange: [number, number] = [100, 400]
    
    // Advanced jewelry-specific properties
    public diamondRefraction: number = 2.42 // Diamond IOR
    public gemCut: 'brilliant' | 'emerald' | 'princess' | 'oval' = 'brilliant'
    public fireIntensity: number = 0.8
    public brilliance: number = 1.2
    
    // Dynamic lighting adaptation
    public adaptiveBrightness: boolean = true
    public environmentBlending: number = 0.8
    
    constructor(config: PBRMaterialConfig = {}) {
        super()
        
        this.setupBasePBR(config)
        this.setupAdvancedFeatures()
        this.setupJewelrySpecific()
    }
    
    private setupBasePBR(config: PBRMaterialConfig) {
        // Base PBR setup
        this.color = config.baseColor || new Color(0xffffff)
        this.metalness = config.metallic ?? 0.8
        this.roughness = config.roughness ?? 0.1
        
        // Maps
        if (config.normalMap) this.normalMap = config.normalMap
        if (config.metallicRoughnessMap) {
            this.metalnessMap = config.metallicRoughnessMap
            this.roughnessMap = config.metallicRoughnessMap
        }
        if (config.occlusionMap) this.aoMap = config.occlusionMap
        if (config.emissiveMap) {
            this.emissiveMap = config.emissiveMap
            this.emissive = new Color(0xffffff)
            this.emissiveIntensity = config.emissiveIntensity ?? 0.1
        }
        
        // Physical properties for jewelry
        this.clearcoat = config.clearcoat ?? 1.0
        this.clearcoatRoughness = config.clearcoatRoughness ?? 0.1
        this.ior = config.ior ?? 1.5
        this.transmission = config.transmission ?? 0.0
        this.thickness = config.thickness ?? 0.5
        
        // Enhanced reflections
        this.envMapIntensity = config.envMapIntensity ?? 2.0
        this.reflectivity = 0.98
        
        // Sheen for fabric-like materials (leather boxes, etc)
        if (config.sheenColor) {
            this.sheenColor = config.sheenColor
            this.sheenRoughness = config.sheenRoughness ?? 0.1
        }
    }
    
    private setupAdvancedFeatures() {
        // Enable advanced features
        this.transparent = false
        this.side = DoubleSide
        this.flatShading = false
        
        // Enhanced shadow receiving
        this.shadowSide = DoubleSide
        
        // Vertex colors for advanced coloring
        this.vertexColors = false
        
        // Precision for jewelry
        this.precision = 'highp'
    }
    
    private setupJewelrySpecific() {
        // Iridescence for special effects
        this.iridescence = 0.1
        this.iridescenceIOR = 1.3
        this.iridescenceThicknessRange = [100, 400]
        
        // Set material type for shaders
        this.userData.materialType = 'jewelry'
        this.userData.requiresEnvMap = true
        this.userData.requiresIBL = true
    }
    
    /**
     * Configure material for specific jewelry types
     */
    public configureForJewelryType(type: 'gold' | 'silver' | 'platinum' | 'diamond' | 'gem') {
        switch (type) {
            case 'gold':
                this.color.setHex(0xFFD700)
                this.metalness = 1.0
                this.roughness = 0.05
                this.ior = 0.47
                break
                
            case 'silver':
                this.color.setHex(0xC0C0C0)
                this.metalness = 1.0
                this.roughness = 0.02
                this.ior = 0.155
                break
                
            case 'platinum':
                this.color.setHex(0xE5E4E2)
                this.metalness = 1.0
                this.roughness = 0.03
                this.ior = 2.33
                break
                
            case 'diamond':
                this.color.setHex(0xffffff)
                this.metalness = 0.0
                this.roughness = 0.0
                this.ior = this.diamondRefraction
                this.transmission = 0.95
                this.thickness = 0.5
                this.clearcoat = 1.0
                this.clearcoatRoughness = 0.0
                this.iridescence = 0.3
                break
                
            case 'gem':
                this.metalness = 0.0
                this.roughness = 0.0
                this.ior = 1.76 // Average for gems
                this.transmission = 0.8
                this.thickness = 0.3
                this.clearcoat = 1.0
                this.iridescence = 0.2
                break
        }
        
        this.needsUpdate = true
    }
    
    /**
     * Update material based on lighting conditions
     */
    public updateForLighting(scene: Scene, camera: Camera) {
        if (!this.adaptiveBrightness) return
        
        // Analyze scene lighting and adapt material properties
        const lights = scene.children.filter(child => 
            child.type.includes('Light') && child.visible
        )
        
        let totalIntensity = 0
        lights.forEach(light => {
            if ('intensity' in light) {
                totalIntensity += (light as any).intensity
            }
        })
        
        // Adapt based on lighting intensity
        const adaptationFactor = Math.min(totalIntensity / 3.0, 2.0)
        this.envMapIntensity = (this.envMapIntensity || 1.0) * adaptationFactor
        
        this.needsUpdate = true
    }
    
    /**
     * Set environment map with proper intensity
     */
    public setEnvironmentMap(envMap: CubeTexture | Texture) {
        this.envMap = envMap
        this.needsUpdate = true
    }
    
    /**
     * Clone with all advanced properties
     */
    public clone(): AdvancedPBRMaterial {
        const cloned = new AdvancedPBRMaterial()
        cloned.copy(this)
        
        // Copy custom properties
        cloned.iridescence = this.iridescence
        cloned.iridescenceIOR = this.iridescenceIOR
        cloned.iridescenceThicknessRange = [...this.iridescenceThicknessRange]
        cloned.diamondRefraction = this.diamondRefraction
        cloned.gemCut = this.gemCut
        cloned.fireIntensity = this.fireIntensity
        cloned.brilliance = this.brilliance
        cloned.adaptiveBrightness = this.adaptiveBrightness
        cloned.environmentBlending = this.environmentBlending
        
        return cloned
    }
}