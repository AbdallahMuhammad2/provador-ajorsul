#!/usr/bin/env node
/**
 * Extract ALL JavaScript modules from webpack bundle
 */

import fs from 'fs';

console.log('⚙️ EXTRAINDO TODOS OS MÓDULOS JAVASCRIPT REAIS\n');

const content = fs.readFileSync('../index-minified-backup.js', 'utf8');

// Find ALL module patterns in the webpack bundle
const patterns = [
    // Pattern 1: function(d, o, c) { ... }
    /(\d+):\s*function\s*\(([^)]*)\)\s*\{([\s\S]*?)\n\s*\}/g,
    // Pattern 2: arrow functions
    /(\d+):\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\n\s*\}/g,
    // Pattern 3: object method notation
    /(\d+)\(([^)]*)\)\s*\{([\s\S]*?)\n\s*\}/g,
    // Pattern 4: quoted module IDs
    /"(\d+)":\s*function\s*\(([^)]*)\)\s*\{([\s\S]*?)\n\s*\}/g
];

const modules = new Map();
let totalMatches = 0;

patterns.forEach((pattern, index) => {
    console.log(`Procurando padrão ${index + 1}...`);
    let matches = 0;
    let match;

    while ((match = pattern.exec(content)) !== null) {
        const moduleId = match[1];
        const params = match[2] || '';
        const body = match[3];

        if (body && body.trim().length > 10) {
            if (!modules.has(moduleId)) {
                modules.set(moduleId, {
                    id: moduleId,
                    params: params,
                    content: body,
                    size: body.length,
                    pattern: index + 1
                });
                matches++;
                totalMatches++;
            }
        }
    }
    console.log(`  - Padrão ${index + 1}: ${matches} módulos`);
    pattern.lastIndex = 0; // Reset regex
});

console.log(`\n✅ Total: ${modules.size} módulos únicos extraídos`);

