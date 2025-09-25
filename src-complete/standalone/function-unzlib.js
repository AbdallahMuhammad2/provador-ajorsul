/* Standalone Function: unzlib */

function unzlib(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bInflt, zule, function() {
        return [unzlibSync]
    }
    ], function(h) {
        return pbf(unzlibSync(h.data[0], gu8(h.data[1])))
    }, 5, c)
}

export default unzlib;
