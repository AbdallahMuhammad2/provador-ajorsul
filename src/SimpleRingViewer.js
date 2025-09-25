/**
 * SIMPLE RING VIEWER
 * Sistema simplificado para carregar e visualizar o anel base.glb
 * Baseado nos sistemas existentes mas focado apenas na funcionalidade essencial
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class SimpleRingViewer {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.ringModel = null;
        this.loader = new GLTFLoader();
        
        this.autoRotate = false;
        this.isLoaded = false;
        
        console.log('🔧 SimpleRingViewer: Inicializando...');
    }

    async initialize() {
        try {
            this.setupThreeJS();
            this.setupLighting();
            this.setupControls();
            await this.loadBaseRing();
            this.startRenderLoop();
            
            this.isLoaded = true;
            console.log('✅ SimpleRingViewer: Inicializado com sucesso!');
            
            return true;
        } catch (error) {
            console.error('❌ SimpleRingViewer: Erro na inicialização:', error);
            throw error;
        }
    }

    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);

        // Camera - configurada especificamente para joias
        this.camera = new THREE.PerspectiveCamera(
            45, // FOV menor para joias
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.001, // Near plane muito próximo
            100
        );
        this.camera.position.set(0, 0.02, 0.08);

        // Renderer com configurações para joias
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Configurações avançadas para renderização realística
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.setClearColor(0x000000, 0); // Transparente
    }

    setupLighting() {
        // Sistema de iluminação otimizado para joias

        // Luz ambiente suave
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Luz principal (key light)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(10, 10, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.camera.near = 0.1;
        keyLight.shadow.camera.far = 50;
        this.scene.add(keyLight);

        // Luz de preenchimento (fill light)
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight.position.set(-5, 5, 5);
        this.scene.add(fillLight);

        // Luz traseira para destacar bordas
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
        rimLight.position.set(0, -5, -5);
        this.scene.add(rimLight);

        // Luz pontual para brilho extra
        const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.maxDistance = 0.5;
        this.controls.minDistance = 0.005;
        this.controls.target.set(0, 0, 0);
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 1.0;
    }

    async loadBaseRing() {
        return new Promise((resolve, reject) => {
            console.log('📦 Carregando anel base...');
            
            this.loader.load(
                './rings/base.glb',
                (gltf) => {
                    this.ringModel = gltf.scene;
                    
                    // Aplicar configurações baseadas no base.json
                    this.applyRingConfiguration();
                    
                    // Adicionar à cena
                    this.scene.add(this.ringModel);
                    
                    console.log('✅ Anel base carregado:', this.ringModel);
                    resolve(this.ringModel);
                },
                (progress) => {
                    const percent = Math.round((progress.loaded / progress.total) * 100);
                    console.log(`📊 Progresso: ${percent}%`);
                },
                (error) => {
                    console.error('❌ Erro ao carregar anel:', error);
                    reject(error);
                }
            );
        });
    }

    applyRingConfiguration() {
        if (!this.ringModel) return;

        // Configurações do base.json
        const config = {
            modelScaleFactor: 0.15,
            modelRotation: { x: 1.5708, y: 0, z: 0 }, // 90 graus em X
            modelPosition: { x: 0, y: 0, z: 0 }
        };

        // Aplicar transformações
        this.ringModel.scale.setScalar(config.modelScaleFactor);
        this.ringModel.rotation.set(config.modelRotation.x, config.modelRotation.y, config.modelRotation.z);
        this.ringModel.position.set(config.modelPosition.x, config.modelPosition.y, config.modelPosition.z);

        // Configurar materiais para aparência realística
        this.setupRingMaterials();
    }

    setupRingMaterials() {
        if (!this.ringModel) return;

        this.ringModel.traverse((child) => {
            if (child.isMesh) {
                // Material metálico realístico (prata por padrão)
                const material = new THREE.MeshStandardMaterial({
                    color: 0xC0C0C0, // Cor prata
                    metalness: 1.0,
                    roughness: 0.1,
                    envMapIntensity: 1.0
                });

                child.material = material;
                child.castShadow = true;
                child.receiveShadow = true;
                
                console.log('🎨 Material aplicado ao mesh:', child.name || 'unnamed');
            }
        });
    }

    startRenderLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Auto rotação se ativada
            if (this.autoRotate && this.ringModel) {
                this.ringModel.rotation.y += 0.01;
            }
            
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
        console.log('🎬 Loop de renderização iniciado');
    }

    // Métodos de controle público
    toggleAutoRotate() {
        this.autoRotate = !this.autoRotate;
        return this.autoRotate;
    }

    resetCamera() {
        this.camera.position.set(0, 0.02, 0.08);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    changeMaterial(type = 'silver') {
        if (!this.ringModel) return;

        const materials = {
            silver: { color: 0xC0C0C0, metalness: 1.0, roughness: 0.1 },
            gold: { color: 0xFFD700, metalness: 1.0, roughness: 0.05 },
            platinum: { color: 0xE5E4E2, metalness: 1.0, roughness: 0.03 },
            copper: { color: 0xB87333, metalness: 1.0, roughness: 0.15 }
        };

        const config = materials[type] || materials.silver;

        this.ringModel.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHex(config.color);
                child.material.metalness = config.metalness;
                child.material.roughness = config.roughness;
                child.material.needsUpdate = true;
            }
        });

        console.log(`🎨 Material alterado para: ${type}`);
    }

    resize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.ringModel) {
            this.scene.remove(this.ringModel);
        }
        
        console.log('🗑️ SimpleRingViewer: Resources disposed');
    }
}

// Export para uso em outros módulos
export { SimpleRingViewer };

// Função de inicialização global
window.initializeSimpleRingViewer = async function(canvasId = 'webgi-canvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        throw new Error(`Canvas com ID '${canvasId}' não encontrado`);
    }

    const viewer = new SimpleRingViewer(canvas);
    await viewer.initialize();
    
    // Expor globalmente para debug
    window.ringViewer = viewer;
    
    return viewer;
};

// Auto-inicialização se o canvas existir
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('webgi-canvas');
    if (canvas) {
        window.initializeSimpleRingViewer('webgi-canvas')
            .then(() => console.log('🎉 SimpleRingViewer auto-inicializado!'))
            .catch(error => console.error('❌ Erro na auto-inicialização:', error));
    }
});
