/* Standalone Class: index_modern_Accessor */

class index_modern_Accessor extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.ACCESSOR
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            array: null,
            type: index_modern_Accessor.Type.SCALAR,
            componentType: index_modern_Accessor.ComponentType.FLOAT,
            normalized: !1,
            sparse: !1,
            buffer: null
        })
    }
    static getElementSize(o) {
        switch (o) {
        case index_modern_Accessor.Type.SCALAR:
            return 1;
        case index_modern_Accessor.Type.VEC2:
            return 2;
        case index_modern_Accessor.Type.VEC3:
            return 3;
        case index_modern_Accessor.Type.VEC4:
        case index_modern_Accessor.Type.MAT2:
            return 4;
        case index_modern_Accessor.Type.MAT3:
            return 9;
        case index_modern_Accessor.Type.MAT4:
            return 16;
        default:
            throw new Error("Unexpected type: " + o)
        }
    }
    static getComponentSize(o) {
        switch (o) {
        case index_modern_Accessor.ComponentType.BYTE:
        case index_modern_Accessor.ComponentType.UNSIGNED_BYTE:
            return 1;
        case index_modern_Accessor.ComponentType.SHORT:
        case index_modern_Accessor.ComponentType.UNSIGNED_SHORT:
            return 2;
        case index_modern_Accessor.ComponentType.UNSIGNED_INT:
        case index_modern_Accessor.ComponentType.FLOAT:
            return 4;
        default:
            throw new Error("Unexpected component type: " + o)
        }
    }
    getMinNormalized(o) {
        const c = this.getNormalized()
          , h = this.getElementSize()
          , _ = this.getComponentType();
        if (this.getMin(o),
        c)
            for (let b = 0; b < h; b++)
                o[b] = index_modern_MathUtils.decodeNormalizedInt(o[b], _);
        return o
    }
    getMin(o) {
        const c = this.getArray()
          , h = this.getCount()
          , _ = this.getElementSize();
        for (let b = 0; b < _; b++)
            o[b] = 1 / 0;
        for (let b = 0; b < h * _; b += _)
            for (let _e = 0; _e < _; _e++) {
                const nt = c[b + _e];
                Number.isFinite(nt) && (o[_e] = Math.min(o[_e], nt))
            }
        return o
    }
    getMaxNormalized(o) {
        const c = this.getNormalized()
          , h = this.getElementSize()
          , _ = this.getComponentType();
        if (this.getMax(o),
        c)
            for (let b = 0; b < h; b++)
                o[b] = index_modern_MathUtils.decodeNormalizedInt(o[b], _);
        return o
    }
    getMax(o) {
        const c = this.get("array")
          , h = this.getCount()
          , _ = this.getElementSize();
        for (let b = 0; b < _; b++)
            o[b] = -1 / 0;
        for (let b = 0; b < h * _; b += _)
            for (let _e = 0; _e < _; _e++) {
                const nt = c[b + _e];
                Number.isFinite(nt) && (o[_e] = Math.max(o[_e], nt))
            }
        return o
    }
    getCount() {
        const o = this.get("array");
        return o ? o.length / this.getElementSize() : 0
    }
    getType() {
        return this.get("type")
    }
    setType(o) {
        return this.set("type", o)
    }
    getElementSize() {
        return index_modern_Accessor.getElementSize(this.get("type"))
    }
    getComponentSize() {
        return this.get("array").BYTES_PER_ELEMENT
    }
    getComponentType() {
        return this.get("componentType")
    }
    getNormalized() {
        return this.get("normalized")
    }
    setNormalized(o) {
        return this.set("normalized", o)
    }
    getScalar(o) {
        const c = this.getElementSize()
          , h = this.getComponentType()
          , _ = this.getArray();
        return this.getNormalized() ? index_modern_MathUtils.decodeNormalizedInt(_[o * c], h) : _[o * c]
    }
    setScalar(o, c) {
        const h = this.getElementSize()
          , _ = this.getComponentType()
          , b = this.getArray();
        return this.getNormalized() ? b[o * h] = index_modern_MathUtils.encodeNormalizedInt(c, _) : b[o * h] = c,
        this
    }
    getElement(o, c) {
        const h = this.getNormalized()
          , _ = this.getElementSize()
          , b = this.getComponentType()
          , _e = this.getArray();
        for (let nt = 0; nt < _; nt++)
            c[nt] = h ? index_modern_MathUtils.decodeNormalizedInt(_e[o * _ + nt], b) : _e[o * _ + nt];
        return c
    }
    setElement(o, c) {
        const h = this.getNormalized()
          , _ = this.getElementSize()
          , b = this.getComponentType()
          , _e = this.getArray();
        for (let nt = 0; nt < _; nt++)
            _e[o * _ + nt] = h ? index_modern_MathUtils.encodeNormalizedInt(c[nt], b) : c[nt];
        return this
    }
    getSparse() {
        return this.get("sparse")
    }
    setSparse(o) {
        return this.set("sparse", o)
    }
    getBuffer() {
        return this.getRef("buffer")
    }
    setBuffer(o) {
        return this.setRef("buffer", o)
    }
    getArray() {
        return this.get("array")
    }
    setArray(o) {
        return this.set("componentType", o ? arrayToComponentType(o) : index_modern_Accessor.ComponentType.FLOAT),
        this.set("array", o),
        this
    }
    getByteLength() {
        const o = this.get("array");
        return o ? o.byteLength : 0
    }
}

export default index_modern_Accessor;
