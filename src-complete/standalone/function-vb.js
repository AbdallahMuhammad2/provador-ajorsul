/* Standalone Function: Vb */

function Vb(d) {
    var o = d
      , c = d;
    if (d.alternate)
        for (; o.return; )
            o = o.return;
    else {
        d = o;
        do
            o = d,
            o.flags & 4098 && (c = o.return),
            d = o.return;
        while (d)
    }
    return o.tag === 3 ? c : null
}

export default Vb;
