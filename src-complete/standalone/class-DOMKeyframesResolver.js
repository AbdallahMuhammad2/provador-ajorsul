/* Standalone Class: DOMKeyframesResolver */

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

export default DOMKeyframesResolver;
