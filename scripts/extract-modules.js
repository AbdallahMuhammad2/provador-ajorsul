/**
 * JavaScript Modules Extractor for Ring Tryon Deobfuscation
 * Extracts webpack modules from minified bundle
 */

import fs from 'fs';
import path from 'path';

function extractWebpackModules(content) {
    console.log('🔍 Procurando módulos webpack...');

    // Padrões para detectar módulos webpack
    const patterns = [
        // Padrão principal: function(module, exports, require) ou (e,t,n) =>
        /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)\}(?=,\s*\d+:|$)/g,
        // Padrão ES6: (\d+): (e,t,n) => { ... }
        /(\d+):\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\}(?=,\s*\d+:|$)/g,
        // Padrão alternativo: "\d+": function...
        /"(\d+)":\s*function\(([^)]*)\)\s*\{([\s\S]*?)\}(?=,\s*"\d+"|$)/g
    ];

    const modules = new Map();
    let totalFound = 0;

    patterns.forEach((pattern, patternIndex) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const moduleId = match[1];
            const params = match[2];
            const moduleContent = match[3];

            if (moduleContent && moduleContent.trim().length > 10) {
                modules.set(moduleId, {
                    id: moduleId,
                    params: params,
                    content: moduleContent,
                    pattern: patternIndex,
                    position: match.index,
                    size: moduleContent.length
                });
                totalFound++;
            }
        }
        pattern.lastIndex = 0;
    });

    console.log(`📊 Encontrados ${totalFound} módulos webpack`);
    return modules;
}

function analyzeModuleContent(content) {
    const analysis = {
        type: 'unknown',
        features: [],
        dependencies: [],
        exports: [],
        size: content.length
    };

    // Detectar tipo do módulo
    const typePatterns = {
        webgl: /three|webgl|scene|camera|renderer|mesh|geometry|material|shader/i,
        mediapipe: /mediapipe|hand|detection|landmark|gesture|pose/i,
        ring: /ring|jewelry|material|gold|silver|platinum|gem|diamond/i,
        ui: /button|modal|ui|interface|element|dom|html|click|event/i,
        camera: /camera|video|stream|media|webcam|getUserMedia/i,
        utils: /util|helper|math|vector|matrix|color|animation|tween/i,
        css: /style|css|color|background|border|padding|margin/i,
        loader: /load|fetch|xhr|async|promise|import|require/i,
        polyfill: /polyfill|shim|fallback|compat|support/i
    };

    for (const [type, pattern] of Object.entries(typePatterns)) {
        if (pattern.test(content)) {
            analysis.type = type;
            break;
        }
    }

    // Detectar features específicas
    const featurePatterns = {
        'threejs-core': /THREE\./g,
        'webgl-rendering': /gl\.|WebGL|getContext/g,
        'hand-tracking': /hand|finger|palm|landmark/gi,
        'material-system': /material|shader|texture/gi,
        'dom-manipulation': /createElement|appendChild|innerHTML/g,
        'event-handling': /addEventListener|onclick|onload/g,
        'async-operations': /async|await|Promise|then/g,
        'module-exports': /module\.exports|exports\./g,
        'es6-imports': /import|export/g,
        'css-injection': /style\.|className|css/g
    };

    for (const [feature, pattern] of Object.entries(featurePatterns)) {
        const matches = content.match(pattern);
        if (matches) {
            analysis.features.push({
                name: feature,
                count: matches.length
            });
        }
    }

    // Extrair dependências (requires/imports)
    const depPatterns = [
        /require\(['"`]([^'"`]+)['"`]\)/g,
        /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g,
        /import\(['"`]([^'"`]+)['"`]\)/g
    ];

    depPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            analysis.dependencies.push(match[1]);
        }
        pattern.lastIndex = 0;
    });

    // Extrair exports
    const exportPatterns = [
        /module\.exports\s*=\s*([^;]+)/g,
        /exports\.(\w+)/g,
        /export\s+(?:default\s+)?([^;]+)/g
    ];

    exportPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            analysis.exports.push(match[1]);
        }
        pattern.lastIndex = 0;
    });

    return analysis;
}

function organizeModulesByType(modules) {
    const organized = {
        core: [],
        detection: [],
        ring: [],
        ui: [],
        camera: [],
        utils: [],
        css: [],
        loader: [],
        polyfill: [],
        unknown: []
    };

    for (const [id, module] of modules) {
        const analysis = analyzeModuleContent(module.content);
        const category = organized[analysis.type] || organized.unknown;

        category.push({
            ...module,
            analysis
        });
    }

    return organized;
}

function generateModuleCode(module, analysis) {
    let code = module.content;

    // Limpar e formatar código
    code = code
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");

    // Adicionar cabeçalho
    const header = `/**
 * Module ${module.id} - ${analysis.type}
 * Generated from webpack bundle
 * Features: ${analysis.features.map(f => f.name).join(', ')}
 */

`;

    // Determinar se é CommonJS ou ES6
    const hasCommonJS = /module\.exports|exports\./.test(code);
    const hasES6 = /import|export/.test(code);

    if (hasCommonJS && !hasES6) {
        // Converter CommonJS para ES6 se possível
        code = convertCommonJSToES6(code);
    }

    return header + code;
}

