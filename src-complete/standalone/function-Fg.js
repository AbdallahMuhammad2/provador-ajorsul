/* Standalone Function: Fg */

function Fg(d) {
    for (d = d.return; d !== null && d.tag !== 5 && d.tag !== 3 && d.tag !== 13; )
        d = d.return;
    xg = d
}

export default Fg;
