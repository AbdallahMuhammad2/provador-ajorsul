/* Standalone Class: NormalBufferPlugin */

class NormalBufferPlugin extends GenericFilterPlugin {
    passCtor(o) {
        this._normalTarget = o.renderer.createTarget({
            depthBuffer: !0,
            type: three_module.ix0,
            minFilter: three_module.hxR,
            magFilter: three_module.hxR,
            generateMipmaps: !1
        }),
        this._normalTarget.texture.name = "normalBuffer",
        this._normalTarget.texture.generateMipmaps = !1;
        const c = this._normalTarget
          , h = new Set
          , _ = new Set;
        return new class extends NormalRenderPass {
            render(b, _e, nt, it, at) {
                const ut = b.getRenderTarget()
                  , pt = b.getActiveCubeFace()
                  , ht = b.getActiveMipmapLevel();
                this.scene && (this.scene.traverse( ({material: _t}) => {
                    _t && ((_t.transparent && _t.userData.renderToDepth || !_t.transparent && _t.transmission === 0 && _t.userData.renderToDepth === !1) && (h.add(_t),
                    _t.transparent = !_t.transparent),
                    Math.abs(_t.transmission || 0) > 0 && _t.userData.renderToDepth && (_.add([_t, _t.transmission]),
                    _t.transmission = 0))
                }
                ),
                setThreeRendererMode(b, {
                    shadowMapRender: !1,
                    backgroundRender: !1,
                    opaqueRender: !0,
                    transparentRender: !1,
                    transmissionRender: !1,
                    mainRenderPass: !1
                }, () => super.render(b, _e, c, it, at)),
                h.forEach(_t => _t.transparent = !_t.transparent),
                h.clear(),
                _.forEach( ([_t,vt]) => _t.transmission = vt),
                _.clear(),
                b.setRenderTarget(ut, pt, ht))
            }
        }
    }
    _update(o) {
        if (!super._update(o))
            return !1;
        const c = this.pass.passObject;
        return c.scene = o.scene.modelObject,
        c.camera = o.scene.activeCamera.cameraObject,
        !0
    }
    constructor(o=!0) {
        super(),
        this.passId = "normalBuffer",
        this._beforeFilters = ["render"],
        this._afterFilters = [],
        this._requiredFilters = ["render"],
        this.enabled = o
    }
    getNormalBuffer() {
        return this._normalTarget
    }
    async onDispose(o) {}
    async onRemove(o) {
        var c, h;
        return o.renderer.disposeTarget((h = (c = this._normalTarget) === null || c === void 0 ? void 0 : c.dispose) === null || h === void 0 ? void 0 : h.call(c)),
        super.onRemove(o)
    }
    updateShaderProperties(o) {
        var c, h;
        return o.uniforms.tNormalBuffer ? o.uniforms.tNormalBuffer.value = this.enabled && (h = (c = this.getNormalBuffer()) === null || c === void 0 ? void 0 : c.texture) !== null && h !== void 0 ? h : null : console.warn("BaseRenderer: no uniform: tNormalBuffer"),
        this
    }
    get uiConfig() {
        var o;
        return (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.uiConfig
    }
}

export default NormalBufferPlugin;
