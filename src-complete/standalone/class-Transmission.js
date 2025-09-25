/* Standalone Class: Transmission */

class Transmission extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_TRANSMISSION,
        this.propertyType = "Transmission",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            transmissionFactor: 0,
            transmissionTexture: null,
            transmissionTextureInfo: new index_modern_TextureInfo(this.graph,"transmissionTextureInfo")
        })
    }
    getTransmissionFactor() {
        return this.get("transmissionFactor")
    }
    setTransmissionFactor(o) {
        return this.set("transmissionFactor", o)
    }
    getTransmissionTexture() {
        return this.getRef("transmissionTexture")
    }
    getTransmissionTextureInfo() {
        return this.getRef("transmissionTexture") ? this.getRef("transmissionTextureInfo") : null
    }
    setTransmissionTexture(o) {
        return this.setRef("transmissionTexture", o, {
            channels: dist_index_modern_R
        })
    }
}

export default Transmission;
