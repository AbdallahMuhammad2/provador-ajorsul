/**
 * Webpack Module 17
 * Type: webgl
 * Pattern: 1
 * Size: 36 bytes
 * Features: none
 *
 * Original parameters: 
 */

// Original webpack module function
function webpackModule17() {

        return copyMaterialUserData
}

// Export the module function
export default webpackModule17;

// Module metadata
export const metadata = {
    id: '17`,
    type: `webgl`,
    size: 36,
    features: [],
    params: `'
};

// Helper to execute the module with dependencies
export function executeModule(moduleRegistry, globalScope = {}) {
    const moduleObj = { exports: {} };
    const require = (id) => {
        if (moduleRegistry.has(id)) {
            return moduleRegistry.get(id)
        }
        console.warn('Module ' + id + ' not found in registry`);
        return {}
    };

    try {
        webpackModule17.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports
    } catch (error) {
        console.error(`Error executing module 17:', error);
        return {}
    }
}
