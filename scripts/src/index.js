/**
 * Master Module Index - All Webpack Modules
 * Auto-extracted from minified bundle
 * Total modules: 73
 */

import miscModules from './misc/index.js';
import webpackruntimeModules from './webpack/index.js';
import ringModules from './ring/index.js';
import polyfillModules from './polyfills/index.js';
import utilsModules from './utils/index.js';
import uiModules from './ui/index.js';
import cssModules from './styles/index.js';
import webglModules from './core/index.js';

// All module categories
export const moduleCategories = {
    misc: miscModules,
    webpack-runtime: webpackruntimeModules,
    ring: ringModules,
    polyfill: polyfillModules,
    utils: utilsModules,
    ui: uiModules,
    css: cssModules,
    webgl: webglModules
};

// Global module registry
export class GlobalModuleRegistry {
    constructor() {
        this.registries = new Map();
        this.globalRegistry = new Map();
        this.initializeAll();
    }

    initializeAll() {
        Object.entries(moduleCategories).forEach(([type, categoryModule]) => {
            const registry = categoryModule.createModuleRegistry();
            this.registries.set(type, registry);

            // Add to global registry
            registry.forEach((exports, id) => {
                this.globalRegistry.set(id, exports);
            });
        });

        console.log(`📦 Global registry initialized with ${this.globalRegistry.size} modules`);
    }

    getModule(id) {
        return this.globalRegistry.get(id);
    }

    getModulesByType(type) {
        return this.registries.get(type);
    }

    executeModule(id) {
        const module = this.getModule(id);
        if (module) {
            return module;
        }

        console.warn(`Module ${id} not found in global registry`);
        return null;
    }

    listModules() {
        console.log('📋 Available modules:');
        this.globalRegistry.forEach((exports, id) => {
            console.log(`  - Module ${id}`);
        });
    }

    getStats() {
        return {
            totalModules: this.globalRegistry.size,
            categories: Object.keys(moduleCategories).length,
            categoryCounts: Object.entries(moduleCategories).map(([type, cat]) => ({
                type,
                count: cat.MODULE_COUNT
            }))
        };
    }
}

// Create global instance
export const globalRegistry = new GlobalModuleRegistry();

// Shorthand functions
export const getModule = (id) => globalRegistry.getModule(id);
export const executeModule = (id) => globalRegistry.executeModule(id);
export const listModules = () => globalRegistry.listModules();
export const getStats = () => globalRegistry.getStats();

export default {
    moduleCategories,
    GlobalModuleRegistry,
    globalRegistry,
    getModule,
    executeModule,
    listModules,
    getStats
};
