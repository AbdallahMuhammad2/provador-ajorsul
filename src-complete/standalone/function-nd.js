/* Standalone Function: nd */

function nd() {
    if (md)
        return md;
    var d, o = ld, c = o.length, h, _ = "value"in kd ? kd.value : kd.textContent, b = _.length;
    for (d = 0; d < c && o[d] === _[d]; d++)
        ;
    var _e = c - d;
    for (h = 1; h <= _e && o[c - h] === _[b - h]; h++)
        ;
    return md = _.slice(d, 1 < h ? 1 - h : void 0)
}

export default nd;
