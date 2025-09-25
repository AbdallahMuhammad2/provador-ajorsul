/* Standalone Class: CubeNormalsCaptureHelper */

class CubeNormalsCaptureHelper {
    constructor(o) {
        this._normalsCache = {},
        this._renderer = o,
        this._scene = new three_module.Z58,
        this._mesh = new three_module.eaF,
        this._mesh.frustumCulled = !1,
        this._scene.add(this._mesh),
        this._mesh.position.set(0, 0, 0),
        this._mesh.material = new NormalCaptureMaterial
    }
    dispose() {
        var o;
        (o = this._mesh.geometry) === null || o === void 0 || o.dispose(),
        this._mesh.material.dispose(),
        this.disposeAllTargets()
    }
    disposeTarget(o) {
        o.split(";").forEach(c => {
            var h;
            return (h = this._normalsCache[c]) === null || h === void 0 ? void 0 : h.dispose()
        }
        )
    }
    disposeAllTargets() {
        Object.values(this._normalsCache).forEach(o => o.dispose()),
        this._normalsCache = {}
    }
    hasCapturedNormalMap(o) {
        return !!o.userData._normalsCaptureMap
    }
    _getPrecisionType(o) {
        return o === "low" ? three_module.OUM : o === "medium" ? three_module.ix0 : o === "high" ? three_module.RQf : three_module.ix0
    }
    captureNormalMap(o, c, h=512, _="medium", b) {
        if (!o)
            throw "No geometry";
        if (this.hasCapturedNormalMap(o))
            return !1;
        const _e = c == null ? void 0 : c.split(";").find(at => this._normalsCache[at]);
        if (_e) {
            const at = this._normalsCache[_e];
            return c == null || c.split(";").forEach(ut => ut !== _e && (this._normalsCache[ut] = at)),
            at.width !== h && console.warn("last cacheKey normalMapRes mismatch, check model", h),
            o.userData._normalsCaptureMap = at,
            !1
        }
        const nt = this._renderer.createTargetCustom({
            width: h,
            height: h
        }, {
            minFilter: three_module.hxR,
            magFilter: three_module.hxR,
            generateMipmaps: !1,
            type: this._getPrecisionType(_)
        }, three_module.o6l);
        if (nt.attachedGeometries = [],
        nt.autoDispose = CubeNormalsCaptureHelper.AutoDisposeTargets,
        !nt)
            throw "Unable to create render target";
        const it = () => {
            var at;
            const ut = new three_module.F1T(1e-4,100,nt);
            this._scene.add(ut);
            const pt = o.userData.normalsCaptureOffsets;
            pt.center !== void 0 && this._mesh.material.uniforms.offsetCenter.value.fromArray(pt.center),
            pt.offsetMatrixInv !== void 0 && this._mesh.material.uniforms.offsetMatrixInv.value.fromArray(pt.offsetMatrixInv),
            pt.radius !== void 0 && (this._mesh.material.uniforms.radius.value = pt.radius),
            this._mesh.geometry = o,
            b != null && b.morphTargetInfluences && (!((at = o.morphAttributes) === null || at === void 0) && at.position) && (this._mesh.morphTargetInfluences = b.morphTargetInfluences,
            this._mesh.morphTargetDictionary = b.morphTargetDictionary);
            const ht = this._renderer.rendererObject.getClearColor(new three_module.Q1f)
              , _t = this._renderer.rendererObject.getClearAlpha();
            this._renderer.rendererObject.setClearColor(new three_module.Q1f(0,0,0), 1),
            ut.update(this._renderer.rendererObject, this._scene),
            this._renderer.rendererObject.setClearColor(ht, _t),
            this._mesh.morphTargetInfluences = void 0,
            this._mesh.morphTargetDictionary = void 0,
            this._scene.remove(ut),
            this._mesh.geometry = void 0,
            o.userData._normalsCaptureMap = nt
        }
        ;
        return it(),
        this._renderer.addEventListener("contextRestored", it),
        nt.attachedGeometries.push(o),
        o.addEventListener("dispose", () => {
            var at, ut;
            nt.attachedGeometries = (ut = (at = nt.attachedGeometries) === null || at === void 0 ? void 0 : at.filter(pt => pt !== o)) !== null && ut !== void 0 ? ut : [],
            delete o.userData._normalsCaptureMap,
            this._renderer.removeEventListener("contextRestored", it),
            nt.autoDispose && !nt.attachedGeometries.length && nt.dispose()
        }
        ),
        c == null || c.split(";").forEach(at => this._normalsCache[at] = nt),
        nt.addEventListener("dispose", () => {
            var at;
            c == null || c.split(";").forEach(ut => delete this._normalsCache[ut]),
            this._renderer.removeEventListener("contextRestored", it),
            (at = nt.attachedGeometries) === null || at === void 0 || at.forEach(ut => delete ut.userData._normalsCaptureMap)
        }
        ),
        !0
    }
    removeNormalMap(o) {
        o.userData._normalsCaptureMap && (o.userData._normalsCaptureMap.dispose(),
        delete o.userData._normalsCaptureMap)
    }
}

export default CubeNormalsCaptureHelper;
