/* Standalone Function: animateChildren */

function animateChildren(d, o, c=0, h=0, _=1, b) {
    const _e = []
      , nt = (d.variantChildren.size - 1) * h
      , it = _ === 1 ? (at=0) => at * h : (at=0) => nt - at * h;
    return Array.from(d.variantChildren).sort(sortByTreeOrder).forEach( (at, ut) => {
        at.notify("AnimationStart", o),
        _e.push(animateVariant(at, o, {
            ...b,
            delay: c + it(ut)
        }).then( () => at.notify("AnimationComplete", o)))
    }
    ),
    Promise.all(_e)
}

export default animateChildren;
