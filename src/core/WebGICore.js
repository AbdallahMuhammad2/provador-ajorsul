/**
 * WebGI Core System
 * Real implementation extracted from minified bundle
 */

export class WebGICore {
    constructor() {
        this.viewer = null;
        this.renderEnabled = false;
        this.plugins = new Map();
        this.assets = [];
    }

    async init() {
        console.log('🚀 Initializing WebGI Core...');

        // Check if WebGI is available globally (loaded by VTO script)
        if (!window.__webpackgi_exports__?.ViewerApp) {
            throw new Error('WebGI not loaded. VTO script must be loaded first.');
        }

        // Create WebGI ViewerApp instance
        this.viewer = new window.__webpackgi_exports__.ViewerApp({
            canvas: document.getElementById("mcanvas") || this.createCanvas()
        });

        // Configure device-specific scaling
        this.configureRendering();

        // Add base plugins
        await this.addBasePlugins();

        console.log('✅ WebGI Core initialized successfully');
        return this.viewer;
    }

    createCanvas() {
        let canvas = document.getElementById("mcanvas");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "mcanvas";
            canvas.width = 800;
            canvas.height = 600;

            const container = document.getElementById("canvasContainer");
            if (container) {
                container.appendChild(canvas);
            } else {
                document.body.appendChild(canvas);
            }
        }
        return canvas;
    }

    configureRendering() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const devicePixelRatio = isIOS ? Math.round(window.devicePixelRatio) : window.devicePixelRatio;
        const minScale = isIOS ? 1 : 1.5;
        const maxScale = isIOS ? 1.4 : 1.5;

        // Use WebGI's MathUtils if available
        const MathUtils = window.__webpackgi_exports__?.MathUtils;
        if (MathUtils) {
            this.viewer.renderer.displayCanvasScaling = MathUtils.clamp(devicePixelRatio, minScale, maxScale);
        } else {
            this.viewer.renderer.displayCanvasScaling = Math.max(minScale, Math.min(maxScale, devicePixelRatio));
        }

        console.log(`📱 Device scaling configured: ${this.viewer.renderer.displayCanvasScaling}`);
    }

    async addBasePlugins() {
        console.log('🔌 Adding base plugins...');

        const webgiExports = window.__webpackgi_exports__;

        try {
            // Add MaterialPresetPlugin first
            if (window.MaterialPresetPlugin) {
                await this.viewer.addPlugin(window.MaterialPresetPlugin);
                console.log('  ✅ MaterialPresetPlugin added');
            }

            // Add base plugins if available
            if (webgiExports?.addBasePlugins) {
                await webgiExports.addBasePlugins(this.viewer);
                console.log('  ✅ Base plugins added');
            }

            // Refresh rendering pipeline
            await this.viewer.renderer.refreshPipeline();
            console.log('  ✅ Rendering pipeline refreshed');

        } catch (error) {
            console.warn('⚠️ Some base plugins failed to load:', error);
        }
    }

    async loadAssets(assets) {
        console.log('📦 Loading assets:', assets);

        this.renderEnabled = false; // Disable rendering during loading

        try {
            // Load each asset
            for (const asset of assets) {
                console.log(`  📄 Loading: ${asset}`);
                await this.viewer.load(asset);
                this.assets.push(asset);
            }

            console.log('✅ All assets loaded successfully');

        } catch (error) {
            console.error('❌ Asset loading failed:', error);
            throw error;
        }
    }

    async addPlugin(PluginClass, ...args) {
        if (!this.viewer) {
            throw new Error('Viewer not initialized. Call init() first.');
        }

        try {
            let plugin;

            if (typeof PluginClass === 'function') {
                plugin = await this.viewer.addPlugin(new PluginClass(...args));
            } else {
                plugin = await this.viewer.addPlugin(PluginClass);
            }

            this.plugins.set(PluginClass.name || 'anonymous', plugin);
            console.log(`🔌 Plugin added: ${PluginClass.name || 'anonymous'}`);

            return plugin;

        } catch (error) {
            console.warn(`⚠️ Plugin failed to load: ${PluginClass.name || 'unknown'}`, error);
            return null;
        }
    }

    async enableDebugMode() {
        console.log('🐛 Enabling debug mode...');

        const webgiExports = window.__webpackgi_exports__;
        if (!webgiExports) return;

        try {
            // Add debug plugins
            const debugPlugins = [
                'HierarchyUiPlugin',
                'PickingPlugin',
                'CameraUiPlugin',
                'RendererUiPlugin'
            ];

            for (const pluginName of debugPlugins) {
                if (webgiExports[pluginName]) {
                    await this.addPlugin(webgiExports[pluginName]);
                }
            }

            // Setup TweakpaneUI if available
            if (webgiExports.TweakpaneUiPlugin) {
                const tweakpane = await this.addPlugin(webgiExports.TweakpaneUiPlugin);

                // Setup plugins in tweakpane (original setupPlugins call)
                if (tweakpane?.setupPlugins) {
                    const vtoPlugins = window.ij_vto || {};
                    await tweakpane.setupPlugins(
                        vtoPlugins.RingTryonPlugin,
                        webgiExports.HierarchyUiPlugin,
                        webgiExports.PickingPlugin,
                        vtoPlugins.WebCameraPlugin,
                        vtoPlugins.WebCameraBackgroundPlugin,
                        webgiExports.TonemapPlugin,
                        webgiExports.CameraUiPlugin,
                        webgiExports.RendererUiPlugin,
                        webgiExports.SSRPlugin,
                        webgiExports.SSAOPlugin,
                        webgiExports.VignettePlugin,
                        webgiExports.BloomPlugin,
                        webgiExports.FilmicGrainPlugin,
                        webgiExports.TemporalAAPlugin,
                        webgiExports.DiamondPlugin,
                        webgiExports.DepthOfFieldPlugin
                    );
                }
            }

            console.log('✅ Debug mode enabled');

        } catch (error) {
            console.warn('⚠️ Debug mode setup failed:', error);
        }
    }

    async setupDiamondPlugin() {
        console.log('💎 Setting up Diamond plugin...');

        const webgiExports = window.__webpackgi_exports__;
        if (!webgiExports?.DiamondPlugin) return null;

        try {
            const diamondPlugin = await this.addPlugin(webgiExports.DiamondPlugin);

            // Load environment map
            const envMapPath = "./lightmap-r-2b.exr";
            console.log(`  📄 Loading environment map: ${envMapPath}`);

            diamondPlugin.envMap = await this.viewer.load(envMapPath);
            diamondPlugin.refreshEnvMaps();

            console.log('✅ Diamond plugin configured');
            return diamondPlugin;

        } catch (error) {
            console.warn('⚠️ Diamond plugin setup failed:', error);
            return null;
        }
    }

    enableRendering() {
        this.renderEnabled = true;
        if (this.viewer) {
            this.viewer.renderEnabled = true;
        }
        console.log('🎬 Rendering enabled');
    }

    disableRendering() {
        this.renderEnabled = false;
        if (this.viewer) {
            this.viewer.renderEnabled = false;
        }
        console.log('⏸️ Rendering disabled');
    }

    getPlugin(name) {
        return this.plugins.get(name);
    }

    isInitialized() {
        return this.viewer !== null;
    }
}