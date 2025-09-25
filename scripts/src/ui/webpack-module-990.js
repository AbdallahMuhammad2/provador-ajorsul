/**
 * Webpack Module 990
 * Type: ui
 * Pattern: 1
 * Size: 190 bytes
 * Features: es6, dom
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule990(d) {

        d.exports = function(o) {
            var c = document.createElement("style");
            return o.setAttributes(c, o.attributes),
            o.insert(c, o.options),
            c
}

// Export the module function
export default webpackModule990;

// Module metadata
export const metadata = {
    id: '990',
    type: 'ui',
    size: 190,
    features: ["es6","dom"],
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
        webpackModule990.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 990:', error);
        return {};
    }
}
