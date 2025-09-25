/* Standalone Class: GLTFMaterialsClearcoatTintExtensionImport */

class GLTFMaterialsClearcoatTintExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = ClearcoatTintPlugin.CLEARCOAT_TINT_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.userData || (c.userData = {}),
        addClearcoatTint(c),
        deserializeObject(_, c.userData._clearcoatTint, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsClearcoatTintExtensionImport;
