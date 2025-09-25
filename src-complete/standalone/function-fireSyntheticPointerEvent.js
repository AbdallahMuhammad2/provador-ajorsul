/* Standalone Function: fireSyntheticPointerEvent */

function fireSyntheticPointerEvent(d, o) {
    if (!o)
        return;
    const c = new PointerEvent("pointer" + d);
    o(c, extractEventInfo(c))
}

export default fireSyntheticPointerEvent;
