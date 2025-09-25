import fs from 'fs';

console.log('🔧 COMPREHENSIVE CODE EXTRACTION - COMPLETE SYSTEM...\n');

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');
const lines = content.split('\n');

console.log(`📄 Total lines: ${lines.length}`);

// Phase 1: Extract CSS modules (already done)
console.log('\n🎨 Phase 1: CSS Modules - Already extracted ✅');

// Phase 2: Find the main webpack module system
console.log('\n🔧 Phase 2: Finding main webpack modules...');

const mainModuleStart = content.indexOf('957: function(__unused_webpack_module, __webpackgi_exports__, __webpackgi_require__) {');
const webgiExportsStart = content.indexOf('var __webpackgi_exports__ = {}');

console.log(`📍 Main modules start: line ${content.substring(0, mainModuleStart).split('\n').length}`);
console.log(`📍 WebGI exports start: line ${content.substring(0, webgiExportsStart).split('\n').length}`);

// Phase 3: Extract major code sections
console.log('\n📦 Phase 3: Extracting major code sections...');

const sections = {
    modulePreloader: {
        start: 0,
        end: content.indexOf('var __webpackgi_modules__ = {'),
        description: 'Module preloader and polyfills'
    },
    cssModules: {
        start: content.indexOf('var __webpackgi_modules__ = {'),
        end: content.indexOf('}, __webpackgi_module_cache__ = {}'),
        description: 'CSS webpack modules'
    },
    webpackRuntime: {
        start: content.indexOf('}, __webpackgi_module_cache__ = {}'),
        end: mainModuleStart,
        description: 'Webpack runtime and loader'
    },
    coreModules: {
        start: mainModuleStart,
        end: webgiExportsStart,
        description: 'Core application modules'
    },
    webgiSystem: {
        start: webgiExportsStart,
        end: content.indexOf('Object.entries(WEBGI).forEach'),
        description: 'WebGI system and exports'
    },
    appBootstrap: {
        start: content.indexOf('Object.entries(WEBGI).forEach'),
        end: content.length,
        description: 'Application bootstrap and initialization'
    }
};

// Create extraction directory structure
const extractionDir = './extracted';
if (!fs.existsSync(extractionDir)) fs.mkdirSync(extractionDir);

console.log('\n📁 Creating extraction structure...');

// Extract each section
for (const [sectionName, section] of Object.entries(sections)) {
    const sectionContent = content.substring(section.start, section.end);
    const filePath = `${extractionDir}/${sectionName}.js`;

    const fileHeader = `/* ${sectionName.toUpperCase()} */
/* ${section.description} */
/* Lines: ${content.substring(0, section.start).split('\n').length}-${content.substring(0, section.end).split('\n').length} */
/* Size: ${sectionContent.length} characters */

`;

    fs.writeFileSync(filePath, fileHeader + sectionContent);
    console.log(`  ✅ ${filePath} (${(sectionContent.length/1024).toFixed(2)}KB)`);
}

// Phase 4: Analyze the core modules section for individual modules
console.log('\n🔍 Phase 4: Analyzing core modules...');

const coreSection = content.substring(sections.coreModules.start, sections.coreModules.end);
const moduleMatches = [...coreSection.matchAll(/(\d+):\s*function\([^)]*\)\s*\{/g)];

console.log(`📊 Found ${moduleMatches.length} core modules`);

// Extract specific key modules
const keyModules = {};
const modulePattern = /(\d+):\s*function\(([^)]*)\)\s*\{([\s\S]*?)(?=\n\s*\d+:\s*function|\n\s*\},?\s*__webpackgi_module_cache__)/g;

let match;
let moduleCount = 0;

while ((match = modulePattern.exec(coreSection)) !== null && moduleCount < 50) { // Limit to first 50 for analysis
    const moduleId = match[1];
    const params = match[2];
    const body = match[3];

    // Analyze this module
    const moduleInfo = {
        id: moduleId,
        params: params,
        size: body.length,
        hasWebGI: body.includes('webgi') || body.includes('WebGI'),
        hasThreeJS: body.includes('THREE') || body.includes('three'),
        hasMediaPipe: body.includes('mediapipe') || body.includes('MediaPipe'),
        hasDOM: body.includes('createElement') || body.includes('appendChild'),
        dependencies: (body.match(/__webpackgi_require__\((\d+)\)/g) || []).map(dep => dep.match(/\d+/)[0])
    };

    keyModules[moduleId] = moduleInfo;
    moduleCount++;

    if (moduleCount % 10 === 0) {
        console.log(`  📊 Analyzed ${moduleCount} modules...`);
    }
}

// Phase 5: Generate comprehensive mapping
console.log('\n📋 Phase 5: Generating comprehensive mapping...');

const comprehensiveReport = {
    timestamp: new Date().toISOString(),
    source: 'index.js',
    totalSize: content.length,
    totalLines: lines.length,
    sections: sections,
    coreModulesAnalyzed: Object.keys(keyModules).length,
    keyModules: keyModules,
    technologyBreakdown: {
        webgi: Object.values(keyModules).filter(m => m.hasWebGI).length,
        threejs: Object.values(keyModules).filter(m => m.hasThreeJS).length,
        mediapipe: Object.values(keyModules).filter(m => m.hasMediaPipe).length,
        dom: Object.values(keyModules).filter(m => m.hasDOM).length
    },
    extractionPlan: generateExtractionPlan(keyModules)
};

fs.writeFileSync('./COMPREHENSIVE-EXTRACTION-REPORT.json', JSON.stringify(comprehensiveReport, null, 2));
console.log('📄 Report saved: COMPREHENSIVE-EXTRACTION-REPORT.json');

console.log('\n✅ COMPREHENSIVE EXTRACTION COMPLETED!');

function generateExtractionPlan(keyModules) {
    return {
        webgi: Object.keys(keyModules).filter(id => keyModules[id].hasWebGI),
        threejs: Object.keys(keyModules).filter(id => keyModules[id].hasThreeJS),
        mediapipe: Object.keys(keyModules).filter(id => keyModules[id].hasMediaPipe),
        ui: Object.keys(keyModules).filter(id => keyModules[id].hasDOM)
    };
}