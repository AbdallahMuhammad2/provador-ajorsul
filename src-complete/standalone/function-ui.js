/* Standalone Function: Ui */

function Ui(d) {
    do {
        var o;
        if ((o = d.tag === 13) && (o = d.memoizedState,
        o = o !== null ? o.dehydrated !== null : !0),
        o)
            return d;
        d = d.return
    } while (d !== null);
    return null
}

export default Ui;
