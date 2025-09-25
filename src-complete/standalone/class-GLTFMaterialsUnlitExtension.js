/* Standalone Class: GLTFMaterialsUnlitExtension */

class GLTFMaterialsUnlitExtension {
    constructor() {
        this.name = EXTENSIONS.KHR_MATERIALS_UNLIT
    }
    getMaterialType() {
        return GLTFLoader.ObjectConstructors.MeshBasicMaterial
    }
    extendParams(o, c, h) {
        const _ = [];
        o.color = new three_module.Q1f(1,1,1),
        o.opacity = 1;
        const b = c.pbrMetallicRoughness;
        if (b) {
            if (Array.isArray(b.baseColorFactor)) {
                const _e = b.baseColorFactor;
                o.color.setRGB(_e[0], _e[1], _e[2], three_module.Zr2),
                o.opacity = _e[3]
            }
            b.baseColorTexture !== void 0 && _.push(h.assignTexture(o, "map", b.baseColorTexture, three_module.er$))
        }
        return Promise.all(_)
    }
}

export default GLTFMaterialsUnlitExtension;
