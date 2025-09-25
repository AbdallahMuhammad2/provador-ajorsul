import {
    ViewerApp,
    Object3D,
    PerspectiveCamera,
    Scene,
    uiFolder,
    uiButton,
    uiToggle,
    uiSlider,
    onChange2,
    serialize
} from 'webgi'

// Import all advanced modules
import { RingTryonPlugin } from './utils/RingTryonPlugin'
import { AdvancedPBRMaterial } from './materials/AdvancedPBRMaterial'
import { GLTFPBRLoader } from './loaders/GLTFPBRLoader'
import { IBLManager } from './lighting/IBLManager'
import { MultiRingManager } from './multi-ring/MultiRingManager'
import { AutoFingerSizing } from './ai/AutoFingerSizing'
import { Image2D3DConverter } from './conversion/Image2D3DConverter'
import { WebWorkerManager } from './performance/WebWorkerManager'
import { VideoRecordingManager } from './recording/VideoRecordingManager'
import { SideBySideComparison } from './comparison/SideBySideComparison'
import { Finger } from './utils/handLandmarkUtils'

/**
 * Perfect Corp Level Ring Try-On Plugin
 * Combines all advanced features for enterprise-grade virtual ring try-on
 */
@uiFolder('Perfect Corp Ring Try-On')
export class PerfectCorpRingTryonPlugin extends RingTryonPlugin {
    public static readonly PluginType = 'PerfectCorpRingTryonPlugin'
    
    // Advanced modules
    private gltfLoader: GLTFPBRLoader
    private iblManager: IBLManager
    private multiRingManager: MultiRingManager
    private autoSizing: AutoFingerSizing
    private image2d3d: Image2D3DConverter
    private workerManager: WebWorkerManager
    private recordingManager: VideoRecordingManager
    private comparison: SideBySideComparison
    
    // Advanced settings
    @uiToggle('Enable Multi-Ring Mode')
    @serialize()
    enableMultiRing: boolean = false
    
    @uiToggle('Auto Finger Sizing')
    @serialize()
    enableAutoSizing: boolean = true
    
    @uiToggle('Advanced PBR Rendering')
    @serialize()
    enableAdvancedPBR: boolean = true
    
    @uiSlider('PBR Quality', [0.5, 2.0], 0.1)
    @onChange2(PerfectCorpRingTryonPlugin.prototype.updatePBRQuality)
    @serialize()
    pbrQuality: number = 1.0
    
    @uiToggle('Enable Recording')
    @serialize()
    enableRecording: boolean = true
    
    @uiToggle('Enable Comparison Mode')
    @serialize()
    enableComparison: boolean = false
    
    @uiSlider('Performance Mode', [1, 4], 1)
    @serialize()
    performanceMode: number = 3 // 1=Low, 2=Medium, 3=High, 4=Ultra
    
    // IBL Controls
    @uiButton('Studio Lighting')
    applyStudioLighting = () => this.iblManager?.applyPreset('studio')
    
    @uiButton('Jewelry Store Lighting')
    applyJewelryStoreLighting = () => this.iblManager?.applyPreset('jewelry-store')
    
    @uiButton('Natural Daylight')
    applyDaylightLighting = () => this.iblManager?.applyPreset('daylight')
    
    @uiButton('Luxury Boutique')
    applyLuxuryLighting = () => this.iblManager?.applyPreset('luxury')
    
    // Recording Controls
    @uiButton('Start Recording')
    startRecording = () => this.handleStartRecording()
    
    @uiButton('Stop Recording')
    stopRecording = () => this.handleStopRecording()
    
    @uiButton('Take Screenshot')
    takeScreenshot = () => this.handleTakeScreenshot()
    
    // Comparison Controls
    @uiButton('Add to Comparison')
    addToComparison = () => this.handleAddToComparison()
    
    @uiButton('Clear Comparison')
    clearComparison = () => this.comparison?.clearAll()
    
    // Multi-ring Controls
    @uiButton('Add Ring to Index Finger')
    addRingToIndex = () => this.addRingToFinger(Finger.Index)
    
