/* Standalone Function: Kf */

function Kf(d, o) {
    var c = o
      , h = 0;
    do {
        var _ = c.nextSibling;
        if (d.removeChild(c),
        _ && _.nodeType === 8)
            if (c = _.data,
            c === "/$") {
                if (h === 0) {
                    d.removeChild(_),
                    bd(o);
                    return
                }
                h--
            } else
                c !== "$" && c !== "$?" && c !== "$!" || h++;
        c = _
    } while (c);
    bd(o)
}

export default Kf;
