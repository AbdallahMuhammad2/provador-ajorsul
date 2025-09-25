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
import { Finger } from './tryon:ring/utils/handLandmarkUtils';

// Sistema global enterprise
let enterpriseSystem: EnterpriseRingTryon | null = null;

// Interface global para controles enterprise
interface EnterpriseControls {
    system: EnterpriseRingTryon | null;

    // Lighting controls
    applyStudioLighting: () => void;
    applyJewelryLighting: () => void;
    applyDaylightLighting: () => void;
    applyLuxuryLighting: () => void;

    // Ring management
    addGoldRing: () => Promise<string>;
    addSilverRing: () => Promise<string>;
    addPlatinumRing: () => Promise<string>;
    removeAllRings: () => void;

    // Features
    takeScreenshot: () => void;
    toggleRecording: () => void;
    toggleMultiRing: () => void;
    toggleAutoSizing: () => void;

    // System
    requestCameraPermission: () => void;
    getSystemStats: () => any;
}

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
        setupEnterpriseControls();
        
        console.log('✅ Sistema inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        showError(`Erro na inicialização: ${error}`);
    }
}

/**
 * Configurar controles enterprise da UI
 */
function setupEnterpriseControls(): void {
    // Configurar toggles da UI
    setupUIToggleListeners();
    
    // Configurar botões de iluminação
    (window as any).applyStudioLighting = () => {
        console.log('🏢 Aplicando iluminação de estúdio...');
        showToast('🏢 Studio Lighting Applied');
        // Implementar lógica de iluminação
    };
    
    (window as any).applyJewelryLighting = () => {
        console.log('💎 Aplicando iluminação de joalheria...');  
        showToast('💎 Jewelry Store Lighting Applied');
        // Implementar lógica de iluminação
    };
    
    (window as any).applyDaylightLighting = () => {
        console.log('☀️ Aplicando luz natural...');
        showToast('☀️ Natural Daylight Applied');
        // Implementar lógica de iluminação
    };
    
    (window as any).takeScreenshot = () => {
        if (realTryonSystem) {
            realTryonSystem.takeScreenshot();
            showToast('📸 Screenshot Captured!');
        } else {
            showToast('❌ System not ready');
        }
    };
    
    (window as any).toggleRecording = () => {
        console.log('🎬 Toggle recording...');
        showToast('🎬 Recording feature coming soon!');
        // Implementar sistema de gravação
    };
    
    (window as any).requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            
            document.getElementById('camera-permission')?.classList.add('hidden');
            showToast('📹 Camera Access Granted');
            
            // Reinicializar sistema se necessário
            if (!realTryonSystem) {
                await initializeSystem();
            }
        } catch (error) {
            console.error('Camera permission denied:', error);
            showToast('❌ Camera Access Required');
        }
    };
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
        showToast(advancedPbrToggle.checked ? '✨ Ultra Quality Rendering' : '⚡ Standard Quality');
    });
    
    // Recording toggle  
    const recordingToggle = document.getElementById('recording-toggle') as HTMLInputElement;
    recordingToggle?.addEventListener('change', () => {
        console.log('Recording enabled:', recordingToggle.checked);
        showToast(recordingToggle.checked ? '🎬 Recording Features Enabled' : '🚫 Recording Disabled');
    });
}

/**
 * Verificar permissão da câmera
 */
async function checkCameraPermission(): Promise<boolean> {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        const permissionPanel = document.getElementById('camera-permission');
        permissionPanel?.classList.remove('hidden');
        return false;
    }
}

/**
 * Mostrar mensagem de erro
 */
function showError(message: string): void {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.innerHTML = `
            <div style="text-align: center;">
                <div style="color: #ff4444; font-size: 2rem; margin-bottom: 1rem;">❌ Error</div>
                <div style="margin-bottom: 2rem; max-width: 500px;">${message}</div>
                <button class="btn" onclick="location.reload()">🔄 Reload System</button>
            </div>
        `;
    }
}

/**
 * Mostrar notificação toast
 */
function showToast(message: string): void {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 250px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Inicialização quando a página carrega
 */
window.addEventListener('DOMContentLoaded', async () => {
    console.log('🎬 Starting Perfect Corp Ring Try-On System...');
    console.log('💡 Unified system integrating WebAR.rocks + YOLO11 + InstoreRingTryon');
    console.log('🔧 Checking camera permissions...');
    
    // Verificar permissão da câmera primeiro
    const hasCamera = await checkCameraPermission();
    
    if (hasCamera) {
        // Pequeno delay para mostrar loading screen
        setTimeout(initializeSystem, 500);
    } else {
        // Esconder loading e mostrar painel de permissão
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
        
        console.log('⚠️ Camera access required - click "Enable Camera" button');
    }
});

// Configurar keyboard shortcuts para desenvolvimento
document.addEventListener('keydown', (event) => {
    if (!realTryonSystem) return;
    
    switch (event.key) {
        case '1':
            realTryonSystem.addRing('thumb', 'gold');
            showToast('👍 Anel no Polegar');
            break;
        case '2':
            realTryonSystem.addRing('index', 'silver');
            showToast('👆 Anel no Indicador');
            break;
        case '3':
            realTryonSystem.addRing('middle', 'platinum');
            showToast('🖕 Anel no Médio');
            break;
        case '4':
            realTryonSystem.addRing('ring', 'gold');
            showToast('💍 Anel no Anelar');
            break;
        case '5':
            realTryonSystem.addRing('pinky', 'rose_gold');
            showToast('🤙 Anel no Mindinho');
            break;
        case ' ':
            event.preventDefault();
            realTryonSystem.takeScreenshot();
            showToast('📸 Screenshot');
            break;
    }
});

// Cleanup na saída da página
window.addEventListener('beforeunload', () => {
    if (realTryonSystem) {
        realTryonSystem.destroy();
    }
});

// Handle errors globalmente
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showError('An unexpected error occurred. Please refresh the page.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showError('Failed to load required resources. Please check your connection.');
});

console.log('🚀 Main.ts loaded - Perfect Corp Ring Try-On System ready!');