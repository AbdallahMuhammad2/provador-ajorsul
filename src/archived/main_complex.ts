/**
 * MAIN ENTRY POINT - ENTERPRISE RING TRY-ON SYSTEM
 * Professional integration of enterprise-grade modules:
 * - EnterpriseRingTryon (main system)
 * - PerfectCorpRingTryonPlugin (enterprise features)
 * - WebAR.rocks (professional tracking)
 * - Advanced PBR Materials
 * - Multi-ring capabilities
 * - AI Auto-sizing
 */

import { EnterpriseRingTryon } from './EnterpriseRingTryon';
import { initializeWebGICompatibility } from './adapters/WebGIAdapter';
import { setupEnterpriseControls } from './main_enterprise_controls';
import { Finger } from './tryon:ring/utils/handLandmarkUtils';

// Sistema global enterprise
let enterpriseSystem: EnterpriseRingTryon | null = null;

/**
 * Inicialização principal do sistema enterprise
 */
async function initializeEnterpriseSystem(): Promise<void> {
    try {
        console.log('🏢 Iniciando Enterprise Ring Try-On System...');

        // Initialize WebGI compatibility layer
        initializeWebGICompatibility();

        // Get canvas element
        const canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }

        // Configurações enterprise
        const enterpriseConfig = {
            webAR: {
                neuralNetsPath: './WebAR.rocks-2.hand-master/neuralNets/',
                videoSettings: {
                    idealWidth: 1280,
                    idealHeight: 720,
                    maxWidth: 1920,
                    maxHeight: 1080
                },
                stabilization: true,
                confidence: 0.8
            },
            rendering: {
                quality: 'high' as const,
                enablePBR: true,
                enableIBL: true,
                shadowMapSize: 2048,
                antialias: true
            },
            rings: {
                enableMultiRing: true,
                enableAutoSizing: true,
                maxRingsPerFinger: 3,
                ringSpacing: 0.2,
                defaultMaterial: 'gold'
            },
            performance: {
                targetFPS: 60,
                enableWebWorkers: true,
                enableLOD: true,
                cullingDistance: 10
            }
        };

        // Criar e inicializar SISTEMA ENTERPRISE
        enterpriseSystem = new EnterpriseRingTryon(canvas, enterpriseConfig);
        await enterpriseSystem.initialize();

        // Setup controles enterprise
        setupEnterpriseControls(enterpriseSystem);

        // Setup UI listeners
        setupUIToggleListeners();

        console.log('✅ Enterprise System initialized successfully!');

    } catch (error) {
        console.error('❌ Erro na inicialização enterprise:', error);
        showError(`Enterprise initialization failed: ${error}`);
    }
}

/**
 * Configurar listeners dos toggles da UI
 */
function setupUIToggleListeners(): void {
    // Multi-ring toggle
    const multiRingToggle = document.getElementById('multi-ring-toggle') as HTMLInputElement;
    multiRingToggle?.addEventListener('change', () => {
        console.log('Multi-ring mode:', multiRingToggle.checked);
        showToast(multiRingToggle.checked ? '💍 Multi-Ring Mode Enabled' : '💍 Single Ring Mode');
    });

    // Auto-sizing toggle
    const autoSizingToggle = document.getElementById('auto-sizing-toggle') as HTMLInputElement;
    autoSizingToggle?.addEventListener('change', () => {
        console.log('Auto sizing:', autoSizingToggle.checked);
        showToast(autoSizingToggle.checked ? '📏 Auto Finger Sizing Enabled' : '📏 Manual Sizing Mode');
    });

    // PBR toggle
    const advancedPbrToggle = document.getElementById('advanced-pbr-toggle') as HTMLInputElement;
    advancedPbrToggle?.addEventListener('change', () => {
        console.log('Advanced PBR:', advancedPbrToggle.checked);
        showToast(advancedPbrToggle.checked ? '✨ Advanced PBR Enabled' : '✨ Standard Rendering');
    });

    // Recording toggle
    const recordingToggle = document.getElementById('recording-toggle') as HTMLInputElement;
    recordingToggle?.addEventListener('change', () => {
        console.log('Recording enabled:', recordingToggle.checked);
        showToast(recordingToggle.checked ? '🎬 Recording Enabled' : '🎬 Recording Disabled');
    });

    console.log('🎛️ UI toggle listeners configured');
}

