/**
 * WEBGI TO THREE.JS ADAPTER
 * Professional adapter layer to make WebGI-based modules work with Three.js
 *
 * This adapter allows the enterprise-grade modules to function seamlessly
 * with our Three.js-based rendering system while maintaining all professional features.
 */

import * as THREE from 'three';

// WebGI interface compatibility layer
export interface WebGIScene extends THREE.Scene {
    addPlugins?: (plugins: any[]) => void;
    renderManager?: any;
    mainCamera?: WebGICamera;
}

export interface WebGICamera extends THREE.PerspectiveCamera {
    controls?: any;
}

export interface WebGIRenderer extends THREE.WebGLRenderer {
    renderManager?: any;
}

export interface WebGIObject3D extends THREE.Object3D {
    addPlugin?: (plugin: any) => void;
    getPlugin?: <T>(type: string) => T;
}

// Material compatibility
export interface WebGIMaterial extends THREE.Material {
    configureForJewelryType?: (type: string) => void;
    updateForLighting?: (scene: THREE.Scene, camera: THREE.Camera) => void;
}

/**
 * WebGI Adapter - Makes Three.js compatible with WebGI modules
 */
export class WebGIAdapter {
    private scene: WebGIScene;
    private camera: WebGICamera;
    private renderer: WebGIRenderer;
    private plugins: Map<string, any> = new Map();

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        // Extend Three.js objects with WebGI compatibility
        this.scene = this.extendScene(scene);
        this.camera = this.extendCamera(camera);
        this.renderer = this.extendRenderer(renderer);

        console.log('🔗 WebGIAdapter: Three.js extended with WebGI compatibility');
    }

    /**
     * Extend Three.js Scene with WebGI interface
     */
    private extendScene(scene: THREE.Scene): WebGIScene {
        const extendedScene = scene as WebGIScene;

        extendedScene.addPlugins = (plugins: any[]) => {
            plugins.forEach(plugin => {
                const pluginName = plugin.constructor.PluginType || plugin.constructor.name;
                this.plugins.set(pluginName, plugin);
                console.log(`📦 WebGIAdapter: Added plugin ${pluginName}`);
            });
        };

        extendedScene.renderManager = {
            camera: this.camera,
            scene: extendedScene,
            renderer: this.renderer
        };

        extendedScene.mainCamera = this.camera;

        return extendedScene;
    }

    /**
     * Extend Three.js Camera with WebGI interface
     */
    private extendCamera(camera: THREE.PerspectiveCamera): WebGICamera {
        const extendedCamera = camera as WebGICamera;

        // Add controls compatibility
        extendedCamera.controls = {
            enabled: true,
            autoRotate: false,
            enableDamping: true
        };

        return extendedCamera;
    }

    /**
     * Extend Three.js Renderer with WebGI interface
     */
    private extendRenderer(renderer: THREE.WebGLRenderer): WebGIRenderer {
        const extendedRenderer = renderer as WebGIRenderer;

        extendedRenderer.renderManager = {
            render: () => {
                renderer.render(this.scene, this.camera);
            },
            camera: this.camera,
            scene: this.scene
        };

        return extendedRenderer;
    }

    /**
     * Create WebGI-compatible Object3D
     */
    public createWebGIObject3D(baseObject?: THREE.Object3D): WebGIObject3D {
        const obj = (baseObject || new THREE.Object3D()) as WebGIObject3D;

        obj.addPlugin = (plugin: any) => {
            const pluginName = plugin.constructor.PluginType || plugin.constructor.name;
            obj.userData.plugins = obj.userData.plugins || new Map();
            obj.userData.plugins.set(pluginName, plugin);
        };

        obj.getPlugin = <T>(type: string): T => {
            return obj.userData.plugins?.get(type);
        };

        return obj;
    }

    /**
     * Create WebGI-compatible Material
     */
    public createWebGIMaterial(baseMaterial: THREE.Material): WebGIMaterial {
        const material = baseMaterial as WebGIMaterial;

        // Add WebGI-specific methods if not present
        if (!material.configureForJewelryType) {
            material.configureForJewelryType = (type: string) => {
                console.log(`💎 WebGIAdapter: Configuring material for ${type}`);
            };
        }

        if (!material.updateForLighting) {
            material.updateForLighting = (scene: THREE.Scene, camera: THREE.Camera) => {
                // Default lighting adaptation
                material.needsUpdate = true;
            };
        }

        return material;
    }

    /**
     * Get extended objects for use with WebGI modules
     */
    public getExtendedObjects() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        };
    }

    /**
     * Get plugin by type
     */
    public getPlugin<T>(type: string): T | undefined {
        return this.plugins.get(type);
    }

    /**
     * Mock UI decorators for WebGI compatibility
     */
    public static mockWebGIDecorators() {
        // Mock uiFolder decorator
        if (!(globalThis as any).uiFolder) {
            (globalThis as any).uiFolder = (name: string) => {
                return (target: any) => {
                    target.uiFolderName = name;
                    return target;
                };
            };
        }

        // Mock uiButton decorator
        if (!(globalThis as any).uiButton) {
            (globalThis as any).uiButton = (label: string) => {
                return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
                    target.uiButtons = target.uiButtons || [];
                    target.uiButtons.push({ label, method: propertyName });
                    return descriptor;
                };
            };
        }

        // Mock uiToggle decorator
        if (!(globalThis as any).uiToggle) {
            (globalThis as any).uiToggle = (label: string) => {
                return (target: any, propertyName: string) => {
                    target.uiToggles = target.uiToggles || [];
                    target.uiToggles.push({ label, property: propertyName });
                };
            };
        }

        // Mock uiSlider decorator
        if (!(globalThis as any).uiSlider) {
            (globalThis as any).uiSlider = (label: string, range?: [number, number], step?: number) => {
                return (target: any, propertyName: string) => {
                    target.uiSliders = target.uiSliders || [];
                    target.uiSliders.push({ label, property: propertyName, range, step });
                };
            };
        }

        // Mock onChange2 decorator
        if (!(globalThis as any).onChange2) {
            (globalThis as any).onChange2 = (callback: Function) => {
                return (target: any, propertyName: string) => {
                    target.uiCallbacks = target.uiCallbacks || new Map();
                    target.uiCallbacks.set(propertyName, callback);
                };
            };
        }

        // Mock serialize decorator
        if (!(globalThis as any).serialize) {
            (globalThis as any).serialize = () => {
                return (target: any, propertyName: string) => {
                    target.serializedProps = target.serializedProps || [];
                    target.serializedProps.push(propertyName);
                };
            };
        }

        console.log('🎭 WebGIAdapter: WebGI decorators mocked for compatibility');
    }
}

