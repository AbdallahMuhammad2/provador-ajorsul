/* Standalone Class: SessionLightProbe */

class SessionLightProbe {
    constructor(o, c, h, _, b) {
        this.xrLight = o,
        this.renderer = c,
        this.lightProbe = h,
        this.xrWebGLBinding = null,
        this.estimationStartCallback = b,
        this.frameCallback = this.onXRFrame.bind(this);
        const _e = c.xr.getSession();
        if (_ && "XRWebGLBinding"in window) {
            const nt = new three_module.o6l(16);
            o.environment = nt.texture;
            const it = c.getContext();
            switch (_e.preferredReflectionFormat) {
            case "srgba8":
                it.getExtension("EXT_sRGB");
                break;
            case "rgba16f":
                it.getExtension("OES_texture_half_float")
            }
            this.xrWebGLBinding = new XRWebGLBinding(_e,it),
            this.lightProbe.addEventListener("reflectionchange", () => {
                this.updateReflection()
            }
            )
        }
        _e.requestAnimationFrame(this.frameCallback)
    }
    updateReflection() {
        const o = this.renderer.properties.get(this.xrLight.environment);
        if (o) {
            const c = this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);
            c && (o.__webglTexture = c,
            this.xrLight.environment.needsPMREMUpdate = !0)
        }
    }
    onXRFrame(o, c) {
        if (!this.xrLight)
            return;
        c.session.requestAnimationFrame(this.frameCallback);
        const h = c.getLightEstimate(this.lightProbe);
        if (h) {
            this.xrLight.lightProbe.sh.fromArray(h.sphericalHarmonicsCoefficients),
            this.xrLight.lightProbe.intensity = 1;
            const _ = Math.max(1, Math.max(h.primaryLightIntensity.x, Math.max(h.primaryLightIntensity.y, h.primaryLightIntensity.z)));
            this.xrLight.directionalLight.color.setRGB(h.primaryLightIntensity.x / _, h.primaryLightIntensity.y / _, h.primaryLightIntensity.z / _),
            this.xrLight.directionalLight.intensity = _,
            this.xrLight.directionalLight.position.copy(h.primaryLightDirection),
            this.estimationStartCallback && (this.estimationStartCallback(),
            this.estimationStartCallback = null)
        }
    }
    dispose() {
        this.xrLight = null,
        this.renderer = null,
        this.lightProbe = null,
        this.xrWebGLBinding = null
    }
}

export default SessionLightProbe;
