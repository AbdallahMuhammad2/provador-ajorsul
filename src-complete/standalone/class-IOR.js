/* Standalone Class: IOR */

class IOR extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_IOR,
        this.propertyType = "IOR",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            ior: 1.5
        })
    }
    getIOR() {
        return this.get("ior")
    }
    setIOR(o) {
        return this.set("ior", o)
    }
}

export default IOR;
