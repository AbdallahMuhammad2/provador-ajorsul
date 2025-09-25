/* Standalone Class: SimplifyModifierPlugin */

class SimplifyModifierPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.simplifyFactor = .5
    }
    get initialized() {
        return !0
    }
    async initialize() {}
    async onAdded(o) {
        await super.onAdded(o),
        this._pickingPlugin = o.getPlugin(PickingPlugin)
    }
    simplifyGeometries(o, c) {
        var h;
        if (!o) {
            const b = (h = this._pickingPlugin) === null || h === void 0 ? void 0 : h.getSelectedObject()
              , _e = [];
            if (b == null || b.traverse(nt => {
                nt.geometry && !_e.includes(nt.geometry) && _e.push(nt.geometry)
            }
            ),
            !(o = _e) || !o.length)
                return
        }
        Array.isArray(o) || (o = [o]);
        const _ = [];
        for (const b of o)
            _.push(this.simplifyGeometry(b, c));
        return _
    }
    simplifyGeometry(o, {factor: c, count: h, replace: _=!0, disposeOnReplace: b=!1}={}) {
        var _e, nt, it;
        if (!o) {
            const At = (_e = this._pickingPlugin) === null || _e === void 0 ? void 0 : _e.getSelectedObject();
            if (!(o = At == null ? void 0 : At.geometry))
                return
        }
        if (!o.attributes.position)
            return (nt = this._viewer) === null || nt === void 0 || nt.console.error("SimplifyModifierPlugin: Geometry does not have position attribute", o),
            o;
        c = c || this.simplifyFactor,
        h = h || o.attributes.position.count * c,
        o.boundingBox || o.computeBoundingBox();
        const at = this._simplify(o, h);
        at.computeBoundingBox(),
        at.computeBoundingSphere(),
        at.computeVertexNormals();
        const ut = at.boundingBox
          , pt = ut.getSize(new three_module.Pq0);
        if (!isFinite(pt.x) || !isFinite(pt.y) || !isFinite(pt.z))
            return (it = this._viewer) === null || it === void 0 || it.console.error("SimplifyModifierPlugin: Unable to simplify", o, at, pt),
            o;
        const ht = o.boundingBox
          , _t = ht.getSize(new three_module.Pq0)
          , vt = pt.clone().sub(_t)
          , bt = vt.clone().divide(_t);
        if (bt.lengthSq() > .001 && console.warn("Simplify", o, at, ut, ht, pt, _t, vt, bt),
        !_)
            return at;
        const St = o.userData.__appliedMeshes;
        if (!St)
            return console.error("No meshes found for geometry, cannot replace", o),
            at;
        for (const At of St)
            At.setGeometry ? At.setGeometry(at) : At.geometry = at;
        return b && o.dispose(!0),
        at
    }
    async simplifyAll(o, c) {
        var h;
        if (!o && this._viewer && (o = this._viewer.scene.modelRoot),
        !o)
            return void console.error("SimplifyModifierPlugin: No root found");
        if (!this.initialized && (await this.initialize(),
        !this.initialized))
            return void ((h = this._viewer) === null || h === void 0 || h.console.error("SimplifyModifierPlugin cannot be initialized"));
        const _ = [];
        if (o.modelObject.traverse(b => {
            b.geometry && !_.includes(b.geometry) && _.push(b.geometry)
        }
        ),
        _.length)
            return this.simplifyGeometries(_, c);
        console.error("SimplifyModifierPlugin: No geometries found")
    }
    async simplifySelected() {
        var o;
        if (!this._viewer)
            return;
        if (!this.initialized && (await this.initialize(),
        !this.initialized))
            return void await this._viewer.alert("Simplify: SimplifyModifierPlugin cannot be initialized");
        const c = (o = this._pickingPlugin) === null || o === void 0 ? void 0 : o.getSelectedObject();
        if (!c)
            return void await this._viewer.alert("Simplify: Nothing Selected");
        let h = !1;
        c.geometry ? c.children.length === 0 && (h = !0) : h = !0,
        h || await this._viewer.confirm("Simplify: Simplify all in hierarchy?") && (h = !0),
        h ? this.simplifyGeometries() : this.simplifyGeometry(c.geometry)
    }
}

export default SimplifyModifierPlugin;
