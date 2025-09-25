/* Standalone Function: mapToStyles */

function mapToStyles(d) {
    var o, c = d.popper, h = d.popperRect, _ = d.placement, b = d.variation, _e = d.offsets, nt = d.position, it = d.gpuAcceleration, at = d.adaptive, ut = d.roundOffsets, pt = d.isFixed, ht = _e.x, _t = ht === void 0 ? 0 : ht, vt = _e.y, bt = vt === void 0 ? 0 : vt, St = typeof ut == "function" ? ut({
        x: _t,
        y: bt
    }) : {
        x: _t,
        y: bt
    };
    _t = St.x,
    bt = St.y;
    var At = _e.hasOwnProperty("x")
      , Et = _e.hasOwnProperty("y")
      , Pt = left
      , It = enums_top
      , Dt = window;
    if (at) {
        var Gt = getOffsetParent(c)
          , Bt = "clientHeight"
          , kt = "clientWidth";
        Gt === getWindow(c) && getComputedStyle$1(Gt = getDocumentElement(c)).position !== "static" && nt === "absolute" && (Bt = "scrollHeight",
        kt = "scrollWidth"),
        (_ === enums_top || (_ === left || _ === right) && b === end) && (It = bottom,
        bt -= (pt && Gt === Dt && Dt.visualViewport ? Dt.visualViewport.height : Gt[Bt]) - h.height,
        bt *= it ? 1 : -1),
        _ !== left && (_ !== enums_top && _ !== bottom || b !== end) || (Pt = right,
        _t -= (pt && Gt === Dt && Dt.visualViewport ? Dt.visualViewport.width : Gt[kt]) - h.width,
        _t *= it ? 1 : -1)
    }
    var Ut, Ht = Object.assign({
        position: nt
    }, at && unsetSides), Kt = ut === !0 ? roundOffsetsByDPR({
        x: _t,
        y: bt
    }, getWindow(c)) : {
        x: _t,
        y: bt
    };
    return _t = Kt.x,
    bt = Kt.y,
    it ? Object.assign({}, Ht, ((Ut = {})[It] = Et ? "0" : "",
    Ut[Pt] = At ? "0" : "",
    Ut.transform = (Dt.devicePixelRatio || 1) <= 1 ? "translate(" + _t + "px, " + bt + "px)" : "translate3d(" + _t + "px, " + bt + "px, 0)",
    Ut)) : Object.assign({}, Ht, ((o = {})[It] = Et ? bt + "px" : "",
    o[Pt] = At ? _t + "px" : "",
    o.transform = "",
    o))
}

export default mapToStyles;
