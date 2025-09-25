/* Standalone Function: Qj */

function Qj(d, o) {
    if (o = o.updateQueue,
    o = o !== null ? o.lastEffect : null,
    o !== null) {
        var c = o = o.next;
        do {
            if ((c.tag & d) === d) {
                var h = c.create;
                c.destroy = h()
            }
            c = c.next
        } while (c !== o)
    }
}

export default Qj;
