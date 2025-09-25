/* Standalone Function: arrayToComponentType */

function arrayToComponentType(d) {
    switch (d.constructor) {
    case Float32Array:
        return index_modern_Accessor.ComponentType.FLOAT;
    case Uint32Array:
        return index_modern_Accessor.ComponentType.UNSIGNED_INT;
    case Uint16Array:
        return index_modern_Accessor.ComponentType.UNSIGNED_SHORT;
    case Uint8Array:
        return index_modern_Accessor.ComponentType.UNSIGNED_BYTE;
    case Int16Array:
        return index_modern_Accessor.ComponentType.SHORT;
    case Int8Array:
        return index_modern_Accessor.ComponentType.BYTE;
    default:
        throw new Error("Unknown accessor componentType.")
    }
}

export default arrayToComponentType;
