/* Standalone Function: uiSlider */

function uiSlider(d, o, c, h) {
    return uiConfig("slider", {
        label: d,
        bounds: o,
        stepSize: c,
        params: h
    })
}

export default uiSlider;
