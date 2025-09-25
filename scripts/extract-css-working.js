import fs from 'fs';

console.log('🎨 CSS EXTRACTION - WORKING VERSION...\n');

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

console.log('🔍 Extracting CSS modules...');

const extractedCSS = {};

// Extract all CSS in one pass using the correct pattern
const cssPattern = /(\d+):\s*function\(d,\s*o,\s*c\)\s*{[^}]*var\s+h\s*=\s*c\(364\)[^}]*_\.push\(\[d\.id,\s*'([^']+)'/g;

let match;
while ((match = cssPattern.exec(content)) !== null) {
    const moduleId = match[1];
    const cssContent = match[2];

    if (knownCSSModules[moduleId]) {
        console.log(`  ✅ Found module ${moduleId}: ${knownCSSModules[moduleId]}`);

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

        console.log(`    📦 Size: ${(unescapedCSS.length/1024).toFixed(2)}KB`);
    }
}

console.log(`\n📊 Extracted ${Object.keys(extractedCSS).length}/${Object.keys(knownCSSModules).length} CSS modules`);

// Create directories
if (!fs.existsSync('styles')) fs.mkdirSync('styles');
if (!fs.existsSync('styles/components')) fs.mkdirSync('styles/components');
if (!fs.existsSync('styles/themes')) fs.mkdirSync('styles/themes');
if (!fs.existsSync('styles/ui')) fs.mkdirSync('styles/ui');

console.log('\n📝 Writing CSS files...');
const imports = [];

for (const [moduleId, cssData] of Object.entries(extractedCSS)) {
    const { filename, content, size } = cssData;

    // Determine subdirectory
    let subdir = 'components';
    if (filename.includes('theme')) subdir = 'themes';
    if (filename.includes('tweakpane')) subdir = 'ui';

    const filePath = `./styles/${subdir}/${filename}`;

    // Create formatted CSS
    const fileContent = `/* ${filename.toUpperCase().replace('.CSS', '')} */
/* Extracted from webpack module ${moduleId} */
/* Original size: ${size} characters */

${content}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`  ✅ ${filePath}`);

    imports.push(`@import './${subdir}/${filename}';`);
}

// Create main CSS file
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle */
/* Extracted: ${Object.keys(extractedCSS).length}/${Object.keys(knownCSSModules).length} modules */

${imports.join('\n')}
`;

fs.writeFileSync('./styles/main.css', mainCSS);
console.log('\n  ✅ styles/main.css');

console.log(`\n🎉 SUCCESS! Extracted ${Object.keys(extractedCSS).length} CSS modules.`);

// Update todo status
console.log('\n📋 CSS Extraction Phase: COMPLETED ✅');