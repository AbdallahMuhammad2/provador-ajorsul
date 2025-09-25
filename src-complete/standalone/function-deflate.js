/* Standalone Function: deflate */

function deflate(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bDflt], function(h) {
        return pbf(deflateSync(h.data[0], h.data[1]))
    }, 0, c)
}

export default deflate;
