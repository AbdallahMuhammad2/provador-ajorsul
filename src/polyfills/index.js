/**
 * POLYFILL Modules Index
 * 1 webpack modules
 */

import webpackModule101, { metadata as meta101, executeModule as exec101 } from './webpack-module-101.js';

// All modules of this type
export const modules = {
    '101': webpackModule101
};

// All metadata
export const metadata = {
    '101': meta101
};

// All executors
export const executors = {
    '101': exec101
};

// Module count
export const MODULE_COUNT = 1;

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
