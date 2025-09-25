/* Standalone Class: index_modern_Mesh */

class index_modern_Mesh extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.MESH
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            weights: [],
            primitives: new RefSet
        })
    }
    addPrimitive(o) {
        return this.addRef("primitives", o)
    }
    removePrimitive(o) {
        return this.removeRef("primitives", o)
    }
    listPrimitives() {
        return this.listRefs("primitives")
    }
    getWeights() {
        return this.get("weights")
    }
    setWeights(o) {
        return this.set("weights", o)
    }
}

export default index_modern_Mesh;
