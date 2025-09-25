/* Standalone Function: autoScaleObject3D */

function autoScaleObject3D(d, o, c, h=!1) {
    let _ = 1;
    if (h) {
        if (!d.userData.autoScaled || !d.userData._lastScaleRadius)
            return d;
        const b = d.userData.autoScaleRadius || o || 1;
        if (_ = d.userData._lastScaleRadius / b,
        !isFinite(_))
            return d;
        d.userData.autoScaled = !0,
        d.userData.autoScaleRadius = o,
        delete d.userData._lastScaleRadius
    } else {
        const b = .5 * new Box3B().expandByObject(d, !0, !0).getSize(new three_module.Pq0).length();
        if (o === void 0 && (o = d.userData.autoScaleRadius || 1),
        _ = o / b,
        !isFinite(_))
            return d;
        d.userData.autoScaled = !0,
        d.userData.autoScaleRadius = o,
        d.userData._lastScaleRadius = b
    }
    return d.userData.pseudoCentered ? d.children.forEach(b => {
        b.scale.multiplyScalar(_)
    }
    ) : d.scale.multiplyScalar(_),
    (c || d.userData.isCentered) && d.position.multiplyScalar(_),
    d.traverse(b => {
        var _e, nt;
        b.isLight && (!((nt = (_e = b.shadow) === null || _e === void 0 ? void 0 : _e.camera) === null || nt === void 0) && nt.right) && (b.shadow.camera.right *= _,
        b.shadow.camera.left *= _,
        b.shadow.camera.top *= _,
        b.shadow.camera.bottom *= _),
        b.isCamera && b.right && (b.right *= _,
        b.left *= _,
        b.top *= _,
        b.bottom *= _)
    }
    ),
    d.dispatchEvent({
        type: "objectUpdate",
        undo: h
    }),
    d
}

export default autoScaleObject3D;
