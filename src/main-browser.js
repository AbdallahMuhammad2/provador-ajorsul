/**
 * RING TRYON - BROWSER VERSION
 * No ES6 imports - compatible with direct script loading
 */

// Wait for WebGI to be available
function waitForWebGI() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;

        const checkWebGI = () => {
            attempts++;
            console.log(`🔍 Checking for WebGI... (attempt ${attempts})`);

            if (window.WEBGI || window.__webpackgi_exports__ || window.ViewerApp || window.setupViewer) {
                console.log('✅ WebGI detected!');
                resolve();
            } else if (attempts >= maxAttempts) {
                reject(new Error('WebGI not loaded after maximum attempts'));
            } else {
                setTimeout(checkWebGI, 200);
            }
        };

        checkWebGI();
    });
}

// Simplified setupViewer function based on our implementation
async function setupViewer() {
    try {
        console.log('🚀 Starting Ring Try-On Application (Browser Version)...');

        // Wait for WebGI to be available
        await waitForWebGI();

        // Make WebGI exports globally available
        if (window.WEBGI) {
            Object.entries(window.WEBGI).forEach(([key, value]) => {
                if (key !== "default" && !window[key]) {
                    window[key] = value;
                }
            });
            console.log('✅ WebGI exports made globally available');
        }

        // Update loading progress
        const updateProgress = (message) => {
            const progressElement = document.getElementById('loadingProgress');
            if (progressElement) {
                progressElement.textContent = message;
            }
            console.log('📈', message);
        };

        updateProgress('Initializing WebGI...');

        // Check if WebGI ViewerApp is available
        if (!window.__webpackgi_exports__?.ViewerApp) {
            throw new Error('WebGI ViewerApp not available');
        }

        // Create WebGI ViewerApp instance
        const viewer = new window.__webpackgi_exports__.ViewerApp({
            canvas: document.getElementById("mcanvas")
        });

        updateProgress('Configuring device scaling...');

        // Configure device-specific scaling
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const devicePixelRatio = isIOS ? Math.round(window.devicePixelRatio) : window.devicePixelRatio;
        const minScale = isIOS ? 1 : 1.5;
        const maxScale = isIOS ? 1.4 : 1.5;

        const MathUtils = window.__webpackgi_exports__?.MathUtils;
        if (MathUtils) {
            viewer.renderer.displayCanvasScaling = MathUtils.clamp(devicePixelRatio, minScale, maxScale);
        } else {
            viewer.renderer.displayCanvasScaling = Math.max(minScale, Math.min(maxScale, devicePixelRatio));
        }

        updateProgress('Adding base plugins...');

        // Add base plugins
        const webgiExports = window.__webpackgi_exports__;
        if (webgiExports?.addBasePlugins) {
            await webgiExports.addBasePlugins(viewer);
        }

        updateProgress('Refreshing rendering pipeline...');
        await viewer.renderer.refreshPipeline();

        updateProgress('Checking for VTO system...');

        // Check for VTO components
        if (window.ij_vto) {
            console.log('✅ VTO system detected');
            updateProgress('VTO system ready');
        } else {
            console.log('⚠️ VTO system not yet loaded');
            updateProgress('Waiting for VTO...');
        }

        updateProgress('WebGI initialization complete!');

        // Hide loading screen
        const loadingScreen = document.getElementById('assetManagerLoadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
            }, 1000);
        }

        console.log('✅ Ring Try-On Application initialized successfully (Browser Version)');
        return viewer;

    } catch (error) {
        console.error('❌ Failed to initialize application:', error);

        const progressElement = document.getElementById('loadingProgress');
        if (progressElement) {
            progressElement.textContent = `Error: ${error.message}`;
            progressElement.style.color = '#ff4444';
        }

        throw error;
    }
}

// VTO script loading function
function loadVTOScript() {
    console.log('📱 Loading VTO script...');

    const ijVtoVersion = "0.0.24";
    const ijVtoScript = document.createElement("script");

    ijVtoScript.onload = () => {
        console.log('✅ VTO script loaded, starting setupViewer...');
        setupViewer().catch(error => {
            console.error('❌ setupViewer failed:', error);
        });
    };

    ijVtoScript.onerror = () => {
        const error = `Failed to load web-vto script version ${ijVtoVersion}`;
        console.error('❌', error);
        alert(error);
    };

    ijVtoScript.src = `./0.0.24/web-vto-instore.js`;
    document.head.appendChild(ijVtoScript);
}

// Initialize when DOM is ready
function initializeApplication() {
    console.log('🔧 Initializing Ring Try-On bootstrap (Browser Version)...');

    // Load VTO script
    loadVTOScript();
}

// Make functions globally available
window.setupViewer = setupViewer;
window.initializeApplication = initializeApplication;

// Auto-start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

console.log('📦 Browser-compatible Ring Try-On module loaded');