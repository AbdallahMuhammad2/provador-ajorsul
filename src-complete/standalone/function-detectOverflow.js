/* Standalone Function: detectOverflow */

function detectOverflow(d, o) {
    o === void 0 && (o = {});
    var c = o
      , h = c.placement
      , _ = h === void 0 ? d.placement : h
      , b = c.strategy
      , _e = b === void 0 ? d.strategy : b
      , nt = c.boundary
      , it = nt === void 0 ? clippingParents : nt
      , at = c.rootBoundary
      , ut = at === void 0 ? viewport : at
      , pt = c.elementContext
      , ht = pt === void 0 ? popper : pt
      , _t = c.altBoundary
      , vt = _t !== void 0 && _t
      , bt = c.padding
      , St = bt === void 0 ? 0 : bt
      , At = mergePaddingObject(typeof St != "number" ? St : expandToHashMap(St, basePlacements))
      , Et = ht === popper ? reference : popper
      , Pt = d.rects.popper
      , It = d.elements[vt ? Et : ht]
      , Dt = getClippingRect(isElement(It) ? It : It.contextElement || getDocumentElement(d.elements.popper), it, ut, _e)
      , Gt = getBoundingClientRect(d.elements.reference)
      , Bt = computeOffsets({
        reference: Gt,
        element: Pt,
        strategy: "absolute",
        placement: _
    })
      , kt = rectToClientRect(Object.assign({}, Pt, Bt))
      , Ut = ht === popper ? kt : Gt
      , Ht = {
        top: Dt.top - Ut.top + At.top,
        bottom: Ut.bottom - Dt.bottom + At.bottom,
        left: Dt.left - Ut.left + At.left,
        right: Ut.right - Dt.right + At.right
    }
      , Kt = d.modifiersData.offset;
    if (ht === popper && Kt) {
        var Jt = Kt[_];
        Object.keys(Ht).forEach(function(or) {
            var ir = [right, bottom].indexOf(or) >= 0 ? 1 : -1
              , lr = [enums_top, bottom].indexOf(or) >= 0 ? "y" : "x";
            Ht[or] += Jt[lr] * ir
        })
    }
    return Ht
}

export default detectOverflow;
