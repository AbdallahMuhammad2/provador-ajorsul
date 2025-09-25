/**
 * WEBPACK-RUNTIME Modules Index
 * 6 webpack modules
 */

import webpackModule333, { metadata as meta333, executeModule as exec333 } from './webpack-module-333.js';
import webpackModule981, { metadata as meta981, executeModule as exec981 } from './webpack-module-981.js';
import webpackModule516, { metadata as meta516, executeModule as exec516 } from './webpack-module-516.js';
import webpackModule626, { metadata as meta626, executeModule as exec626 } from './webpack-module-626.js';
import webpackModule530, { metadata as meta530, executeModule as exec530 } from './webpack-module-530.js';
import webpackModule161, { metadata as meta161, executeModule as exec161 } from './webpack-module-161.js';

// All modules of this type
export const modules = {
    '333': webpackModule333,
    '981': webpackModule981,
    '516': webpackModule516,
    '626': webpackModule626,
    '530': webpackModule530,
    '161': webpackModule161
};

// All metadata
export const metadata = {
    '333': meta333,
    '981': meta981,
    '516': meta516,
    '626': meta626,
    '530': meta530,
    '161': meta161
};

// All executors
export const executors = {
    '333': exec333,
    '981': exec981,
    '516': exec516,
    '626': exec626,
    '530': exec530,
    '161': exec161
};

// Module count
export const MODULE_COUNT = 6;

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
