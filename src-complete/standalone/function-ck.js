/* Standalone Function: Ck */

function Ck(d, o) {
    for (o &= ~rk,
    o &= ~qk,
    d.suspendedLanes |= o,
    d.pingedLanes &= ~o,
    d = d.expirationTimes; 0 < o; ) {
        var c = 31 - oc(o)
          , h = 1 << c;
        d[c] = -1,
        o &= ~h
    }
}

export default Ck;
