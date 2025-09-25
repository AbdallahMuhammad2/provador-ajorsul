/**
 * MAIN WORKING - SISTEMA ENTERPRISE FUNCIONAL
 * Sistema simplificado mas totalmente funcional
 */

import { EnterpriseMinimal } from './EnterpriseMinimal';
import { CameraDebug } from './cameraDebug';

// Sistema global
let enterpriseSystem: EnterpriseMinimal | null = null;

/**
 * Inicialização do sistema
 */
async function initializeSystem(): Promise<void> {
    try {
        console.log('🏢 Iniciando Enterprise Ring Try-On System...');

        // Get canvas
        const canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }

        // Configurações
        const config = {
            webAR: {
                neuralNetsPath: './WebAR.rocks-2.hand-master/neuralNets/',
                confidence: 0.8
            },
            rendering: {
                quality: 'high' as const,
                enablePBR: true
            },
            rings: {
                enableMultiRing: true,
                enableAutoSizing: true,
                defaultMaterial: 'gold' as const
            }
        };

        // Inicializar sistema
        enterpriseSystem = new EnterpriseMinimal(canvas, config);
        await enterpriseSystem.initialize();

        // Setup controles
        setupControls();

        console.log('✅ Sistema enterprise ativo!');

    } catch (error) {
        console.error('❌ Erro:', error);
        showError(`Initialization failed: ${error}`);
    }
}

/**
 * Setup de controles
 */
function setupControls(): void {
    // Lighting controls
    (window as any).applyStudioLighting = () => {
        enterpriseSystem?.applyLightingPreset('studio');
        showToast('🏢 Studio Lighting Applied');
    };

    (window as any).applyJewelryLighting = () => {
        enterpriseSystem?.applyLightingPreset('jewelry-store');
        showToast('💎 Jewelry Store Lighting Applied');
    };

    (window as any).applyDaylightLighting = () => {
        enterpriseSystem?.applyLightingPreset('daylight');
        showToast('☀️ Natural Daylight Applied');
    };

    (window as any).applyLuxuryLighting = () => {
        enterpriseSystem?.applyLightingPreset('luxury');
        showToast('✨ Luxury Lighting Applied');
    };

    // Ring controls
    (window as any).addGoldRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(3, 'gold'); // Ring finger
            showToast('🥇 Gold Ring Added!');
            return ringId;
        }
    };

    // Test controls for debugging
    (window as any).addTestRing = () => {
        if (enterpriseSystem) {
            const ringId = enterpriseSystem.addTestRing();
            showToast('🔴 Red Test Ring Added in Center!');
            return ringId;
        }
    };

    (window as any).debugRings = () => {
        if (enterpriseSystem) {
            const stats = enterpriseSystem.getStats();
            console.log('🔍 Debug Ring Stats:', stats);
            enterpriseSystem.debugScene();
            showToast(`Debug: ${stats.rings?.totalRings || 0} rings active`);
        }
    };

    (window as any).toggleVideoBackground = () => {
        if (enterpriseSystem) {
            enterpriseSystem.toggleVideoBackground();
            showToast('📹 Video background toggled');
        }
    };

    (window as any).addSilverRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(3, 'silver');
            showToast('🥈 Silver Ring Added!');
            return ringId;
        }
    };

    (window as any).addPlatinumRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(3, 'platinum');
            showToast('⭐ Platinum Ring Added!');
            return ringId;
        }
    };

    (window as any).removeAllRings = () => {
        enterpriseSystem?.removeAllRings();
        showToast('🗑️ All Rings Removed');
    };

    // Screenshot
    (window as any).takeScreenshot = () => {
        if (enterpriseSystem) {
            const screenshot = enterpriseSystem.takeScreenshot();
            const link = document.createElement('a');
            link.download = `enterprise-ring-${Date.now()}.png`;
            link.href = screenshot;
            link.click();
            showToast('📸 Screenshot Captured!');
        }
    };

    // Recording (placeholder)
    (window as any).toggleRecording = () => {
        showToast('🎬 Recording feature coming soon!');
    };

    // Camera permission
    (window as any).requestCameraPermission = async () => {
        try {
            // Request camera permission and restart system
            await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });

            // Remove permission UI
            const permissionDiv = document.getElementById('camera-permission');
            if (permissionDiv) {
                permissionDiv.remove();
            }

            showToast('📹 Camera Access Granted - Reinitializing...');

            // Dispose current system and recreate with camera
            if (enterpriseSystem) {
                enterpriseSystem.dispose();
            }

            // Reinitialize system
            await initializeSystem();

        } catch (error) {
            console.error('Camera permission denied:', error);
            showToast('❌ Camera Access Required for Hand Tracking');
        }
    };

    // Toggle listeners
    setupToggleListeners();

    // Keyboard shortcuts
    setupKeyboardShortcuts();

    // System monitoring
    setupSystemMonitoring();

    console.log('🎛️ Enterprise controls configured');
}

