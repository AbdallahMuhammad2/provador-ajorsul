/* Standalone Function: decodeNormalizedIntArray */

function decodeNormalizedIntArray(d) {
    const o = d.getComponentType()
      , c = d.getArray()
      , h = new Float32Array(c.length);
    for (let _ = 0; _ < c.length; _++)
        h[_] = decodeNormalizedInt(c[_], o);
    return h
}

export default decodeNormalizedIntArray;
