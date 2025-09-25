/* Standalone Function: finishAnimation */

function finishAnimation(d) {
    d.finishAnimation(),
    d.targetDelta = d.relativeTarget = d.target = void 0,
    d.isProjectionDirty = !0
}

export default finishAnimation;
