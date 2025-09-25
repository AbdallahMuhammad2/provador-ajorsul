/* Standalone Function: mapEasingToNativeEasing */

function mapEasingToNativeEasing(d) {
    if (d)
        return isBezierDefinition(d) ? cubicBezierAsString(d) : Array.isArray(d) ? d.map(mapEasingToNativeEasingWithDefault) : supportedWaapiEasing[d]
}

export default mapEasingToNativeEasing;
