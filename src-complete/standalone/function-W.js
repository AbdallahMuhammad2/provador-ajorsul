/* Standalone Function: W */

function W(d, o, c) {
    if (d.tag === 3)
        Xk(d, d, c);
    else
        for (; o !== null; ) {
            if (o.tag === 3) {
                Xk(o, d, c);
                break
            } else if (o.tag === 1) {
                var h = o.stateNode;
                if (typeof o.type.getDerivedStateFromError == "function" || typeof h.componentDidCatch == "function" && (Ri === null || !Ri.has(h))) {
                    d = Ji(c, d),
                    d = Qi(o, d, 1),
                    o = nh(o, d, 1),
                    d = R(),
                    o !== null && (Ac(o, 1, d),
                    Dk(o, d));
                    break
                }
            }
            o = o.return
        }
}

export default W;
