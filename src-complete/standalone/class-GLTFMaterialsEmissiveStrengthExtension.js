/* Standalone Class: GLTFMaterialsEmissiveStrengthExtension */

class GLTFMaterialsEmissiveStrengthExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH
    }
    extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name].emissiveStrength;
        return _ !== void 0 && (c.emissiveIntensity = _),
        Promise.resolve()
    }
}

export default GLTFMaterialsEmissiveStrengthExtension;
