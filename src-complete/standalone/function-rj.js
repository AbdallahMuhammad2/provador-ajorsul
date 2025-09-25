/* Standalone Function: Rj */

function Rj(d) {
    var o = d.ref;
    if (o !== null) {
        var c = d.stateNode;
        switch (d.tag) {
        case 5:
            d = c;
            break;
        default:
            d = c
        }
        typeof o == "function" ? o(d) : o.current = d
    }
}

export default Rj;
