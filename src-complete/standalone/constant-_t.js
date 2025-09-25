/* Standalone Constant: _t */

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

export default _t;
