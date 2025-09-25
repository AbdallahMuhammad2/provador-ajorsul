/**
 * Webpack Module 282
 * Type: misc
 * Pattern: 1
 * Size: 281 bytes
 * Features: none
 *
 * Original parameters: d, o
 */

// Original webpack module function
function webpackModule282(d, o) {

        (function(c) {
            const h = "tp";
            function _(Bt) {
                return kt => Ut => {
                    if (!kt && Ut === void 0)
                        return {
                            succeeded: !1,
                            value: void 0
}

// Export the module function
export default webpackModule282;

// Module metadata
export const metadata = {
    id: '282',
    type: 'misc',
    size: 281,
    features: [],
    params: 'd, o'
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
        webpackModule282.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 282:', error);
        return {};
    }
}
