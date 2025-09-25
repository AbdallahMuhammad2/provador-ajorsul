/* Standalone Function: addAttribute */

function addAttribute(d, o, c, h, _, b, _e) {
    switch (o) {
    case index_modern_Accessor.ComponentType.UNSIGNED_BYTE:
        return d.AddUInt8Attribute(c, h, _, b, _e);
    case index_modern_Accessor.ComponentType.BYTE:
        return d.AddInt8Attribute(c, h, _, b, _e);
    case index_modern_Accessor.ComponentType.UNSIGNED_SHORT:
        return d.AddUInt16Attribute(c, h, _, b, _e);
    case index_modern_Accessor.ComponentType.SHORT:
        return d.AddInt16Attribute(c, h, _, b, _e);
    case index_modern_Accessor.ComponentType.UNSIGNED_INT:
        return d.AddUInt32Attribute(c, h, _, b, _e);
    case index_modern_Accessor.ComponentType.FLOAT:
        return d.AddFloatAttribute(c, h, _, b, _e);
    default:
        throw new Error(`Unexpected component type, "${o}".`)
    }
}

export default addAttribute;
