/* Standalone Function: Bc */

function Bc(d, o) {
    var c = d.pendingLanes & ~o;
    d.pendingLanes = o,
    d.suspendedLanes = 0,
    d.pingedLanes = 0,
    d.expiredLanes &= o,
    d.mutableReadLanes &= o,
    d.entangledLanes &= o,
    o = d.entanglements;
    var h = d.eventTimes;
    for (d = d.expirationTimes; 0 < c; ) {
        var _ = 31 - oc(c)
          , b = 1 << _;
        o[_] = 0,
        h[_] = -1,
        d[_] = -1,
        c &= ~b
    }
}

export default Bc;
