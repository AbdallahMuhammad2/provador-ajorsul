/* Standalone Class: GLTFMaterialsAnisotropyExtensionImport */

class GLTFMaterialsAnisotropyExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = AnisotropyPlugin.ANISOTROPY_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        var h, _, b;
        const _e = this.parser
          , nt = _e.json.materials[o];
        if (!nt.extensions || !nt.extensions[this.name])
            return Promise.resolve();
        const it = []
          , at = nt.extensions[this.name];
        c.userData || (c.userData = {}),
        c.userData._isAnisotropic = !0,
        c.userData._anisotropyFactor = (h = at.anisotropyFactor) !== null && h !== void 0 ? h : 0,
        c.userData._anisotropyNoise = (b = (_ = at.anisotropyNoiseFactor) !== null && _ !== void 0 ? _ : at.anisotropyNoise) !== null && b !== void 0 ? b : 0;
        let {anisotropyDirectionMode: ut, anisotropyDirection: pt} = at;
        return ut || (ut = at.anisotropyTextureMode),
        pt || (pt = at.anisotropyRotation),
        c.userData._anisotropyDirectionMode = ut && typeof (pt == null ? void 0 : pt.index) == "number" ? ut : "CONSTANT",
        ut === "ROTATION" || ut === "DIRECTION" ? it.push(_e.assignTexture(c.userData, "_anisotropyDirectionMap", pt).then(ht => {
            ht.colorSpace = three_module.er$
        }
        )) : c.userData._anisotropyDirection = pt ?? 0,
        Promise.all(it)
    }
    afterRoot(o) {
        var c;
        return (c = o.scene) === null || c === void 0 || c.traverse(h => {
            var _, b;
            if (!(!((b = (_ = h.material) === null || _ === void 0 ? void 0 : _.userData) === null || b === void 0) && b._isAnisotropic))
                return;
            const _e = h.geometry;
            _e.attributes.tangent || (_e.computeTangents(),
            _e.attributes.tangent.needsUpdate = !0)
        }
        ),
        null
    }
}

export default GLTFMaterialsAnisotropyExtensionImport;
