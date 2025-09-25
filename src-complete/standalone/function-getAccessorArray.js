/* Standalone Function: getAccessorArray */

function getAccessorArray(d, o) {
    const c = o.jsonDoc
      , h = o.bufferViews[d.bufferView]
      , _ = c.json.bufferViews[d.bufferView]
      , b = index_modern_ComponentTypeToTypedArray[d.componentType]
      , _e = index_modern_Accessor.getElementSize(d.type)
      , nt = b.BYTES_PER_ELEMENT
      , it = _e * nt;
    if (_.byteStride !== void 0 && _.byteStride !== it)
        return getInterleavedArray(d, o);
    const at = h.byteOffset + (d.byteOffset || 0)
      , ut = d.count * _e * nt;
    return new b(h.buffer.slice(at, at + ut))
}

export default getAccessorArray;
