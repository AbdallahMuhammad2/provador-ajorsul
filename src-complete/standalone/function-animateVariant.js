/* Standalone Function: animateVariant */

function animateVariant(d, o, c={}) {
    var h;
    const _ = resolveVariant(d, o, c.type === "exit" ? (h = d.presenceContext) === null || h === void 0 ? void 0 : h.custom : void 0);
    let {transition: b=d.getDefaultTransition() || {}} = _ || {};
    c.transitionOverride && (b = c.transitionOverride);
    const _e = _ ? () => Promise.all(animateTarget(d, _, c)) : () => Promise.resolve()
      , nt = d.variantChildren && d.variantChildren.size ? (at=0) => {
        const {delayChildren: ut=0, staggerChildren: pt, staggerDirection: ht} = b;
        return animateChildren(d, o, ut + at, pt, ht, c)
    }
    : () => Promise.resolve()
      , {when: it} = b;
    if (it) {
        const [at,ut] = it === "beforeChildren" ? [_e, nt] : [nt, _e];
        return at().then( () => ut())
    } else
        return Promise.all([_e(), nt(c.delay)])
}

export default animateVariant;
