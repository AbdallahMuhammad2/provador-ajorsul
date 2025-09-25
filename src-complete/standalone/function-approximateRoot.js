/* Standalone Function: approximateRoot */

function approximateRoot(d, o, c) {
    let h = c;
    for (let _ = 1; _ < rootIterations; _++)
        h = h - d(h) / o(h);
    return h
}

export default approximateRoot;
