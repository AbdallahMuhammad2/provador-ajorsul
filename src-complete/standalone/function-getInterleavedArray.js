/* Standalone Function: getInterleavedArray */

function getInterleavedArray(d, o) {
    const c = o.jsonDoc
      , h = o.bufferViews[d.bufferView]
      , _ = c.json.bufferViews[d.bufferView]
      , b = index_modern_ComponentTypeToTypedArray[d.componentType]
      , _e = index_modern_Accessor.getElementSize(d.type)
      , nt = b.BYTES_PER_ELEMENT
      , it = d.byteOffset || 0
      , at = new b(d.count * _e)
      , ut = new DataView(h.buffer,h.byteOffset,h.byteLength)
      , pt = _.byteStride;
    for (let ht = 0; ht < d.count; ht++)
        for (let _t = 0; _t < _e; _t++) {
            const vt = it + ht * pt + _t * nt;
            let bt;
            switch (d.componentType) {
            case index_modern_Accessor.ComponentType.FLOAT:
                bt = ut.getFloat32(vt, !0);
                break;
            case index_modern_Accessor.ComponentType.UNSIGNED_INT:
                bt = ut.getUint32(vt, !0);
                break;
            case index_modern_Accessor.ComponentType.UNSIGNED_SHORT:
                bt = ut.getUint16(vt, !0);
                break;
            case index_modern_Accessor.ComponentType.UNSIGNED_BYTE:
                bt = ut.getUint8(vt);
                break;
            case index_modern_Accessor.ComponentType.SHORT:
                bt = ut.getInt16(vt, !0);
                break;
            case index_modern_Accessor.ComponentType.BYTE:
                bt = ut.getInt8(vt);
                break;
            default:
                throw new Error(`Unexpected componentType "${d.componentType}".`)
            }
            at[ht * _e + _t] = bt
        }
    return at
}

export default getInterleavedArray;
