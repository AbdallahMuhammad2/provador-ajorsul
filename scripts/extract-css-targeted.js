import fs from 'fs';
import path from 'path';

console.log('🎨 EXTRAÇÃO DIRECIONADA DE CSS - BASEADA NA ANÁLISE...\n');

// CSS module mapping exactly as identified in our analysis
const knownCSSModules = {
    774: 'tippy-tooltips.css',
    611: 'loading-spinner.css',
    223: 'asset-loading-bar.css',
    646: 'loading-screen.css',
    636: 'asset-popup.css',
    757: 'button-bars.css',
    367: 'tweakpane-themes.css',
    160: 'modal-system.css'
};

// Read the actual index.js file
console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');
console.log(`📄 File loaded: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

// More specific pattern for our webpack CSS modules
const CSS_MODULE_PATTERN = /(\d+):\s*function\(d,\s*o,\s*c\)\s*{[\s\S]*?_.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)[\s\S]*?o\.A\s*=\s*_/gs;

console.log('🔍 Searching for known CSS modules...');

const extractedCSS = {};
let match;

while ((match = CSS_MODULE_PATTERN.exec(content)) !== null) {
    const moduleId = match[1];
    const cssContent = match[2];

    if (knownCSSModules[moduleId]) {
        console.log(`✅ Found module ${moduleId}: ${knownCSSModules[moduleId]}`);

        // Unescape CSS content
        const unescapedCSS = cssContent
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');

        extractedCSS[moduleId] = {
            filename: knownCSSModules[moduleId],
            content: unescapedCSS,
            size: unescapedCSS.length
        };
    }
}

console.log(`\n📊 Found ${Object.keys(extractedCSS).length} of ${Object.keys(knownCSSModules).length} expected CSS modules`);

// Create directories
console.log('\n📁 Creating directory structure...');
const dirs = ['styles/components', 'styles/themes', 'styles/ui'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`  ✅ Created: ${dir}`);
    }
});

// Write CSS files
console.log('\n📝 Writing CSS files...');
const imports = [];

for (const [moduleId, cssData] of Object.entries(extractedCSS)) {
    const { filename, content, size } = cssData;

    // Determine subdirectory
    let subdir = 'components';
    if (filename.includes('theme')) subdir = 'themes';
    if (filename.includes('tweakpane')) subdir = 'ui';

    const filePath = `./styles/${subdir}/${filename}`;

    // Format CSS for readability
    const formattedCSS = `/* ${filename.toUpperCase().replace('.CSS', '')} */
/* Extracted from webpack module ${moduleId} */
/* Size: ${size} characters */

${content}
`;

    fs.writeFileSync(filePath, formattedCSS);
    console.log(`  ✅ ${filePath} (${(size/1024).toFixed(2)}KB)`);

    imports.push(`@import './${subdir}/${filename}';`);
}

// Create main CSS file
console.log('\n📄 Creating main CSS file...');
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle analysis */
/* Total modules extracted: ${Object.keys(extractedCSS).length} */

${imports.join('\n')}
`;

fs.writeFileSync('./styles/main.css', mainCSS);
console.log('  ✅ styles/main.css');

// Create extraction report
const report = {
    timestamp: new Date().toISOString(),
    source: 'index.js',
    extractedModules: Object.keys(extractedCSS).length,
    expectedModules: Object.keys(knownCSSModules).length,
    totalSize: Object.values(extractedCSS).reduce((sum, css) => sum + css.size, 0),
    modules: extractedCSS,
    missing: Object.keys(knownCSSModules).filter(id => !extractedCSS[id])
};

fs.writeFileSync('./CSS-EXTRACTION-REPORT.json', JSON.stringify(report, null, 2));

console.log('\n📈 EXTRACTION SUMMARY:');
console.log(`  ✅ Extracted: ${report.extractedModules}/${report.expectedModules} modules`);
console.log(`  📦 Total size: ${(report.totalSize/1024).toFixed(2)}KB`);
console.log(`  📄 Report: CSS-EXTRACTION-REPORT.json`);

if (report.missing.length > 0) {
    console.log(`  ⚠️  Missing modules: ${report.missing.join(', ')}`);
}

console.log('\n✅ CSS EXTRACTION COMPLETED!');