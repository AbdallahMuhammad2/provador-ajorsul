/**
 * Webpack Module 3986
 * Type: ring
 * Pattern: 3
 * Size: 88 bytes
 * Features: none
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule3986(d) {

    return d.replace(/[!'()*]/g, o => "%" + o.charCodeAt(0).toString(16).toUpperCase())
}

// Export the module function
export default webpackModule3986;

// Module metadata
export const metadata = {
    id: '3986',
    type: 'ring',
    size: 88,
    features: [],
    params: 'd'
};

// Helper to execute the module with dependencies
export function executeModule(moduleRegistry, globalScope = {}) {
    const moduleObj = { exports: {} };
    const require = (id) => {
        if (moduleRegistry.has(id)) {
            return moduleRegistry.get(id);
        }
        console.warn('Module ' + id + ' not found in registry');
        return {};
    };

    try {
        webpackModule3986.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 3986:', error);
        return {};
    }
}
