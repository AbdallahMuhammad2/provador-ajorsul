/* Standalone Function: isControllingVariants */

function isControllingVariants(d) {
    return isAnimationControls(d.animate) || variantProps.some(o => isVariantLabel(d[o]))
}

export default isControllingVariants;
