/**
 * Webpack Module 827
 * Type: css
 * Pattern: 1
 * Size: 274 bytes
 * Features: es6
 *
 * Original parameters: d
 */

// Original webpack module function
function webpackModule827(d) {

        d.exports = function(o, c) {
            if (c.styleSheet)
                c.styleSheet.cssText = o;
            else {
                for (; c.firstChild; )
                    c.removeChild(c.firstChild);
                c.appendChild(document.createTextNode(o))
}

// Export the module function
export default webpackModule827;

// Module metadata
export const metadata = {
    id: '827',
    type: 'css',
    size: 274,
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
        webpackModule827.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 827:', error);
        return {};
    }
}