    @uiButton('Add Ring to Middle Finger')
    addRingToMiddle = () => this.addRingToFinger(Finger.Middle)
    
    @uiButton('Add Ring to Pinky')
    addRingToPinky = () => this.addRingToFinger(Finger.Pinky)
    
    // 2D-to-3D Conversion
    @uiButton('Convert Image to 3D')
    convertImage2D3D = () => this.handleImageConversion()
    
    // Performance status
    private performanceStats = {
        fps: 0,
        renderTime: 0,
        memoryUsage: 0,
        activeRings: 0
    }
    
    constructor() {
        super()
        this.initializeAdvancedModules()
    }
    
    private initializeAdvancedModules() {
        // Initialize loaders and managers
        this.gltfLoader = new GLTFPBRLoader()
        this.image2d3d = new Image2D3DConverter()
        this.workerManager = new WebWorkerManager()
    }
    
    protected async _start(): Promise<void> {
        console.log('PerfectCorpRingTryonPlugin: Starting advanced ring try-on...')
        
        // Initialize base functionality
        await super._start()
        
        // Initialize advanced modules
        await this.initializeAdvancedFeatures()
        
        console.log('PerfectCorpRingTryonPlugin: All systems ready!')
    }
    
    private async initializeAdvancedFeatures() {
        // Initialize IBL Manager
        this.iblManager = new IBLManager(this._viewer!.renderer.rendererObject)
        await this.iblManager.initialize(this._viewer!.scene, {
            environmentMap: '/assets/hdri/studio.hdr',
            intensity: 1.2,
            enableDynamicLighting: true
        })
        
        // Initialize Multi-Ring Manager
        this.multiRingManager = new MultiRingManager()
        this._viewer!.scene.add(this.multiRingManager.getRingGroup())
        
        // Initialize Auto Sizing
        this.autoSizing = new AutoFingerSizing()
        
        // Initialize Recording Manager
        this.recordingManager = new VideoRecordingManager(
            this._viewer!.renderer.rendererObject,
            this._viewer!.scene,
            this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera
        )
        
        this.setupRecordingCallbacks()
        
        // Initialize Comparison System
        this.comparison = new SideBySideComparison(
            this._viewer!.scene,
            this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera,
            this._viewer!.renderer.rendererObject
        )
        
        this.setupComparisonCallbacks()
        
        // Apply performance optimizations
        this.applyPerformanceOptimizations()
    }
    
    private setupRecordingCallbacks() {
        this.recordingManager.setCallbacks({
            onStart: () => {
                console.log('Recording started')
                this.dispatchEvent({ type: 'recording-start' })
            },
            onStop: (blob, stats) => {
                console.log('Recording stopped:', stats)
                this.dispatchEvent({ type: 'recording-stop', blob, stats })
            },
            onError: (error) => {
                console.error('Recording error:', error)
                this.dispatchEvent({ type: 'recording-error', error })
            }
        })
    }
    
    private setupComparisonCallbacks() {
        this.comparison.setCallbacks({
            onItemSelect: (item, index) => {
                console.log(`Selected comparison item: ${item.name}`)
                this.dispatchEvent({ type: 'comparison-select', item, index })
            },
            onComparisonUpdate: (state) => {
                this.dispatchEvent({ type: 'comparison-update', state })
            }
        })
    }
    
    private applyPerformanceOptimizations() {
        const mode = this.performanceMode
        
        // Adjust quality settings based on performance mode
        switch (mode) {
            case 1: // Low
                this.pbrQuality = 0.5
                this.segmenterModelMinConfidence = 0.3
                break
            case 2: // Medium
                this.pbrQuality = 0.8
                this.segmenterModelMinConfidence = 0.25
                break
            case 3: // High
                this.pbrQuality = 1.2
                this.segmenterModelMinConfidence = 0.2
                break
            case 4: // Ultra
                this.pbrQuality = 2.0
                this.segmenterModelMinConfidence = 0.15
                break
        }
    }
    
