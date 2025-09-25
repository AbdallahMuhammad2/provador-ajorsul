/* Standalone Class: GLTFMaterialsCustomBumpMapExtensionImport */

class GLTFMaterialsCustomBumpMapExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = CustomBumpMapPlugin.CUSTOM_BUMP_MAP_GLTF_EXTENSION
    }
    async extendMaterialParams(o, c) {
        var h;
        const _ = this.parser
          , b = _.json.materials[o];
        if (!b.extensions || !b.extensions[this.name])
            return Promise.resolve();
        const _e = []
          , nt = b.extensions[this.name];
        c.userData || (c.userData = {}),
        c.userData._hasCustomBump = !0,
        c.userData._customBumpScale = (h = nt.customBumpScale) !== null && h !== void 0 ? h : 0;
        const it = nt.customBumpMap;
        return it && _e.push(_.assignTexture(c.userData, "_customBumpMap", it).then(at => {
            at.colorSpace = three_module.er$
        }
        )),
        Promise.all(_e)
    }
}

export default GLTFMaterialsCustomBumpMapExtensionImport;
