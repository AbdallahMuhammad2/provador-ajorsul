/**
 * CAMERA DEBUG UTILITIES
 * Helper functions for debugging camera and hand tracking
 */

export class CameraDebug {
    /**
     * Test camera access and capabilities
     */
    static async testCameraAccess(): Promise<void> {
        try {
            console.log('🔍 Testing camera access...');

            // Get available devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log(`📹 Found ${videoDevices.length} video devices:`, videoDevices);

            // Test basic camera access
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30 }
                }
            });

            const settings = stream.getVideoTracks()[0].getSettings();
            console.log('📊 Camera settings:', settings);

            // Stop stream
            stream.getTracks().forEach(track => track.stop());

            console.log('✅ Camera access test successful!');

        } catch (error) {
            console.error('❌ Camera access test failed:', error);
            throw error;
        }
    }

    /**
     * Get detailed camera capabilities
     */
    static async getCameraCapabilities(): Promise<any> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const track = stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            const settings = track.getSettings();

            stream.getTracks().forEach(track => track.stop());

            return {
                capabilities,
                settings,
                constraints: track.getConstraints()
            };
        } catch (error) {
            console.error('Failed to get camera capabilities:', error);
            return null;
        }
    }

    /**
     * Show camera info overlay
     */
    static showCameraInfo(): void {
        this.getCameraCapabilities().then(info => {
            if (!info) return;

            const infoDiv = document.createElement('div');
            infoDiv.style.position = 'fixed';
            infoDiv.style.top = '10px';
            infoDiv.style.left = '10px';
            infoDiv.style.background = 'rgba(0, 0, 0, 0.8)';
            infoDiv.style.color = 'white';
            infoDiv.style.padding = '10px';
            infoDiv.style.borderRadius = '5px';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.zIndex = '10000';
            infoDiv.style.maxWidth = '300px';
            infoDiv.style.wordWrap = 'break-word';

            infoDiv.innerHTML = `
                <strong>📹 Camera Info</strong><br>
                Resolution: ${info.settings.width}x${info.settings.height}<br>
                Frame Rate: ${info.settings.frameRate}<br>
                Facing Mode: ${info.settings.facingMode}<br>
                Device ID: ${info.settings.deviceId}<br>
                <button onclick="this.parentElement.remove()" style="margin-top: 5px;">Close</button>
            `;

            document.body.appendChild(infoDiv);
        });
    }
}

// Add to global scope for easy debugging
(window as any).CameraDebug = CameraDebug;