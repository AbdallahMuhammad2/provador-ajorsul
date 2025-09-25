/* Standalone Function: Nb */

function Nb(d, o, c, h, _, b, _e, nt, it) {
    var at = Array.prototype.slice.call(arguments, 3);
    try {
        o.apply(c, at)
    } catch (ut) {
        this.onError(ut)
    }
}

export default Nb;
