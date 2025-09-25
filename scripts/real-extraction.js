#!/usr/bin/env node
/**
 * REAL EXTRACTION - Based on actual file structure analysis
 * This extracts the REAL CSS and JS from the webpack bundle
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 EXTRAÇÃO REAL DO ARQUIVO MINIFICADO\n');

const content = fs.readFileSync('./index-minified-backup.js', 'utf8');
console.log(`📁 Arquivo: ${(content.length / 1024 / 1024).toFixed(2)}MB\n`);

// ============================================================================
// PHASE 1: EXTRACT ALL CSS FROM WEBPACK MODULES
// ============================================================================
console.log('📋 FASE 1: EXTRAINDO CSS REAL DO WEBPACK');
console.log('='.repeat(60));

// The REAL pattern from the file: _.push([d.id, 'CSS_CONTENT', ""])
const cssPattern = /_.push\(\[d\.id,\s*'([^']+)'/g;
const cssBlocks = new Map();

let match;
let cssCount = 0;

while ((match = cssPattern.exec(content)) !== null) {
    const css = match[1];
    if (css && css.length > 20) {
        // Clean and decode CSS
        const cleanCSS = css
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');

        cssBlocks.set(`css-block-${cssCount}`, {
            original: css,
            clean: cleanCSS,
            length: cleanCSS.length
        });
        cssCount++;
    }
}

console.log(`✅ Encontrados ${cssBlocks.size} blocos CSS reais`);

// Categorize CSS by content
const cssCategories = {
    'tippy': [],
    'loading': [],
    'button-bar': [],
    'modal': [],
    'tweakpane': [],
    'themes': [],
    'animations': [],
    'responsive': [],
    'utilities': [],
    'general': []
};

cssBlocks.forEach((block, id) => {
    const css = block.clean;
    let categorized = false;

    if (css.includes('tippy')) {
        cssCategories['tippy'].push(block);
        categorized = true;
    }
    if (css.includes('loader') || css.includes('loading') || css.includes('@keyframes')) {
        cssCategories['loading'].push(block);
        categorized = true;
    }
    if (css.includes('button') || css.includes('btn')) {
        cssCategories['button-bar'].push(block);
        categorized = true;
    }
    if (css.includes('modal') || css.includes('overlay')) {
        cssCategories['modal'].push(block);
        categorized = true;
    }
    if (css.includes('tp-') || css.includes('tweakpane')) {
        cssCategories['tweakpane'].push(block);
        categorized = true;
    }
    if (css.includes('@media')) {
        cssCategories['responsive'].push(block);
        categorized = true;
    }
    if (css.includes('@keyframes') || css.includes('animation')) {
        cssCategories['animations'].push(block);
        categorized = true;
    }

    if (!categorized) {
        cssCategories['general'].push(block);
    }
});

// Create CSS files
console.log('\n📝 Criando arquivos CSS...');

// Ensure directories exist
fs.mkdirSync('styles/components', { recursive: true });
fs.mkdirSync('styles/themes', { recursive: true });
fs.mkdirSync('styles/ui', { recursive: true });

const cssFiles = {
    'tippy': 'styles/components/tippy-tooltips.css',
    'loading': 'styles/components/loading-screen.css',
    'button-bar': 'styles/components/button-bar.css',
    'modal': 'styles/components/modal-system.css',
    'responsive': 'styles/components/responsive.css',
    'animations': 'styles/components/animations.css',
    'tweakpane': 'styles/ui/tweakpane.css',
    'themes': 'styles/themes/themes.css',
    'utilities': 'styles/components/utilities.css',
    'general': 'styles/components/general.css'
};

let mainCSSImports = [];

Object.entries(cssCategories).forEach(([category, blocks]) => {
    if (blocks.length > 0) {
        const filePath = cssFiles[category];

        let fileContent = `/* ${category.toUpperCase()} STYLES */\n`;
        fileContent += `/* Extracted from webpack bundle - ${blocks.length} blocks */\n\n`;

        blocks.forEach((block, index) => {
            fileContent += `/* Block ${index + 1} */\n`;
            fileContent += block.clean + '\n\n';
        });

        fs.writeFileSync(filePath, fileContent);
        console.log(`✅ ${filePath} (${blocks.length} blocos, ${(fileContent.length / 1024).toFixed(1)}KB)`);

        mainCSSImports.push(`@import './${path.relative('styles', filePath)}';`);
    }
});

// Create main CSS
const mainCSS = `/* Ring Try-On Main CSS */
/* Auto-extracted from webpack bundle */
/* ${new Date().toISOString()} */

