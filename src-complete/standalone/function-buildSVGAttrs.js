/* Standalone Function: buildSVGAttrs */

function buildSVGAttrs(d, {attrX: o, attrY: c, attrScale: h, originX: _, originY: b, pathLength: _e, pathSpacing: nt=1, pathOffset: it=0, ...at}, ut, pt, ht) {
    if (buildHTMLStyles(d, at, ut, ht),
    pt) {
        d.style.viewBox && (d.attrs.viewBox = d.style.viewBox);
        return
    }
    d.attrs = d.style,
    d.style = {};
    const {attrs: _t, style: vt, dimensions: bt} = d;
    _t.transform && (bt && (vt.transform = _t.transform),
    delete _t.transform),
    bt && (_ !== void 0 || b !== void 0 || vt.transform) && (vt.transformOrigin = calcSVGTransformOrigin(bt, _ !== void 0 ? _ : .5, b !== void 0 ? b : .5)),
    o !== void 0 && (_t.x = o),
    c !== void 0 && (_t.y = c),
    h !== void 0 && (_t.scale = h),
    _e !== void 0 && buildSVGPath(_t, _e, nt, it, !1)
}

export default buildSVGAttrs;
