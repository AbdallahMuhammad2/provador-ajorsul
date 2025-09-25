/* Standalone Class: GLTFMaterialsIorExtension */

class GLTFMaterialsIorExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_IOR
    }
    getMaterialType(o) {
        const c = this.parser.json.materials[o];
        return c.extensions && c.extensions[this.name] ? GLTFLoader.ObjectConstructors.MeshPhysicalMaterial : null
    }
    extendMaterialParams(o, c) {
        const h = this.parser.json.materials[o];
        if (!h.extensions || !h.extensions[this.name])
            return Promise.resolve();
        const _ = h.extensions[this.name];
        return c.ior = _.ior !== void 0 ? _.ior : 1.5,
        Promise.resolve()
    }
}

export default GLTFMaterialsIorExtension;
