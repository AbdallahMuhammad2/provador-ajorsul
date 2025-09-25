/* Standalone Class: Skin */

class Skin extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.SKIN
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            skeleton: null,
            inverseBindMatrices: null,
            joints: new RefSet
        })
    }
    getSkeleton() {
        return this.getRef("skeleton")
    }
    setSkeleton(o) {
        return this.setRef("skeleton", o)
    }
    getInverseBindMatrices() {
        return this.getRef("inverseBindMatrices")
    }
    setInverseBindMatrices(o) {
        return this.setRef("inverseBindMatrices", o, {
            usage: BufferViewUsage$1.INVERSE_BIND_MATRICES
        })
    }
    addJoint(o) {
        return this.addRef("joints", o)
    }
    removeJoint(o) {
        return this.removeRef("joints", o)
    }
    listJoints() {
        return this.listRefs("joints")
    }
}

export default Skin;
