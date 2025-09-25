/* Standalone Class: GLTFMaterialsTriplanarMappingExtensionImport */

class GLTFMaterialsTriplanarMappingExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = TriplanarUVMappingPlugin.TRIPLANAR_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        c.userData || (c.userData = {});
        const b = c.userData;
        return b._triplanarMapping || (b._triplanarMapping = {}),
        b._triplanarMapping.enable = !0,
        b._triplanarMapping.scaleFactor === void 0 && (b._triplanarMapping.scaleFactor = 1),
        b._triplanarMapping.blendFactor === void 0 && (b._triplanarMapping.blendFactor = 1),
        b._triplanarMapping.offsetFactor === void 0 && (b._triplanarMapping.offsetFactor = 0),
        c.userData._triplanarMapping = deserializeObject(_, c.userData._triplanarMapping, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsTriplanarMappingExtensionImport;
