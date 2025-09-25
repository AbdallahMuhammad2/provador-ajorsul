/* Standalone Function: expandByTriangleBounds */

function expandByTriangleBounds(d, o, c) {
    for (let h = 0; h < 3; h++) {
        const _ = o[d + 2 * h]
          , b = o[d + 2 * h + 1]
          , _e = _ - b
          , nt = _ + b;
        _e < c[h] && (c[h] = _e),
        nt > c[h + 3] && (c[h + 3] = nt)
    }
}

export default expandByTriangleBounds;
