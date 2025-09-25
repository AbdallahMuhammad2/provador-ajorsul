/**
 * Main Deobfuscation Script for Ring Tryon
 * Orchestrates the complete deobfuscation process
 */

import fs from 'fs';
import path from 'path';
import { extractAndOrganizeCSS } from './extract-css.js';
import { extractAndOrganizeModules } from './extract-modules.js';
import { extractAndOrganizeHTML } from './extract-html.js';

class DeobfuscationManager {
    constructor() {
        this.startTime = Date.now();
        this.steps = [
            { name: 'Verificação inicial', fn: this.verifySetup.bind(this) },
            { name: 'Backup de segurança', fn: this.createBackup.bind(this) },
            { name: 'Extração de CSS', fn: this.extractCSS.bind(this) },
            { name: 'Extração de HTML/DOM', fn: this.extractHTML.bind(this) },
            { name: 'Extração de módulos JS', fn: this.extractModules.bind(this) },
            { name: 'Organização final', fn: this.organizeFinal.bind(this) },
            { name: 'Validação', fn: this.validate.bind(this) }
        ];
        this.currentStep = 0;
    }

    async run() {
        console.log('🚀 Iniciando desminificação completa do Ring Tryon...\n');

        try {
            for (const step of this.steps) {
                console.log(`\n📋 PASSO ${this.currentStep + 1}/${this.steps.length}: ${step.name}`);
                console.log('='.repeat(60));

                await step.fn();

                console.log(`✅ ${step.name} concluído!`);
                this.currentStep++;
            }

            await this.generateFinalReport();
            console.log('\n🎉 DESMINIFICAÇÃO CONCLUÍDA COM SUCESSO! 🎉\n');

        } catch (error) {
            console.error(`\n❌ Erro no passo "${this.steps[this.currentStep].name}":`, error);
            throw error;
        }
    }

