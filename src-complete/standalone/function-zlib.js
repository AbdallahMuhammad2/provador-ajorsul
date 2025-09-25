/* Standalone Function: zlib */

function zlib(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bDflt, zle, function() {
        return [zlibSync]
    }
    ], function(h) {
        return pbf(zlibSync(h.data[0], h.data[1]))
    }, 4, c)
}

export default zlib;
