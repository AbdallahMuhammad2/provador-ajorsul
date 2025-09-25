/* Standalone Function: inflate */

function inflate(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bInflt], function(h) {
        return pbf(inflateSync(h.data[0], gu8(h.data[1])))
    }, 1, c)
}

export default inflate;
