/* Standalone Function: Tc */

function Tc(d, o, c, h, _, b) {
    return d === null || d.nativeEvent !== b ? (d = {
        blockedOn: o,
        domEventName: c,
        eventSystemFlags: h,
        nativeEvent: b,
        targetContainers: [_]
    },
    o !== null && (o = Cb(o),
    o !== null && Fc(o)),
    d) : (d.eventSystemFlags |= h,
    o = d.targetContainers,
    _ !== null && o.indexOf(_) === -1 && o.push(_),
    d)
}

export default Tc;
