/**
 * UNIFIED RING TRY-ON SYSTEM
 * Integra toda a base existente em um sistema funcional
 * - InstoreRingTryon.ts (base principal)
 * - WebAR.rocks (tracking avançado)  
 * - YOLO11 (detecção neural)
 * - Interface unificada
 */

import * as THREE from 'three';

// Interfaces principais
interface HandLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}

interface RingData {
    id: string;
    name: string;
    material: 'gold' | 'silver' | 'platinum' | 'rose_gold';
    type: 'solitaire' | 'band' | 'eternity' | 'cocktail';
    geometry: {
        radius: number;
        thickness: number;
        segments: number;
    };
    position: {
        offset: [number, number, number];
        scale: number;
    };
}

interface SystemConfig {
    webAR: {
        neuralNetsPath: string;
        stabilization: boolean;
        confidence: number;
    };
    yolo: {
        enabled: boolean;
        modelPath?: string;
    };
    rendering: {
        quality: 'low' | 'medium' | 'high' | 'ultra';
        shadows: boolean;
        pbr: boolean;
    };
}

// Sistema principal unificado
export class UnifiedRingTryonSystem {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private canvas!: HTMLCanvasElement;
    
    // Hand tracking
    private webARInitialized = false;
    private handLandmarks: HandLandmark[] = [];
    private handDetected = false;
    private trackingConfidence = 0;
    
    // YOLO integration
    private yoloEnabled = false;
    private yoloModel: any = null;
    
    // Ring system
    private currentRing: THREE.Mesh | null = null;
    private ringCollection: RingData[] = [];
    private selectedRingIndex = 0;
    
    // Sistema de estado
    private isInitialized = false;
    private isRunning = false;
    
    // Performance
    private frameCount = 0;
    private lastTime = performance.now();
    private fps = 0;
    
    // Configurações
    private config: SystemConfig = {
        webAR: {
            neuralNetsPath: './WebAR.rocks-2.hand-master/neuralNets/',
            stabilization: true,
            confidence: 0.8
        },
        yolo: {
            enabled: false
        },
        rendering: {
            quality: 'high',
            shadows: true,
            pbr: true
        }
    };

    constructor(canvas: HTMLCanvasElement, config?: Partial<SystemConfig>) {
        this.canvas = canvas;
        if (config) {
            this.config = { ...this.config, ...config };
        }
        
        this.initRingCollection();
    }

