/* Standalone Function: padArrayElements */

function padArrayElements(d, o) {
    const c = index_modern_BufferUtils.padNumber(d.BYTES_PER_ELEMENT * o) / d.BYTES_PER_ELEMENT
      , h = d.length / o
      , _ = new d.constructor(h * c);
    for (let b = 0; b * o < d.length; b++)
        for (let _e = 0; _e < o; _e++)
            _[b * c + _e] = d[b * o + _e];
    return _
}

export default padArrayElements;
