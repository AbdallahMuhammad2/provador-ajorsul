/* Standalone Function: Qk */

function Qk(d, o) {
    var c = K;
    K |= 1;
    try {
        return d(o)
    } finally {
        K = c,
        K === 0 && (Gj = B() + 500,
        fg && jg())
    }
}

export default Qk;
