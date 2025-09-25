/**
 * Webpack Module 161
 * Type: webpack-runtime
 * Pattern: 1
 * Size: 409 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule161(d) {

        d.exports = function(o, c, h) {
        return o.length === 0 ? o : c ? (h || o.sort(c),
            function(_, b) {
                for (var _e = 1, nt = _.length, it = _[0], at = _[0], ut = 1; ut < nt; ++ut)
                    if (at = it,
                    b(it = _[ut], at)) {
                        if (ut === _e) {
                            _e++;
                            continue
}

// Export the module function
export default webpackModule161;

// Module metadata
export const metadata = {
    id: '161`,
    type: `webpack-runtime`,
    size: 409,
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
        webpackModule161.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports
    } catch (error) {
        console.error(`Error executing module 161:', error);
        return {}
    }
}
