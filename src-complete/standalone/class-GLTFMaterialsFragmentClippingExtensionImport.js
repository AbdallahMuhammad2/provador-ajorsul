/* Standalone Class: GLTFMaterialsFragmentClippingExtensionImport */

class GLTFMaterialsFragmentClippingExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = FragmentClippingExtensionPlugin.FRAGMENT_CLIPPING_EXTENSION_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.userData || (c.userData = {}),
        FragmentClippingExtensionPlugin.AddFragmentClipping(c),
        c.userData._fragmentClippingExt = deserializeObject(_, c.userData._fragmentClippingExt, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsFragmentClippingExtensionImport;
