/* Standalone Function: mapEasingToNativeEasingWithDefault */

function mapEasingToNativeEasingWithDefault(d) {
    return mapEasingToNativeEasing(d) || supportedWaapiEasing.easeOut
}

export default mapEasingToNativeEasingWithDefault;
