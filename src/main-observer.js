/**
 * RING TRYON - OBSERVER VERSION
 * Works with existing index.js system instead of replacing it
 */

// Import our modular utilities to enhance the existing system
import { Logger } from './utils/Logger.js';
import { UIManager } from './ui/UIManager.js';

/**
 * Observer-based system that enhances the existing WebGI setup
 */
async function observeAndEnhanceSystem() {
    try {
        Logger.info('🔍 Starting Ring Try-On Observer System...');

        // Initialize our UI manager for enhanced loading experience
        const ui = new UIManager(null);
        await ui.init();

        ui.updateLoadingProgress('Observing system initialization...');

        // Monitor the existing system instead of replacing it
        let systemReady = false;
        let attempts = 0;
        const maxAttempts = 100;

        const observer = () => {
            attempts++;

            const status = {
                webgi: !!window.WEBGI,
                viewerApp: !!window.ViewerApp,
                setupViewer: !!window.setupViewer,
                ijVto: !!window.ij_vto,
                canvas: !!document.getElementById('webgi-canvas')
            };

            if (attempts % 10 === 0) {
                Logger.info(`📊 System observation (${attempts}/${maxAttempts}):`, status);
                ui.updateLoadingProgress(`Monitoring system... (${attempts}/${maxAttempts})`);
            }

            // Check if the original system is fully ready
            if (status.webgi && status.setupViewer && status.ijVto && status.canvas) {
                systemReady = true;
                Logger.info('✅ Original system is fully operational!');
                ui.updateLoadingProgress('System ready! Applying enhancements...');

                // Apply our modular enhancements
                applyModularEnhancements(ui);
                return;
            }

            if (attempts >= maxAttempts) {
                Logger.warn('⚠️ System monitoring timeout - some components may not be ready');
                ui.updateLoadingProgress('Timeout - partial system ready');

                // Apply what enhancements we can
                applyModularEnhancements(ui);
                return;
            }

            // Continue observing
            setTimeout(observer, 200);
        };

        observer();

    } catch (error) {
        Logger.error('❌ Observer system failed:', error);
    }
}

/**
 * Apply our modular enhancements to the existing system
 */
async function applyModularEnhancements(ui) {
    try {
        Logger.info('🛠️ Applying modular enhancements...');

        // Enhanced UI features
        if (ui.isDebugMode()) {
            Logger.info('🐛 Debug mode detected - enabling advanced UI');
            ui.updateLoadingProgress('Setting up debug interface...');

            // Our TweakpaneUI setup would go here
            setTimeout(() => {
                ui.setupCompleteUI();
            }, 1000);
        }

        // Enhanced monitoring
        setInterval(() => {
            const status = {
                webgiActive: !!window.WEBGI,
                vtoActive: !!window.ij_vto,
                canvasVisible: !!document.getElementById('webgi-canvas'),
                setupAvailable: !!window.setupViewer
            };

            if (Object.values(status).every(Boolean)) {
                Logger.info('💚 System health check: All systems operational');
            } else {
                Logger.warn('⚠️ System health check: Some components offline', status);
            }
        }, 30000); // Check every 30 seconds

        ui.updateLoadingProgress('Enhancements applied!');

        // Hide loading screen
        setTimeout(() => {
            ui.hideLoadingScreen();
            Logger.info('🎉 Ring Try-On system ready with modular enhancements!');
        }, 2000);

    } catch (error) {
        Logger.error('❌ Enhancement application failed:', error);
        ui.updateLoadingProgress(`Enhancement error: ${error.message}`);
    }
}

/**
 * Initialize the observer system
 */
function initializeObserver() {
    Logger.info('🔧 Initializing Ring Try-On Observer...');

    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeAndEnhanceSystem);
    } else {
        observeAndEnhanceSystem();
    }
}

// Make functions globally available for compatibility
window.observeAndEnhanceSystem = observeAndEnhanceSystem;
window.initializeObserver = initializeObserver;

// Auto-start the observer
initializeObserver();

Logger.info('📦 Ring Try-On Observer module loaded');

export { observeAndEnhanceSystem, initializeObserver };