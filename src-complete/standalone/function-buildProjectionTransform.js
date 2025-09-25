/* Standalone Function: buildProjectionTransform */

function buildProjectionTransform(d, o, c) {
    let h = "";
    const _ = d.x.translate / o.x
      , b = d.y.translate / o.y
      , _e = (c == null ? void 0 : c.z) || 0;
    if ((_ || b || _e) && (h = `translate3d(${_}px, ${b}px, ${_e}px) `),
    (o.x !== 1 || o.y !== 1) && (h += `scale(${1 / o.x}, ${1 / o.y}) `),
    c) {
        const {transformPerspective: at, rotate: ut, rotateX: pt, rotateY: ht, skewX: _t, skewY: vt} = c;
        at && (h = `perspective(${at}px) ${h}`),
        ut && (h += `rotate(${ut}deg) `),
        pt && (h += `rotateX(${pt}deg) `),
        ht && (h += `rotateY(${ht}deg) `),
        _t && (h += `skewX(${_t}deg) `),
        vt && (h += `skewY(${vt}deg) `)
    }
    const nt = d.x.scale * o.x
      , it = d.y.scale * o.y;
    return (nt !== 1 || it !== 1) && (h += `scale(${nt}, ${it})`),
    h || "none"
}

export default buildProjectionTransform;
