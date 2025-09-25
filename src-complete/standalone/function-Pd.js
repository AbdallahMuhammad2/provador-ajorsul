/* Standalone Function: Pd */

function Pd(d) {
    var o = this.nativeEvent;
    return o.getModifierState ? o.getModifierState(d) : (d = Od[d]) ? !!o[d] : !1
}

export default Pd;
