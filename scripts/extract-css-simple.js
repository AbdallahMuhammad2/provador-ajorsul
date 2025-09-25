import fs from 'fs';

console.log('🎨 CSS EXTRACTION - SIMPLE APPROACH...\n');

// CSS module mapping as identified
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

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');

console.log('🔍 Extracting CSS modules using simple regex...');

const extractedCSS = {};

// Simple approach: extract each module by searching for its exact pattern
for (const [moduleId, filename] of Object.entries(knownCSSModules)) {
    console.log(`  🔎 Looking for module ${moduleId}...`);

    // Find the module start
    const moduleStart = content.indexOf(`${moduleId}: function(d, o, c) {`);
    if (moduleStart === -1) {
        console.log(`    ❌ Module ${moduleId} not found`);
        continue;
    }

    // Find the _.push([d.id, 'CSS', ""]) pattern within this module
    const moduleSection = content.substring(moduleStart, moduleStart + 50000); // Look in next 50k chars
    const pushMatch = moduleSection.match(/_\.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/s);

    if (pushMatch) {
        const cssContent = pushMatch[1]
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');

        extractedCSS[moduleId] = {
            filename: filename,
            content: cssContent,
            size: cssContent.length
        };

        console.log(`    ✅ Found! (${(cssContent.length/1024).toFixed(2)}KB)`);
    } else {
        console.log(`    ❌ CSS pattern not found in module ${moduleId}`);
    }
}

console.log(`\n📊 Extracted ${Object.keys(extractedCSS).length}/${Object.keys(knownCSSModules).length} CSS modules`);

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
    const formattedCSS = content
        .replace(/}/g, '}\n\n')
        .replace(/\{/g, ' {\n  ')
        .replace(/;/g, ';\n  ')
        .replace(/,/g, ',\n')
        .replace(/\s+/g, ' ')
        .replace(/\n\s+\n/g, '\n')
        .trim();

    const fileContent = `/* ${filename.toUpperCase().replace('.CSS', '')} */
/* Extracted from webpack module ${moduleId} */
/* Original size: ${size} characters */

${formattedCSS}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`  ✅ ${filePath} (${(size/1024).toFixed(2)}KB)`);

    imports.push(`@import './${subdir}/${filename}';`);
}

// Create main CSS file
console.log('\n📄 Creating main CSS file...');
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle analysis */
/* Extracted: ${Object.keys(extractedCSS).length}/${Object.keys(knownCSSModules).length} modules */
/* Generated on: ${new Date().toISOString()} */

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

if (report.missing.length > 0) {
    console.log(`  ⚠️  Missing modules: ${report.missing.join(', ')}`);
} else {
    console.log(`  🎉 All CSS modules extracted successfully!`);
}

console.log('\n✅ CSS EXTRACTION COMPLETED!');