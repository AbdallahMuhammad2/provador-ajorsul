/* Standalone Class: index_modern_PrimitiveTarget */

class index_modern_PrimitiveTarget extends Property {
    init() {
        this.propertyType = index_modern_PropertyType.PRIMITIVE_TARGET
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            attributes: new RefMap
        })
    }
    getAttribute(o) {
        return this.getRefMap("attributes", o)
    }
    setAttribute(o, c) {
        return this.setRefMap("attributes", o, c, {
            usage: BufferViewUsage$1.ARRAY_BUFFER
        })
    }
    listAttributes() {
        return this.listRefMapValues("attributes")
    }
    listSemantics() {
        return this.listRefMapKeys("attributes")
    }
}

export default index_modern_PrimitiveTarget;
