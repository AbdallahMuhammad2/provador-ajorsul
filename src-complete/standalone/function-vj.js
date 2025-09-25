/* Standalone Function: Vj */

function Vj(d, o, c) {
    var h = d.tag;
    if (h === 5 || h === 6)
        d = d.stateNode,
        o ? c.nodeType === 8 ? c.parentNode.insertBefore(d, o) : c.insertBefore(d, o) : (c.nodeType === 8 ? (o = c.parentNode,
        o.insertBefore(d, c)) : (o = c,
        o.appendChild(d)),
        c = c._reactRootContainer,
        c != null || o.onclick !== null || (o.onclick = Bf));
    else if (h !== 4 && (d = d.child,
    d !== null))
        for (Vj(d, o, c),
        d = d.sibling; d !== null; )
            Vj(d, o, c),
            d = d.sibling
}

export default Vj;
