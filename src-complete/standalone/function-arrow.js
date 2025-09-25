/* Standalone Function: arrow */

function arrow(d) {
    var o, c = d.state, h = d.name, _ = d.options, b = c.elements.arrow, _e = c.modifiersData.popperOffsets, nt = getBasePlacement(c.placement), it = getMainAxisFromPlacement(nt), at = [left, right].indexOf(nt) >= 0 ? "height" : "width";
    if (b && _e) {
        var ut = toPaddingObject(_.padding, c)
          , pt = getLayoutRect(b)
          , ht = it === "y" ? enums_top : left
          , _t = it === "y" ? bottom : right
          , vt = c.rects.reference[at] + c.rects.reference[it] - _e[it] - c.rects.popper[at]
          , bt = _e[it] - c.rects.reference[it]
          , St = getOffsetParent(b)
          , At = St ? it === "y" ? St.clientHeight || 0 : St.clientWidth || 0 : 0
          , Et = vt / 2 - bt / 2
          , Pt = ut[ht]
          , It = At - pt[at] - ut[_t]
          , Dt = At / 2 - pt[at] / 2 + Et
          , Gt = within(Pt, Dt, It)
          , Bt = it;
        c.modifiersData[h] = ((o = {})[Bt] = Gt,
        o.centerOffset = Gt - Dt,
        o)
    }
}

export default arrow;