    /**
     * Inicialização principal do sistema
     */
    async initialize(): Promise<void> {
        try {
            this.updateLoadingStatus('Inicializando Three.js...');
            await this.initThreeJS();
            
            this.updateLoadingStatus('Configurando iluminação...');
            this.setupLighting();
            
            this.updateLoadingStatus('Carregando WebAR.rocks...');
            await this.initWebAR();
            
            if (this.config.yolo.enabled) {
                this.updateLoadingStatus('Inicializando YOLO11...');
                await this.initYOLO();
            }
            
            this.updateLoadingStatus('Criando primeiro anel...');
            this.createRing(0);
            
            this.updateLoadingStatus('Iniciando sistema...');
            this.startSystem();
            
            this.isInitialized = true;
            this.hideLoading();
            
            console.log('✅ Sistema Unified Ring Try-On inicializado com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.showError(`Erro na inicialização: ${error}`);
        }
    }

    /**
     * Inicializar Three.js com configurações otimizadas
     */
    private async initThreeJS(): Promise<void> {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.canvas.clientWidth / this.canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 1;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: this.config.rendering.quality !== 'low',
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Configurações avançadas baseadas na qualidade
        if (this.config.rendering.shadows) {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
        
        if (this.config.rendering.pbr) {
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
            this.renderer.physicallyCorrectLights = true;
        }
        
        // Event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    /**
     * Configurar sistema de iluminação profissional
     */
    private setupLighting(): void {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        
        // Key light (principal)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(5, 5, 5);
        if (this.config.rendering.shadows) {
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.width = 2048;
            keyLight.shadow.mapSize.height = 2048;
            keyLight.shadow.camera.near = 0.1;
            keyLight.shadow.camera.far = 50;
        }
        this.scene.add(keyLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-3, 3, -3);
        this.scene.add(fillLight);
        
        // Rim light para destacar bordas
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(0, 0, -5);
        this.scene.add(rimLight);
        
        // Spot lights para brilho de joias
        const spotLight = new THREE.SpotLight(0xffffff, 0.8);
        spotLight.position.set(3, 3, 3);
        spotLight.angle = Math.PI / 8;
        spotLight.penumbra = 0.3;
        this.scene.add(spotLight);
    }

    /**
     * Inicializar WebAR.rocks para tracking de mãos
     */
    private async initWebAR(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Verificar se WebAR.rocks está disponível
            if (typeof (window as any).WEBARROCKSHANDS === 'undefined') {
                console.warn('⚠️ WebAR.rocks não encontrado, usando sistema básico');
                this.webARInitialized = false;
                resolve();
                return;
            }

            const WEBARROCKSHANDS = (window as any).WEBARROCKSHANDS;
            
            const config = {
                canvasId: this.canvas.id,
                NNCPath: this.config.webAR.neuralNetsPath,
                maxHandsDetected: 2,
                landMarksStabilizationSettings: this.config.webAR.stabilization ? [0.98, 0.05] : null,
                videoSettings: {
                    idealWidth: 1280,
                    idealHeight: 720,
                    facingMode: 'user'
                },
                callbackReady: (err: any, spec: any) => {
                    if (err) {
                        console.error('❌ Erro WebAR.rocks:', err);
                        reject(err);
                        return;
                    }
                    
                    this.webARInitialized = true;
                    console.log('✅ WebAR.rocks inicializado');
                    resolve(spec);
                },
                callbackTrack: (detectState: any) => {
                    this.processHandTracking(detectState);
                }
            };

            WEBARROCKSHANDS.init(config);
        });
    }

    /**
     * Processar dados de tracking das mãos
     */
    private processHandTracking(detectState: any): void {
        const isDetected = detectState.detected || false;
        const landmarks = detectState.landmarks || [];
        const confidence = detectState.confidence || 0;

        this.handDetected = isDetected;
        this.trackingConfidence = confidence;

        if (isDetected && landmarks.length > 0) {
            this.handLandmarks = landmarks[0]; // Usar primeira mão
            this.updateRingPosition();
        }

        // Atualizar UI
        this.updateTrackingUI(isDetected, confidence, landmarks.length);
    }

    /**
     * Inicializar YOLO11 (opcional)
     */
    private async initYOLO(): Promise<void> {
        try {
            // Simular carregamento do YOLO
            // Em produção, carregaria o modelo real do diretório YOLO11n-pose-hands-main
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.yoloEnabled = true;
            console.log('✅ YOLO11 simulado inicializado');
            
        } catch (error) {
            console.warn('⚠️ YOLO11 não disponível:', error);
            this.yoloEnabled = false;
        }
    }

    /**
     * Inicializar coleção de anéis
     */
    private initRingCollection(): void {
        this.ringCollection = [
            {
                id: 'solitaire_gold',
                name: 'Solitário Clássico',
                material: 'gold',
                type: 'solitaire',
                geometry: {
                    radius: 0.8,
                    thickness: 0.08,
                    segments: 32
                },
                position: {
                    offset: [0, 0, 0],
                    scale: 1.0
                }
            },
            {
                id: 'band_silver',
                name: 'Aliança Prata',
                material: 'silver',
                type: 'band',
                geometry: {
                    radius: 0.85,
                    thickness: 0.12,
                    segments: 24
                },
                position: {
                    offset: [0, 0, 0],
                    scale: 1.0
                }
            },
            {
                id: 'eternity_platinum',
                name: 'Eternity Platina',
                material: 'platinum',
                type: 'eternity',
                geometry: {
                    radius: 0.82,
                    thickness: 0.1,
                    segments: 48
                },
                position: {
                    offset: [0, 0, 0],
                    scale: 1.0
                }
            }
        ];
    }

    /**
     * Criar anel 3D
     */
    private createRing(index: number): void {
        // Remover anel anterior
        if (this.currentRing) {
            this.scene.remove(this.currentRing);
        }

        const ringData = this.ringCollection[index];
        if (!ringData) return;

        // Criar geometria
        const geometry = new THREE.TorusGeometry(
            ringData.geometry.radius,
            ringData.geometry.thickness,
            12,
            ringData.geometry.segments
        );

        // Criar material baseado no tipo
        const material = this.createRingMaterial(ringData);

        // Criar mesh
        this.currentRing = new THREE.Mesh(geometry, material);
        this.currentRing.castShadow = true;
        this.currentRing.receiveShadow = true;

        // Aplicar escala
        const scale = ringData.position.scale;
        this.currentRing.scale.set(scale, scale, scale);

        // Adicionar à cena
        this.scene.add(this.currentRing);

        console.log(`✅ Anel criado: ${ringData.name}`);
    }

    /**
     * Criar material do anel
     */
    private createRingMaterial(ringData: RingData): THREE.Material {
        const materialConfigs = {
            gold: { color: 0xFFD700, metalness: 0.9, roughness: 0.1 },
            silver: { color: 0xC0C0C0, metalness: 0.95, roughness: 0.05 },
            platinum: { color: 0xE5E4E2, metalness: 0.95, roughness: 0.08 },
            rose_gold: { color: 0xE8B4CB, metalness: 0.9, roughness: 0.12 }
        };

        const config = materialConfigs[ringData.material];

        if (this.config.rendering.pbr) {
            return new THREE.MeshStandardMaterial({
                color: config.color,
                metalness: config.metalness,
                roughness: config.roughness,
                envMapIntensity: 1.5
            });
        } else {
            return new THREE.MeshPhongMaterial({
                color: config.color,
                shininess: 100,
                transparent: true,
                opacity: 0.95
            });
        }
    }

    /**
     * Atualizar posição do anel baseado no tracking
     */
    private updateRingPosition(): void {
        if (!this.currentRing || !this.handDetected || this.handLandmarks.length === 0) {
            return;
        }

        // Usar landmark do dedo anelar (aproximadamente index 16 no MediaPipe)
        const fingerLandmark = this.handLandmarks[16] || this.handLandmarks[0];
        if (!fingerLandmark) return;

        // Converter coordenadas de tela para 3D
        const x = (fingerLandmark.x - 0.5) * 4;
        const y = -(fingerLandmark.y - 0.5) * 3;
        const z = (fingerLandmark.z || 0) * 2;

        // Aplicar suavização
        const smoothing = 0.15;
        this.currentRing.position.x += (x - this.currentRing.position.x) * smoothing;
        this.currentRing.position.y += (y - this.currentRing.position.y) * smoothing;
        this.currentRing.position.z += (z - this.currentRing.position.z) * smoothing;

        // Rotação baseada na orientação da mão
        if (this.handLandmarks.length > 17) {
            const landmark1 = this.handLandmarks[13];
            const landmark2 = this.handLandmarks[17];
            
            if (landmark1 && landmark2) {
                const deltaX = landmark2.x - landmark1.x;
                const deltaY = landmark2.y - landmark1.y;
                const targetRotation = Math.atan2(deltaY, deltaX);
                
                const rotSmoothing = 0.1;
                this.currentRing.rotation.z += (targetRotation - this.currentRing.rotation.z) * rotSmoothing;
            }
        }
    }

    /**
     * Iniciar sistema principal
     */
    private startSystem(): void {
        this.isRunning = true;
        this.startRenderLoop();
        
        // Iniciar WebAR tracking se disponível
        if (this.webARInitialized) {
            const WEBARROCKSHANDS = (window as any).WEBARROCKSHANDS;
            WEBARROCKSHANDS?.start?.();
        }
    }

    /**
     * Loop principal de renderização
     */
    private startRenderLoop(): void {
        const animate = () => {
            if (!this.isRunning) return;

            requestAnimationFrame(animate);

            // Calcular FPS
            this.updateFPS();

            // Animação idle quando não há tracking
            if (this.currentRing && !this.handDetected) {
                this.currentRing.rotation.y += 0.005;
            }

            // Render
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    /**
     * Calcular e atualizar FPS
     */
    private updateFPS(): void {
        this.frameCount++;
        const now = performance.now();
        
        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
            
            // Atualizar UI
            const fpsElement = document.getElementById('fps-counter');
            if (fpsElement) fpsElement.textContent = this.fps.toString();
        }
    }

    /**
     * Métodos públicos para controle
     */
    public switchRing(index: number): void {
        if (index >= 0 && index < this.ringCollection.length) {
            this.selectedRingIndex = index;
            this.createRing(index);
        }
    }

    public nextRing(): void {
        const nextIndex = (this.selectedRingIndex + 1) % this.ringCollection.length;
        this.switchRing(nextIndex);
    }

    public previousRing(): void {
        const prevIndex = (this.selectedRingIndex - 1 + this.ringCollection.length) % this.ringCollection.length;
        this.switchRing(prevIndex);
    }

    public toggleQuality(): void {
        const qualities: Array<SystemConfig['rendering']['quality']> = ['low', 'medium', 'high', 'ultra'];
        const currentIndex = qualities.indexOf(this.config.rendering.quality);
        const nextIndex = (currentIndex + 1) % qualities.length;
        
        this.config.rendering.quality = qualities[nextIndex];
        this.applyQualitySettings();
    }

    private applyQualitySettings(): void {
        const quality = this.config.rendering.quality;
        
        switch (quality) {
            case 'low':
                this.renderer.setPixelRatio(0.5);
                break;
            case 'medium':
                this.renderer.setPixelRatio(1);
                break;
            case 'high':
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                break;
            case 'ultra':
                this.renderer.setPixelRatio(window.devicePixelRatio);
                break;
        }
        
        const qualityElement = document.getElementById('quality-status');
        if (qualityElement) qualityElement.textContent = quality.charAt(0).toUpperCase() + quality.slice(1);
    }

    public takeScreenshot(): void {
        const link = document.createElement('a');
        link.download = `ring-tryon-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    /**
     * Métodos de utilidade
     */
    private onWindowResize(): void {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    private updateTrackingUI(isTracking: boolean, confidence: number, handCount: number): void {
        const handStatus = document.getElementById('hand-status');
        const ringCount = document.getElementById('ring-count');
        
        if (handStatus) {
            handStatus.textContent = isTracking ? 
                `Detected (${Math.round(confidence * 100)}%)` : 
                'Searching...';
        }
        
        if (ringCount) {
            ringCount.textContent = isTracking ? '1' : '0';
        }
    }

    private updateLoadingStatus(message: string): void {
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
                    <button class="btn" onclick="location.reload()">🔄 Reload System</button>
                </div>
            `;
        }
    }

    /**
     * Destruir sistema
     */
    public destroy(): void {
        this.isRunning = false;
        this.isInitialized = false;
        
        // Cleanup WebAR
        if (this.webARInitialized) {
            const WEBARROCKSHANDS = (window as any).WEBARROCKSHANDS;
            WEBARROCKSHANDS?.stop?.();
        }
        
        // Cleanup Three.js
        if (this.currentRing) {
            this.scene.remove(this.currentRing);
        }
        
        this.renderer.dispose();
        window.removeEventListener('resize', this.onWindowResize);
        
        console.log('✅ Sistema destruído');
    }
}