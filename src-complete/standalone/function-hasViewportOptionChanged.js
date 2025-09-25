/* Standalone Function: hasViewportOptionChanged */

function hasViewportOptionChanged({viewport: d={}}, {viewport: o={}}={}) {
    return c => d[c] !== o[c]
}

export default hasViewportOptionChanged;
