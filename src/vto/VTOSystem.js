/**
 * Virtual Try-On System
 * Real implementation extracted from minified bundle
 * Handles hand tracking, ring positioning, and VTO integration
 */

export class VTOSystem {
    constructor(webgi) {
        this.webgi = webgi;
        this.vtoLoaded = false;
        this.handTracker = null;
        this.ringTryonPlugin = null;
        this.cameraPlugin = null;
        this.backgroundPlugin = null;
        this.rings = this.initializeRingsData();
    }

    initializeRingsData() {
        // Ring data extracted from original code
        return [{
            icon: "./rings/1.png",
            ringUrl: "./rings/1.glb",
            configUrl: "./rings/1.json"
        }, {
            icon: "./rings/2.png",
            ringUrl: "./rings/2.glb",
            configUrl: "./rings/2.json"
        }, {
            icon: "./rings/3.png",
            ringUrl: "./rings/3.glb",
            configUrl: "./rings/3.json"
        }, {
            icon: "./rings/4.png",
            ringUrl: "./rings/4.glb",
            configUrl: "./rings/4.json"
        }, {
            icon: "./rings/5.png",
            ringUrl: "./rings/5.glb",
            configUrl: "./rings/5.json"
        }, {
            icon: "./rings/6.png",
            ringUrl: "./rings/6.glb",
            configUrl: "./rings/6.json"
        }, {
            icon: "./rings/7.png",
            ringUrl: "./rings/7.glb",
            configUrl: "./rings/7.json"
        }];
    }

    async loadScript(scriptPath) {
        console.log('📱 Loading VTO script:', scriptPath);

        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.ij_vto) {
                console.log('✅ VTO script already loaded');
                this.vtoLoaded = true;
                resolve();
                return;
            }

            // Create script element
            const script = document.createElement('script');
            script.src = scriptPath;

            script.onload = () => {
                console.log('✅ VTO script loaded successfully');
                this.vtoLoaded = true;

                // Initialize VTO components
                this.initializeVTOComponents();
                resolve();
            };

            script.onerror = (error) => {
                console.error('❌ Failed to load VTO script:', error);
                reject(new Error(`Failed to load VTO script: ${scriptPath}`));
            };

            document.head.appendChild(script);
        });
    }

    initializeVTOComponents() {
        if (!window.ij_vto) {
            console.warn('⚠️ VTO not available');
            return;
        }

        // Extract VTO plugins
        const vtoComponents = window.ij_vto;

        console.log('🔌 VTO components available:', Object.keys(vtoComponents));

        // Store references to key VTO components
        this.ringTryonPlugin = vtoComponents.RingTryonPlugin;
        this.cameraPlugin = vtoComponents.WebCameraPlugin;
        this.backgroundPlugin = vtoComponents.WebCameraBackgroundPlugin;
        this.instorePlugin = vtoComponents.InstoreRingTryonPlugin;
        this.uiPlugin = vtoComponents.RingTryonUIPlugin;

        console.log('✅ VTO components initialized');
    }

    async setupTryOnUI() {
        if (!this.webgi.isInitialized()) {
            throw new Error('WebGI must be initialized before setting up VTO UI');
        }

        console.log('🎨 Setting up Try-On UI...');

        try {
            // Add TryOnUiPlugin with rings data (extracted from original setupViewer)
            if (window.TryOnUiPlugin) {
                const tryOnUI = await this.webgi.addPlugin(window.TryOnUiPlugin, this.rings);
                console.log('✅ TryOnUiPlugin added with rings data');
                return tryOnUI;
            } else {
                console.warn('⚠️ TryOnUiPlugin not available');
                return null;
            }

        } catch (error) {
            console.error('❌ Failed to setup Try-On UI:', error);
            throw error;
        }
    }

    async initHandTracking() {
        if (!this.vtoLoaded) {
            throw new Error('VTO script must be loaded before initializing hand tracking');
        }

        console.log('👋 Initializing hand tracking...');

        try {
            // Initialize VTO plugins from window.ij_vto
            if (this.ringTryonPlugin) {
                console.log('  🔌 Adding RingTryonPlugin...');
                await this.webgi.addPlugin(this.ringTryonPlugin);
            }

            if (this.cameraPlugin) {
                console.log('  📹 Adding WebCameraPlugin...');
                await this.webgi.addPlugin(this.cameraPlugin);
            }

            if (this.backgroundPlugin) {
                console.log('  🖼️ Adding WebCameraBackgroundPlugin...');
                await this.webgi.addPlugin(this.backgroundPlugin);
            }

            if (this.instorePlugin) {
                console.log('  🏪 Adding InstoreRingTryonPlugin...');
                await this.webgi.addPlugin(this.instorePlugin);
            }

            if (this.uiPlugin) {
                console.log('  🎛️ Adding RingTryonUIPlugin...');
                await this.webgi.addPlugin(this.uiPlugin);
            }

            console.log('✅ Hand tracking initialized');

        } catch (error) {
            console.error('❌ Hand tracking initialization failed:', error);
            throw error;
        }
    }

    async loadRingAssets() {
        if (!this.webgi.isInitialized()) {
            throw new Error('WebGI must be initialized before loading ring assets');
        }

        console.log('💍 Loading ring assets...');

        try {
            // Load the main ring assets (from original setupViewer)
            const assets = [
                "./rings/2.glb",
                "./rings/2.json",
                "./tryon-2-web.json"
            ];

            await this.webgi.loadAssets(assets);
            console.log('✅ Ring assets loaded successfully');

        } catch (error) {
            console.error('❌ Ring asset loading failed:', error);
            throw error;
        }
    }

    async startTryOn() {
        console.log('🚀 Starting Virtual Try-On system...');

        try {
            // Setup Try-On UI first
            await this.setupTryOnUI();

            // Load ring assets
            await this.loadRingAssets();

            // Initialize hand tracking
            await this.initHandTracking();

            console.log('✅ Virtual Try-On system started successfully');

        } catch (error) {
            console.error('❌ Failed to start Virtual Try-On system:', error);
            throw error;
        }
    }

    getRings() {
        return this.rings;
    }

    isVTOLoaded() {
        return this.vtoLoaded;
    }

    getVTOComponents() {
        return {
            ringTryonPlugin: this.ringTryonPlugin,
            cameraPlugin: this.cameraPlugin,
            backgroundPlugin: this.backgroundPlugin,
            instorePlugin: this.instorePlugin,
            uiPlugin: this.uiPlugin
        };
    }

    // Utility method to check if VTO is ready
    isReady() {
        return this.vtoLoaded && this.webgi.isInitialized();
    }

    // Method to get VTO status for debugging
    getStatus() {
        return {
            vtoLoaded: this.vtoLoaded,
            webgiInitialized: this.webgi.isInitialized(),
            componentsAvailable: !!window.ij_vto,
            ringsCount: this.rings.length
        };
    }
}