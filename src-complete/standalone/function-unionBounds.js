/* Standalone Function: unionBounds */

function unionBounds(d, o, c) {
    let h, _;
    for (let b = 0; b < 3; b++) {
        const _e = b + 3;
        h = d[b],
        _ = o[b],
        c[b] = h < _ ? h : _,
        h = d[_e],
        _ = o[_e],
        c[_e] = h > _ ? h : _
    }
}

export default unionBounds;
