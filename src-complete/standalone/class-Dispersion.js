/* Standalone Class: Dispersion */

class Dispersion extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_DISPERSION,
        this.propertyType = "Dispersion",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            dispersion: 0
        })
    }
    getDispersion() {
        return this.get("dispersion")
    }
    setDispersion(o) {
        return this.set("dispersion", o)
    }
}

export default Dispersion;
