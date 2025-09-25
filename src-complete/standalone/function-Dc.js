/* Standalone Function: Dc */

function Dc(d) {
    return d &= -d,
    1 < d ? 4 < d ? d & 268435455 ? 16 : 536870912 : 4 : 1
}

export default Dc;
