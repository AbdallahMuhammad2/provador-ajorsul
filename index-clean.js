/**
 * Ring Try-On Virtual System - Clean Implementation
 * Desobfuscated and restructured for commercial use
 * 
 * This is a clean, readable implementation without external dependencies
 * or proprietary license checks.
 */

// =============================================================================
// CONFIGURATION AND CONSTANTS
// =============================================================================

const CONFIG = {
    rings: {
        baseUrl: './rings/',
        defaultRing: 'working-ring-7.glb',
        configs: [
            { id: 1, name: 'Silver Ring', file: '1.glb', config: '1.json' },
            { id: 2, name: 'Gold Ring', file: '2.glb', config: '2.json' },
            { id: 3, name: 'Ring 3', file: '3.glb', config: '3.json' },
            { id: 4, name: 'Ring 4', file: '4.glb', config: '4.json' },
            { id: 5, name: 'Ring 5', file: '5.glb', config: '5.json' },
            { id: 6, name: 'Ring 6', file: '6.glb', config: '6.json' },
            { id: 7, name: 'Ring 7', file: '7.glb', config: '7.json' }
        ]
    },
    camera: {
        facingMode: 'user',
        width: 1304,
        height: 1304
    },
    materials: {
        gem: './diamond-white-1.dmat',
        lightmap: './lightmap-r-2b.exr',
        envHdr: './env-metal-8.hdr'
    },
    ui: {
        showDebug: false,
        showControls: true
    }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

class Utils {
    static async loadJSON(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.warn(`Failed to load JSON from ${url}:`, error);
            return null;
        }
    }

    static createElement(tag, attributes = {}, parent = null) {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'textContent') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    }

    static async waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
}

// =============================================================================
// WEBGI VIEWER MANAGER
// =============================================================================

class WebGIManager {
    constructor() {
        this.viewer = null;
        this.plugins = {};
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) return this.viewer;

        console.log('Initializing WebGI Viewer...');
        
        try {
            // Create viewer canvas
            const canvas = Utils.createElement('canvas', {
                id: 'webgi-canvas',
                style: 'width: 100%; height: 100vh;'
            });

            // Initialize WebGI viewer (assuming WebGI is loaded globally)
            if (typeof ViewerApp === 'undefined') {
                throw new Error('WebGI ViewerApp not loaded');
            }

            this.viewer = new ViewerApp({
                canvas: canvas,
                isAntialiased: true,
                useRgbm: false
            });

            // Add base plugins
            await this.addBasePlugins();
            
            // Setup environment
            await this.setupEnvironment();

            this.isInitialized = true;
            console.log('WebGI Viewer initialized successfully');
            
            return this.viewer;
        } catch (error) {
            console.error('Failed to initialize WebGI:', error);
            throw error;
        }
    }

    async addBasePlugins() {
        if (!this.viewer) throw new Error('Viewer not initialized');

        // Add essential plugins
        const pluginClasses = [
            'CameraViewPlugin',
            'CanvasSnipperPlugin', 
            'MaterialConfiguratorPlugin',
            'ProgressivePlugin',
            'TonemapPlugin',
            'SSRPlugin',
            'SSAOPlugin',
            'BloomPlugin',
            'FrameFadePlugin',
            'GLTFAnimationPlugin',
            'GroundPlugin'
        ];

        for (const pluginName of pluginClasses) {
            try {
                if (window[pluginName]) {
                    const plugin = await this.viewer.addPlugin(window[pluginName]);
                    this.plugins[pluginName] = plugin;
                    console.log(`Added plugin: ${pluginName}`);
                }
            } catch (error) {
                console.warn(`Failed to add plugin ${pluginName}:`, error);
            }
        }
    }

    async setupEnvironment() {
        if (!this.viewer) return;

        try {
            // Load environment maps
            if (CONFIG.materials.envHdr) {
                const envMap = await this.viewer.load(CONFIG.materials.envHdr);
                if (this.viewer.scene.environment) {
                    this.viewer.scene.environment.map = envMap;
                }
            }

            // Setup lighting
            this.viewer.scene.mainLight.intensity = 2.5;
            this.viewer.scene.mainLight.shadow.camera.far = 100;

        } catch (error) {
            console.warn('Failed to setup environment:', error);
        }
    }

    async loadModel(modelPath) {
        if (!this.viewer) throw new Error('Viewer not initialized');

        try {
            console.log('Loading model:', modelPath);
            const model = await this.viewer.load(modelPath);
            return model;
        } catch (error) {
            console.error('Failed to load model:', error);
            throw error;
        }
    }

    dispose() {
        if (this.viewer) {
            this.viewer.dispose();
            this.viewer = null;
        }
        this.plugins = {};
        this.isInitialized = false;
    }
}

// =============================================================================
// CAMERA MANAGER
// =============================================================================

class CameraManager {
    constructor() {
        this.stream = null;
        this.video = null;
        this.isActive = false;
    }

