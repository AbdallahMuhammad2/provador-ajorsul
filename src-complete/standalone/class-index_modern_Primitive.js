/* Standalone Class: index_modern_Primitive */

class index_modern_Primitive extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.PRIMITIVE
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            mode: index_modern_Primitive.Mode.TRIANGLES,
            material: null,
            indices: null,
            attributes: new RefMap,
            targets: new RefSet
        })
    }
    getIndices() {
        return this.getRef("indices")
    }
    setIndices(o) {
        return this.setRef("indices", o, {
            usage: BufferViewUsage$1.ELEMENT_ARRAY_BUFFER
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
    getMaterial() {
        return this.getRef("material")
    }
    setMaterial(o) {
        return this.setRef("material", o)
    }
    getMode() {
        return this.get("mode")
    }
    setMode(o) {
        return this.set("mode", o)
    }
    listTargets() {
        return this.listRefs("targets")
    }
    addTarget(o) {
        return this.addRef("targets", o)
    }
    removeTarget(o) {
        return this.removeRef("targets", o)
    }
}

export default index_modern_Primitive;
