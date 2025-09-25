/* Standalone Class: Object3DModel */

class Object3DModel {
    get visible() {
        return this._modelObject.visible
    }
    set visible(o) {
        this._modelObject.visible = o
    }
    get uuid() {
        return this._modelObject.uuid
    }
    get modelObject() {
        return this._modelObject
    }
    get name() {
        return this._modelObject.name
    }
    set name(o) {
        this._modelObject.name = o
    }
    constructor(o, {pseudoCenter: c=!1, autoCenter: h=!1, autoScale: _=!1, autoScaleRadius: b=2, license: _e=""}={}) {
        if (this.assetType = "model",
        this._modelObject = setupIModel(new three_module.B69),
        this.setDirty = this.setDirty.bind(this),
        this.updateBounds = this.updateBounds.bind(this),
        o || (o = this._modelObject),
        !c || o.userData.pseudoCentered || o.userData.isCentered)
            !h || o.userData.autoCentered || o.userData.isCentered || o.userData.pseudoCentered ? c || h || (o.userData.isCentered = !0) : autoCenterObject3D(o),
            this._modelObject = o;
        else {
            h && console.error("cannot use pseudoCenter and autoCenter at the same time");
            const nt = new Box3B().expandByObject(o, !0, !0).getCenter(new three_module.Pq0);
            this._modelObject.position.copy(nt).negate(),
            this._modelObject.updateMatrix(),
            this._modelObject.add(o),
            this._modelObject.name = o.name + "-centered",
            this._modelObject.userData.pseudoCentered = !0,
            this._modelObject.userData.isCentered = !0,
            o.userData.iModel = this
        }
        _ && !this._modelObject.userData.autoScaled ? autoScaleObject3D(this._modelObject, o.userData.autoScaleRadius || b) : this._modelObject.userData.autoScaled = !0,
        this._modelObject.addEventListener("dispose", () => {
            this.__disposed = !0
        }
        ),
        this._modelObject.userData.iModel = this,
        this.license = _e
    }
    get license() {
        return this._modelObject.userData.license
    }
    set license(o) {
        this._modelObject.userData.license = o
    }
    addEventListener(o, c) {
        this._modelObject.addEventListener(o, c)
    }
    dispatchEvent(o) {
        this._modelObject.dispatchEvent(o)
    }
    hasEventListener(o, c) {
        return this._modelObject.hasEventListener(o, c)
    }
    removeEventListener(o, c) {
        this._modelObject.removeEventListener(o, c)
    }
    traverse(o) {
        this._modelObject.traverse(o)
    }
    dispose() {
        const o = this._modelObject.dispose;
        o && typeof o == "function" ? o() : (console.warn("WebGi Object3DModel: no dispose in modelObject"),
        this._modelObject.removeFromParent())
    }
    setDirty(o) {
        var c, h, _, b;
        (h = (c = this._modelObject) === null || c === void 0 ? void 0 : c.setDirty) === null || h === void 0 || h.call(c, o),
        (b = (_ = this._uiConfig) === null || _ === void 0 ? void 0 : _.uiRefresh) === null || b === void 0 || b.call(_, "postFrame", !0)
    }
    setMaterial(o) {
        var c, h;
        return this._modelObject.isMesh ? ((h = (c = this._modelObject).setMaterial) === null || h === void 0 ? void 0 : h.call(c, o)) || [] : (console.error("setMaterial only works on meshes"),
        [])
    }
    get material() {
        return this._modelObject.material
    }
    get geometry() {
        return this._modelObject.geometry
    }
    setGeometry(o, c=!1) {
        var h, _;
        if (this._modelObject.isMesh)
            return (_ = (h = this._modelObject).setGeometry) === null || _ === void 0 ? void 0 : _.call(h, o, c);
        console.error("setGeometry only works on meshes")
    }
    get userData() {
        return this._modelObject.userData
    }
    set userData(o) {
        this._modelObject.userData = o
    }
    updateBounds() {
        console.warn("WebGi Object3DModel: updateBounds: NOT IMPLEMENTED, don't use"),
        this.setDirty()
    }
    get uiConfig() {
        return this._uiConfig || (this._uiConfig = makeObject3DUiConfig(this._modelObject, !1)),
        this._uiConfig
    }
    clone() {
        return new Object3DModel(this._modelObject.clone(),{
            pseudoCenter: !1,
            autoScale: !1,
            autoCenter: !1,
            license: this.license
        })
    }
}

export default Object3DModel;
