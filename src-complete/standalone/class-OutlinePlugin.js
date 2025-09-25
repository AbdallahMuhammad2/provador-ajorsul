/* Standalone Class: OutlinePlugin */

class OutlinePlugin extends GenericExtensionPlugin {
    constructor() {
        super(),
        this._state = "in",
        this.mouseInOutAnimationEnabled = !0
    }
    generateExtension(o) {
        return new OutlineExtension(o,this._outlineTarget)
    }
    async onAdded(o) {
        this._outlineTarget = o.renderer.createTarget({
            sizeMultiplier: 1
        }),
        await super.onAdded(o);
        const c = o == null ? void 0 : o.getPluginByType("Picking");
        c || console.error("OutlinePlugin requires PickingPlugin to be added to the viewer"),
        o.addEventListener("preRender", () => {
            this._extension.extraUniforms.dpr.value = o.renderer.displayCanvasScaling
        }
        );
        const h = new three_module.BKk({
            uniforms: {
                cameraNearFar: {
                    value: new three_module.I9Y(.1,100)
                }
            },
            vertexShader: outlineDepthVert,
            fragmentShader: outlineDepthFrag,
            side: three_module.$EB
        })
          , _ = makeFilter(o, {
            passId: "outline",
            after: ["gbuffer"],
            before: ["render"],
            passObject: new OutlineRenderPass( () => {
                var b, _e;
                if (!((b = this._extension) === null || b === void 0) && b.highlightSelectedMaterials) {
                    const nt = (_e = c == null ? void 0 : c.getSelectedObject()) === null || _e === void 0 ? void 0 : _e.material;
                    if (this._extension.highlightMaterialSameNames && nt) {
                        const it = Array.isArray(nt) ? nt.map(ut => ut.name) : [nt.name]
                          , at = new Set;
                        return it.forEach(ut => {
                            var pt, ht;
                            const _t = (ht = (pt = o.assetManager) === null || pt === void 0 ? void 0 : pt.materials) === null || ht === void 0 ? void 0 : ht.findMaterialsByName(ut);
                            _t == null || _t.forEach(vt => at.add(vt))
                        }
                        ),
                        [...at]
                    }
                    return nt
                }
                return c == null ? void 0 : c.getSelectedObject()
            }
            ,this._outlineTarget,h),
            update() {
                o.scene.renderCamera.updateShaderProperties(this.passObject.overrideMaterial),
                _.passObject.scene = o.scene.modelObject,
                _.passObject.camera = o.scene.renderCamera.cameraObject
            }
        });
        o.renderer.registerPass(_),
        c == null || c.addEventListener("selectedObjectChanged", () => {
            !this._animationCallBack && this._extension && (c != null && c.getSelectedObject() ? this._extension.enableDynamicSelection ? (this._extension.transparency = 1,
            this._animationCallBack = this._startTransparencyAnimation(1, this._extension.highlightTransparency, 400)) : this._extension.transparency = this._extension.highlightTransparency : this._extension.transparency = 1)
        }
        ),
        document.addEventListener("mousemove", b => {
            if (!this._extension || !this.mouseInOutAnimationEnabled)
                return;
            const _e = c == null ? void 0 : c.getSelectedObject();
            _e && this._extension.enableDynamicSelection ? b.target !== o.canvas ? this._animationCallBack || this._state !== "in" || (this._animationCallBack = this._startTransparencyAnimation(this._extension.highlightTransparency, 1, 600),
            this._state = "out") : this._animationCallBack || this._state !== "out" || (this._animationCallBack = this._startTransparencyAnimation(1, this._extension.highlightTransparency, 600),
            this._state = "in") : this._extension.transparency = _e ? this._extension.highlightTransparency : 1
        }
        )
    }
    async _startTransparencyAnimation(o, c, h) {
        return animateTarget$1(this._extension, "transparency", {
            from: o,
            to: c,
            duration: h,
            onComplete: () => {
                this._animationCallBack = null
            }
        })
    }
}

export default OutlinePlugin;
