/* Standalone Class: GLTFMaterialsSheenExtension */

class GLTFMaterialsSheenExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_SHEEN
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
        const b = [];
        c.sheenColor = new three_module.Q1f(0,0,0),
        c.sheenRoughness = 0,
        c.sheen = 1;
        const _e = _.extensions[this.name];
        if (_e.sheenColorFactor !== void 0) {
            const nt = _e.sheenColorFactor;
            c.sheenColor.setRGB(nt[0], nt[1], nt[2], three_module.Zr2)
        }
        return _e.sheenRoughnessFactor !== void 0 && (c.sheenRoughness = _e.sheenRoughnessFactor),
        _e.sheenColorTexture !== void 0 && b.push(h.assignTexture(c, "sheenColorMap", _e.sheenColorTexture, three_module.er$)),
        _e.sheenRoughnessTexture !== void 0 && b.push(h.assignTexture(c, "sheenRoughnessMap", _e.sheenRoughnessTexture)),
        _.extras && _.extras.sheenFactor !== void 0 && (c.sheen = _.extras.sheenFactor,
        delete _.extras.sheenFactor),
        Promise.all(b)
    }
}

export default GLTFMaterialsSheenExtension;
