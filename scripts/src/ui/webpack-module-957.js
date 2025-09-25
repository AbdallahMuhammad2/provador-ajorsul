/**
 * Webpack Module 957
 * Type: ui
 * Pattern: 1
 * Size: 121 bytes
 * Features: es6
 *
 * Original parameters: __unused_webpack_module, __webpackgi_exports__, __webpackgi_require__
 */

// Original webpack module function
function webpackModule957(__unused_webpack_module, __webpackgi_exports__, __webpackgi_require__) {

        __webpackgi_require__.d(__webpackgi_exports__, {
            Z: function() {
                return DRACOLoader2
}

// Export the module function
export default webpackModule957;

// Module metadata
export const metadata = {
    id: '957',
    type: 'ui',
    size: 121,
    features: ["es6"],
    params: '__unused_webpack_module, __webpackgi_exports__, __webpackgi_require__'
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
        webpackModule957.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 957:', error);
        return {};
    }
}
