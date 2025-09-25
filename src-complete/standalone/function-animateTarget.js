/* Standalone Function: animateTarget */

function animateTarget(d, o, {delay: c=0, transitionOverride: h, type: _}={}) {
    var b;
    let {transition: _e=d.getDefaultTransition(), transitionEnd: nt, ...it} = o;
    const at = d.getValue("willChange");
    h && (_e = h);
    const ut = []
      , pt = _ && d.animationState && d.animationState.getState()[_];
    for (const ht in it) {
        const _t = d.getValue(ht, (b = d.latestValues[ht]) !== null && b !== void 0 ? b : null)
          , vt = it[ht];
        if (vt === void 0 || pt && shouldBlockAnimation(pt, ht))
            continue;
        const bt = {
            delay: c,
            elapsed: 0,
            ...getValueTransition(_e || {}, ht)
        };
        let St = !1;
        if (window.HandoffAppearAnimations) {
            const Pt = d.getProps()[optimizedAppearDataAttribute];
            if (Pt) {
                const It = window.HandoffAppearAnimations(Pt, ht);
                It !== null && (bt.elapsed = It,
                St = !0)
            }
        }
        _t.start(animateMotionValue(ht, _t, vt, d.shouldReduceMotion && transformProps.has(ht) ? {
            type: !1
        } : bt, d, St));
        const At = _t.animation;
        At && (isWillChangeMotionValue(at) && (at.add(ht),
        At.then( () => at.remove(ht))),
        ut.push(At))
    }
    return nt && Promise.all(ut).then( () => {
        frame.update( () => {
            nt && setTarget(d, nt)
        }
        )
    }
    ),
    ut
}

export default animateTarget;
