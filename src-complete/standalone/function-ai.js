/* Standalone Function: Ai */

function Ai(d, o) {
    Jh = Ih = !0;
    var c = d.pending;
    c === null ? o.next = o : (o.next = c.next,
    c.next = o),
    d.pending = o
}

export default Ai;
