/* Standalone Function: isVariantLabel */

function isVariantLabel(d) {
    return typeof d == "string" || Array.isArray(d)
}

export default isVariantLabel;
