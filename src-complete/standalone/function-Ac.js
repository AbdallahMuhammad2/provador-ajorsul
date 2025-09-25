/* Standalone Function: Ac */

function Ac(d, o, c) {
    d.pendingLanes |= o,
    o !== 536870912 && (d.suspendedLanes = 0,
    d.pingedLanes = 0),
    d = d.eventTimes,
    o = 31 - oc(o),
    d[o] = c
}

export default Ac;
