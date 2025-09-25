import fs from 'fs';

console.log('🎨 MANUAL CSS EXTRACTION - WORKING WITH FOUND PATTERNS...\n');

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');

// Use grep output to extract CSS directly
console.log('🔍 Extracting CSS using simple regex...');

// Simple pattern to find .push([d.id, 'CSS_CONTENT'
const cssMatches = content.match(/\.push\(\[d\.id,\s*'([^']+)'/g);

console.log(`Found ${cssMatches ? cssMatches.length : 0} CSS blocks`);

const cssModules = [
    { name: 'tippy-tooltips.css', id: 0 },
    { name: 'loading-screen.css', id: 1 },
    { name: 'button-bars.css', id: 2 },
    { name: 'tweakpane-themes.css', id: 3 },
    { name: 'loading-spinner.css', id: 4 },
    { name: 'asset-loading-bar.css', id: 5 },
    { name: 'asset-popup.css', id: 6 },
    { name: 'modal-system.css', id: 7 }
];

// Create directories
if (!fs.existsSync('styles')) fs.mkdirSync('styles');
if (!fs.existsSync('styles/components')) fs.mkdirSync('styles/components');
if (!fs.existsSync('styles/themes')) fs.mkdirSync('styles/themes');
if (!fs.existsSync('styles/ui')) fs.mkdirSync('styles/ui');

console.log('\n📝 Writing CSS files...');
const imports = [];

if (cssMatches) {
    cssMatches.forEach((match, index) => {
        if (index < cssModules.length) {
            const { name } = cssModules[index];

            // Extract CSS content from the match
            const cssContent = match.match(/\.push\(\[d\.id,\s*'([^']+)'/)[1];

            // Determine subdirectory
            let subdir = 'components';
            if (name.includes('theme')) subdir = 'themes';
            if (name.includes('tweakpane')) subdir = 'ui';

            const filePath = `./styles/${subdir}/${name}`;

            // Create formatted CSS
            const fileContent = `/* ${name.toUpperCase().replace('.CSS', '')} */
/* Extracted from CSS block ${index + 1} */
/* Size: ${cssContent.length} characters */

${cssContent}
`;

            fs.writeFileSync(filePath, fileContent);
            console.log(`  ✅ ${filePath} (${(cssContent.length/1024).toFixed(2)}KB)`);

            imports.push(`@import './${subdir}/${name}';`);
        }
    });
}

// Create main CSS file
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle */
/* Extracted: ${cssMatches ? cssMatches.length : 0} CSS modules */

${imports.join('\n')}
`;

fs.writeFileSync('./styles/main.css', mainCSS);
console.log('\n  ✅ styles/main.css');

// Update CSS in index.html to use our extracted CSS
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Try-On</title>
    <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
    <div id="canvasContainer">
        <canvas id="mcanvas"></canvas>
    </div>
    <div id="tweakpaneUiContainer"></div>
    <script src="./index.js"></script>
</body>
</html>`;

fs.writeFileSync('./index-clean.html', indexHtml);
console.log('  ✅ index-clean.html');

console.log(`\n🎉 SUCCESS! Extracted ${cssMatches ? cssMatches.length : 0} CSS modules.`);
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Execute Sprint 1: Analysis and Base Extraction", "status": "in_progress", "activeForm": "Executing Sprint 1: Analysis and Base Extraction"}, {"content": "Create backup and directory structure", "status": "completed", "activeForm": "Creating backup and directory structure"}, {"content": "Execute CSS extraction scripts", "status": "completed", "activeForm": "Executing CSS extraction scripts"}, {"content": "Map all webpack modules", "status": "in_progress", "activeForm": "Mapping all webpack modules"}, {"content": "Identify dependencies between modules", "status": "pending", "activeForm": "Identifying dependencies between modules"}, {"content": "Create base file structure", "status": "pending", "activeForm": "Creating base file structure"}]