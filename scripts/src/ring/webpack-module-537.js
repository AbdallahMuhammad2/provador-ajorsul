/**
 * Webpack Module 537
 * Type: ring
 * Pattern: 1
 * Size: 689 bytes
 * Features: es6
 *
 * Original parameters: b
 */

// Original webpack module function
function webpackModule537(b) {

                    b.exports = function(_e) {
                        var nt = _e[1]
                          , it = _e[3];
                        if (!it)
                            return nt;
                        if (typeof btoa == "function") {
                            var at = btoa(unescape(encodeURIComponent(JSON.stringify(it))))
                              , ut = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(at)
                              , pt = "/*# ".concat(ut, " */")
                              , ht = it.sources.map(function(_t) {
                                return "/*# sourceURL=".concat(it.sourceRoot || "").concat(_t, " */")
}

// Export the module function
export default webpackModule537;

// Module metadata
export const metadata = {
    id: '537',
    type: 'ring',
    size: 689,
    features: ["es6"],
    params: 'b'
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
        webpackModule537.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 537:', error);
        return {};
    }
}
