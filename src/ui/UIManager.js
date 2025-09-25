/**
 * UI Manager
 * Real implementation extracted from minified bundle
 * Handles TweakpaneUI, loading screens, and interface elements
 */

export class UIManager {
    constructor(webgi) {
        this.webgi = webgi;
        this.tweakpane = null;
        this.loadingScreen = null;
        this.debugMode = false;
    }

    async init() {
        console.log('🎨 Initializing UI Manager...');

        try {
            // Initialize loading screen
            this.initializeLoadingScreen();

            // Check for debug mode
            this.debugMode = this.checkDebugMode();

            console.log('✅ UI Manager initialized successfully');

        } catch (error) {
            console.error('❌ UI Manager initialization failed:', error);
            throw error;
        }
    }

    checkDebugMode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('debug') !== null || urlParams.get('edit') !== null;
    }

    initializeLoadingScreen() {
        console.log('📺 Initializing loading screen...');

        // Find existing loading screen or create one
        this.loadingScreen = document.getElementById('assetManagerLoadingScreen');

        if (!this.loadingScreen) {
            this.createLoadingScreen();
        }

        this.showLoadingScreen();
        console.log('✅ Loading screen initialized');
    }

    createLoadingScreen() {
        // Create loading screen HTML structure
        const loadingScreenHTML = `
            <div id="assetManagerLoadingScreen">
                <div id="assetManagerLoadingScreenContent">
                    <div class="loadingScreenLogoElement">
                        <img src="https://static.webgi.xyz/logo.svg" alt="WebGI" class="loadingScreenLogoImage">
                    </div>
                    <div class="loadingScreenLoadingElement">
                        <div class="loader"></div>
                    </div>
                    <div class="loadingScreenProcessState">Loading Ring Try-On...</div>
                    <div class="loadingScreenFilesElement">
                        <div id="loadingProgress">Initializing...</div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', loadingScreenHTML);
        this.loadingScreen = document.getElementById('assetManagerLoadingScreen');
    }

    showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.opacity = '1';
            this.loadingScreen.style.pointerEvents = 'auto';
        }
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.opacity = '0';
            this.loadingScreen.style.pointerEvents = 'none';
            console.log('📺 Loading screen hidden');
        }
    }

    updateLoadingProgress(message) {
        const progressElement = document.getElementById('loadingProgress');
        if (progressElement) {
            progressElement.textContent = message;
        }

        const processState = document.querySelector('.loadingScreenProcessState');
        if (processState) {
            processState.textContent = message;
        }

        console.log('📈 Loading progress:', message);
    }

    async setupTweakpaneUI() {
        if (!this.debugMode) {
            console.log('🐛 Debug mode not enabled, skipping TweakpaneUI setup');
            return null;
        }

        console.log('🎛️ Setting up TweakpaneUI for debug mode...');

        try {
            const webgiExports = window.__webpackgi_exports__;
            if (!webgiExports?.TweakpaneUiPlugin) {
                console.warn('⚠️ TweakpaneUiPlugin not available');
                return null;
            }

            // Add TweakpaneUI plugin
            this.tweakpane = await this.webgi.addPlugin(webgiExports.TweakpaneUiPlugin);

            if (this.tweakpane?.setupPlugins) {
                await this.setupTweakpanePlugins();
            }

            console.log('✅ TweakpaneUI setup completed');
            return this.tweakpane;

        } catch (error) {
            console.error('❌ TweakpaneUI setup failed:', error);
            return null;
        }
    }

    async setupTweakpanePlugins() {
        console.log('🔌 Setting up Tweakpane plugins...');

        try {
            const webgiExports = window.__webpackgi_exports__;
            const vtoPlugins = window.ij_vto || {};

            // Setup plugins as in the original setupViewer function
            await this.tweakpane.setupPlugins(
                vtoPlugins.RingTryonPlugin,           // Ring try-on plugin
                webgiExports.HierarchyUiPlugin,       // Hierarchy UI
                webgiExports.PickingPlugin,           // Object picking
                vtoPlugins.WebCameraPlugin,           // Camera plugin
                vtoPlugins.WebCameraBackgroundPlugin, // Camera background
                webgiExports.TonemapPlugin,           // Tone mapping
                webgiExports.CameraUiPlugin,          // Camera UI
                webgiExports.RendererUiPlugin,        // Renderer UI
                webgiExports.SSRPlugin,               // Screen Space Reflections
                webgiExports.SSAOPlugin,              // Screen Space Ambient Occlusion
                webgiExports.VignettePlugin,          // Vignette effect
                webgiExports.BloomPlugin,             // Bloom effect
                webgiExports.FilmicGrainPlugin,       // Filmic grain
                webgiExports.TemporalAAPlugin,        // Temporal Anti-Aliasing
                webgiExports.DiamondPlugin,           // Diamond plugin
                webgiExports.DepthOfFieldPlugin       // Depth of field
            );

            console.log('✅ Tweakpane plugins configured');

        } catch (error) {
            console.warn('⚠️ Some Tweakpane plugins failed to setup:', error);
        }
    }

    createButtonBars() {
        console.log('🔘 Creating button bars...');

        // Create mode buttons container
        const modeButtonsContainer = document.createElement('div');
        modeButtonsContainer.className = 'button-bar mode-buttons-container';
        modeButtonsContainer.innerHTML = `
            <div class="button-bar-button mode-button" data-mode="rings">Rings</div>
            <div class="button-bar-button mode-button" data-mode="settings">Settings</div>
            <div class="button-bar-button mode-button" data-mode="about">About</div>
        `;

        document.body.appendChild(modeButtonsContainer);

        // Create utility buttons container
        const utilButtonsContainer = document.createElement('div');
        utilButtonsContainer.className = 'util-buttons-container';
        utilButtonsContainer.innerHTML = `
            <div class="round-button util-button" id="fsToggle" title="Fullscreen">⛶</div>
        `;

        document.body.appendChild(utilButtonsContainer);

        this.setupButtonBarEvents();
        console.log('✅ Button bars created');
    }

    setupButtonBarEvents() {
        // Setup mode button events
        document.querySelectorAll('.mode-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });

        // Setup fullscreen toggle
        const fsToggle = document.getElementById('fsToggle');
        if (fsToggle) {
            fsToggle.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    }

    switchMode(mode) {
        console.log('🔄 Switching to mode:', mode);

        // Remove active class from all buttons
        document.querySelectorAll('.mode-button').forEach(btn => {
            btn.classList.remove('button-bar-selected');
        });

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-mode="${mode}"]`);
        if (activeButton) {
            activeButton.classList.add('button-bar-selected');
        }

        // Handle mode-specific logic here
        switch (mode) {
            case 'rings':
                console.log('📿 Rings mode activated');
                break;
            case 'settings':
                console.log('⚙️ Settings mode activated');
                break;
            case 'about':
                console.log('ℹ️ About mode activated');
                break;
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('⚠️ Fullscreen not supported:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    async createWebGILogo() {
        // Create WebGI logo element
        const logo = document.createElement('div');
        logo.id = 'webgi-logo';
        logo.title = 'Powered by WebGI';
        logo.addEventListener('click', () => {
            window.open('https://webgi.xyz', '_blank');
        });

        document.body.appendChild(logo);
        console.log('🏷️ WebGI logo created');
    }

    async setupCompleteUI() {
        console.log('🎨 Setting up complete UI...');

        try {
            // Create UI elements
            this.createButtonBars();
            await this.createWebGILogo();

            // Setup TweakpaneUI if in debug mode
            if (this.debugMode) {
                await this.setupTweakpaneUI();
            }

            console.log('✅ Complete UI setup finished');

        } catch (error) {
            console.error('❌ Complete UI setup failed:', error);
            throw error;
        }
    }

    // Utility methods
    isDebugMode() {
        return this.debugMode;
    }

    getTweakpane() {
        return this.tweakpane;
    }

    getLoadingScreen() {
        return this.loadingScreen;
    }

    // Method to handle application ready state
    onApplicationReady() {
        console.log('🎉 Application ready, finalizing UI...');

        // Hide loading screen
        this.hideLoadingScreen();

        // Setup complete UI
        this.setupCompleteUI();

        console.log('✅ UI finalization completed');
    }
}