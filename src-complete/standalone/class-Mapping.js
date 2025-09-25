/* Standalone Class: Mapping */

class Mapping extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_VARIANTS,
        this.propertyType = "Mapping",
        this.parentTypes = ["MappingList"]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            material: null,
            variants: new RefSet
        })
    }
    getMaterial() {
        return this.getRef("material")
    }
    setMaterial(o) {
        return this.setRef("material", o)
    }
    addVariant(o) {
        return this.addRef("variants", o)
    }
    removeVariant(o) {
        return this.removeRef("variants", o)
    }
    listVariants() {
        return this.listRefs("variants")
    }
}

export default Mapping;
