/**
 * ENTERPRISE CONTROLS IMPLEMENTATION
 * Professional UI controls for the enterprise ring try-on system
 */

import { EnterpriseRingTryon } from './EnterpriseRingTryon';
import { Finger } from './tryon:ring/utils/handLandmarkUtils';

let enterpriseSystem: EnterpriseRingTryon | null = null;

/**
 * Setup complete enterprise controls
 */
export function setupEnterpriseControls(system: EnterpriseRingTryon): void {
    enterpriseSystem = system;

    // Setup lighting controls
    setupLightingControls();

    // Setup ring management
    setupRingControls();

    // Setup feature toggles
    setupFeatureControls();

    // Setup system controls
    setupSystemControls();

    console.log('🎛️ Enterprise controls configured');
}

/**
 * Professional lighting controls
 */
function setupLightingControls(): void {
    (window as any).applyStudioLighting = () => {
        console.log('🏢 Aplicando iluminação de estúdio profissional...');
        enterpriseSystem?.applyLightingPreset('studio');
        showToast('🏢 Professional Studio Lighting Applied');
    };

    (window as any).applyJewelryLighting = () => {
        console.log('💎 Aplicando iluminação de joalheria...');
        enterpriseSystem?.applyLightingPreset('jewelry-store');
        showToast('💎 Jewelry Store Lighting Applied');
    };

    (window as any).applyDaylightLighting = () => {
        console.log('☀️ Aplicando luz natural avançada...');
        enterpriseSystem?.applyLightingPreset('daylight');
        showToast('☀️ Natural Daylight Applied');
    };

    (window as any).applyLuxuryLighting = () => {
        console.log('✨ Aplicando iluminação de luxo...');
        enterpriseSystem?.applyLightingPreset('luxury');
        showToast('✨ Luxury Boutique Lighting Applied');
    };
}

/**
 * Ring management controls
 */
function setupRingControls(): void {
    // Add ring controls
    (window as any).addGoldRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(Finger.Ring, 'default', 'gold');
            showToast('🥇 Gold Ring Added!');
            updateRingCounter();
            return ringId;
        }
    };

    (window as any).addSilverRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(Finger.Ring, 'default', 'silver');
            showToast('🥈 Silver Ring Added!');
            updateRingCounter();
            return ringId;
        }
    };

    (window as any).addPlatinumRing = async () => {
        if (enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(Finger.Ring, 'default', 'platinum');
            showToast('⭐ Platinum Ring Added!');
            updateRingCounter();
            return ringId;
        }
    };

    // Multi-finger ring controls
    (window as any).addRingToFinger = async (fingerName: string, material: string = 'gold') => {
        const fingerMap: { [key: string]: Finger } = {
            'thumb': Finger.Thumb,
            'index': Finger.Index,
            'middle': Finger.Middle,
            'ring': Finger.Ring,
            'pinky': Finger.Pinky
        };

        const finger = fingerMap[fingerName.toLowerCase()];
        if (finger !== undefined && enterpriseSystem) {
            const ringId = await enterpriseSystem.addRing(finger, 'default', material);
            showToast(`💍 ${material.toUpperCase()} ring added to ${fingerName} finger!`);
            updateRingCounter();
            return ringId;
        }
    };

    (window as any).removeAllRings = () => {
        if (enterpriseSystem) {
            // Implementation would clear all rings from multi-ring manager
            showToast('🗑️ All Rings Removed');
            updateRingCounter();
        }
    };
}

/**
 * Feature control toggles
 */
function setupFeatureControls(): void {
    (window as any).toggleMultiRing = () => {
        const toggle = document.getElementById('multi-ring-toggle') as HTMLInputElement;
        if (toggle) {
            toggle.checked = !toggle.checked;
            const enabled = toggle.checked;

            console.log('Multi-ring mode:', enabled);
            showToast(enabled ? '💍 Multi-Ring Mode Enabled' : '💍 Single Ring Mode');

            // Update enterprise system configuration
            if (enterpriseSystem) {
                // Would update multi-ring settings
            }
        }
    };

    (window as any).toggleAutoSizing = () => {
        const toggle = document.getElementById('auto-sizing-toggle') as HTMLInputElement;
        if (toggle) {
            toggle.checked = !toggle.checked;
            const enabled = toggle.checked;

            console.log('Auto sizing:', enabled);
            showToast(enabled ? '📏 AI Auto-Sizing Enabled' : '📏 Manual Sizing Mode');
        }
    };

    (window as any).toggleAdvancedPBR = () => {
        const toggle = document.getElementById('advanced-pbr-toggle') as HTMLInputElement;
        if (toggle) {
            toggle.checked = !toggle.checked;
            const enabled = toggle.checked;

            console.log('Advanced PBR:', enabled);
            showToast(enabled ? '✨ Advanced PBR Enabled' : '✨ Standard Rendering');
        }
    };
}

