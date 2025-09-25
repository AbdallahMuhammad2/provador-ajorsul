/* Standalone Function: Ej */

function Ej(d, o, c) {
    var h = o.pendingProps;
    switch (wg(o),
    o.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return S(o),
        null;
    case 1:
        return Zf(o.type) && $f(),
        S(o),
        null;
    case 3:
        return h = o.stateNode,
        zh(),
        E(Wf),
        E(H),
        Eh(),
        h.pendingContext && (h.context = h.pendingContext,
        h.pendingContext = null),
        (d === null || d.child === null) && (Gg(o) ? o.flags |= 4 : d === null || d.memoizedState.isDehydrated && !(o.flags & 256) || (o.flags |= 1024,
        zg !== null && (Fj(zg),
        zg = null))),
        Aj(d, o),
        S(o),
        null;
    case 5:
        Bh(o);
        var _ = xh(wh.current);
        if (c = o.type,
        d !== null && o.stateNode != null)
            Bj(d, o, c, h, _),
            d.ref !== o.ref && (o.flags |= 512,
            o.flags |= 2097152);
        else {
            if (!h) {
                if (o.stateNode === null)
                    throw Error(p(166));
                return S(o),
                null
            }
            if (d = xh(uh.current),
            Gg(o)) {
                h = o.stateNode,
                c = o.type;
                var b = o.memoizedProps;
                switch (h[Of] = o,
                h[Pf] = b,
                d = (o.mode & 1) !== 0,
                c) {
                case "dialog":
                    D("cancel", h),
                    D("close", h);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    D("load", h);
                    break;
                case "video":
                case "audio":
                    for (_ = 0; _ < lf.length; _++)
                        D(lf[_], h);
                    break;
                case "source":
                    D("error", h);
                    break;
                case "img":
                case "image":
                case "link":
                    D("error", h),
                    D("load", h);
                    break;
                case "details":
                    D("toggle", h);
                    break;
                case "input":
                    Za(h, b),
                    D("invalid", h);
                    break;
                case "select":
                    h._wrapperState = {
                        wasMultiple: !!b.multiple
                    },
                    D("invalid", h);
                    break;
                case "textarea":
                    hb(h, b),
                    D("invalid", h)
                }
                ub(c, b),
                _ = null;
                for (var _e in b)
                    if (b.hasOwnProperty(_e)) {
                        var nt = b[_e];
                        _e === "children" ? typeof nt == "string" ? h.textContent !== nt && (b.suppressHydrationWarning !== !0 && Af(h.textContent, nt, d),
                        _ = ["children", nt]) : typeof nt == "number" && h.textContent !== "" + nt && (b.suppressHydrationWarning !== !0 && Af(h.textContent, nt, d),
                        _ = ["children", "" + nt]) : ea.hasOwnProperty(_e) && nt != null && _e === "onScroll" && D("scroll", h)
                    }
                switch (c) {
                case "input":
                    Va(h),
                    db(h, b, !0);
                    break;
                case "textarea":
                    Va(h),
                    jb(h);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof b.onClick == "function" && (h.onclick = Bf)
                }
                h = _,
                o.updateQueue = h,
                h !== null && (o.flags |= 4)
            } else {
                _e = _.nodeType === 9 ? _ : _.ownerDocument,
                d === "http://www.w3.org/1999/xhtml" && (d = kb(c)),
                d === "http://www.w3.org/1999/xhtml" ? c === "script" ? (d = _e.createElement("div"),
                d.innerHTML = "<script><\/script>",
                d = d.removeChild(d.firstChild)) : typeof h.is == "string" ? d = _e.createElement(c, {
                    is: h.is
                }) : (d = _e.createElement(c),
                c === "select" && (_e = d,
                h.multiple ? _e.multiple = !0 : h.size && (_e.size = h.size))) : d = _e.createElementNS(d, c),
                d[Of] = o,
                d[Pf] = h,
                zj(d, o, !1, !1),
                o.stateNode = d;
                e: {
                    switch (_e = vb(c, h),
                    c) {
                    case "dialog":
                        D("cancel", d),
                        D("close", d),
                        _ = h;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        D("load", d),
                        _ = h;
                        break;
                    case "video":
                    case "audio":
                        for (_ = 0; _ < lf.length; _++)
                            D(lf[_], d);
                        _ = h;
                        break;
                    case "source":
                        D("error", d),
                        _ = h;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        D("error", d),
                        D("load", d),
                        _ = h;
                        break;
                    case "details":
                        D("toggle", d),
                        _ = h;
                        break;
                    case "input":
                        Za(d, h),
                        _ = Ya(d, h),
                        D("invalid", d);
                        break;
                    case "option":
                        _ = h;
                        break;
                    case "select":
                        d._wrapperState = {
                            wasMultiple: !!h.multiple
                        },
                        _ = A({}, h, {
                            value: void 0
                        }),
                        D("invalid", d);
                        break;
                    case "textarea":
                        hb(d, h),
                        _ = gb(d, h),
                        D("invalid", d);
                        break;
                    default:
                        _ = h
                    }
                    ub(c, _),
                    nt = _;
                    for (b in nt)
                        if (nt.hasOwnProperty(b)) {
                            var it = nt[b];
                            b === "style" ? sb(d, it) : b === "dangerouslySetInnerHTML" ? (it = it ? it.__html : void 0,
                            it != null && nb(d, it)) : b === "children" ? typeof it == "string" ? (c !== "textarea" || it !== "") && ob(d, it) : typeof it == "number" && ob(d, "" + it) : b !== "suppressContentEditableWarning" && b !== "suppressHydrationWarning" && b !== "autoFocus" && (ea.hasOwnProperty(b) ? it != null && b === "onScroll" && D("scroll", d) : it != null && ta(d, b, it, _e))
                        }
                    switch (c) {
                    case "input":
                        Va(d),
                        db(d, h, !1);
                        break;
                    case "textarea":
                        Va(d),
                        jb(d);
                        break;
                    case "option":
                        h.value != null && d.setAttribute("value", "" + Sa(h.value));
                        break;
                    case "select":
                        d.multiple = !!h.multiple,
                        b = h.value,
                        b != null ? fb(d, !!h.multiple, b, !1) : h.defaultValue != null && fb(d, !!h.multiple, h.defaultValue, !0);
                        break;
                    default:
                        typeof _.onClick == "function" && (d.onclick = Bf)
                    }
                    switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        h = !!h.autoFocus;
                        break e;
                    case "img":
                        h = !0;
                        break e;
                    default:
                        h = !1
                    }
                }
                h && (o.flags |= 4)
            }
            o.ref !== null && (o.flags |= 512,
            o.flags |= 2097152)
        }
        return S(o),
        null;
    case 6:
        if (d && o.stateNode != null)
            Cj(d, o, d.memoizedProps, h);
        else {
            if (typeof h != "string" && o.stateNode === null)
                throw Error(p(166));
            if (c = xh(wh.current),
            xh(uh.current),
            Gg(o)) {
                if (h = o.stateNode,
                c = o.memoizedProps,
                h[Of] = o,
                (b = h.nodeValue !== c) && (d = xg,
                d !== null))
                    switch (d.tag) {
                    case 3:
                        Af(h.nodeValue, c, (d.mode & 1) !== 0);
                        break;
                    case 5:
                        d.memoizedProps.suppressHydrationWarning !== !0 && Af(h.nodeValue, c, (d.mode & 1) !== 0)
                    }
                b && (o.flags |= 4)
            } else
                h = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(h),
                h[Of] = o,
                o.stateNode = h
        }
        return S(o),
        null;
    case 13:
        if (E(L),
        h = o.memoizedState,
        d === null || d.memoizedState !== null && d.memoizedState.dehydrated !== null) {
            if (I && yg !== null && o.mode & 1 && !(o.flags & 128))
                Hg(),
                Ig(),
                o.flags |= 98560,
                b = !1;
            else if (b = Gg(o),
            h !== null && h.dehydrated !== null) {
                if (d === null) {
                    if (!b)
                        throw Error(p(318));
                    if (b = o.memoizedState,
                    b = b !== null ? b.dehydrated : null,
                    !b)
                        throw Error(p(317));
                    b[Of] = o
                } else
                    Ig(),
                    !(o.flags & 128) && (o.memoizedState = null),
                    o.flags |= 4;
                S(o),
                b = !1
            } else
                zg !== null && (Fj(zg),
                zg = null),
                b = !0;
            if (!b)
                return o.flags & 65536 ? o : null
        }
        return o.flags & 128 ? (o.lanes = c,
        o) : (h = h !== null,
        h !== (d !== null && d.memoizedState !== null) && h && (o.child.flags |= 8192,
        o.mode & 1 && (d === null || L.current & 1 ? T === 0 && (T = 3) : tj())),
        o.updateQueue !== null && (o.flags |= 4),
        S(o),
        null);
    case 4:
        return zh(),
        Aj(d, o),
        d === null && sf(o.stateNode.containerInfo),
        S(o),
        null;
    case 10:
        return ah(o.type._context),
        S(o),
        null;
    case 17:
        return Zf(o.type) && $f(),
        S(o),
        null;
    case 19:
        if (E(L),
        b = o.memoizedState,
        b === null)
            return S(o),
            null;
        if (h = (o.flags & 128) !== 0,
        _e = b.rendering,
        _e === null)
            if (h)
                Dj(b, !1);
            else {
                if (T !== 0 || d !== null && d.flags & 128)
                    for (d = o.child; d !== null; ) {
                        if (_e = Ch(d),
                        _e !== null) {
                            for (o.flags |= 128,
                            Dj(b, !1),
                            h = _e.updateQueue,
                            h !== null && (o.updateQueue = h,
                            o.flags |= 4),
                            o.subtreeFlags = 0,
                            h = c,
                            c = o.child; c !== null; )
                                b = c,
                                d = h,
                                b.flags &= 14680066,
                                _e = b.alternate,
                                _e === null ? (b.childLanes = 0,
                                b.lanes = d,
                                b.child = null,
                                b.subtreeFlags = 0,
                                b.memoizedProps = null,
                                b.memoizedState = null,
                                b.updateQueue = null,
                                b.dependencies = null,
                                b.stateNode = null) : (b.childLanes = _e.childLanes,
                                b.lanes = _e.lanes,
                                b.child = _e.child,
                                b.subtreeFlags = 0,
                                b.deletions = null,
                                b.memoizedProps = _e.memoizedProps,
                                b.memoizedState = _e.memoizedState,
                                b.updateQueue = _e.updateQueue,
                                b.type = _e.type,
                                d = _e.dependencies,
                                b.dependencies = d === null ? null : {
                                    lanes: d.lanes,
                                    firstContext: d.firstContext
                                }),
                                c = c.sibling;
                            return G(L, L.current & 1 | 2),
                            o.child
                        }
                        d = d.sibling
                    }
                b.tail !== null && B() > Gj && (o.flags |= 128,
                h = !0,
                Dj(b, !1),
                o.lanes = 4194304)
            }
        else {
            if (!h)
                if (d = Ch(_e),
                d !== null) {
                    if (o.flags |= 128,
                    h = !0,
                    c = d.updateQueue,
                    c !== null && (o.updateQueue = c,
                    o.flags |= 4),
                    Dj(b, !0),
                    b.tail === null && b.tailMode === "hidden" && !_e.alternate && !I)
                        return S(o),
                        null
                } else
                    2 * B() - b.renderingStartTime > Gj && c !== 1073741824 && (o.flags |= 128,
                    h = !0,
                    Dj(b, !1),
                    o.lanes = 4194304);
            b.isBackwards ? (_e.sibling = o.child,
            o.child = _e) : (c = b.last,
            c !== null ? c.sibling = _e : o.child = _e,
            b.last = _e)
        }
        return b.tail !== null ? (o = b.tail,
        b.rendering = o,
        b.tail = o.sibling,
        b.renderingStartTime = B(),
        o.sibling = null,
        c = L.current,
        G(L, h ? c & 1 | 2 : c & 1),
        o) : (S(o),
        null);
    case 22:
    case 23:
        return Hj(),
        h = o.memoizedState !== null,
        d !== null && d.memoizedState !== null !== h && (o.flags |= 8192),
        h && o.mode & 1 ? fj & 1073741824 && (S(o),
        o.subtreeFlags & 6 && (o.flags |= 8192)) : S(o),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(p(156, o.tag))
}

export default Ej;
