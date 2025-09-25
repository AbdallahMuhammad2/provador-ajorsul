/* Standalone Function: Xc */

function Xc(d) {
    if (d.blockedOn !== null)
        return !1;
    for (var o = d.targetContainers; 0 < o.length; ) {
        var c = Yc(d.domEventName, d.eventSystemFlags, o[0], d.nativeEvent);
        if (c === null) {
            c = d.nativeEvent;
            var h = new c.constructor(c.type,c);
            wb = h,
            c.target.dispatchEvent(h),
            wb = null
        } else
            return o = Cb(c),
            o !== null && Fc(o),
            d.blockedOn = c,
            !1;
        o.shift()
    }
    return !0
}

export default Xc;
