/* Standalone Class: MappingList */

class MappingList extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_VARIANTS,
        this.propertyType = "MappingList",
        this.parentTypes = [index_modern_PropertyType.PRIMITIVE]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            mappings: new RefSet
        })
    }
    addMapping(o) {
        return this.addRef("mappings", o)
    }
    removeMapping(o) {
        return this.removeRef("mappings", o)
    }
    listMappings() {
        return this.listRefs("mappings")
    }
}

export default MappingList;
