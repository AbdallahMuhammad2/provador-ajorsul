/* Standalone Class: FrameFadePlugin */

class FrameFadePlugin extends GenericFilterPlugin {
    async startTransition(o) {
        this._viewer && this._pass && !this.isDisabled() && (this._target || (this._target = this._viewer.renderer.getTempTarget({
            sizeMultiplier: 1,
            minFilter: three_module.k6q,
            magFilter: three_module.k6q,
            colorSpace: this._viewer.renderer.composerTarget.texture.colorSpace
        })),
        this._fadeTimeState < 500 && (this._toSaveFrame = !0),
        this._fadeTimeState = Math.max(o, this._fadeTimeState),
        this._fadeTime = this._fadeTimeState,
        this.setDirty(),
        await X$2(o))
    }
    stopTransition() {
        this._fadeTimeState = 0
    }
    constructor() {
        super(),
        this.passId = "frameFade",
        this._fadeTime = 0,
        this._fadeTimeState = 0,
        this._toSaveFrame = !1,
        this._beforeFilters = ["progressive", "taa"],
        this._afterFilters = ["render"],
        this._requiredFilters = ["render", "progressive"],
        this.dependencies = [ProgressivePlugin],
        this.isEditor = !1,
        this.fadeOnActiveCameraChange = !0,
        this.fadeOnMaterialUpdate = !0,
        this.fadeOnSceneUpdate = !0,
        this.pointerEnabled = !0,
        this._fadeCam = o => o.frameFade !== !1 && !this.isEditor && this.fadeOnActiveCameraChange && this.startTransition(o.fadeDuration || 1e3),
        this._fadeMat = o => {
            o.frameFade !== !1 && !this.isEditor && this.fadeOnMaterialUpdate && this.startTransition(o.fadeDuration || 200)
        }
        ,
        this._fadeScene = o => {
            o.frameFade !== !1 && !this.isEditor && this.fadeOnSceneUpdate && this.startTransition(o.fadeDuration || 500)
        }
        ,
        this._onPointerMove = o => {
            var c;
            const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.canvas;
            if (!h)
                return void (this.pointerEnabled = !1);
            if (!o.buttons || o.target !== h)
                return void (this.pointerEnabled = !0);
            const _ = h.getBoundingClientRect()
              , b = (o.clientX - _.left) / _.width
              , _e = (o.clientY - _.top) / _.height;
            this.pointerEnabled = b < 0 || b > 1 || _e < 0 || _e > 1
        }
        ,
        this._disabledBy = [],
        this.startTransition = this.startTransition.bind(this),
        this.stopTransition = this.stopTransition.bind(this),
        this._fadeCam = this._fadeCam.bind(this),
        this._fadeMat = this._fadeMat.bind(this)
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("activeCameraChange", this._fadeCam),
        o.scene.addEventListener("activeCameraUpdate", this.stopTransition),
        o.scene.addEventListener("sceneMaterialUpdate", this._fadeMat),
        o.scene.addEventListener("sceneUpdate", this._fadeScene),
        window.addEventListener("pointermove", this._onPointerMove)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("activeCameraChange", this._fadeCam),
        o.scene.removeEventListener("activeCameraUpdate", this.stopTransition),
        o.scene.removeEventListener("sceneMaterialUpdate", this._fadeMat),
        o.scene.removeEventListener("sceneUpdate", this._fadeScene),
        window.removeEventListener("pointermove", this._onPointerMove),
        super.onRemove(o)
    }
    passCtor(o) {
        const c = this
          , h = o.getPlugin(ProgressivePlugin)
          , _ = new class extends AddBlendPass {
            constructor() {
                super(...arguments),
                this._lastTime = 0,
                this._saveNextFrame = !1,
                this.uiConfig = generateUiFolder("Frame Fade", this)
            }
            render(b, _e, nt, it, at) {
                this.needsSwap = !1;
                const ut = c._target;
                if (!ut || !c.pointerEnabled || !this.enabled || !c.dirty || c._fadeTimeState < .001 || o.scene.renderCamera !== o.scene.activeCamera)
                    return;
                c._toSaveFrame && (this._saveNextFrame = !0,
                c._toSaveFrame = !1),
                this._saveNextFrame && h.lastFrame && (o.renderer.blit(h.lastFrame.texture, ut),
                this._lastTime = 0,
                this._saveNextFrame = !1),
                this.blendTexture = ut == null ? void 0 : ut.texture;
                const pt = c._fadeTimeState / c._fadeTime;
                this.weights2.setScalar(pt),
                this.weights2.w = 1,
                this.weights1.setScalar(1 - pt),
                this.weights1.w = 1,
                super.render(b, _e, nt, it, at),
                this.needsSwap = !0;
                const ht = g();
                this._lastTime < 10 && (this._lastTime = ht - 10);
                const _t = ht - this._lastTime;
                this._lastTime = ht,
                c._fadeTimeState -= _t
            }
        }
        (void 0,o.renderer.maxHDRIntensity);
        return _.enabled = !0,
        _
    }
    setDirty() {
        var o;
        this.enabled && ((o = this._viewer) === null || o === void 0 || o.setDirty())
    }
    get dirty() {
        return this.enabled && this._fadeTimeState > 0
    }
    set dirty(o) {
        console.warn("FrameFadePlugin.dirty is readonly")
    }
    _update(o) {
        return !!super._update(o) && (this.isDisabled() && this.stopTransition(),
        this._fadeTimeState < 1 && (this._toSaveFrame = !1,
        this._target && this._viewer && (this._viewer.renderer.releaseTempTarget(this._target),
        this._target = void 0)),
        !0)
    }
    get uiConfig() {
        var o, c;
        return (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig
    }
    disable(o) {
        this._disabledBy.includes(o) || this._disabledBy.push(o)
    }
    enable(o) {
        const c = this._disabledBy.indexOf(o);
        c >= 0 && this._disabledBy.splice(c, 1)
    }
    isDisabled() {
        return !this.pointerEnabled || this._disabledBy.length > 0 || !this.enabled
    }
}

export default FrameFadePlugin;
