/* Standalone Function: hj */

function hj(d, o, c, h, _) {
    if (Zf(c)) {
        var b = !0;
        cg(o)
    } else
        b = !1;
    if (ch(o, _),
    o.stateNode === null)
        ij(d, o),
        Gi(o, c, h),
        Ii(o, c, h, _),
        h = !0;
    else if (d === null) {
        var _e = o.stateNode
          , nt = o.memoizedProps;
        _e.props = nt;
        var it = _e.context
          , at = c.contextType;
        typeof at == "object" && at !== null ? at = eh(at) : (at = Zf(c) ? Xf : H.current,
        at = Yf(o, at));
        var ut = c.getDerivedStateFromProps
          , pt = typeof ut == "function" || typeof _e.getSnapshotBeforeUpdate == "function";
        pt || typeof _e.UNSAFE_componentWillReceiveProps != "function" && typeof _e.componentWillReceiveProps != "function" || (nt !== h || it !== at) && Hi(o, _e, h, at),
        jh = !1;
        var ht = o.memoizedState;
        _e.state = ht,
        qh(o, h, _e, _),
        it = o.memoizedState,
        nt !== h || ht !== it || Wf.current || jh ? (typeof ut == "function" && (Di(o, c, ut, h),
        it = o.memoizedState),
        (nt = jh || Fi(o, c, nt, h, ht, it, at)) ? (pt || typeof _e.UNSAFE_componentWillMount != "function" && typeof _e.componentWillMount != "function" || (typeof _e.componentWillMount == "function" && _e.componentWillMount(),
        typeof _e.UNSAFE_componentWillMount == "function" && _e.UNSAFE_componentWillMount()),
        typeof _e.componentDidMount == "function" && (o.flags |= 4194308)) : (typeof _e.componentDidMount == "function" && (o.flags |= 4194308),
        o.memoizedProps = h,
        o.memoizedState = it),
        _e.props = h,
        _e.state = it,
        _e.context = at,
        h = nt) : (typeof _e.componentDidMount == "function" && (o.flags |= 4194308),
        h = !1)
    } else {
        _e = o.stateNode,
        lh(d, o),
        nt = o.memoizedProps,
        at = o.type === o.elementType ? nt : Ci(o.type, nt),
        _e.props = at,
        pt = o.pendingProps,
        ht = _e.context,
        it = c.contextType,
        typeof it == "object" && it !== null ? it = eh(it) : (it = Zf(c) ? Xf : H.current,
        it = Yf(o, it));
        var _t = c.getDerivedStateFromProps;
        (ut = typeof _t == "function" || typeof _e.getSnapshotBeforeUpdate == "function") || typeof _e.UNSAFE_componentWillReceiveProps != "function" && typeof _e.componentWillReceiveProps != "function" || (nt !== pt || ht !== it) && Hi(o, _e, h, it),
        jh = !1,
        ht = o.memoizedState,
        _e.state = ht,
        qh(o, h, _e, _);
        var vt = o.memoizedState;
        nt !== pt || ht !== vt || Wf.current || jh ? (typeof _t == "function" && (Di(o, c, _t, h),
        vt = o.memoizedState),
        (at = jh || Fi(o, c, at, h, ht, vt, it) || !1) ? (ut || typeof _e.UNSAFE_componentWillUpdate != "function" && typeof _e.componentWillUpdate != "function" || (typeof _e.componentWillUpdate == "function" && _e.componentWillUpdate(h, vt, it),
        typeof _e.UNSAFE_componentWillUpdate == "function" && _e.UNSAFE_componentWillUpdate(h, vt, it)),
        typeof _e.componentDidUpdate == "function" && (o.flags |= 4),
        typeof _e.getSnapshotBeforeUpdate == "function" && (o.flags |= 1024)) : (typeof _e.componentDidUpdate != "function" || nt === d.memoizedProps && ht === d.memoizedState || (o.flags |= 4),
        typeof _e.getSnapshotBeforeUpdate != "function" || nt === d.memoizedProps && ht === d.memoizedState || (o.flags |= 1024),
        o.memoizedProps = h,
        o.memoizedState = vt),
        _e.props = h,
        _e.state = vt,
        _e.context = it,
        h = at) : (typeof _e.componentDidUpdate != "function" || nt === d.memoizedProps && ht === d.memoizedState || (o.flags |= 4),
        typeof _e.getSnapshotBeforeUpdate != "function" || nt === d.memoizedProps && ht === d.memoizedState || (o.flags |= 1024),
        h = !1)
    }
    return jj(d, o, c, h, b, _)
}

export default hj;
