/* Standalone Function: mergeByName */

function mergeByName(d) {
    var o = d.reduce(function(c, h) {
        var _ = c[h.name];
        return c[h.name] = _ ? Object.assign({}, _, h, {
            options: Object.assign({}, _.options, h.options),
            data: Object.assign({}, _.data, h.data)
        }) : h,
        c
    }, {});
    return Object.keys(o).map(function(c) {
        return o[c]
    })
}

export default mergeByName;
