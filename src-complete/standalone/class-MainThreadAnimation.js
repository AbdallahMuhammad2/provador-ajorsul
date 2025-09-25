/* Standalone Class: MainThreadAnimation */

class MainThreadAnimation extends BaseAnimation {
    constructor({KeyframeResolver: o=KeyframeResolver, ...c}) {
        super(c),
        this.holdTime = null,
        this.startTime = null,
        this.cancelTime = null,
        this.currentTime = 0,
        this.playbackSpeed = 1,
        this.pendingPlayState = "running",
        this.state = "idle",
        this.stop = () => {
            if (this.resolver.cancel(),
            this.isStopped = !0,
            this.state === "idle")
                return;
            this.teardown();
            const {onStop: nt} = this.options;
            nt && nt()
        }
        ;
        const {name: h, motionValue: _, keyframes: b} = this.options
          , _e = (nt, it) => this.onKeyframesResolved(nt, it);
        h && _ && _.owner ? this.resolver = _.owner.resolveKeyframes(b, _e, h, _) : this.resolver = new o(b,_e,h,_),
        this.resolver.scheduleResolve()
    }
    initPlayback(o) {
        const {type: c="keyframes", repeat: h=0, repeatDelay: _=0, repeatType: b, velocity: _e=0} = this.options
          , nt = generators[c] || keyframes;
        let it, at;
        nt !== keyframes && typeof o[0] != "number" && (it = pipe(percentToProgress, mix(o[0], o[1])),
        o = [0, 100]);
        const ut = nt({
            ...this.options,
            keyframes: o
        });
        b === "mirror" && (at = nt({
            ...this.options,
            keyframes: [...o].reverse(),
            velocity: -_e
        })),
        ut.calculatedDuration === null && (ut.calculatedDuration = calcGeneratorDuration(ut));
        const {calculatedDuration: pt} = ut
          , ht = pt + _
          , _t = ht * (h + 1) - _;
        return {
            generator: ut,
            mirroredGenerator: at,
            mapPercentToKeyframes: it,
            calculatedDuration: pt,
            resolvedDuration: ht,
            totalDuration: _t
        }
    }
    onPostResolved() {
        const {autoplay: o=!0} = this.options;
        this.play(),
        this.pendingPlayState === "paused" || !o ? this.pause() : this.state = this.pendingPlayState
    }
    tick(o, c=!1) {
        const {resolved: h} = this;
        if (!h) {
            const {keyframes: kt} = this.options;
            return {
                done: !0,
                value: kt[kt.length - 1]
            }
        }
        const {finalKeyframe: _, generator: b, mirroredGenerator: _e, mapPercentToKeyframes: nt, keyframes: it, calculatedDuration: at, totalDuration: ut, resolvedDuration: pt} = h;
        if (this.startTime === null)
            return b.next(0);
        const {delay: ht, repeat: _t, repeatType: vt, repeatDelay: bt, onUpdate: St} = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, o) : this.speed < 0 && (this.startTime = Math.min(o - ut / this.speed, this.startTime)),
        c ? this.currentTime = o : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(o - this.startTime) * this.speed;
        const At = this.currentTime - ht * (this.speed >= 0 ? 1 : -1)
          , Et = this.speed >= 0 ? At < 0 : At > ut;
        this.currentTime = Math.max(At, 0),
        this.state === "finished" && this.holdTime === null && (this.currentTime = ut);
        let Pt = this.currentTime
          , It = b;
        if (_t) {
            const kt = Math.min(this.currentTime, ut) / pt;
            let Ut = Math.floor(kt)
              , Ht = kt % 1;
            !Ht && kt >= 1 && (Ht = 1),
            Ht === 1 && Ut--,
            Ut = Math.min(Ut, _t + 1),
            !!(Ut % 2) && (vt === "reverse" ? (Ht = 1 - Ht,
            bt && (Ht -= bt / pt)) : vt === "mirror" && (It = _e)),
            Pt = clamp(0, 1, Ht) * pt
        }
        const Dt = Et ? {
            done: !1,
            value: it[0]
        } : It.next(Pt);
        nt && (Dt.value = nt(Dt.value));
        let {done: Gt} = Dt;
        !Et && at !== null && (Gt = this.speed >= 0 ? this.currentTime >= ut : this.currentTime <= 0);
        const Bt = this.holdTime === null && (this.state === "finished" || this.state === "running" && Gt);
        return Bt && _ !== void 0 && (Dt.value = getFinalKeyframe(it, this.options, _)),
        St && St(Dt.value),
        Bt && this.finish(),
        Dt
    }
    get duration() {
        const {resolved: o} = this;
        return o ? millisecondsToSeconds(o.calculatedDuration) : 0
    }
    get time() {
        return millisecondsToSeconds(this.currentTime)
    }
    set time(o) {
        o = secondsToMilliseconds(o),
        this.currentTime = o,
        this.holdTime !== null || this.speed === 0 ? this.holdTime = o : this.driver && (this.startTime = this.driver.now() - o / this.speed)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(o) {
        const c = this.playbackSpeed !== o;
        this.playbackSpeed = o,
        c && (this.time = millisecondsToSeconds(this.currentTime))
    }
    play() {
        if (this.resolver.isScheduled || this.resolver.resume(),
        !this._resolved) {
            this.pendingPlayState = "running";
            return
        }
        if (this.isStopped)
            return;
        const {driver: o=frameloopDriver, onPlay: c} = this.options;
        this.driver || (this.driver = o(_ => this.tick(_))),
        c && c();
        const h = this.driver.now();
        this.holdTime !== null ? this.startTime = h - this.holdTime : (!this.startTime || this.state === "finished") && (this.startTime = h),
        this.state === "finished" && this.updateFinishedPromise(),
        this.cancelTime = this.startTime,
        this.holdTime = null,
        this.state = "running",
        this.driver.start()
    }
    pause() {
        var o;
        if (!this._resolved) {
            this.pendingPlayState = "paused";
            return
        }
        this.state = "paused",
        this.holdTime = (o = this.currentTime) !== null && o !== void 0 ? o : 0
    }
    complete() {
        this.state !== "running" && this.play(),
        this.pendingPlayState = this.state = "finished",
        this.holdTime = null
    }
    finish() {
        this.teardown(),
        this.state = "finished";
        const {onComplete: o} = this.options;
        o && o()
    }
    cancel() {
        this.cancelTime !== null && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise()
    }
    teardown() {
        this.state = "idle",
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        this.startTime = this.cancelTime = null,
        this.resolver.cancel()
    }
    stopDriver() {
        this.driver && (this.driver.stop(),
        this.driver = void 0)
    }
    sample(o) {
        return this.startTime = 0,
        this.tick(o, !0)
    }
}

export default MainThreadAnimation;
