/* Standalone Function: gunzip */

function gunzip(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return cbify(d, o, [bInflt, guze, function() {
        return [gunzipSync]
    }
    ], function(h) {
        return pbf(gunzipSync(h.data[0]))
    }, 3, c)
}

export default gunzip;
