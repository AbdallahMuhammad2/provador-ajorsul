/**
 * WEBGL Modules Index
 * 17 webpack modules
 */

import webpackModule2, { metadata as meta2, executeModule as exec2 } from './webpack-module-2.js';
import webpackModule8, { metadata as meta8, executeModule as exec8 } from './webpack-module-8.js';
import webpackModule3, { metadata as meta3, executeModule as exec3 } from './webpack-module-3.js';
import webpackModule4, { metadata as meta4, executeModule as exec4 } from './webpack-module-4.js';
import webpackModule5, { metadata as meta5, executeModule as exec5 } from './webpack-module-5.js';
import webpackModule1, { metadata as meta1, executeModule as exec1 } from './webpack-module-1.js';
import webpackModule7, { metadata as meta7, executeModule as exec7 } from './webpack-module-7.js';
import webpackModule20, { metadata as meta20, executeModule as exec20 } from './webpack-module-20.js';
import webpackModule58, { metadata as meta58, executeModule as exec58 } from './webpack-module-58.js';
import webpackModule30, { metadata as meta30, executeModule as exec30 } from './webpack-module-30.js';
import webpackModule52, { metadata as meta52, executeModule as exec52 } from './webpack-module-52.js';
import webpackModule31, { metadata as meta31, executeModule as exec31 } from './webpack-module-31.js';
import webpackModule69, { metadata as meta69, executeModule as exec69 } from './webpack-module-69.js';
import webpackModule90, { metadata as meta90, executeModule as exec90 } from './webpack-module-90.js';
import webpackModule23, { metadata as meta23, executeModule as exec23 } from './webpack-module-23.js';
import webpackModule17, { metadata as meta17, executeModule as exec17 } from './webpack-module-17.js';
import webpackModule360, { metadata as meta360, executeModule as exec360 } from './webpack-module-360.js';

// All modules of this type
export const modules = {
    '2': webpackModule2,
    '8': webpackModule8,
    '3': webpackModule3,
    '4': webpackModule4,
    '5': webpackModule5,
    '1': webpackModule1,
    '7': webpackModule7,
    '20': webpackModule20,
    '58': webpackModule58,
    '30': webpackModule30,
    '52': webpackModule52,
    '31': webpackModule31,
    '69': webpackModule69,
    '90': webpackModule90,
    '23': webpackModule23,
    '17': webpackModule17,
    '360': webpackModule360
};

// All metadata
export const metadata = {
    '2': meta2,
    '8': meta8,
    '3': meta3,
    '4': meta4,
    '5': meta5,
    '1': meta1,
    '7': meta7,
    '20': meta20,
    '58': meta58,
    '30': meta30,
    '52': meta52,
    '31': meta31,
    '69': meta69,
    '90': meta90,
    '23': meta23,
    '17': meta17,
    '360': meta360
};

// All executors
export const executors = {
    '2': exec2,
    '8': exec8,
    '3': exec3,
    '4': exec4,
    '5': exec5,
    '1': exec1,
    '7': exec7,
    '20': exec20,
    '58': exec58,
    '30': exec30,
    '52': exec52,
    '31': exec31,
    '69': exec69,
    '90': exec90,
    '23': exec23,
    '17': exec17,
    '360': exec360
};

// Module count
export const MODULE_COUNT = 17;

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
