/**
 * EXTRAÇÃO ULTRA-ROBUSTA - TUDO do arquivo minificado
 * Este script vai extrair literalmente TUDO usando múltiplos métodos
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 EXTRAÇÃO ULTRA-ROBUSTA - MODO COMPLETO');
console.log('='.repeat(80));

const content = fs.readFileSync('../index-minified-backup.js', 'utf8');
console.log(`📁 Arquivo: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

// ==================== ESTRATÉGIA 1: EXTRAÇÃO POR BLOCOS FUNCIONAIS ====================
console.log('\n📦 ESTRATÉGIA 1: Extraindo por blocos funcionais...');

// Dividir o arquivo em seções lógicas
const sections = {
    modulePreload: content.match(/\(function\(\)\s*\{[\s\S]*?\}\)\(\);/g) || [],
    webpackModules: content.match(/__webpack[^}]*\}\s*;/g) || [],
    iife: content.match(/\(function\([^)]*\)\s*\{[\s\S]*?\}\)\([^)]*\);/g) || [],
    classDefinitions: content.match(/class\s+\w+(?:\s+extends\s+\w+)?\s*\{[\s\S]*?\n\}/g) || [],
    objectDefinitions: content.match(/const\s+\w+\s*=\s*\{[\s\S]*?\n\};/g) || [],
    functionDeclarations: content.match(/function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\n\}/g) || []
};

console.log('Blocos funcionais encontrados:');
Object.entries(sections).forEach(([type, blocks]) => {
    console.log(`  ${type}: ${blocks.length} blocos`);
});

// ==================== ESTRATÉGIA 2: EXTRAÇÃO WEBPACK AVANÇADA ====================
console.log('\n⚙️ ESTRATÉGIA 2: Webpack modules avançados...');

// Padrões mais agressivos para modules
const advancedPatterns = [
    // Webpack standard
    /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)\}(?=,\s*\d+:|,\s*\})/g,
    // Arrow functions
    /(\d+):\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\}(?=,\s*\d+:|,\s*\})/g,
    // Direct assignments
    /(\d+):\s*\{([\s\S]*?)\}(?=,\s*\d+:|,\s*\})/g,
    // AMD style
    /(\d+):\s*\(function\(([^)]*)\)\s*\{([\s\S]*?)\}\)(?=,\s*\d+:|,\s*\})/g,
    // CommonJS style
    /(\d+):\s*module\.exports\s*=[\s\S]*?(?=,\s*\d+:|,\s*\})/g
];

let allModules = new Map();
let moduleCount = 0;

advancedPatterns.forEach((pattern, patternIndex) => {
    let match;
    let count = 0;
    
    while ((match = pattern.exec(content)) !== null) {
        const moduleId = match[1];
        const params = match[2] || '';
        const moduleContent = match[3] || match[0];
        
        if (moduleContent && moduleContent.trim().length > 5) {
            const key = `${moduleId}_p${patternIndex}`;
            if (!allModules.has(key)) {
                allModules.set(key, {
                    id: moduleId,
                    pattern: patternIndex,
                    params: params,
                    content: moduleContent.trim(),
                    size: moduleContent.length
                });
                count++;
            }
        }
    }
    
    console.log(`  Padrão ${patternIndex + 1}: ${count} módulos`);
    moduleCount += count;
});

// ==================== ESTRATÉGIA 3: EXTRAÇÃO DE CÓDIGO STANDALONE ====================
console.log('\n🎯 ESTRATÉGIA 3: Código standalone...');

// Extrair funções e classes que não estão em modules
const standaloneCode = {
    functions: [],
    classes: [],
    constants: [],
    events: []
};

// Funções standalone
const functionPattern = /(?:^|\n)\s*function\s+(\w+)\s*\([^)]*\)\s*\{[\s\S]*?\n\}/gm;
let match;
while ((match = functionPattern.exec(content)) !== null) {
    if (match[0].length > 50) { // Só funções substanciais
        standaloneCode.functions.push({
            name: match[1],
            content: match[0].trim(),
            size: match[0].length
        });
    }
}

// Classes standalone
const classPattern = /(?:^|\n)\s*class\s+(\w+)(?:\s+extends\s+\w+)?\s*\{[\s\S]*?\n\}/gm;
while ((match = classPattern.exec(content)) !== null) {
    if (match[0].length > 100) {
        standaloneCode.classes.push({
            name: match[1],
            content: match[0].trim(),
            size: match[0].length
        });
    }
}

// Constantes e configurações
const constPattern = /(?:^|\n)\s*(?:const|let|var)\s+(\w+)\s*=\s*\{[\s\S]*?\};/gm;
while ((match = constPattern.exec(content)) !== null) {
    if (match[0].length > 100) {
        standaloneCode.constants.push({
            name: match[1],
            content: match[0].trim(),
            size: match[0].length
        });
    }
}

console.log('Código standalone:');
Object.entries(standaloneCode).forEach(([type, items]) => {
    console.log(`  ${type}: ${items.length} itens`);
});

// ==================== ESTRATÉGIA 4: CSS ULTRA-AGRESSIVO ====================
console.log('\n🎨 ESTRATÉGIA 4: CSS ultra-agressivo...');

const cssPatterns = [
    // Padrão básico
    /_\.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/gs,
    // Variações
    /\.push\(\[\w+\.id,\s*['"`](.*?)['"`]/gs,
    /exports\.push\(\[\w+\.id,\s*['"`](.*?)['"`]/gs,
    // CSS inline em strings
    /['"`]([^'"`]*\{[^'"`]*\}[^'"`]*)['"`]/gs,
    // Style objects
    /style\s*:\s*['"`]([^'"`]*\{[^'"`]*\}[^'"`]*)['"`]/gs
];

let allCSS = new Set();
let cssCount = 0;

cssPatterns.forEach((pattern, index) => {
    let match;
    let count = 0;
    
    while ((match = pattern.exec(content)) !== null) {
        let cssContent = match[1];
        
        if (cssContent && cssContent.length > 20 && 
            (cssContent.includes('{') || cssContent.includes(':')) &&
            !cssContent.includes('function') && !cssContent.includes('return')) {
            
            cssContent = cssContent
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'")
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t');
                
            if (cssContent.length > 30 && !allCSS.has(cssContent)) {
                allCSS.add(cssContent);
                count++;
            }
        }
    }
    
    console.log(`  Padrão CSS ${index + 1}: ${count} blocos únicos`);
    cssCount += count;
});

// ==================== CRIAÇÃO DE ESTRUTURA COMPLETA ====================
console.log('\n🏗️ CRIANDO ESTRUTURA ULTRA-COMPLETA...');

// Criar diretórios
const dirs = [
    '../src-complete', '../src-complete/modules', '../src-complete/standalone',
    '../src-complete/core', '../src-complete/ui', '../src-complete/ring',
    '../src-complete/webgl', '../src-complete/utils', '../src-complete/events',
    '../styles-complete', '../styles-complete/extracted', '../styles-complete/inline'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Salvar CSS completo
let cssIndex = 0;
Array.from(allCSS).forEach((css, index) => {
    const fileName = `extracted-${index + 1}.css`;
    const filePath = `../styles-complete/extracted/${fileName}`;
    
    let cssContent = `/* Extracted CSS Block ${index + 1} */\n`;
    cssContent += `/* Size: ${css.length} chars */\n\n`;
    cssContent += css + '\n';
    
    fs.writeFileSync(filePath, cssContent);
    cssIndex++;
});

// CSS principal completo
let mainCSS = `/* COMPLETE CSS EXTRACTION */\n/* Total blocks: ${allCSS.size} */\n\n`;
for (let i = 1; i <= allCSS.size; i++) {
    mainCSS += `@import './extracted/extracted-${i}.css';\n`;
}
fs.writeFileSync('../styles-complete/main.css', mainCSS);

// Salvar modules completos
let moduleIndex = 0;
allModules.forEach((module, key) => {
    const fileName = `module-${module.id}-p${module.pattern}.js`;
    const filePath = `../src-complete/modules/${fileName}`;
    
    let jsContent = `/*\n * Module ${module.id} (Pattern ${module.pattern})\n`;
    jsContent += ` * Params: ${module.params}\n`;
    jsContent += ` * Size: ${module.size} chars\n */\n\n`;
    
    // Tentar formatar código
    let formattedContent = module.content;
    try {
        formattedContent = formattedContent
            .replace(/;([a-zA-Z])/g, ';\n$1')
            .replace(/\{([a-zA-Z])/g, '{\n$1')
            .replace(/\}([a-zA-Z])/g, '}\n$1');
    } catch (e) {
        // Manter original se formatação falhar
    }
    
    jsContent += `// === MODULE CONTENT ===\n`;
    if (module.params) {
        jsContent += `function module${module.id}(${module.params}) {\n`;
        jsContent += formattedContent;
        jsContent += `\n}\n\n`;
        jsContent += `export default module${module.id};\n`;
    } else {
        jsContent += `// Direct export\n`;
        jsContent += formattedContent;
        jsContent += `\n`;
    }
    
    fs.writeFileSync(filePath, jsContent);
    moduleIndex++;
});

