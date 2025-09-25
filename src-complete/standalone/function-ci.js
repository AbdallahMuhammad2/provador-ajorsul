/* Standalone Function: Ci */

function Ci(d, o) {
    if (d && d.defaultProps) {
        o = A({}, o),
        d = d.defaultProps;
        for (var c in d)
            o[c] === void 0 && (o[c] = d[c]);
        return o
    }
    return o
}

export default Ci;
