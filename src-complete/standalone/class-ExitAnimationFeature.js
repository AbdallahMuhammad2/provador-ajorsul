/* Standalone Class: ExitAnimationFeature */

class ExitAnimationFeature extends Feature {
    constructor() {
        super(...arguments),
        this.id = id$1++
    }
    update() {
        if (!this.node.presenceContext)
            return;
        const {isPresent: o, onExitComplete: c} = this.node.presenceContext
          , {isPresent: h} = this.node.prevPresenceContext || {};
        if (!this.node.animationState || o === h)
            return;
        const _ = this.node.animationState.setActive("exit", !o);
        c && !o && _.then( () => c(this.id))
    }
    mount() {
        const {register: o} = this.node.presenceContext || {};
        o && (this.unmount = o(this.id))
    }
    unmount() {}
}

export default ExitAnimationFeature;