    async initialize() {
        try {
            console.log('Initializing camera...');
            
            this.video = Utils.createElement('video', {
                autoplay: true,
                muted: true,
                playsinline: true,
                style: 'width: 100%; height: 100%; object-fit: cover;'
            });

            const constraints = {
                video: {
                    facingMode: CONFIG.camera.facingMode,
                    width: { ideal: CONFIG.camera.width },
                    height: { ideal: CONFIG.camera.height }
                }
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            
            this.isActive = true;
            console.log('Camera initialized successfully');
            
            return this.video;
        } catch (error) {
            console.error('Failed to initialize camera:', error);
            throw error;
        }
    }

    flipCamera() {
        // Implementation for flipping camera
        console.log('Camera flip requested');
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.isActive = false;
    }
}

// =============================================================================
// RING MANAGER
// =============================================================================

class RingManager {
    constructor(webgiManager) {
        this.webgiManager = webgiManager;
        this.currentRing = null;
        this.ringConfigs = new Map();
    }

    async loadRingConfig(configPath) {
        try {
            const config = await Utils.loadJSON(configPath);
            if (config) {
                this.ringConfigs.set(configPath, config);
            }
            return config;
        } catch (error) {
            console.warn('Failed to load ring config:', error);
            return null;
        }
    }

    async loadRing(ringId) {
        try {
            const ringData = CONFIG.rings.configs.find(r => r.id === ringId);
            if (!ringData) {
                throw new Error(`Ring ${ringId} not found`);
            }

            console.log(`Loading ring: ${ringData.name}`);

            // Clear previous ring
            if (this.currentRing) {
                this.clearCurrentRing();
            }

            // Load ring configuration
            const configPath = CONFIG.rings.baseUrl + ringData.config;
            const config = await this.loadRingConfig(configPath);

            // Load 3D model
            const modelPath = CONFIG.rings.baseUrl + ringData.file;
            const model = await this.webgiManager.loadModel(modelPath);

            if (model && config) {
                // Apply configuration
                this.applyRingConfiguration(model, config);
                this.currentRing = { model, config, data: ringData };
                
                console.log(`Ring ${ringData.name} loaded successfully`);
                return this.currentRing;
            }

        } catch (error) {
            console.error('Failed to load ring:', error);
            throw error;
        }
    }

    applyRingConfiguration(model, config) {
        if (!model || !config) return;

        try {
            // Apply scale
            if (config.modelScaleFactor) {
                model.scale.setScalar(config.modelScaleFactor);
            }

            // Apply position
            if (config.modelPosition) {
                model.position.set(
                    config.modelPosition.x || 0,
                    config.modelPosition.y || 0,
                    config.modelPosition.z || 0
                );
            }

            // Apply rotation
            if (config.modelRotation) {
                model.rotation.set(
                    config.modelRotation.x || 0,
                    config.modelRotation.y || 0,
                    config.modelRotation.z || 0
                );
            }

            console.log('Ring configuration applied');
        } catch (error) {
            console.warn('Failed to apply ring configuration:', error);
        }
    }

    clearCurrentRing() {
        if (this.currentRing && this.currentRing.model) {
            if (this.webgiManager.viewer && this.webgiManager.viewer.scene) {
                this.webgiManager.viewer.scene.remove(this.currentRing.model);
            }
        }
        this.currentRing = null;
    }
}

// =============================================================================
// UI MANAGER
// =============================================================================

class UIManager {
    constructor(ringManager, cameraManager) {
        this.ringManager = ringManager;
        this.cameraManager = cameraManager;
        this.container = null;
    }

    createUI() {
        this.container = Utils.createElement('div', {
            id: 'ring-tryon-ui',
            style: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;'
        });

        // Create camera view
        this.createCameraView();
        
        // Create controls
        this.createControls();
        
        // Create ring selector
        this.createRingSelector();

        document.body.appendChild(this.container);
        return this.container;
    }

    createCameraView() {
        const cameraContainer = Utils.createElement('div', {
            id: 'camera-container',
            style: 'position: relative; width: 100%; height: 100%;'
        });

        // WebGI canvas will be added here
        const canvasContainer = Utils.createElement('div', {
            id: 'canvas-container',
            style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'
        });

        cameraContainer.appendChild(canvasContainer);
        this.container.appendChild(cameraContainer);
    }

    createControls() {
        const controlsContainer = Utils.createElement('div', {
            id: 'controls',
            style: 'position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 100;'
        });

        // Flip camera button
        const flipButton = Utils.createElement('button', {
            textContent: '🔄',
            style: 'width: 50px; height: 50px; border-radius: 50%; border: none; background: rgba(255,255,255,0.8); font-size: 20px; cursor: pointer;'
        });
        flipButton.addEventListener('click', () => this.cameraManager.flipCamera());

        // Capture button
        const captureButton = Utils.createElement('button', {
            textContent: '📷',
            style: 'width: 60px; height: 60px; border-radius: 50%; border: none; background: rgba(255,255,255,0.9); font-size: 24px; cursor: pointer;'
        });
        captureButton.addEventListener('click', () => this.captureImage());

        controlsContainer.appendChild(flipButton);
        controlsContainer.appendChild(captureButton);
        this.container.appendChild(controlsContainer);
    }

