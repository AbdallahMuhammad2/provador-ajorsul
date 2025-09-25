/* Standalone Class: ReaderContext */

class ReaderContext {
    constructor(o) {
        this.jsonDoc = void 0,
        this.buffers = [],
        this.bufferViews = [],
        this.bufferViewBuffers = [],
        this.accessors = [],
        this.textures = [],
        this.textureInfos = new Map,
        this.materials = [],
        this.meshes = [],
        this.cameras = [],
        this.nodes = [],
        this.skins = [],
        this.animations = [],
        this.scenes = [],
        this.jsonDoc = o
    }
    setTextureInfo(o, c) {
        this.textureInfos.set(o, c),
        c.texCoord !== void 0 && o.setTexCoord(c.texCoord),
        c.extras !== void 0 && o.setExtras(c.extras);
        const h = this.jsonDoc.json.textures[c.index];
        if (h.sampler === void 0)
            return;
        const _ = this.jsonDoc.json.samplers[h.sampler];
        _.magFilter !== void 0 && o.setMagFilter(_.magFilter),
        _.minFilter !== void 0 && o.setMinFilter(_.minFilter),
        _.wrapS !== void 0 && o.setWrapS(_.wrapS),
        _.wrapT !== void 0 && o.setWrapT(_.wrapT)
    }
}

export default ReaderContext;
