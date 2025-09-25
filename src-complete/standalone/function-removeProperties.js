/* Standalone Function: removeProperties */

function removeProperties(d, o) {
    var c = Object.assign({}, d);
    return o.forEach(function(h) {
        delete c[h]
    }),
    c
}

export default removeProperties;
