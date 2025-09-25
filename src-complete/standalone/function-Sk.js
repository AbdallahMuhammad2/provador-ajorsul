/* Standalone Function: Sk */

function Sk(d) {
    var o = d;
    do {
        var c = o.alternate;
        if (d = o.return,
        o.flags & 32768) {
            if (c = Ij(c, o),
            c !== null) {
                c.flags &= 32767,
                Y = c;
                return
            }
            if (d !== null)
                d.flags |= 32768,
                d.subtreeFlags = 0,
                d.deletions = null;
            else {
                T = 6,
                Y = null;
                return
            }
        } else if (c = Ej(c, o, fj),
        c !== null) {
            Y = c;
            return
        }
        if (o = o.sibling,
        o !== null) {
            Y = o;
            return
        }
        Y = o = d
    } while (o !== null);
    T === 0 && (T = 5)
}

export default Sk;