    /**
     * Load ring model with advanced PBR materials
     */
    public async loadAdvancedRingModel(url: string): Promise<Object3D> {
        try {
            console.log('Loading advanced ring model:', url)
            
            const { model, materials } = await this.gltfLoader.loadGLTF(url, {
                enablePBR: this.enableAdvancedPBR,
                autoScale: true,
                targetSize: 1.0,
                centerModel: true,
                enableIBL: true,
                optimizeTextures: true
            })
            
            // Apply IBL to materials
            materials.forEach(material => {
                this.iblManager.updateObjectMaterials(model)
            })
            
            // Replace existing model
            if (this.modelRoot) {
                this._viewer!.scene.remove(this.modelRoot)
            }
            
            this.modelRoot = model
            this._viewer!.scene.add(model)
            
            console.log('Advanced ring model loaded successfully')
            this.dispatchEvent({ type: 'model-loaded', model, materials })
            
            return model
            
        } catch (error) {
            console.error('Failed to load advanced ring model:', error)
            throw error
        }
    }
    
    /**
     * Convert 2D image to 3D ring
     */
    public async convertImageTo3D(imageUrl: string): Promise<Object3D> {
        try {
            console.log('Converting 2D image to 3D:', imageUrl)
            
            const { model, materials, analysis } = await this.image2d3d.convertImage(imageUrl)
            
            // Apply advanced PBR if enabled
            if (this.enableAdvancedPBR) {
                materials.forEach(material => {
                    this.iblManager.updateObjectMaterials(model)
                })
            }
            
            console.log('2D-to-3D conversion completed:', analysis)
            this.dispatchEvent({ type: '2d-to-3d-complete', model, materials, analysis })
            
            return model
            
        } catch (error) {
            console.error('2D-to-3D conversion failed:', error)
            throw error
        }
    }
    
