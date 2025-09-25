/* Standalone Function: makeState */

function makeState({scrapeMotionValuesFromProps: d, createRenderState: o, onMount: c}, h, _, b) {
    const _e = {
        latestValues: makeLatestValues(h, _, b, d),
        renderState: o()
    };
    return c && (_e.mount = nt => c(h, nt, _e)),
    _e
}

export default makeState;
