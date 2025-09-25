/* Standalone Class: FilmicGrainPlugin */

class FilmicGrainPlugin extends GenericExtensionPlugin {
    constructor() {
        super()
    }
    generateExtension(o) {
        return new FilmicGrainExtension(o)
    }
    get intensity() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.grainIntensity) !== null && c !== void 0 ? c : 1
    }
    set intensity(o) {
        this._extension && (this._extension.grainIntensity = o,
        this._extension.setDirty())
    }
    get multiply() {
        var o, c;
        return (c = (o = this._extension) === null || o === void 0 ? void 0 : o.grainMultiply) !== null && c !== void 0 && c
    }
    set multiply(o) {
        this._extension && (this._extension.grainMultiply = o,
        this._extension.setDirty())
    }
}

export default FilmicGrainPlugin;
