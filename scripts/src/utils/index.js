/**
 * UTILS Modules Index
 * 2 webpack modules
 */

import webpackModule986, { metadata as meta986, executeModule as exec986 } from './webpack-module-986.js';
import webpackModule44, { metadata as meta44, executeModule as exec44 } from './webpack-module-44.js';

// All modules of this type
export const modules = {
    '986': webpackModule986,
    '44': webpackModule44
};

// All metadata
export const metadata = {
    '986': meta986,
    '44': meta44
};

// All executors
export const executors = {
    '986': exec986,
    '44': exec44
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
