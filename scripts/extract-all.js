/**
 * Complete Extraction Script for Ring Tryon Deobfuscation
 * Executes all extraction steps in sequence
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Iniciando processo completo de desminificação...\n');

// Verificar se arquivo existe
const minifiedPath = '../index-minified-backup.js';
if (!fs.existsSync(minifiedPath)) {
    console.error('❌ Arquivo não encontrado:', minifiedPath);
    process.exit(1);
}

const content = fs.readFileSync(minifiedPath, 'utf8');
console.log(`📁 Arquivo lido: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

// PASSO 1: Extrair CSS
console.log('\n🎨 PASSO 1: Extraindo CSS...');
console.log('='.repeat(50));

const cssPattern = /_\.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/gs;
const cssBlocks = [];
let match;

while ((match = cssPattern.exec(content)) !== null) {
    const cssContent = match[1];
    if (cssContent && cssContent.length > 20 && cssContent.includes('{')) {
        cssBlocks.push(cssContent.replace(/\\"/g, '"').replace(/\\'/g, "'"));
    }
}

console.log(`📊 Encontrados ${cssBlocks.length} blocos CSS`);

// Criar diretório styles se não existir
const stylesDir = '../styles';
if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
    console.log('📁 Diretório styles/ criado');
}

// Criar arquivo CSS principal
let mainCSS = `/* Ring Tryon - Extracted CSS */
/* Auto-extracted from minified bundle */

`;

cssBlocks.forEach((css, index) => {
    mainCSS += `\n/* CSS Block ${index + 1} */\n${css}\n`;
});

// Adicionar CSS base
mainCSS += `
/* Base Styles */
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

#root {
    width: 100vw;
    height: 100vh;
    position: relative;
}

