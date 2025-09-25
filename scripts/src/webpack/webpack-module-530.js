/**
 * Webpack Module 530
 * Type: webpack-runtime
 * Pattern: 1
 * Size: 528 bytes
 * Features: es6, array-push
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule530(d) {

        d.exports = function() {
            var o = {
                820: function(b, _e, nt) {
                    var it = nt(537)
                      , at = nt.n(it)
                      , ut = nt(645)
                      , pt = nt.n(ut)()(at());
                    pt.push([b.id, `.treejs {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  font-size: 14px;
  margin-left: -18px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

// Export the module function
export default webpackModule530;

// Module metadata
export const metadata = {
    id: '530',
    type: 'webpack-runtime',
    size: 528,
    features: ["es6","array-push"],
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
        webpackModule530.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 530:', error);
        return {};
    }
}
