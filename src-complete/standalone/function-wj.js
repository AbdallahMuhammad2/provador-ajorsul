/* Standalone Function: Wj */

function Wj(d, o, c) {
    var h = d.tag;
    if (h === 5 || h === 6)
        d = d.stateNode,
        o ? c.insertBefore(d, o) : c.appendChild(d);
    else if (h !== 4 && (d = d.child,
    d !== null))
        for (Wj(d, o, c),
        d = d.sibling; d !== null; )
            Wj(d, o, c),
            d = d.sibling
}

export default Wj;
