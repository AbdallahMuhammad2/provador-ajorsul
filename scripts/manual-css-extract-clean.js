import fs from 'fs';

console.log('🎨 MANUAL CSS EXTRACTION - CLEAN VERSION...\n');

console.log('📚 Reading index.js...');
const content = fs.readFileSync('./index.js', 'utf8');

// Use the exact CSS patterns we found with grep
const cssBlocks = [
    {
        name: 'tippy-tooltips.css',
        content: '.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(0.54, 1.5, 0.38, 1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:rgba(0,0,0,0);border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'
    },
    {
        name: 'loading-spinner.css',
        content: '.loader{width:48px;height:48px;border:5px solid #333;border-bottom-color:rgba(0,0,0,0);border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}'
    },
    {
        name: 'asset-loading-bar.css',
        content: '#assetManagerLoadingBar{z-index:400;position:absolute;top:0;left:0;right:0;width:100%;background-color:rgba(0,0,0,0);height:auto}#assetManagerLoadingBarContent{color:#fff;position:absolute;left:0;right:0;margin:auto;transition:width .5s;background-color:rgba(34,34,34,.6666666667);text-align:center;font-size:.5rem;line-height:.6rem;height:.6rem;border-radius:0 0 .125rem .125rem;border-bottom:#999 1px solid}.processState{font-weight:bold}'
    }
];

// Extract the remaining CSS blocks from the file
console.log('🔍 Extracting additional CSS...');

const additionalCSSMatches = content.match(/\.push\(\[d\.id,\s*'([^']+)'/g);

if (additionalCSSMatches && additionalCSSMatches.length > 3) {
    // Add the larger CSS blocks we found
    if (additionalCSSMatches[1]) {
        const largeContent1 = additionalCSSMatches[1].match(/\.push\(\[d\.id,\s*'([^']+)'/)[1];
        cssBlocks.push({
            name: 'loading-screen.css',
            content: largeContent1
        });
    }

    if (additionalCSSMatches[2]) {
        const largeContent2 = additionalCSSMatches[2].match(/\.push\(\[d\.id,\s*'([^']+)'/)[1];
        cssBlocks.push({
            name: 'button-bars.css',
            content: largeContent2
        });
    }

    if (additionalCSSMatches[3]) {
        const largeContent3 = additionalCSSMatches[3].match(/\.push\(\[d\.id,\s*'([^']+)'/)[1];
        cssBlocks.push({
            name: 'tweakpane-themes.css',
            content: largeContent3
        });
    }
}

// Create directories
if (!fs.existsSync('styles')) fs.mkdirSync('styles');
if (!fs.existsSync('styles/components')) fs.mkdirSync('styles/components');
if (!fs.existsSync('styles/themes')) fs.mkdirSync('styles/themes');
if (!fs.existsSync('styles/ui')) fs.mkdirSync('styles/ui');

console.log('\n📝 Writing CSS files...');
const imports = [];

cssBlocks.forEach((block, index) => {
    const { name, content } = block;

    // Determine subdirectory
    let subdir = 'components';
    if (name.includes('theme') || name.includes('tweakpane')) subdir = 'ui';

    const filePath = `./styles/${subdir}/${name}`;

    // Create formatted CSS
    const fileContent = `/* ${name.toUpperCase().replace('.CSS', '')} */
/* Extracted from webpack bundle - block ${index + 1} */
/* Size: ${content.length} characters */

${content}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`  ✅ ${filePath} (${(content.length/1024).toFixed(2)}KB)`);

    imports.push(`@import './${subdir}/${name}';`);
});

// Create main CSS file
const mainCSS = `/* RING TRYON - MAIN CSS */
/* Generated from webpack bundle */
/* Extracted: ${cssBlocks.length} CSS modules */

${imports.join('\n')}
`;

fs.writeFileSync('./styles/main.css', mainCSS);
console.log('\n  ✅ styles/main.css');

console.log(`\n🎉 SUCCESS! Extracted ${cssBlocks.length} CSS modules.`);
console.log('📋 CSS Extraction Phase: COMPLETED ✅');