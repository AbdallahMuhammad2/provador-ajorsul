/**
 * Webpack Module 155
 * Type: ring
 * Pattern: 1
 * Size: 1091 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule155(d) {

        d.exports = function(o) {
            var c = o.insertStyleElement(o);
            return {
                update: function(h) {
                    (function(_, b, _e) {
                        var nt = "";
                        _e.supports && (nt += "@supports (".concat(_e.supports, ") {")),
                        _e.media && (nt += "@media ".concat(_e.media, " {"));
                        var it = _e.layer !== void 0;
                        it && (nt += "@layer".concat(_e.layer.length > 0 ? " ".concat(_e.layer) : "", " {")),
                        nt += _e.css,
                        it && (nt += "}"),
                        _e.media && (nt += "}"),
                        _e.supports && (nt += "}");
                        var at = _e.sourceMap;
                        at && typeof btoa < "u" && (nt += `
/`,
                        nt += "*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(at)))), " *"),
                        nt += "/"),
                        b.styleTagTransform(nt, _, b.options)
}

// Export the module function
export default webpackModule155;

// Module metadata
export const metadata = {
    id: '155',
    type: 'ring',
    size: 1091,
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
        webpackModule155.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 155:', error);
        return {};
    }
}
