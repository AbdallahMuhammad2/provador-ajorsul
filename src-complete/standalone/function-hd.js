/* Standalone Function: hd */

function hd(d, o, c, h, _) {
    var b = h;
    if (!(o & 1) && !(o & 2) && h !== null)
        e: for (; ; ) {
            if (h === null)
                return;
            var _e = h.tag;
            if (_e === 3 || _e === 4) {
                var nt = h.stateNode.containerInfo;
                if (nt === _ || nt.nodeType === 8 && nt.parentNode === _)
                    break;
                if (_e === 4)
                    for (_e = h.return; _e !== null; ) {
                        var it = _e.tag;
                        if ((it === 3 || it === 4) && (it = _e.stateNode.containerInfo,
                        it === _ || it.nodeType === 8 && it.parentNode === _))
                            return;
                        _e = _e.return
                    }
                for (; nt !== null; ) {
                    if (_e = Wc(nt),
                    _e === null)
                        return;
                    if (it = _e.tag,
                    it === 5 || it === 6) {
                        h = b = _e;
                        continue e
                    }
                    nt = nt.parentNode
                }
            }
            h = h.return
        }
    Jb(function() {
        var at = b
          , ut = xb(c)
          , pt = [];
        e: {
            var ht = df.get(d);
            if (ht !== void 0) {
                var _t = td
                  , vt = d;
                switch (d) {
                case "keypress":
                    if (od(c) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    _t = Rd;
                    break;
                case "focusin":
                    vt = "focus",
                    _t = Fd;
                    break;
                case "focusout":
                    vt = "blur",
                    _t = Fd;
                    break;
                case "beforeblur":
                case "afterblur":
                    _t = Fd;
                    break;
                case "click":
                    if (c.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    _t = Bd;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    _t = Dd;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    _t = Vd;
                    break;
                case $e:
                case af:
                case bf:
                    _t = Hd;
                    break;
                case cf:
                    _t = Xd;
                    break;
                case "scroll":
                    _t = vd;
                    break;
                case "wheel":
                    _t = Zd;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    _t = Jd;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    _t = Td
                }
                var bt = (o & 4) !== 0
                  , St = !bt && d === "scroll"
                  , At = bt ? ht !== null ? ht + "Capture" : null : ht;
                bt = [];
                for (var Et = at, Pt; Et !== null; ) {
                    Pt = Et;
                    var It = Pt.stateNode;
                    if (Pt.tag === 5 && It !== null && (Pt = It,
                    At !== null && (It = Kb(Et, At),
                    It != null && bt.push(tf(Et, It, Pt)))),
                    St)
                        break;
                    Et = Et.return
                }
                0 < bt.length && (ht = new _t(ht,vt,null,c,ut),
                pt.push({
                    event: ht,
                    listeners: bt
                }))
            }
        }
        if (!(o & 7)) {
            e: {
                if (ht = d === "mouseover" || d === "pointerover",
                _t = d === "mouseout" || d === "pointerout",
                ht && c !== wb && (vt = c.relatedTarget || c.fromElement) && (Wc(vt) || vt[uf]))
                    break e;
                if ((_t || ht) && (ht = ut.window === ut ? ut : (ht = ut.ownerDocument) ? ht.defaultView || ht.parentWindow : window,
                _t ? (vt = c.relatedTarget || c.toElement,
                _t = at,
                vt = vt ? Wc(vt) : null,
                vt !== null && (St = Vb(vt),
                vt !== St || vt.tag !== 5 && vt.tag !== 6) && (vt = null)) : (_t = null,
                vt = at),
                _t !== vt)) {
                    if (bt = Bd,
                    It = "onMouseLeave",
                    At = "onMouseEnter",
                    Et = "mouse",
                    (d === "pointerout" || d === "pointerover") && (bt = Td,
                    It = "onPointerLeave",
                    At = "onPointerEnter",
                    Et = "pointer"),
                    St = _t == null ? ht : ue(_t),
                    Pt = vt == null ? ht : ue(vt),
                    ht = new bt(It,Et + "leave",_t,c,ut),
                    ht.target = St,
                    ht.relatedTarget = Pt,
                    It = null,
                    Wc(ut) === at && (bt = new bt(At,Et + "enter",vt,c,ut),
                    bt.target = Pt,
                    bt.relatedTarget = St,
                    It = bt),
                    St = It,
                    _t && vt)
                        t: {
                            for (bt = _t,
                            At = vt,
                            Et = 0,
                            Pt = bt; Pt; Pt = vf(Pt))
                                Et++;
                            for (Pt = 0,
                            It = At; It; It = vf(It))
                                Pt++;
                            for (; 0 < Et - Pt; )
                                bt = vf(bt),
                                Et--;
                            for (; 0 < Pt - Et; )
                                At = vf(At),
                                Pt--;
                            for (; Et--; ) {
                                if (bt === At || At !== null && bt === At.alternate)
                                    break t;
                                bt = vf(bt),
                                At = vf(At)
                            }
                            bt = null
                        }
                    else
                        bt = null;
                    _t !== null && wf(pt, ht, _t, bt, !1),
                    vt !== null && St !== null && wf(pt, St, vt, bt, !0)
                }
            }
            e: {
                if (ht = at ? ue(at) : window,
                _t = ht.nodeName && ht.nodeName.toLowerCase(),
                _t === "select" || _t === "input" && ht.type === "file")
                    var Dt = ve;
                else if (me(ht))
                    if (we)
                        Dt = Fe;
                    else {
                        Dt = De;
                        var Gt = Ce
                    }
                else
                    (_t = ht.nodeName) && _t.toLowerCase() === "input" && (ht.type === "checkbox" || ht.type === "radio") && (Dt = Ee);
                if (Dt && (Dt = Dt(d, at))) {
                    ne(pt, Dt, c, ut);
                    break e
                }
                Gt && Gt(d, ht, at),
                d === "focusout" && (Gt = ht._wrapperState) && Gt.controlled && ht.type === "number" && cb(ht, "number", ht.value)
            }
            switch (Gt = at ? ue(at) : window,
            d) {
            case "focusin":
                (me(Gt) || Gt.contentEditable === "true") && (Qe = Gt,
                Re = at,
                Se = null);
                break;
            case "focusout":
                Se = Re = Qe = null;
                break;
            case "mousedown":
                Te = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                Te = !1,
                Ue(pt, c, ut);
                break;
            case "selectionchange":
                if (Pe)
                    break;
            case "keydown":
            case "keyup":
                Ue(pt, c, ut)
            }
            var Bt;
            if (ae)
                e: {
                    switch (d) {
                    case "compositionstart":
                        var kt = "onCompositionStart";
                        break e;
                    case "compositionend":
                        kt = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        kt = "onCompositionUpdate";
                        break e
                    }
                    kt = void 0
                }
            else
                ie ? ge(d, c) && (kt = "onCompositionEnd") : d === "keydown" && c.keyCode === 229 && (kt = "onCompositionStart");
            kt && (de && c.locale !== "ko" && (ie || kt !== "onCompositionStart" ? kt === "onCompositionEnd" && ie && (Bt = nd()) : (kd = ut,
            ld = "value"in kd ? kd.value : kd.textContent,
            ie = !0)),
            Gt = oe(at, kt),
            0 < Gt.length && (kt = new Ld(kt,d,null,c,ut),
            pt.push({
                event: kt,
                listeners: Gt
            }),
            Bt ? kt.data = Bt : (Bt = he(c),
            Bt !== null && (kt.data = Bt)))),
            (Bt = ce ? je(d, c) : ke(d, c)) && (at = oe(at, "onBeforeInput"),
            0 < at.length && (ut = new Ld("onBeforeInput","beforeinput",null,c,ut),
            pt.push({
                event: ut,
                listeners: at
            }),
            ut.data = Bt))
        }
        se(pt, o)
    })
}

export default hd;