// Analyze each module
modules.forEach(module => {
    const content = module.content.toLowerCase();
    const originalContent = module.content;

    // Detect module type by content analysis
    if (/three|webgl|scene|camera|renderer|mesh|geometry|material|shader/.test(content)) {
        module.type = 'webgl';
    } else if (/mediapipe|hand|landmark|gesture|finger|pose/.test(content)) {
        module.type = 'mediapipe';
    } else if (/ring|jewelry|diamond|gold|silver|platinum|gem/.test(content)) {
        module.type = 'ring';
    } else if (/button|modal|ui|interface|element|dom|click|event/.test(content)) {
        module.type = 'ui';
    } else if (/camera|video|stream|media|getusermedia|webcam/.test(content)) {
        module.type = 'camera';
    } else if (/util|helper|math|vector|matrix|loader|asset/.test(content)) {
        module.type = 'utils';
    } else if (/css|style|stylesheet|push.*id.*""/.test(content)) {
        module.type = 'css';
    } else if (/polyfill|shim|compat|fallback|support/.test(content)) {
        module.type = 'polyfill';
    } else if (/webpack|module|require|export/.test(content)) {
        module.type = 'webpack-runtime';
    } else {
        module.type = 'misc';
    }

    // Detect features
    module.features = [];
    if (/require\(/.test(originalContent)) module.features.push('commonjs');
    if (/import|export/.test(originalContent)) module.features.push('es6');
    if (/\.push\(/.test(originalContent)) module.features.push('array-push');
    if (/createElement/.test(originalContent)) module.features.push('dom');
    if (/addEventListener/.test(originalContent)) module.features.push('events');
    if (/async|await|Promise/.test(originalContent)) module.features.push('async');
});

// Group by type
const byType = {};
modules.forEach(module => {
    const type = module.type;
    if (!byType[type]) byType[type] = [];
    byType[type].push(module);
});

console.log('\n📊 Distribuição por tipo:');
Object.entries(byType).forEach(([type, mods]) => {
    console.log(`  ${type}: ${mods.length} módulos`);
});

// Create directory structure
const typeDirs = {
    'webgl': 'src/core',
    'mediapipe': 'src/detection',
    'ring': 'src/ring',
    'ui': 'src/ui',
    'camera': 'src/camera',
    'utils': 'src/utils',
    'css': 'src/styles',
    'polyfill': 'src/polyfills',
    'webpack-runtime': 'src/webpack',
    'misc': 'src/misc'
};

// Create directories
Object.values(typeDirs).forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

// Save modules to files
let totalFiles = 0;
const savedFiles = [];

Object.entries(byType).forEach(([type, moduleList]) => {
    const dir = typeDirs[type] || 'src/misc';

    // Save each module individually
    moduleList.forEach(module => {
        const fileName = `webpack-module-${module.id}.js`;
        const filePath = `${dir}/${fileName}`;

        const fileContent = `/**
 * Webpack Module ${module.id}
 * Type: ${type}
 * Pattern: ${module.pattern}
 * Size: ${module.size} bytes
 * Features: ${module.features.join(', ') || 'none'}
 *
 * Original parameters: ${module.params}
 */

// Original webpack module function
function webpackModule${module.id}(${module.params}) {
${module.content}
}

// Export the module function
export default webpackModule${module.id};

// Module metadata
export const metadata = {
    id: '${module.id}',
    type: '${type}',
    size: ${module.size},
    features: ${JSON.stringify(module.features)},
    params: '${module.params.replace(/'/g, "\\'")}'
};

// Helper to execute the module with dependencies
export function executeModule(moduleRegistry, globalScope = {}) {
    const moduleObj = { exports: {} };
    const require = (id) => {
        if (moduleRegistry.has(id)) {
            return moduleRegistry.get(id);
        }
        console.warn('Module ' + id + ' not found in registry');
        return {};
    };

    try {
        webpackModule${module.id}.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module ${module.id}:', error);
        return {};
    }
}
`;

        fs.writeFileSync(filePath, fileContent);
        savedFiles.push(filePath);
        totalFiles++;
    });

    // Create index for each type
    const indexPath = `${dir}/index.js`;
    const indexContent = `/**
 * ${type.toUpperCase()} Modules Index
 * ${moduleList.length} webpack modules
 */

${moduleList.map(module =>
    `import webpackModule${module.id}, { metadata as meta${module.id}, executeModule as exec${module.id} } from './webpack-module-${module.id}.js';`
).join('\n')}

// All modules of this type
export const modules = {
${moduleList.map(module => `    '${module.id}': webpackModule${module.id}`).join(',\n')}
};

// All metadata
export const metadata = {
${moduleList.map(module => `    '${module.id}': meta${module.id}`).join(',\n')}
};

// All executors
export const executors = {
${moduleList.map(module => `    '${module.id}': exec${module.id}`).join(',\n')}
};

// Module count
export const MODULE_COUNT = ${moduleList.length};

// Create a module registry for this type
export function createModuleRegistry() {
    const registry = new Map();

    // Initialize all modules
    Object.entries(executors).forEach(([id, executor]) => {
        try {
            const result = executor(registry);
            registry.set(id, result);
        } catch (error) {
            console.warn('Failed to initialize module ' + id + ':', error.message);
        }
    });

    return registry;
}

export default {
    modules,
    metadata,
    executors,
    MODULE_COUNT,
    createModuleRegistry
};
`;

    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ ${dir}/ (${moduleList.length} módulos)`);
});

// Create master index
const masterIndex = `/**
 * Master Module Index - All Webpack Modules
 * Auto-extracted from minified bundle
 * Total modules: ${modules.size}
 */

${Object.keys(byType).map(type => {
    const dir = typeDirs[type] || 'src/misc';
    const importName = type.replace(/[^a-zA-Z0-9]/g, '');
    return `import ${importName}Modules from './${dir.replace('src/', '')}/index.js';`;
}).join('\n')}

// All module categories
export const moduleCategories = {
${Object.keys(byType).map(type => {
    const importName = type.replace(/[^a-zA-Z0-9]/g, '');
    return `    ${type}: ${importName}Modules`;
}).join(',\n')}
};

// Global module registry
export class GlobalModuleRegistry {
    constructor() {
        this.registries = new Map();
        this.globalRegistry = new Map();
        this.initializeAll();
    }

    initializeAll() {
        Object.entries(moduleCategories).forEach(([type, categoryModule]) => {
            const registry = categoryModule.createModuleRegistry();
            this.registries.set(type, registry);

            // Add to global registry
            registry.forEach((exports, id) => {
                this.globalRegistry.set(id, exports);
            });
        });

        console.log(\`📦 Global registry initialized with \${this.globalRegistry.size} modules\`);
    }

    getModule(id) {
        return this.globalRegistry.get(id);
    }

    getModulesByType(type) {
        return this.registries.get(type);
    }

    executeModule(id) {
        const module = this.getModule(id);
        if (module) {
            return module;
        }

        console.warn(\`Module \${id} not found in global registry\`);
        return null;
    }

    listModules() {
        console.log('📋 Available modules:');
        this.globalRegistry.forEach((exports, id) => {
            console.log(\`  - Module \${id}\`);
        });
    }

    getStats() {
        return {
            totalModules: this.globalRegistry.size,
            categories: Object.keys(moduleCategories).length,
            categoryCounts: Object.entries(moduleCategories).map(([type, cat]) => ({
                type,
                count: cat.MODULE_COUNT
            }))
        };
    }
}

// Create global instance
export const globalRegistry = new GlobalModuleRegistry();

// Shorthand functions
export const getModule = (id) => globalRegistry.getModule(id);
export const executeModule = (id) => globalRegistry.executeModule(id);
export const listModules = () => globalRegistry.listModules();
export const getStats = () => globalRegistry.getStats();

export default {
    moduleCategories,
    GlobalModuleRegistry,
    globalRegistry,
    getModule,
    executeModule,
    listModules,
    getStats
};
`;

fs.writeFileSync('src/index.js', masterIndex);
console.log('✅ src/index.js (master index)');

// Final report
const report = {
    timestamp: new Date().toISOString(),
    totalModules: modules.size,
    totalFiles: totalFiles,
    distribution: Object.entries(byType).map(([type, mods]) => ({
        type,
        count: mods.length,
        directory: typeDirs[type] || 'src/misc'
    })),
    files: savedFiles
};

fs.writeFileSync('JAVASCRIPT-EXTRACTION-REPORT.json', JSON.stringify(report, null, 2));

console.log('\n🎉 EXTRAÇÃO JAVASCRIPT CONCLUÍDA!');
console.log(`📊 ${modules.size} módulos extraídos em ${totalFiles} arquivos`);
console.log('✅ Todos os módulos foram salvos com sistema de execução');