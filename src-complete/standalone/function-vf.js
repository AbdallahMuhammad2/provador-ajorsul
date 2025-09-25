/* Standalone Function: vf */

function vf(d) {
    if (d === null)
        return null;
    do
        d = d.return;
    while (d && d.tag !== 5);
    return d || null
}

export default vf;
