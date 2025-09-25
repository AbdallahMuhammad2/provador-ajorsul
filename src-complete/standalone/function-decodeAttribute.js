/* Standalone Function: decodeAttribute */

function decodeAttribute(d, o, c, h) {
    const _ = DATA_TYPE[h.componentType]
      , b = COMPONENT_ARRAY[h.componentType]
      , _e = c.num_components()
      , nt = o.num_points() * _e
      , it = nt * b.BYTES_PER_ELEMENT
      , at = decoderModule._malloc(it);
    d.GetAttributeDataArrayForAllPoints(o, c, _, it, at);
    const ut = new b(decoderModule.HEAPF32.buffer,at,nt).slice();
    return decoderModule._free(at),
    ut
}

export default decodeAttribute;
