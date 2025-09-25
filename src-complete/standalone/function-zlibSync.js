/* Standalone Function: zlibSync */

function zlibSync(d, o) {
    o || (o = {});
    var c = adler();
    c.p(d);
    var h = dopt(d, o, 2, 4);
    return zlh(h, o),
    wbytes(h, h.length - 4, c.d()),
    h
}

export default zlibSync;
