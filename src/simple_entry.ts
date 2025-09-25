/**
 * SIMPLE ENTRY POINT - Sistema básico funcional
 * Criado para funcionar independentemente do index.js minificado
 */

import * as THREE from 'three';

// Sistema global simples
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let canvas: HTMLCanvasElement;
let isRunning = false;

// Performance tracking
let frameCount = 0;
let lastFPS = 0;
let currentFPS = 0;

// Ring storage
const rings = new Map<string, THREE.Mesh>();

/**
 * Inicializar Three.js básico
 */
function initializeThreeJS(): void {
    canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement;
    if (!canvas) {
        throw new Error('Canvas not found');
    }

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    console.log('✅ Three.js básico inicializado');
}

/**
 * Criar geometria de anel simples
 */
function createSimpleRing(material: 'gold' | 'silver' | 'platinum'): THREE.Mesh {
    // Geometria de torus (anel)
    const geometry = new THREE.TorusGeometry(0.3, 0.05, 8, 16);

    // Material baseado no tipo
    let color: number;
    switch (material) {
        case 'gold':
            color = 0xFFD700;
            break;
        case 'silver':
            color = 0xC0C0C0;
            break;
        case 'platinum':
            color = 0xE5E4E2;
            break;
    }

    const meshMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 1.0,
        roughness: 0.1,
        reflectivity: 0.9
    });

    const ring = new THREE.Mesh(geometry, meshMaterial);

    // Posicionamento inicial no centro
    ring.position.set(0, 0, 0);
    ring.rotation.x = Math.PI / 2; // 90 graus para orientação correta

    return ring;
}

/**
 * Adicionar anel
 */
function addRing(material: 'gold' | 'silver' | 'platinum'): string {
    const ring = createSimpleRing(material);
    scene.add(ring);

    const ringId = `ring_${Date.now()}`;
    rings.set(ringId, ring);

    showNotification(`Anel de ${material} adicionado!`);
    console.log(`✅ Anel adicionado: ${ringId}`);

    return ringId;
}

/**
 * Remover todos os anéis
 */
function removeAllRings(): void {
    rings.forEach((ring) => {
        scene.remove(ring);
    });
    rings.clear();
    showNotification('Todos os anéis removidos');
    console.log('🗑️ Anéis removidos');
}

/**
 * Screenshot
 */
function takeScreenshot(): void {
    renderer.render(scene, camera);
    const screenshot = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = `ring-simple-${Date.now()}.png`;
    link.href = screenshot;
    link.click();

    showNotification('Screenshot capturado!');
}

/**
 * Animation loop
 */
function animate(): void {
    if (!isRunning) return;

    requestAnimationFrame(animate);

    // FPS calculation
    frameCount++;
    const now = performance.now();
    if (now - lastFPS >= 1000) {
        currentFPS = Math.round((frameCount * 1000) / (now - lastFPS));
        frameCount = 0;
        lastFPS = now;

        // Update FPS display
        const fpsElement = document.getElementById('fps-counter');
        if (fpsElement) {
            fpsElement.textContent = `${currentFPS} FPS`;
        }
    }

    // Animate rings (optional rotation)
    rings.forEach((ring) => {
        ring.rotation.z += 0.005; // Slow rotation for demo
    });

    // Render
    renderer.render(scene, camera);
}

/**
 * Setup controles globais
 */
function setupControls(): void {
    // Materiais
    (window as any).addGoldRing = () => addRing('gold');
    (window as any).addSilverRing = () => addRing('silver');
    (window as any).addPlatinumRing = () => addRing('platinum');

    // Ações
    (window as any).removeAllRings = removeAllRings;
    (window as any).takeScreenshot = takeScreenshot;

    // Lighting presets (simple)
    (window as any).applyStudioLighting = () => showNotification('Iluminação de estúdio');
    (window as any).applyJewelryLighting = () => showNotification('Iluminação de joalheria');
    (window as any).applyDaylightLighting = () => showNotification('Luz natural');
    (window as any).applyLuxuryLighting = () => showNotification('Iluminação luxo');

    // Recording placeholder
    (window as any).toggleRecording = () => showNotification('Gravação em desenvolvimento');

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                takeScreenshot();
                break;
            case 'KeyG':
                event.preventDefault();
                addRing('gold');
                break;
            case 'KeyS':
                event.preventDefault();
                addRing('silver');
                break;
            case 'KeyP':
                event.preventDefault();
                addRing('platinum');
                break;
            case 'KeyR':
                event.preventDefault();
                removeAllRings();
                break;
        }
    });

    console.log('🎛️ Controles simples configurados');
}

/**
 * System monitoring
 */
function setupSystemMonitoring(): void {
    setInterval(() => {
        // Update hand status (mock)
        const handElement = document.getElementById('hand-status');
        if (handElement) {
            handElement.textContent = 'Sistema Ativo';
            handElement.className = 'status-active';
        }

        // Update ring count
        const ringElement = document.getElementById('ring-count');
        if (ringElement) {
            ringElement.textContent = `${rings.size} Anéis`;
        }
    }, 1000);
}

/**
 * Show notification
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

    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Resize handler
 */
function onResize(): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

/**
 * Inicialização principal
 */
async function initializeSystem(): Promise<void> {
    try {
        console.log('🚀 Iniciando Sistema Simples...');

        initializeThreeJS();
        setupControls();
        setupSystemMonitoring();

        // Resize handler
        window.addEventListener('resize', onResize);

        // Start animation
        isRunning = true;
        animate();

        // Remove loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 300);
        }

        console.log('✅ Sistema Simples ativo!');
        showNotification('Sistema funcionando! Use os controles.');

    } catch (error) {
        console.error('❌ Erro:', error);
        showNotification(`❌ Erro: ${error}`, 5000);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    initializeSystem();
}

export { addRing, removeAllRings, takeScreenshot };