/* Standalone Class: index_modern_AnimationChannel */

class index_modern_AnimationChannel extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.ANIMATION_CHANNEL
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            targetPath: null,
            targetNode: null,
            sampler: null
        })
    }
    getTargetPath() {
        return this.get("targetPath")
    }
    setTargetPath(o) {
        return this.set("targetPath", o)
    }
    getTargetNode() {
        return this.getRef("targetNode")
    }
    setTargetNode(o) {
        return this.setRef("targetNode", o)
    }
    getSampler() {
        return this.getRef("sampler")
    }
    setSampler(o) {
        return this.setRef("sampler", o)
    }
}

export default index_modern_AnimationChannel;
