/* Standalone Class: GLTFLayeredMaterialsExtensionImport */

class GLTFLayeredMaterialsExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = LayeredMaterialPlugin.LAYERED_MATERIAL_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        c.userData || (c.userData = {});
        const b = c.userData;
        return b._layeredMaterial || (b._layeredMaterial = {}),
        b._layeredMaterial.enable = !0,
        c.userData._layeredMaterial = deserializeObject(_, c.userData._layeredMaterial, !1, {}),
        Promise.resolve()
    }
}

export default GLTFLayeredMaterialsExtensionImport;
