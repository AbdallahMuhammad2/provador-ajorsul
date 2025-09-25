/**
 * PROVADOR VIRTUAL REAL - INTEGRAÇÃO WEBAR.ROCKS
 * Sistema completo de tracking de mãos com anéis posicionados nos dedos
 */

import * as THREE from 'three';

interface HandLandmark {
    x: number;
    y: number;
    z: number;
    visibility: number;
}

interface RingConfig {
    id: string;
    name: string;
    material: 'gold' | 'silver' | 'platinum' | 'rose_gold';
    type: 'solitaire' | 'band' | 'eternity';
    size: number;
    finger: 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
    joint: 'mcp' | 'pip' | 'dip';
}

export class RealVirtualTryon {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private canvas: HTMLCanvasElement;
    
    // WebAR tracking
    private webARInitialized = false;
    private handsDetected = false;
    private landmarks: HandLandmark[][] = []; // Array para múltiplas mãos
    private trackingConfidence = 0;
    
    // Ring system  
    private rings: Map<string, THREE.Mesh> = new Map();
    private activeRings: RingConfig[] = [];
    
    // Finger mapping (MediaPipe/WebAR.rocks landmarks)
    private fingerLandmarks = {
        thumb: [1, 2, 3, 4],
        index: [5, 6, 7, 8], 
        middle: [9, 10, 11, 12],
        ring: [13, 14, 15, 16],
        pinky: [17, 18, 19, 20]
    };
    
    private jointNames = ['mcp', 'pip', 'dip', 'tip'];
    
