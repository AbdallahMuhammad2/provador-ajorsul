/**
 * Webpack Module 881
 * Type: misc
 * Pattern: 1
 * Size: 152 bytes
 * Features: none
 *
 * Original parameters: d, o, c
 */

// Original webpack module function
function webpackModule881(d, o, c) {

        var h = c(981)
          , _ = c(872)
          , b = typeof Float64Array < "u";
        function _e(ut, pt) {
            return ut[0] - pt[0]
}

// Export the module function
export default webpackModule881;

// Module metadata
export const metadata = {
    id: '881',
    type: 'misc',
    size: 152,
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
        webpackModule881.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 881:', error);
        return {};
    }
}
