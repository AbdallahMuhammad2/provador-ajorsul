/* Standalone Function: v4 */

function v4(d, o, c) {
    var h = (d = d || {}).random || (d.rng || rng)();
    if (h[6] = 15 & h[6] | 64,
    h[8] = 63 & h[8] | 128,
    o) {
        c = c || 0;
        for (var _ = 0; _ < 16; ++_)
            o[c + _] = h[_];
        return o
    }
    return esm_browser_stringify(h)
}

export default v4;