/**
 * Função utilitária para mostrar erros
 */
function showError(message: string): void {
    console.error(message);

    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Show toast error
    showToast(`❌ ${message}`, 5000);
}

/**
 * Toast notification system
 */
function showToast(message: string, duration: number = 3000): void {
    // Remove existing toast
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    toast.textContent = message;

    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: '10000',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out'
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/**
 * Keyboard shortcuts for enterprise features
 */
function setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
        // Prevent default only for our shortcuts
        const isOurShortcut = ['Space', 'KeyG', 'KeyS', 'KeyP', 'KeyL', 'KeyR'].includes(event.code);

        if (isOurShortcut) {
            event.preventDefault();
        }

        switch (event.code) {
            case 'Space':
                // Take screenshot
                (window as any).takeScreenshot?.();
                break;

            case 'KeyG':
                // Add gold ring
                (window as any).addGoldRing?.();
                break;

            case 'KeyS':
                // Add silver ring
                (window as any).addSilverRing?.();
                break;

            case 'KeyP':
                // Add platinum ring
                (window as any).addPlatinumRing?.();
                break;

            case 'KeyL':
                // Cycle lighting
                cycleLighting();
                break;

            case 'KeyR':
                // Toggle recording
                (window as any).toggleRecording?.();
                break;
        }
    });

    console.log('⌨️ Enterprise keyboard shortcuts configured');
}

/**
 * Cycle through lighting presets
 */
function cycleLighting(): void {
    const presets = ['studio', 'jewelry-store', 'daylight', 'luxury'];
    const currentPreset = (window as any).currentLightingPreset || 0;
    const nextPreset = (currentPreset + 1) % presets.length;

    switch (presets[nextPreset]) {
        case 'studio':
            (window as any).applyStudioLighting?.();
            break;
        case 'jewelry-store':
            (window as any).applyJewelryLighting?.();
            break;
        case 'daylight':
            (window as any).applyDaylightLighting?.();
            break;
        case 'luxury':
            (window as any).applyLuxuryLighting?.();
            break;
    }

    (window as any).currentLightingPreset = nextPreset;
}

/**
 * Setup periodic system monitoring
 */
function setupSystemMonitoring(): void {
    setInterval(() => {
        if (enterpriseSystem) {
            const stats = enterpriseSystem.getStats();

            // Update FPS counter
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) {
                fpsElement.textContent = `${stats.system?.fps || 0} FPS`;
            }

            // Update hand status
            const handStatusElement = document.getElementById('hand-status');
            if (handStatusElement) {
                handStatusElement.textContent = stats.system?.handDetected ? 'Hand Detected' : 'No Hand Detected';
                handStatusElement.className = stats.system?.handDetected ? 'status-active' : 'status-inactive';
            }

            // Update ring counter
            const ringCountElement = document.getElementById('ring-count');
            if (ringCountElement) {
                ringCountElement.textContent = `${stats.rings?.totalRings || 0} Rings`;
            }
        }
    }, 1000); // Update every second

    console.log('📊 System monitoring configured');
}

// Global access to enterprise system for debugging
(window as any).enterpriseSystem = () => enterpriseSystem;
(window as any).getEnterpriseStats = () => enterpriseSystem?.getStats();

// Inicializar sistema enterprise quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initializeEnterpriseSystem();
        setupKeyboardShortcuts();
        setupSystemMonitoring();
    });
} else {
    initializeEnterpriseSystem().then(() => {
        setupKeyboardShortcuts();
        setupSystemMonitoring();
    });
}