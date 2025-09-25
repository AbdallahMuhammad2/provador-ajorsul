/**
 * Webpack Module 151
 * Type: misc
 * Pattern: 1
 * Size: 1229 bytes
 * Features: array-push
 *
 * Original parameters: d, o, c
 */

// Original webpack module function
function webpackModule151(d, o, c) {

        var h = c(161);
        function _(nt, it, at) {
            var ut, pt, ht = nt.length, _t = it.arrayArgs.length, vt = it.indexArgs.length > 0, bt = [], St = [], At = 0, Et = 0;
            for (ut = 0; ut < ht; ++ut)
                St.push(["i", ut, "=0"].join(""));
            for (pt = 0; pt < _t; ++pt)
                for (ut = 0; ut < ht; ++ut)
                    Et = At,
                    At = nt[ut],
                    ut === 0 ? St.push(["d", pt, "s", ut, "=t", pt, "p", At].join("")) : St.push(["d", pt, "s", ut, "=(t", pt, "p", At, "-s", Et, "*t", pt, "p", Et, ")"].join(""));
            for (St.length > 0 && bt.push("var " + St.join(",")),
            ut = ht - 1; ut >= 0; --ut)
                At = nt[ut],
                bt.push(["for(i", ut, "=0;i", ut, "<s", At, ";++i", ut, "){"].join(""));
            for (bt.push(at),
            ut = 0; ut < ht; ++ut) {
                for (Et = At,
                At = nt[ut],
                pt = 0; pt < _t; ++pt)
                    bt.push(["p", pt, "+=d", pt, "s", ut].join(""));
                vt && (ut > 0 && bt.push(["index[", Et, "]-=s", Et].join("")),
                bt.push(["++index[", At, "]"].join(""))),
                bt.push("}")
}

// Export the module function
export default webpackModule151;

// Module metadata
export const metadata = {
    id: '151',
    type: 'misc',
    size: 1229,
    features: ["array-push"],
    params: 'd, o, c'
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
        webpackModule151.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 151:', error);
        return {};
    }
}
