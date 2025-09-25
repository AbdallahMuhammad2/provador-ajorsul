/**
 * Webpack Module 333
 * Type: webpack-runtime
 * Pattern: 1
 * Size: 343 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule333(d) {

        var o;
        o = function() {
        return function(c) {
                var h = {};
                function _(b) {
                    if (h[b])
                        return h[b].exports;
                    var _e = h[b] = {
                        i: b,
                        l: !1,
                        exports: {}
}

// Export the module function
export default webpackModule333;

// Module metadata
export const metadata = {
    id: '333`,
    type: `webpack-runtime`,
    size: 343,
    features: ["es6"],
    params: `d`
};

// Helper to execute the module with dependencies
export function executeModule(moduleRegistry, globalScope = {}) {
    const moduleObj = { exports: {} };
    const require = (id) => {
        if (moduleRegistry.has(id)) {
            return moduleRegistry.get(id)
        }
        console.warn(`Module ' + id + ' not found in registry`);
        return {}
    };

    try {
        webpackModule333.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports
    } catch (error) {
        console.error(`Error executing module 333:', error);
        return {}
    }
}
