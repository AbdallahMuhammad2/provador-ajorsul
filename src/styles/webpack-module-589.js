/**
 * Webpack Module 589
 * Type: css
 * Pattern: 1
 * Size: 368 bytes
 * Features: es6
 *
 * Original parameters: b
 */

// Original webpack module function
function webpackModule589(b) {

                    b.exports = function(_e, nt) {
                        if (nt.styleSheet)
                            nt.styleSheet.cssText = _e;
                        else {
                            for (; nt.firstChild; )
                                nt.removeChild(nt.firstChild);
                            nt.appendChild(document.createTextNode(_e))
}

// Export the module function
export default webpackModule589;

// Module metadata
export const metadata = {
    id: '589`,
    type: `css`,
    size: 368,
    features: ["es6"],
    params: `b`
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
        webpackModule589.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports
    } catch (error) {
        console.error(`Error executing module 589:', error);
        return {}
    }
}
