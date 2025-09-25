/* Standalone Class: TransformAnimationPlugin */

class TransformAnimationPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.toJSON = void 0,
        this.enabled = !0,
        this._addSceneObject = o => {
            const c = o.object;
            c != null && c.traverse && c.traverse(h => {
                var _, b;
                if (h.isWidget)
                    return;
                h.userData[TransformAnimationPlugin.PluginType] === void 0 && (h.userData[TransformAnimationPlugin.PluginType] = {
                    transforms: []
                });
                const _e = {
                    type: "folder",
                    label: "Transform Animation",
                    children: [{
                        type: "button",
                        label: "Add Current Transform",
                        value: () => {
                            var nt;
                            this.addTransform(h),
                            (nt = _e == null ? void 0 : _e.uiRefresh) === null || nt === void 0 || nt.call(_e)
                        }
                    }, () => {
                        var nt;
                        return (nt = h.userData[TransformAnimationPlugin.PluginType]) === null || nt === void 0 ? void 0 : nt.transforms.map( (it, at) => ({
                            type: "folder",
                            label: `Transform ${at}`,
                            children: [{
                                type: "vec3",
                                label: "Position",
                                property: [it, "position"]
                            }, {
                                type: "vec3",
                                label: "Quaternion",
                                property: [it, "quaternion"]
                            }, {
                                type: "vec3",
                                label: "Scale",
                                property: [it, "scale"]
                            }, {
                                type: "button",
                                label: "Set",
                                value: () => {
                                    this.setTransform(h, it)
                                }
                            }, {
                                type: "button",
                                label: "Animate",
                                value: () => {
                                    this.animateTransform(h, it)
                                }
                            }]
                        }))
                    }
                    ]
                };
                (b = (_ = h.uiConfig) === null || _ === void 0 ? void 0 : _.children) === null || b === void 0 || b.push(_e)
            }
            )
        }
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("addSceneObject", this._addSceneObject)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("addSceneObject", this._addSceneObject),
        super.onRemove(o)
    }
    addTransform(o) {
        o.userData[TransformAnimationPlugin.PluginType].transforms.push({
            position: o.position.clone(),
            quaternion: o.quaternion.clone(),
            scale: o.scale.clone()
        })
    }
    setTransform(o, c) {
        var h, _, b, _e;
        o.position.copy(c.position),
        o.quaternion.copy(c.quaternion),
        o.scale.copy(c.scale),
        (_ = (h = o.userData).setDirty) === null || _ === void 0 || _.call(h),
        (_e = (b = o.uiConfig) === null || b === void 0 ? void 0 : b.uiRefresh) === null || _e === void 0 || _e.call(b)
    }
    animateTransform(o, c, h=2e3) {
        var _, b;
        const _e = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.getPluginByType("PopmotionPlugin");
        _e || (b = this._viewer) === null || b === void 0 || b.console.error("PopmotionPlugin required for animation");
        const nt = typeof c == "number" ? o.userData[TransformAnimationPlugin.PluginType].transforms[c] : c
          , it = new three_module.Pq0
          , at = new three_module.PTz
          , ut = new three_module.Pq0
          , pt = o.position.clone()
          , ht = o.quaternion.clone()
          , _t = o.scale.clone()
          , vt = nt.position
          , bt = nt.quaternion
          , St = nt.scale;
        return _e == null ? void 0 : _e.animate({
            from: 0,
            to: 1,
            duration: h,
            onUpdate: At => {
                var Et, Pt;
                it.lerpVectors(pt, vt, At),
                at.slerpQuaternions(ht, bt, At),
                ut.lerpVectors(_t, St, At),
                o.position.copy(it),
                o.quaternion.copy(at),
                o.scale.copy(ut),
                (Et = this._viewer) === null || Et === void 0 || Et.setDirty(),
                (Pt = this._viewer) === null || Pt === void 0 || Pt.renderer.resetShadows()
            }
            ,
            onStop: () => {
                var At, Et, Pt, It;
                o.position.copy(nt.position),
                o.quaternion.copy(nt.quaternion),
                o.scale.copy(nt.scale),
                (Et = (At = o.userData).setDirty) === null || Et === void 0 || Et.call(At),
                (It = (Pt = o.uiConfig) === null || Pt === void 0 ? void 0 : Pt.uiRefresh) === null || It === void 0 || It.call(Pt)
            }
        })
    }
}

export default TransformAnimationPlugin;