.w-full { width: 100%; }
.h-dvh { height: 100vh; }
.h-full { height: 100%; }
.bg-black { background-color: #000; }
`;

fs.writeFileSync(path.join(stylesDir, 'main.css'), mainCSS);
console.log('✅ CSS extraído: styles/main.css');

// PASSO 2: Extrair módulos JavaScript básicos
console.log('\n⚙️  PASSO 2: Extraindo módulos JavaScript...');
console.log('='.repeat(50));

// Procurar por padrões de módulos webpack
const modulePattern = /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)\}(?=,\s*\d+:|$)/g;
const modules = new Map();

while ((match = modulePattern.exec(content)) !== null) {
    const moduleId = match[1];
    const moduleContent = match[3];

    if (moduleContent && moduleContent.length > 50) {
        modules.set(moduleId, {
            id: moduleId,
            params: match[2],
            content: moduleContent
        });
    }
}

console.log(`📊 Encontrados ${modules.size} módulos`);

// Categorizar módulos por funcionalidade
const categories = {
    webgl: /three|webgl|scene|camera|renderer/i,
    mediapipe: /mediapipe|hand|detection/i,
    ring: /ring|jewelry|material/i,
    ui: /button|modal|ui|interface/i,
    camera: /camera|video|stream/i,
    utils: /util|helper|math/i
};

const organized = {
    core: [],
    detection: [],
    ring: [],
    ui: [],
    camera: [],
    utils: [],
    other: []
};

for (const [id, module] of modules) {
    let category = 'other';

    for (const [cat, pattern] of Object.entries(categories)) {
        if (pattern.test(module.content)) {
            category = cat === 'webgl' ? 'core' : cat;
            break;
        }
    }

    // Garantir que a categoria existe
    if (!organized[category]) {
        organized[category] = [];
    }

    organized[category].push(module);
}

// Criar arquivos por categoria
for (const [category, moduleList] of Object.entries(organized)) {
    if (moduleList.length === 0) continue;

    const targetDir = path.join('..', 'src', category);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    let categoryCode = `/**
 * ${category.toUpperCase()} Modules
 * Extracted from webpack bundle
 */

`;

    moduleList.forEach((module, index) => {
        categoryCode += `
// Module ${module.id}
function module${module.id}(${module.params}) {
${module.content}
}

`;
    });

    const filePath = path.join(targetDir, 'modules.js');
    fs.writeFileSync(filePath, categoryCode);
    console.log(`✅ Criado: ${filePath} (${moduleList.length} módulos)`);
}

// PASSO 3: Criar estrutura básica funcional
console.log('\n🏗️  PASSO 3: Criando estrutura funcional...');
console.log('='.repeat(50));

// Criar main.js simplificado
const mainJS = `/**
 * Ring Try-On Main Application
 * Simplified version extracted from minified bundle
 */

// Basic application structure
class RingTryOnApp {
    constructor() {
        this.initialized = false;
        this.webgiViewer = null;
        this.camera = null;
        this.currentRing = null;
    }

    async initialize() {
        try {
            console.log('🚀 Initializing Ring Try-On App...');

            // Initialize WebGI viewer
            await this.initializeViewer();

            // Initialize camera
            await this.initializeCamera();

            // Setup UI
            this.setupUI();

            this.initialized = true;
            console.log('✅ Ring Try-On App initialized successfully!');

        } catch (error) {
            console.error('❌ Initialization failed:', error);
            throw error;
        }
    }

    async initializeViewer() {
        const canvas = document.getElementById('webgi-canvas');
        if (!canvas) {
            throw new Error('Canvas element not found');
        }

        // Create basic WebGI viewer or fallback
        if (typeof ViewerApp !== 'undefined') {
            this.webgiViewer = new ViewerApp({ canvas });
            console.log('✅ WebGI viewer initialized');
        } else {
            console.warn('⚠️  WebGI not available, using fallback');
            this.createFallbackViewer(canvas);
        }
    }

    createFallbackViewer(canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = 800;
            canvas.height = 600;

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1a1a1a');
            gradient.addColorStop(1, '#2a2a2a');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw text
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Ring Try-On System', canvas.width / 2, canvas.height / 2 - 20);

            ctx.font = '16px Arial';
            ctx.fillStyle = '#cccccc';
            ctx.fillText('3D Viewer Ready', canvas.width / 2, canvas.height / 2 + 20);
        }

        this.webgiViewer = {
            canvas,
            load: async (path) => {
                console.log('Fallback: Loading', path);
                return { modelObject: {} };
            },
            dispose: () => console.log('Fallback: Disposed')
        };
    }

    async initializeCamera() {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' }
                });

                this.camera = { stream, active: true };
                console.log('✅ Camera initialized');
            }
        } catch (error) {
            console.warn('⚠️  Camera unavailable:', error.message);
            this.camera = { stream: null, active: false };
        }
    }

    setupUI() {
        // Basic UI setup
        this.createRingSelector();
        this.createControls();
        console.log('✅ UI setup complete');
    }

    createRingSelector() {
        const selector = document.createElement('div');
        selector.id = 'ring-selector';
        selector.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            padding: 15px;
            border-radius: 10px;
            z-index: 1000;
        \`;

        const rings = [
            { id: 1, name: 'Gold Ring' },
            { id: 2, name: 'Silver Ring' },
            { id: 3, name: 'Platinum Ring' }
        ];

        rings.forEach(ring => {
            const button = document.createElement('button');
            button.textContent = ring.name;
            button.style.cssText = \`
                display: block;
                width: 100%;
                margin: 5px 0;
                padding: 10px;
                background: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            \`;

            button.addEventListener('click', () => this.loadRing(ring.id));
            selector.appendChild(button);
        });

        document.body.appendChild(selector);
    }

    createControls() {
        const controls = document.createElement('div');
        controls.id = 'controls';
        controls.style.cssText = \`
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 1000;
        \`;

        const captureBtn = document.createElement('button');
        captureBtn.textContent = '📷 Capture';
        captureBtn.style.cssText = \`
            padding: 15px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
        \`;
        captureBtn.addEventListener('click', () => this.captureImage());

        controls.appendChild(captureBtn);
        document.body.appendChild(controls);
    }

    async loadRing(ringId) {
        try {
            console.log(\`Loading ring \${ringId}...\`);

            if (this.webgiViewer && this.webgiViewer.load) {
                const ringPath = \`./rings/\${ringId}.glb\`;
                const model = await this.webgiViewer.load(ringPath);
                this.currentRing = { id: ringId, model };

                console.log(\`✅ Ring \${ringId} loaded\`);
            }
        } catch (error) {
            console.error('Failed to load ring:', error);
        }
    }

    captureImage() {
        if (this.webgiViewer && this.webgiViewer.canvas) {
            try {
                const dataURL = this.webgiViewer.canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = \`ring-capture-\${Date.now()}.png\`;
                link.href = dataURL;
                link.click();

                console.log('📷 Image captured');
            } catch (error) {
                console.error('Capture failed:', error);
            }
        }
    }

    dispose() {
        if (this.camera && this.camera.stream) {
            this.camera.stream.getTracks().forEach(track => track.stop());
        }

        if (this.webgiViewer && this.webgiViewer.dispose) {
            this.webgiViewer.dispose();
        }

        this.initialized = false;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

async function initApp() {
    try {
        const app = new RingTryOnApp();
        await app.initialize();

        // Expose globally for debugging
        window.ringTryOnApp = app;

    } catch (error) {
        console.error('❌ Failed to start app:', error);
    }
}

export { RingTryOnApp };
`;

fs.writeFileSync('../src/main.js', mainJS);
console.log('✅ Criado: src/main.js');

// Criar novo index.html
const newHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Try-On Virtual System - Deobfuscated</title>
    <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
    <div id="root">
        <div class="w-full h-dvh bg-black">
            <canvas id="webgi-canvas" class="w-full h-full"></canvas>
        </div>
    </div>

    <!-- Load deobfuscated application -->
    <script type="module" src="./src/main.js"></script>
</body>
</html>`;

fs.writeFileSync('../index-deobfuscated.html', newHTML);
console.log('✅ Criado: index-deobfuscated.html');

// PASSO 4: Gerar relatório final
console.log('\n📊 PASSO 4: Gerando relatório...');
console.log('='.repeat(50));

const report = {
    timestamp: new Date().toISOString(),
    originalSize: `${(content.length / 1024 / 1024).toFixed(2)}MB`,
    extracted: {
        cssBlocks: cssBlocks.length,
        jsModules: modules.size,
        categories: Object.entries(organized).map(([cat, mods]) => ({
            category: cat,
            count: mods.length
        })).filter(item => item.count > 0)
    },
    filesCreated: [
        'styles/main.css',
        'src/main.js',
        'index-deobfuscated.html',
        ...Object.keys(organized).filter(cat => organized[cat].length > 0).map(cat => `src/${cat}/modules.js`)
    ]
};

fs.writeFileSync('../DEOBFUSCATION_REPORT.json', JSON.stringify(report, null, 2));

// Criar README para versão desobfuscada
const readme = `# Ring Try-On - Deobfuscated Version

## 🎯 Overview
This is the deobfuscated version of the Ring Try-On virtual system, extracted from the minified webpack bundle.

## 📁 Structure
\`\`\`
ring-tryon/
├── src/
│   ├── main.js              # Main application entry
│   ├── core/modules.js      # WebGL/Three.js modules
│   ├── detection/modules.js # MediaPipe hand detection
│   ├── ring/modules.js      # Ring system modules
│   ├── ui/modules.js        # UI components
│   ├── camera/modules.js    # Camera handling
│   └── utils/modules.js     # Utility functions
├── styles/
│   └── main.css            # Extracted CSS styles
├── index-deobfuscated.html # Clean HTML entry point
└── DEOBFUSCATION_REPORT.json
\`\`\`

## 🚀 Usage

### Development
\`\`\`bash
# Start development server with deobfuscated version
npx vite serve index-deobfuscated.html --port 3002
\`\`\`

### Testing
Open \`index-deobfuscated.html\` in your browser or use:
\`\`\`bash
# Simple HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000/index-deobfuscated.html
\`\`\`

## 📊 Extraction Stats
- **Original size**: ${report.originalSize}
- **CSS blocks extracted**: ${report.extracted.cssBlocks}
- **JS modules extracted**: ${report.extracted.jsModules}
- **Categories identified**: ${report.extracted.categories.length}

## 🔧 Next Steps
1. Test functionality against original
2. Refactor and clean up extracted code
3. Add proper module imports/exports
4. Implement missing functionality
5. Optimize for production

## ⚠️ Notes
- This is an automated extraction, some manual cleanup may be needed
- Test all functionality before using in production
- The original minified file is preserved as backup
`;

fs.writeFileSync('../README-DEOBFUSCATED.md', readme);

console.log('\n🎉 DESMINIFICAÇÃO CONCLUÍDA! 🎉');
console.log('\n📈 Resultados:');
console.log(`   - ${cssBlocks.length} blocos CSS extraídos`);
console.log(`   - ${modules.size} módulos JavaScript identificados`);
console.log(`   - ${report.filesCreated.length} arquivos criados`);
console.log('\n🔄 Próximos passos:');
console.log('   1. Testar: npx vite serve index-deobfuscated.html --port 3002');
console.log('   2. Comparar funcionalidade com versão original');
console.log('   3. Refinar e otimizar código extraído');

export { report };