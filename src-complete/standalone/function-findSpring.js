/* Standalone Function: findSpring */

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
    {
        const at = Math.pow(it, 2) * h;
        return {
            stiffness: at,
            damping: _e * 2 * Math.sqrt(h * at),
            duration: d
        }
    }
}

export default findSpring;
