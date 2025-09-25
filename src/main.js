/**
 * RING TRYON - MAIN APPLICATION
 * Real implementation extracted from minified bundle
 * Original function: setupViewer() + bootstrap code
 */

// Note: CSS is loaded separately in HTML

// Import real systems
import { WebGICore } from './core/WebGICore.js';
import { VTOSystem } from './vto/VTOSystem.js';
import { UIManager } from './ui/UIManager.js';

// Import utilities
import { URLParams } from './utils/URLParams.js';
import { Logger } from './utils/Logger.js';

/**
 * Main application setup function
 * Based on original setupViewer() function from minified code
 */
async function setupViewer() {
    try {
        Logger.info('🚀 Starting Ring Try-On Application...');

        // Initialize UI Manager first (for loading screen)
        const ui = new UIManager(null);
        await ui.init();

        ui.updateLoadingProgress('Waiting for WebGI...');

        // Wait for WebGI to be available (loaded by index.js)
        let attempts = 0;
        const maxAttempts = 100;
        while (!window.WEBGI && !window.ViewerApp && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
            if (attempts % 10 === 0) {
                Logger.info(`⏳ Waiting for WebGI... (${attempts}/${maxAttempts})`);
                Logger.info(`   - window.WEBGI: ${!!window.WEBGI}`);
                Logger.info(`   - window.ViewerApp: ${!!window.ViewerApp}`);
                Logger.info(`   - Available keys: ${Object.keys(window).filter(k => k.includes('webgi') || k.includes('WebGI') || k.includes('Viewer')).join(', ')}`);
            }
        }

        if (!window.WEBGI && !window.ViewerApp) {
            throw new Error('WebGI not loaded after waiting. Please ensure index.js loads correctly.');
        }

        Logger.info('✅ WebGI detected!');
        ui.updateLoadingProgress('Initializing WebGI...');

        // Initialize WebGI Core
        const webgi = new WebGICore();
        await webgi.init();

        // Connect UI to WebGI
        ui.webgi = webgi;

        ui.updateLoadingProgress('Loading VTO system...');

        // Check if VTO components are available
        if (!window.ij_vto) {
            throw new Error('VTO system not loaded. Required for ring try-on functionality.');
        }

        // Extract VTO components (original destructuring from setupViewer)
        const { RingTryonPlugin, WebCameraBackgroundPlugin, WebCameraPlugin } = window.ij_vto;

        // Connect UI to WebGI
        ui.webgi = webgi;

        ui.updateLoadingProgress('Setting up Diamond plugin...');

        // Setup Diamond plugin (from original setupViewer)
        const diamondPlugin = await webgi.setupDiamondPlugin();

        ui.updateLoadingProgress('Initializing VTO system...');

        // Initialize VTO system
        const vto = new VTOSystem(webgi);
        vto.vtoLoaded = true; // VTO script already loaded by bootstrap

        ui.updateLoadingProgress('Setting up Try-On UI...');

        // Setup Try-On UI with rings data
        await vto.setupTryOnUI();

        ui.updateLoadingProgress('Loading ring assets...');

        // Load ring assets (from original setupViewer)
        await vto.loadRingAssets();

        ui.updateLoadingProgress('Enabling rendering...');

        // Enable rendering (from original setupViewer)
        webgi.enableRendering();

        ui.updateLoadingProgress('Checking debug mode...');

        // Check for debug mode (from original setupViewer)
        const params = new URLParams();
        if (params.get('debug') !== null || params.get('edit') !== null) {
            ui.updateLoadingProgress('Setting up debug UI...');
            await webgi.enableDebugMode();
        }

        ui.updateLoadingProgress('Finalizing...');

        // Application ready
        ui.onApplicationReady();

        Logger.info('✅ Ring Try-On Application initialized successfully');

        // Return viewer instance (as in original setupViewer)
        return webgi.viewer;

    } catch (error) {
        Logger.error('❌ Failed to initialize application:', error);

        // Show error in loading screen if available
        const progressElement = document.getElementById('loadingProgress');
        if (progressElement) {
            progressElement.textContent = `Error: ${error.message}`;
            progressElement.style.color = '#ff4444';
        }

        // Show user-friendly error
        setTimeout(() => {
            alert('Failed to load Ring Try-On application. Please refresh the page.');
        }, 1000);

        throw error;
    }
}

/**
 * Bootstrap code
 * Based on original bootstrap sequence from appBootstrap.js
 */
function initializeApplication() {
    Logger.info('🔧 Initializing Ring Try-On bootstrap...');

    // Make WebGI exports globally available (from original bootstrap)
    if (window.WEBGI) {
        Object.entries(window.WEBGI).forEach(([key, value]) => {
            if (key !== "default" && !window[key]) {
                window[key] = value;
            }
        });
        Logger.info('✅ WebGI exports made globally available');
    }

    // VTO version configuration
    const ijVtoVersion = "0.0.24";
    window.webgi = window; // Original assignment

    // Load VTO script dynamically (from original bootstrap)
    const ijVtoScript = document.createElement("script");

    ijVtoScript.onload = () => {
        Logger.info('✅ VTO script loaded, starting setupViewer...');

        // Add a small delay to let VTO initialize properly
        setTimeout(() => {
            setupViewer().catch(error => {
                Logger.error('❌ setupViewer failed:', error);
            });
        }, 500);
    };

    ijVtoScript.onerror = () => {
        const error = `Failed to load web-vto script version ${ijVtoVersion}`;
        Logger.error('❌', error);
        alert(error);
    };

    // Get version from URL params or use default
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get("v") || ijVtoVersion;

    ijVtoScript.src = `./0.0.24/web-vto-instore.js`;

    Logger.info(`📱 Loading VTO script: ${ijVtoScript.src}`);
    document.head.appendChild(ijVtoScript);
}

// Auto-start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    // DOM already loaded
    initializeApplication();
}

// Export setupViewer for external use (as in original)
window.setupViewer = setupViewer;

// Export for potential module use
export { setupViewer, initializeApplication };