/* Standalone Function: pushBarycoordInterpolatedValues */

function pushBarycoordInterpolatedValues(d, o, c, h, _, b, _e=!1, nt=!1) {
    const it = at => {
        b.push(at.x),
        _ > 1 && b.push(at.y),
        _ > 2 && b.push(at.z),
        _ > 3 && b.push(at.w)
    }
    ;
    _vec4_0.set(0, 0, 0, 0).addScaledVector(d, h.a.x).addScaledVector(o, h.a.y).addScaledVector(c, h.a.z),
    _vec4_1.set(0, 0, 0, 0).addScaledVector(d, h.b.x).addScaledVector(o, h.b.y).addScaledVector(c, h.b.z),
    _vec4_2.set(0, 0, 0, 0).addScaledVector(d, h.c.x).addScaledVector(o, h.c.y).addScaledVector(c, h.c.z),
    nt && (_vec4_0.normalize(),
    _vec4_1.normalize(),
    _vec4_2.normalize()),
    it(_vec4_0),
    _e ? (it(_vec4_2),
    it(_vec4_1)) : (it(_vec4_1),
    it(_vec4_2))
}

export default pushBarycoordInterpolatedValues;
