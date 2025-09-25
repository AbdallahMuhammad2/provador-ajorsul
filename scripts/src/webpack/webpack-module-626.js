/**
 * Webpack Module 626
 * Type: webpack-runtime
 * Pattern: 1
 * Size: 104 bytes
 * Features: es6
 *
 * Original parameters: d, o, c
 */

// Original webpack module function
function webpackModule626(d, o, c) {

        d.exports = function(h) {
            var _ = c.nc;
            _ && h.setAttribute("nonce", _)
}

// Export the module function
export default webpackModule626;

// Module metadata
export const metadata = {
    id: '626',
    type: 'webpack-runtime',
    size: 104,
    features: ["es6"],
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
        webpackModule626.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 626:', error);
        return {};
    }
}
