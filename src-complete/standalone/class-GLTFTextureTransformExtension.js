/* Standalone Class: GLTFTextureTransformExtension */

class GLTFTextureTransformExtension {
    constructor() {
        this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM
    }
    extendTexture(o, c) {
        return (c.texCoord !== void 0 && c.texCoord !== o.channel || c.offset !== void 0 || c.rotation !== void 0 || c.scale !== void 0) && (o.__hasGLTFUuid || (o = o.clone()),
        c.texCoord !== void 0 && (o.channel = c.texCoord),
        c.offset !== void 0 && o.offset.fromArray(c.offset),
        c.rotation !== void 0 && (o.rotation = c.rotation),
        c.scale !== void 0 && o.repeat.fromArray(c.scale),
        o.needsUpdate = !0),
        o
    }
}

export default GLTFTextureTransformExtension;
