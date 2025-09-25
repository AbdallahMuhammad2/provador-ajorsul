/* Standalone Class: EmissiveStrength */

class EmissiveStrength extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_EMISSIVE_STRENGTH,
        this.propertyType = "EmissiveStrength",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            emissiveStrength: 1
        })
    }
    getEmissiveStrength() {
        return this.get("emissiveStrength")
    }
    setEmissiveStrength(o) {
        return this.set("emissiveStrength", o)
    }
}

export default EmissiveStrength;
