/**
 * Webpack Module 795
 * Type: ring
 * Pattern: 1
 * Size: 1329 bytes
 * Features: es6
 *
 * Original parameters: b
 */

// Original webpack module function
function webpackModule795(b) {

                    b.exports = function(_e) {
                        var nt = _e.insertStyleElement(_e);
                        return {
                            update: function(it) {
                                (function(at, ut, pt) {
                                    var ht = "";
                                    pt.supports && (ht += "@supports (".concat(pt.supports, ") {")),
                                    pt.media && (ht += "@media ".concat(pt.media, " {"));
                                    var _t = pt.layer !== void 0;
                                    _t && (ht += "@layer".concat(pt.layer.length > 0 ? " ".concat(pt.layer) : "", " {")),
                                    ht += pt.css,
                                    _t && (ht += "}"),
                                    pt.media && (ht += "}"),
                                    pt.supports && (ht += "}");
                                    var vt = pt.sourceMap;
                                    vt && typeof btoa < "u" && (ht += `
/`,
                                    ht += "*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(vt)))), " *"),
                                    ht += "/"),
                                    ut.styleTagTransform(ht, at, ut.options)
}

// Export the module function
export default webpackModule795;

// Module metadata
export const metadata = {
    id: '795',
    type: 'ring',
    size: 1329,
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
        webpackModule795.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 795:', error);
        return {};
    }
}
