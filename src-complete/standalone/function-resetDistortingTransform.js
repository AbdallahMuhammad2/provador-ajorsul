/* Standalone Function: resetDistortingTransform */

function resetDistortingTransform(d, o, c, h) {
    const {latestValues: _} = o;
    _[d] && (c[d] = _[d],
    o.setStaticValue(d, 0),
    h && (h[d] = 0))
}

export default resetDistortingTransform;
