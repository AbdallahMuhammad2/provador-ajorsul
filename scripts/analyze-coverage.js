import fs from 'fs';

console.log('🔍 ANÁLISE COMPARATIVA - Verificando se falta algo na extração\n');

// Ler arquivo original
const originalContent = fs.readFileSync('../index-minified-backup.js', 'utf8');
console.log(`📁 Arquivo original: ${(originalContent.length / 1024).toFixed(2)}KB`);

// Ler relatório de extração
const report = JSON.parse(fs.readFileSync('../COMPLETE-EXTRACTION-REPORT.json', 'utf8'));
console.log(`📊 Relatório carregado: ${report.extraction.css.blocks} CSS + ${report.extraction.javascript.modules} JS extraídos`);

// === ANÁLISE DE COBERTURA ===
console.log('\n🎯 ANÁLISE DE COBERTURA:');
console.log('-'.repeat(40));

// Verificar funções principais que devem estar presentes
const essentialPatterns = {
    'THREE.js/WebGL': /THREE\.|WebGL|Scene|Camera|Renderer|Material|Geometry|Mesh/gi,
    'MediaPipe': /MediaPipe|HandLandmarker|hand.*detect|finger.*track/gi,
    'Ring System': /ring|Ring|jewelry|gem|diamond|material|texture/gi,
    'Camera/Video': /video|camera|stream|getUserMedia|webcam/gi,
    'UI Controls': /button|Button|control|Control|interface|UI/gi,
    'Asset Loading': /load|Load|asset|Asset|manager|Manager/gi,
    'Mathematics': /matrix|Matrix|vector|Vector|quaternion|euler/gi,
    'Events': /addEventListener|event|Event|click|touch|gesture/gi
};

console.log('Funcionalidades encontradas no arquivo original:');
Object.entries(essentialPatterns).forEach(([name, pattern]) => {
    const matches = originalContent.match(pattern) || [];
    const coverage = matches.length;
    const status = coverage > 10 ? '✅' : coverage > 5 ? '⚠️' : '❌';
    console.log(`  ${status} ${name}: ${coverage} ocorrências`);
});

// === VERIFICAÇÃO DE DEPENDÊNCIAS ===
console.log('\n📦 VERIFICAÇÃO DE DEPENDÊNCIAS:');
console.log('-'.repeat(40));

const dependencies = {
    'Tippy.js': /tippy/gi,
    'Tweakpane': /tweakpane|tp-/gi,
    'Perfect Corp': /perfectcorp|Perfect.*Corp/gi,
    'WebGI': /webgi|WebGI/gi,
    'WebAssembly': /wasm|WebAssembly/gi,
    'CDN Resources': /cdn\.|static\.|amazonaws/gi
};

console.log('Dependências externas detectadas:');
Object.entries(dependencies).forEach(([name, pattern]) => {
    const matches = originalContent.match(pattern) || [];
    const found = matches.length > 0;
    console.log(`  ${found ? '✅' : '❌'} ${name}: ${matches.length} refs`);
});

// === BUSCA POR MÓDULOS NÃO EXTRAÍDOS ===
console.log('\n🔍 BUSCA POR MÓDULOS PERDIDOS:');
console.log('-'.repeat(40));

