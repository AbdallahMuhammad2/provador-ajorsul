/* Standalone Function: Oj */

function Oj(d, o) {
    if (Cf = dd,
    d = Me(),
    Ne(d)) {
        if ("selectionStart"in d)
            var c = {
                start: d.selectionStart,
                end: d.selectionEnd
            };
        else
            e: {
                c = (c = d.ownerDocument) && c.defaultView || window;
                var h = c.getSelection && c.getSelection();
                if (h && h.rangeCount !== 0) {
                    c = h.anchorNode;
                    var _ = h.anchorOffset
                      , b = h.focusNode;
                    h = h.focusOffset;
                    try {
                        c.nodeType,
                        b.nodeType
                    } catch {
                        c = null;
                        break e
                    }
                    var _e = 0
                      , nt = -1
                      , it = -1
                      , at = 0
                      , ut = 0
                      , pt = d
                      , ht = null;
                    t: for (; ; ) {
                        for (var _t; pt !== c || _ !== 0 && pt.nodeType !== 3 || (nt = _e + _),
                        pt !== b || h !== 0 && pt.nodeType !== 3 || (it = _e + h),
                        pt.nodeType === 3 && (_e += pt.nodeValue.length),
                        (_t = pt.firstChild) !== null; )
                            ht = pt,
                            pt = _t;
                        for (; ; ) {
                            if (pt === d)
                                break t;
                            if (ht === c && ++at === _ && (nt = _e),
                            ht === b && ++ut === h && (it = _e),
                            (_t = pt.nextSibling) !== null)
                                break;
                            pt = ht,
                            ht = pt.parentNode
                        }
                        pt = _t
                    }
                    c = nt === -1 || it === -1 ? null : {
                        start: nt,
                        end: it
                    }
                } else
                    c = null
            }
        c = c || {
            start: 0,
            end: 0
        }
    } else
        c = null;
    for (Df = {
        focusedElem: d,
        selectionRange: c
    },
    dd = !1,
    V = o; V !== null; )
        if (o = V,
        d = o.child,
        (o.subtreeFlags & 1028) !== 0 && d !== null)
            d.return = o,
            V = d;
        else
            for (; V !== null; ) {
                o = V;
                try {
                    var vt = o.alternate;
                    if (o.flags & 1024)
                        switch (o.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (vt !== null) {
                                var bt = vt.memoizedProps
                                  , St = vt.memoizedState
                                  , At = o.stateNode
                                  , Et = At.getSnapshotBeforeUpdate(o.elementType === o.type ? bt : Ci(o.type, bt), St);
                                At.__reactInternalSnapshotBeforeUpdate = Et
                            }
                            break;
                        case 3:
                            var Pt = o.stateNode.containerInfo;
                            Pt.nodeType === 1 ? Pt.textContent = "" : Pt.nodeType === 9 && Pt.documentElement && Pt.removeChild(Pt.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(p(163))
                        }
                } catch (It) {
                    W(o, o.return, It)
                }
                if (d = o.sibling,
                d !== null) {
                    d.return = o.return,
                    V = d;
                    break
                }
                V = o.return
            }
    return vt = Nj,
    Nj = !1,
    vt
}

export default Oj;
