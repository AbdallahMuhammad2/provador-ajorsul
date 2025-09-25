/* Standalone Function: isWaapiSupportedEasing */

function isWaapiSupportedEasing(d) {
    return !!(!d || typeof d == "string" && d in supportedWaapiEasing || isBezierDefinition(d) || Array.isArray(d) && d.every(isWaapiSupportedEasing))
}

export default isWaapiSupportedEasing;
