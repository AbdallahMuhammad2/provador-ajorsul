/* Standalone Function: geometryUtils_ensureIndex */

function geometryUtils_ensureIndex(d, o) {
    if (!d.index) {
        const c = d.attributes.position.count
          , h = geometryUtils_getIndexArray(c, o.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
        d.setIndex(new three_module.THS(h,1));
        for (let _ = 0; _ < c; _++)
            h[_] = _
    }
}

export default geometryUtils_ensureIndex;
