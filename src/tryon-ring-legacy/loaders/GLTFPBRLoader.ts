import {
    GLTFLoader,
    GLTF,
    Object3D,
    Mesh,
    Material,
    MeshStandardMaterial,
    Texture,
    TextureLoader,
    LoadingManager,
    Group,
    Box3,
    Vector3,
    Color
} from 'webgi'
import { AdvancedPBRMaterial } from '../materials/AdvancedPBRMaterial'

export interface GLTFLoadOptions {
    enablePBR?: boolean
    autoScale?: boolean
    targetSize?: number
    centerModel?: boolean
    enableIBL?: boolean
    optimizeTextures?: boolean
    generateLOD?: boolean
}

export interface MaterialEnhancement {
    type: 'metal' | 'gem' | 'diamond' | 'enamel'
    roughnessMultiplier?: number
    metalnessOverride?: number
    emissiveIntensity?: number
    iridescence?: number
    transmission?: number
}

/**
 * Advanced glTF 2.0 loader with Perfect Corp level PBR support
 * Handles jewelry-specific materials and optimizations
 */
export class GLTFPBRLoader {
    private loader: GLTFLoader
    private textureLoader: TextureLoader
    private loadingManager: LoadingManager
    
    // Cache for loaded models and textures
    private modelCache = new Map<string, GLTF>()
    private textureCache = new Map<string, Texture>()
    
    // Material enhancement rules
    private materialRules = new Map<string, MaterialEnhancement>()
    
    constructor() {
        this.loadingManager = new LoadingManager()
        this.setupLoadingManager()
        
        this.loader = new GLTFLoader(this.loadingManager)
        this.textureLoader = new TextureLoader(this.loadingManager)
        
        this.setupDefaultMaterialRules()
    }
    
    private setupLoadingManager() {
        this.loadingManager.onLoad = () => {
            console.log('GLTFPBRLoader: All resources loaded')
        }
        
        this.loadingManager.onProgress = (url, loaded, total) => {
            console.log(`GLTFPBRLoader: Loading ${url} - ${loaded}/${total}`)
        }
        
        this.loadingManager.onError = (url) => {
            console.error(`GLTFPBRLoader: Error loading ${url}`)
        }
    }
    
    private setupDefaultMaterialRules() {
        // Define enhancement rules for common jewelry materials
        this.materialRules.set('gold', {
            type: 'metal',
            roughnessMultiplier: 0.5,
            metalnessOverride: 1.0
        })
        
        this.materialRules.set('silver', {
            type: 'metal',
            roughnessMultiplier: 0.3,
            metalnessOverride: 1.0
        })
        
        this.materialRules.set('diamond', {
            type: 'diamond',
            roughnessMultiplier: 0.0,
            metalnessOverride: 0.0,
            transmission: 0.95,
            iridescence: 0.3
        })
        
        this.materialRules.set('gem', {
            type: 'gem',
            roughnessMultiplier: 0.1,
            metalnessOverride: 0.0,
            transmission: 0.8,
            iridescence: 0.2
        })
    }
    
    /**
     * Load glTF model with advanced PBR enhancements
     */
    public async loadGLTF(
        url: string, 
        options: GLTFLoadOptions = {}
    ): Promise<{ model: Object3D, gltf: GLTF, materials: AdvancedPBRMaterial[] }> {
        
        const cacheKey = `${url}_${JSON.stringify(options)}`
        
        // Check cache first
        if (this.modelCache.has(cacheKey)) {
            const cachedGltf = this.modelCache.get(cacheKey)!
            return {
                model: cachedGltf.scene.clone(),
                gltf: cachedGltf,
                materials: this.extractMaterials(cachedGltf.scene)
            }
        }
        
        try {
            const gltf = await this.loadGLTFFile(url)
            
            // Process and enhance the model
            const processedModel = await this.processModel(gltf, options)
            const enhancedMaterials = this.enhanceMaterials(gltf, options)
            
            // Cache the result
            this.modelCache.set(cacheKey, gltf)
            
            return {
                model: processedModel,
                gltf: gltf,
                materials: enhancedMaterials
            }
        } catch (error) {
            console.error('GLTFPBRLoader: Failed to load model:', error)
            throw error
        }
    }
    
