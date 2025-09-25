/* Standalone Class: GLTFMaterialsNoiseBumpMaterialExtensionImport */

class GLTFMaterialsNoiseBumpMaterialExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = NoiseBumpMaterialPlugin.NOISE_BUMP_MATERIAL_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.userData || (c.userData = {}),
        addNoiseBumpMaterial(c),
        c.userData._noiseBumpMat = deserializeObject(_, c.userData._noiseBumpMat, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsNoiseBumpMaterialExtensionImport;
