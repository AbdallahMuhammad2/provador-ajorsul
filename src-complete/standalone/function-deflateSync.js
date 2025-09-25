/* Standalone Function: deflateSync */

function deflateSync(d, o) {
    return dopt(d, o || {}, 0, 0)
}

export default deflateSync;