/**
 * Setup toggle listeners
 */
function setupToggleListeners(): void {
    const multiRingToggle = document.getElementById('multi-ring-toggle') as HTMLInputElement;
    multiRingToggle?.addEventListener('change', () => {
        showToast(multiRingToggle.checked ? '💍 Multi-Ring Mode Enabled' : '💍 Single Ring Mode');
    });

    const autoSizingToggle = document.getElementById('auto-sizing-toggle') as HTMLInputElement;
    autoSizingToggle?.addEventListener('change', () => {
        showToast(autoSizingToggle.checked ? '📏 Auto-Sizing Enabled' : '📏 Manual Sizing');
    });

    const advancedPbrToggle = document.getElementById('advanced-pbr-toggle') as HTMLInputElement;
    advancedPbrToggle?.addEventListener('change', () => {
        showToast(advancedPbrToggle.checked ? '✨ Advanced PBR Enabled' : '✨ Standard Rendering');
    });
}

/**
 * Keyboard shortcuts
 */
function setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
        if (['Space', 'KeyG', 'KeyS', 'KeyP', 'KeyL'].includes(event.code)) {
            event.preventDefault();
        }

        switch (event.code) {
            case 'Space':
                (window as any).takeScreenshot?.();
                break;
            case 'KeyG':
                (window as any).addGoldRing?.();
                break;
            case 'KeyS':
                (window as any).addSilverRing?.();
                break;
            case 'KeyP':
                (window as any).addPlatinumRing?.();
                break;
            case 'KeyL':
                cycleLighting();
                break;
        }
    });
}

/**
 * Cycle lighting presets
 */
function cycleLighting(): void {
    const presets = ['studio', 'jewelry', 'daylight', 'luxury'];
    const current = (window as any).currentPreset || 0;
    const next = (current + 1) % presets.length;

    switch (presets[next]) {
        case 'studio': (window as any).applyStudioLighting?.(); break;
        case 'jewelry': (window as any).applyJewelryLighting?.(); break;
        case 'daylight': (window as any).applyDaylightLighting?.(); break;
        case 'luxury': (window as any).applyLuxuryLighting?.(); break;
    }

    (window as any).currentPreset = next;
}

/**
 * System monitoring
 */
function setupSystemMonitoring(): void {
    setInterval(() => {
        if (enterpriseSystem) {
            const stats = enterpriseSystem.getStats();

            // Update FPS
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) {
                fpsElement.textContent = `${stats.system?.fps || 0} FPS`;
            }

            // Update hand status
            const handElement = document.getElementById('hand-status');
            if (handElement) {
                handElement.textContent = stats.system?.handDetected ? 'Hand Detected' : 'No Hand';
                handElement.className = stats.system?.handDetected ? 'status-active' : 'status-inactive';
            }

            // Update ring count
            const ringElement = document.getElementById('ring-count');
            if (ringElement) {
                ringElement.textContent = `${stats.rings?.totalRings || 0} Rings`;
            }
        }
    }, 1000);
}

/**
 * Error display
 */
function showError(message: string): void {
    console.error(message);
    showToast(`❌ ${message}`, 5000);
}

/**
 * Toast notifications
 */
function showToast(message: string, duration: number = 3000): void {
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.textContent = message;

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

    setTimeout(() => toast.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Debug utilities
(window as any).testCamera = () => CameraDebug.testCameraAccess();
(window as any).showCameraInfo = () => CameraDebug.showCameraInfo();

// Global debug access
(window as any).enterpriseSystem = () => enterpriseSystem;

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    initializeSystem();
}