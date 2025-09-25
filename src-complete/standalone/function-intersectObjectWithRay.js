/* Standalone Function: intersectObjectWithRay */

function intersectObjectWithRay(d, o, c) {
    const h = o.intersectObject(d, !0);
    for (let _ = 0; _ < h.length; _++)
        if (h[_].object.visible || c)
            return h[_];
    return !1
}

export default intersectObjectWithRay;