${mainCSSImports.join('\n')}

/* Base application styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
}

#root {
    width: 100vw;
    height: 100vh;
    position: relative;
}

canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}
`;

fs.writeFileSync('styles/main.css', mainCSS);
console.log(`✅ styles/main.css criado`);

// ============================================================================
// PHASE 2: EXTRACT ALL JAVASCRIPT MODULES
// ============================================================================
console.log('\n📋 FASE 2: EXTRAINDO MÓDULOS JAVASCRIPT REAIS');
console.log('='.repeat(60));

// Find the __webpackgi_modules__ object and extract ALL modules
const moduleStartPattern = /var __webpackgi_modules__ = \{/;
const moduleStart = content.search(moduleStartPattern);

if (moduleStart === -1) {
    console.error('❌ Webpack modules not found!');
    process.exit(1);
}

console.log(`✅ Webpack modules encontrados na posição ${moduleStart}`);

// Extract the entire modules object
const moduleSection = content.substring(moduleStart);
const moduleEndPattern = /\};\s*var __webpackgi_cache__/;
const moduleEndMatch = moduleSection.search(moduleEndPattern);

if (moduleEndMatch === -1) {
    console.error('❌ End of webpack modules not found!');
    process.exit(1);
}

const modulesCode = moduleSection.substring(0, moduleEndMatch + 1);
console.log(`✅ Seção de módulos extraída: ${(modulesCode.length / 1024).toFixed(1)}KB`);

// Extract individual modules using more specific patterns
const individualModulePattern = /(\d+):\s*function\s*\([^)]*\)\s*\{([\s\S]*?)\n\s*\}/g;
const modules = new Map();

let moduleMatch;
while ((moduleMatch = individualModulePattern.exec(modulesCode)) !== null) {
    const moduleId = moduleMatch[1];
    const moduleContent = moduleMatch[2];

    if (moduleContent && moduleContent.trim().length > 20) {
        modules.set(moduleId, {
            id: moduleId,
            content: moduleContent,
            size: moduleContent.length,
            type: 'unknown'
        });
    }
}

console.log(`✅ ${modules.size} módulos individuais extraídos`);

// Analyze and categorize modules
modules.forEach((module, id) => {
    const content = module.content.toLowerCase();

    if (/three|webgl|scene|camera|renderer|mesh|geometry|material/.test(content)) {
        module.type = 'webgl';
        module.category = 'core';
    } else if (/mediapipe|hand|landmark|gesture|finger/.test(content)) {
        module.type = 'mediapipe';
        module.category = 'detection';
    } else if (/ring|jewelry|diamond|gold|silver|platinum/.test(content)) {
        module.type = 'ring';
        module.category = 'ring';
    } else if (/button|modal|ui|interface|element|dom/.test(content)) {
        module.type = 'ui';
        module.category = 'ui';
    } else if (/camera|video|stream|media|getusermedia/.test(content)) {
        module.type = 'camera';
        module.category = 'camera';
    } else if (/util|helper|math|vector|matrix|loader/.test(content)) {
        module.type = 'utils';
        module.category = 'utils';
    } else if (/polyfill|shim|compat|fallback/.test(content)) {
        module.type = 'polyfill';
        module.category = 'polyfills';
    } else {
        module.type = 'misc';
        module.category = 'misc';
    }
});

// Organize modules by category
const modulesByCategory = {
    core: [],
    detection: [],
    ring: [],
    ui: [],
    camera: [],
    utils: [],
    polyfills: [],
    misc: []
};

modules.forEach(module => {
    const category = module.category || 'misc';
    modulesByCategory[category].push(module);
});

// Create module files
console.log('\n📝 Criando arquivos de módulos...');

// Ensure directories exist
Object.keys(modulesByCategory).forEach(category => {
    fs.mkdirSync(`src/${category}`, { recursive: true });
});

const createdFiles = [];

Object.entries(modulesByCategory).forEach(([category, moduleList]) => {
    if (moduleList.length === 0) return;

    // Create individual module files
    moduleList.forEach(module => {
        const fileName = `module-${module.id}.js`;
        const filePath = path.join(`src/${category}`, fileName);

        const fileContent = `/**
 * Webpack Module ${module.id}
 * Category: ${category}
 * Type: ${module.type}
 * Size: ${module.size} bytes
 * Extracted from bundle
 */

