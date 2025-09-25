/**
 * Webpack Module 2
 * Type: webgl
 * Pattern: 1
 * Size: 491 bytes
 * Features: none
 *
 * Original parameters: 
 */

// Original webpack module function
function webpackModule2() {

                    return Nt === void 0 && (Nt = new gs(new Zu(1,1,1),new zl({
                        name: "BackgroundCubeMaterial",
                        uniforms: Sp(qs.backgroundCube.uniforms),
                        vertexShader: qs.backgroundCube.vertexShader,
                        fragmentShader: qs.backgroundCube.fragmentShader,
                        side: bt,
                        depthTest: !1,
                        depthWrite: !1,
                        fog: !1
}

// Export the module function
export default webpackModule2;

// Module metadata
export const metadata = {
    id: '2',
    type: 'webgl',
    size: 491,
    features: [],
    params: ''
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
        webpackModule2.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 2:', error);
        return {};
    }
}