// Procurar por funções standalone que podem ter sido perdidas
const standaloneFunctionPattern = /function\s+(\w+)\s*\([^)]*\)\s*\{/g;
const standaloneArrowPattern = /const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/g;
const classPattern = /class\s+(\w+)(?:\s+extends\s+\w+)?\s*\{/g;

let standaloneFunctions = [];
let arrowFunctions = [];
let classes = [];

let match;
while ((match = standaloneFunctionPattern.exec(originalContent)) !== null) {
    standaloneFunctions.push(match[1]);
}

while ((match = standaloneArrowPattern.exec(originalContent)) !== null) {
    arrowFunctions.push(match[1]);
}

while ((match = classPattern.exec(originalContent)) !== null) {
    classes.push(match[1]);
}

console.log(`Funções standalone encontradas: ${standaloneFunctions.length}`);
console.log(`Arrow functions encontradas: ${arrowFunctions.length}`);
console.log(`Classes encontradas: ${classes.length}`);

// Mostrar algumas importantes
if (standaloneFunctions.length > 0) {
    console.log('Principais funções:', standaloneFunctions.slice(0, 10).join(', '));
}
if (classes.length > 0) {
    console.log('Classes importantes:', classes.slice(0, 10).join(', '));
}

// === VERIFICAÇÃO DE INICIALIZAÇÃO ===
console.log('\n🚀 VERIFICAÇÃO DE INICIALIZAÇÃO:');
console.log('-'.repeat(40));

const initPatterns = {
    'DOMContentLoaded': /DOMContentLoaded|window\.onload/gi,
    'Canvas Setup': /canvas|Canvas.*create|getContext/gi,
    'Camera Init': /getUserMedia|camera.*init|video.*start/gi,
    'WebGL Context': /getContext.*webgl|WebGL.*context/gi,
    'MediaPipe Init': /MediaPipe.*create|Hand.*landmarker/gi
};

console.log('Padrões de inicialização:');
Object.entries(initPatterns).forEach(([name, pattern]) => {
    const matches = originalContent.match(pattern) || [];
    const found = matches.length > 0;
    console.log(`  ${found ? '✅' : '❌'} ${name}: ${matches.length} ocorrências`);
});

// === ANÁLISE DE ASSETS ===
console.log('\n🎨 ANÁLISE DE ASSETS:');
console.log('-'.repeat(40));

const assetPatterns = {
    'GLB Models': /\.glb|\.gltf/gi,
    'Textures': /\.jpg|\.png|\.webp|\.texture/gi,
    'Materials': /\.dmat|material|Material/gi,
    'HDR/EXR': /\.hdr|\.exr/gi,
    'URLs': /https?:\/\/[^\s'"]+/gi
};

console.log('Assets referenciados:');
Object.entries(assetPatterns).forEach(([name, pattern]) => {
    const matches = originalContent.match(pattern) || [];
    console.log(`  ${name}: ${matches.length} referências`);
    if (matches.length > 0 && matches.length < 10) {
        console.log(`    ${matches.slice(0, 5).join(', ')}`);
    }
});

// === RECOMENDAÇÕES ===
console.log('\n💡 RECOMENDAÇÕES:');
console.log('-'.repeat(40));

const recommendations = [];

if (report.extraction.javascript.modules < 50) {
    recommendations.push('⚠️ Poucos módulos JS extraídos - verificar padrões adicionais');
}

if (report.extraction.css.blocks < 10) {
    recommendations.push('⚠️ Poucos blocos CSS extraídos - verificar estilos inline');
}

const threeMatches = (originalContent.match(/THREE\./g) || []).length;
if (threeMatches > 100) {
    recommendations.push('✅ Grande uso de THREE.js detectado - focar na extração WebGL');
}

const mediapipeMatches = (originalContent.match(/MediaPipe/gi) || []).length;
if (mediapipeMatches > 5) {
    recommendations.push('✅ MediaPipe detectado - verificar módulos de detecção');
}

if (recommendations.length === 0) {
    recommendations.push('✅ Extração parece abrangente');
}

recommendations.forEach(rec => console.log(`  ${rec}`));

// === PRÓXIMOS PASSOS ===
console.log('\n🔄 PRÓXIMOS PASSOS RECOMENDADOS:');
console.log('-'.repeat(40));
console.log('1. 🌐 Testar versão deobfuscada: http://localhost:3003/index-deobfuscated.html');
console.log('2. 🔍 Comparar visualmente com versão original');
console.log('3. 🐛 Debugar console do navegador para erros');
console.log('4. 🔧 Refinar módulos que não funcionam');
console.log('5. 📱 Testar funcionalidade de detecção de mãos');
console.log('6. 💍 Testar renderização de anéis');
console.log('7. 🎨 Verificar se UI está funcionando');

console.log('\n✅ Análise comparativa concluída!');