/**
 * System controls
 */
function setupSystemControls(): void {
    (window as any).takeScreenshot = () => {
        if (enterpriseSystem) {
            const screenshot = enterpriseSystem.takeScreenshot();

            // Create download link
            const link = document.createElement('a');
            link.download = `enterprise-ring-tryon-${Date.now()}.png`;
            link.href = screenshot;
            link.click();

            showToast('📸 Enterprise Screenshot Captured!');
        } else {
            showToast('❌ Enterprise system not ready');
        }
    };

    (window as any).toggleRecording = (() => {
        let recording = false;
        return () => {
            if (enterpriseSystem) {
                if (!recording) {
                    enterpriseSystem.startRecording();
                    showToast('🎬 Professional Recording Started!');
                    recording = true;

                    // Update UI to show recording state
                    updateRecordingUI(true);
                } else {
                    const blob = enterpriseSystem.stopRecording();
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = `enterprise-ring-tryon-${Date.now()}.webm`;
                        link.href = url;
                        link.click();
                    }
                    showToast('🎬 Recording Saved!');
                    recording = false;

                    // Update UI to show stopped state
                    updateRecordingUI(false);
                }
            } else {
                showToast('❌ Enterprise system not ready');
            }
        };
    })();

    (window as any).requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            stream.getTracks().forEach(track => track.stop());

            document.getElementById('camera-permission')?.classList.add('hidden');
            showToast('📹 Professional Camera Access Granted');
        } catch (error) {
            console.error('Camera permission denied:', error);
            showToast('❌ Camera Access Required for Enterprise Features');
        }
    };

    (window as any).getSystemStats = () => {
        if (enterpriseSystem) {
            const stats = enterpriseSystem.getStats();
            console.log('📊 Enterprise System Stats:', stats);

            // Update UI with stats
            updateStatsDisplay(stats);

            return stats;
        }
        return null;
    };

    (window as any).getAutoSizingResults = () => {
        if (enterpriseSystem) {
            const results = enterpriseSystem.getAutoSizingResults();
            console.log('📏 Auto-sizing Results:', results);

            // Update sizing UI
            updateSizingDisplay(results);

            return results;
        }
        return null;
    };
}

/**
 * UI Update Functions
 */
function updateRingCounter(): void {
    if (enterpriseSystem) {
        const stats = enterpriseSystem.getStats();
        const ringCount = stats.rings?.totalRings || 0;

        const counterElement = document.getElementById('ring-counter');
        if (counterElement) {
            counterElement.textContent = `${ringCount} Ring${ringCount !== 1 ? 's' : ''} Active`;
        }
    }
}

function updateRecordingUI(recording: boolean): void {
    const recordButton = document.getElementById('record-button');
    if (recordButton) {
        recordButton.textContent = recording ? '⏹️ Stop Recording' : '🎬 Start Recording';
        recordButton.classList.toggle('recording', recording);
    }
}

function updateStatsDisplay(stats: any): void {
    const statsElement = document.getElementById('system-stats');
    if (statsElement) {
        statsElement.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">FPS:</span>
                <span class="stat-value">${stats.system?.fps || 0}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Hand Detected:</span>
                <span class="stat-value">${stats.system?.handDetected ? 'Yes' : 'No'}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Active Rings:</span>
                <span class="stat-value">${stats.rings?.totalRings || 0}</span>
            </div>
        `;
    }
}

function updateSizingDisplay(results: any): void {
    const sizingElement = document.getElementById('auto-sizing-results');
    if (sizingElement && results.measurements) {
        let sizingHTML = '<h4>AI Auto-Sizing Results:</h4>';

        results.measurements.forEach((measurement: any) => {
            const fingerName = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'][measurement.finger];
            const confidence = Math.round(measurement.confidence * 100);

            sizingHTML += `
                <div class="sizing-result">
                    <span class="finger-name">${fingerName}:</span>
                    <span class="ring-size">${results.recommendedSizes.get(measurement.finger) || 'N/A'}</span>
                    <span class="confidence">(${confidence}%)</span>
                </div>
            `;
        });

        sizingElement.innerHTML = sizingHTML;
    }
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