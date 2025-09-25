/* Standalone Function: Bt */

function Bt(ar) {
        return _e !== void 0 && ar < _e || nt !== void 0 && ar > nt
    }
    function kt(ar) {
        return _e === void 0 ? nt : nt === void 0 || Math.abs(_e - ar) < Math.abs(nt - ar) ? _e : nt
    }
    function Ut(ar) {
        o == null || o.stop(),
        o = animate(__assign(__assign({}, ar), {
            driver: Pt,
            onUpdate: function(hr) {
                var gr;
                It == null || It(hr),
                (gr = ar.onUpdate) === null || gr === void 0 || gr.call(ar, hr)
            },
            onComplete: Dt,
            onStop: Gt
        }))
    }
    function Ht(ar) {
        Ut(__assign({
            type: "spring",
            stiffness: _t,
            damping: bt,
            restDelta: At
        }, ar))
    }
    if (Bt(h))
        Ht({
            from: h,
            velocity: b,
            to: kt(h)
        });
    else {
        var Kt = at * b + h;
        Et !== void 0 && (Kt = Et(Kt));
        var Jt, or, ir = kt(Kt), lr = ir === _e ? -1 : 1;
        Ut({
            type: "decay",
            from: h,
            velocity: b,
            timeConstant: pt,
            power: at,
            restDelta: At,
            modifyTarget: Et,
            onUpdate: Bt(Kt) ? function(ar) {
                Jt = or,
                or = ar,
                b = velocityPerSecond$1(ar - Jt, getFrameData().delta),
                (lr === 1 && ar > ir || lr === -1 && ar < ir) && Ht({
                    from: ar,
                    to: ir,
                    velocity: b
                })
            }
            : void 0
        })
    }
    return {
        stop: function() {
            return o == null ? void 0 : o.stop()
        }
    }
}

export default Bt;
