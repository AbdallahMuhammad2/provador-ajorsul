/* Standalone Class: BaseAnimation */

class BaseAnimation {
    constructor({autoplay: o=!0, delay: c=0, type: h="keyframes", repeat: _=0, repeatDelay: b=0, repeatType: _e="loop", ...nt}) {
        this.isStopped = !1,
        this.hasAttemptedResolve = !1,
        this.options = {
            autoplay: o,
            delay: c,
            type: h,
            repeat: _,
            repeatDelay: b,
            repeatType: _e,
            ...nt
        },
        this.updateFinishedPromise()
    }
    get resolved() {
        return !this._resolved && !this.hasAttemptedResolve && flushKeyframeResolvers(),
        this._resolved
    }
    onKeyframesResolved(o, c) {
        this.hasAttemptedResolve = !0;
        const {name: h, type: _, velocity: b, delay: _e, onComplete: nt, onUpdate: it, isGenerator: at} = this.options;
        if (!at && !canAnimate(o, h, _, b))
            if (_e)
                this.options.duration = 0;
            else {
                it == null || it(getFinalKeyframe(o, this.options, c)),
                nt == null || nt(),
                this.resolveFinishedPromise();
                return
            }
        const ut = this.initPlayback(o, c);
        ut !== !1 && (this._resolved = {
            keyframes: o,
            finalKeyframe: c,
            ...ut
        },
        this.onPostResolved())
    }
    onPostResolved() {}
    then(o, c) {
        return this.currentFinishedPromise.then(o, c)
    }
    updateFinishedPromise() {
        this.currentFinishedPromise = new Promise(o => {
            this.resolveFinishedPromise = o
        }
        )
    }
}

export default BaseAnimation;
