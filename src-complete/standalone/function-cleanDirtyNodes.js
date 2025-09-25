/* Standalone Function: cleanDirtyNodes */

function cleanDirtyNodes(d) {
    d.isProjectionDirty = d.isSharedProjectionDirty = d.isTransformDirty = !1
}

export default cleanDirtyNodes;
