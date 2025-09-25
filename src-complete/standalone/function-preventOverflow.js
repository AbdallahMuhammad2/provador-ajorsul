/* Standalone Function: preventOverflow */

function preventOverflow(d) {
    var o = d.state
      , c = d.options
      , h = d.name
      , _ = c.mainAxis
      , b = _ === void 0 || _
      , _e = c.altAxis
      , nt = _e !== void 0 && _e
      , it = c.boundary
      , at = c.rootBoundary
      , ut = c.altBoundary
      , pt = c.padding
      , ht = c.tether
      , _t = ht === void 0 || ht
      , vt = c.tetherOffset
      , bt = vt === void 0 ? 0 : vt
      , St = detectOverflow(o, {
        boundary: it,
        rootBoundary: at,
        padding: pt,
        altBoundary: ut
    })
      , At = getBasePlacement(o.placement)
      , Et = getVariation(o.placement)
      , Pt = !Et
      , It = getMainAxisFromPlacement(At)
      , Dt = getAltAxis(It)
      , Gt = o.modifiersData.popperOffsets
      , Bt = o.rects.reference
      , kt = o.rects.popper
      , Ut = typeof bt == "function" ? bt(Object.assign({}, o.rects, {
        placement: o.placement
    })) : bt
      , Ht = typeof Ut == "number" ? {
        mainAxis: Ut,
        altAxis: Ut
    } : Object.assign({
        mainAxis: 0,
        altAxis: 0
    }, Ut)
      , Kt = o.modifiersData.offset ? o.modifiersData.offset[o.placement] : null
      , Jt = {
        x: 0,
        y: 0
    };
    if (Gt) {
        if (b) {
            var or, ir = It === "y" ? enums_top : left, lr = It === "y" ? bottom : right, ar = It === "y" ? "height" : "width", hr = Gt[It], gr = hr + St[ir], dr = hr - St[lr], cr = _t ? -kt[ar] / 2 : 0, Ar = Et === start ? Bt[ar] : kt[ar], wr = Et === start ? -kt[ar] : -Bt[ar], Rr = o.elements.arrow, Cr = _t && Rr ? getLayoutRect(Rr) : {
                width: 0,
                height: 0
            }, tr = o.modifiersData["arrow#persistent"] ? o.modifiersData["arrow#persistent"].padding : getFreshSideObject(), fr = tr[ir], vr = tr[lr], Zr = within(0, Bt[ar], Cr[ar]), rn = Pt ? Bt[ar] / 2 - cr - Zr - fr - Ht.mainAxis : Ar - Zr - fr - Ht.mainAxis, hn = Pt ? -Bt[ar] / 2 + cr + Zr + vr + Ht.mainAxis : wr + Zr + vr + Ht.mainAxis, Nn = o.elements.arrow && getOffsetParent(o.elements.arrow), Wn = Nn ? It === "y" ? Nn.clientTop || 0 : Nn.clientLeft || 0 : 0, qn = (or = Kt == null ? void 0 : Kt[It]) != null ? or : 0, mo = hr + hn - qn, Ur = within(_t ? math_min(gr, hr + rn - qn - Wn) : gr, hr, _t ? math_max(dr, mo) : dr);
            Gt[It] = Ur,
            Jt[It] = Ur - hr
        }
        if (nt) {
            var nn, xn = It === "x" ? enums_top : left, ur = It === "x" ? bottom : right, pr = Gt[Dt], Ir = Dt === "y" ? "height" : "width", jr = pr + St[xn], Qr = pr - St[ur], Or = [enums_top, left].indexOf(At) !== -1, qr = (nn = Kt == null ? void 0 : Kt[Dt]) != null ? nn : 0, gn = Or ? jr : pr - Bt[Ir] - kt[Ir] - qr + Ht.altAxis, Mn = Or ? pr + Bt[Ir] + kt[Ir] - qr - Ht.altAxis : Qr, Tn = _t && Or ? withinMaxClamp(gn, pr, Mn) : within(_t ? gn : jr, pr, _t ? Mn : Qr);
            Gt[Dt] = Tn,
            Jt[Dt] = Tn - pr
        }
        o.modifiersData[h] = Jt
    }
}

export default preventOverflow;
