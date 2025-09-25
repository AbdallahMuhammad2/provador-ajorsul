/* Standalone Class: index_modern_AnimationSampler */

class index_modern_AnimationSampler extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.ANIMATION_SAMPLER
    }
    getDefaultAttributes() {
        return Object.assign(super.getDefaults(), {
            interpolation: index_modern_AnimationSampler.Interpolation.LINEAR,
            input: null,
            output: null
        })
    }
    getInterpolation() {
        return this.get("interpolation")
    }
    setInterpolation(o) {
        return this.set("interpolation", o)
    }
    getInput() {
        return this.getRef("input")
    }
    setInput(o) {
        return this.setRef("input", o, {
            usage: BufferViewUsage$1.OTHER
        })
    }
    getOutput() {
        return this.getRef("output")
    }
    setOutput(o) {
        return this.setRef("output", o, {
            usage: BufferViewUsage$1.OTHER
        })
    }
}

export default index_modern_AnimationSampler;
