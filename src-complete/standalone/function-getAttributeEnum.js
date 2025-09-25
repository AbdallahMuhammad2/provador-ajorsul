/* Standalone Function: getAttributeEnum */

function getAttributeEnum(d) {
    return d === "POSITION" ? AttributeEnum.POSITION : d === "NORMAL" ? AttributeEnum.NORMAL : d.startsWith("COLOR_") ? AttributeEnum.COLOR : d.startsWith("TEXCOORD_") ? AttributeEnum.TEX_COORD : AttributeEnum.GENERIC
}

export default getAttributeEnum;
