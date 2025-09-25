/* Standalone Function: canAnimate */

function canAnimate(d, o, c, h) {
    const _ = d[0];
    if (_ === null)
        return !1;
    const b = d[d.length - 1]
      , _e = isAnimatable(_, o)
      , nt = isAnimatable(b, o);
    return !_e || !nt ? !1 : hasKeyframesChanged(d) || c === "spring" && h
}

export default canAnimate;