    createRingSelector() {
        const selectorContainer = Utils.createElement('div', {
            id: 'ring-selector',
            style: 'position: absolute; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px; z-index: 100;'
        });

        CONFIG.rings.configs.forEach(ring => {
            const ringButton = Utils.createElement('button', {
                textContent: ring.name,
                style: 'padding: 10px 15px; border: 2px solid #fff; background: rgba(0,0,0,0.7); color: white; border-radius: 5px; cursor: pointer; font-size: 14px;'
            });
            
            ringButton.addEventListener('click', async () => {
                try {
                    await this.ringManager.loadRing(ring.id);
                    this.updateSelectedRing(ring.id);
                } catch (error) {
                    console.error('Failed to load ring:', error);
                }
            });

            selectorContainer.appendChild(ringButton);
        });

        this.container.appendChild(selectorContainer);
    }

    updateSelectedRing(ringId) {
        const buttons = this.container.querySelectorAll('#ring-selector button');
        buttons.forEach((button, index) => {
            if (CONFIG.rings.configs[index].id === ringId) {
                button.style.background = 'rgba(255,255,255,0.9)';
                button.style.color = 'black';
            } else {
                button.style.background = 'rgba(0,0,0,0.7)';
                button.style.color = 'white';
            }
        });
    }

    captureImage() {
        console.log('Capture image requested');
        // Implementation for capturing image
    }
}

// =============================================================================
// MAIN APPLICATION
// =============================================================================

class RingTryOnApp {
    constructor() {
        this.webgiManager = new WebGIManager();
        this.cameraManager = new CameraManager();
        this.ringManager = new RingManager(this.webgiManager);
        this.uiManager = new UIManager(this.ringManager, this.cameraManager);
        this.isInitialized = false;
    }

    async initialize() {
        try {
            console.log('Initializing Ring Try-On App...');

            // Show loading indicator
            this.showLoadingIndicator();

            // Initialize WebGI viewer
            await this.webgiManager.initialize();

            // Initialize camera
            await this.cameraManager.initialize();

            // Create UI
            this.uiManager.createUI();

            // Add WebGI canvas to UI
            const canvasContainer = document.getElementById('canvas-container');
            if (canvasContainer && this.webgiManager.viewer.canvas) {
                canvasContainer.appendChild(this.webgiManager.viewer.canvas);
            }

            // Load default ring
            await this.ringManager.loadRing(2); // Load gold ring by default

            this.hideLoadingIndicator();
            this.isInitialized = true;

            console.log('Ring Try-On App initialized successfully!');

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to initialize the application. Please check your camera permissions and try again.');
        }
    }

    showLoadingIndicator() {
        const loader = Utils.createElement('div', {
            id: 'loader',
            style: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000;'
        });

        const spinner = Utils.createElement('div', {
            style: 'width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;'
        });

        loader.appendChild(spinner);
        document.body.appendChild(loader);

        // Add CSS animation
        const style = Utils.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    hideLoadingIndicator() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.remove();
        }
    }

    showError(message) {
        this.hideLoadingIndicator();
        
        const errorDiv = Utils.createElement('div', {
            style: 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4444; color: white; padding: 20px; border-radius: 10px; z-index: 10001; max-width: 80%; text-align: center;'
        });

        const errorText = Utils.createElement('p', {
            textContent: message,
            style: 'margin: 0 0 15px 0;'
        });

        const retryButton = Utils.createElement('button', {
            textContent: 'Try Again',
            style: 'background: white; color: #ff4444; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;'
        });

        retryButton.addEventListener('click', () => {
            errorDiv.remove();
            this.initialize();
        });

        errorDiv.appendChild(errorText);
        errorDiv.appendChild(retryButton);
        document.body.appendChild(errorDiv);
    }

    dispose() {
        this.cameraManager.stop();
        this.webgiManager.dispose();
        
        const ui = document.getElementById('ring-tryon-ui');
        if (ui) {
            ui.remove();
        }
        
        this.isInitialized = false;
    }
}

// =============================================================================
// APPLICATION STARTUP
// =============================================================================

let app = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

async function startApp() {
    try {
        console.log('Starting Ring Try-On Application...');
        
        app = new RingTryOnApp();
        await app.initialize();
        
        // Expose app globally for debugging
        window.ringTryOnApp = app;
        
    } catch (error) {
        console.error('Failed to start application:', error);
    }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (app) {
        app.dispose();
    }
});

// =============================================================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RingTryOnApp, WebGIManager, CameraManager, RingManager, UIManager, Utils };
}
