/* Standalone Function: Hb */

function Hb() {}
var Ib = !1;
function Jb(d, o, c) {
    if (Ib)
        return d(o, c);
    Ib = !0;
    try {
        return Gb(d, o, c)
    } finally {
        Ib = !1,
        (zb !== null || Ab !== null) && (Hb(),
        Fb())
    }
}

export default Hb;
