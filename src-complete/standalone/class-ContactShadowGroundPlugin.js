/* Standalone Class: ContactShadowGroundPlugin */

class ContactShadowGroundPlugin extends BaseGroundPlugin {
    constructor(o={}, c=!1) {
        super(o),
        this.contactShadows = !0,
        this.blurAmount = 1,
        this.shadowScale = 1,
        this.shadowHeight = 5,
        this.shadowCamera = new three_module.qUd(-1,1,1,-1,.001,this.shadowHeight),
        this._refreshShadowCameraFrustum = this._refreshShadowCameraFrustum.bind(this),
        this.refreshOptions = this.refreshOptions.bind(this),
        this._showDebug = c,
        c && this.dependencies.push(DebugPlugin)
    }
    async onAdded(o) {
        const c = o.renderer.createTarget({
            type: three_module.OUM,
            format: three_module.GWd,
            colorSpace: three_module.jf0,
            size: {
                width: 512,
                height: 512
            },
            generateMipmaps: !1,
            depthBuffer: !0,
            minFilter: three_module.k6q,
            magFilter: three_module.k6q
        });
        c.texture.name = "groundContactDepthTexture";
        const h = new three_module.CSG({
            depthPacking: three_module.Rkk
        });
        h.onBeforeCompile = function(b) {
            b.uniforms.opacity.value = 1,
            b.fragmentShader = `
						${b.fragmentShader.replace("gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );", "gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), 1.0 );")}
					`
        }
        ;
        const _ = new GBufferRenderPass(c,h,new three_module.Q1f(0,0,0),0);
        this._depthPass = _,
        await super.onAdded(o)
    }
    _postFrame() {
        super._postFrame(),
        this._viewer
    }
    _preRender() {
        if (super._preRender(),
        !this._viewer || !this._depthPass)
            return;
        this._depthPass.scene = this._viewer.scene.modelObject,
        this._depthPass.camera = this.shadowCamera,
        this._depthPass.render(this._viewer.renderer.rendererObject, null);
        const o = this._viewer.renderer.getTempTarget({
            type: three_module.OUM,
            format: three_module.GWd,
            colorSpace: three_module.jf0,
            size: {
                width: 1024,
                height: 1024
            },
            generateMipmaps: !1,
            depthBuffer: !1,
            minFilter: three_module.k6q,
            magFilter: three_module.k6q
        });
        this._blurShadow(o),
        this._blurShadow(o, .4),
        this._viewer.renderer.releaseTempTarget(o)
    }
    _blurShadow(o, c=1) {
        this._viewer && this._depthPass && (horizontalBlurMaterial.uniforms.h.value = c * this.blurAmount / 256,
        verticalBlurMaterial.uniforms.v.value = c * this.blurAmount / 256,
        this._viewer.renderer.blit(this._depthPass.target.texture, o, {
            material: horizontalBlurMaterial,
            clear: !0
        }),
        this._viewer.renderer.blit(o.texture, this._depthPass.target, {
            material: verticalBlurMaterial,
            clear: !0
        }))
    }
    async onDispose(o) {
        return super.onDispose(o)
    }
    async onRemove(o) {
        var c, h, _;
        const b = (c = this._depthPass) === null || c === void 0 ? void 0 : c.target;
        return b && ((h = this._viewer) === null || h === void 0 || h.renderer.disposeTarget(b)),
        (_ = this._depthPass) === null || _ === void 0 || _.dispose(),
        this._depthPass = void 0,
        super.onRemove(o)
    }
    _refreshTransform() {
        super._refreshTransform(),
        this._mesh && this._viewer && (this.shadowCamera.position.copy(this._mesh.getWorldPosition(new three_module.Pq0)),
        this.shadowCamera.setRotationFromEuler(new three_module.O9p(Math.PI / 2,0,0)),
        this.shadowCamera.updateMatrixWorld(),
        this._refreshShadowCameraFrustum(),
        this._mesh.scale.y = -this.size)
    }
    _refreshShadowCameraFrustum() {
        this.shadowCamera && (this.shadowCamera.left = -this.size / (2 * this.shadowScale),
        this.shadowCamera.right = this.size / (2 * this.shadowScale),
        this.shadowCamera.top = this.size / (2 * this.shadowScale),
        this.shadowCamera.bottom = -this.size / (2 * this.shadowScale),
        this.shadowCamera.far = this.shadowHeight,
        this.shadowCamera.updateProjectionMatrix(),
        this._setDirty())
    }
    _setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    _removeMaterial() {
        this._material && super._removeMaterial()
    }
    refreshOptions() {
        this._viewer && super.refreshOptions()
    }
    _refreshMaterial() {
        var o;
        if (!this._viewer)
            return !1;
        const c = super._refreshMaterial();
        return this._material && (this._material.alphaMap = ((o = this._depthPass) === null || o === void 0 ? void 0 : o.target.texture) || null,
        c && (this._material.roughness = 1,
        this._material.metalness = 0,
        this._material.color.set(1118481),
        this._material.transparent = !0,
        this._material.materialObject.userData.ssreflDisabled = !0,
        this._material.materialObject.userData.ssreflNonPhysical = !1)),
        c
    }
    _extraUiConfig() {
        return [{
            label: "Contact Shadows",
            type: "checkbox",
            property: [this, "contactShadows"]
        }, {
            label: "Shadow Scale",
            type: "slider",
            bounds: [0, 2],
            property: [this, "shadowScale"]
        }, {
            label: "Shadow Height",
            type: "slider",
            bounds: [0, 20],
            property: [this, "shadowHeight"]
        }, {
            label: "Blur Amount",
            type: "slider",
            bounds: [0, 10],
            property: [this, "blurAmount"]
        }, ...super._extraUiConfig()]
    }
}

export default ContactShadowGroundPlugin;
