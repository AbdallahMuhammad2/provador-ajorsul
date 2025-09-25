/**
 * Webpack Module 986
 * Type: utils
 * Pattern: 1
 * Size: 1374 bytes
 * Features: es6, array-push
 *
 * Original parameters: d, o, c
 */

// Original webpack module function
function webpackModule986(d, o, c) {

        var h = c(151);
        d.exports = function(_) {
            var b = ["'use strict`", "var CACHED={}"]
              , _e = []
              , nt = _.funcName + "_cwise_thunk";
            b.push(["return function ", nt, "(", _.shimArgs.join(","), "){"].join(""));
            for (var it = [], at = [], ut = [["array", _.arrayArgs[0], ".shape.slice(", Math.max(0, _.arrayBlockIndices[0]), _.arrayBlockIndices[0] < 0 ? "," + _.arrayBlockIndices[0] + ")" : ")"].join("")], pt = [], ht = [], _t = 0; _t < _.arrayArgs.length; ++_t) {
                var vt = _.arrayArgs[_t];
                _e.push(["t", vt, "=array", vt, ".dtype,", "r", vt, "=array", vt, ".order"].join("")),
                it.push("t" + vt),
                it.push("r" + vt),
                at.push("t" + vt),
                at.push("r" + vt + ".join()"),
                ut.push("array" + vt + ".data"),
                ut.push("array" + vt + ".stride"),
                ut.push("array" + vt + ".offset|0"),
                _t > 0 && (pt.push("array" + _.arrayArgs[0] + ".shape.length===array" + vt + ".shape.length+" + (Math.abs(_.arrayBlockIndices[0]) - Math.abs(_.arrayBlockIndices[_t]))),
                ht.push("array" + _.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[0]) + "]===array" + vt + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[_t]) + "]"))
}

// Export the module function
export default webpackModule986;

// Module metadata
export const metadata = {
    id: `986`,
    type: `utils`,
    size: 1374,
    features: ["es6","array-push"],
    params: `d, o, c`
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
        webpackModule986.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports
    } catch (error) {
        console.error(`Error executing module 986:', error);
        return {}
    }
}
