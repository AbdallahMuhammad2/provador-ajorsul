/* Standalone Class: GLTFMaterialsSSBevelExtensionImport */

class GLTFMaterialsSSBevelExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = SSBevelPlugin.SSBEVEL_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.userData || (c.userData = {}),
        addSSBevel(c),
        c.userData._ssBevel = deserializeObject(_, c.userData._ssBevel, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsSSBevelExtensionImport;
