/* Standalone Function: isShadowRoot */

function isShadowRoot(d) {
    return typeof ShadowRoot < "u" && (d instanceof getWindow(d).ShadowRoot || d instanceof ShadowRoot)
}

export default isShadowRoot;
