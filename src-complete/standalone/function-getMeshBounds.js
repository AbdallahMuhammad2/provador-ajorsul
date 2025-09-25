/* Standalone Function: getMeshBounds */

function getMeshBounds(d, o) {
    const c = createBounds();
    for (const h of d.listPrimitives()) {
        const _ = h.getAttribute("POSITION")
          , b = h.getIndices();
        if (!_)
            continue;
        let _e = [0, 0, 0]
          , nt = [0, 0, 0];
        for (let it = 0, at = b ? b.getCount() : _.getCount(); it < at; it++) {
            const ut = b ? b.getScalar(it) : it;
            _e = _.getElement(ut, _e),
            nt = transformMat4(nt, _e, o),
            expandBounds(nt, c)
        }
    }
    return c
}

export default getMeshBounds;
