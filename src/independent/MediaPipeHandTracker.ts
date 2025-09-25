/**
 * AUTONOMOUS HAND TRACKER - Sistema independente
 * Hand tracking usando MediaPipe sem dependências externas
 */

import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

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

export class MediaPipeHandTracker {
    private hands: Hands;
    private camera: Camera;
    private videoElement: HTMLVideoElement;
    private onResults?: (result: HandDetectionResult) => void;
    private isInitialized = false;

    constructor(videoElement: HTMLVideoElement) {
        this.videoElement = videoElement;
        this.setupMediaPipe();
    }

    private setupMediaPipe(): void {
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults(this.handleResults.bind(this));
    }

    private handleResults(results: Results): void {
        if (!this.onResults) return;

        if (results.multiHandLandmarks && results.multiHandedness) {
            // Processa a primeira mão detectada
            const landmarks = results.multiHandLandmarks[0];
            const handedness = results.multiHandedness[0];

            const processedLandmarks: HandLandmark[] = landmarks.map(landmark => ({
                x: landmark.x,
                y: landmark.y,
                z: landmark.z || 0
            }));

            const result: HandDetectionResult = {
                landmarks: processedLandmarks,
                isRightHand: handedness.label === 'Right',
                detected: true,
                confidence: handedness.score
            };

            this.onResults(result);
        } else {
            // Nenhuma mão detectada
            this.onResults({
                landmarks: [],
                isRightHand: true,
                detected: false,
                confidence: 0
            });
        }
    }

    async initialize(): Promise<void> {
        try {
            this.camera = new Camera(this.videoElement, {
                onFrame: async () => {
                    await this.hands.send({ image: this.videoElement });
                },
                width: 1280,
                height: 720
            });

            await this.camera.start();
            this.isInitialized = true;
            console.log('✅ MediaPipe Hand Tracker inicializado');
        } catch (error) {
            console.error('❌ Erro ao inicializar MediaPipe:', error);
            throw error;
        }
    }

    setOnResults(callback: (result: HandDetectionResult) => void): void {
        this.onResults = callback;
    }

    dispose(): void {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.hands) {
            this.hands.close();
        }
        this.isInitialized = false;
    }

    isReady(): boolean {
        return this.isInitialized;
    }

    // Mapear landmarks do MediaPipe para posições do anel
    getRingFingerLandmarks(landmarks: HandLandmark[]): HandLandmark[] {
        if (landmarks.length < 21) return [];

        // MediaPipe landmarks para dedo anelar (índices 13-16)
        return [
            landmarks[13], // MCP (base do dedo)
            landmarks[14], // PIP (primeira articulação)
            landmarks[15], // DIP (segunda articulação)
            landmarks[16]  // TIP (ponta do dedo)
        ];
    }

    // Calcular posição ideal para o anel no dedo anelar
    calculateRingPosition(landmarks: HandLandmark[]): { position: HandLandmark; rotation: { x: number; y: number; z: number } } | null {
        const ringFingerLandmarks = this.getRingFingerLandmarks(landmarks);
        if (ringFingerLandmarks.length < 4) return null;

        const mcp = ringFingerLandmarks[0]; // Base do dedo
        const pip = ringFingerLandmarks[1]; // Primeira articulação

        // Posição do anel entre MCP e PIP
        const ringPosition: HandLandmark = {
            x: (mcp.x + pip.x) / 2,
            y: (mcp.y + pip.y) / 2,
            z: (mcp.z + pip.z) / 2
        };

        // Calcular rotação baseada na direção do dedo
        const direction = {
            x: pip.x - mcp.x,
            y: pip.y - mcp.y,
            z: pip.z - mcp.z
        };

        // Converter para ângulos de rotação
        const rotation = {
            x: Math.atan2(direction.y, direction.z),
            y: Math.atan2(direction.x, direction.z),
            z: Math.atan2(direction.y, direction.x)
        };

        return { position: ringPosition, rotation };
    }
}