/**
 * WebGI Math utilities adapter
 */
export class WebGIMathAdapter {
    /**
     * Convert WebGI Vector3 to Three.js Vector3
     */
    public static webgiToThreeVector3(webgiVec: any): THREE.Vector3 {
        if (webgiVec instanceof THREE.Vector3) return webgiVec;
        return new THREE.Vector3(webgiVec.x || 0, webgiVec.y || 0, webgiVec.z || 0);
    }

    /**
     * Convert Three.js Vector3 to WebGI Vector3
     */
    public static threeToWebgiVector3(threeVec: THREE.Vector3): any {
        return {
            x: threeVec.x,
            y: threeVec.y,
            z: threeVec.z,
            clone: () => WebGIMathAdapter.threeToWebgiVector3(threeVec.clone()),
            length: () => threeVec.length(),
            normalize: () => WebGIMathAdapter.threeToWebgiVector3(threeVec.normalize())
        };
    }

    /**
     * Convert WebGI Color to Three.js Color
     */
    public static webgiToThreeColor(webgiColor: any): THREE.Color {
        if (webgiColor instanceof THREE.Color) return webgiColor;
        return new THREE.Color(webgiColor.r || 0, webgiColor.g || 0, webgiColor.b || 0);
    }

    /**
     * Convert WebGI Quaternion to Three.js Quaternion
     */
    public static webgiToThreeQuaternion(webgiQuat: any): THREE.Quaternion {
        if (webgiQuat instanceof THREE.Quaternion) return webgiQuat;
        return new THREE.Quaternion(webgiQuat.x || 0, webgiQuat.y || 0, webgiQuat.z || 0, webgiQuat.w || 1);
    }
}

/**
 * Initialize WebGI compatibility layer
 */
export function initializeWebGICompatibility(): void {
    // Mock WebGI decorators
    WebGIAdapter.mockWebGIDecorators();

    // Mock WebGI module for imports
    if (!(globalThis as any).webgi) {
        (globalThis as any).webgi = {
            // Core classes
            ViewerApp: class ViewerApp {},
            Object3D: THREE.Object3D,
            PerspectiveCamera: THREE.PerspectiveCamera,
            Scene: THREE.Scene,

            // Math classes
            Vector3: THREE.Vector3,
            Quaternion: THREE.Quaternion,
            Color: THREE.Color,
            Matrix4: THREE.Matrix4,
            Euler: THREE.Euler,
            Box3: THREE.Box3,
            Group: THREE.Group,

            // Material classes
            MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
            Texture: THREE.Texture,
            CubeTexture: THREE.CubeTexture,
            Material: THREE.Material,
            UniformsUtils: THREE.UniformsUtils,
            ShaderLib: THREE.ShaderLib,
            ShaderMaterial: THREE.ShaderMaterial,
            DoubleSide: THREE.DoubleSide,

            // Renderer classes
            WebGLRenderer: THREE.WebGLRenderer,

            // UI decorators (already mocked above)
            uiFolder: (globalThis as any).uiFolder,
            uiButton: (globalThis as any).uiButton,
            uiToggle: (globalThis as any).uiToggle,
            uiSlider: (globalThis as any).uiSlider,
            onChange2: (globalThis as any).onChange2,
            serialize: (globalThis as any).serialize
        };
    }

    console.log('🌉 WebGI compatibility layer initialized');
}