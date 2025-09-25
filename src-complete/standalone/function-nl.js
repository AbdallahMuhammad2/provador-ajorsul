/* Standalone Function: nl */

function nl(d) {
    return !(!d || d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11)
}

export default nl;