    private async loadGLTFFile(url: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (gltf) => resolve(gltf),
                (progress) => {
                    console.log(`Loading progress: ${(progress.loaded / progress.total * 100)}%`)
                },
                (error) => reject(error)
            )
        })
    }
    
    private async processModel(gltf: GLTF, options: GLTFLoadOptions): Promise<Object3D> {
        const model = gltf.scene.clone()
        
        if (options.autoScale) {
            this.autoScaleModel(model, options.targetSize || 1.0)
        }
        
        if (options.centerModel) {
            this.centerModel(model)
        }
        
        if (options.optimizeTextures) {
            await this.optimizeTextures(model)
        }
        
        if (options.generateLOD) {
            this.generateLOD(model)
        }
        
        return model
    }
    
    private enhanceMaterials(gltf: GLTF, options: GLTFLoadOptions): AdvancedPBRMaterial[] {
        const enhancedMaterials: AdvancedPBRMaterial[] = []
        
        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                const materials = Array.isArray(child.material) ? child.material : [child.material]
                
                materials.forEach((material, index) => {
                    if (material instanceof MeshStandardMaterial) {
                        const enhanced = this.createEnhancedMaterial(material, options)
                        
                        if (Array.isArray(child.material)) {
                            child.material[index] = enhanced
                        } else {
                            child.material = enhanced
                        }
                        
                        enhancedMaterials.push(enhanced)
                    }
                })
            }
        })
        
        return enhancedMaterials
    }
    
    private createEnhancedMaterial(
        originalMaterial: MeshStandardMaterial, 
        options: GLTFLoadOptions
    ): AdvancedPBRMaterial {
        
        const enhanced = new AdvancedPBRMaterial({
            baseColor: originalMaterial.color,
            metallic: originalMaterial.metalness,
            roughness: originalMaterial.roughness,
            normalMap: originalMaterial.normalMap,
            metallicRoughnessMap: originalMaterial.metalnessMap,
            occlusionMap: originalMaterial.aoMap,
            emissiveMap: originalMaterial.emissiveMap,
            emissiveIntensity: originalMaterial.emissiveIntensity
        })
        
        // Copy all standard properties
        enhanced.name = originalMaterial.name
        enhanced.transparent = originalMaterial.transparent
        enhanced.opacity = originalMaterial.opacity
        enhanced.alphaTest = originalMaterial.alphaTest
        
        // Apply material enhancement rules
        this.applyMaterialRules(enhanced, originalMaterial.name)
        
        // Auto-detect jewelry type from material name
        const materialName = originalMaterial.name.toLowerCase()
        if (materialName.includes('gold')) {
            enhanced.configureForJewelryType('gold')
        } else if (materialName.includes('silver')) {
            enhanced.configureForJewelryType('silver')
        } else if (materialName.includes('diamond')) {
            enhanced.configureForJewelryType('diamond')
        } else if (materialName.includes('gem') || materialName.includes('ruby') || 
                   materialName.includes('sapphire') || materialName.includes('emerald')) {
            enhanced.configureForJewelryType('gem')
        }
        
        return enhanced
    }
    
    private applyMaterialRules(material: AdvancedPBRMaterial, materialName: string) {
        const name = materialName.toLowerCase()
        
        for (const [ruleName, rule] of this.materialRules) {
            if (name.includes(ruleName)) {
                if (rule.roughnessMultiplier !== undefined) {
                    material.roughness *= rule.roughnessMultiplier
                }
                if (rule.metalnessOverride !== undefined) {
                    material.metalness = rule.metalnessOverride
                }
                if (rule.transmission !== undefined) {
                    material.transmission = rule.transmission
                }
                if (rule.iridescence !== undefined) {
                    material.iridescence = rule.iridescence
                }
                break
            }
        }
    }
    
    private autoScaleModel(model: Object3D, targetSize: number) {
        const box = new Box3().setFromObject(model)
        const size = box.getSize(new Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        
        if (maxDim > 0) {
            const scale = targetSize / maxDim
            model.scale.setScalar(scale)
        }
    }
    
    private centerModel(model: Object3D) {
        const box = new Box3().setFromObject(model)
        const center = box.getCenter(new Vector3())
        model.position.sub(center)
    }
    
    private async optimizeTextures(model: Object3D) {
        const textures = new Set<Texture>()
        
        model.traverse((child) => {
            if (child instanceof Mesh) {
                const materials = Array.isArray(child.material) ? child.material : [child.material]
                
                materials.forEach((material) => {
                    if (material instanceof AdvancedPBRMaterial) {
                        if (material.map) textures.add(material.map)
                        if (material.normalMap) textures.add(material.normalMap)
                        if (material.roughnessMap) textures.add(material.roughnessMap)
                        if (material.metalnessMap) textures.add(material.metalnessMap)
                        if (material.aoMap) textures.add(material.aoMap)
                        if (material.emissiveMap) textures.add(material.emissiveMap)
                    }
                })
            }
        })
        
        // Optimize texture settings
        textures.forEach((texture) => {
            texture.generateMipmaps = true
            texture.anisotropy = 4 // Good balance between quality and performance
        })
    }
    
    private generateLOD(model: Object3D) {
        // TODO: Implement LOD generation for performance optimization
        // This would create lower-poly versions for distant viewing
        console.log('LOD generation not yet implemented')
    }
    
    private extractMaterials(model: Object3D): AdvancedPBRMaterial[] {
        const materials: AdvancedPBRMaterial[] = []
        
        model.traverse((child) => {
            if (child instanceof Mesh) {
                const childMaterials = Array.isArray(child.material) ? child.material : [child.material]
                childMaterials.forEach((material) => {
                    if (material instanceof AdvancedPBRMaterial) {
                        materials.push(material)
                    }
                })
            }
        })
        
        return materials
    }
    
    /**
     * Add custom material enhancement rule
     */
    public addMaterialRule(materialName: string, enhancement: MaterialEnhancement) {
        this.materialRules.set(materialName.toLowerCase(), enhancement)
    }
    
    /**
     * Clear all caches
     */
    public clearCache() {
        this.modelCache.clear()
        this.textureCache.clear()
    }
    
    /**
     * Preload model for faster access
     */
    public async preloadModel(url: string, options: GLTFLoadOptions = {}) {
        await this.loadGLTF(url, options)
    }
}