// Salvar código standalone
standaloneCode.functions.forEach((func, index) => {
    const filePath = `../src-complete/standalone/function-${func.name || index}.js`;
    const content = `/* Standalone Function: ${func.name} */\n\n${func.content}\n\nexport default ${func.name};\n`;
    fs.writeFileSync(filePath, content);
});

standaloneCode.classes.forEach((cls, index) => {
    const filePath = `../src-complete/standalone/class-${cls.name || index}.js`;
    const content = `/* Standalone Class: ${cls.name} */\n\n${cls.content}\n\nexport default ${cls.name};\n`;
    fs.writeFileSync(filePath, content);
});

standaloneCode.constants.forEach((constant, index) => {
    const filePath = `../src-complete/standalone/constant-${constant.name || index}.js`;
    const content = `/* Standalone Constant: ${constant.name} */\n\n${constant.content}\n\nexport default ${constant.name};\n`;
    fs.writeFileSync(filePath, content);
});

// Índice mestre ultra-completo
let masterIndex = `/*\n * ULTRA-COMPLETE EXTRACTION INDEX\n * Generated: ${new Date().toISOString()}\n */\n\n`;

// Imports dos modules
masterIndex += '// === WEBPACK MODULES ===\n';
allModules.forEach((module, key) => {
    masterIndex += `import module${module.id}_${module.pattern} from './modules/module-${module.id}-p${module.pattern}.js';\n`;
});