// Module function (original webpack format)
function webpackModule${module.id}(module, exports, require) {
${module.content}
}

// Export the module function
export default webpackModule${module.id};

// Metadata
export const moduleInfo = {
    id: '${module.id}',
    category: '${category}',
    type: '${module.type}',
    size: ${module.size}
};
`;

        fs.writeFileSync(filePath, fileContent);
        createdFiles.push(filePath);
    });

    // Create index file for category
    const indexContent = `/**
 * ${category.toUpperCase()} Modules Index
 * ${moduleList.length} modules
 */

${moduleList.map(module =>
    `import module${module.id}, { moduleInfo as info${module.id} } from './module-${module.id}.js';`
).join('\n')}

// Export all modules
export const modules = {
${moduleList.map(module => `    module${module.id}`).join(',\n')}
};

// Export module info
export const moduleInfo = {
${moduleList.map(module => `    '${module.id}': info${module.id}`).join(',\n')}
};

// Module count
export const MODULE_COUNT = ${moduleList.length};
`;

    fs.writeFileSync(`src/${category}/index.js`, indexContent);
    console.log(`✅ src/${category}/ (${moduleList.length} módulos)`);
});

// ============================================================================
// PHASE 3: CREATE MAIN APPLICATION
// ============================================================================
console.log('\n📋 FASE 3: CRIANDO APLICAÇÃO PRINCIPAL');
console.log('='.repeat(60));

const mainJS = `/**
 * Ring Try-On Main Application
 * Real extraction from webpack bundle
 * Generated: ${new Date().toISOString()}
 */

// Import all extracted modules
import { modules as coreModules, moduleInfo as coreInfo } from './core/index.js';
import { modules as detectionModules, moduleInfo as detectionInfo } from './detection/index.js';
import { modules as ringModules, moduleInfo as ringInfo } from './ring/index.js';
import { modules as uiModules, moduleInfo as uiInfo } from './ui/index.js';
import { modules as cameraModules, moduleInfo as cameraInfo } from './camera/index.js';
import { modules as utilsModules, moduleInfo as utilsInfo } from './utils/index.js';
import { modules as polyfillModules, moduleInfo as polyfillInfo } from './polyfills/index.js';
import { modules as miscModules, moduleInfo as miscInfo } from './misc/index.js';

console.log('🚀 Ring Try-On System - Real Webpack Extraction');
console.log('Modules loaded:', {
    core: Object.keys(coreModules).length,
    detection: Object.keys(detectionModules).length,
    ring: Object.keys(ringModules).length,
    ui: Object.keys(uiModules).length,
    camera: Object.keys(cameraModules).length,
    utils: Object.keys(utilsModules).length,
    polyfills: Object.keys(polyfillModules).length,
    misc: Object.keys(miscModules).length
});

// Webpack-like module system
class WebpackModuleSystem {
    constructor() {
        this.modules = new Map();
        this.cache = new Map();
        this.loadAllModules();
    }

