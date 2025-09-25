/* Standalone Function: createAnimationState */

function createAnimationState(d) {
    let o = animateList(d);
    const c = createState();
    let h = !0;
    const _ = it => (at, ut) => {
        var pt;
        const ht = resolveVariant(d, ut, it === "exit" ? (pt = d.presenceContext) === null || pt === void 0 ? void 0 : pt.custom : void 0);
        if (ht) {
            const {transition: _t, transitionEnd: vt, ...bt} = ht;
            at = {
                ...at,
                ...bt,
                ...vt
            }
        }
        return at
    }
    ;
    function b(it) {
        o = it(d)
    }
    function _e(it) {
        const at = d.getProps()
          , ut = d.getVariantContext(!0) || {}
          , pt = []
          , ht = new Set;
        let _t = {}
          , vt = 1 / 0;
        for (let St = 0; St < numAnimationTypes; St++) {
            const At = reversePriorityOrder[St]
              , Et = c[At]
              , Pt = at[At] !== void 0 ? at[At] : ut[At]
              , It = isVariantLabel(Pt)
              , Dt = At === it ? Et.isActive : null;
            Dt === !1 && (vt = St);
            let Gt = Pt === ut[At] && Pt !== at[At] && It;
            if (Gt && h && d.manuallyAnimateOnMount && (Gt = !1),
            Et.protectedKeys = {
                ..._t
            },
            !Et.isActive && Dt === null || !Pt && !Et.prevProp || isAnimationControls(Pt) || typeof Pt == "boolean")
                continue;
            let kt = checkVariantsDidChange(Et.prevProp, Pt) || At === it && Et.isActive && !Gt && It || St > vt && It
              , Ut = !1;
            const Ht = Array.isArray(Pt) ? Pt : [Pt];
            let Kt = Ht.reduce(_(At), {});
            Dt === !1 && (Kt = {});
            const {prevResolvedValues: Jt={}} = Et
              , or = {
                ...Jt,
                ...Kt
            }
              , ir = lr => {
                kt = !0,
                ht.has(lr) && (Ut = !0,
                ht.delete(lr)),
                Et.needsAnimating[lr] = !0;
                const ar = d.getValue(lr);
                ar && (ar.liveStyle = !1)
            }
            ;
            for (const lr in or) {
                const ar = Kt[lr]
                  , hr = Jt[lr];
                if (_t.hasOwnProperty(lr))
                    continue;
                let gr = !1;
                isKeyframesTarget(ar) && isKeyframesTarget(hr) ? gr = !shallowCompare(ar, hr) : gr = ar !== hr,
                gr ? ar != null ? ir(lr) : ht.add(lr) : ar !== void 0 && ht.has(lr) ? ir(lr) : Et.protectedKeys[lr] = !0
            }
            Et.prevProp = Pt,
            Et.prevResolvedValues = Kt,
            Et.isActive && (_t = {
                ..._t,
                ...Kt
            }),
            h && d.blockInitialAnimation && (kt = !1),
            kt && (!Gt || Ut) && pt.push(...Ht.map(lr => ({
                animation: lr,
                options: {
                    type: At
                }
            })))
        }
        if (ht.size) {
            const St = {};
            ht.forEach(At => {
                const Et = d.getBaseTarget(At)
                  , Pt = d.getValue(At);
                Pt && (Pt.liveStyle = !0),
                St[At] = Et ?? null
            }
            ),
            pt.push({
                animation: St
            })
        }
        let bt = !!pt.length;
        return h && (at.initial === !1 || at.initial === at.animate) && !d.manuallyAnimateOnMount && (bt = !1),
        h = !1,
        bt ? o(pt) : Promise.resolve()
    }
    function nt(it, at) {
        var ut;
        if (c[it].isActive === at)
            return Promise.resolve();
        (ut = d.variantChildren) === null || ut === void 0 || ut.forEach(ht => {
            var _t;
            return (_t = ht.animationState) === null || _t === void 0 ? void 0 : _t.setActive(it, at)
        }
        ),
        c[it].isActive = at;
        const pt = _e(it);
        for (const ht in c)
            c[ht].protectedKeys = {};
        return pt
    }
    return {
        animateChanges: _e,
        setActive: nt,
        setAnimateFunction: b,
        getState: () => c
    }
}

export default createAnimationState;
