/* Standalone Function: uiVector */

function uiVector(d, o, c, h) {
    return uiConfig("vec", {
        label: d,
        bounds: o,
        stepSize: c,
        params: h
    })
}

export default uiVector;
