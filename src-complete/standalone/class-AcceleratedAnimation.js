/* Standalone Class: AcceleratedAnimation */

class AcceleratedAnimation extends BaseAnimation {
    constructor(o) {
        super(o);
        const {name: c, motionValue: h, keyframes: _} = this.options;
        this.resolver = new DOMKeyframesResolver(_, (b, _e) => this.onKeyframesResolved(b, _e),c,h),
        this.resolver.scheduleResolve()
    }
    initPlayback(o, c) {
        var h;
        let {duration: _=300, times: b, ease: _e, type: nt, motionValue: it, name: at} = this.options;
        if (!(!((h = it.owner) === null || h === void 0) && h.current))
            return !1;
        if (requiresPregeneratedKeyframes(this.options)) {
            const {onComplete: pt, onUpdate: ht, motionValue: _t, ...vt} = this.options
              , bt = pregenerateKeyframes(o, vt);
            o = bt.keyframes,
            o.length === 1 && (o[1] = o[0]),
            _ = bt.duration,
            b = bt.times,
            _e = bt.ease,
            nt = "keyframes"
        }
        const ut = animateStyle(it.owner.current, at, o, {
            ...this.options,
            duration: _,
            times: b,
            ease: _e
        });
        return ut.startTime = time.now(),
        this.pendingTimeline ? (ut.timeline = this.pendingTimeline,
        this.pendingTimeline = void 0) : ut.onfinish = () => {
            const {onComplete: pt} = this.options;
            it.set(getFinalKeyframe(o, this.options, c)),
            pt && pt(),
            this.cancel(),
            this.resolveFinishedPromise()
        }
        ,
        {
            animation: ut,
            duration: _,
            times: b,
            type: nt,
            ease: _e,
            keyframes: o
        }
    }
    get duration() {
        const {resolved: o} = this;
        if (!o)
            return 0;
        const {duration: c} = o;
        return millisecondsToSeconds(c)
    }
    get time() {
        const {resolved: o} = this;
        if (!o)
            return 0;
        const {animation: c} = o;
        return millisecondsToSeconds(c.currentTime || 0)
    }
    set time(o) {
        const {resolved: c} = this;
        if (!c)
            return;
        const {animation: h} = c;
        h.currentTime = secondsToMilliseconds(o)
    }
    get speed() {
        const {resolved: o} = this;
        if (!o)
            return 1;
        const {animation: c} = o;
        return c.playbackRate
    }
    set speed(o) {
        const {resolved: c} = this;
        if (!c)
            return;
        const {animation: h} = c;
        h.playbackRate = o
    }
    get state() {
        const {resolved: o} = this;
        if (!o)
            return "idle";
        const {animation: c} = o;
        return c.playState
    }
    attachTimeline(o) {
        if (!this._resolved)
            this.pendingTimeline = o;
        else {
            const {resolved: c} = this;
            if (!c)
                return noop;
            const {animation: h} = c;
            h.timeline = o,
            h.onfinish = null
        }
        return noop
    }
    play() {
        if (this.isStopped)
            return;
        const {resolved: o} = this;
        if (!o)
            return;
        const {animation: c} = o;
        c.playState === "finished" && this.updateFinishedPromise(),
        c.play()
    }
    pause() {
        const {resolved: o} = this;
        if (!o)
            return;
        const {animation: c} = o;
        c.pause()
    }
    stop() {
        if (this.resolver.cancel(),
        this.isStopped = !0,
        this.state === "idle")
            return;
        const {resolved: o} = this;
        if (!o)
            return;
        const {animation: c, keyframes: h, duration: _, type: b, ease: _e, times: nt} = o;
        if (!(c.playState === "idle" || c.playState === "finished")) {
            if (this.time) {
                const {motionValue: it, onUpdate: at, onComplete: ut, ...pt} = this.options
                  , ht = new MainThreadAnimation({
                    ...pt,
                    keyframes: h,
                    duration: _,
                    type: b,
                    ease: _e,
                    times: nt,
                    isGenerator: !0
                })
                  , _t = secondsToMilliseconds(this.time);
                it.setWithVelocity(ht.sample(_t - sampleDelta).value, ht.sample(_t).value, sampleDelta)
            }
            this.cancel()
        }
    }
    complete() {
        const {resolved: o} = this;
        o && o.animation.finish()
    }
    cancel() {
        const {resolved: o} = this;
        o && o.animation.cancel()
    }
    static supports(o) {
        const {motionValue: c, name: h, repeatDelay: _, repeatType: b, damping: _e, type: nt} = o;
        return supportsWaapi() && h && acceleratedValues.has(h) && c && c.owner && c.owner.current instanceof HTMLElement && !c.owner.getProps().onUpdate && !_ && b !== "mirror" && _e !== 0 && nt !== "inertia"
    }
}

export default AcceleratedAnimation;
