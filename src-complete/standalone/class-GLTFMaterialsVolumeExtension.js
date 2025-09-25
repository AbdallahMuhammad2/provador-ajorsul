/* Standalone Class: GLTFMaterialsVolumeExtension */

class GLTFMaterialsVolumeExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_VOLUME
    }
    getMaterialType(o) {
        const c = this.parser.json.materials[o];
        return c.extensions && c.extensions[this.name] ? GLTFLoader.ObjectConstructors.MeshPhysicalMaterial : null
    }
    extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        c.thickness = _e.thicknessFactor !== void 0 ? _e.thicknessFactor : 0,
        _e.thicknessTexture !== void 0 && b.push(h.assignTexture(c, "thicknessMap", _e.thicknessTexture)),
        c.attenuationDistance = _e.attenuationDistance || 1 / 0;
        const nt = _e.attenuationColor || [1, 1, 1];
        return c.attenuationColor = new three_module.Q1f().setRGB(nt[0], nt[1], nt[2], three_module.Zr2),
        Promise.all(b)
    }
}

export default GLTFMaterialsVolumeExtension;
