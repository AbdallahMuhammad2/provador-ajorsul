/**
 * AUTONOMOUS RING TRY-ON SYSTEM
 * Sistema completamente independente sem dependências externas
 * Objetivo: Demo funcional para validação comercial
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MediaPipeHandTracker, HandDetectionResult, HandLandmark } from './MediaPipeHandTracker';
import { MockHandTracker } from './MockHandTracker';

export interface RingConfig {
    modelPath: string;
    material: 'gold' | 'silver' | 'platinum';
    scale: number;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
}

export interface SystemStats {
    fps: number;
    handDetected: boolean;
    ringsActive: number;
    performance: 'good' | 'medium' | 'poor';
}

export class AutonomousRingTryon {
    // Core Three.js
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private canvas: HTMLCanvasElement;

    // Hand tracking
    private handTracker: MediaPipeHandTracker | MockHandTracker;
    private videoElement: HTMLVideoElement;
    private currentHand: HandDetectionResult | null = null;
    private useMockTracker = false;

    // Ring management
    private rings = new Map<string, THREE.Group>();
    private materials = new Map<string, THREE.MeshPhysicalMaterial>();
    private loader = new GLTFLoader();

    // Performance
    private clock = new THREE.Clock();
    private frameCount = 0;
    private lastFPSCheck = 0;
    private currentFPS = 0;
    private isRunning = false;

    // Lighting
    private lights: THREE.Light[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.initializeThreeJS();
        this.setupMaterials();
        this.setupLighting();
        this.setupVideo();
    }

    private initializeThreeJS(): void {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.001,
            1000
        );
        this.camera.position.z = 1;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Transparent background for AR
        this.renderer.setClearColor(0x000000, 0);

        console.log('✅ Three.js inicializado');
    }

    private setupMaterials(): void {
        // Gold material
        const goldMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFFD700,
            metalness: 1.0,
            roughness: 0.1,
            reflectivity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });

        // Silver material
        const silverMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xC0C0C0,
            metalness: 1.0,
            roughness: 0.2,
            reflectivity: 0.8,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });

        // Platinum material
        const platinumMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xE5E4E2,
            metalness: 1.0,
            roughness: 0.15,
            reflectivity: 0.85,
            clearcoat: 0.9,
            clearcoatRoughness: 0.15
        });

        this.materials.set('gold', goldMaterial);
        this.materials.set('silver', silverMaterial);
        this.materials.set('platinum', platinumMaterial);

        console.log('✅ Materiais criados');
    }

    private setupLighting(): void {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        this.lights.push(mainLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, -5, 2);
        this.scene.add(fillLight);
        this.lights.push(fillLight);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
        rimLight.position.set(0, 5, -5);
        this.scene.add(rimLight);
        this.lights.push(rimLight);

        console.log('✅ Iluminação configurada');
    }

    private setupVideo(): void {
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.videoElement.playsInline = true;
        this.videoElement.muted = true;
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = '0';
        this.videoElement.style.left = '0';
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.videoElement.style.objectFit = 'cover';
        this.videoElement.style.zIndex = '0';

        // Insert video behind canvas
        this.canvas.parentElement?.insertBefore(this.videoElement, this.canvas);

        console.log('✅ Vídeo configurado');
    }

    async initialize(): Promise<void> {
        try {
            console.log('🚀 Inicializando sistema autônomo...');

            // Try MediaPipe first, fallback to Mock
            try {
                this.handTracker = new MediaPipeHandTracker(this.videoElement);
                this.handTracker.setOnResults(this.handleHandDetection.bind(this));
                await this.handTracker.initialize();
                console.log('✅ MediaPipe Hand Tracker ativo');
            } catch (error) {
                console.warn('⚠️ MediaPipe falhou, usando Mock Tracker:', error);
                this.useMockTracker = true;
                this.handTracker = new MockHandTracker();
                this.handTracker.setOnResults(this.handleHandDetection.bind(this));
                await this.handTracker.initialize();
            }

            // Start render loop
            this.isRunning = true;
            this.animate();

            console.log('✅ Sistema autônomo pronto!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            throw error;
        }
    }

    private handleHandDetection(result: HandDetectionResult): void {
        this.currentHand = result;

        if (result.detected && result.landmarks.length > 0) {
            this.updateRingPositions(result.landmarks);
        }
    }

    private updateRingPositions(landmarks: HandLandmark[]): void {
        const ringPositionData = this.handTracker.calculateRingPosition(landmarks);
        if (!ringPositionData) return;

        // Update all active rings
        this.rings.forEach((ring) => {
            const { position, rotation } = ringPositionData;

            // Convert normalized coordinates to 3D space
            ring.position.set(
                (position.x - 0.5) * 2,
                -(position.y - 0.5) * 2,
                position.z * 0.5
            );

            ring.rotation.set(
                rotation.x + Math.PI / 2, // Add 90 degrees for proper orientation
                rotation.y,
                rotation.z
            );
        });
    }

    async addRing(config: RingConfig): Promise<string> {
        try {
            const gltf = await this.loader.loadAsync(config.modelPath);
            const ringModel = gltf.scene.clone();

            // Apply material
            const material = this.materials.get(config.material);
            if (material) {
                ringModel.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
            }

            // Apply transforms
            ringModel.scale.setScalar(config.scale);
            ringModel.position.set(config.position.x, config.position.y, config.position.z);
            ringModel.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);

            // Create group for easier management
            const ringGroup = new THREE.Group();
            ringGroup.add(ringModel);

            // Add to scene
            this.scene.add(ringGroup);

            // Store reference
            const ringId = `ring_${Date.now()}`;
            this.rings.set(ringId, ringGroup);

            console.log(`✅ Anel adicionado: ${ringId}`);
            return ringId;
        } catch (error) {
            console.error('❌ Erro ao carregar anel:', error);
            throw error;
        }
    }

    removeRing(ringId: string): void {
        const ring = this.rings.get(ringId);
        if (ring) {
            this.scene.remove(ring);
            this.rings.delete(ringId);
            console.log(`🗑️ Anel removido: ${ringId}`);
        }
    }

    removeAllRings(): void {
        this.rings.forEach((ring, id) => {
            this.scene.remove(ring);
        });
        this.rings.clear();
        console.log('🗑️ Todos os anéis removidos');
    }

    changeMaterial(ringId: string, materialType: 'gold' | 'silver' | 'platinum'): void {
        const ring = this.rings.get(ringId);
        const material = this.materials.get(materialType);

        if (ring && material) {
            ring.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });
            console.log(`✨ Material alterado para ${materialType}: ${ringId}`);
        }
    }

    applyLightingPreset(preset: 'studio' | 'jewelry' | 'daylight' | 'luxury'): void {
        switch (preset) {
            case 'studio':
                this.lights[0].intensity = 0.4; // Ambient
                this.lights[1].intensity = 0.8; // Main
                this.lights[2].intensity = 0.3; // Fill
                this.lights[3].intensity = 0.2; // Rim
                break;
            case 'jewelry':
                this.lights[0].intensity = 0.3;
                this.lights[1].intensity = 1.0;
                this.lights[2].intensity = 0.4;
                this.lights[3].intensity = 0.3;
                break;
            case 'daylight':
                this.lights[0].intensity = 0.6;
                this.lights[1].intensity = 0.6;
                this.lights[2].intensity = 0.2;
                this.lights[3].intensity = 0.1;
                break;
            case 'luxury':
                this.lights[0].intensity = 0.2;
                this.lights[1].intensity = 1.2;
                this.lights[2].intensity = 0.5;
                this.lights[3].intensity = 0.4;
                break;
        }
        console.log(`💡 Iluminação aplicada: ${preset}`);
    }

    takeScreenshot(): string {
        this.renderer.render(this.scene, this.camera);
        return this.canvas.toDataURL('image/png');
    }

    getStats(): SystemStats {
        const performance = this.currentFPS > 45 ? 'good' : this.currentFPS > 25 ? 'medium' : 'poor';

        return {
            fps: this.currentFPS,
            handDetected: this.currentHand?.detected || false,
            ringsActive: this.rings.size,
            performance
        };
    }

    private animate(): void {
        if (!this.isRunning) return;

        requestAnimationFrame(() => this.animate());

        // FPS calculation
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastFPSCheck >= 1000) {
            this.currentFPS = Math.round((this.frameCount * 1000) / (now - this.lastFPSCheck));
            this.frameCount = 0;
            this.lastFPSCheck = now;
        }

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    dispose(): void {
        this.isRunning = false;

        if (this.handTracker) {
            this.handTracker.dispose();
        }

        this.removeAllRings();

        if (this.renderer) {
            this.renderer.dispose();
        }

        console.log('🧹 Sistema limpo');
    }

    // Resize handler
    onResize(): void {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}