/* Standalone Function: ei */

function ei(d) {
    var o = d.getSnapshot;
    d = d.value;
    try {
        var c = o();
        return !He(d, c)
    } catch {
        return !0
    }
}

export default ei;
