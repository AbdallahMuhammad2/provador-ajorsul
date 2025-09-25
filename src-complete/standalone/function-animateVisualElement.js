/* Standalone Function: animateVisualElement */

function animateVisualElement(d, o, c={}) {
    d.notify("AnimationStart", o);
    let h;
    if (Array.isArray(o)) {
        const _ = o.map(b => animateVariant(d, b, c));
        h = Promise.all(_)
    } else if (typeof o == "string")
        h = animateVariant(d, o, c);
    else {
        const _ = typeof o == "function" ? resolveVariant(d, o, c.custom) : o;
        h = Promise.all(animateTarget(d, _, c))
    }
    return h.then( () => {
        frame.postRender( () => {
            d.notify("AnimationComplete", o)
        }
        )
    }
    )
}

export default animateVisualElement;
