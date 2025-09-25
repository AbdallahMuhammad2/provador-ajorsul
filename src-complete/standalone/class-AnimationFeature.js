/* Standalone Class: AnimationFeature */

class AnimationFeature extends Feature {
    constructor(o) {
        super(o),
        o.animationState || (o.animationState = createAnimationState(o))
    }
    updateAnimationControlsSubscription() {
        const {animate: o} = this.node.getProps();
        this.unmount(),
        isAnimationControls(o) && (this.unmount = o.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {animate: o} = this.node.getProps()
          , {animate: c} = this.node.prevProps || {};
        o !== c && this.updateAnimationControlsSubscription()
    }
    unmount() {}
}

export default AnimationFeature;
