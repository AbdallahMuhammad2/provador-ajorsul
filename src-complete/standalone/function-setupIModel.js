/* Standalone Function: setupIModel */

function setupIModel(d, o, c) {
    var h;
    if (!d)
        return void console.warn("WebGi: setupIModel: object is undefined");
    if (d.__disposed && (console.warn("WebGi: re-init/re-add disposed object, things might not work as intended", d),
    delete d.__disposed),
    d.userData || (d.userData = {}),
    d.userData.__iModelSetup && d.modelObject)
        return d;
    d.userData.__iModelSetup = !0;
    let _ = [];
    _.push( () => {
        [...d.children].forEach(pt => {
            var ht;
            (ht = pt == null ? void 0 : pt.dispose) === null || ht === void 0 || ht.call(pt),
            d.add(pt)
        }
        ),
        d.parent && d.removeFromParent()
    }
    ),
    d.isLight && !d.assetType ? (d.assetType = "light",
    d.lightObject = d) : d.isCamera ? (d.assetType = "camera",
    d.cameraObject = d) : d.assetType || (d.assetType = "model"),
    d.modelObject || (d.modelObject = d),
    d.setDirty || (d.setDirty = (pt={}) => {
        d.dispatchEvent({
            ...pt,
            type: "objectUpdate",
            object: d
        })
    }
    ,
    d.userData.setDirty && console.warn("WebGi: userData.setDirty already defined", d.userData.setDirty, d),
    d.userData.setDirty = pt => {
        var ht;
        console.warn("WebGi: userData.setDirty is deprecated, use setDirty directly"),
        (ht = d.setDirty) === null || ht === void 0 || ht.call(d, pt)
    }
    ),
    d.addEventListener("added", pt => {
        var ht, _t, vt;
        const bt = (_t = (ht = d.parent) === null || ht === void 0 ? void 0 : ht.userData.parentRoot) !== null && _t !== void 0 ? _t : d.parent;
        bt !== d.userData.parentRoot && d.traverse(St => {
            St.userData.parentRoot = bt
        }
        ),
        (vt = d.setDirty) === null || vt === void 0 || vt.call(d, {
            change: "addedToParent"
        })
    }
    ),
    d.addEventListener("removed", () => {
        var pt;
        (pt = d.setDirty) === null || pt === void 0 || pt.call(d, {
            change: "removedFromParent"
        }),
        d.userData.parentRoot !== void 0 && d.traverse(ht => {
            ht.userData.parentRoot = void 0
        }
        )
    }
    ),
    _.push( () => {}
    );
    const b = d.dispose;
    d.dispose = () => {
        d.dispatchEvent({
            type: "dispose"
        }),
        b == null || b.call(d)
    }
    ,
    d.userData.dispose && console.warn("WebGi: userData.dispose already defined"),
    d.userData.dispose = () => {
        var pt;
        console.warn("WebGi: userData.dispose is deprecated, use dispose directly"),
        (pt = d.dispose) === null || pt === void 0 || pt.call(d)
    }
    ;
    const _e = d;
    !_e.isMesh && !_e.isLine || _e.userData.__meshSetup || (_e.userData.__meshSetup = !0,
    _e.setMaterial || (_e.setMaterial = pt => setMeshMaterial(_e, pt)),
    _e.setGeometry || (_e.setGeometry = (pt, ht=!1) => setMeshGeometry(_e, pt, ht),
    _e.setGeometry(_e.geometry, !0)),
    d.userData.setMaterial && console.warn("WebGi: userData.setMaterial already defined"),
    d.userData.setMaterial = pt => {
        var ht;
        console.warn("WebGi: userData.setMaterial is deprecated, use setMaterial directly"),
        (ht = d.setMaterial) === null || ht === void 0 || ht.call(d, pt)
    }
    ,
    d.userData.setGeometry && console.warn("WebGi: userData.setGeometry already defined"),
    d.userData.setGeometry = (pt, ...ht) => {
        var _t;
        console.warn("WebGi: userData.setGeometry is deprecated, use setGeometry directly"),
        (_t = d.setGeometry) === null || _t === void 0 || _t.call(d, pt, ...ht)
    }
    ,
    d.userData.__keepShadowDef || (d.castShadow = !0,
    d.receiveShadow = !0,
    d.userData.__keepShadowDef = !0),
    _.push( () => {
        var pt, ht, _t, vt;
        const bt = ((pt = _e.setMaterial) === null || pt === void 0 ? void 0 : pt.call(_e, void 0)) || []
          , St = (ht = _e.setGeometry) === null || ht === void 0 ? void 0 : ht.call(_e, void 0);
        for (const At of bt)
            At && At.userData && At.userData.disposeOnIdle !== !1 && At.dispose();
        St && St.userData && St.userData.disposeOnIdle !== !1 && St.dispose(),
        (_t = _e.setMaterial) === null || _t === void 0 || _t.call(_e, bt),
        (vt = _e.setGeometry) === null || vt === void 0 || vt.call(_e, St)
    }
    )),
    d.uiConfig || d.assetType !== "model" && d.assetType !== "camera" || (makeObject3DUiConfig(d),
    _.push( () => {}
    )),
    d.addEventListener("objectUpdate", ({last: pt, refreshUi: ht}) => {
        var _t, vt;
        return pt !== !1 && ht !== !1 && ((vt = (_t = d.uiConfig) === null || _t === void 0 ? void 0 : _t.uiRefresh) === null || vt === void 0 ? void 0 : vt.call(_t, "postFrame", !0, 1))
    }
    ),
    d.userData.__autoParentDispatchEvents ? console.warn("WebGi: object.userData.__autoParentDispatchEvents already set") : (d.userData.__autoParentDispatchEvents = d.userData.__autoParentDispatchEvents || ["objectUpdate", "materialUpdate", "select", "materialChanged", "textureUpdate"],
    d.isCamera && d.userData.__autoParentDispatchEvents.push("activateMain", "setView")),
    o && (d.userData.parentRoot = o);
    const nt = d.dispatchEvent;
    d.dispatchEvent = pt => {
        var ht;
        !((ht = d.userData.__autoParentDispatchEvents) === null || ht === void 0) && ht.includes(pt.type) && (pt.parentDispatch = !0),
        pt.parentDispatch && (_t => {
            var vt;
            const bt = (vt = d.userData.parentRoot) !== null && vt !== void 0 ? vt : d.parent;
            bt != null && bt.modelObject && bt.dispatchEvent(_t)
        }
        )(pt),
        nt.call(d, pt)
    }
    ;
    const it = d.clone;
    d.clone = (...pt) => {
        const ht = d.userData;
        d.userData = {};
        let _t = it.call(d, ...pt);
        d.userData = ht,
        copyObject3DUserData(_t.userData, ht);
        const vt = d.userData.parentRoot;
        return vt && vt.assetType !== "model" && console.warn("WebGi: Cloning an object with a parent that is not an IModel is not supported"),
        _t = setupIModel(_t, vt, c),
        _t.userData.cloneParent = d.uuid,
        _t
    }
    ;
    const at = d.copy;
    d.copy = (pt, ...ht) => {
        const _t = pt.userData;
        pt.userData = {};
        const vt = at.call(d, pt, ...ht);
        return pt.userData = _t,
        copyObject3DUserData(d.userData, pt),
        vt
    }
    ;
    const ut = d.add;
    return d.add = (...pt) => (pt.forEach(ht => setupIModel(ht, d.userData.parentRoot || d, c)),
    ut.call(d, ...pt)),
    (d = (h = c == null ? void 0 : c(d)) !== null && h !== void 0 ? h : d).addEventListener("dispose", () => {
        _.forEach(pt => pt()),
        _ = []
    }
    ),
    [...d.children].forEach(pt => setupIModel(pt, d, c)),
    d
}

export default setupIModel;
