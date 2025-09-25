/* Standalone Function: Je */

function Je(d) {
    for (; d && d.firstChild; )
        d = d.firstChild;
    return d
}

export default Je;
