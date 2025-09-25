/**
 * Webpack Module 364
 * Type: ring
 * Pattern: 1
 * Size: 265 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule364(d) {

        d.exports = function(o) {
            var c = [];
            return c.toString = function() {
                return this.map(function(h) {
                    var _ = o(h);
                    return h[2] ? "@media ".concat(h[2], " {").concat(_, "}") : _
}

// Export the module function
export default webpackModule364;

// Module metadata
export const metadata = {
    id: '364',
    type: 'ring',
    size: 265,
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
        webpackModule364.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 364:', error);
        return {};
    }
}
