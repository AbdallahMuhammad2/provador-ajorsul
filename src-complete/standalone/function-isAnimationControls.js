/* Standalone Function: isAnimationControls */

function isAnimationControls(d) {
    return d !== null && typeof d == "object" && typeof d.start == "function"
}

export default isAnimationControls;
