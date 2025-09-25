/* Standalone Function: spring */

function spring({keyframes: d, restDelta: o, restSpeed: c, ...h}) {
    const _ = d[0]
      , b = d[d.length - 1]
      , _e = {
        done: !1,
        value: _
    }
      , {stiffness: nt, damping: it, mass: at, duration: ut, velocity: pt, isResolvedFromDuration: ht} = getSpringOptions({
        ...h,
        velocity: -millisecondsToSeconds(h.velocity || 0)
    })
      , _t = pt || 0
      , vt = it / (2 * Math.sqrt(nt * at))
      , bt = b - _
      , St = millisecondsToSeconds(Math.sqrt(nt / at))
      , At = Math.abs(bt) < 5;
    c || (c = At ? .01 : 2),
    o || (o = At ? .005 : .5);
    let Et;
    if (vt < 1) {
        const Pt = calcAngularFreq(St, vt);
        Et = It => {
            const Dt = Math.exp(-vt * St * It);
            return b - Dt * ((_t + vt * St * bt) / Pt * Math.sin(Pt * It) + bt * Math.cos(Pt * It))
        }
    } else if (vt === 1)
        Et = Pt => b - Math.exp(-St * Pt) * (bt + (_t + St * bt) * Pt);
    else {
        const Pt = St * Math.sqrt(vt * vt - 1);
        Et = It => {
            const Dt = Math.exp(-vt * St * It)
              , Gt = Math.min(Pt * It, 300);
            return b - Dt * ((_t + vt * St * bt) * Math.sinh(Gt) + Pt * bt * Math.cosh(Gt)) / Pt
        }
    }
    return {
        calculatedDuration: ht && ut || null,
        next: Pt => {
            const It = Et(Pt);
            if (ht)
                _e.done = Pt >= ut;
            else {
                let Dt = _t;
                Pt !== 0 && (vt < 1 ? Dt = calcGeneratorVelocity(Et, Pt, It) : Dt = 0);
                const Gt = Math.abs(Dt) <= c
                  , Bt = Math.abs(b - It) <= o;
                _e.done = Gt && Bt
            }
            return _e.value = _e.done ? b : It,
            _e
        }
    }
}

export default spring;
