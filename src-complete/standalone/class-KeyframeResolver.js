/* Standalone Class: KeyframeResolver */

class KeyframeResolver {
    constructor(o, c, h, _, b, _e=!1) {
        this.isComplete = !1,
        this.isAsync = !1,
        this.needsMeasurement = !1,
        this.isScheduled = !1,
        this.unresolvedKeyframes = [...o],
        this.onComplete = c,
        this.name = h,
        this.motionValue = _,
        this.element = b,
        this.isAsync = _e
    }
    scheduleResolve() {
        this.isScheduled = !0,
        this.isAsync ? (toResolve.add(this),
        isScheduled || (isScheduled = !0,
        frame.read(readAllKeyframes),
        frame.resolveKeyframes(measureAllKeyframes))) : (this.readKeyframes(),
        this.complete())
    }
    readKeyframes() {
        const {unresolvedKeyframes: o, name: c, element: h, motionValue: _} = this;
        for (let b = 0; b < o.length; b++)
            if (o[b] === null)
                if (b === 0) {
                    const _e = _ == null ? void 0 : _.get()
                      , nt = o[o.length - 1];
                    if (_e !== void 0)
                        o[0] = _e;
                    else if (h && c) {
                        const it = h.readValue(c, nt);
                        it != null && (o[0] = it)
                    }
                    o[0] === void 0 && (o[0] = nt),
                    _ && _e === void 0 && _.set(o[0])
                } else
                    o[b] = o[b - 1]
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete() {
        this.isComplete = !0,
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
        toResolve.delete(this)
    }
    cancel() {
        this.isComplete || (this.isScheduled = !1,
        toResolve.delete(this))
    }
    resume() {
        this.isComplete || this.scheduleResolve()
    }
}

export default KeyframeResolver;
