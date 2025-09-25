/* Standalone Function: rotateDuplicatedMesh */

function rotateDuplicatedMesh(d, o, c, h="x") {
    var _;
    if (d.userData.rotationCount > 1 && !d.userData.rotationRoot)
        return d;
    const b = d.parent;
    if (!b)
        throw new Error("No parent");
    if (d.userData.cloneParent) {
        const nt = d.userData.cloneParent;
        if (d = b.children.find(it => nt === it.uuid),
        !d)
            return console.error("Couldn't find clone root, cannot rotate. maybe a serialization issue?", nt, b),
            d
    }
    let _e = b.children.filter(nt => {
        var it;
        return ((it = nt.userData) === null || it === void 0 ? void 0 : it.cloneParent) === d.uuid
    }
    ).sort( (nt, it) => nt.userData.cloneRotI - it.userData.cloneRotI);
    if (d.userData.rotationCount === o && o === _e.length && c === void 0 && d.userData.rotationAxis === h)
        return d;
    if (c == null && (c = (_ = d.userData.rotationSkips) !== null && _ !== void 0 ? _ : []),
    c !== d.userData.rotationSkips && (d.userData.rotationSkips = [...c]),
    setRotI(d, 0, o, h),
    d.userData.rotationRoot = !0,
    d.visible = !0,
    o <= _e.length) {
        for (let nt = o - 1; nt < _e.length; nt++)
            b.remove(_e[nt]),
            _e[nt].traverse(it => it.userData = {
                __disposed: !0
            });
        _e = _e.slice(0, o)
    }
    for (let nt = 1; nt < o; nt++) {
        const it = nt <= _e.length ? _e[nt - 1] : d.clone();
        it.rotation.copy(d.rotation),
        it.rotation[h] += nt / o * Math.PI * 2,
        setRotI(it, nt, o, h),
        nt > _e.length && b.add(it),
        it.visible = !c.includes(nt)
    }
    return d.visible = !c.includes(0),
    d
}

export default rotateDuplicatedMesh;
