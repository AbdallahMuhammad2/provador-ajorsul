/**
 * Webpack Module 149
 * Type: misc
 * Pattern: 1
 * Size: 70 bytes
 * Features: none
 *
 * Original parameters: d, o, c
 */

// Original webpack module function
function webpackModule149(d, o, c) {

        c.d(o, {
            Z: function() {
                return b
}

// Export the module function
export default webpackModule149;

// Module metadata
export const metadata = {
    id: '149',
    type: 'misc',
    size: 70,
    features: [],
    params: 'd, o, c'
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
        webpackModule149.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 149:', error);
        return {};
    }
}
