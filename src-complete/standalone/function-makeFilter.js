/* Standalone Function: makeFilter */

function makeFilter(d, o, c) {
    return {
        ...o,
        get dirty() {
            return o.dirty || !1
        },
        set dirty(h) {
            S$2(o, "dirty", h, !0)
        },
        update() {
            var h, _, b;
            this.passObject.enabled && ((_ = (h = this.passObject).updateShaderProperties) === null || _ === void 0 || _.call(h, Ee$1(c)),
            (b = o.update) === null || b === void 0 || b.call(this))
        },
        onRegister(h) {
            var _, b, _e;
            this.passObject.materialExtension && ((b = (_ = d.getPluginByType("AssetManager")) === null || _ === void 0 ? void 0 : _.materials) === null || b === void 0 || b.registerMaterialExtension(this.passObject.materialExtension)),
            (_e = o.onRegister) === null || _e === void 0 || _e.call(this, h)
        },
        onUnregister(h) {
            var _, b, _e;
            this.passObject.materialExtension && ((b = (_ = d.getPluginByType("AssetManager")) === null || _ === void 0 ? void 0 : _.materials) === null || b === void 0 || b.unregisterMaterialExtension(this.passObject.materialExtension)),
            (_e = o.onUnregister) === null || _e === void 0 || _e.call(this, h)
        },
        dispose() {
            var h, _, b;
            (_ = (h = this.passObject).dispose) === null || _ === void 0 || _.call(h),
            (b = o.dispose) === null || b === void 0 || b.call(this)
        }
    }
}

export default makeFilter;
