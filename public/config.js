/**
 * CONFIGURAÇÃO DO SISTEMA UNIFICADO
 * Configurações para integração WebAR.rocks + YOLO11
 */

window.RING_TRYON_CONFIG = {
    // WebAR.rocks paths  
    webAR: {
        neuralNetsPath: './WebAR.rocks-2.hand-master/neuralNets/',
        wristModel: 'NN_WRIST_27.json',
        ringModel: 'NN_RING_14.json',
        confidence: 0.8,
        stabilization: true
    },
    
    // YOLO11 configuration
    yolo: {
        enabled: false, // Ativar quando estiver pronto
        modelPath: './YOLO11n-pose-hands-main/runs/pose/train/weights/best.pt',
        confidenceThreshold: 0.5
    },
    
    // Rendering settings
    rendering: {
        quality: 'high',
        shadows: true,
        pbr: true,
        targetFPS: 60
    },
    
    // Debug settings
    debug: {
        showLandmarks: false,
        showFPS: true,
        console: true
    }
};

console.log('✅ Ring Try-On Config loaded');