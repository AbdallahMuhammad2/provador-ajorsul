/* Standalone Function: autoCenterObject3D */

function autoCenterObject3D(d, o=!1) {
    if (o) {
        if (!d.userData.autoCentered || !d.userData._lastCenter)
            return d;
        d.position.add(d.userData._lastCenter),
        delete d.userData.autoCentered,
        delete d.userData.isCentered,
        delete d.userData._lastCenter
    } else {
        const c = new Box3B().expandByObject(d, !0, !0).getCenter(new three_module.Pq0);
        d.userData._lastCenter = c,
        d.position.sub(c),
        d.userData.autoCentered = !0,
        d.userData.isCentered = !0
    }
    return d.dispatchEvent({
        type: "objectUpdate",
        undo: o
    }),
    d
}

export default autoCenterObject3D;
