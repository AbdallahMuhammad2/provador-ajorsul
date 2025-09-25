/* Standalone Class: OutlineRenderPass */

class OutlineRenderPass extends RenderPass {
    constructor(o, c, h, _=new three_module.Q1f(1,1,1), b=1) {
        super(void 0, void 0, h, _, b),
        this._getSelectedObjectOrMaterial = o,
        this.target = c
    }
    render(o, c, h, _, b) {
        const _e = o.getRenderTarget()
          , nt = o.getActiveCubeFace()
          , it = o.getActiveMipmapLevel()
          , at = this._getSelectedObjectOrMaterial();
        if (at)
            this._renderSelectedObject(o, at, c, _, b);
        else {
            o.setRenderTarget(this.target);
            const ut = new three_module.Q1f;
            o.getClearColor(ut),
            o.setClearColor(new three_module.Q1f(16777215)),
            o.clear(!0, !0),
            o.setClearColor(ut)
        }
        o.setRenderTarget(_e, nt, it)
    }
    _renderSelectedObject(o, c, h, _, b) {
        if (!this.camera)
            return;
        const _e = (Array.isArray(c) ? c : [c]).map(at => at.isMaterial ? [...at.userData.__appliedMeshes.values()] : at).flat();
        _e.forEach(at => at.traverse(ut => {
            ut.layers.enable(6)
        }
        ));
        const nt = this.camera.layers.mask;
        this.camera.layers.set(6);
        const it = o.userData;
        it || console.error("threejs is not patched?"),
        it.transmissionRenderTarget = h,
        setThreeRendererMode(o, {
            shadowMapRender: !1,
            backgroundRender: !1,
            opaqueRender: !0,
            transparentRender: !0,
            transmissionRender: !0,
            mainRenderPass: !1
        }, () => super.render(o, h, this.target, _, b)),
        it.transmissionRenderTarget = void 0,
        _e.forEach(at => at.traverse(ut => {
            ut.layers.disable(6)
        }
        )),
        this.camera.layers.mask = nt
    }
}

export default OutlineRenderPass;
