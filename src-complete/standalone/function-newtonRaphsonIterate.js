/* Standalone Function: newtonRaphsonIterate */

function newtonRaphsonIterate(d, o, c, h) {
    for (var _ = 0; _ < newtonIterations; ++_) {
        var b = getSlope(o, c, h);
        if (b === 0)
            return o;
        o -= (calcBezier$1(o, c, h) - d) / b
    }
    return o
}

export default newtonRaphsonIterate;
