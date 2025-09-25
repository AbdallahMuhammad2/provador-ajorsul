/* Standalone Function: inertia */

function inertia({keyframes: d, velocity: o=0, power: c=.8, timeConstant: h=325, bounceDamping: _=10, bounceStiffness: b=500, modifyTarget: _e, min: nt, max: it, restDelta: at=.5, restSpeed: ut}) {
    const pt = d[0]
      , ht = {
        done: !1,
        value: pt
    }
      , _t = kt => nt !== void 0 && kt < nt || it !== void 0 && kt > it
      , vt = kt => nt === void 0 ? it : it === void 0 || Math.abs(nt - kt) < Math.abs(it - kt) ? nt : it;
    let bt = c * o;
    const St = pt + bt
      , At = _e === void 0 ? St : _e(St);
    At !== St && (bt = At - pt);
    const Et = kt => -bt * Math.exp(-kt / h)
      , Pt = kt => At + Et(kt)
      , It = kt => {
        const Ut = Et(kt)
          , Ht = Pt(kt);
        ht.done = Math.abs(Ut) <= at,
        ht.value = ht.done ? At : Ht
    }
    ;
    let Dt, Gt;
    const Bt = kt => {
        _t(ht.value) && (Dt = kt,
        Gt = spring({
            keyframes: [ht.value, vt(ht.value)],
            velocity: calcGeneratorVelocity(Pt, kt, ht.value),
            damping: _,
            stiffness: b,
            restDelta: at,
            restSpeed: ut
        }))
    }
    ;
    return Bt(0),
    {
        calculatedDuration: null,
        next: kt => {
            let Ut = !1;
            return !Gt && Dt === void 0 && (Ut = !0,
            It(kt),
            Bt(kt)),
            Dt !== void 0 && kt >= Dt ? Gt.next(kt - Dt) : (!Ut && It(kt),
            ht)
        }
    }
}

export default inertia;
