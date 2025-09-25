/* Standalone Function: animate */

function animate(d) {
    var o, c, h, _, b, _e = d.from, nt = d.autoplay, it = nt === void 0 || nt, at = d.driver, ut = at === void 0 ? framesync : at, pt = d.elapsed, ht = pt === void 0 ? 0 : pt, _t = d.repeat, vt = _t === void 0 ? 0 : _t, bt = d.repeatType, St = bt === void 0 ? "loop" : bt, At = d.repeatDelay, Et = At === void 0 ? 0 : At, Pt = d.onPlay, It = d.onStop, Dt = d.onComplete, Gt = d.onRepeat, Bt = d.onUpdate, kt = __rest(d, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]), Ut = kt.to, Ht = 0, Kt = kt.duration, Jt = !1, or = !0, ir = detectAnimationFromOptions(kt);
    !((c = (o = ir).needsInterpolation) === null || c === void 0) && c.call(o, _e, Ut) && (b = interpolate$1([0, 100], [_e, Ut], {
        clamp: !1
    }),
    _e = 0,
    Ut = 100);
    var lr = ir(__assign(__assign({}, kt), {
        from: _e,
        to: Ut
    }));
    return it && (Pt == null || Pt(),
    (h = ut(function(ar) {
        if (or || (ar = -ar),
        ht += ar,
        !Jt) {
            var hr = lr.next(Math.max(0, ht));
            _ = hr.value,
            b && (_ = b(_)),
            Jt = or ? hr.done : ht <= 0
        }
        Bt == null || Bt(_),
        Jt && (Ht === 0 && (Kt != null || (Kt = ht)),
        Ht < vt ? hasRepeatDelayElapsed(ht, Kt, Et, or) && (Ht++,
        St === "reverse" ? ht = reverseElapsed(ht, Kt, Et, or = Ht % 2 == 0) : (ht = loopElapsed(ht, Kt, Et),
        St === "mirror" && lr.flipTarget()),
        Jt = !1,
        Gt && Gt()) : (h.stop(),
        Dt && Dt()))
    })).start()),
    {
        stop: function() {
            It == null || It(),
            h.stop()
        }
    }
}

export default animate;
