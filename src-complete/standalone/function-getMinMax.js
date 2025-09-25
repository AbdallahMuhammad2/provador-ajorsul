/* Standalone Function: getMinMax */

function getMinMax(d, o, c) {
    const h = {
        min: new Array(d.itemSize).fill(Number.POSITIVE_INFINITY),
        max: new Array(d.itemSize).fill(Number.NEGATIVE_INFINITY)
    };
    for (let _ = o; _ < o + c; _++)
        for (let b = 0; b < d.itemSize; b++) {
            let _e;
            d.itemSize > 4 ? _e = d.array[_ * d.itemSize + b] : (b === 0 ? _e = d.getX(_) : b === 1 ? _e = d.getY(_) : b === 2 ? _e = d.getZ(_) : b === 3 && (_e = d.getW(_)),
            d.normalized === !0 && (_e = three_module.cj9.normalize(_e, d.array))),
            h.min[b] = Math.min(h.min[b], _e),
            h.max[b] = Math.max(h.max[b], _e)
        }
    return h
}

export default getMinMax;
