/* Standalone Function: propagateDirtyNodes */

function propagateDirtyNodes(d) {
    projectionFrameData.totalNodes++,
    d.parent && (d.isProjecting() || (d.isProjectionDirty = d.parent.isProjectionDirty),
    d.isSharedProjectionDirty || (d.isSharedProjectionDirty = !!(d.isProjectionDirty || d.parent.isProjectionDirty || d.parent.isSharedProjectionDirty)),
    d.isTransformDirty || (d.isTransformDirty = d.parent.isTransformDirty))
}

export default propagateDirtyNodes;
