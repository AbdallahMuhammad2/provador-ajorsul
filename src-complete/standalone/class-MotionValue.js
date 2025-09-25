/* Standalone Class: MotionValue */

class MotionValue {
    constructor(o, c={}) {
        this.version = "11.1.9",
        this.canTrackVelocity = !1,
        this.events = {},
        this.updateAndNotify = (h, _=!0) => {
            const b = time.now();
            this.updatedAt !== b && this.setPrevFrameValue(),
            this.prev = this.current,
            this.setCurrent(h),
            this.current !== this.prev && this.events.change && this.events.change.notify(this.current),
            _ && this.events.renderRequest && this.events.renderRequest.notify(this.current)
        }
        ,
        this.hasAnimated = !1,
        this.setCurrent(o),
        this.canTrackVelocity = isFloat(this.current),
        this.owner = c.owner
    }
    setCurrent(o) {
        this.current = o,
        this.updatedAt = time.now()
    }
    setPrevFrameValue(o=this.current) {
        this.prevFrameValue = o,
        this.prevUpdatedAt = this.updatedAt
    }
    onChange(o) {
        return this.on("change", o)
    }
    on(o, c) {
        this.events[o] || (this.events[o] = new SubscriptionManager);
        const h = this.events[o].add(c);
        return o === "change" ? () => {
            h(),
            frame.read( () => {
                this.events.change.getSize() || this.stop()
            }
            )
        }
        : h
    }
    clearListeners() {
        for (const o in this.events)
            this.events[o].clear()
    }
    attach(o, c) {
        this.passiveEffect = o,
        this.stopPassiveEffect = c
    }
    set(o, c=!0) {
        !c || !this.passiveEffect ? this.updateAndNotify(o, c) : this.passiveEffect(o, this.updateAndNotify)
    }
    setWithVelocity(o, c, h) {
        this.set(c),
        this.prev = void 0,
        this.prevFrameValue = o,
        this.prevUpdatedAt = this.updatedAt - h
    }
    jump(o, c=!0) {
        this.updateAndNotify(o),
        this.prev = o,
        this.prevUpdatedAt = this.prevFrameValue = void 0,
        c && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    get() {
        return collectMotionValues.current && collectMotionValues.current.push(this),
        this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const o = time.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || o - this.updatedAt > MAX_VELOCITY_DELTA)
            return 0;
        const c = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), c)
    }
    start(o) {
        return this.stop(),
        new Promise(c => {
            this.hasAnimated = !0,
            this.animation = o(c),
            this.events.animationStart && this.events.animationStart.notify()
        }
        ).then( () => {
            this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation()
        }
        )
    }
    stop() {
        this.animation && (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
}

export default MotionValue;
