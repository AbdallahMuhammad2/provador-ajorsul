/* Standalone Class: TonemapPlugin */

class TonemapPlugin extends GenericExtensionPlugin {
    constructor(o=!0) {
        super(),
        this.depthTonemap = o,
        this.depthTonemap = o,
        this.updateGBuffer = this.updateGBuffer.bind(this)
    }
    fromJSON(o, c) {
        return o.pass && ((o = {
            ...o
        }).extension = {
            ...o.pass
        },
        delete o.extension.enabled,
        delete o.pass),
        super.fromJSON(o, c)
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 || c.registerGBufferUpdater(this.updateGBuffer)
    }
    generateExtension(o) {
        return new TonemapExtension(o,this.depthTonemap)
    }
    get exposure() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.exposure) !== null && c !== void 0 ? c : 1
    }
    set exposure(o) {
        this._extension && (this._extension.exposure = o,
        this._extension.setDirty())
    }
    get saturation() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.saturation) !== null && c !== void 0 ? c : 1
    }
    set saturation(o) {
        this._extension && (this._extension.saturation = o,
        this._extension.setDirty())
    }
    get contrast() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.contrast) !== null && c !== void 0 ? c : 1
    }
    set contrast(o) {
        this._extension && (this._extension.contrast = o,
        this._extension.setDirty())
    }
    get toneMapping() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.toneMapping) !== null && c !== void 0 ? c : three_module.kyO
    }
    set toneMapping(o) {
        this._extension && (this._extension.toneMapping = o,
        this._extension.setDirty())
    }
    updateGBuffer(o, c) {
        var h, _;
        if (o instanceof three_module.eaF && (!((h = o.material) === null || h === void 0) && h.userData)) {
            const b = ((_ = o.material) === null || _ === void 0 ? void 0 : _.userData.postTonemap) === !1 ? 0 : 1;
            c.w = updateBit(c.w, 1, b)
        }
    }
}

export default TonemapPlugin;