    // Performance
    private frameCount = 0;
    private lastTime = performance.now();
    private fps = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.initializeSystem();
    }

    async initialize(): Promise<void> {
        try {
            console.log('🔥 Iniciando PROVADOR VIRTUAL REAL...');
            
            this.updateStatus('Configurando câmera e 3D...');
            await this.setupThreeJS();
            
            this.updateStatus('Configurando iluminação para joias...');
            this.setupJewelryLighting();
            
            this.updateStatus('Carregando WebAR.rocks...');
            await this.initializeWebAR();
            
            this.updateStatus('Criando anéis...');
            this.setupInitialRings();
            
            this.updateStatus('Iniciando tracking...');
            this.startRenderLoop();
            
            this.hideLoading();
            console.log('✅ PROVADOR VIRTUAL REAL ativo!');
            
        } catch (error) {
            console.error('❌ Erro:', error);
            this.showError(`Erro: ${error}`);
        }
    }

    private async setupThreeJS(): Promise<void> {
        // Camera otimizada para mãos
        this.camera = new THREE.PerspectiveCamera(
            60,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.001,
            50
        );

        // Renderer de alta qualidade para joias
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            precision: 'highp'
        });

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Configurações para joias realistas
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.physicallyCorrectLights = true;

        // Resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        });
    }

    private setupJewelryLighting(): void {
        // Iluminação profissional para joias
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Key light principal
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(5, 5, 2);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 4096;
        keyLight.shadow.mapSize.height = 4096;
        keyLight.shadow.camera.near = 0.1;
        keyLight.shadow.camera.far = 20;
        keyLight.shadow.bias = -0.0001;
        this.scene.add(keyLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-3, 3, 1);
        this.scene.add(fillLight);

        // Rim light para bordas
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(0, 2, -3);
        this.scene.add(rimLight);

        // Point lights para brilho das pedras
        for (let i = 0; i < 3; i++) {
            const gemLight = new THREE.PointLight(0xffffff, 0.6, 2);
            const angle = (i / 3) * Math.PI * 2;
            gemLight.position.set(
                Math.cos(angle) * 1.5,
                0.5 + Math.sin(angle) * 0.3,
                Math.sin(angle) * 1.5
            );
            this.scene.add(gemLight);
        }
    }

    private async initializeWebAR(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Verificar se WebAR.rocks está disponível
            if (typeof (window as any).WEBARROCKSHANDS === 'undefined') {
                console.warn('⚠️ WebAR.rocks não encontrado, tentando modo simulado...');
                
                // Modo simulado para desenvolvimento
                this.initializeSimulatedTracking();
                this.webARInitialized = true;
                resolve(null);
                return;
            }

            const WEBARROCKSHANDS = (window as any).WEBARROCKSHANDS;
            
            const config = {
                canvasId: this.canvas.id,
                NNCPath: './WebAR.rocks-2.hand-master/neuralNets/',
                maxHandsDetected: 2,
                
                // Configuração otimizada para anéis
                landMarksStabilizationSettings: [0.98, 0.05], // Máxima estabilização
                videoSettings: {
                    idealWidth: 1920,
                    idealHeight: 1080,
                    facingMode: 'user'
                },
                
                callbackReady: (err: any, spec: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    this.webARInitialized = true;
                    console.log('✅ WebAR.rocks inicializado para tracking real');
                    resolve(spec);
                },
                
                callbackTrack: (detectState: any) => {
                    // Render do vídeo de fundo
                    WEBARROCKSHANDS.render_video();
                    
                    // Processar tracking das mãos
                    this.processHandTracking(detectState);
                }
            };

            WEBARROCKSHANDS.init(config);
        });
    }

    private processHandTracking(detectState: any): void {
        this.handsDetected = detectState.detected || false;
        this.landmarks = detectState.landmarks || [];
        this.trackingConfidence = detectState.confidence || 0;

        // Atualizar UI
        this.updateTrackingUI();

        if (this.handsDetected && this.landmarks.length > 0) {
            // Posicionar anéis em todos os dedos detectados
            this.updateRingPositions();
        } else {
            // Esconder anéis quando não há mãos
            this.hideAllRings();
        }
    }

    private setupInitialRings(): void {
        // Configurar anéis iniciais para diferentes dedos
        const initialRings: RingConfig[] = [
            {
                id: 'ring_finger_main',
                name: 'Solitário Principal',
                material: 'gold',
                type: 'solitaire', 
                size: 1.0,
                finger: 'ring',
                joint: 'mcp'
            },
            {
                id: 'middle_finger_band',
                name: 'Aliança Média',
                material: 'silver',
                type: 'band',
                size: 0.9,
                finger: 'middle',
                joint: 'mcp'
            },
            {
                id: 'index_finger_eternity',
                name: 'Eternity Indicador',
                material: 'rose_gold',
                type: 'eternity',
                size: 0.8,
                finger: 'index',
                joint: 'mcp'
            }
        ];

        this.activeRings = initialRings;
        
        // Criar meshes dos anéis
        initialRings.forEach(ringConfig => {
            const ring = this.createRingMesh(ringConfig);
            this.rings.set(ringConfig.id, ring);
            this.scene.add(ring);
        });
    }

    private createRingMesh(config: RingConfig): THREE.Mesh {
        // Geometria baseada no tipo
        let geometry: THREE.BufferGeometry;
        
        switch (config.type) {
            case 'solitaire':
                geometry = new THREE.TorusGeometry(0.008, 0.0012, 8, 32);
                break;
            case 'band':
                geometry = new THREE.TorusGeometry(0.008, 0.002, 6, 24);
                break;
            case 'eternity':
                geometry = new THREE.TorusGeometry(0.008, 0.0015, 8, 48);
                break;
            default:
                geometry = new THREE.TorusGeometry(0.008, 0.0015, 8, 32);
        }

        // Material baseado no tipo
        const material = this.createRingMaterial(config);
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Aplicar escala
        const scale = config.size;
        mesh.scale.set(scale, scale, scale);
        
        // Inicialmente invisível
        mesh.visible = false;
        
        return mesh;
    }

    private createRingMaterial(config: RingConfig): THREE.Material {
        const materialConfigs = {
            gold: { 
                color: 0xFFD700, 
                metalness: 1.0, 
                roughness: 0.1,
                emissive: 0x332200,
                emissiveIntensity: 0.1
            },
            silver: { 
                color: 0xF5F5F5, 
                metalness: 1.0, 
                roughness: 0.08,
                emissive: 0x222222,
                emissiveIntensity: 0.05
            },
            platinum: { 
                color: 0xE5E4E2, 
                metalness: 1.0, 
                roughness: 0.03,
                emissive: 0x333333,
                emissiveIntensity: 0.08
            },
            rose_gold: { 
                color: 0xE8B4CB, 
                metalness: 1.0, 
                roughness: 0.12,
                emissive: 0x2D1B1F,
                emissiveIntensity: 0.06
            }
        };

        const config_mat = materialConfigs[config.material];
        
        return new THREE.MeshPhysicalMaterial({
            color: config_mat.color,
            metalness: config_mat.metalness,
            roughness: config_mat.roughness,
            emissive: config_mat.emissive,
            emissiveIntensity: config_mat.emissiveIntensity,
            reflectivity: 0.95,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.95
        });
    }

    private updateRingPositions(): void {
        if (!this.landmarks.length) return;

        // Para cada mão detectada
        this.landmarks.forEach((handLandmarks, handIndex) => {
            // Para cada anel ativo
            this.activeRings.forEach(ringConfig => {
                const ringMesh = this.rings.get(ringConfig.id);
                if (!ringMesh) return;

                // Calcular posição do anel no dedo específico
                const position = this.calculateRingPosition(
                    handLandmarks, 
                    ringConfig.finger, 
                    ringConfig.joint,
                    handIndex
                );

                if (position) {
                    // Posicionar anel
                    ringMesh.position.copy(position.position);
                    ringMesh.rotation.copy(position.rotation);
                    ringMesh.visible = true;

                    // Aplicar animação sutil
                    const time = performance.now() * 0.001;
                    ringMesh.material.emissiveIntensity = 
                        Math.sin(time * 2) * 0.02 + 0.08;
                } else {
                    ringMesh.visible = false;
                }
            });
        });
    }

    private calculateRingPosition(
        handLandmarks: HandLandmark[], 
        fingerName: keyof typeof this.fingerLandmarks,
        jointName: string,
        handIndex: number
    ): { position: THREE.Vector3, rotation: THREE.Euler } | null {
        
        const landmarkIds = this.fingerLandmarks[fingerName];
        const jointIndex = this.jointNames.indexOf(jointName);
        
        if (!landmarkIds || jointIndex === -1 || jointIndex >= landmarkIds.length) {
            return null;
        }

        const landmarkId = landmarkIds[jointIndex];
        const landmark = handLandmarks[landmarkId];
        
        if (!landmark || landmark.visibility < 0.7) {
            return null;
        }

        // Converter coordenadas WebAR para Three.js
        const position = new THREE.Vector3(
            (landmark.x - 0.5) * 2,     // -1 a 1
            -(landmark.y - 0.5) * 1.5,  // Invertido, -0.75 a 0.75
            landmark.z * 2              // Profundidade
        );

        // Calcular orientação baseada na direção do dedo
        let rotation = new THREE.Euler(0, 0, 0);
        
        if (jointIndex < landmarkIds.length - 1) {
            const nextLandmark = handLandmarks[landmarkIds[jointIndex + 1]];
            if (nextLandmark && nextLandmark.visibility > 0.5) {
                const direction = new THREE.Vector3(
                    nextLandmark.x - landmark.x,
                    nextLandmark.y - landmark.y,
                    (nextLandmark.z || 0) - (landmark.z || 0)
                );
                
                rotation.z = Math.atan2(direction.y, direction.x);
                rotation.y = Math.atan2(direction.z, 
                    Math.sqrt(direction.x ** 2 + direction.y ** 2));
            }
        }

        return { position, rotation };
    }

    private hideAllRings(): void {
        this.rings.forEach(ring => {
            ring.visible = false;
        });
    }

    private startRenderLoop(): void {
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Calcular FPS
            this.updateFPS();
            
            // Renderizar cena
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }

    private updateFPS(): void {
        this.frameCount++;
        const now = performance.now();
        
        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
            
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) fpsElement.textContent = this.fps.toString();
        }
    }

    // Sistema de tracking simulado para desenvolvimento
    private initializeSimulatedTracking(): void {
        console.log('🎭 Iniciando tracking simulado para desenvolvimento');
        
        // Atualizar UI para mostrar modo simulado
        const trackingMode = document.getElementById('tracking-mode');
        if (trackingMode) {
            trackingMode.textContent = 'Simulated (Demo)';
            trackingMode.style.color = '#ffd700';
        }
        
        // Simular detecção de mãos
        setInterval(() => {
            const time = performance.now() * 0.001;
            
            // Simular landmarks da mão direita
            const simulatedLandmarks: HandLandmark[] = [];
            
            // Criar 21 landmarks simulados (padrão MediaPipe)
            for (let i = 0; i < 21; i++) {
                const angle = (i / 21) * Math.PI * 2;
                const radius = 0.15 + Math.sin(time + i) * 0.05;
                
                simulatedLandmarks.push({
                    x: 0.5 + Math.cos(angle + time * 0.5) * radius,
                    y: 0.5 + Math.sin(angle + time * 0.3) * radius,
                    z: Math.sin(time + i * 0.5) * 0.1,
                    visibility: 0.9 + Math.sin(time + i) * 0.1
                });
            }
            
            // Simular detectState
            const simulatedDetectState = {
                detected: Math.random() > 0.3, // 70% chance de detecção
                landmarks: [simulatedLandmarks],
                confidence: 0.8 + Math.sin(time) * 0.15
            };
            
            this.processHandTracking(simulatedDetectState);
            
        }, 33); // ~30 FPS para simulação
    }

    private updateTrackingUI(): void {
        const handStatus = document.getElementById('hand-status');
        const ringCount = document.getElementById('ring-count');
        
        if (handStatus) {
            handStatus.textContent = this.handsDetected ? 
                `Detectado (${Math.round(this.trackingConfidence * 100)}%)` : 
                'Procurando mãos...';
        }
        
        if (ringCount) {
            const visibleRings = Array.from(this.rings.values())
                .filter(ring => ring.visible).length;
            ringCount.textContent = visibleRings.toString();
        }
    }

    // Métodos públicos de controle
    public addRing(fingerName: keyof typeof this.fingerLandmarks, material: RingConfig['material']): void {
        const newRingConfig: RingConfig = {
            id: `ring_${fingerName}_${Date.now()}`,
            name: `Anel ${fingerName}`,
            material: material,
            type: 'band',
            size: 1.0,
            finger: fingerName,
            joint: 'mcp'
        };

        const ring = this.createRingMesh(newRingConfig);
        this.rings.set(newRingConfig.id, ring);
        this.activeRings.push(newRingConfig);
        this.scene.add(ring);
    }

    public removeRing(ringId: string): void {
        const ring = this.rings.get(ringId);
        if (ring) {
            this.scene.remove(ring);
            this.rings.delete(ringId);
            this.activeRings = this.activeRings.filter(r => r.id !== ringId);
        }
    }

    public takeScreenshot(): void {
        const link = document.createElement('a');
        link.download = `ring-tryon-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    // Métodos utilitários
    private updateStatus(message: string): void {
        const loadingText = document.querySelector('.loading-subtitle');
        if (loadingText) {
            loadingText.textContent = message;
        }
        console.log('🔄 ' + message);
    }

    private hideLoading(): void {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    private showError(message: string): void {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center;">
                    <div style="color: #ff4444; font-size: 2rem; margin-bottom: 1rem;">❌ Error</div>
                    <div style="margin-bottom: 2rem; max-width: 500px;">${message}</div>
                    <button class="btn" onclick="location.reload()">🔄 Reload</button>
                </div>
            `;
        }
    }

    private initializeSystem(): void {
        console.log('🏆 Real Virtual Try-On System initializing...');
    }

    public destroy(): void {
        // Cleanup WebAR
        if (this.webARInitialized) {
            const WEBARROCKSHANDS = (window as any).WEBARROCKSHANDS;
            WEBARROCKSHANDS?.stop?.();
        }
        
        // Cleanup Three.js
        this.rings.forEach(ring => {
            this.scene.remove(ring);
        });
        this.rings.clear();
        
        this.renderer.dispose();
        
        console.log('✅ Sistema destruído');
    }
}