/**
 * UI Modules Index
 * 5 webpack modules
 */

import webpackModule990, { metadata as meta990, executeModule as exec990 } from './webpack-module-990.js';
import webpackModule216, { metadata as meta216, executeModule as exec216 } from './webpack-module-216.js';
import webpackModule957, { metadata as meta957, executeModule as exec957 } from './webpack-module-957.js';
import webpackModule32, { metadata as meta32, executeModule as exec32 } from './webpack-module-32.js';
import webpackModule64, { metadata as meta64, executeModule as exec64 } from './webpack-module-64.js';

// All modules of this type
export const modules = {
    '990': webpackModule990,
    '216': webpackModule216,
    '957': webpackModule957,
    '32': webpackModule32,
    '64': webpackModule64
};

// All metadata
export const metadata = {
    '990': meta990,
    '216': meta216,
    '957': meta957,
    '32': meta32,
    '64': meta64
};

// All executors
export const executors = {
    '990': exec990,
    '216': exec216,
    '957': exec957,
    '32': exec32,
    '64': exec64
};

// Module count
export const MODULE_COUNT = 5;

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
