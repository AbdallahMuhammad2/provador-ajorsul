/* Standalone Function: getHandlers */

function getHandlers(d, o) {
    const c = ut => {
        const pt = "touches"in ut;
        pt && ut.touches.length > 1 || d( (ht, _t) => {
            _t.trackMouse && !pt && (document.addEventListener(mouseMove, h),
            document.addEventListener(mouseUp, _e));
            const {clientX: vt, clientY: bt} = pt ? ut.touches[0] : ut
              , St = rotateXYByAngle([vt, bt], _t.rotationAngle);
            return _t.onTouchStartOrOnMouseDown && _t.onTouchStartOrOnMouseDown({
                event: ut
            }),
            Object.assign(Object.assign(Object.assign({}, ht), initialState), {
                initial: St.slice(),
                xy: St,
                start: ut.timeStamp || 0
            })
        }
        )
    }
      , h = ut => {
        d( (pt, ht) => {
            const _t = "touches"in ut;
            if (_t && ut.touches.length > 1)
                return pt;
            if (ut.timeStamp - pt.start > ht.swipeDuration)
                return pt.swiping ? Object.assign(Object.assign({}, pt), {
                    swiping: !1
                }) : pt;
            const {clientX: vt, clientY: bt} = _t ? ut.touches[0] : ut
              , [St,At] = rotateXYByAngle([vt, bt], ht.rotationAngle)
              , Et = St - pt.xy[0]
              , Pt = At - pt.xy[1]
              , It = Math.abs(Et)
              , Dt = Math.abs(Pt)
              , Gt = (ut.timeStamp || 0) - pt.start
              , Bt = Math.sqrt(It * It + Dt * Dt) / (Gt || 1)
              , kt = [Et / (Gt || 1), Pt / (Gt || 1)]
              , Ut = getDirection(It, Dt, Et, Pt)
              , Ht = typeof ht.delta == "number" ? ht.delta : ht.delta[Ut.toLowerCase()] || defaultProps.delta;
            if (It < Ht && Dt < Ht && !pt.swiping)
                return pt;
            const Kt = {
                absX: It,
                absY: Dt,
                deltaX: Et,
                deltaY: Pt,
                dir: Ut,
                event: ut,
                first: pt.first,
                initial: pt.initial,
                velocity: Bt,
                vxvy: kt
            };
            Kt.first && ht.onSwipeStart && ht.onSwipeStart(Kt),
            ht.onSwiping && ht.onSwiping(Kt);
            let Jt = !1;
            return (ht.onSwiping || ht.onSwiped || ht[`onSwiped${Ut}`]) && (Jt = !0),
            Jt && ht.preventScrollOnSwipe && ht.trackTouch && ut.cancelable && ut.preventDefault(),
            Object.assign(Object.assign({}, pt), {
                first: !1,
                eventData: Kt,
                swiping: !0
            })
        }
        )
    }
      , _ = ut => {
        d( (pt, ht) => {
            let _t;
            if (pt.swiping && pt.eventData) {
                if (ut.timeStamp - pt.start < ht.swipeDuration) {
                    _t = Object.assign(Object.assign({}, pt.eventData), {
                        event: ut
                    }),
                    ht.onSwiped && ht.onSwiped(_t);
                    const vt = ht[`onSwiped${_t.dir}`];
                    vt && vt(_t)
                }
            } else
                ht.onTap && ht.onTap({
                    event: ut
                });
            return ht.onTouchEndOrOnMouseUp && ht.onTouchEndOrOnMouseUp({
                event: ut
            }),
            Object.assign(Object.assign(Object.assign({}, pt), initialState), {
                eventData: _t
            })
        }
        )
    }
      , b = () => {
        document.removeEventListener(mouseMove, h),
        document.removeEventListener(mouseUp, _e)
    }
      , _e = ut => {
        b(),
        _(ut)
    }
      , nt = (ut, pt) => {
        let ht = () => {}
        ;
        if (ut && ut.addEventListener) {
            const _t = Object.assign(Object.assign({}, defaultProps.touchEventOptions), pt.touchEventOptions)
              , vt = [[touchStart, c, _t], [touchMove, h, Object.assign(Object.assign({}, _t), pt.preventScrollOnSwipe ? {
                passive: !1
            } : {})], [touchEnd, _, _t]];
            vt.forEach( ([bt,St,At]) => ut.addEventListener(bt, St, At)),
            ht = () => vt.forEach( ([bt,St]) => ut.removeEventListener(bt, St))
        }
        return ht
    }
      , at = {
        ref: ut => {
            ut !== null && d( (pt, ht) => {
                if (pt.el === ut)
                    return pt;
                const _t = {};
                return pt.el && pt.el !== ut && pt.cleanUpTouch && (pt.cleanUpTouch(),
                _t.cleanUpTouch = void 0),
                ht.trackTouch && ut && (_t.cleanUpTouch = nt(ut, ht)),
                Object.assign(Object.assign(Object.assign({}, pt), {
                    el: ut
                }), _t)
            }
            )
        }
    };
    return o.trackMouse && (at.onMouseDown = c),
    [at, nt]
}

export default getHandlers;
