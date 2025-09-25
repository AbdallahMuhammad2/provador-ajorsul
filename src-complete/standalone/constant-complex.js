/* Standalone Constant: complex */

const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone: getAnimatableNone$1
}
  , maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(d) {
    const [o,c] = d.slice(0, -1).split("(");
    if (o === "drop-shadow")
        return d;
    const [h] = c.match(floatRegex) || [];
    if (!h)
        return d;
    const _ = c.replace(h, "");
    let b = maxDefaults.has(o) ? 1 : 0;
    return h !== c && (b *= 100),
    o + "(" + b + _ + ")"
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu
  , filter = {
    ...complex,
    getAnimatableNone: d => {
        const o = d.match(functionRegex);
        return o ? o.map(applyDefaultFilter).join(" ") : d
    }
}
  , defaultValueTypes = {
    ...numberValueTypes,
    color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter
}
  , getDefaultValueType = d => defaultValueTypes[d];
function getAnimatableNone(d, o) {
    let c = getDefaultValueType(d);
    return c !== filter && (c = complex),
    c.getAnimatableNone ? c.getAnimatableNone(o) : void 0
}
const invalidTemplates = new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(d, o, c) {
    let h = 0, _;
    for (; h < d.length && !_; ) {
        const b = d[h];
        typeof b == "string" && !invalidTemplates.has(b) && (_ = d[h]),
        h++
    }
    if (_ && c)
        for (const b of o)
            d[b] = getAnimatableNone(c, _)
}
class DOMKeyframesResolver extends KeyframeResolver {
    constructor(o, c, h, _) {
        super(o, c, h, _, _ == null ? void 0 : _.owner, !0)
    }
    readKeyframes() {
        const {unresolvedKeyframes: o, element: c, name: h} = this;
        if (!c.current)
            return;
        super.readKeyframes();
        for (let it = 0; it < o.length; it++) {
            const at = o[it];
            if (typeof at == "string" && isCSSVariableToken(at)) {
                const ut = getVariableValue(at, c.current);
                ut !== void 0 && (o[it] = ut),
                it === o.length - 1 && (this.finalKeyframe = at)
            }
        }
        if (this.resolveNoneKeyframes(),
        !positionalKeys.has(h) || o.length !== 2)
            return;
        const [_,b] = o
          , _e = findDimensionValueType(_)
          , nt = findDimensionValueType(b);
        if (_e !== nt)
            if (isNumOrPxType(_e) && isNumOrPxType(nt))
                for (let it = 0; it < o.length; it++) {
                    const at = o[it];
                    typeof at == "string" && (o[it] = parseFloat(at))
                }
            else
                this.needsMeasurement = !0
    }
    resolveNoneKeyframes() {
        const {unresolvedKeyframes: o, name: c} = this
          , h = [];
        for (let _ = 0; _ < o.length; _++)
            isNone(o[_]) && h.push(_);
        h.length && makeNoneKeyframesAnimatable(o, h, c)
    }
    measureInitialState() {
        const {element: o, unresolvedKeyframes: c, name: h} = this;
        if (!o.current)
            return;
        h === "height" && (this.suspendedScrollY = window.pageYOffset),
        this.measuredOrigin = positionalValues[h](o.measureViewportBox(), window.getComputedStyle(o.current)),
        c[0] = this.measuredOrigin;
        const _ = c[c.length - 1];
        _ !== void 0 && o.getValue(h, _).jump(_, !1)
    }
    measureEndState() {
        var o;
        const {element: c, name: h, unresolvedKeyframes: _} = this;
        if (!c.current)
            return;
        const b = c.getValue(h);
        b && b.jump(this.measuredOrigin, !1);
        const _e = _.length - 1
          , nt = _[_e];
        _[_e] = positionalValues[h](c.measureViewportBox(), window.getComputedStyle(c.current)),
        nt !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = nt),
        !((o = this.removedTransforms) === null || o === void 0) && o.length && this.removedTransforms.forEach( ([it,at]) => {
            c.getValue(it).set(at)
        }
        ),
        this.resolveNoneKeyframes()
    }
}
function memo(d) {
    let o;
    return () => (o === void 0 && (o = d()),
    o)
}
const isAnimatable = (d, o) => o === "zIndex" ? !1 : !!(typeof d == "number" || Array.isArray(d) || typeof d == "string" && (complex.test(d) || d === "0") && !d.startsWith("url("));
function hasKeyframesChanged(d) {
    const o = d[0];
    if (d.length === 1)
        return !0;
    for (let c = 0; c < d.length; c++)
        if (d[c] !== o)
            return !0
}
function canAnimate(d, o, c, h) {
    const _ = d[0];
    if (_ === null)
        return !1;
    const b = d[d.length - 1]
      , _e = isAnimatable(_, o)
      , nt = isAnimatable(b, o);
    return !_e || !nt ? !1 : hasKeyframesChanged(d) || c === "spring" && h
}
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
function velocityPerSecond(d, o) {
    return o ? d * (1e3 / o) : 0
}
const velocitySampleDuration = 5;
function calcGeneratorVelocity(d, o, c) {
    const h = Math.max(o - velocitySampleDuration, 0);
    return velocityPerSecond(c - d(h), o - h)
}
const safeMin = .001
  , minDuration = .01
  , maxDuration$1 = 10
  , minDamping = .05
  , maxDamping = 1;
function findSpring({duration: d=800, bounce: o=.25, velocity: c=0, mass: h=1}) {
    let _, b, _e = 1 - o;
    _e = clamp(minDamping, maxDamping, _e),
    d = clamp(minDuration, maxDuration$1, millisecondsToSeconds(d)),
    _e < 1 ? (_ = at => {
        const ut = at * _e
          , pt = ut * d
          , ht = ut - c
          , _t = calcAngularFreq(at, _e)
          , vt = Math.exp(-pt);
        return safeMin - ht / _t * vt
    }
    ,
    b = at => {
        const pt = at * _e * d
          , ht = pt * c + c
          , _t = Math.pow(_e, 2) * Math.pow(at, 2) * d
          , vt = Math.exp(-pt)
          , bt = calcAngularFreq(Math.pow(at, 2), _e);
        return (-_(at) + safeMin > 0 ? -1 : 1) * ((ht - _t) * vt) / bt
    }
    ) : (_ = at => {
        const ut = Math.exp(-at * d)
          , pt = (at - c) * d + 1;
        return -safeMin + ut * pt
    }
    ,
    b = at => {
        const ut = Math.exp(-at * d)
          , pt = (c - at) * (d * d);
        return ut * pt
    }
    );
    const nt = 5 / d
      , it = approximateRoot(_, b, nt);
    if (d = secondsToMilliseconds(d),
    isNaN(it))
        return {
            stiffness: 100,
            damping: 10,
            duration: d
        };

export default complex;
