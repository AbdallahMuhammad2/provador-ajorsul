/* Standalone Function: removeUndefinedProps */

function removeUndefinedProps(d) {
    return Object.keys(d).reduce(function(o, c) {
        return d[c] !== void 0 && (o[c] = d[c]),
        o
    }, {})
}

export default removeUndefinedProps;