    async verifySetup() {
        console.log('🔍 Verificando configuração inicial...');

        // Verificar se arquivo minificado existe
        const minifiedPath = './index-minified-backup.js';
        if (!fs.existsSync(minifiedPath)) {
            throw new Error(`Arquivo minificado não encontrado: ${minifiedPath}`);
        }

        const stats = fs.statSync(minifiedPath);
        console.log(`📁 Arquivo encontrado: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

        // Verificar se scripts existem
        const scripts = ['extract-css.js', 'extract-modules.js', 'extract-html.js'];
        for (const script of scripts) {
            const scriptPath = path.join('./scripts', script);
            if (!fs.existsSync(scriptPath)) {
                throw new Error(`Script não encontrado: ${scriptPath}`);
            }
        }

        // Verificar se estrutura de diretórios existe
        const dirs = [
            'src', 'src/core', 'src/detection', 'src/ring', 'src/ui', 'src/camera', 'src/utils',
            'styles', 'styles/components', 'styles/themes', 'styles/ui',
            'templates', 'assets'
        ];

        for (const dir of dirs) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Criado diretório: ${dir}`);
            }
        }

        console.log('✅ Configuração verificada');
    }

    async createBackup() {
        console.log('💾 Criando backup de segurança...');

        const backupDir = './backups';
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `index-original-${timestamp}.js`);

        fs.copyFileSync('./index-minified-backup.js', backupPath);
        console.log(`💾 Backup criado: ${backupPath}`);

        // Backup do index.html atual se existir
        if (fs.existsSync('./index.html')) {
            const htmlBackupPath = path.join(backupDir, `index-html-${timestamp}.html`);
            fs.copyFileSync('./index.html', htmlBackupPath);
            console.log(`💾 Backup HTML criado: ${htmlBackupPath}`);
        }

        console.log('✅ Backups criados');
    }

    async extractCSS() {
        console.log('🎨 Iniciando extração de CSS...');
        await extractAndOrganizeCSS();
        console.log('✅ CSS extraído e organizado');
    }

    async extractHTML() {
        console.log('🏗️  Iniciando extração de HTML/DOM...');
        await extractAndOrganizeHTML();
        console.log('✅ HTML/DOM extraído e organizado');
    }

    async extractModules() {
        console.log('⚙️  Iniciando extração de módulos JavaScript...');
        await extractAndOrganizeModules();
        console.log('✅ Módulos JavaScript extraídos e organizados');
    }

    async organizeFinal() {
        console.log('📋 Organizando estrutura final...');

        // Criar main.js principal
        const mainJS = `/**
 * Ring Try-On Virtual System - Main Entry Point
 * Auto-generated from deobfuscated webpack bundle
 */

// Import all modules
import './core/index.js';
import './detection/index.js';
import './ring/index.js';
import './ui/index.js';
import './camera/index.js';
import './utils/index.js';

// Import template manager
import { templateManager, TEMPLATES } from '../templates/template-manager.js';

class RingTryOnApp {
    constructor() {
        this.initialized = false;
        this.templateManager = templateManager;
    }

    async initialize() {
        try {
            console.log('🚀 Inicializando Ring Try-On App...');

            // Load main template
            await this.loadMainInterface();

            // Initialize modules in sequence
            await this.initializeModules();

            this.initialized = true;
            console.log('✅ Ring Try-On App inicializado com sucesso!');

        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            throw error;
        }
    }

    async loadMainInterface() {
        const appContainer = document.getElementById('app-container');
        if (!appContainer) {
            throw new Error('Container principal não encontrado');
        }

        // Load canvas container
        await this.templateManager.renderTemplate(TEMPLATES.CANVAS_CONTAINER, appContainer);

        // Load control panel
        const controlPanel = document.createElement('div');
        controlPanel.id = 'control-panel-container';
        appContainer.appendChild(controlPanel);
        await this.templateManager.renderTemplate(TEMPLATES.CONTROL_PANEL, controlPanel);
    }

    async initializeModules() {
        // This will be populated with actual module initialization
        // based on the extracted modules
        console.log('📦 Módulos carregados (placeholder)');
    }

    dispose() {
        if (this.initialized) {
            // Cleanup logic
            this.initialized = false;
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

async function initApp() {
    try {
        const app = new RingTryOnApp();
        await app.initialize();

        // Expose globally for debugging
        window.ringTryOnApp = app;

    } catch (error) {
        console.error('❌ Falha ao iniciar aplicação:', error);
    }
}

export { RingTryOnApp };
`;

        fs.writeFileSync('./src/main.js', mainJS);
        console.log('✅ Criado: src/main.js');

        // Atualizar package.json se necessário
        const packagePath = './package.json';
        if (fs.existsSync(packagePath)) {
            const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            // Adicionar scripts de build para a nova estrutura
            pkg.scripts = pkg.scripts || {};
            pkg.scripts['build:deobfuscated'] = 'vite build --config vite.deobfuscated.config.js';
            pkg.scripts['dev:deobfuscated'] = 'vite --config vite.deobfuscated.config.js';

            fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
            console.log('✅ Package.json atualizado');
        }

        // Criar configuração Vite para versão desobfuscada
        const viteConfig = `import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist-deobfuscated',
        rollupOptions: {
            input: {
                main: './index-new.html'
            }
        }
    },
    server: {
        port: 3002,
        host: true
    }
});
`;

        fs.writeFileSync('./vite.deobfuscated.config.js', viteConfig);
        console.log('✅ Criado: vite.deobfuscated.config.js');

        console.log('✅ Estrutura final organizada');
    }

    async validate() {
        console.log('🔍 Validando estrutura criada...');

        const requiredFiles = [
            'src/main.js',
            'styles/main.css',
            'templates/template-manager.js',
            'index-new.html'
        ];

        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`Arquivo obrigatório não encontrado: ${file}`);
            }
            console.log(`✅ ${file} - OK`);
        }

        const requiredDirs = [
            'src/core',
            'src/detection',
            'src/ring',
            'src/ui',
            'src/camera',
            'src/utils',
            'styles/components',
            'templates'
        ];

        for (const dir of requiredDirs) {
            if (!fs.existsSync(dir)) {
                throw new Error(`Diretório obrigatório não encontrado: ${dir}`);
            }

            // Verificar se há pelo menos um arquivo no diretório
            const files = fs.readdirSync(dir);
            if (files.length === 0) {
                console.warn(`⚠️  Diretório vazio: ${dir}`);
            } else {
                console.log(`✅ ${dir} - ${files.length} arquivos`);
            }
        }

        console.log('✅ Validação concluída');
    }

    async generateFinalReport() {
        const endTime = Date.now();
        const duration = ((endTime - this.startTime) / 1000).toFixed(2);

        // Coletar estatísticas
        const stats = {
            executionTime: `${duration}s`,
            timestamp: new Date().toISOString(),
            files: {
                js: this.countFiles('src', '.js'),
                css: this.countFiles('styles', '.css'),
                html: this.countFiles('templates', '.html'),
                json: this.countFiles('.', '.json')
            },
            directories: {
                src: fs.readdirSync('src').length,
                styles: fs.readdirSync('styles').length,
                templates: fs.readdirSync('templates').length
            },
            originalSize: this.getFileSize('./index-minified-backup.js'),
            newStructureSize: this.getDirectorySize('./src') + this.getDirectorySize('./styles') + this.getDirectorySize('./templates')
        };

        const report = `# Ring Tryon Deobfuscation Report

## Execution Summary
- **Duration**: ${duration} seconds
- **Completed**: ${new Date().toLocaleString()}
- **Status**: ✅ SUCCESS

## Files Created
- **JavaScript Modules**: ${stats.files.js}
- **CSS Files**: ${stats.files.css}
- **HTML Templates**: ${stats.files.html}
- **JSON Configs**: ${stats.files.json}

## Directory Structure
\`\`\`
ring-tryon/
├── src/ (${stats.directories.src} items)
├── styles/ (${stats.directories.styles} items)
├── templates/ (${stats.directories.templates} items)
├── index-new.html
└── vite.deobfuscated.config.js
\`\`\`

## Size Comparison
- **Original Minified**: ${(stats.originalSize / 1024 / 1024).toFixed(2)}MB
- **New Structure**: ${(stats.newStructureSize / 1024 / 1024).toFixed(2)}MB
- **Difference**: ${((stats.newStructureSize - stats.originalSize) / 1024 / 1024).toFixed(2)}MB

## Next Steps
1. Test the deobfuscated version:
   \`\`\`bash
   npm run dev:deobfuscated
   \`\`\`

2. Build for production:
   \`\`\`bash
   npm run build:deobfuscated
   \`\`\`

3. Compare functionality with original

## Files Generated
${this.listGeneratedFiles()}

---
*Report generated by Ring Tryon Deobfuscation System*
`;

        fs.writeFileSync('DEOBFUSCATION_REPORT.md', report);

        console.log('\n📊 RELATÓRIO FINAL:');
        console.log(`⏱️  Tempo de execução: ${duration}s`);
        console.log(`📁 Arquivos JS criados: ${stats.files.js}`);
        console.log(`🎨 Arquivos CSS criados: ${stats.files.css}`);
        console.log(`🏗️  Templates HTML criados: ${stats.files.html}`);
        console.log(`📊 Tamanho original: ${(stats.originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`📊 Nova estrutura: ${(stats.newStructureSize / 1024 / 1024).toFixed(2)}MB`);

        console.log('\n📋 Próximos passos:');
        console.log('1. npm run dev:deobfuscated (testar versão desobfuscada)');
        console.log('2. npm run build:deobfuscated (build de produção)');
        console.log('3. Comparar funcionalidade com versão original');
    }

    countFiles(dir, ext) {
        if (!fs.existsSync(dir)) return 0;

        let count = 0;
        const scan = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scan(fullPath);
                } else if (fullPath.endsWith(ext)) {
                    count++;
                }
            }
        };

        scan(dir);
        return count;
    }

    getFileSize(filePath) {
        if (!fs.existsSync(filePath)) return 0;
        return fs.statSync(filePath).size;
    }

    getDirectorySize(dirPath) {
        if (!fs.existsSync(dirPath)) return 0;

        let size = 0;
        const scan = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scan(fullPath);
                } else {
                    size += stat.size;
                }
            }
        };

        scan(dirPath);
        return size;
    }

    listGeneratedFiles() {
        const files = [];
        const scan = (dir, relative = '') => {
            if (!fs.existsSync(dir)) return;

            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const relativePath = path.join(relative, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory() && !item.startsWith('.')) {
                    scan(fullPath, relativePath);
                } else if (stat.isFile() && !item.startsWith('.')) {
                    files.push(`- ${relativePath}`);
                }
            }
        };

        scan('src', 'src');
        scan('styles', 'styles');
        scan('templates', 'templates');

        return files.join('\n');
    }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    const manager = new DeobfuscationManager();
    manager.run().catch(console.error);
}

export { DeobfuscationManager };