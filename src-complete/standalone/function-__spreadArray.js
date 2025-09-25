/* Standalone Function: __spreadArray */

function __spreadArray(d, o, c) {
    if (c || arguments.length === 2)
        for (var h, _ = 0, b = o.length; _ < b; _++)
            !h && _ in o || (h || (h = Array.prototype.slice.call(o, 0, _)),
            h[_] = o[_]);
    return d.concat(h || Array.prototype.slice.call(o))
}

export default __spreadArray;