function convertCommonJSToES6(code) {
    // Conversões básicas CommonJS -> ES6
    return code
        .replace(/module\.exports\s*=\s*([^;]+);?/g, 'export default $1;')
        .replace(/exports\.(\w+)\s*=\s*([^;]+);?/g, 'export const $1 = $2;')
        .replace(/const\s+(\w+)\s*=\s*require\(['"`]([^'"`]+)['"`]\);?/g, 'import $1 from \'$2\';')
        .replace(/require\(['"`]([^'"`]+)['"`]\)/g, 'import(\'$1\')');
}

async function extractAndOrganizeModules() {
    try {
        console.log('🚀 Iniciando extração de módulos JavaScript...');

        // Ler arquivo minificado
        const minifiedPath = './index-minified-backup.js';
        if (!fs.existsSync(minifiedPath)) {
            throw new Error(`Arquivo não encontrado: ${minifiedPath}`);
        }

        const content = fs.readFileSync(minifiedPath, 'utf8');
        console.log(`📁 Arquivo lido: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

        // Extrair módulos
        const modules = extractWebpackModules(content);

        if (modules.size === 0) {
            console.log('⚠️  Nenhum módulo encontrado');
            return;
        }

        // Organizar por tipo
        const organized = organizeModulesByType(modules);

        // Criar arquivos organizados
        console.log('📝 Criando arquivos JavaScript organizados...');

        const fileMapping = {
            core: 'src/core',
            detection: 'src/detection',
            ring: 'src/ring',
            ui: 'src/ui',
            camera: 'src/camera',
            utils: 'src/utils',
            css: 'src/styles',
            loader: 'src/loaders',
            polyfill: 'src/polyfills'
        };

        const createdFiles = [];

        for (const [category, moduleList] of Object.entries(organized)) {
            if (moduleList.length === 0) continue;

            const targetDir = fileMapping[category] || 'src/misc';

            // Criar diretório se não existir
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // Processar módulos desta categoria
            moduleList.forEach((module, index) => {
                const analysis = module.analysis;
                const fileName = `module-${module.id}-${category}.js`;
                const filePath = path.join(targetDir, fileName);

                const code = generateModuleCode(module, analysis);

                fs.writeFileSync(filePath, code);
                createdFiles.push({
                    path: filePath,
                    category,
                    moduleId: module.id,
                    size: code.length,
                    features: analysis.features.length
                });

                console.log(`✅ Criado: ${filePath} (${(code.length / 1024).toFixed(1)}KB)`);
            });
        }

        // Gerar índices para cada categoria
        for (const [category, moduleList] of Object.entries(organized)) {
            if (moduleList.length === 0) continue;

            const targetDir = fileMapping[category] || 'src/misc';
            const indexPath = path.join(targetDir, 'index.js');

            const imports = moduleList.map((module, index) => {
                const fileName = `module-${module.id}-${category}.js`;
                return `export { default as Module${module.id} } from './${fileName}';`;
            }).join('\n');

            const indexContent = `/**
 * ${category.toUpperCase()} Modules Index
 * Auto-generated from webpack bundle
 */

${imports}

// Re-export all modules for easy access
export * from './module-*';
`;

            fs.writeFileSync(indexPath, indexContent);
            console.log(`📋 Criado índice: ${indexPath}`);
        }

        // Gerar main index
        const mainIndexContent = `/**
 * Ring Tryon - Main Module Index
 * Auto-generated from webpack bundle deobfuscation
 */

// Core modules
export * from './core/index.js';

// Detection modules
export * from './detection/index.js';

// Ring system modules
export * from './ring/index.js';

// UI modules
export * from './ui/index.js';

// Camera modules
export * from './camera/index.js';

// Utility modules
export * from './utils/index.js';

// Polyfills
export * from './polyfills/index.js';
`;

        fs.writeFileSync('src/index.js', mainIndexContent);
        console.log('✅ Criado: src/index.js');

        // Gerar relatório
        const report = {
            totalModules: modules.size,
            byCategory: Object.entries(organized).map(([cat, mods]) => ({
                category: cat,
                count: mods.length,
                totalSize: mods.reduce((sum, m) => sum + m.size, 0)
            })).filter(item => item.count > 0),
            files: createdFiles,
            extractionDate: new Date().toISOString()
        };

        fs.writeFileSync('src/extraction-report.json', JSON.stringify(report, null, 2));
        console.log('📊 Relatório criado: src/extraction-report.json');

        console.log('\n🎉 Extração de módulos concluída!');
        console.log(`📈 Estatísticas:`);
        console.log(`   - ${modules.size} módulos extraídos`);
        console.log(`   - ${createdFiles.length} arquivos criados`);
        console.log(`   - ${Object.keys(organized).filter(k => organized[k].length > 0).length} categorias identificadas`);

    } catch (error) {
        console.error('❌ Erro na extração de módulos:', error);
        throw error;
    }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    extractAndOrganizeModules();
}

export { extractAndOrganizeModules, extractWebpackModules, analyzeModuleContent };