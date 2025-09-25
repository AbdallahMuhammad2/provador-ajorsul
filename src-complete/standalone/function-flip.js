/* Standalone Function: flip */

function flip(d) {
    var o = d.state
      , c = d.options
      , h = d.name;
    if (!o.modifiersData[h]._skip) {
        for (var _ = c.mainAxis, b = _ === void 0 || _, _e = c.altAxis, nt = _e === void 0 || _e, it = c.fallbackPlacements, at = c.padding, ut = c.boundary, pt = c.rootBoundary, ht = c.altBoundary, _t = c.flipVariations, vt = _t === void 0 || _t, bt = c.allowedAutoPlacements, St = o.options.placement, At = getBasePlacement(St), Et = it || (At !== St && vt ? getExpandedFallbackPlacements(St) : [getOppositePlacement(St)]), Pt = [St].concat(Et).reduce(function(Ar, wr) {
            return Ar.concat(getBasePlacement(wr) === auto$1 ? computeAutoPlacement(o, {
                placement: wr,
                boundary: ut,
                rootBoundary: pt,
                padding: at,
                flipVariations: vt,
                allowedAutoPlacements: bt
            }) : wr)
        }, []), It = o.rects.reference, Dt = o.rects.popper, Gt = new Map, Bt = !0, kt = Pt[0], Ut = 0; Ut < Pt.length; Ut++) {
            var Ht = Pt[Ut]
              , Kt = getBasePlacement(Ht)
              , Jt = getVariation(Ht) === start
              , or = [enums_top, bottom].indexOf(Kt) >= 0
              , ir = or ? "width" : "height"
              , lr = detectOverflow(o, {
                placement: Ht,
                boundary: ut,
                rootBoundary: pt,
                altBoundary: ht,
                padding: at
            })
              , ar = or ? Jt ? right : left : Jt ? bottom : enums_top;
            It[ir] > Dt[ir] && (ar = getOppositePlacement(ar));
            var hr = getOppositePlacement(ar)
              , gr = [];
            if (b && gr.push(lr[Kt] <= 0),
            nt && gr.push(lr[ar] <= 0, lr[hr] <= 0),
            gr.every(function(Ar) {
                return Ar
            })) {
                kt = Ht,
                Bt = !1;
                break
            }
            Gt.set(Ht, gr)
        }
        if (Bt)
            for (var dr = function(Ar) {
                var wr = Pt.find(function(Rr) {
                    var Cr = Gt.get(Rr);
                    if (Cr)
                        return Cr.slice(0, Ar).every(function(tr) {
                            return tr
                        })
                });
                if (wr)
                    return kt = wr,
                    "break"
            }, cr = vt ? 3 : 1; cr > 0 && dr(cr) !== "break"; cr--)
                ;
        o.placement !== kt && (o.modifiersData[h]._skip = !0,
        o.placement = kt,
        o.reset = !0)
    }
}

export default flip;
