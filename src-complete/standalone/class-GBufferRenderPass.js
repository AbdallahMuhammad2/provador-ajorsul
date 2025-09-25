/* Standalone Class: GBufferRenderPass */

class GBufferRenderPass extends RenderPass {
    constructor(o, c, h=new three_module.Q1f(1,1,1), _=1) {
        super(void 0, void 0, c, h, _),
        this.target = o,
        this._transparentMats = new Set,
        this._transmissiveMats = new Set
    }
    render(o, c, h, _, b) {
        var _e;
        const nt = o.getRenderTarget()
          , it = o.getActiveCubeFace()
          , at = o.getActiveMipmapLevel();
        (_e = this.scene) === null || _e === void 0 || _e.traverse( ({material: ut}) => {
            ut && ((ut.transparent && ut.userData.renderToDepth || !ut.transparent && ut.transmission === 0 && ut.userData.renderToDepth === !1) && (this._transparentMats.add(ut),
            ut.transparent = !ut.transparent),
            Math.abs(ut.transmission || 0) > 0 && ut.userData.renderToDepth && (this._transmissiveMats.add([ut, ut.transmission]),
            ut.transmission = 0))
        }
        ),
        setThreeRendererMode(o, {
            shadowMapRender: !1,
            backgroundRender: !1,
            opaqueRender: !0,
            transparentRender: !1,
            transmissionRender: !1,
            mainRenderPass: !1
        }, () => super.render(o, c, this.target, _, b)),
        this._transparentMats.forEach(ut => ut.transparent = !ut.transparent),
        this._transparentMats.clear(),
        this._transmissiveMats.forEach( ([ut,pt]) => ut.transmission = pt),
        this._transmissiveMats.clear(),
        o.setRenderTarget(nt, it, at)
    }
}

export default GBufferRenderPass;
