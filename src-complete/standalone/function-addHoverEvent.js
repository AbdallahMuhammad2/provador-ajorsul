/* Standalone Function: addHoverEvent */

function addHoverEvent(d, o) {
    const c = o ? "pointerenter" : "pointerleave"
      , h = o ? "onHoverStart" : "onHoverEnd"
      , _ = (b, _e) => {
        if (b.pointerType === "touch" || isDragActive())
            return;
        const nt = d.getProps();
        d.animationState && nt.whileHover && d.animationState.setActive("whileHover", o);
        const it = nt[h];
        it && frame.postRender( () => it(b, _e))
    }
    ;
    return addPointerEvent(d.current, c, _, {
        passive: !d.getProps()[h]
    })
}

export default addHoverEvent;
