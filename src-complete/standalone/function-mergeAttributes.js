/* Standalone Function: mergeAttributes */

function mergeAttributes(d) {
    let o, c, h, _ = -1, b = 0;
    for (let at = 0; at < d.length; ++at) {
        const ut = d[at];
        if (ut.isInterleavedBufferAttribute)
            return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),
            null;
        if (o === void 0 && (o = ut.array.constructor),
        o !== ut.array.constructor)
            return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),
            null;
        if (c === void 0 && (c = ut.itemSize),
        c !== ut.itemSize)
            return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),
            null;
        if (h === void 0 && (h = ut.normalized),
        h !== ut.normalized)
            return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),
            null;
        if (_ === -1 && (_ = ut.gpuType),
        _ !== ut.gpuType)
            return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),
            null;
        b += ut.array.length
    }
    const _e = new o(b);
    let nt = 0;
    for (let at = 0; at < d.length; ++at)
        _e.set(d[at].array, nt),
        nt += d[at].array.length;
    const it = new three_module.THS(_e,c,h);
    return _ !== void 0 && (it.gpuType = _),
    it
}

export default mergeAttributes;
