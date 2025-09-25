/* Standalone Class: BeringRingAnimation */

class BeringRingAnimation extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = null,
        this.ringSlots = [],
        this.dependencies = [AssetManagerPlugin, PopmotionPlugin],
        this._animating = !1,
        this._runningAnimations = [],
        this.uiConfig = {
            type: "folder",
            label: "Bering Animation",
            children: [{
                label: "Play Animation",
                type: "button",
                value: () => {
                    this.startRingAnimation(!1)
                }
            }, {
                label: "Record Animation",
                type: "button",
                value: async () => {
                    var o;
                    const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("CanvasRecorder");
                    if (!c || c.isRecording())
                        return;
                    this.animating && this.stopRingAnimation(!1),
                    await X$2(500);
                    const h = await c.record(async () => {
                        console.log("start"),
                        await this.startRingAnimation(!1),
                        console.log("finish")
                    }
                    );
                    h && (console.log("recorded", h),
                    N$2(h, "animation.mp4"))
                }
            }]
        }
    }
    get animating() {
        return this._animating
    }
    set animating(o) {
        var c, h;
        if (this._animating === o)
            return;
        this._animating = o;
        const _ = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(FrameFadePlugin);
        _ && (o ? _.disable("bering") : _.enable("bering"));
        const b = (h = this._viewer) === null || h === void 0 ? void 0 : h.getPlugin(TemporalAAPlugin);
        b && (b.enabled = !o)
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("addSceneObject", c => {
            var h, _, b, _e, nt;
            if (!(!((_ = (h = c.options) === null || h === void 0 ? void 0 : h.allImported) === null || _ === void 0) && _.length) || !c.object || !c.object.__importedViewerConfig && !(!((b = c.object.modelObject) === null || b === void 0) && b.__importedViewerConfig) || !(!((_e = c.options) === null || _e === void 0) && _e.allImported))
                return;
            let it = 0;
            const at = (nt = c.options) === null || nt === void 0 ? void 0 : nt.allImported.filter(ut => !!(ut && ut.modelObject && ut.name.endsWith("bmod"))).reverse();
            at.forEach(ut => {
                this.loadRingBMod(ut, ut.name, it, at.length - 1),
                it++
            }
            )
        }
        )
    }
    loadRingBMod(o, c, h, _) {
        var b, _e, nt;
        if (!c)
            return;
        if (!(!((b = this._viewer) === null || b === void 0) && b.getPlugin(AssetManagerPlugin)))
            throw new Error("no asset manager");
        this._runningAnimations && this.stopRingAnimation(),
        c.endsWith(".bmod") || (c += ".bmod");
        const it = o == null ? void 0 : o.modelObject;
        if (!it || !o)
            throw new Error("no model");
        it.userData.__ringSlot = h,
        this.ringSlots[h] = o;
        const at = [];
        it.traverse(pt => {
            pt.userData.rotationCount > 1 && at.push(pt)
        }
        ),
        new Box3B().expandByObjects(at, !0, !0),
        c.toLowerCase().includes("x3") || c.toLowerCase().includes("x4");
        const ut = parseInt(c.split("-").pop().toLowerCase().replace("x", "").replace(".bmod", "")) + 1;
        return it.userData.__ringWidth = ut,
        it.userData.__ringTotalSlots = _,
        (nt = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.scene) === null || nt === void 0 || nt.setDirty({
            sceneUpdate: !0,
            frameFade: !1
        }),
        o
    }
    clearAllSlots() {
        this.ringSlots.forEach(o => {
            o.modelObject.removeFromParent()
        }
        ),
        this.ringSlots = []
    }
    stopRingAnimation(o=!0) {
        var c, h;
        if (this._runningAnimations.length !== 0) {
            for (const _ of this._runningAnimations)
                _.stop();
            this._runningAnimations = [],
            o && ((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(FrameFadePlugin)) === null || h === void 0 || h.startTransition(1200))
        }
    }
    async startRingAnimation(o=!0) {
        if (this.animating || !this._viewer)
            return;
        this.stopRingAnimation(),
        this.animating = !0;
        let c = 0;
        const h = [];
        await new Promise(_ => {
            var b, _e, nt;
            if (!this._viewer)
                return;
            const it = () => {
                c += 1,
                c < h.length || _()
            }
              , at = 2500
              , ut = this._viewer.getPlugin(PopmotionPlugin)
              , pt = this.ringSlots[0];
            if (pt) {
                const ht = pt.modelObject
                  , _t = {
                    left: [],
                    right: [],
                    rem: []
                };
                ht.traverse(St => {
                    const At = (St == null ? void 0 : St.name.trim().toLowerCase().replace(/[0-9]/g, "")) || "";
                    At.endsWith("-s") ? _t.left.push(St) : At.endsWith("-l") ? _t.right.push(St) : At.startsWith("testlogo") && _t.rem.push(St)
                }
                );
                const vt = [];
                for (const St of _t.left) {
                    const At = ((b = St.parent) === null || b === void 0 ? void 0 : b.children) || [];
                    vt.push(...At)
                }
                for (const St of _t.right) {
                    const At = ((_e = St.parent) === null || _e === void 0 ? void 0 : _e.children) || [];
                    vt.push(...At)
                }
                for (const St of vt)
                    _t.left.includes(St) || _t.right.includes(St) || _t.rem.includes(St) || _t.rem.push(St);
                for (const St of _t.rem)
                    new Box3B().expandByObject(St, !1, !0).getCenter(new three_module.Pq0).x <= 0 ? _t.left.push(St) : _t.right.push(St);
                for (const St of [..._t.left, ..._t.right])
                    St.userData.__initX = St.position.x,
                    St.userData.__initRotX = St.rotation.x;
                const bt = (nt = this._viewer) === null || nt === void 0 ? void 0 : nt.getPluginByType("Ground");
                if (_t.left.length > 0 && _t.right.length > 0) {
                    const St = Et => Pt => {
                        var It, Dt, Gt;
                        for (const Bt of _t[Et])
                            Bt.position.x = Pt + Bt.userData.__initX;
                        (Dt = (It = this._viewer) === null || It === void 0 ? void 0 : It.scene) === null || Dt === void 0 || Dt.setDirty({
                            sceneUpdate: !1,
                            frameFade: !1
                        }),
                        o && ((Gt = bt == null ? void 0 : bt.shadowBaker) === null || Gt === void 0 || Gt.reset())
                    }
                      , At = Et => Pt => {
                        var It, Dt;
                        for (const Gt of _t[Et])
                            Gt.rotation.x = Pt + Gt.userData.__initRotX;
                        (Dt = (It = this._viewer) === null || It === void 0 ? void 0 : It.scene) === null || Dt === void 0 || Dt.setDirty({
                            sceneUpdate: !1,
                            frameFade: !1
                        })
                    }
                    ;
                    h.push(ut.animate({
                        from: 0,
                        to: -.75,
                        onUpdate: St("left"),
                        onStop: () => {
                            St("left")(0),
                            it()
                        }
                        ,
                        onComplete: it,
                        duration: at,
                        ease: EasingFunctions.easeInOut,
                        repeat: 1,
                        repeatDelay: 250,
                        repeatType: "mirror"
                    })),
                    h.push(ut.animate({
                        from: 0,
                        to: .75,
                        onUpdate: St("right"),
                        onStop: () => {
                            St("right")(0),
                            it()
                        }
                        ,
                        onComplete: it,
                        duration: at,
                        ease: EasingFunctions.easeInOut,
                        repeat: 1,
                        repeatDelay: 250,
                        repeatType: "mirror"
                    })),
                    h.push(ut.animate({
                        from: 0,
                        to: 1.5 * -Math.PI,
                        onUpdate: At("left"),
                        onStop: () => {
                            At("left")(0),
                            it()
                        }
                        ,
                        onComplete: it,
                        duration: 1250,
                        ease: EasingFunctions.easeInOut,
                        repeat: 1,
                        repeatDelay: 2750,
                        repeatType: "mirror"
                    }))
                }
            }
            this.ringSlots.forEach(ht => {
                if (pt === ht)
                    return;
                const _t = ht.modelObject.userData.__ringSlot
                  , vt = ht.modelObject.userData.__ringTotalSlots
                  , bt = ht.modelObject.userData.__ringWidth
                  , St = ht.modelObject.position.x;
                h.push(ut.animate({
                    from: St,
                    to: St + .75 - 1.5 * (1 - (_t + 1) / (vt + 1 + (2 - bt))),
                    onUpdate: At => {
                        var Et, Pt;
                        ht.modelObject.position.x = At,
                        (Pt = (Et = this._viewer) === null || Et === void 0 ? void 0 : Et.scene) === null || Pt === void 0 || Pt.setDirty({
                            sceneUpdate: !1,
                            frameFade: !1
                        })
                    }
                    ,
                    onStop: () => {
                        ht.modelObject.position.x = St,
                        it()
                    }
                    ,
                    onComplete: it,
                    duration: at,
                    ease: EasingFunctions.easeInOut,
                    repeat: 1,
                    repeatDelay: 250,
                    repeatType: "mirror"
                }))
            }
            ),
            h.length > 0 ? this._runningAnimations = h : (this.animating = !1,
            _())
        }
        ),
        this.animating = !1;
        for (const _ of this._runningAnimations)
            _.stop();
        this._runningAnimations = [],
        console.log("animation end")
    }
}

export default BeringRingAnimation;
