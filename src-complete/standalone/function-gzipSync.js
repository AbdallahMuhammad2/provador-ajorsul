/* Standalone Function: gzipSync */

function gzipSync(d, o) {
    o || (o = {});
    var c = crc()
      , h = d.length;
    c.p(d);
    var _ = dopt(d, o, gzhl(o), 8)
      , b = _.length;
    return gzh(_, o),
    wbytes(_, b - 8, c.d()),
    wbytes(_, b - 4, h),
    _
}

export default gzipSync;
