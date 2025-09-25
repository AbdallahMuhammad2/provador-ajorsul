import fs from 'fs';
import path from 'path';

console.log('🎨 INICIANDO EXTRAÇÃO DE CSS DO ARQUIVO MINIFICADO...\n');

// Lê o arquivo minificado
const minifiedContent = fs.readFileSync('index-minified-backup.js', 'utf8');
console.log(`📄 Arquivo carregado: ${(minifiedContent.length / 1024).toFixed(2)}KB`);

// Padrões para identificar CSS
const cssPatterns = [
    // Padrão principal: _.push([d.id, 'CSS_CONTENT', ""])
    /_\.push\(\[d\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/gs,
    // Padrão alternativo
    /\.push\(\[\w+\.id,\s*['"`](.*?)['"`],\s*['""]?\]\)/gs
];

const cssBlocks = [];
const cssFiles = new Map();

// Extrai CSS usando múltiplos padrões
cssPatterns.forEach((pattern, index) => {
    let match;
    while ((match = pattern.exec(minifiedContent)) !== null) {
        const cssContent = match[1]
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');
        
        cssBlocks.push({
            content: cssContent,
            pattern: index,
            length: cssContent.length
        });
    }
});

console.log(`🔍 Encontrados ${cssBlocks.length} blocos CSS`);

// Classifica CSS por funcionalidade
function classifyCSS(css) {
    const classifiers = {
        'tippy-tooltips': /tippy|tooltip/i,
        'loading-screen': /loading|loader|progress/i,
        'button-bar': /button-bar|btn|button/i,
        'modal-system': /modal|popup|overlay/i,
        'tweakpane': /tp-|tweakpane/i,
        'themes': /:root|tpTheme|--tp-/i,
        'responsive': /@media|responsive/i,
        'scrollbar': /scrollbar|::-webkit-scrollbar/i,
        'utilities': /util|helper/i
    };
    
    for (const [category, regex] of Object.entries(classifiers)) {
        if (regex.test(css)) {
            return category;
        }
    }
    return 'general';
}

// Organiza CSS por categoria
cssBlocks.forEach((block, index) => {
    const category = classifyCSS(block.content);
    
    if (!cssFiles.has(category)) {
        cssFiles.set(category, []);
    }
    
    cssFiles.get(category).push({
        content: block.content,
        index: index,
        size: block.length
    });
});

console.log('\n📊 CATEGORIZAÇÃO DO CSS:');
cssFiles.forEach((blocks, category) => {
    const totalSize = blocks.reduce((sum, block) => sum + block.size, 0);
    console.log(`  ${category}: ${blocks.length} blocos (${totalSize} chars)`);
});

// Cria arquivos CSS organizados
console.log('\n📝 CRIANDO ARQUIVOS CSS...');

// CSS Principal com imports
let mainCSS = `/* Ring Tryon - Main CSS */
/* Generated from minified bundle - ${new Date().toISOString()} */

`;

cssFiles.forEach((blocks, category) => {
    const filename = `${category}.css`;
    const targetDir = category === 'themes' ? 'styles/themes' : 
                     category === 'tweakpane' ? 'styles/ui' : 
                     'styles/components';
    
    const fullPath = path.join(targetDir, filename);
    
    // Cria o conteúdo do arquivo CSS
    let cssContent = `/* ${category.toUpperCase()} - Ring Tryon CSS */\n`;
    cssContent += `/* Extracted from minified bundle */\n\n`;
    
    blocks.forEach((block, index) => {
        cssContent += `/* Block ${block.index + 1} */\n`;
        cssContent += block.content + '\n\n';
    });
    
    // Cria diretório se não existir
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Escreve arquivo
    fs.writeFileSync(fullPath, cssContent);
    console.log(`  ✅ ${fullPath} (${blocks.length} blocos)`);
    
    // Adiciona import ao CSS principal
    const importPath = `./${targetDir}/${filename}`.replace('styles/', '');
    mainCSS += `@import '${importPath}';\n`;
});

// Cria CSS principal
fs.writeFileSync('styles/main.css', mainCSS);
console.log(`  ✅ styles/main.css (arquivo principal)`);

// Estatísticas finais
const stats = {
    totalBlocks: cssBlocks.length,
    totalSize: cssBlocks.reduce((sum, block) => sum + block.length, 0),
    categories: cssFiles.size,
    files: Array.from(cssFiles.keys())
};

console.log('\n📈 ESTATÍSTICAS FINAIS:');
console.log(`  Total de blocos CSS: ${stats.totalBlocks}`);
console.log(`  Tamanho total: ${(stats.totalSize / 1024).toFixed(2)}KB`);
console.log(`  Categorias: ${stats.categories}`);
console.log(`  Arquivos gerados: ${stats.files.length + 1}`);

// Salva relatório
const report = {
    timestamp: new Date().toISOString(),
    source: 'index-minified-backup.js',
    stats: stats,
    files: Object.fromEntries(cssFiles),
    categories: Array.from(cssFiles.keys())
};

fs.writeFileSync('CSS-EXTRACTION-REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Relatório salvo: CSS-EXTRACTION-REPORT.json');

console.log('\n✅ EXTRAÇÃO CSS CONCLUÍDA!');
console.log('\n🔄 Próximo passo: node scripts/extract-html.js');
