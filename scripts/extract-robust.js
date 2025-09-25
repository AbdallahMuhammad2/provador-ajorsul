/**
 * EXTRAÇÃO COMPLETA E ROBUSTA - Ring Tryon Deobfuscation
 * Este script extrai TUDO do arquivo minificado de forma mais precisa
 */

import fs from 'fs';
import path from 'path';

console.log('🔥 EXTRAÇÃO COMPLETA E ROBUSTA INICIADA');
console.log('=' .repeat(60));

// Verificar arquivo
const minifiedPath = '../index-minified-backup.js';
if (!fs.existsSync(minifiedPath)) {
    console.error('❌ Arquivo não encontrado:', minifiedPath);
    process.exit(1);
}

const content = fs.readFileSync(minifiedPath, 'utf8');
console.log(`📁 Arquivo carregado: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

// ==================== EXTRAÇÃO CSS ROBUSTA ====================
console.log('\n🎨 FASE 1: EXTRAÇÃO CSS ROBUSTA');
console.log('-'.repeat(40));

// Múltiplos padrões para capturar CSS
const cssPatterns = [
    // Padrão principal observado
    /_\.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/gs,
    // Padrões alternativos
    /\.push\(\[\w+\.id,\s*['"`](.*?)['"`]/gs,
    /exports\.push\(\[\w+\.id,\s*['"`](.*?)['"`]/gs
];

let allCSSBlocks = [];
let totalCSSFound = 0;

cssPatterns.forEach((pattern, index) => {
    const blocks = [];
    let match;
    
    console.log(`Procurando padrão CSS ${index + 1}...`);
    
    while ((match = pattern.exec(content)) !== null) {
        let cssContent = match[1];
        
        // Limpar escapes
        cssContent = cssContent
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');
        
        // Validar se é realmente CSS
        if (cssContent && cssContent.length > 10 && 
            (cssContent.includes('{') || cssContent.includes(':') || cssContent.includes('.'))) {
            blocks.push({
                content: cssContent,
                size: cssContent.length,
                pattern: index
            });
        }
    }
    
    console.log(`  - Padrão ${index + 1}: ${blocks.length} blocos CSS`);
    allCSSBlocks.push(...blocks);
    totalCSSFound += blocks.length;
});

console.log(`✅ Total CSS encontrado: ${totalCSSFound} blocos`);

// Classificar CSS por tipo
function classifyCSS(css) {
    const classifiers = {
        'tippy': /tippy|tooltip/i,
        'loading': /loading|loader|spinner|progress/i,
        'buttons': /button|btn/i,
        'modal': /modal|popup|overlay/i,
        'tweakpane': /tp-|tweakpane/i,
        'themes': /:root|theme|--tp-/i,
        'responsive': /@media|screen|mobile/i,
        'scrollbar': /scrollbar|::-webkit-scrollbar/i,
        'animations': /@keyframes|animation|transition/i,
        'layout': /flex|grid|position|display/i
    };
    
    for (const [category, regex] of Object.entries(classifiers)) {
        if (regex.test(css)) return category;
    }
    return 'general';
}

// Organizar CSS por categorias
const cssCategories = new Map();
allCSSBlocks.forEach((block, index) => {
    const category = classifyCSS(block.content);
    if (!cssCategories.has(category)) {
        cssCategories.set(category, []);
    }
    cssCategories.get(category).push({...block, index});
});

// Criar estrutura de diretórios
const dirs = ['../styles', '../styles/components', '../styles/themes', '../styles/ui'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Salvar CSS organizado
let mainCSS = `/* Ring Tryon - Complete CSS Extraction */\n/* Generated: ${new Date().toISOString()} */\n/* Total blocks: ${totalCSSFound} */\n\n`;

cssCategories.forEach((blocks, category) => {
    const fileName = `${category}.css`;
    const filePath = `../styles/components/${fileName}`;
    
    let cssContent = `/* ${category.toUpperCase()} CSS */\n`;
    cssContent += `/* Blocks: ${blocks.length} */\n\n`;
    
    blocks.forEach((block, i) => {
        cssContent += `/* === Block ${block.index + 1} === */\n`;
        cssContent += block.content + '\n\n';
    });
    
    fs.writeFileSync(filePath, cssContent);
    console.log(`  ✅ ${filePath} (${blocks.length} blocos)`);
    
    mainCSS += `@import './components/${fileName}';\n`;
});

fs.writeFileSync('../styles/main.css', mainCSS);
console.log(`  ✅ ../styles/main.css (arquivo principal)`);

// ==================== EXTRAÇÃO JAVASCRIPT ROBUSTA ====================
console.log('\n⚙️ FASE 2: EXTRAÇÃO JAVASCRIPT ROBUSTA');
console.log('-'.repeat(40));

// Padrões para módulos JavaScript
const jsPatterns = [
    // Webpack modules padrão
    /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)\}(?=,\s*\d+:|,\s*\})/g,
    // Modules alternativos
    /(\d+):\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\}(?=,\s*\d+:|,\s*\})/g,
    // AMD/CommonJS modules
    /(\d+):\s*\(function\(([^)]*)\)\s*\{([\s\S]*?)\}\)(?=,\s*\d+:|,\s*\})/g
];

