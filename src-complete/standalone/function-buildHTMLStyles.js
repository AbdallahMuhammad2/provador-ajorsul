/* Standalone Function: buildHTMLStyles */

function buildHTMLStyles(d, o, c, h) {
    const {style: _, vars: b, transform: _e, transformOrigin: nt} = d;
    let it = !1
      , at = !1
      , ut = !0;
    for (const pt in o) {
        const ht = o[pt];
        if (isCSSVariableName(pt)) {
            b[pt] = ht;
            continue
        }
        const _t = numberValueTypes[pt]
          , vt = getValueAsType(ht, _t);
        if (transformProps.has(pt)) {
            if (it = !0,
            _e[pt] = vt,
            !ut)
                continue;
            ht !== (_t.default || 0) && (ut = !1)
        } else
            pt.startsWith("origin") ? (at = !0,
            nt[pt] = vt) : _[pt] = vt
    }
    if (o.transform || (it || h ? _.transform = buildTransform(d.transform, c, ut, h) : _.transform && (_.transform = "none")),
    at) {
        const {originX: pt="50%", originY: ht="50%", originZ: _t=0} = nt;
        _.transformOrigin = `${pt} ${ht} ${_t}`
    }
}

export default buildHTMLStyles;
