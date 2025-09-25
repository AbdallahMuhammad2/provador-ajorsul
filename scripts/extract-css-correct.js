import fs from 'fs';
import path from 'path';

console.log('🎨 CSS EXTRACTION - CORRECTED PATTERN...\n');

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

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');
console.log(`📄 File loaded: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

console.log('🔍 Extracting CSS modules...');

const extractedCSS = {};

// Extract each known CSS module individually
for (const [moduleId, filename] of Object.entries(knownCSSModules)) {
    console.log(`  🔎 Looking for module ${moduleId} (${filename})...`);

    // More precise regex for this specific module
    const modulePattern = new RegExp(
        `${moduleId}:\\s*function\\(d,\\s*o,\\s*c\\)\\s*{[\\s\\S]*?_\\.push\\(\\[d\\.id,\\s*['"\`](.*?)['"\`],\\s*['""]?\\]\\)[\\s\\S]*?o\\.A\\s*=\\s*_`,
        'gs'
    );

    const match = modulePattern.exec(content);
    if (match) {
        const cssContent = match[1];

        // Unescape CSS content
        const unescapedCSS = cssContent
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');

        extractedCSS[moduleId] = {
            filename: filename,
            content: unescapedCSS,
            size: unescapedCSS.length
        };

        console.log(`    ✅ Found! (${(unescapedCSS.length/1024).toFixed(2)}KB)`);
    } else {
        console.log(`    ❌ Not found`);
    }

    // Reset regex lastIndex for next search
    content.lastIndex = 0;
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
    const formattedCSS = formatCSS(content);
    const fileContent = `/* ${filename.toUpperCase().replace('.CSS', '')} */
/* Extracted from webpack module ${moduleId} */
/* Size: ${size} characters */

${formattedCSS}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`  ✅ ${filePath} (${(size/1024).toFixed(2)}KB)`);

    imports.push(`@import './${subdir}/${filename}';`);
}

// Function to format CSS
function formatCSS(css) {
    return css
        .replace(/}/g, '}\n')
        .replace(/{/g, ' {\n  ')
        .replace(/;/g, ';\n  ')
        .replace(/,/g, ',\n')
        .replace(/\s+/g, ' ')
        .replace(/\n\s+\n/g, '\n')
        .trim();
}

// Create main CSS file
console.log('\n📄 Creating main CSS file...');
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle analysis */
/* Extracted: ${Object.keys(extractedCSS).length}/${Object.keys(knownCSSModules).length} modules */

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