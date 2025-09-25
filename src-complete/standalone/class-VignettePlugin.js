/* Standalone Class: VignettePlugin */

class VignettePlugin extends GenericExtensionPlugin {
    constructor() {
        super()
    }
    generateExtension(o) {
        return new VignetteExtension(o)
    }
    get power() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.power) !== null && c !== void 0 ? c : 1
    }
    set power(o) {
        this._extension && (this._extension.power = o,
        this._extension.setDirty())
    }
    get color() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.bgcolor) !== null && c !== void 0 ? c : new three_module.Q1f
    }
    set color(o) {
        this._extension && (this._extension.bgcolor.set(o),
        this._extension.setDirty())
    }
}

export default VignettePlugin;
