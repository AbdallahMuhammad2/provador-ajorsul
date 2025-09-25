/* Standalone Function: makeNoneKeyframesAnimatable */

function makeNoneKeyframesAnimatable(d, o, c) {
    let h = 0, _;
    for (; h < d.length && !_; ) {
        const b = d[h];
        typeof b == "string" && !invalidTemplates.has(b) && (_ = d[h]),
        h++
    }
    if (_ && c)
        for (const b of o)
            d[b] = getAnimatableNone(c, _)
}

export default makeNoneKeyframesAnimatable;