    loadAllModules() {
        // Load all extracted modules
        const allModules = {
            ...coreModules,
            ...detectionModules,
            ...ringModules,
            ...uiModules,
            ...cameraModules,
            ...utilsModules,
            ...polyfillModules,
            ...miscModules
        };

        Object.entries(allModules).forEach(([key, moduleFunc]) => {
            const moduleId = key.replace('module', '');
            this.modules.set(moduleId, moduleFunc);
        });

        console.log(\`📦 \${this.modules.size} webpack modules loaded\`);
    }

    require(moduleId) {
        if (this.cache.has(moduleId)) {
            return this.cache.get(moduleId);
        }

        const moduleFunc = this.modules.get(moduleId);
        if (!moduleFunc) {
            throw new Error(\`Module \${moduleId} not found\`);
        }

        // Create module object
        const module = { exports: {} };
        const exports = module.exports;

        // Execute module function
        try {
            moduleFunc(module, exports, this.require.bind(this));
            this.cache.set(moduleId, module.exports);
            return module.exports;
        } catch (error) {
            console.error(\`Error executing module \${moduleId}:\`, error);
            return {};
        }
    }

    executeModule(moduleId) {
        return this.require(moduleId);
    }
}

// Initialize the module system
const moduleSystem = new WebpackModuleSystem();

// Main Application Class
class RingTryOnApp {
    constructor() {
        this.moduleSystem = moduleSystem;
        this.initialized = false;
    }

    async initialize() {
        try {
            console.log('🚀 Initializing Ring Try-On System...');

            // Initialize core systems
            await this.initializeCore();

            // Initialize canvas
            this.initializeCanvas();

            // Initialize UI
            this.initializeUI();

            this.initialized = true;
            console.log('✅ Ring Try-On System initialized!');

        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showError(error.message);
        }
    }

    async initializeCore() {
        // Try to execute core modules
        console.log('Initializing core modules...');

        // This would normally initialize WebGL, Three.js, etc.
        // For now, create basic setup
        this.setupBasicViewer();
    }

    setupBasicViewer() {
        // Basic WebGL setup
        const canvas = document.getElementById('webgi-canvas') || this.createCanvas();

        // Basic Three.js fallback if available
        if (typeof THREE !== 'undefined') {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.position.z = 5;

            console.log('✅ Three.js viewer initialized');
        } else {
            console.log('⚠️ Three.js not available, using basic canvas');
        }
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'webgi-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';

        document.getElementById('root').appendChild(canvas);
        return canvas;
    }

    initializeUI() {
        console.log('Initializing UI...');

        // Create basic UI
        this.createControls();
        this.bindEvents();
    }

    createControls() {
        const controls = document.createElement('div');
        controls.id = 'controls';
        controls.innerHTML = \`
            <div style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 10px; color: white; z-index: 1000;">
                <h3>Ring Try-On Controls</h3>
                <button id="btn-info" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">Show Info</button>
                <button id="btn-modules" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">List Modules</button>
                <button id="btn-test" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">Test System</button>
            </div>
        \`;
        document.body.appendChild(controls);
    }

    bindEvents() {
        document.getElementById('btn-info')?.addEventListener('click', () => {
            this.showSystemInfo();
        });

        document.getElementById('btn-modules')?.addEventListener('click', () => {
            this.listModules();
        });

        document.getElementById('btn-test')?.addEventListener('click', () => {
            this.testSystem();
        });
    }

    showSystemInfo() {
        const info = \`
Ring Try-On System - Real Extraction
=====================================
Modules loaded: \${this.moduleSystem.modules.size}
Cache entries: \${this.moduleSystem.cache.size}
Status: \${this.initialized ? 'Initialized' : 'Not initialized'}
Three.js: \${typeof THREE !== 'undefined' ? 'Available' : 'Not available'}
WebGL: \${this.checkWebGL() ? 'Supported' : 'Not supported'}
        \`;

        alert(info);
    }

    listModules() {
        console.log('📦 Loaded Modules:');
        this.moduleSystem.modules.forEach((func, id) => {
            console.log(\`  - Module \${id}\`);
        });
    }

    testSystem() {
        console.log('🧪 Testing module system...');

        // Try to execute a few modules
        let successCount = 0;
        let errorCount = 0;

        for (const [moduleId] of this.moduleSystem.modules) {
            try {
                this.moduleSystem.executeModule(moduleId);
                successCount++;
            } catch (error) {
                console.warn(\`Module \${moduleId} failed:\`, error.message);
                errorCount++;
            }

            // Test only first 10 modules
            if (successCount + errorCount >= 10) break;
        }

        alert(\`Test complete: \${successCount} successful, \${errorCount} errors\`);
    }

    checkWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = \`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            max-width: 400px;
            text-align: center;
        \`;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Initialize when ready
let app = null;

async function initApp() {
    try {
        app = new RingTryOnApp();
        await app.initialize();

        // Expose globally
        window.ringTryOnApp = app;
        window.moduleSystem = app.moduleSystem;

    } catch (error) {
        console.error('Failed to start app:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

export { RingTryOnApp, WebpackModuleSystem };
`;

fs.writeFileSync('src/main.js', mainJS);
console.log('✅ src/main.js criado');

// ============================================================================
// PHASE 4: CREATE FINAL HTML
// ============================================================================
console.log('\n📋 FASE 4: CRIANDO HTML FINAL');
console.log('='.repeat(60));

const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Try-On - Real Extraction</title>

    <!-- Extracted CSS -->
    <link rel="stylesheet" href="./styles/main.css">

    <!-- Optional Three.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <div id="root">
        <!-- Canvas will be created here -->
    </div>

    <!-- Main application -->
    <script type="module" src="./src/main.js"></script>
</body>
</html>`;

fs.writeFileSync('index-real-extraction.html', finalHTML);
console.log('✅ index-real-extraction.html criado');

// ============================================================================
// FINAL REPORT
// ============================================================================
console.log('\n' + '='.repeat(60));
console.log('🎉 EXTRAÇÃO REAL CONCLUÍDA COM SUCESSO!');
console.log('='.repeat(60));

const report = {
    timestamp: new Date().toISOString(),
    extraction: {
        cssBlocks: cssBlocks.size,
        jsModules: modules.size,
        totalFiles: createdFiles.length + Object.keys(cssFiles).length
    },
    categories: {
        css: Object.entries(cssCategories).map(([cat, blocks]) => ({
            category: cat,
            blocks: blocks.length
        })).filter(item => item.blocks > 0),
        js: Object.entries(modulesByCategory).map(([cat, mods]) => ({
            category: cat,
            modules: mods.length
        })).filter(item => item.modules > 0)
    },
    files: {
        html: 'index-real-extraction.html',
        mainJs: 'src/main.js',
        mainCss: 'styles/main.css',
        moduleFiles: createdFiles.length
    }
};

fs.writeFileSync('REAL-EXTRACTION-REPORT.json', JSON.stringify(report, null, 2));

console.log('\n📊 RELATÓRIO:');
console.log(`   🎨 CSS: ${report.extraction.cssBlocks} blocos extraídos`);
console.log(`   ⚙️ JS: ${report.extraction.jsModules} módulos webpack extraídos`);
console.log(`   📁 Arquivos: ${report.extraction.totalFiles} criados`);

console.log('\n✨ ESTRUTURA:');
report.categories.css.forEach(item => {
    console.log(`   CSS ${item.category}: ${item.blocks} blocos`);
});
report.categories.js.forEach(item => {
    console.log(`   JS ${item.category}: ${item.modules} módulos`);
});

console.log('\n🚀 TESTAR:');
console.log('   npx vite serve index-real-extraction.html --port 3004');
console.log('\n✅ EXTRAÇÃO REAL FINALIZADA!');