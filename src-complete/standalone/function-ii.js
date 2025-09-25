/* Standalone Function: Ii */

function Ii(d, o, c, h) {
    var _ = d.stateNode;
    _.props = c,
    _.state = d.memoizedState,
    _.refs = {},
    kh(d);
    var b = o.contextType;
    typeof b == "object" && b !== null ? _.context = eh(b) : (b = Zf(o) ? Xf : H.current,
    _.context = Yf(d, b)),
    _.state = d.memoizedState,
    b = o.getDerivedStateFromProps,
    typeof b == "function" && (Di(d, o, b, c),
    _.state = d.memoizedState),
    typeof o.getDerivedStateFromProps == "function" || typeof _.getSnapshotBeforeUpdate == "function" || typeof _.UNSAFE_componentWillMount != "function" && typeof _.componentWillMount != "function" || (o = _.state,
    typeof _.componentWillMount == "function" && _.componentWillMount(),
    typeof _.UNSAFE_componentWillMount == "function" && _.UNSAFE_componentWillMount(),
    o !== _.state && Ei.enqueueReplaceState(_, _.state, null),
    qh(d, c, _, h),
    _.state = d.memoizedState),
    typeof _.componentDidMount == "function" && (d.flags |= 4194308)
}

export default Ii;
