/* Standalone Function: Ti */

function Ti(d, o, c) {
    var h = d.pingCache;
    h !== null && h.delete(o),
    o = R(),
    d.pingedLanes |= d.suspendedLanes & c,
    Q === d && (Z & c) === c && (T === 4 || T === 3 && (Z & 130023424) === Z && 500 > B() - fk ? Kk(d, 0) : rk |= c),
    Dk(d, o)
}

export default Ti;
