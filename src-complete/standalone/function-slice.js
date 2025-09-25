/* Standalone Function: slice */

function slice(d, o, c, h) {
    for (let _ = c, b = 0; _ < h; _++,
    b++)
        d[b] = o[_];
    return d
}

export default slice;
