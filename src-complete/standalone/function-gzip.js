/* Standalone Function: gzip */

function gzip(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bDflt, gze, function() {
        return [gzipSync]
    }
    ], function(h) {
        return pbf(gzipSync(h.data[0], h.data[1]))
    }, 2, c)
}

export default gzip;
