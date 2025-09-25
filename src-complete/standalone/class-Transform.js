/* Standalone Class: Transform */

class Transform extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_TEXTURE_TRANSFORM,
        this.propertyType = "Transform",
        this.parentTypes = [index_modern_PropertyType.TEXTURE_INFO]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            offset: [0, 0],
            rotation: 0,
            scale: [1, 1],
            texCoord: null
        })
    }
    getOffset() {
        return this.get("offset")
    }
    setOffset(o) {
        return this.set("offset", o)
    }
    getRotation() {
        return this.get("rotation")
    }
    setRotation(o) {
        return this.set("rotation", o)
    }
    getScale() {
        return this.get("scale")
    }
    setScale(o) {
        return this.set("scale", o)
    }
    getTexCoord() {
        return this.get("texCoord")
    }
    setTexCoord(o) {
        return this.set("texCoord", o)
    }
}

export default Transform;
