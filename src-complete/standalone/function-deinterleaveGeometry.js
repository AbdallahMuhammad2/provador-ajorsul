/* Standalone Function: deinterleaveGeometry */

function deinterleaveGeometry(d) {
    const o = d.attributes
      , c = d.morphTargets
      , h = new Map;
    for (const _ in o) {
        const b = o[_];
        b.isInterleavedBufferAttribute && (h.has(b) || h.set(b, deinterleaveAttribute(b)),
        o[_] = h.get(b))
    }
    for (const _ in c) {
        const b = c[_];
        b.isInterleavedBufferAttribute && (h.has(b) || h.set(b, deinterleaveAttribute(b)),
        c[_] = h.get(b))
    }
}

export default deinterleaveGeometry;
