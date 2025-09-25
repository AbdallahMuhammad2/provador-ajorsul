/* Standalone Function: pf */

function pf(d, o, c, h) {
    switch (jd(o)) {
    case 1:
        var _ = ed;
        break;
    case 4:
        _ = gd;
        break;
    default:
        _ = fd
    }
    c = _.bind(null, o, c, d),
    _ = void 0,
    !Lb || o !== "touchstart" && o !== "touchmove" && o !== "wheel" || (_ = !0),
    h ? _ !== void 0 ? d.addEventListener(o, c, {
        capture: !0,
        passive: _
    }) : d.addEventListener(o, c, !0) : _ !== void 0 ? d.addEventListener(o, c, {
        passive: _
    }) : d.addEventListener(o, c, !1)
}

export default pf;