// Imports standalone
masterIndex += '\n// === STANDALONE FUNCTIONS ===\n';
standaloneCode.functions.forEach((func, index) => {
    if (func.name) {
        masterIndex += `import ${func.name} from './standalone/function-${func.name}.js';\n`;
    }
});

masterIndex += '\n// === STANDALONE CLASSES ===\n';
standaloneCode.classes.forEach((cls, index) => {
    if (cls.name) {
        masterIndex += `import ${cls.name} from './standalone/class-${cls.name}.js';\n`;
    }
});

// Registry completo
masterIndex += '\n// === COMPLETE REGISTRY ===\n';
masterIndex += 'export const CompleteRegistry = {\n';
masterIndex += '  modules: {\n';
allModules.forEach((module, key) => {
    masterIndex += `    '${module.id}_${module.pattern}': module${module.id}_${module.pattern},\n`;
});
masterIndex += '  },\n';
masterIndex += '  functions: {\n';
standaloneCode.functions.forEach((func) => {
    if (func.name) {
        masterIndex += `    '${func.name}': ${func.name},\n`;
    }
});
masterIndex += '  },\n';
masterIndex += '  classes: {\n';
standaloneCode.classes.forEach((cls) => {
    if (cls.name) {
        masterIndex += `    '${cls.name}': ${cls.name},\n`;
    }
});
masterIndex += '  }\n';
masterIndex += '};\n\n';
masterIndex += 'export default CompleteRegistry;\n';

fs.writeFileSync('../src-complete/index.js', masterIndex);

// HTML ultra-completo
const ultraHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Tryon - Ultra Complete Extraction</title>
    <link rel="stylesheet" href="./styles-complete/main.css">
