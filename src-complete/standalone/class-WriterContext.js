/* Standalone Class: WriterContext */

class WriterContext {
    constructor(o, c, h) {
        this._doc = void 0,
        this.jsonDoc = void 0,
        this.options = void 0,
        this.accessorIndexMap = new Map,
        this.animationIndexMap = new Map,
        this.bufferIndexMap = new Map,
        this.cameraIndexMap = new Map,
        this.skinIndexMap = new Map,
        this.materialIndexMap = new Map,
        this.meshIndexMap = new Map,
        this.nodeIndexMap = new Map,
        this.imageIndexMap = new Map,
        this.textureDefIndexMap = new Map,
        this.textureInfoDefMap = new Map,
        this.samplerDefIndexMap = new Map,
        this.sceneIndexMap = new Map,
        this.imageBufferViews = [],
        this.otherBufferViews = new Map,
        this.otherBufferViewsIndexMap = new Map,
        this.extensionData = {},
        this.bufferURIGenerator = void 0,
        this.imageURIGenerator = void 0,
        this.logger = void 0,
        this._accessorUsageMap = new Map,
        this.accessorUsageGroupedByParent = new Set(["ARRAY_BUFFER"]),
        this.accessorParents = new Map,
        this._doc = o,
        this.jsonDoc = c,
        this.options = h;
        const _ = o.getRoot()
          , b = _.listBuffers().length
          , _e = _.listTextures().length;
        this.bufferURIGenerator = new UniqueURIGenerator(b > 1, () => h.basename || "buffer"),
        this.imageURIGenerator = new UniqueURIGenerator(_e > 1,nt => getSlot(o, nt) || h.basename || "texture"),
        this.logger = o.getLogger()
    }
    createTextureInfoDef(o, c) {
        const h = {
            magFilter: c.getMagFilter() || void 0,
            minFilter: c.getMinFilter() || void 0,
            wrapS: c.getWrapS(),
            wrapT: c.getWrapT()
        }
          , _ = JSON.stringify(h);
        this.samplerDefIndexMap.has(_) || (this.samplerDefIndexMap.set(_, this.jsonDoc.json.samplers.length),
        this.jsonDoc.json.samplers.push(h));
        const b = {
            source: this.imageIndexMap.get(o),
            sampler: this.samplerDefIndexMap.get(_)
        }
          , _e = JSON.stringify(b);
        this.textureDefIndexMap.has(_e) || (this.textureDefIndexMap.set(_e, this.jsonDoc.json.textures.length),
        this.jsonDoc.json.textures.push(b));
        const nt = {
            index: this.textureDefIndexMap.get(_e)
        };
        return c.getTexCoord() !== 0 && (nt.texCoord = c.getTexCoord()),
        Object.keys(c.getExtras()).length > 0 && (nt.extras = c.getExtras()),
        this.textureInfoDefMap.set(c, nt),
        nt
    }
    createPropertyDef(o) {
        const c = {};
        return o.getName() && (c.name = o.getName()),
        Object.keys(o.getExtras()).length > 0 && (c.extras = o.getExtras()),
        c
    }
    createAccessorDef(o) {
        const c = this.createPropertyDef(o);
        return c.type = o.getType(),
        c.componentType = o.getComponentType(),
        c.count = o.getCount(),
        this._doc.getGraph().listParentEdges(o).some(h => h.getName() === "attributes" && h.getAttributes().key === "POSITION" || h.getName() === "input") && (c.max = o.getMax([]).map(Math.fround),
        c.min = o.getMin([]).map(Math.fround)),
        o.getNormalized() && (c.normalized = o.getNormalized()),
        c
    }
    createImageData(o, c, h) {
        if (this.options.format === Format.GLB)
            this.imageBufferViews.push(c),
            o.bufferView = this.jsonDoc.json.bufferViews.length,
            this.jsonDoc.json.bufferViews.push({
                buffer: 0,
                byteOffset: -1,
                byteLength: c.byteLength
            });
        else {
            const _ = index_modern_ImageUtils.mimeTypeToExtension(h.getMimeType());
            o.uri = this.imageURIGenerator.createURI(h, _),
            this.assignResourceURI(o.uri, c, !1)
        }
    }
    assignResourceURI(o, c, h) {
        const _ = this.jsonDoc.resources;
        if (!(o in _))
            return void (_[o] = c);
        if (c === _[o])
            return void this.logger.warn(`Duplicate resource URI, "${o}".`);
        const b = `Resource URI "${o}" already assigned to different data.`;
        if (h)
            throw new Error(b);
        this.logger.warn(b)
    }
    getAccessorUsage(o) {
        const c = this._accessorUsageMap.get(o);
        if (c)
            return c;
        if (o.getSparse())
            return BufferViewUsage$1.SPARSE;
        for (const h of this._doc.getGraph().listParentEdges(o)) {
            const {usage: _} = h.getAttributes();
            if (_)
                return _;
            h.getParent().propertyType !== index_modern_PropertyType.ROOT && this.logger.warn(`Missing attribute ".usage" on edge, "${h.getName()}".`)
        }
        return BufferViewUsage$1.OTHER
    }
    addAccessorToUsageGroup(o, c) {
        const h = this._accessorUsageMap.get(o);
        if (h && h !== c)
            throw new Error(`Accessor with usage "${h}" cannot be reused as "${c}".`);
        return this._accessorUsageMap.set(o, c),
        this
    }
}

export default WriterContext;
