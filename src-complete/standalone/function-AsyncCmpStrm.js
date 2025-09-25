/* Standalone Function: AsyncCmpStrm */

function AsyncCmpStrm(d, o) {
    return o || typeof d != "function" || (o = d,
    d = {}),
    this.ondata = o,
    d
}

export default AsyncCmpStrm;
