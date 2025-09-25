/**
 * HTML/DOM Extractor for Ring Tryon Deobfuscation
 * Extracts dynamic HTML creation patterns from minified bundle
 */

import fs from 'fs';
import path from 'path';

function extractDOMCreationPatterns(content) {
    console.log('🏗️  Procurando padrões de criação de DOM...');

    const patterns = [
        // createElement patterns
        /document\.createElement\(['"`]([^'"`]+)['"`]\)/g,
        /createElement\(['"`]([^'"`]+)['"`]\)/g,

        // innerHTML patterns
        /\.innerHTML\s*=\s*['"`]([^'"`]*?)['"`]/gs,

        // appendChild patterns with context
        /(\w+)\.appendChild\(([^)]+)\)/g,

        // CSS class assignments
        /\.className\s*=\s*['"`]([^'"`]+)['"`]/g,
        /\.classList\.add\(['"`]([^'"`]+)['"`]\)/g,

        // ID assignments
        /\.id\s*=\s*['"`]([^'"`]+)['"`]/g,

        // Style assignments
        /\.style\.(\w+)\s*=\s*['"`]([^'"`]+)['"`]/g,

        // Event listener attachments
        /addEventListener\(['"`]([^'"`]+)['"`],\s*([^,)]+)/g,

        // Attribute setting
        /\.setAttribute\(['"`]([^'"`]+)['"`],\s*['"`]([^'"`]+)['"`]\)/g
    ];

    const domOperations = [];
    let totalMatches = 0;

    patterns.forEach((pattern, patternIndex) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            domOperations.push({
                type: getOperationType(patternIndex),
                match: match[0],
                params: Array.from(match).slice(1),
                position: match.index,
                pattern: patternIndex
            });
            totalMatches++;
        }
        pattern.lastIndex = 0;
    });

    console.log(`📊 Encontradas ${totalMatches} operações DOM`);
    return domOperations;
}

function getOperationType(patternIndex) {
    const types = [
        'createElement',
        'createElement',
        'innerHTML',
        'appendChild',
        'className',
        'classList',
        'id',
        'style',
        'eventListener',
        'setAttribute'
    ];
    return types[patternIndex] || 'unknown';
}

function analyzeDOMStructure(operations) {
    console.log('🔍 Analisando estrutura DOM...');

    const structure = {
        elements: new Set(),
        classes: new Set(),
        ids: new Set(),
        events: new Set(),
        templates: []
    };

    // Agrupar operações por tipo
    const byType = operations.reduce((acc, op) => {
        if (!acc[op.type]) acc[op.type] = [];
        acc[op.type].push(op);
        return acc;
    }, {});

    // Processar createElement
    if (byType.createElement) {
        byType.createElement.forEach(op => {
            if (op.params[0]) {
                structure.elements.add(op.params[0]);
            }
        });
    }

    // Processar className e classList
    if (byType.className) {
        byType.className.forEach(op => {
            if (op.params[0]) {
                op.params[0].split(/\s+/).forEach(cls => {
                    if (cls.trim()) structure.classes.add(cls.trim());
                });
            }
        });
    }

    if (byType.classList) {
        byType.classList.forEach(op => {
            if (op.params[0]) {
                structure.classes.add(op.params[0]);
            }
        });
    }

    // Processar IDs
    if (byType.id) {
        byType.id.forEach(op => {
            if (op.params[0]) {
                structure.ids.add(op.params[0]);
            }
        });
    }

    // Processar eventos
    if (byType.eventListener) {
        byType.eventListener.forEach(op => {
            if (op.params[0]) {
                structure.events.add(op.params[0]);
            }
        });
    }

    // Identificar templates comuns
    structure.templates = identifyCommonTemplates(operations);

    return structure;
}

function identifyCommonTemplates(operations) {
    console.log('🎨 Identificando templates comuns...');

    const templates = [];

    // Template de loading screen
    const loadingElements = operations.filter(op =>
        (op.type === 'className' && /loading|spinner|progress/.test(op.params[0])) ||
        (op.type === 'id' && /loading|spinner|progress/.test(op.params[0]))
    );

    if (loadingElements.length > 0) {
        templates.push({
            name: 'loading-screen',
            elements: loadingElements,
            description: 'Loading screen with spinner'
        });
    }

    // Template de modal
    const modalElements = operations.filter(op =>
        (op.type === 'className' && /modal|overlay|popup|dialog/.test(op.params[0])) ||
        (op.type === 'id' && /modal|overlay|popup|dialog/.test(op.params[0]))
    );

    if (modalElements.length > 0) {
        templates.push({
            name: 'modal-system',
            elements: modalElements,
            description: 'Modal dialog system'
        });
    }

    // Template de controles
    const controlElements = operations.filter(op =>
        (op.type === 'className' && /control|button|btn|input|slider/.test(op.params[0])) ||
        (op.type === 'id' && /control|button|btn|input|slider/.test(op.params[0]))
    );

    if (controlElements.length > 0) {
        templates.push({
            name: 'control-panel',
            elements: controlElements,
            description: 'Control panel interface'
        });
    }

    // Template de canvas
    const canvasElements = operations.filter(op =>
        (op.type === 'createElement' && op.params[0] === 'canvas') ||
        (op.type === 'id' && /canvas|webgl|three/.test(op.params[0]))
    );

    if (canvasElements.length > 0) {
        templates.push({
            name: 'canvas-container',
            elements: canvasElements,
            description: 'WebGL canvas container'
        });
    }

    return templates;
}

function generateHTMLTemplate(templateData, structure) {
    const { name, elements, description } = templateData;

    let html = `<!DOCTYPE html>
<!-- ${description} -->
<div class="${name}">
`;

    // Adicionar elementos baseados nos padrões encontrados
    switch (name) {
        case 'loading-screen':
            html += `  <div class="loading-overlay">
    <div class="loading-spinner"></div>
    <div class="loading-text">Loading...</div>
  </div>
`;
            break;

        case 'modal-system':
            html += `  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Modal Title</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <!-- Modal content -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
`;
            break;

        case 'control-panel':
            html += `  <div class="control-panel">
    <div class="control-section">
      <h4>Ring Controls</h4>
      <div class="control-group">
        <button class="btn btn-ring" data-ring="1">Ring 1</button>
        <button class="btn btn-ring" data-ring="2">Ring 2</button>
        <button class="btn btn-ring" data-ring="3">Ring 3</button>
      </div>
    </div>
    <div class="control-section">
      <h4>Camera Controls</h4>
      <div class="control-group">
        <button class="btn btn-camera" data-action="flip">Flip Camera</button>
        <button class="btn btn-camera" data-action="capture">Capture</button>
      </div>
    </div>
  </div>
`;
            break;

        case 'canvas-container':
            html += `  <div class="canvas-wrapper">
    <canvas id="webgi-canvas" class="webgl-canvas"></canvas>
    <div class="canvas-overlay">
      <!-- UI overlays -->
    </div>
  </div>
`;
            break;

        default:
            html += `  <!-- Template: ${name} -->
  <div class="template-content">
    <!-- Content will be generated dynamically -->
  </div>
`;
    }

    html += `</div>
`;

    return html;
}

async function extractAndOrganizeHTML() {
    try {
        console.log('🚀 Iniciando extração de HTML/DOM...');

        // Ler arquivo minificado
        const minifiedPath = './index-minified-backup.js';
        if (!fs.existsSync(minifiedPath)) {
            throw new Error(`Arquivo não encontrado: ${minifiedPath}`);
        }

        const content = fs.readFileSync(minifiedPath, 'utf8');
        console.log(`📁 Arquivo lido: ${(content.length / 1024 / 1024).toFixed(2)}MB`);

        // Extrair operações DOM
        const operations = extractDOMCreationPatterns(content);

        if (operations.length === 0) {
            console.log('⚠️  Nenhuma operação DOM encontrada');
            return;
        }

        // Analisar estrutura
        const structure = analyzeDOMStructure(operations);

        // Criar diretório de templates
        if (!fs.existsSync('templates')) {
            fs.mkdirSync('templates', { recursive: true });
        }

        // Gerar templates HTML
        console.log('📝 Criando templates HTML...');

        const createdTemplates = [];

        structure.templates.forEach(template => {
            const html = generateHTMLTemplate(template, structure);
            const filename = `${template.name}.html`;
            const filepath = path.join('templates', filename);

            fs.writeFileSync(filepath, html);
            createdTemplates.push({
                name: template.name,
                file: filepath,
                description: template.description,
                elements: template.elements.length
            });

            console.log(`✅ Criado: ${filepath} (${template.elements.length} elementos)`);
        });

        // Criar main index template
        const mainTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring Try-On Virtual System</title>
    <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
    <div id="root">
        <!-- Main application container -->
        <div id="app-container">
            <!-- Templates will be loaded here dynamically -->
        </div>
    </div>

    <!-- Load main application -->
    <script type="module" src="./src/main.js"></script>
</body>
</html>`;

        fs.writeFileSync('index-new.html', mainTemplate);
        console.log('✅ Criado: index-new.html');

        // Gerar arquivo de estrutura DOM
        const domStructure = {
            elements: Array.from(structure.elements),
            classes: Array.from(structure.classes),
            ids: Array.from(structure.ids),
            events: Array.from(structure.events),
            templates: structure.templates.map(t => ({
                name: t.name,
                description: t.description,
                elementCount: t.elements.length
            }))
        };

        fs.writeFileSync('templates/dom-structure.json', JSON.stringify(domStructure, null, 2));
        console.log('📊 Estrutura DOM salva: templates/dom-structure.json');

        // Gerar helper JavaScript para templates
        const templateHelper = `/**
 * Template Helper for Ring Tryon
 * Auto-generated from DOM analysis
 */

export class TemplateManager {
    constructor() {
        this.templates = new Map();
        this.loadedTemplates = new Set();
    }

    async loadTemplate(name) {
        if (this.loadedTemplates.has(name)) {
            return this.templates.get(name);
        }

        try {
            const response = await fetch(\`./templates/\${name}.html\`);
            const html = await response.text();

            this.templates.set(name, html);
            this.loadedTemplates.add(name);

            return html;
        } catch (error) {
            console.error(\`Failed to load template \${name}:\`, error);
            return null;
        }
    }

    async renderTemplate(name, container) {
        const html = await this.loadTemplate(name);
        if (html && container) {
            container.innerHTML = html;
            this.bindEvents(name, container);
        }
        return container;
    }

    bindEvents(templateName, container) {
        // Template-specific event binding
        switch (templateName) {
            case 'control-panel':
                this.bindControlPanelEvents(container);
                break;
            case 'modal-system':
                this.bindModalEvents(container);
                break;
            // Add more cases as needed
        }
    }

    bindControlPanelEvents(container) {
        const ringButtons = container.querySelectorAll('.btn-ring');
        ringButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ringId = e.target.getAttribute('data-ring');
                window.dispatchEvent(new CustomEvent('ring-selected', { detail: ringId }));
            });
        });

        const cameraButtons = container.querySelectorAll('.btn-camera');
        cameraButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                window.dispatchEvent(new CustomEvent('camera-action', { detail: action }));
            });
        });
    }

    bindModalEvents(container) {
        const closeBtn = container.querySelector('.modal-close');
        const overlay = container.querySelector('.modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                container.style.display = 'none';
            });
        }

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    container.style.display = 'none';
                }
            });
        }
    }
}

// Global template manager instance
export const templateManager = new TemplateManager();

// Available templates
export const TEMPLATES = {
${structure.templates.map(t => `    ${t.name.toUpperCase().replace(/-/g, '_')}: '${t.name}'`).join(',\n')}
};
`;

        fs.writeFileSync('templates/template-manager.js', templateHelper);
        console.log('✅ Criado: templates/template-manager.js');

        // Gerar relatório
        const report = {
            totalOperations: operations.length,
            byType: operations.reduce((acc, op) => {
                acc[op.type] = (acc[op.type] || 0) + 1;
                return acc;
            }, {}),
            structure: domStructure,
            templates: createdTemplates,
            extractionDate: new Date().toISOString()
        };

        fs.writeFileSync('templates/extraction-report.json', JSON.stringify(report, null, 2));
        console.log('📊 Relatório criado: templates/extraction-report.json');

        console.log('\n🎉 Extração de HTML/DOM concluída!');
        console.log(`📈 Estatísticas:`);
        console.log(`   - ${operations.length} operações DOM analisadas`);
        console.log(`   - ${structure.elements.size} tipos de elementos identificados`);
        console.log(`   - ${structure.classes.size} classes CSS encontradas`);
        console.log(`   - ${structure.ids.size} IDs identificados`);
        console.log(`   - ${structure.templates.length} templates criados`);

    } catch (error) {
        console.error('❌ Erro na extração de HTML:', error);
        throw error;
    }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    extractAndOrganizeHTML();
}

export { extractAndOrganizeHTML, extractDOMCreationPatterns, analyzeDOMStructure };