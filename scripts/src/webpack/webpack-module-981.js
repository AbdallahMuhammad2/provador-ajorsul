/**
 * Webpack Module 981
 * Type: webpack-runtime
 * Pattern: 1
 * Size: 139 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule981(d) {

        d.exports = function(o) {
            for (var c = new Array(o), h = 0; h < o; ++h)
                c[h] = h;
            return c
}

// Export the module function
export default webpackModule981;

// Module metadata
export const metadata = {
    id: '981',
    type: 'webpack-runtime',
    size: 139,
    features: ["es6"],
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
        webpackModule981.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 981:', error);
        return {};
    }
}