let allJSModules = new Map();
let totalJSFound = 0;

jsPatterns.forEach((pattern, index) => {
    console.log(`Procurando padrão JS ${index + 1}...`);
    let match;
    let count = 0;
    
    while ((match = pattern.exec(content)) !== null) {
        const moduleId = match[1];
        const params = match[2] || '';
        const moduleContent = match[3];
        
        if (moduleContent && moduleContent.trim().length > 10) {
            allJSModules.set(`${moduleId}_${index}`, {
                id: moduleId,
                params: params,
                content: moduleContent.trim(),
                pattern: index,
                size: moduleContent.length
            });
            count++;
        }
    }
    
    console.log(`  - Padrão ${index + 1}: ${count} módulos`);
    totalJSFound += count;
});

console.log(`✅ Total JS encontrado: ${totalJSFound} módulos únicos`);

// Classificar módulos JavaScript
function classifyJS(content) {
    const classifiers = {
        'webgl': /three|webgl|scene|camera|renderer|mesh|material|geometry/i,
        'mediapipe': /mediapipe|hand|detection|landmark|finger/i,
        'ring': /ring|jewelry|gem|diamond|metal|material/i,
        'ui': /button|modal|ui|interface|menu|panel/i,
        'camera': /camera|video|stream|webcam|media/i,
        'utils': /util|helper|math|vector|matrix/i,
        'animation': /animation|tween|interpolat|ease/i,
        'events': /event|listener|dispatch|trigger/i,
        'css': /style|css|stylesheet/i,
        'webpack': /webpack|__webpack|require|exports|module/i
    };
    
    for (const [category, regex] of Object.entries(classifiers)) {
        if (regex.test(content)) return category;
    }
    return 'misc';
}

// Organizar módulos por categoria
const jsCategories = new Map();
allJSModules.forEach((module, key) => {
    const category = classifyJS(module.content);
    if (!jsCategories.has(category)) {
        jsCategories.set(category, []);
    }
    jsCategories.get(category).push(module);
});

console.log('\n📊 Distribuição por categoria:');
jsCategories.forEach((modules, category) => {
    console.log(`  ${category}: ${modules.length} módulos`);
});

// Criar estrutura de diretórios JS
const jsDirs = ['../src', '../src/core', '../src/ring', '../src/ui', '../src/utils', '../src/camera', '../src/misc', '../src/webpack'];
jsDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Salvar módulos organizados
let totalFilesCreated = 0;
const moduleIndex = {};

jsCategories.forEach((modules, category) => {
    const dirMap = {
        'webgl': '../src/core',
        'mediapipe': '../src/detection',
        'ring': '../src/ring',
        'ui': '../src/ui',
        'camera': '../src/camera',
        'utils': '../src/utils',
        'webpack': '../src/webpack',
        'misc': '../src/misc'
    };
    
    const targetDir = dirMap[category] || '../src/misc';
    
    // Criar diretório se necessário
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    modules.forEach((module, index) => {
        const fileName = `module-${module.id}-${category}.js`;
        const filePath = path.join(targetDir, fileName);
        
        let jsContent = `/*\n * Module ${module.id} - ${category.toUpperCase()}\n`;
        jsContent += ` * Original params: ${module.params}\n`;
        jsContent += ` * Size: ${module.size} chars\n`;
        jsContent += ` * Pattern: ${module.pattern}\n */\n\n`;
        
        // Tentar melhorar formatação
        let formattedContent = module.content;
        try {
            // Adicionar quebras de linha básicas
            formattedContent = formattedContent
                .replace(/;/g, ';\n')
                .replace(/\{/g, ' {\n')
                .replace(/\}/g, '\n}\n')
                .replace(/,([a-zA-Z])/g, ',\n$1');
        } catch (e) {
            console.warn(`⚠️ Não foi possível formatar módulo ${module.id}`);
        }
        
        jsContent += `// === MODULE CONTENT ===\n`;
        jsContent += `function module${module.id}(${module.params}) {\n`;
        jsContent += formattedContent;
        jsContent += `\n}\n\n`;
        jsContent += `// Export for use\n`;
        jsContent += `export default module${module.id};\n`;
        
        fs.writeFileSync(filePath, jsContent);
        totalFilesCreated++;
        
        // Adicionar ao índice
        if (!moduleIndex[category]) moduleIndex[category] = [];
        moduleIndex[category].push({
            id: module.id,
            file: fileName,
            path: filePath.replace('../', './'),
            size: module.size
        });
    });
    
    console.log(`✅ ${targetDir}/ (${modules.length} módulos)`);
});

