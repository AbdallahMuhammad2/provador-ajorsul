/* Standalone Function: Ag */

function Ag(d, o) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED",
    c.stateNode = o,
    c.return = d,
    o = d.deletions,
    o === null ? (d.deletions = [c],
    d.flags |= 16) : o.push(c)
}

export default Ag;
