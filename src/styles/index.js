/**
 * CSS Modules Index
 * 2 webpack modules
 */

import webpackModule827, { metadata as meta827, executeModule as exec827 } from './webpack-module-827.js';
import webpackModule589, { metadata as meta589, executeModule as exec589 } from './webpack-module-589.js';

// All modules of this type
export const modules = {
    '827': webpackModule827,
    '589': webpackModule589
};

// All metadata
export const metadata = {
    '827': meta827,
    '589': meta589
};

// All executors
export const executors = {
    '827': exec827,
    '589': exec589
};

// Module count
export const MODULE_COUNT = 2;

// Create a module registry for this type
export function createModuleRegistry() {
    const registry = new Map();

    // Initialize all modules
    Object.entries(executors).forEach(([id, executor]) => {
        try {
            const result = executor(registry);
            registry.set(id, result);
        } catch (error) {
            console.warn('Failed to initialize module ' + id + ':', error.message);
        }
    });

    return registry;
}

export default {
    modules,
    metadata,
    executors,
    MODULE_COUNT,
    createModuleRegistry
};
