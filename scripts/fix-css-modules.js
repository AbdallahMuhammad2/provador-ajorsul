import fs from 'fs';
import path from 'path';

console.log('🔧 Corrigindo módulos CSS com problemas de template literals...\n');

// Função para corrigir CSS modules específicos
function fixCSSModule(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let wasModified = false;
        
        // Corrigir template literals em CSS strings
        if (content.includes('_.push([d.id, `') || content.includes('_.push([d.id, `.')) {
            // Converter template literals para strings normais
            content = content.replace(
                /_.push\(\[d\.id,\s*`([^`]*(?:\n[^`]*)*?)`,\s*""\]\)/g,
                (match, cssContent) => {
                    // Minificar CSS removendo quebras de linha e espaços extras
                    const minifiedCSS = cssContent
                        .replace(/\n\s*/g, '')
                        .replace(/\s+/g, ' ')
                        .replace(/;\s*/g, ';')
                        .replace(/{\s*/g, '{')
                        .replace(/}\s*/g, '}')
                        .replace(/:\s*/g, ':')
                        .replace(/,\s*/g, ',')
                        .trim();
                    
                    // Escapar aspas se necessário
                    const escapedCSS = minifiedCSS.replace(/"/g, '\\"');
                    
                    return `_.push([d.id, '${escapedCSS}', ""])`;
                }
            );
            wasModified = true;
        }
        
        // Corrigir outros problemas de sintaxe específicos de CSS modules
        if (content.includes('_.push([d.id, \'') && content.includes('\', ""])')) {
            // Verificar se há aspas não escapadas dentro da string CSS
            content = content.replace(
                /_.push\(\[d\.id,\s*'([^']*(?:\\.[^']*)*)',\s*""\]\)/g,
                (match, cssContent) => {
                    // Garantir que aspas estão escapadas corretamente
                    const fixedCSS = cssContent.replace(/(?<!\\)"/g, '\\"');
                    return `_.push([d.id, '${fixedCSS}', ""])`;
                }
            );
        }
        
        // Corrigir problemas com content: "" no CSS
        content = content.replace(/content:""/g, 'content:""');
        content = content.replace(/content:\\"\\"/g, 'content:""');
        
        if (wasModified || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Corrigido: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ OK: ${path.basename(filePath)}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erro em ${path.basename(filePath)}: ${error.message}`);
        return false;
    }
}

// Encontrar todos os módulos CSS
const cssModules = [];
const srcDir = '../src';

function findCSSModules(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            findCSSModules(fullPath);
        } else if (file.includes('css') && file.endsWith('.js')) {
            cssModules.push(fullPath);
        }
    });
}

findCSSModules(srcDir);

console.log(`Encontrados ${cssModules.length} módulos CSS para verificar:\n`);

let fixedCount = 0;
cssModules.forEach(module => {
    if (fixCSSModule(module)) {
        fixedCount++;
    }
});

// Verificar também módulos que podem conter CSS (animation, ui, etc)
const possibleCSSModules = [];

function findPossibleCSSModules(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            findPossibleCSSModules(fullPath);
        } else if ((file.includes('animation') || file.includes('ui') || file.includes('774')) && file.endsWith('.js')) {
            possibleCSSModules.push(fullPath);
        }
    });
}

findPossibleCSSModules(srcDir);

console.log(`\nVerificando ${possibleCSSModules.length} módulos que podem conter CSS:\n`);

possibleCSSModules.forEach(module => {
    if (!cssModules.includes(module)) { // Não verificar duplicados
        if (fixCSSModule(module)) {
            fixedCount++;
        }
    }
});

console.log(`\n📊 RESULTADO:`);
console.log(`  ✅ Módulos corrigidos: ${fixedCount}`);
console.log(`  📁 Total verificado: ${cssModules.length + possibleCSSModules.length}`);

if (fixedCount > 0) {
    console.log(`\n🎉 ${fixedCount} módulos CSS foram corrigidos!`);
    console.log('Recarregue a página para testar.');
} else {
    console.log(`\n⚪ Nenhuma correção adicional foi necessária.`);
}

console.log('\n✨ Módulos CSS prontos para uso!');
