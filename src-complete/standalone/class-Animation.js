/* Standalone Class: Animation */

class Animation extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.ANIMATION
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            channels: new RefSet,
            samplers: new RefSet
        })
    }
    addChannel(o) {
        return this.addRef("channels", o)
    }
    removeChannel(o) {
        return this.removeRef("channels", o)
    }
    listChannels() {
        return this.listRefs("channels")
    }
    addSampler(o) {
        return this.addRef("samplers", o)
    }
    removeSampler(o) {
        return this.removeRef("samplers", o)
    }
    listSamplers() {
        return this.listRefs("samplers")
    }
}

export default Animation;
