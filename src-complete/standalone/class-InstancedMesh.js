/* Standalone Class: InstancedMesh */

class InstancedMesh extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = EXT_MESH_GPU_INSTANCING,
        this.propertyType = "InstancedMesh",
        this.parentTypes = [index_modern_PropertyType.NODE]
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
            usage: INSTANCE_ATTRIBUTE
        })
    }
    listAttributes() {
        return this.listRefMapValues("attributes")
    }
    listSemantics() {
        return this.listRefMapKeys("attributes")
    }
}

export default InstancedMesh;
