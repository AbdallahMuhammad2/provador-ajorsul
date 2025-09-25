/* Standalone Function: ensureIndex */

function ensureIndex(d, o) {
    if (!d.index) {
        const c = d.attributes.position.count
          , h = getIndexArray(c, o.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
        d.setIndex(new three_module.THS(h,1));
        for (let _ = 0; _ < c; _++)
            h[_] = _
    }
}

export default ensureIndex;
