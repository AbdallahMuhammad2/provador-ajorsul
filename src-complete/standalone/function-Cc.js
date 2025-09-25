/* Standalone Function: Cc */

function Cc(d, o) {
    var c = d.entangledLanes |= o;
    for (d = d.entanglements; c; ) {
        var h = 31 - oc(c)
          , _ = 1 << h;
        _ & o | d[h] & o && (d[h] |= o),
        c &= ~_
    }
}

export default Cc;
