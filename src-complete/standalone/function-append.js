/* Standalone Function: append */

function append(d, o) {
    for (let c = 0, h = d.length, _ = o.length; c < _; c++,
    h++)
        d[h] = o[c]
}

export default append;
