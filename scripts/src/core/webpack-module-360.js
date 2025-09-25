/**
 * Webpack Module 360
 * Type: webgl
 * Pattern: 3
 * Size: 1482 bytes
 * Features: async
 *
 * Original parameters: o, c=!1, h=360, _
 */

// Original webpack module function
function webpackModule360(o, c=!1, h=360, _) {

        var b;
        if (!((b = this.recorder) === null || b === void 0) && b.isRecording() || !this._viewer)
            return;
        const _e = this._viewer.scene.activeCamera;
        let nt = _e.interactionsEnabled
          , it = 0;
        for (; !(nt || (this._viewer.setDirty(),
        await this._viewer.doOnce("postFrame"),
        it % 30 == 0 && this._viewer.console.warn("CanvasRecorderPlugin: interactions are already disabled by something, waiting..."),
        nt = _e.interactionsEnabled,
        it > 5e3 / 30)); )
            it++;
        _e.setInteractions(!1, CanvasRecorderPlugin.PluginType);
        const at = _e.target.clone()
          , ut = _e.position.clone().sub(at)
          , pt = await this._viewer.getPluginByType("PopmotionPlugin");
        if (!pt)
            return void console.error("Popmotion plugin not found");
        const ht = new three_module.YHV().setFromVector3(ut);
        _e.position.setFromSpherical(ht).add(at),
        _e.positionUpdated(!0);
        const _t = _e.autoLookAtTarget;
        _e.autoLookAtTarget = !0;
        const vt = ht.theta
          , bt = await this.record(async () => pt.animate({
            from: vt,
            to: vt + (c ? -1 : 1) * h * Math.PI / 180,
            duration: 1e3 * o,
            ease: _ ?? EasingFunctions.linear,
            onUpdate: St => {
                ht.theta = St,
                _e.position.setFromSpherical(ht).add(at),
                _e.positionUpdated(!0)
}

// Export the module function
export default webpackModule360;

// Module metadata
export const metadata = {
    id: '360',
    type: 'webgl',
    size: 1482,
    features: ["async"],
    params: 'o, c=!1, h=360, _'
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
        webpackModule360.call(globalScope, moduleObj, moduleObj.exports, require);
        return moduleObj.exports;
    } catch (error) {
        console.error('Error executing module 360:', error);
        return {};
    }
}
