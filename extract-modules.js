import fs from 'fs';
import path from 'path';

// Função para beautify básico
function beautifyJS(code) {
    return code
        // Adiciona quebras de linha após ; { }
        .replace(/;/g, ';\n')
        .replace(/\{/g, ' {\n')
        .replace(/\}/g, '\n}\n')
        .replace(/,/g, ',\n')
        // Adiciona indentação básica
        .split('\n')
        .map((line, index) => {
            const trimmed = line.trim();
            if (trimmed.includes('}')) return trimmed;
            if (trimmed.includes('{')) return '  ' + trimmed;
            return '    ' + trimmed;
        })
        .join('\n')
        // Remove linhas vazias duplas
        .replace(/\n\s*\n\s*\n/g, '\n\n');
}

// Função para extrair componentes principais
function extractComponents(code) {
    const components = {};
    
    // Procura por padrões comuns
    const patterns = {
        webgl: /WebGL|THREE|Scene|Camera|Renderer/gi,
        mediapipe: /MediaPipe|HandLandmarker|hand/gi,
        ring: /ring|Ring|jewelry|Jewel/gi,
        ui: /button|Button|UI|interface/gi,
        camera: /camera|Camera|video|Video/gi
    };
    
    Object.keys(patterns).forEach(key => {
        const matches = code.match(patterns[key]) || [];
        components[key] = matches.length;
    });
    
    return components;
}

// Lê o arquivo original
console.log('🔍 Tentando ler index.js...');
try {
    const originalCode = fs.readFileSync('index.js', 'utf8');
    console.log('✅ Arquivo lido com sucesso!');
    console.log('📊 Analisando arquivo...');
    console.log(`📏 Tamanho original: ${(originalCode.length / 1024).toFixed(2)}KB`);

    // Extrai componentes
    const components = extractComponents(originalCode);
    console.log('🔍 Componentes detectados:', components);

    // Beautify básico
    console.log('✨ Aplicando beautify...');
    const beautified = beautifyJS(originalCode);

    // Salva o resultado
    fs.writeFileSync('index-readable.js', beautified);

    console.log('✅ Arquivo salvo como: index-readable.js');
    console.log(`📏 Novo tamanho: ${(beautified.length / 1024).toFixed(2)}KB`);

    // Cria um resumo
    const summary = `
# RESUMO DA DESMINIFICAÇÃO

## Arquivo Original
- **Tamanho**: ${(originalCode.length / 1024).toFixed(2)}KB
- **Linhas**: ${originalCode.split('\n').length}

## Arquivo Processado  
- **Tamanho**: ${(beautified.length / 1024).toFixed(2)}KB
- **Linhas**: ${beautified.split('\n').length}

## Componentes Detectados
${Object.entries(components).map(([key, value]) => `- **${key}**: ${value} ocorrências`).join('\n')}

## Próximos Passos
1. Revisar o arquivo \`index-readable.js\`
2. Identificar funções principais
3. Extrair módulos separados
4. Reescrever código limpo
`;

    fs.writeFileSync('DESMINIFICACAO-RESUMO.md', summary);
    console.log('📄 Resumo salvo em: DESMINIFICACAO-RESUMO.md');

} catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
}