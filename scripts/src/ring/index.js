/**
 * RING Modules Index
 * 6 webpack modules
 */

import webpackModule364, { metadata as meta364, executeModule as exec364 } from './webpack-module-364.js';
import webpackModule155, { metadata as meta155, executeModule as exec155 } from './webpack-module-155.js';
import webpackModule645, { metadata as meta645, executeModule as exec645 } from './webpack-module-645.js';
import webpackModule537, { metadata as meta537, executeModule as exec537 } from './webpack-module-537.js';
import webpackModule795, { metadata as meta795, executeModule as exec795 } from './webpack-module-795.js';
import webpackModule3986, { metadata as meta3986, executeModule as exec3986 } from './webpack-module-3986.js';

// All modules of this type
export const modules = {
    '364': webpackModule364,
    '155': webpackModule155,
    '645': webpackModule645,
    '537': webpackModule537,
    '795': webpackModule795,
    '3986': webpackModule3986
};

// All metadata
export const metadata = {
    '364': meta364,
    '155': meta155,
    '645': meta645,
    '537': meta537,
    '795': meta795,
    '3986': meta3986
};

// All executors
export const executors = {
    '364': exec364,
    '155': exec155,
    '645': exec645,
    '537': exec537,
    '795': exec795,
    '3986': exec3986
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
