/* Standalone Function: addPointerEvent */

function addPointerEvent(d, o, c, h) {
    return addDomEvent(d, o, addPointerInfo(c), h)
}

export default addPointerEvent;