</head>
<body>
    <div id="canvasContainer">
        <canvas id="mcanvas"></canvas>
    </div>
    <div id="tweakpaneUiContainer"></div>
    <div id="assetManagerLoadingScreen">
        <div id="assetManagerLoadingScreenContent">
            <div class="loadingScreenLogoElement">
                <div class="loadingScreenLogoImage">
                    <img src="./icons/logo.webp" alt="Logo">
                </div>
            </div>
            <div class="loadingScreenLoadingElement">
                <div class="loader"></div>
            </div>
            <div class="loadingScreenFilesElement">
                <div class="processState">Carregando sistema completo...</div>
            </div>
        </div>
    </div>
    <div id="assetManagerLoadingBar">
        <div id="assetManagerLoadingBarContent"></div>
    </div>
    <div class="util-buttons-container">
        <button id="fsToggle" class="round-button util-button">⛶</button>
    </div>
    <div id="webgi-logo"></div>
    
    <script type="module">
        // Carregar sistema completo
        import CompleteRegistry from './src-complete/index.js';
        
        console.log('🚀 Ring Tryon - Sistema Completo Carregado');
        console.log('📊 Módulos disponíveis:', Object.keys(CompleteRegistry.modules).length);
        console.log('🔧 Funções disponíveis:', Object.keys(CompleteRegistry.functions).length);
        console.log('📦 Classes disponíveis:', Object.keys(CompleteRegistry.classes).length);
        
        window.RingTryonComplete = CompleteRegistry;
    </script>
</body>
</html>`;

fs.writeFileSync('../index-ultra-complete.html', ultraHTML);

// ==================== RELATÓRIO ULTRA-DETALHADO ====================
console.log('\n📊 RELATÓRIO ULTRA-COMPLETO');
console.log('='.repeat(80));

const ultraReport = {
    timestamp: new Date().toISOString(),
    source: {
        file: 'index-minified-backup.js',
        size: `${(content.length / 1024 / 1024).toFixed(2)}MB`
    },
    extraction: {
        css: {
            totalBlocks: allCSS.size,
            files: cssIndex
        },
        javascript: {
            webpackModules: allModules.size,
            standaloneFunctions: standaloneCode.functions.length,
            standaloneClasses: standaloneCode.classes.length,
            standaloneConstants: standaloneCode.constants.length,
            totalItems: allModules.size + standaloneCode.functions.length + standaloneCode.classes.length + standaloneCode.constants.length
        },
        functionalBlocks: Object.values(sections).reduce((sum, blocks) => sum + blocks.length, 0)
    },
    output: {
        directories: dirs.length,
        totalFiles: cssIndex + moduleIndex + standaloneCode.functions.length + standaloneCode.classes.length + standaloneCode.constants.length + 3
    }
};

fs.writeFileSync('../ULTRA-EXTRACTION-REPORT.json', JSON.stringify(ultraReport, null, 2));

console.log(`🎉 EXTRAÇÃO ULTRA-COMPLETA FINALIZADA!`);
console.log(`📊 ESTATÍSTICAS FINAIS:`);
console.log(`   💎 CSS: ${ultraReport.extraction.css.totalBlocks} blocos extraídos`);
console.log(`   ⚙️ Webpack Modules: ${ultraReport.extraction.javascript.webpackModules}`);
console.log(`   🔧 Funções Standalone: ${ultraReport.extraction.javascript.standaloneFunctions}`);
console.log(`   📦 Classes Standalone: ${ultraReport.extraction.javascript.standaloneClasses}`);
console.log(`   📝 Constantes: ${ultraReport.extraction.javascript.standaloneConstants}`);
console.log(`   📁 Total de arquivos: ${ultraReport.output.totalFiles}`);

console.log('\n🚀 VERSÕES DISPONÍVEIS:');
console.log('   1. index-deobfuscated.html (versão básica)');
console.log('   2. index-ultra-complete.html (versão completa)');
console.log('\n🔧 COMANDOS PARA TESTAR:');
console.log('   npx vite serve index-ultra-complete.html --port 3004');

console.log('\n✅ Agora você tem TUDO extraído do arquivo original!');
