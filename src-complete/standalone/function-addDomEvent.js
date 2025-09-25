/* Standalone Function: addDomEvent */

function addDomEvent(d, o, c, h={
    passive: !0
}) {
    return d.addEventListener(o, c, h),
    () => d.removeEventListener(o, c)
}

export default addDomEvent;
