/* Standalone Function: expandToHashMap */

function expandToHashMap(d, o) {
    return o.reduce(function(c, h) {
        return c[h] = d,
        c
    }, {})
}

export default expandToHashMap;
