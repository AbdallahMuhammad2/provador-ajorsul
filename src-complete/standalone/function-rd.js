/* Standalone Function: rd */

function rd(d) {
    function o(c, h, _, b, _e) {
        this._reactName = c,
        this._targetInst = _,
        this.type = h,
        this.nativeEvent = b,
        this.target = _e,
        this.currentTarget = null;
        for (var nt in d)
            d.hasOwnProperty(nt) && (c = d[nt],
            this[nt] = c ? c(b) : b[nt]);
        return this.isDefaultPrevented = (b.defaultPrevented != null ? b.defaultPrevented : b.returnValue === !1) ? pd : qd,
        this.isPropagationStopped = qd,
        this
    }
    return A(o.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var c = this.nativeEvent;
            c && (c.preventDefault ? c.preventDefault() : typeof c.returnValue != "unknown" && (c.returnValue = !1),
            this.isDefaultPrevented = pd)
        },
        stopPropagation: function() {
            var c = this.nativeEvent;
            c && (c.stopPropagation ? c.stopPropagation() : typeof c.cancelBubble != "unknown" && (c.cancelBubble = !0),
            this.isPropagationStopped = pd)
        },
        persist: function() {},
        isPersistent: pd
    }),
    o
}

export default rd;
