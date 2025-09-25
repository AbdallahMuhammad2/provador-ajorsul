/**
 * MOCK HAND TRACKER - Sistema de fallback
 * Para quando MediaPipe não estiver disponível
 */

export interface HandLandmark {
    x: number;
    y: number;
    z: number;
}

export interface HandDetectionResult {
    landmarks: HandLandmark[];
    isRightHand: boolean;
    detected: boolean;
    confidence: number;
}

export class MockHandTracker {
    private onResults?: (result: HandDetectionResult) => void;
    private intervalId?: number;
    private mockPosition = { x: 0.5, y: 0.5, z: 0 };

    constructor() {
        console.log('🎭 Mock Hand Tracker iniciado (fallback mode)');
    }

    async initialize(): Promise<void> {
        // Simular hand tracking no centro da tela
        this.intervalId = window.setInterval(() => {
            if (this.onResults) {
                // Adicionar pequena variação para simular movimento natural
                const variation = 0.02;
                const x = 0.5 + (Math.random() - 0.5) * variation;
                const y = 0.5 + (Math.random() - 0.5) * variation;
                const z = 0 + (Math.random() - 0.5) * 0.01;

                const mockResult: HandDetectionResult = {
                    landmarks: this.generateMockLandmarks(x, y, z),
                    isRightHand: true,
                    detected: true,
                    confidence: 0.9
                };

                this.onResults(mockResult);
            }
        }, 1000 / 30); // 30 FPS

        console.log('✅ Mock Hand Tracker ativo (demo mode)');
    }

    private generateMockLandmarks(centerX: number, centerY: number, centerZ: number): HandLandmark[] {
        const landmarks: HandLandmark[] = [];

        // Gerar 21 landmarks básicos do MediaPipe
        for (let i = 0; i < 21; i++) {
            let x = centerX;
            let y = centerY;
            let z = centerZ;

            // Posicionamento específico para diferentes partes da mão
            switch (i) {
                case 0: // Pulso
                    y += 0.1;
                    break;
                case 13: // Ring finger MCP (base)
                    x -= 0.02;
                    y += 0.02;
                    break;
                case 14: // Ring finger PIP
                    x -= 0.02;
                    y -= 0.01;
                    break;
                case 15: // Ring finger DIP
                    x -= 0.02;
                    y -= 0.03;
                    break;
                case 16: // Ring finger tip
                    x -= 0.02;
                    y -= 0.05;
                    break;
                default:
                    // Posições aleatórias para outros dedos
                    x += (Math.random() - 0.5) * 0.1;
                    y += (Math.random() - 0.5) * 0.1;
                    z += (Math.random() - 0.5) * 0.02;
            }

            landmarks.push({ x, y, z });
        }

        return landmarks;
    }

    setOnResults(callback: (result: HandDetectionResult) => void): void {
        this.onResults = callback;
    }

    dispose(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        console.log('🧹 Mock Hand Tracker limpo');
    }

    isReady(): boolean {
        return true;
    }

    // Mapear landmarks para posições do anel (igual ao MediaPipe)
    getRingFingerLandmarks(landmarks: HandLandmark[]): HandLandmark[] {
        if (landmarks.length < 21) return [];
        return [
            landmarks[13], // MCP
            landmarks[14], // PIP
            landmarks[15], // DIP
            landmarks[16]  // TIP
        ];
    }

    // Calcular posição ideal para o anel
    calculateRingPosition(landmarks: HandLandmark[]): { position: HandLandmark; rotation: { x: number; y: number; z: number } } | null {
        const ringFingerLandmarks = this.getRingFingerLandmarks(landmarks);
        if (ringFingerLandmarks.length < 4) return null;

        const mcp = ringFingerLandmarks[0];
        const pip = ringFingerLandmarks[1];

        // Posição do anel entre MCP e PIP
        const ringPosition: HandLandmark = {
            x: (mcp.x + pip.x) / 2,
            y: (mcp.y + pip.y) / 2,
            z: (mcp.z + pip.z) / 2
        };

        // Rotação fixa para demo
        const rotation = {
            x: Math.PI / 2, // 90 graus
            y: 0,
            z: 0
        };

        return { position: ringPosition, rotation };
    }
}