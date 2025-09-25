/* Standalone Class: Light */

class Light extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_LIGHTS_PUNCTUAL,
        this.propertyType = "Light",
        this.parentTypes = [index_modern_PropertyType.NODE]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            color: [1, 1, 1],
            intensity: 1,
            type: Light.Type.POINT,
            range: null,
            innerConeAngle: 0,
            outerConeAngle: Math.PI / 4
        })
    }
    getColor() {
        return this.get("color")
    }
    setColor(o) {
        return this.set("color", o)
    }
    getIntensity() {
        return this.get("intensity")
    }
    setIntensity(o) {
        return this.set("intensity", o)
    }
    getType() {
        return this.get("type")
    }
    setType(o) {
        return this.set("type", o)
    }
    getRange() {
        return this.get("range")
    }
    setRange(o) {
        return this.set("range", o)
    }
    getInnerConeAngle() {
        return this.get("innerConeAngle")
    }
    setInnerConeAngle(o) {
        return this.set("innerConeAngle", o)
    }
    getOuterConeAngle() {
        return this.get("outerConeAngle")
    }
    setOuterConeAngle(o) {
        return this.set("outerConeAngle", o)
    }
}

export default Light;
