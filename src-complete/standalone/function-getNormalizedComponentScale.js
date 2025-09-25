/* Standalone Function: getNormalizedComponentScale */

function getNormalizedComponentScale(d) {
    switch (d) {
    case Int8Array:
        return 1 / 127;
    case Uint8Array:
        return 1 / 255;
    case Int16Array:
        return 1 / 32767;
    case Uint16Array:
        return 1 / 65535;
    default:
        throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
    }
}

export default getNormalizedComponentScale;
