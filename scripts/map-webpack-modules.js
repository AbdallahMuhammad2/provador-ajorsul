import fs from 'fs';

console.log('🗺️  WEBPACK MODULE MAPPING - COMPREHENSIVE ANALYSIS...\n');

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');

console.log('🔍 Analyzing webpack module structure...');

// Find the webpack modules object
const webpackModulesMatch = content.match(/var __webpackgi_modules__ = \{([\s\S]*?)\};/);

if (!webpackModulesMatch) {
    console.log('❌ Could not find webpack modules object');
    process.exit(1);
}

const modulesContent = webpackModulesMatch[1];
console.log('✅ Found webpack modules object');

// Extract individual modules using pattern: moduleId: function(params) { ... }
const modulePattern = /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)(?=\n\s*\d+:\s*function|\n\s*\};?\s*$)/g;

const modules = new Map();
let match;
let moduleCount = 0;

while ((match = modulePattern.exec(modulesContent)) !== null) {
    const moduleId = match[1];
    const params = match[2];
    const body = match[3];

    // Analyze module type and dependencies
    const moduleInfo = analyzeModule(moduleId, params, body);
    modules.set(moduleId, moduleInfo);
    moduleCount++;

    if (moduleCount % 10 === 0) {
        console.log(`  📊 Processed ${moduleCount} modules...`);
    }
}

console.log(`\n📈 Found ${modules.size} webpack modules`);

// Categorize modules by functionality
const categories = categorizeModules(modules);

console.log('\n📊 MODULE CATEGORIES:');
for (const [category, moduleIds] of Object.entries(categories)) {
    console.log(`  ${category}: ${moduleIds.length} modules`);
}

// Generate dependency graph
console.log('\n🔗 Analyzing dependencies...');
const dependencyGraph = buildDependencyGraph(modules);

// Create comprehensive report
const report = {
    timestamp: new Date().toISOString(),
    source: 'index.js',
    totalModules: modules.size,
    categories: categories,
    modules: Object.fromEntries(modules),
    dependencyGraph: dependencyGraph,
    keyModules: identifyKeyModules(modules),
    entryPoints: findEntryPoints(modules)
};

// Write detailed report
fs.writeFileSync('./WEBPACK-MODULES-REPORT.json', JSON.stringify(report, null, 2));
console.log('📄 Report saved: WEBPACK-MODULES-REPORT.json');

// Write module extraction script
generateExtractionScript(modules, categories);

console.log('\n✅ WEBPACK MODULE MAPPING COMPLETED!');

// Analysis functions
function analyzeModule(id, params, body) {
    const info = {
        id: id,
        params: params.split(',').map(p => p.trim()),
        size: body.length,
        type: 'unknown',
        dependencies: [],
        exports: [],
        technology: 'unknown'
    };

    // Detect module type
    if (body.includes('_.push([d.id,')) {
        info.type = 'css';
        info.technology = 'css';
    } else if (body.includes('createElement') || body.includes('appendChild')) {
        info.type = 'dom';
        info.technology = 'dom';
    } else if (body.includes('three') || body.includes('THREE')) {
        info.type = 'three';
        info.technology = 'threejs';
    } else if (body.includes('webgi') || body.includes('WebGI')) {
        info.type = 'webgi';
        info.technology = 'webgi';
    } else if (body.includes('mediapipe') || body.includes('MediaPipe')) {
        info.type = 'mediapipe';
        info.technology = 'mediapipe';
    } else if (body.includes('class ') || body.includes('function ')) {
        info.type = 'component';
        info.technology = 'javascript';
    } else if (body.includes('module.exports') || body.includes('exports.')) {
        info.type = 'module';
        info.technology = 'commonjs';
    } else if (body.includes('__webpackgi_require__')) {
        info.type = 'utility';
        info.technology = 'webpack';
    }

    // Extract dependencies (c(xxx) calls)
    const depMatches = body.match(/c\((\d+)\)/g);
    if (depMatches) {
        info.dependencies = depMatches.map(dep => dep.match(/\d+/)[0]);
    }

    // Extract exports
    const exportMatches = body.match(/(?:exports\.(\w+)|module\.exports\s*=|o\.(\w+)\s*=)/g);
    if (exportMatches) {
        info.exports = exportMatches.map(exp => {
            const match = exp.match(/(?:exports\.(\w+)|o\.(\w+))/);
            return match ? (match[1] || match[2]) : 'default';
        });
    }

    return info;
}

