/* Standalone Class: VelocityBufferPlugin */

class VelocityBufferPlugin extends GenericFilterPlugin {
    passCtor(o) {
        const c = o.renderer.createTarget({
            depthBuffer: !0,
            type: three_module.OUM
        });
        c.texture.name = "velocityBuffer",
        this._velocityBuffers.push(c),
        o.getPluginByType("debug");
        const h = new Set
          , _ = new Set;
        return new class extends SSVelocityPass {
            render(b, _e, nt, it, at) {
                var ut;
                if (o.renderer.frameCount > 0)
                    return;
                const pt = b.getRenderTarget()
                  , ht = b.getActiveCubeFace()
                  , _t = b.getActiveMipmapLevel();
                (ut = this.scene) === null || ut === void 0 || ut.traverse( ({material: vt}) => {
                    var bt, St;
                    if (!vt)
                        return;
                    const At = vt.userData.renderToDepth && !vt.userData.pluginsDisabled && !(!((bt = vt.userData[VelocityBufferPlugin.PluginType]) === null || bt === void 0) && bt.disabled)
                      , Et = vt.userData.renderToDepth === !1 || vt.userData.pluginsDisabled || ((St = vt.userData[VelocityBufferPlugin.PluginType]) === null || St === void 0 ? void 0 : St.disabled);
                    (vt.transparent && At || !vt.transparent && !vt.transmission && Et) && (h.add(vt),
                    vt.transparent = !vt.transparent),
                    Math.abs(vt.transmission || 0) > 0 && At && (_.add([vt, vt.transmission]),
                    vt.transmission = 0)
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
                h.forEach(vt => vt.transparent = !vt.transparent),
                h.clear(),
                _.forEach( ([vt,bt]) => vt.transmission = bt),
                _.clear(),
                b.setRenderTarget(pt, ht, _t)
            }
        }
    }
    _update(o) {
        if (!super._update(o) || o.renderer.frameCount > 0)
            return !1;
        const c = this.pass.passObject;
        return c.scene = o.scene.modelObject,
        o.scene.renderCamera.updateShaderProperties(c.overrideMaterial),
        c.camera = o.scene.renderCamera.cameraObject,
        !0
    }
    constructor(o=!0) {
        super(),
        this.passId = "velocityBuffer",
        this._beforeFilters = ["render"],
        this._afterFilters = [],
        this._requiredFilters = ["render"],
        this._velocityBuffers = [],
        this.enabled = o
    }
    getVelocityBuffer() {
        return this._velocityBuffers.length > 0 ? this._velocityBuffers[0] : void 0
    }
    async onDispose(o) {}
    async onRemove(o) {
        return this._velocityBuffers.forEach(c => {
            var h;
            return o.renderer.disposeTarget((h = c == null ? void 0 : c.dispose) === null || h === void 0 ? void 0 : h.call(c))
        }
        ),
        super.onRemove(o)
    }
    updateShaderProperties(o) {
        var c, h;
        return o.uniforms.tVelocity ? o.uniforms.tVelocity.value = this.enabled && (h = (c = this.getVelocityBuffer()) === null || c === void 0 ? void 0 : c.texture) !== null && h !== void 0 ? h : null : console.warn("BaseRenderer: no uniform: tVelocity"),
        this
    }
    get uiConfig() {
        var o;
        return (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.uiConfig
    }
}

export default VelocityBufferPlugin;
