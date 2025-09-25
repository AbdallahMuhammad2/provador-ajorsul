/* Standalone Class: ProgressivePlugin */

class ProgressivePlugin extends MultiFilterPlugin {
    constructor(o=2 * offsets.length) {
        super(),
        this._lastFrames = new Map,
        this.enabled = !0,
        this.jitter = !0,
        this._hasSetOffset = !1,
        this.trackedJitterCameras = new Set,
        this._addSceneObject = c => {
            const h = c.object;
            (h.modelObject || h.lightObject) && (h.modelObject || h.lightObject).traverse(_ => {
                var b;
                !((b = _ == null ? void 0 : _.shadow) === null || b === void 0) && b.camera && _.shadow.mapSize && this.trackedJitterCameras.add([_.shadow.camera, _.shadow.mapSize])
            }
            )
        }
        ,
        this._jitterCamera = c => {
            var h;
            const _ = c.target;
            if (this.jitter && _.renderer.frameCount > 1) {
                const b = (nt, it) => {
                    const at = {
                        ...offsets[_.renderer.frameCount % offsets.length]
                    };
                    nt.setViewOffset(it.width, it.height, at.x, at.y, it.width, it.height)
                }
                  , _e = _.scene.activeCamera.cameraObject;
                b(_e, {
                    width: _.canvas.clientWidth * _.renderer.displayCanvasScaling,
                    height: _.canvas.clientHeight * _.renderer.displayCanvasScaling
                }),
                this.trackedJitterCameras.forEach(nt => b(...nt)),
                this._hasSetOffset = !0,
                (h = this._viewer) === null || h === void 0 || h.renderer.resetShadows()
            }
        }
        ,
        this._resetCameraJitter = c => {
            const h = c.target;
            this._hasSetOffset && (h.scene.activeCamera.cameraObject.clearViewOffset(),
            this._hasSetOffset = !1)
        }
        ,
        this.uiConfig = generateUiFolder("Progressive", this),
        this.maxFrameCount = o
    }
    async onAdded(o) {
        return await super.onAdded(o)
    }
    async onRemove(o) {
        o.removeEventListener("preRender", this._jitterCamera),
        o.removeEventListener("postRender", this._resetCameraJitter),
        o.scene.removeEventListener("addSceneObject", this._addSceneObject),
        this._lastFrames.forEach(c => o.renderer.disposeTarget(c)),
        this._lastFrames.clear(),
        await super.onRemove(o)
    }
    get lastFrame() {
        var o;
        return this._lastFrames.get((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.renderCamera.cameraObject.uuid)
    }
    getLastFrame(o) {
        return o ? this._lastFrames.get(o.cameraObject.uuid) : this.lastFrame
    }
    createPasses(o) {
        o.addEventListener("preRender", this._jitterCamera),
        o.addEventListener("postRender", this._resetCameraJitter),
        o.scene.addEventListener("addSceneObject", this._addSceneObject);
        const c = this;
        return [makeFilter(o, {
            passId: "progressive",
            get dirty() {
                var _;
                return c.jitter && (((_ = c._viewer) === null || _ === void 0 ? void 0 : _.renderer.frameCount) || 0) < c.maxFrameCount
            },
            after: ["render"],
            before: ["combinedPost", "screen"],
            required: ["render"],
            passObject: new class extends AddBlendPass {
                render(_, b, _e, nt, it) {
                    if (c.lastFrame) {
                        if (o.renderer.frameCount < 1)
                            return this.needsSwap = !1,
                            void ((_e == null ? void 0 : _e.texture) && o.renderer.blit(_e.texture, c.lastFrame, {}));
                        this.needsSwap = !0,
                        super.render(_, b, _e, nt, it),
                        o.renderer.blit(b.texture, c.lastFrame, {})
                    } else
                        o.console.error("lastFrame render target undefined")
                }
            }
            (void 0,o.renderer.maxHDRIntensity || 120),
            update() {
                if (!c.lastFrame && o.scene.renderCamera && c._lastFrames.set(o.scene.renderCamera.cameraObject.uuid, o.renderer.composerTarget.clone(!0)),
                !c.lastFrame)
                    return void console.error("lastFrame render target undefined");
                let _ = 1 / (Math.max(o.renderer.frameCount, 0) + 1);
                this.passObject.weights1.set(_, _, _, _),
                _ = 1 - _,
                this.passObject.weights2.set(_, _, _, _),
                this.passObject.blendTexture = c.lastFrame.texture,
                this.passObject.material.uniformsNeedUpdate = !0
            }
        })]
    }
    isConverged(o=!1) {
        var c;
        return (((c = this._viewer) === null || c === void 0 ? void 0 : c.renderer.frameCount) || 0) >= this.maxFrameCount - 1 + (o ? 1 : 0)
    }
    updateShaderProperties(o) {
        var c, h;
        return o.uniforms.tLastFrame && (o.uniforms.tLastFrame.value = (h = (c = this.lastFrame) === null || c === void 0 ? void 0 : c.texture) !== null && h !== void 0 ? h : void 0),
        this
    }
    postFrameConvergedRecordingDelta(o="CanvasRecorder") {
        const c = this._viewer.getPluginByType(o);
        return c && c.isRecording() && c.convergeMode ? this.isConverged(!0) ? 1 / c.videoFrameRate : 0 : -1
    }
}

export default ProgressivePlugin;
