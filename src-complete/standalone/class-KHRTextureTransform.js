/* Standalone Class: KHRTextureTransform */

class KHRTextureTransform extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$1
    }
    createTransform() {
        return new Transform(this.document.getGraph())
    }
    read(o) {
        for (const [c,h] of Array.from(o.textureInfos.entries())) {
            if (!h.extensions || !h.extensions[NAME$1])
                continue;
            const _ = this.createTransform()
              , b = h.extensions[NAME$1];
            b.offset !== void 0 && _.setOffset(b.offset),
            b.rotation !== void 0 && _.setRotation(b.rotation),
            b.scale !== void 0 && _.setScale(b.scale),
            b.texCoord !== void 0 && _.setTexCoord(b.texCoord),
            c.setExtension(NAME$1, _)
        }
        return this
    }
    write(o) {
        const c = Array.from(o.textureInfoDefMap.entries());
        for (const [h,_] of c) {
            const b = h.getExtension(NAME$1);
            if (!b)
                continue;
            _.extensions = _.extensions || {};
            const _e = {}
              , nt = index_modern_MathUtils.eq;
            nt(b.getOffset(), [0, 0]) || (_e.offset = b.getOffset()),
            b.getRotation() !== 0 && (_e.rotation = b.getRotation()),
            nt(b.getScale(), [1, 1]) || (_e.scale = b.getScale()),
            b.getTexCoord() != null && (_e.texCoord = b.getTexCoord()),
            _.extensions[NAME$1] = _e
        }
        return this
    }
}

export default KHRTextureTransform;