function categorizeModules(modules) {
    const categories = {
        css: [],
        webgi: [],
        threejs: [],
        mediapipe: [],
        ui: [],
        dom: [],
        utilities: [],
        core: [],
        unknown: []
    };

    for (const [id, module] of modules) {
        switch (module.type) {
            case 'css':
                categories.css.push(id);
                break;
            case 'webgi':
                categories.webgi.push(id);
                break;
            case 'three':
                categories.threejs.push(id);
                break;
            case 'mediapipe':
                categories.mediapipe.push(id);
                break;
            case 'dom':
                categories.ui.push(id);
                break;
            case 'utility':
                categories.utilities.push(id);
                break;
            case 'component':
            case 'module':
                if (module.size > 5000) {
                    categories.core.push(id);
                } else {
                    categories.utilities.push(id);
                }
                break;
            default:
                categories.unknown.push(id);
        }
    }

    return categories;
}

function buildDependencyGraph(modules) {
    const graph = {};

    for (const [id, module] of modules) {
        graph[id] = {
            dependencies: module.dependencies,
            dependents: []
        };
    }

    // Calculate reverse dependencies
    for (const [id, module] of modules) {
        module.dependencies.forEach(depId => {
            if (graph[depId]) {
                graph[depId].dependents.push(id);
            }
        });
    }

    return graph;
}

function identifyKeyModules(modules) {
    const keyModules = {};

    for (const [id, module] of modules) {
        // Large modules are likely key components
        if (module.size > 10000) {
            keyModules[id] = {
                ...module,
                reason: 'large-size'
            };
        }
        // Modules with many dependencies
        else if (module.dependencies.length > 5) {
            keyModules[id] = {
                ...module,
                reason: 'many-dependencies'
            };
        }
        // WebGI or THREE.js modules
        else if (module.type === 'webgi' || module.type === 'three') {
            keyModules[id] = {
                ...module,
                reason: 'core-technology'
            };
        }
    }

    return keyModules;
}

function findEntryPoints(modules) {
    const entryPoints = [];

    for (const [id, module] of modules) {
        // Modules with no dependencies might be entry points
        if (module.dependencies.length === 0 && module.size > 1000) {
            entryPoints.push({
                id: id,
                type: module.type,
                size: module.size
            });
        }
    }

    return entryPoints;
}

function generateExtractionScript(modules, categories) {
    const scriptContent = `// Generated webpack module extraction script
// Generated on: ${new Date().toISOString()}

const moduleCategories = ${JSON.stringify(categories, null, 2)};

const extractionPlan = {
    css: {
        target: 'styles/',
        modules: ${JSON.stringify(categories.css)}
    },
    webgi: {
        target: 'src/webgi/',
        modules: ${JSON.stringify(categories.webgi)}
    },
    threejs: {
        target: 'src/core/',
        modules: ${JSON.stringify(categories.threejs)}
    },
    ui: {
        target: 'src/ui/',
        modules: ${JSON.stringify(categories.ui)}
    },
    utilities: {
        target: 'src/utils/',
        modules: ${JSON.stringify(categories.utilities)}
    }
};

export { moduleCategories, extractionPlan };
`;

    fs.writeFileSync('./scripts/module-extraction-plan.js', scriptContent);
    console.log('📝 Generated: scripts/module-extraction-plan.js');
}