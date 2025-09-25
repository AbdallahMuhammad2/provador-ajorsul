/* Standalone Function: hasKeyframesChanged */

function hasKeyframesChanged(d) {
    const o = d[0];
    if (d.length === 1)
        return !0;
    for (let c = 0; c < d.length; c++)
        if (d[c] !== o)
            return !0
}

export default hasKeyframesChanged;
