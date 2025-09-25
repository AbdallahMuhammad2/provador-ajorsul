/* Standalone Class: GLTFMaterialsThinFilmLayerExtensionImport */

class GLTFMaterialsThinFilmLayerExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = ThinFilmLayerPlugin.THIN_FILM_LAYER_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.userData || (c.userData = {}),
        addThinFilmLayer(c),
        c.userData._thinFilmLayer = deserializeObject(_, c.userData._thinFilmLayer, !1, {}),
        Promise.resolve()
    }
}

export default GLTFMaterialsThinFilmLayerExtensionImport;
