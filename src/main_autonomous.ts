/**
 * AUTONOMOUS RING TRY-ON - MAIN ENTRY POINT
 * Sistema completamente independente
 * Sem dependências de APIs externas
 */

import { AutonomousRingTryon, RingConfig } from './independent/AutonomousRingTryon';

// Sistema global
let ringSystem: AutonomousRingTryon | null = null;

/**
 * Configurações de anéis disponíveis
 */
const RING_CONFIGS: Record<number, RingConfig> = {
    1: {
        modelPath: './rings/1.glb',
        material: 'silver',
        scale: 0.15,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 1.5708, y: 0, z: 0 }
    },
    2: {
        modelPath: './rings/2.glb',
        material: 'gold',
        scale: 0.15,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 1.5708, y: 0, z: 0 }
    },
    3: {
        modelPath: './rings/3.glb',
        material: 'platinum',
        scale: 0.15,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 1.5708, y: 0, z: 0 }
    }
};

/**
 * Inicialização do sistema autônomo
 */
async function initializeSystem(): Promise<void> {
    try {
        console.log('🚀 Iniciando Sistema Autônomo Ring Try-On...');

        // Get canvas
        const canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }

        // Criar sistema
        ringSystem = new AutonomousRingTryon(canvas);
        await ringSystem.initialize();

        // Setup controles
        setupControls();

        // Setup resize handler
        window.addEventListener('resize', () => {
            ringSystem?.onResize();
        });

        // Remover loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 300);
        }

        console.log('✅ Sistema Autônomo ativo!');
        showNotification('Sistema pronto! Teste os controles.');

    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        showError(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
}

/**
 * Setup de controles
 */
function setupControls(): void {
    // Materiais
    (window as any).addGoldRing = async () => {
        if (ringSystem) {
            const config = { ...RING_CONFIGS[2], material: 'gold' as const };
            await ringSystem.addRing(config);
            showNotification('Anel de ouro adicionado!');
        }
    };

    (window as any).addSilverRing = async () => {
        if (ringSystem) {
            const config = { ...RING_CONFIGS[1], material: 'silver' as const };
            await ringSystem.addRing(config);
            showNotification('Anel de prata adicionado!');
        }
    };

    (window as any).addPlatinumRing = async () => {
        if (ringSystem) {
            const config = { ...RING_CONFIGS[3], material: 'platinum' as const };
            await ringSystem.addRing(config);
            showNotification('Anel de platina adicionado!');
        }
    };

    // Iluminação
    (window as any).applyStudioLighting = () => {
        ringSystem?.applyLightingPreset('studio');
        showNotification('Iluminação de estúdio aplicada');
    };

    (window as any).applyJewelryLighting = () => {
        ringSystem?.applyLightingPreset('jewelry');
        showNotification('Iluminação de joalheria aplicada');
    };

    (window as any).applyDaylightLighting = () => {
        ringSystem?.applyLightingPreset('daylight');
        showNotification('Luz natural aplicada');
    };

    (window as any).applyLuxuryLighting = () => {
        ringSystem?.applyLightingPreset('luxury');
        showNotification('Iluminação luxo aplicada');
    };

    // Ações
    (window as any).removeAllRings = () => {
        ringSystem?.removeAllRings();
        showNotification('Todos os anéis removidos');
    };

    (window as any).takeScreenshot = () => {
        if (ringSystem) {
            const screenshot = ringSystem.takeScreenshot();
            const link = document.createElement('a');
            link.download = `autonomous-ring-${Date.now()}.png`;
            link.href = screenshot;
            link.click();
            showNotification('Screenshot capturado!');
        }
    };

    (window as any).toggleRecording = () => {
        showNotification('Gravação será implementada em breve');
    };

    // Keyboard shortcuts
    setupKeyboardShortcuts();

    // System monitoring
    setupSystemMonitoring();

    console.log('🎛️ Controles autônomos configurados');
}

/**
 * Keyboard shortcuts
 */
function setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                (window as any).takeScreenshot?.();
                break;
            case 'KeyG':
                event.preventDefault();
                (window as any).addGoldRing?.();
                break;
            case 'KeyS':
                event.preventDefault();
                (window as any).addSilverRing?.();
                break;
            case 'KeyP':
                event.preventDefault();
                (window as any).addPlatinumRing?.();
                break;
            case 'KeyR':
                event.preventDefault();
                (window as any).removeAllRings?.();
                break;
            case 'KeyL':
                event.preventDefault();
                cycleLighting();
                break;
        }
    });
}

/**
 * Cycle lighting presets
 */
let currentLightingPreset = 0;
function cycleLighting(): void {
    const presets = ['studio', 'jewelry', 'daylight', 'luxury'];
    currentLightingPreset = (currentLightingPreset + 1) % presets.length;

    switch (presets[currentLightingPreset]) {
        case 'studio':
            (window as any).applyStudioLighting?.();
            break;
        case 'jewelry':
            (window as any).applyJewelryLighting?.();
            break;
        case 'daylight':
            (window as any).applyDaylightLighting?.();
            break;
        case 'luxury':
            (window as any).applyLuxuryLighting?.();
            break;
    }
}

/**
 * System monitoring
 */
function setupSystemMonitoring(): void {
    setInterval(() => {
        if (ringSystem) {
            const stats = ringSystem.getStats();

            // Update FPS
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) {
                fpsElement.textContent = `${stats.fps} FPS`;
            }

            // Update hand status
            const handElement = document.getElementById('hand-status');
            if (handElement) {
                handElement.textContent = stats.handDetected ? 'Mão Detectada' : 'Sem Mão';
                handElement.className = stats.handDetected ? 'status-active' : 'status-inactive';
            }

            // Update ring count
            const ringElement = document.getElementById('ring-count');
            if (ringElement) {
                ringElement.textContent = `${stats.ringsActive} Anéis`;
            }
        }
    }, 1000);
}

/**
 * Notifications
 */
function showNotification(message: string, duration: number = 3000): void {
    const existingToast = document.getElementById('notification');
    if (existingToast) {
        existingToast.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        zIndex: '10000',
        fontSize: '14px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Error display
 */
function showError(message: string): void {
    console.error(message);
    showNotification(`❌ ${message}`, 5000);
}

// Debug utilities
(window as any).debugSystem = () => {
    if (ringSystem) {
        const stats = ringSystem.getStats();
        console.log('📊 Sistema Stats:', stats);
    }
};

(window as any).getAutonomousSystem = () => ringSystem;

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    initializeSystem();
}

// Export for debugging
export { ringSystem, showNotification };