// Criar arquivo índice principal
let indexContent = `/*\n * Ring Tryon - Main Module Index\n * Auto-generated: ${new Date().toISOString()}\n */\n\n`;

Object.entries(moduleIndex).forEach(([category, modules]) => {
    indexContent += `// === ${category.toUpperCase()} MODULES ===\n`;
    modules.forEach(module => {
        indexContent += `import module${module.id} from '${module.path}';\n`;
    });
    indexContent += '\n';
});

indexContent += '// Module registry\n';
indexContent += 'export const modules = {\n';
Object.entries(moduleIndex).forEach(([category, modules]) => {
    indexContent += `  ${category}: {\n`;
    modules.forEach(module => {
        indexContent += `    ${module.id}: module${module.id},\n`;
    });
    indexContent += '  },\n';
});
indexContent += '};\n\n';
indexContent += 'export default modules;\n';

fs.writeFileSync('../src/index.js', indexContent);
console.log(`✅ ../src/index.js (índice principal)`);

// ==================== HTML ESTRUTURAL ====================
console.log('\n🏗️ FASE 3: CRIANDO HTML ESTRUTURAL');
console.log('-'.repeat(40));

const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Tryon - Deobfuscated Version</title>
    
    <!-- CSS Extraído -->
    <link rel="stylesheet" href="./styles/main.css">
    
    <!-- Meta tags para performance -->
    <meta name="description" content="Ring Virtual Try-On System">
    <meta name="theme-color" content="#28223C">
</head>
<body>
    <!-- Canvas Container -->
    <div id="canvasContainer">
        <canvas id="mcanvas"></canvas>
    </div>
    
    <!-- UI Container -->
    <div id="tweakpaneUiContainer"></div>
    
    <!-- Loading Screen -->
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
                <div class="processState">Carregando...</div>
            </div>
        </div>
    </div>
    
    <!-- Loading Bar -->
    <div id="assetManagerLoadingBar">
        <div id="assetManagerLoadingBarContent"></div>
    </div>
    
    <!-- Utility Buttons -->
    <div class="util-buttons-container">
        <button id="fsToggle" class="round-button util-button">⛶</button>
    </div>
    
    <!-- WebGI Logo -->
    <div id="webgi-logo"></div>
    
    <!-- Main JavaScript Module -->
    <script type="module" src="./src/index.js"></script>
    
    <!-- Fallback para navegadores sem ES modules -->
    <script nomodule>
        alert('Este navegador não suporta ES modules. Use um navegador mais recente.');
    </script>
</body>
</html>`;

fs.writeFileSync('../index-deobfuscated.html', htmlTemplate);
console.log(`✅ ../index-deobfuscated.html`);

// ==================== RELATÓRIO FINAL ====================
console.log('\n📊 RELATÓRIO FINAL COMPLETO');
console.log('='.repeat(60));

const report = {
    timestamp: new Date().toISOString(),
    source: 'index-minified-backup.js',
    sourceSize: `${(content.length / 1024 / 1024).toFixed(2)}MB`,
    extraction: {
        css: {
            blocks: totalCSSFound,
            categories: cssCategories.size,
            files: Array.from(cssCategories.keys()).length
        },
        javascript: {
            modules: totalJSFound,
            categories: jsCategories.size,
            files: totalFilesCreated
        }
    },
    output: {
        structure: {
            'styles/': Array.from(cssCategories.keys()).length + 1,
            'src/': totalFilesCreated + 1,
            'html': 1
        },
        totalFiles: totalFilesCreated + Array.from(cssCategories.keys()).length + 2
    },
    categories: {
        css: Array.from(cssCategories.keys()),
        js: Array.from(jsCategories.keys())
    }
};

fs.writeFileSync('../COMPLETE-EXTRACTION-REPORT.json', JSON.stringify(report, null, 2));

console.log(`📈 RESULTADOS COMPLETOS:`);
console.log(`   💎 CSS: ${report.extraction.css.blocks} blocos em ${report.extraction.css.files} arquivos`);
console.log(`   ⚙️ JavaScript: ${report.extraction.javascript.modules} módulos em ${report.extraction.javascript.files} arquivos`);
console.log(`   📁 Total: ${report.output.totalFiles} arquivos criados`);
console.log(`   📊 Relatório: COMPLETE-EXTRACTION-REPORT.json`);

console.log('\n🎉 EXTRAÇÃO COMPLETA FINALIZADA! 🎉');
console.log('\n🚀 PRÓXIMOS PASSOS:');
console.log('   1. npx vite serve index-deobfuscated.html --port 3003');
console.log('   2. Comparar com original em paralelo');
console.log('   3. Debugar e refinar módulos se necessário');
console.log('   4. Otimizar performance');
