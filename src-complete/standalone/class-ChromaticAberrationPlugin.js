/* Standalone Class: ChromaticAberrationPlugin */

class ChromaticAberrationPlugin extends GenericExtensionPlugin {
    constructor() {
        super()
    }
    generateExtension(o) {
        return new ChromaticAberrationExtension(o)
    }
    get intensity() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.aberrationIntensity) !== null && c !== void 0 ? c : 1
    }
    set intensity(o) {
        this._extension && (this._extension.aberrationIntensity = o,
        this._extension.setDirty())
    }
}

export default ChromaticAberrationPlugin;