    private async handleImageConversion() {
        // This would typically open a file dialog
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const url = URL.createObjectURL(file)
                try {
                    await this.convertImageTo3D(url)
                } finally {
                    URL.revokeObjectURL(url)
                }
            }
        }
        
        input.click()
    }
    
    private addRingToFinger(finger: Finger) {
        if (!this.enableMultiRing || !this.modelRoot) return
        
        this.multiRingManager.addRing({
            model: this.modelRoot.clone(),
            finger,
            enabled: true,
            scale: 1.0,
            materials: [],
            priority: 1
        })
        
        console.log(`Added ring to ${Finger[finger]} finger`)
    }
    
    private async handleStartRecording() {
        if (!this.enableRecording) return
        
        try {
            await this.recordingManager.startRecording({
                quality: this.performanceMode >= 3 ? 'high' : 'medium',
                format: 'webm',
                fps: 30,
                includeAudio: false,
                watermark: {
                    text: 'Virtual Ring Try-On',
                    position: 'bottom-right',
                    opacity: 0.7
                }
            })
        } catch (error) {
            console.error('Failed to start recording:', error)
        }
    }
    
    private async handleStopRecording() {
        if (!this.recordingManager.getStatus().isRecording) return
        
        try {
            await this.recordingManager.stopRecording()
            await this.recordingManager.downloadRecording('ring-tryon')
        } catch (error) {
            console.error('Failed to stop recording:', error)
        }
    }
    
    private handleTakeScreenshot() {
        try {
            const blob = this.recordingManager.takeScreenshot()
            const url = URL.createObjectURL(blob)
            
            const a = document.createElement('a')
            a.href = url\n            a.download = 'ring-tryon-screenshot.png'
            a.click()
            
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to take screenshot:', error)
        }
    }
    
    private handleAddToComparison() {
        if (!this.enableComparison || !this.modelRoot) return
        
        const item = {\n            id: `ring_${Date.now()}`,
            name: `Ring ${this.comparison.getStats().itemCount + 1}`,
            model: this.modelRoot,
            materials: [],\n            metadata: {\n                material: 'Gold',\n                style: 'Modern',\n                size: '7'\n            }\n        }\n        \n        this.comparison.addItem(item)\n        console.log('Added ring to comparison')\n    }\n    \n    protected _sync3DWithResult(time: number): void {\n        // Call parent implementation\n        super._sync3DWithResult(time)\n        \n        if (!this.running || !this.mpHand) return\n        \n        // Update advanced modules\n        this.updateAdvancedModules()\n        \n        // Update performance stats\n        this.updatePerformanceStats()\n    }\n    \n    private updateAdvancedModules() {\n        // Update multi-ring manager\n        if (this.enableMultiRing) {\n            this.multiRingManager.updateRings(this.mpHand)\n        }\n        \n        // Update auto sizing\n        if (this.enableAutoSizing) {\n            const measurement = this.autoSizing.analyzeFinger(\n                this.mpHand, \n                Finger.Ring, \n                this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera\n            )\n            \n            if (measurement) {\n                this.dispatchEvent({ type: 'finger-measurement', measurement })\n            }\n        }\n        \n        // Update comparison\n        if (this.enableComparison && this.comparison.getStats().itemCount > 0) {\n            this.comparison.updateComparison(this.mpHand)\n        }\n        \n        // Update IBL based on ambient conditions\n        if (this.iblManager) {\n            const ambientBrightness = this.calculateAmbientBrightness()\n            this.iblManager.adaptToAmbientLighting(ambientBrightness)\n        }\n    }\n    \n    private calculateAmbientBrightness(): number {\n        // Simple ambient brightness calculation based on hand visibility\n        const confidence = this.handDetector?.success ? 1.0 : 0.0\n        const distance = this.mpHand.distance\n        \n        // Closer hands in well-lit conditions\n        return Math.min(1.0, confidence * (30 / Math.max(distance, 10)))\n    }\n    \n    private updatePerformanceStats() {\n        this.performanceStats.activeRings = this.enableMultiRing ? \n            this.multiRingManager.getStats().enabledRings : 1\n        \n        // Update FPS (simplified)\n        this.performanceStats.fps = Math.round(1000 / (performance.now() - (this as any).lastFrameTime || 16))\n        ;(this as any).lastFrameTime = performance.now()\n    }\n    \n    private updatePBRQuality() {\n        // Update all PBR materials quality\n        if (this.modelRoot) {\n            this.modelRoot.traverse(child => {\n                if (child instanceof Object3D && 'material' in child) {\n                    const materials = Array.isArray(child.material) ? child.material : [child.material]\n                    \n                    materials.forEach((material: any) => {\n                        if (material instanceof AdvancedPBRMaterial) {\n                            material.envMapIntensity = this.pbrQuality\n                            material.needsUpdate = true\n                        }\n                    })\n                }\n            })\n        }\n    }\n    \n    /**\n     * Get comprehensive performance statistics\n     */\n    public getPerformanceStats() {\n        return {\n            ...this.performanceStats,\n            workerStats: this.workerManager.getStats(),\n            comparisonStats: this.comparison?.getStats(),\n            multiRingStats: this.multiRingManager?.getStats(),\n            recordingStatus: this.recordingManager?.getStatus()\n        }\n    }\n    \n    /**\n     * Export configuration for sharing or saving\n     */\n    public exportConfiguration() {\n        return {\n            settings: {\n                enableMultiRing: this.enableMultiRing,\n                enableAutoSizing: this.enableAutoSizing,\n                enableAdvancedPBR: this.enableAdvancedPBR,\n                pbrQuality: this.pbrQuality,\n                performanceMode: this.performanceMode\n            },\n            comparison: this.comparison?.exportState(),\n            multiRing: this.multiRingManager?.getStats(),\n            autoSizing: this.autoSizing?.getStats()\n        }\n    }\n    \n    protected async _stop(): Promise<void> {\n        console.log('PerfectCorpRingTryonPlugin: Stopping...')\n        \n        // Stop recording if active\n        if (this.recordingManager?.getStatus().isRecording) {\n            await this.recordingManager.stopRecording()\n        }\n        \n        // Cleanup advanced modules\n        this.iblManager?.dispose()\n        this.multiRingManager?.dispose()\n        this.autoSizing?.reset()\n        this.workerManager?.dispose()\n        this.recordingManager?.dispose()\n        this.comparison?.dispose()\n        \n        // Call parent cleanup\n        await super._stop()\n        \n        console.log('PerfectCorpRingTryonPlugin: Stopped successfully')\n    }\n}