/* Standalone Function: er */

function er(br, yr) {
                const Pr = tt.update(Zt);
                Qt.defines.VSM_SAMPLES !== br.blurSamples && (Qt.defines.VSM_SAMPLES = br.blurSamples,
                qt.defines.VSM_SAMPLES = br.blurSamples,
                Qt.needsUpdate = !0,
                qt.needsUpdate = !0),
                br.mapPass === null && (br.mapPass = new Rs(ft.x,ft.y)),
                Qt.uniforms.shadow_pass.value = br.map.texture,
                Qt.uniforms.resolution.value = br.mapSize,
                Qt.uniforms.radius.value = br.radius,
                Tt.setRenderTarget(br.mapPass),
                Tt.clear(),
                Tt.renderBufferDirect(yr, null, Pr, Qt, Zt, null),
                qt.uniforms.shadow_pass.value = br.mapPass.texture,
                qt.uniforms.resolution.value = br.mapSize,
                qt.uniforms.radius.value = br.radius,
                Tt.setRenderTarget(br.map),
                Tt.clear(),
                Tt.renderBufferDirect(yr, null, Pr, qt, Zt, null)
            }
            function rr(br, yr, Pr, zr) {
                let Nr = null;
                const Vr = Pr.isPointLight === !0 ? br.customDistanceMaterial : br.customDepthMaterial;
                if (Vr !== void 0)
                    Nr = Vr;
                else if (Nr = Pr.isPointLight === !0 ? Lt : Mt,
                Tt.localClippingEnabled && yr.clipShadows === !0 && Array.isArray(yr.clippingPlanes) && yr.clippingPlanes.length !== 0 || yr.displacementMap && yr.displacementScale !== 0 || yr.alphaMap && yr.alphaTest > 0 || yr.map && yr.alphaTest > 0) {
                    const Gr = Nr.uuid
                      , Hr = yr.uuid;
                    let _n = Nt[Gr];
                    _n === void 0 && (_n = {},
                    Nt[Gr] = _n);
                    let dn = _n[Hr];
                    dn === void 0 && (dn = Nr.clone(),
                    _n[Hr] = dn),
                    Nr = dn
                }
                return Nr.visible = yr.visible,
                Nr.wireframe = yr.wireframe,
                Nr.side = zr === _t ? yr.shadowSide !== null ? yr.shadowSide : yr.side : yr.shadowSide !== null ? yr.shadowSide : Wt[yr.side],
                Nr.alphaMap = yr.alphaMap,
                Nr.alphaTest = yr.alphaTest,
                Nr.map = yr.map,
                Nr.clipShadows = yr.clipShadows,
                Nr.clippingPlanes = yr.clippingPlanes,
                Nr.clipIntersection = yr.clipIntersection,
                Nr.displacementMap = yr.displacementMap,
                Nr.displacementScale = yr.displacementScale,
                Nr.displacementBias = yr.displacementBias,
                Nr.wireframeLinewidth = yr.wireframeLinewidth,
                Nr.linewidth = yr.linewidth,
                Pr.isPointLight === !0 && Nr.isMeshDistanceMaterial === !0 && (Tt.properties.get(Nr).light = Pr),
                Nr
            }
            function xr(br, yr, Pr, zr, Nr) {
                if (br.visible === !1)
                    return;
                if (br.layers.test(yr.layers) && (br.isMesh || br.isLine || br.isPoints) && (br.castShadow || br.receiveShadow && Nr === _t) && (!br.frustumCulled || mt.intersectsObject(br))) {
                    br.modelViewMatrix.multiplyMatrices(Pr.matrixWorldInverse, br.matrixWorld);
                    const Gr = tt.update(br)
                      , Hr = br.material;
                    if (Array.isArray(Hr)) {
                        const _n = Gr.groups;
                        for (let dn = 0, kn = _n.length; dn < kn; dn++) {
                            const Bn = _n[dn]
                              , cn = Hr[Bn.materialIndex];
                            if (cn && cn.visible) {
                                const Yr = rr(br, cn, zr, Nr);
                                Tt.renderBufferDirect(Pr, null, Gr, Yr, br, Bn)
                            }
                        }
                    } else if (Hr.visible) {
                        const _n = rr(br, Hr, zr, Nr);
                        Tt.renderBufferDirect(Pr, null, Gr, _n, br, null)
                    }
                }
                const Vr = br.children;
                for (let Gr = 0, Hr = Vr.length; Gr < Hr; Gr++)
                    xr(Vr[Gr], yr, Pr, zr, Nr)
            }
            this.render = function(br, yr, Pr) {
                if (Yt.enabled === !1 || Yt.autoUpdate === !1 && Yt.needsUpdate === !1 || br.length === 0)
                    return;
                const zr = Tt.getRenderTarget()
                  , Nr = Tt.getActiveCubeFace()
                  , Vr = Tt.getActiveMipmapLevel()
                  , Gr = Tt.state;
                Gr.setBlending(Et),
                Gr.buffers.color.setClear(1, 1, 1, 1),
                Gr.buffers.depth.setTest(!0),
                Gr.setScissorTest(!1);
                const Hr = sr !== _t && this.type === _t
                  , _n = sr === _t && this.type !== _t;
                for (let dn = 0, kn = br.length; dn < kn; dn++) {
                    const Bn = br[dn]
                      , cn = Bn.shadow;
                    if (cn === void 0) {
                        console.warn("THREE.WebGLShadowMap:", Bn, "has no shadow.");
                        continue
                    }
                    if (cn.autoUpdate === !1 && cn.needsUpdate === !1)
                        continue;
                    ft.copy(cn.mapSize);
                    const Yr = cn.getFrameExtents();
                    if (ft.multiply(Yr),
                    xt.copy(cn.mapSize),
                    (ft.x > jt || ft.y > jt) && (ft.x > jt && (xt.x = Math.floor(jt / Yr.x),
                    ft.x = xt.x * Yr.x,
                    cn.mapSize.x = xt.x),
                    ft.y > jt && (xt.y = Math.floor(jt / Yr.y),
                    ft.y = xt.y * Yr.y,
                    cn.mapSize.y = xt.y)),
                    cn.map === null || Hr === !0 || _n === !0) {
                        const sn = this.type !== _t ? {
                            minFilter: fn,
                            magFilter: fn
                        } : {};
                        cn.map !== null && cn.map.dispose(),
                        cn.map = new Rs(ft.x,ft.y,sn),
                        cn.map.texture.name = Bn.name + ".shadowMap",
                        cn.camera.updateProjectionMatrix()
                    }
                    Tt.setRenderTarget(cn.map),
                    Tt.clear();
                    const Jr = cn.getViewportCount();
                    for (let sn = 0; sn < Jr; sn++) {
                        const on = cn.getViewport(sn);
                        Ct.set(xt.x * on.x, xt.y * on.y, xt.x * on.z, xt.y * on.w),
                        Gr.viewport(Ct),
                        cn.updateMatrices(Bn, sn),
                        mt = cn.getFrustum(),
                        xr(yr, Pr, cn.camera, Bn, this.type)
                    }
                    cn.isPointLightShadow !== !0 && this.type === _t && er(cn, Pr),
                    cn.needsUpdate = !1
                }
                sr = this.type,
                Yt.needsUpdate = !1,
                Tt.setRenderTarget(zr, Nr, Vr)
            }
        }
        function J1(Tt, tt, lt) {
            const mt = lt.isWebGL2
              , ft = new function() {
                let _r = !1;
                const Br = new Lo;
                let Lr = null;
                const Xr = new Lo(0,0,0,0);
                return {
                    setMask: function(Kr) {
                        Lr === Kr || _r || (Tt.colorMask(Kr, Kr, Kr, Kr),
                        Lr = Kr)
                    },
                    setLocked: function(Kr) {
                        _r = Kr
                    },
                    setClear: function(Kr, An, pn, _o, to) {
                        to === !0 && (Kr *= _o,
                        An *= _o,
                        pn *= _o),
                        Br.set(Kr, An, pn, _o),
                        Xr.equals(Br) === !1 && (Tt.clearColor(Kr, An, pn, _o),
                        Xr.copy(Br))
                    },
                    reset: function() {
                        _r = !1,
                        Lr = null,
                        Xr.set(-1, 0, 0, 0)
                    }
                }
            }
              , xt = new function() {
                let _r = !1
                  , Br = null
                  , Lr = null
                  , Xr = null;
                return {
                    setTest: function(Kr) {
                        Kr ? Zn(Tt.DEPTH_TEST) : jn(Tt.DEPTH_TEST)
                    },
                    setMask: function(Kr) {
                        Br === Kr || _r || (Tt.depthMask(Kr),
                        Br = Kr)
                    },
                    setFunc: function(Kr) {
                        if (Lr !== Kr) {
                            switch (Kr) {
                            case Cr:
                                Tt.depthFunc(Tt.NEVER);
                                break;
                            case tr:
                                Tt.depthFunc(Tt.ALWAYS);
                                break;
                            case fr:
                                Tt.depthFunc(Tt.LESS);
                                break;
                            case vr:
                                Tt.depthFunc(Tt.LEQUAL);
                                break;
                            case Zr:
                                Tt.depthFunc(Tt.EQUAL);
                                break;
                            case rn:
                                Tt.depthFunc(Tt.GEQUAL);
                                break;
                            case hn:
                                Tt.depthFunc(Tt.GREATER);
                                break;
                            case Nn:
                                Tt.depthFunc(Tt.NOTEQUAL);
                                break;
                            default:
                                Tt.depthFunc(Tt.LEQUAL)
                            }
                            Lr = Kr
                        }
                    },
                    setLocked: function(Kr) {
                        _r = Kr
                    },
                    setClear: function(Kr) {
                        Xr !== Kr && (Tt.clearDepth(Kr),
                        Xr = Kr)
                    },
                    reset: function() {
                        _r = !1,
                        Br = null,
                        Lr = null,
                        Xr = null
                    }
                }
            }
              , Ct = new function() {
                let _r = !1
                  , Br = null
                  , Lr = null
                  , Xr = null
                  , Kr = null
                  , An = null
                  , pn = null
                  , _o = null
                  , to = null;
                return {
                    setTest: function(Pn) {
                        _r || (Pn ? Zn(Tt.STENCIL_TEST) : jn(Tt.STENCIL_TEST))
                    },
                    setMask: function(Pn) {
                        Br === Pn || _r || (Tt.stencilMask(Pn),
                        Br = Pn)
                    },
                    setFunc: function(Pn, eo, Kn) {
                        Lr === Pn && Xr === eo && Kr === Kn || (Tt.stencilFunc(Pn, eo, Kn),
                        Lr = Pn,
                        Xr = eo,
                        Kr = Kn)
                    },
                    setOp: function(Pn, eo, Kn) {
                        An === Pn && pn === eo && _o === Kn || (Tt.stencilOp(Pn, eo, Kn),
                        An = Pn,
                        pn = eo,
                        _o = Kn)
                    },
                    setLocked: function(Pn) {
                        _r = Pn
                    },
                    setClear: function(Pn) {
                        to !== Pn && (Tt.clearStencil(Pn),
                        to = Pn)
                    },
                    reset: function() {
                        _r = !1,
                        Br = null,
                        Lr = null,
                        Xr = null,
                        Kr = null,
                        An = null,
                        pn = null,
                        _o = null,
                        to = null
                    }
                }
            }
              , Mt = new WeakMap
              , Lt = new WeakMap;
            let Nt = {}
              , jt = {}
              , Wt = new WeakMap
              , Qt = []
              , qt = null
              , Xt = !1
              , Zt = null
              , Yt = null
              , sr = null
              , er = null
              , rr = null
              , xr = null
              , br = null
              , yr = !1
              , Pr = null
              , zr = null
              , Nr = null
              , Vr = null
              , Gr = null;
            const Hr = Tt.getParameter(Tt.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
            let _n = !1
              , dn = 0;
            const kn = Tt.getParameter(Tt.VERSION);
            kn.indexOf("WebGL") !== -1 ? (dn = parseFloat(/^WebGL (\d)/.exec(kn)[1]),
            _n = dn >= 1) : kn.indexOf("OpenGL ES") !== -1 && (dn = parseFloat(/^OpenGL ES (\d)/.exec(kn)[1]),
            _n = dn >= 2);
            let Bn = null
              , cn = {};
            const Yr = Tt.getParameter(Tt.SCISSOR_BOX)
              , Jr = Tt.getParameter(Tt.VIEWPORT)
              , sn = new Lo().fromArray(Yr)
              , on = new Lo().fromArray(Jr);
            function Un(_r, Br, Lr, Xr) {
                const Kr = new Uint8Array(4)
                  , An = Tt.createTexture();
                Tt.bindTexture(_r, An),
                Tt.texParameteri(_r, Tt.TEXTURE_MIN_FILTER, Tt.NEAREST),
                Tt.texParameteri(_r, Tt.TEXTURE_MAG_FILTER, Tt.NEAREST);
                for (let pn = 0; pn < Lr; pn++)
                    !mt || _r !== Tt.TEXTURE_3D && _r !== Tt.TEXTURE_2D_ARRAY ? Tt.texImage2D(Br + pn, 0, Tt.RGBA, 1, 1, 0, Tt.RGBA, Tt.UNSIGNED_BYTE, Kr) : Tt.texImage3D(Br, 0, Tt.RGBA, 1, 1, Xr, 0, Tt.RGBA, Tt.UNSIGNED_BYTE, Kr);
                return An
            }
            const ro = {};
            function Zn(_r) {
                Nt[_r] !== !0 && (Tt.enable(_r),
                Nt[_r] = !0)
            }
            function jn(_r) {
                Nt[_r] !== !1 && (Tt.disable(_r),
                Nt[_r] = !1)
            }
            ro[Tt.TEXTURE_2D] = Un(Tt.TEXTURE_2D, Tt.TEXTURE_2D, 1),
            ro[Tt.TEXTURE_CUBE_MAP] = Un(Tt.TEXTURE_CUBE_MAP, Tt.TEXTURE_CUBE_MAP_POSITIVE_X, 6),
            mt && (ro[Tt.TEXTURE_2D_ARRAY] = Un(Tt.TEXTURE_2D_ARRAY, Tt.TEXTURE_2D_ARRAY, 1, 1),
            ro[Tt.TEXTURE_3D] = Un(Tt.TEXTURE_3D, Tt.TEXTURE_3D, 1, 1)),
            ft.setClear(0, 0, 0, 1),
            xt.setClear(1),
            Ct.setClear(0),
            Zn(Tt.DEPTH_TEST),
            xt.setFunc(vr),
            Fr(!1),
            Wr(nt),
            Zn(Tt.CULL_FACE),
            Sr(Et);
            const uo = {
                [kt]: Tt.FUNC_ADD,
                [Ut]: Tt.FUNC_SUBTRACT,
                [Ht]: Tt.FUNC_REVERSE_SUBTRACT
            };
            if (mt)
                uo[Kt] = Tt.MIN,
                uo[Jt] = Tt.MAX;
            else {
                const _r = tt.get("EXT_blend_minmax");
                _r !== null && (uo[Kt] = _r.MIN_EXT,
                uo[Jt] = _r.MAX_EXT)
            }
            const Dr = {
                [or]: Tt.ZERO,
                [ir]: Tt.ONE,
                [lr]: Tt.SRC_COLOR,
                [hr]: Tt.SRC_ALPHA,
                [Rr]: Tt.SRC_ALPHA_SATURATE,
                [Ar]: Tt.DST_COLOR,
                [dr]: Tt.DST_ALPHA,
                [ar]: Tt.ONE_MINUS_SRC_COLOR,
                [gr]: Tt.ONE_MINUS_SRC_ALPHA,
                [wr]: Tt.ONE_MINUS_DST_COLOR,
                [cr]: Tt.ONE_MINUS_DST_ALPHA
            };
            function Sr(_r, Br, Lr, Xr, Kr, An, pn, _o) {
                if (_r !== Et) {
                    if (Xt === !1 && (Zn(Tt.BLEND),
                    Xt = !0),
                    _r === Bt)
                        Kr = Kr || Br,
                        An = An || Lr,
                        pn = pn || Xr,
                        Br === Yt && Kr === rr || (Tt.blendEquationSeparate(uo[Br], uo[Kr]),
                        Yt = Br,
                        rr = Kr),
                        Lr === sr && Xr === er && An === xr && pn === br || (Tt.blendFuncSeparate(Dr[Lr], Dr[Xr], Dr[An], Dr[pn]),
                        sr = Lr,
                        er = Xr,
                        xr = An,
                        br = pn),
                        Zt = _r,
                        yr = !1;
                    else if (_r !== Zt || _o !== yr) {
                        if (Yt === kt && rr === kt || (Tt.blendEquation(Tt.FUNC_ADD),
                        Yt = kt,
                        rr = kt),
                        _o)
                            switch (_r) {
                            case Pt:
                                Tt.blendFuncSeparate(Tt.ONE, Tt.ONE_MINUS_SRC_ALPHA, Tt.ONE, Tt.ONE_MINUS_SRC_ALPHA);
                                break;
                            case It:
                                Tt.blendFunc(Tt.ONE, Tt.ONE);
                                break;
                            case Dt:
                                Tt.blendFuncSeparate(Tt.ZERO, Tt.ONE_MINUS_SRC_COLOR, Tt.ZERO, Tt.ONE);
                                break;
                            case Gt:
                                Tt.blendFuncSeparate(Tt.ZERO, Tt.SRC_COLOR, Tt.ZERO, Tt.SRC_ALPHA);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", _r)
                            }
                        else
                            switch (_r) {
                            case Pt:
                                Tt.blendFuncSeparate(Tt.SRC_ALPHA, Tt.ONE_MINUS_SRC_ALPHA, Tt.ONE, Tt.ONE_MINUS_SRC_ALPHA);
                                break;
                            case It:
                                Tt.blendFunc(Tt.SRC_ALPHA, Tt.ONE);
                                break;
                            case Dt:
                                Tt.blendFuncSeparate(Tt.ZERO, Tt.ONE_MINUS_SRC_COLOR, Tt.ZERO, Tt.ONE);
                                break;
                            case Gt:
                                Tt.blendFunc(Tt.ZERO, Tt.SRC_COLOR);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", _r)
                            }
                        sr = null,
                        er = null,
                        xr = null,
                        br = null,
                        Zt = _r,
                        yr = _o
                    }
                } else
                    Xt === !0 && (jn(Tt.BLEND),
                    Xt = !1)
            }
            function Fr(_r) {
                Pr !== _r && (_r ? Tt.frontFace(Tt.CW) : Tt.frontFace(Tt.CCW),
                Pr = _r)
            }
            function Wr(_r) {
                _r !== _e ? (Zn(Tt.CULL_FACE),
                _r !== zr && (_r === nt ? Tt.cullFace(Tt.BACK) : _r === it ? Tt.cullFace(Tt.FRONT) : Tt.cullFace(Tt.FRONT_AND_BACK))) : jn(Tt.CULL_FACE),
                zr = _r
            }
            function kr(_r, Br, Lr) {
                _r ? (Zn(Tt.POLYGON_OFFSET_FILL),
                Vr === Br && Gr === Lr || (Tt.polygonOffset(Br, Lr),
                Vr = Br,
                Gr = Lr)) : jn(Tt.POLYGON_OFFSET_FILL)
            }
            return {
                buffers: {
                    color: ft,
                    depth: xt,
                    stencil: Ct
                },
                enable: Zn,
                disable: jn,
                bindFramebuffer: function(_r, Br) {
                    return jt[_r] !== Br && (Tt.bindFramebuffer(_r, Br),
                    jt[_r] = Br,
                    mt && (_r === Tt.DRAW_FRAMEBUFFER && (jt[Tt.FRAMEBUFFER] = Br),
                    _r === Tt.FRAMEBUFFER && (jt[Tt.DRAW_FRAMEBUFFER] = Br)),
                    !0)
                },
                drawBuffers: function(_r, Br) {
                    let Lr = Qt
                      , Xr = !1;
                    if (_r)
                        if (Lr = Wt.get(Br),
                        Lr === void 0 && (Lr = [],
                        Wt.set(Br, Lr)),
                        _r.isWebGLMultipleRenderTargets) {
                            const Kr = _r.texture;
                            if (Lr.length !== Kr.length || Lr[0] !== Tt.COLOR_ATTACHMENT0) {
                                for (let An = 0, pn = Kr.length; An < pn; An++)
                                    Lr[An] = Tt.COLOR_ATTACHMENT0 + An;
                                Lr.length = Kr.length,
                                Xr = !0
                            }
                        } else
                            Lr[0] !== Tt.COLOR_ATTACHMENT0 && (Lr[0] = Tt.COLOR_ATTACHMENT0,
                            Xr = !0);
                    else
                        Lr[0] !== Tt.BACK && (Lr[0] = Tt.BACK,
                        Xr = !0);
                    Xr && (lt.isWebGL2 ? Tt.drawBuffers(Lr) : tt.get("WEBGL_draw_buffers").drawBuffersWEBGL(Lr))
                },
                useProgram: function(_r) {
                    return qt !== _r && (Tt.useProgram(_r),
                    qt = _r,
                    !0)
                },
                setBlending: Sr,
                setMaterial: function(_r, Br) {
                    _r.side === St ? jn(Tt.CULL_FACE) : Zn(Tt.CULL_FACE);
                    let Lr = _r.side === bt;
                    Br && (Lr = !Lr),
                    Fr(Lr),
                    _r.blending === Pt && _r.transparent === !1 ? Sr(Et) : Sr(_r.blending, _r.blendEquation, _r.blendSrc, _r.blendDst, _r.blendEquationAlpha, _r.blendSrcAlpha, _r.blendDstAlpha, _r.premultipliedAlpha),
                    xt.setFunc(_r.depthFunc),
                    xt.setTest(_r.depthTest),
                    xt.setMask(_r.depthWrite),
                    ft.setMask(_r.colorWrite);
                    const Xr = _r.stencilWrite;
                    Ct.setTest(Xr),
                    Xr && (Ct.setMask(_r.stencilWriteMask),
                    Ct.setFunc(_r.stencilFunc, _r.stencilRef, _r.stencilFuncMask),
                    Ct.setOp(_r.stencilFail, _r.stencilZFail, _r.stencilZPass)),
                    kr(_r.polygonOffset, _r.polygonOffsetFactor, _r.polygonOffsetUnits),
                    _r.alphaToCoverage === !0 ? Zn(Tt.SAMPLE_ALPHA_TO_COVERAGE) : jn(Tt.SAMPLE_ALPHA_TO_COVERAGE)
                },
                setFlipSided: Fr,
                setCullFace: Wr,
                setLineWidth: function(_r) {
                    _r !== Nr && (_n && Tt.lineWidth(_r),
                    Nr = _r)
                },
                setPolygonOffset: kr,
                setScissorTest: function(_r) {
                    _r ? Zn(Tt.SCISSOR_TEST) : jn(Tt.SCISSOR_TEST)
                },
                activeTexture: function(_r) {
                    _r === void 0 && (_r = Tt.TEXTURE0 + Hr - 1),
                    Bn !== _r && (Tt.activeTexture(_r),
                    Bn = _r)
                },
                bindTexture: function(_r, Br, Lr) {
                    Lr === void 0 && (Lr = Bn === null ? Tt.TEXTURE0 + Hr - 1 : Bn);
                    let Xr = cn[Lr];
                    Xr === void 0 && (Xr = {
                        type: void 0,
                        texture: void 0
                    },
                    cn[Lr] = Xr),
                    Xr.type === _r && Xr.texture === Br || (Bn !== Lr && (Tt.activeTexture(Lr),
                    Bn = Lr),
                    Tt.bindTexture(_r, Br || ro[_r]),
                    Xr.type = _r,
                    Xr.texture = Br)
                },
                unbindTexture: function() {
                    const _r = cn[Bn];
                    _r !== void 0 && _r.type !== void 0 && (Tt.bindTexture(_r.type, null),
                    _r.type = void 0,
                    _r.texture = void 0)
                },
                compressedTexImage2D: function() {
                    try {
                        Tt.compressedTexImage2D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                compressedTexImage3D: function() {
                    try {
                        Tt.compressedTexImage3D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                texImage2D: function() {
                    try {
                        Tt.texImage2D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                texImage3D: function() {
                    try {
                        Tt.texImage3D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                updateUBOMapping: function(_r, Br) {
                    let Lr = Lt.get(Br);
                    Lr === void 0 && (Lr = new WeakMap,
                    Lt.set(Br, Lr));
                    let Xr = Lr.get(_r);
                    Xr === void 0 && (Xr = Tt.getUniformBlockIndex(Br, _r.name),
                    Lr.set(_r, Xr))
                },
                uniformBlockBinding: function(_r, Br) {
                    const Lr = Lt.get(Br).get(_r);
                    Mt.get(Br) !== Lr && (Tt.uniformBlockBinding(Br, Lr, _r.__bindingPointIndex),
                    Mt.set(Br, Lr))
                },
                texStorage2D: function() {
                    try {
                        Tt.texStorage2D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                texStorage3D: function() {
                    try {
                        Tt.texStorage3D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                texSubImage2D: function() {
                    try {
                        Tt.texSubImage2D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                texSubImage3D: function() {
                    try {
                        Tt.texSubImage3D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                compressedTexSubImage2D: function() {
                    try {
                        Tt.compressedTexSubImage2D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                compressedTexSubImage3D: function() {
                    try {
                        Tt.compressedTexSubImage3D.apply(Tt, arguments)
                    } catch (_r) {
                        console.error("THREE.WebGLState:", _r)
                    }
                },
                scissor: function(_r) {
                    sn.equals(_r) === !1 && (Tt.scissor(_r.x, _r.y, _r.z, _r.w),
                    sn.copy(_r))
                },
                viewport: function(_r) {
                    on.equals(_r) === !1 && (Tt.viewport(_r.x, _r.y, _r.z, _r.w),
                    on.copy(_r))
                },
                reset: function() {
                    Tt.disable(Tt.BLEND),
                    Tt.disable(Tt.CULL_FACE),
                    Tt.disable(Tt.DEPTH_TEST),
                    Tt.disable(Tt.POLYGON_OFFSET_FILL),
                    Tt.disable(Tt.SCISSOR_TEST),
                    Tt.disable(Tt.STENCIL_TEST),
                    Tt.disable(Tt.SAMPLE_ALPHA_TO_COVERAGE),
                    Tt.blendEquation(Tt.FUNC_ADD),
                    Tt.blendFunc(Tt.ONE, Tt.ZERO),
                    Tt.blendFuncSeparate(Tt.ONE, Tt.ZERO, Tt.ONE, Tt.ZERO),
                    Tt.colorMask(!0, !0, !0, !0),
                    Tt.clearColor(0, 0, 0, 0),
                    Tt.depthMask(!0),
                    Tt.depthFunc(Tt.LESS),
                    Tt.clearDepth(1),
                    Tt.stencilMask(4294967295),
                    Tt.stencilFunc(Tt.ALWAYS, 0, 4294967295),
                    Tt.stencilOp(Tt.KEEP, Tt.KEEP, Tt.KEEP),
                    Tt.clearStencil(0),
                    Tt.cullFace(Tt.BACK),
                    Tt.frontFace(Tt.CCW),
                    Tt.polygonOffset(0, 0),
                    Tt.activeTexture(Tt.TEXTURE0),
                    Tt.bindFramebuffer(Tt.FRAMEBUFFER, null),
                    mt === !0 && (Tt.bindFramebuffer(Tt.DRAW_FRAMEBUFFER, null),
                    Tt.bindFramebuffer(Tt.READ_FRAMEBUFFER, null)),
                    Tt.useProgram(null),
                    Tt.lineWidth(1),
                    Tt.scissor(0, 0, Tt.canvas.width, Tt.canvas.height),
                    Tt.viewport(0, 0, Tt.canvas.width, Tt.canvas.height),
                    Nt = {},
                    Bn = null,
                    cn = {},
                    jt = {},
                    Wt = new WeakMap,
                    Qt = [],
                    qt = null,
                    Xt = !1,
                    Zt = null,
                    Yt = null,
                    sr = null,
                    er = null,
                    rr = null,
                    xr = null,
                    br = null,
                    yr = !1,
                    Pr = null,
                    zr = null,
                    Nr = null,
                    Vr = null,
                    Gr = null,
                    sn.set(0, 0, Tt.canvas.width, Tt.canvas.height),
                    on.set(0, 0, Tt.canvas.width, Tt.canvas.height),
                    ft.reset(),
                    xt.reset(),
                    Ct.reset()
                }
            }
        }
        function Z1(Tt, tt, lt, mt, ft, xt, Ct) {
            const Mt = ft.isWebGL2
              , Lt = ft.maxTextures
              , Nt = ft.maxCubemapSize
              , jt = ft.maxTextureSize
              , Wt = ft.maxSamples
              , Qt = tt.has("WEBGL_multisampled_render_to_texture") ? tt.get("WEBGL_multisampled_render_to_texture") : null
              , qt = typeof navigator < "u" && /OculusBrowser/g.test(navigator.userAgent)
              , Xt = new WeakMap;
            let Zt;
            const Yt = new WeakMap;
            let sr = !1;
            try {
                sr = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1,1).getContext("2d") !== null
            } catch {}
            function er(Dr, Sr) {
                return sr ? new OffscreenCanvas(Dr,Sr) : yu("canvas")
            }
            function rr(Dr, Sr, Fr, Wr) {
                let kr = 1;
                if ((Dr.width > Wr || Dr.height > Wr) && (kr = Wr / Math.max(Dr.width, Dr.height)),
                kr < 1 || Sr === !0) {
                    if (typeof HTMLImageElement < "u" && Dr instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && Dr instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && Dr instanceof ImageBitmap) {
                        const _r = Sr ? gp : Math.floor
                          , Br = _r(kr * Dr.width)
                          , Lr = _r(kr * Dr.height);
                        Zt === void 0 && (Zt = er(Br, Lr));
                        const Xr = Fr ? er(Br, Lr) : Zt;
                        return Xr.width = Br,
                        Xr.height = Lr,
                        Xr.getContext("2d").drawImage(Dr, 0, 0, Br, Lr),
                        console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Dr.width + "x" + Dr.height + ") to (" + Br + "x" + Lr + ")."),
                        Xr
                    }
                    return "data"in Dr && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Dr.width + "x" + Dr.height + ")."),
                    Dr
                }
                return Dr
            }
            function xr(Dr) {
                return tm(Dr.width) && tm(Dr.height)
            }
            function br(Dr, Sr) {
                return Dr.generateMipmaps && Sr && Dr.minFilter !== fn && Dr.minFilter !== Rn
            }
            function yr(Dr) {
                Tt.generateMipmap(Dr)
            }
            function Pr(Dr, Sr, Fr, Wr, kr=!1) {
                if (Mt === !1)
                    return Sr;
                if (Dr !== null) {
                    if (Tt[Dr] !== void 0)
                        return Tt[Dr];
                    console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + Dr + "'")
                }
                let _r = Sr;
                if (Sr === Tt.RED && (Fr === Tt.FLOAT && (_r = Tt.R32F),
                Fr === Tt.HALF_FLOAT && (_r = Tt.R16F),
                Fr === Tt.UNSIGNED_BYTE && (_r = Tt.R8)),
                Sr === Tt.RED_INTEGER && (Fr === Tt.UNSIGNED_BYTE && (_r = Tt.R8UI),
                Fr === Tt.UNSIGNED_SHORT && (_r = Tt.R16UI),
                Fr === Tt.UNSIGNED_INT && (_r = Tt.R32UI),
                Fr === Tt.BYTE && (_r = Tt.R8I),
                Fr === Tt.SHORT && (_r = Tt.R16I),
                Fr === Tt.INT && (_r = Tt.R32I)),
                Sr === Tt.RG && (Fr === Tt.FLOAT && (_r = Tt.RG32F),
                Fr === Tt.HALF_FLOAT && (_r = Tt.RG16F),
                Fr === Tt.UNSIGNED_BYTE && (_r = Tt.RG8)),
                Sr === Tt.RGBA) {
                    const Br = kr ? No : Do.getTransfer(Wr);
                    Fr === Tt.FLOAT && (_r = Tt.RGBA32F),
                    Fr === Tt.HALF_FLOAT && (_r = Tt.RGBA16F),
                    Fr === Tt.UNSIGNED_BYTE && (_r = Br === Vo ? Tt.SRGB8_ALPHA8 : Tt.RGBA8),
                    Fr === Tt.UNSIGNED_SHORT_4_4_4_4 && (_r = Tt.RGBA4),
                    Fr === Tt.UNSIGNED_SHORT_5_5_5_1 && (_r = Tt.RGB5_A1)
                }
                return _r !== Tt.R16F && _r !== Tt.R32F && _r !== Tt.RG16F && _r !== Tt.RG32F && _r !== Tt.RGBA16F && _r !== Tt.RGBA32F || tt.get("EXT_color_buffer_float"),
                _r
            }
            function zr(Dr, Sr, Fr) {
                return br(Dr, Fr) === !0 || Dr.isFramebufferTexture && Dr.minFilter !== fn && Dr.minFilter !== Rn ? Math.log2(Math.max(Sr.width, Sr.height)) + 1 : Dr.mipmaps !== void 0 && Dr.mipmaps.length > 0 ? Dr.mipmaps.length : Dr.isCompressedTexture && Array.isArray(Dr.image) ? Sr.mipmaps.length : 1
            }
            function Nr(Dr) {
                return Dr === fn || Dr === bn || Dr === En ? Tt.NEAREST : Tt.LINEAR
            }
            function Vr(Dr) {
                const Sr = Dr.target;
                Sr.removeEventListener("dispose", Vr),
                function(Fr) {
                    const Wr = mt.get(Fr);
                    if (Wr.__webglInit === void 0)
                        return;
                    const kr = Fr.source
                      , _r = Yt.get(kr);
                    if (_r) {
                        const Br = _r[Wr.__cacheKey];
                        Br.usedTimes--,
                        Br.usedTimes === 0 && Hr(Fr),
                        Object.keys(_r).length === 0 && Yt.delete(kr)
                    }
                    mt.remove(Fr)
                }(Sr),
                Sr.isVideoTexture && Xt.delete(Sr)
            }
            function Gr(Dr) {
                const Sr = Dr.target;
                Sr.removeEventListener("dispose", Gr),
                function(Fr) {
                    const Wr = Fr.texture
                      , kr = mt.get(Fr)
                      , _r = mt.get(Wr);
                    if (_r.__webglTexture !== void 0 && (Tt.deleteTexture(_r.__webglTexture),
                    Ct.memory.textures--),
                    Fr.depthTexture && Fr.depthTexture.dispose(),
                    Fr.isWebGLCubeRenderTarget)
                        for (let Br = 0; Br < 6; Br++) {
                            if (Array.isArray(kr.__webglFramebuffer[Br]))
                                for (let Lr = 0; Lr < kr.__webglFramebuffer[Br].length; Lr++)
                                    Tt.deleteFramebuffer(kr.__webglFramebuffer[Br][Lr]);
                            else
                                Tt.deleteFramebuffer(kr.__webglFramebuffer[Br]);
                            kr.__webglDepthbuffer && Tt.deleteRenderbuffer(kr.__webglDepthbuffer[Br])
                        }
                    else {
                        if (Array.isArray(kr.__webglFramebuffer))
                            for (let Br = 0; Br < kr.__webglFramebuffer.length; Br++)
                                Tt.deleteFramebuffer(kr.__webglFramebuffer[Br]);
                        else
                            Tt.deleteFramebuffer(kr.__webglFramebuffer);
                        if (kr.__webglDepthbuffer && Tt.deleteRenderbuffer(kr.__webglDepthbuffer),
                        kr.__webglMultisampledFramebuffer && Tt.deleteFramebuffer(kr.__webglMultisampledFramebuffer),
                        kr.__webglColorRenderbuffer)
                            for (let Br = 0; Br < kr.__webglColorRenderbuffer.length; Br++)
                                kr.__webglColorRenderbuffer[Br] && Tt.deleteRenderbuffer(kr.__webglColorRenderbuffer[Br]);
                        kr.__webglDepthRenderbuffer && Tt.deleteRenderbuffer(kr.__webglDepthRenderbuffer)
                    }
                    if (Fr.isWebGLMultipleRenderTargets)
                        for (let Br = 0, Lr = Wr.length; Br < Lr; Br++) {
                            const Xr = mt.get(Wr[Br]);
                            Xr.__webglTexture && (Tt.deleteTexture(Xr.__webglTexture),
                            Ct.memory.textures--),
                            mt.remove(Wr[Br])
                        }
                    mt.remove(Wr),
                    mt.remove(Fr)
                }(Sr)
            }
            function Hr(Dr) {
                const Sr = mt.get(Dr);
                Tt.deleteTexture(Sr.__webglTexture);
                const Fr = Dr.source;
                delete Yt.get(Fr)[Sr.__cacheKey],
                Ct.memory.textures--
            }
            let _n = 0;
            function dn(Dr, Sr) {
                const Fr = mt.get(Dr);
                if (Dr.isVideoTexture && function(Wr) {
                    const kr = Ct.render.frame;
                    Xt.get(Wr) !== kr && (Xt.set(Wr, kr),
                    Wr.update())
                }(Dr),
                Dr.isRenderTargetTexture === !1 && Dr.version > 0 && Fr.__version !== Dr.version) {
                    const Wr = Dr.image;
                    if (Wr === null)
                        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
                    else {
                        if (Wr.complete !== !1)
                            return void sn(Fr, Dr, Sr);
                        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
                    }
                }
                lt.bindTexture(Tt.TEXTURE_2D, Fr.__webglTexture, Tt.TEXTURE0 + Sr)
            }
            const kn = {
                [Tn]: Tt.REPEAT,
                [wn]: Tt.CLAMP_TO_EDGE,
                [Cn]: Tt.MIRRORED_REPEAT
            }
              , Bn = {
                [fn]: Tt.NEAREST,
                [bn]: Tt.NEAREST_MIPMAP_NEAREST,
                [En]: Tt.NEAREST_MIPMAP_LINEAR,
                [Rn]: Tt.LINEAR,
                [Yn]: Tt.LINEAR_MIPMAP_NEAREST,
                [vo]: Tt.LINEAR_MIPMAP_LINEAR
            }
              , cn = {
                [mu]: Tt.NEVER,
                [Y_]: Tt.ALWAYS,
                [fu]: Tt.LESS,
                [q_]: Tt.LEQUAL,
                [fp]: Tt.EQUAL,
                [Kl]: Tt.GEQUAL,
                [$_]: Tt.GREATER,
                [X_]: Tt.NOTEQUAL
            };
            function Yr(Dr, Sr, Fr) {
                if (Fr ? (Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_S, kn[Sr.wrapS]),
                Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_T, kn[Sr.wrapT]),
                Dr !== Tt.TEXTURE_3D && Dr !== Tt.TEXTURE_2D_ARRAY || Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_R, kn[Sr.wrapR]),
                Tt.texParameteri(Dr, Tt.TEXTURE_MAG_FILTER, Bn[Sr.magFilter]),
                Tt.texParameteri(Dr, Tt.TEXTURE_MIN_FILTER, Bn[Sr.minFilter])) : (Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_S, Tt.CLAMP_TO_EDGE),
                Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_T, Tt.CLAMP_TO_EDGE),
                Dr !== Tt.TEXTURE_3D && Dr !== Tt.TEXTURE_2D_ARRAY || Tt.texParameteri(Dr, Tt.TEXTURE_WRAP_R, Tt.CLAMP_TO_EDGE),
                Sr.wrapS === wn && Sr.wrapT === wn || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),
                Tt.texParameteri(Dr, Tt.TEXTURE_MAG_FILTER, Nr(Sr.magFilter)),
                Tt.texParameteri(Dr, Tt.TEXTURE_MIN_FILTER, Nr(Sr.minFilter)),
                Sr.minFilter !== fn && Sr.minFilter !== Rn && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),
                Sr.compareFunction && (Tt.texParameteri(Dr, Tt.TEXTURE_COMPARE_MODE, Tt.COMPARE_REF_TO_TEXTURE),
                Tt.texParameteri(Dr, Tt.TEXTURE_COMPARE_FUNC, cn[Sr.compareFunction])),
                tt.has("EXT_texture_filter_anisotropic") === !0) {
                    const Wr = tt.get("EXT_texture_filter_anisotropic");
                    if (Sr.magFilter === fn || Sr.minFilter !== En && Sr.minFilter !== vo || Sr.type === ss && tt.has("OES_texture_float_linear") === !1 || Mt === !1 && Sr.type === Os && tt.has("OES_texture_half_float_linear") === !1)
                        return;
                    (Sr.anisotropy > 1 || mt.get(Sr).__currentAnisotropy) && (Tt.texParameterf(Dr, Wr.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(Sr.anisotropy, ft.getMaxAnisotropy())),
                    mt.get(Sr).__currentAnisotropy = Sr.anisotropy)
                }
            }
            function Jr(Dr, Sr) {
                let Fr = !1;
                Dr.__webglInit === void 0 && (Dr.__webglInit = !0,
                Sr.addEventListener("dispose", Vr));
                const Wr = Sr.source;
                let kr = Yt.get(Wr);
                kr === void 0 && (kr = {},
                Yt.set(Wr, kr));
                const _r = function(Br) {
                    const Lr = [];
                    return Lr.push(Br.wrapS),
                    Lr.push(Br.wrapT),
                    Lr.push(Br.wrapR || 0),
                    Lr.push(Br.magFilter),
                    Lr.push(Br.minFilter),
                    Lr.push(Br.anisotropy),
                    Lr.push(Br.internalFormat),
                    Lr.push(Br.format),
                    Lr.push(Br.type),
                    Lr.push(Br.generateMipmaps),
                    Lr.push(Br.premultiplyAlpha),
                    Lr.push(Br.flipY),
                    Lr.push(Br.unpackAlignment),
                    Lr.push(Br.colorSpace),
                    Lr.join()
                }(Sr);
                if (_r !== Dr.__cacheKey) {
                    kr[_r] === void 0 && (kr[_r] = {
                        texture: Tt.createTexture(),
                        usedTimes: 0
                    },
                    Ct.memory.textures++,
                    Fr = !0),
                    kr[_r].usedTimes++;
                    const Br = kr[Dr.__cacheKey];
                    Br !== void 0 && (kr[Dr.__cacheKey].usedTimes--,
                    Br.usedTimes === 0 && Hr(Sr)),
                    Dr.__cacheKey = _r,
                    Dr.__webglTexture = kr[_r].texture
                }
                return Fr
            }
            function sn(Dr, Sr, Fr) {
                let Wr = Tt.TEXTURE_2D;
                (Sr.isDataArrayTexture || Sr.isCompressedArrayTexture) && (Wr = Tt.TEXTURE_2D_ARRAY),
                Sr.isData3DTexture && (Wr = Tt.TEXTURE_3D);
                const kr = Jr(Dr, Sr)
                  , _r = Sr.source;
                lt.bindTexture(Wr, Dr.__webglTexture, Tt.TEXTURE0 + Fr);
                const Br = mt.get(_r);
                if (_r.version !== Br.__version || kr === !0) {
                    lt.activeTexture(Tt.TEXTURE0 + Fr);
                    const Lr = Do.getPrimaries(Do.workingColorSpace)
                      , Xr = Sr.colorSpace === Oo || Sr.colorSpace === ps ? null : Do.getPrimaries(Sr.colorSpace)
                      , Kr = Sr.colorSpace === Oo || Sr.colorSpace === ps || Lr === Xr ? Tt.NONE : Tt.BROWSER_DEFAULT_WEBGL;
                    Tt.pixelStorei(Tt.UNPACK_FLIP_Y_WEBGL, Sr.flipY),
                    Tt.pixelStorei(Tt.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Sr.premultiplyAlpha),
                    Tt.pixelStorei(Tt.UNPACK_ALIGNMENT, Sr.unpackAlignment),
                    Tt.pixelStorei(Tt.UNPACK_COLORSPACE_CONVERSION_WEBGL, Kr);
                    const An = function(Jn) {
                        return !Mt && (Jn.wrapS !== wn || Jn.wrapT !== wn || Jn.minFilter !== fn && Jn.minFilter !== Rn)
                    }(Sr) && xr(Sr.image) === !1;
                    let pn = rr(Sr.image, An, !1, jt);
                    pn = uo(Sr, pn);
                    const _o = xr(pn) || Mt
                      , to = xt.convert(Sr.format, Sr.colorSpace);
                    let Pn, eo = xt.convert(Sr.type), Kn = Pr(Sr.internalFormat, to, eo, Sr.colorSpace, Sr.isVideoTexture);
                    Yr(Wr, Sr, _o);
                    const po = Sr.mipmaps
                      , Ao = Mt && Sr.isVideoTexture !== !0
                      , Fo = Br.__version === void 0 || kr === !0
                      , Io = zr(Sr, pn, _o);
                    if (Sr.isDepthTexture)
                        Kn = Tt.DEPTH_COMPONENT,
                        Mt ? Kn = Sr.type === ss ? Tt.DEPTH_COMPONENT32F : Sr.type === Yo ? Tt.DEPTH_COMPONENT24 : Sr.type === Ps ? Tt.DEPTH24_STENCIL8 : Tt.DEPTH_COMPONENT16 : Sr.type === ss && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
                        Sr.format === Ys && Kn === Tt.DEPTH_COMPONENT && Sr.type !== Zo && Sr.type !== Yo && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
                        Sr.type = Yo,
                        eo = xt.convert(Sr.type)),
                        Sr.format === Eo && Kn === Tt.DEPTH_COMPONENT && (Kn = Tt.DEPTH_STENCIL,
                        Sr.type !== Ps && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),
                        Sr.type = Ps,
                        eo = xt.convert(Sr.type))),
                        Fo && (Ao ? lt.texStorage2D(Tt.TEXTURE_2D, 1, Kn, pn.width, pn.height) : lt.texImage2D(Tt.TEXTURE_2D, 0, Kn, pn.width, pn.height, 0, to, eo, null));
                    else if (Sr.isDataTexture)
                        if (po.length > 0 && _o) {
                            Ao && Fo && lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, po[0].width, po[0].height);
                            for (let Jn = 0, Co = po.length; Jn < Co; Jn++)
                                Pn = po[Jn],
                                Ao ? lt.texSubImage2D(Tt.TEXTURE_2D, Jn, 0, 0, Pn.width, Pn.height, to, eo, Pn.data) : lt.texImage2D(Tt.TEXTURE_2D, Jn, Kn, Pn.width, Pn.height, 0, to, eo, Pn.data);
                            Sr.generateMipmaps = !1
                        } else
                            Ao ? (Fo && lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, pn.width, pn.height),
                            lt.texSubImage2D(Tt.TEXTURE_2D, 0, 0, 0, pn.width, pn.height, to, eo, pn.data)) : lt.texImage2D(Tt.TEXTURE_2D, 0, Kn, pn.width, pn.height, 0, to, eo, pn.data);
                    else if (Sr.isCompressedTexture)
                        if (Sr.isCompressedArrayTexture) {
                            Ao && Fo && lt.texStorage3D(Tt.TEXTURE_2D_ARRAY, Io, Kn, po[0].width, po[0].height, pn.depth);
                            for (let Jn = 0, Co = po.length; Jn < Co; Jn++)
                                Pn = po[Jn],
                                Sr.format !== as ? to !== null ? Ao ? lt.compressedTexSubImage3D(Tt.TEXTURE_2D_ARRAY, Jn, 0, 0, 0, Pn.width, Pn.height, pn.depth, to, Pn.data, 0, 0) : lt.compressedTexImage3D(Tt.TEXTURE_2D_ARRAY, Jn, Kn, Pn.width, Pn.height, pn.depth, 0, Pn.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ao ? lt.texSubImage3D(Tt.TEXTURE_2D_ARRAY, Jn, 0, 0, 0, Pn.width, Pn.height, pn.depth, to, eo, Pn.data) : lt.texImage3D(Tt.TEXTURE_2D_ARRAY, Jn, Kn, Pn.width, Pn.height, pn.depth, 0, to, eo, Pn.data)
                        } else {
                            Ao && Fo && lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, po[0].width, po[0].height);
                            for (let Jn = 0, Co = po.length; Jn < Co; Jn++)
                                Pn = po[Jn],
                                Sr.format !== as ? to !== null ? Ao ? lt.compressedTexSubImage2D(Tt.TEXTURE_2D, Jn, 0, 0, Pn.width, Pn.height, to, Pn.data) : lt.compressedTexImage2D(Tt.TEXTURE_2D, Jn, Kn, Pn.width, Pn.height, 0, Pn.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ao ? lt.texSubImage2D(Tt.TEXTURE_2D, Jn, 0, 0, Pn.width, Pn.height, to, eo, Pn.data) : lt.texImage2D(Tt.TEXTURE_2D, Jn, Kn, Pn.width, Pn.height, 0, to, eo, Pn.data)
                        }
                    else if (Sr.isDataArrayTexture)
                        Ao ? (Fo && lt.texStorage3D(Tt.TEXTURE_2D_ARRAY, Io, Kn, pn.width, pn.height, pn.depth),
                        lt.texSubImage3D(Tt.TEXTURE_2D_ARRAY, 0, 0, 0, 0, pn.width, pn.height, pn.depth, to, eo, pn.data)) : lt.texImage3D(Tt.TEXTURE_2D_ARRAY, 0, Kn, pn.width, pn.height, pn.depth, 0, to, eo, pn.data);
                    else if (Sr.isData3DTexture)
                        Ao ? (Fo && lt.texStorage3D(Tt.TEXTURE_3D, Io, Kn, pn.width, pn.height, pn.depth),
                        lt.texSubImage3D(Tt.TEXTURE_3D, 0, 0, 0, 0, pn.width, pn.height, pn.depth, to, eo, pn.data)) : lt.texImage3D(Tt.TEXTURE_3D, 0, Kn, pn.width, pn.height, pn.depth, 0, to, eo, pn.data);
                    else if (Sr.isFramebufferTexture) {
                        if (Fo)
                            if (Ao)
                                lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, pn.width, pn.height);
                            else {
                                let Jn = pn.width
                                  , Co = pn.height;
                                for (let yl = 0; yl < Io; yl++)
                                    lt.texImage2D(Tt.TEXTURE_2D, yl, Kn, Jn, Co, 0, to, eo, null),
                                    Jn >>= 1,
                                    Co >>= 1
                            }
                    } else if (po.length > 0 && _o) {
                        Ao && Fo && lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, po[0].width, po[0].height);
                        for (let Jn = 0, Co = po.length; Jn < Co; Jn++)
                            Pn = po[Jn],
                            Ao ? lt.texSubImage2D(Tt.TEXTURE_2D, Jn, 0, 0, to, eo, Pn) : lt.texImage2D(Tt.TEXTURE_2D, Jn, Kn, to, eo, Pn);
                        Sr.generateMipmaps = !1
                    } else
                        Ao ? (Fo && lt.texStorage2D(Tt.TEXTURE_2D, Io, Kn, pn.width, pn.height),
                        lt.texSubImage2D(Tt.TEXTURE_2D, 0, 0, 0, to, eo, pn)) : lt.texImage2D(Tt.TEXTURE_2D, 0, Kn, to, eo, pn);
                    br(Sr, _o) && yr(Wr),
                    Br.__version = _r.version,
                    Sr.onUpdate && Sr.onUpdate(Sr)
                }
                Dr.__version = Sr.version
            }
            function on(Dr, Sr, Fr, Wr, kr, _r) {
                const Br = xt.convert(Fr.format, Fr.colorSpace)
                  , Lr = xt.convert(Fr.type)
                  , Xr = Pr(Fr.internalFormat, Br, Lr, Fr.colorSpace);
                if (!mt.get(Sr).__hasExternalTextures) {
                    const Kr = Math.max(1, Sr.width >> _r)
                      , An = Math.max(1, Sr.height >> _r);
                    kr === Tt.TEXTURE_3D || kr === Tt.TEXTURE_2D_ARRAY ? lt.texImage3D(kr, _r, Xr, Kr, An, Sr.depth, 0, Br, Lr, null) : lt.texImage2D(kr, _r, Xr, Kr, An, 0, Br, Lr, null)
                }
                lt.bindFramebuffer(Tt.FRAMEBUFFER, Dr),
                jn(Sr) ? Qt.framebufferTexture2DMultisampleEXT(Tt.FRAMEBUFFER, Wr, kr, mt.get(Fr).__webglTexture, 0, Zn(Sr)) : (kr === Tt.TEXTURE_2D || kr >= Tt.TEXTURE_CUBE_MAP_POSITIVE_X && kr <= Tt.TEXTURE_CUBE_MAP_NEGATIVE_Z) && Tt.framebufferTexture2D(Tt.FRAMEBUFFER, Wr, kr, mt.get(Fr).__webglTexture, _r),
                lt.bindFramebuffer(Tt.FRAMEBUFFER, null)
            }
            function Un(Dr, Sr, Fr) {
                if (Tt.bindRenderbuffer(Tt.RENDERBUFFER, Dr),
                Sr.depthBuffer && !Sr.stencilBuffer) {
                    let Wr = Mt === !0 ? Tt.DEPTH_COMPONENT24 : Tt.DEPTH_COMPONENT16;
                    if (Fr || jn(Sr)) {
                        const kr = Sr.depthTexture;
                        kr && kr.isDepthTexture && (kr.type === ss ? Wr = Tt.DEPTH_COMPONENT32F : kr.type === Yo && (Wr = Tt.DEPTH_COMPONENT24));
                        const _r = Zn(Sr);
                        jn(Sr) ? Qt.renderbufferStorageMultisampleEXT(Tt.RENDERBUFFER, _r, Wr, Sr.width, Sr.height) : Tt.renderbufferStorageMultisample(Tt.RENDERBUFFER, _r, Wr, Sr.width, Sr.height)
                    } else
                        Tt.renderbufferStorage(Tt.RENDERBUFFER, Wr, Sr.width, Sr.height);
                    Tt.framebufferRenderbuffer(Tt.FRAMEBUFFER, Tt.DEPTH_ATTACHMENT, Tt.RENDERBUFFER, Dr)
                } else if (Sr.depthBuffer && Sr.stencilBuffer) {
                    const Wr = Zn(Sr);
                    Fr && jn(Sr) === !1 ? Tt.renderbufferStorageMultisample(Tt.RENDERBUFFER, Wr, Tt.DEPTH24_STENCIL8, Sr.width, Sr.height) : jn(Sr) ? Qt.renderbufferStorageMultisampleEXT(Tt.RENDERBUFFER, Wr, Tt.DEPTH24_STENCIL8, Sr.width, Sr.height) : Tt.renderbufferStorage(Tt.RENDERBUFFER, Tt.DEPTH_STENCIL, Sr.width, Sr.height),
                    Tt.framebufferRenderbuffer(Tt.FRAMEBUFFER, Tt.DEPTH_STENCIL_ATTACHMENT, Tt.RENDERBUFFER, Dr)
                } else {
                    const Wr = Sr.isWebGLMultipleRenderTargets === !0 ? Sr.texture : [Sr.texture];
                    for (let kr = 0; kr < Wr.length; kr++) {
                        const _r = Wr[kr]
                          , Br = xt.convert(_r.format, _r.colorSpace)
                          , Lr = xt.convert(_r.type)
                          , Xr = Pr(_r.internalFormat, Br, Lr, _r.colorSpace)
                          , Kr = Zn(Sr);
                        Fr && jn(Sr) === !1 ? Tt.renderbufferStorageMultisample(Tt.RENDERBUFFER, Kr, Xr, Sr.width, Sr.height) : jn(Sr) ? Qt.renderbufferStorageMultisampleEXT(Tt.RENDERBUFFER, Kr, Xr, Sr.width, Sr.height) : Tt.renderbufferStorage(Tt.RENDERBUFFER, Xr, Sr.width, Sr.height)
                    }
                }
                Tt.bindRenderbuffer(Tt.RENDERBUFFER, null)
            }
            function ro(Dr) {
                const Sr = mt.get(Dr)
                  , Fr = Dr.isWebGLCubeRenderTarget === !0;
                if (Dr.depthTexture && !Sr.__autoAllocateDepthBuffer) {
                    if (Fr)
                        throw new Error("target.depthTexture not supported in Cube render targets");
                    (function(Wr, kr) {
                        if (kr && kr.isWebGLCubeRenderTarget)
                            throw new Error("Depth Texture with cube render targets is not supported");
                        if (lt.bindFramebuffer(Tt.FRAMEBUFFER, Wr),
                        !kr.depthTexture || !kr.depthTexture.isDepthTexture)
                            throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                        mt.get(kr.depthTexture).__webglTexture && kr.depthTexture.image.width === kr.width && kr.depthTexture.image.height === kr.height || (kr.depthTexture.image.width = kr.width,
                        kr.depthTexture.image.height = kr.height,
                        kr.depthTexture.needsUpdate = !0),
                        dn(kr.depthTexture, 0);
                        const _r = mt.get(kr.depthTexture).__webglTexture
                          , Br = Zn(kr);
                        if (kr.depthTexture.format === Ys)
                            jn(kr) ? Qt.framebufferTexture2DMultisampleEXT(Tt.FRAMEBUFFER, Tt.DEPTH_ATTACHMENT, Tt.TEXTURE_2D, _r, 0, Br) : Tt.framebufferTexture2D(Tt.FRAMEBUFFER, Tt.DEPTH_ATTACHMENT, Tt.TEXTURE_2D, _r, 0);
                        else {
                            if (kr.depthTexture.format !== Eo)
                                throw new Error("Unknown depthTexture format");
                            jn(kr) ? Qt.framebufferTexture2DMultisampleEXT(Tt.FRAMEBUFFER, Tt.DEPTH_STENCIL_ATTACHMENT, Tt.TEXTURE_2D, _r, 0, Br) : Tt.framebufferTexture2D(Tt.FRAMEBUFFER, Tt.DEPTH_STENCIL_ATTACHMENT, Tt.TEXTURE_2D, _r, 0)
                        }
                    }
                    )(Sr.__webglFramebuffer, Dr)
                } else if (Fr) {
                    Sr.__webglDepthbuffer = [];
                    for (let Wr = 0; Wr < 6; Wr++)
                        lt.bindFramebuffer(Tt.FRAMEBUFFER, Sr.__webglFramebuffer[Wr]),
                        Sr.__webglDepthbuffer[Wr] = Tt.createRenderbuffer(),
                        Un(Sr.__webglDepthbuffer[Wr], Dr, !1)
                } else
                    lt.bindFramebuffer(Tt.FRAMEBUFFER, Sr.__webglFramebuffer),
                    Sr.__webglDepthbuffer = Tt.createRenderbuffer(),
                    Un(Sr.__webglDepthbuffer, Dr, !1);
                lt.bindFramebuffer(Tt.FRAMEBUFFER, null)
            }
            function Zn(Dr) {
                return Math.min(Wt, Dr.samples)
            }
            function jn(Dr) {
                const Sr = mt.get(Dr);
                return Mt && Dr.samples > 0 && tt.has("WEBGL_multisampled_render_to_texture") === !0 && Sr.__useRenderToTexture !== !1
            }
            function uo(Dr, Sr) {
                const Fr = Dr.colorSpace
                  , Wr = Dr.format
                  , kr = Dr.type;
                return Dr.isCompressedTexture === !0 || Dr.isVideoTexture === !0 || Dr.format === _h || Fr !== Xo && Fr !== Oo && (Do.getTransfer(Fr) === Vo ? Mt === !1 ? tt.has("EXT_sRGB") === !0 && Wr === as ? (Dr.format = _h,
                Dr.minFilter = Rn,
                Dr.generateMipmaps = !1) : Sr = e_.sRGBToLinear(Sr) : Wr === as && kr === $n || console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Fr === ps || console.error("THREE.WebGLTextures: Unsupported texture color space:", Fr)),
                Sr
            }
            this.allocateTextureUnit = function() {
                const Dr = _n;
                return Dr >= Lt && console.warn("THREE.WebGLTextures: Trying to use " + Dr + " texture units while this GPU supports only " + Lt),
                _n += 1,
                Dr
            }
            ,
            this.resetTextureUnits = function() {
                _n = 0
            }
            ,
            this.setTexture2D = dn,
            this.setTexture2DArray = function(Dr, Sr) {
                const Fr = mt.get(Dr);
                Dr.version > 0 && Fr.__version !== Dr.version ? sn(Fr, Dr, Sr) : lt.bindTexture(Tt.TEXTURE_2D_ARRAY, Fr.__webglTexture, Tt.TEXTURE0 + Sr)
            }
            ,
            this.setTexture3D = function(Dr, Sr) {
                const Fr = mt.get(Dr);
                Dr.version > 0 && Fr.__version !== Dr.version ? sn(Fr, Dr, Sr) : lt.bindTexture(Tt.TEXTURE_3D, Fr.__webglTexture, Tt.TEXTURE0 + Sr)
            }
            ,
            this.setTextureCube = function(Dr, Sr) {
                const Fr = mt.get(Dr);
                Dr.version > 0 && Fr.__version !== Dr.version ? function(Wr, kr, _r) {
                    if (kr.image.length !== 6)
                        return;
                    const Br = Jr(Wr, kr)
                      , Lr = kr.source;
                    lt.bindTexture(Tt.TEXTURE_CUBE_MAP, Wr.__webglTexture, Tt.TEXTURE0 + _r);
                    const Xr = mt.get(Lr);
                    if (Lr.version !== Xr.__version || Br === !0) {
                        lt.activeTexture(Tt.TEXTURE0 + _r);
                        const Kr = Do.getPrimaries(Do.workingColorSpace)
                          , An = kr.colorSpace === Oo || kr.colorSpace === ps ? null : Do.getPrimaries(kr.colorSpace)
                          , pn = kr.colorSpace === Oo || kr.colorSpace === ps || Kr === An ? Tt.NONE : Tt.BROWSER_DEFAULT_WEBGL;
                        Tt.pixelStorei(Tt.UNPACK_FLIP_Y_WEBGL, kr.flipY),
                        Tt.pixelStorei(Tt.UNPACK_PREMULTIPLY_ALPHA_WEBGL, kr.premultiplyAlpha),
                        Tt.pixelStorei(Tt.UNPACK_ALIGNMENT, kr.unpackAlignment),
                        Tt.pixelStorei(Tt.UNPACK_COLORSPACE_CONVERSION_WEBGL, pn);
                        const _o = kr.isCompressedTexture || kr.image[0].isCompressedTexture
                          , to = kr.image[0] && kr.image[0].isDataTexture
                          , Pn = [];
                        for (let ho = 0; ho < 6; ho++)
                            Pn[ho] = _o || to ? to ? kr.image[ho].image : kr.image[ho] : rr(kr.image[ho], !1, !0, Nt),
                            Pn[ho] = uo(kr, Pn[ho]);
                        const eo = Pn[0]
                          , Kn = xr(eo) || Mt
                          , po = xt.convert(kr.format, kr.colorSpace)
                          , Ao = xt.convert(kr.type)
                          , Fo = Pr(kr.internalFormat, po, Ao, kr.colorSpace)
                          , Io = Mt && kr.isVideoTexture !== !0
                          , Jn = Xr.__version === void 0 || Br === !0;
                        let Co, yl = zr(kr, eo, Kn);
                        if (Yr(Tt.TEXTURE_CUBE_MAP, kr, Kn),
                        _o) {
                            Io && Jn && lt.texStorage2D(Tt.TEXTURE_CUBE_MAP, yl, Fo, eo.width, eo.height);
                            for (let ho = 0; ho < 6; ho++) {
                                Co = Pn[ho].mipmaps;
                                for (let Qo = 0; Qo < Co.length; Qo++) {
                                    const Po = Co[Qo];
                                    kr.format !== as ? po !== null ? Io ? lt.compressedTexSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo, 0, 0, Po.width, Po.height, po, Po.data) : lt.compressedTexImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo, Fo, Po.width, Po.height, 0, Po.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Io ? lt.texSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo, 0, 0, Po.width, Po.height, po, Ao, Po.data) : lt.texImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo, Fo, Po.width, Po.height, 0, po, Ao, Po.data)
                                }
                            }
                        } else {
                            Co = kr.mipmaps,
                            Io && Jn && (Co.length > 0 && yl++,
                            lt.texStorage2D(Tt.TEXTURE_CUBE_MAP, yl, Fo, Pn[0].width, Pn[0].height));
                            for (let ho = 0; ho < 6; ho++)
                                if (to) {
                                    Io ? lt.texSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, 0, 0, 0, Pn[ho].width, Pn[ho].height, po, Ao, Pn[ho].data) : lt.texImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, 0, Fo, Pn[ho].width, Pn[ho].height, 0, po, Ao, Pn[ho].data);
                                    for (let Qo = 0; Qo < Co.length; Qo++) {
                                        const Po = Co[Qo].image[ho].image;
                                        Io ? lt.texSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo + 1, 0, 0, Po.width, Po.height, po, Ao, Po.data) : lt.texImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo + 1, Fo, Po.width, Po.height, 0, po, Ao, Po.data)
                                    }
                                } else {
                                    Io ? lt.texSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, 0, 0, 0, po, Ao, Pn[ho]) : lt.texImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, 0, Fo, po, Ao, Pn[ho]);
                                    for (let Qo = 0; Qo < Co.length; Qo++) {
                                        const Po = Co[Qo];
                                        Io ? lt.texSubImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo + 1, 0, 0, po, Ao, Po.image[ho]) : lt.texImage2D(Tt.TEXTURE_CUBE_MAP_POSITIVE_X + ho, Qo + 1, Fo, po, Ao, Po.image[ho])
                                    }
                                }
                        }
                        br(kr, Kn) && yr(Tt.TEXTURE_CUBE_MAP),
                        Xr.__version = Lr.version,
                        kr.onUpdate && kr.onUpdate(kr)
                    }
                    Wr.__version = kr.version
                }(Fr, Dr, Sr) : lt.bindTexture(Tt.TEXTURE_CUBE_MAP, Fr.__webglTexture, Tt.TEXTURE0 + Sr)
            }
            ,
            this.rebindTextures = function(Dr, Sr, Fr) {
                const Wr = mt.get(Dr);
                Sr !== void 0 && on(Wr.__webglFramebuffer, Dr, Dr.texture, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_2D, 0),
                Fr !== void 0 && ro(Dr)
            }
            ,
            this.setupRenderTarget = function(Dr) {
                const Sr = Dr.texture
                  , Fr = mt.get(Dr)
                  , Wr = mt.get(Sr);
                Dr.addEventListener("dispose", Gr),
                Dr.isWebGLMultipleRenderTargets !== !0 && (Wr.__webglTexture === void 0 && (Wr.__webglTexture = Tt.createTexture()),
                Wr.__version = Sr.version,
                Ct.memory.textures++);
                const kr = Dr.isWebGLCubeRenderTarget === !0
                  , _r = Dr.isWebGLMultipleRenderTargets === !0
                  , Br = xr(Dr) || Mt;
                if (kr) {
                    Fr.__webglFramebuffer = [];
                    for (let Lr = 0; Lr < 6; Lr++)
                        if (Mt && Sr.mipmaps && Sr.mipmaps.length > 0) {
                            Fr.__webglFramebuffer[Lr] = [];
                            for (let Xr = 0; Xr < Sr.mipmaps.length; Xr++)
                                Fr.__webglFramebuffer[Lr][Xr] = Tt.createFramebuffer()
                        } else
                            Fr.__webglFramebuffer[Lr] = Tt.createFramebuffer()
                } else {
                    if (Mt && Sr.mipmaps && Sr.mipmaps.length > 0) {
                        Fr.__webglFramebuffer = [];
                        for (let Lr = 0; Lr < Sr.mipmaps.length; Lr++)
                            Fr.__webglFramebuffer[Lr] = Tt.createFramebuffer()
                    } else
                        Fr.__webglFramebuffer = Tt.createFramebuffer();
                    if (_r)
                        if (ft.drawBuffers) {
                            const Lr = Dr.texture;
                            for (let Xr = 0, Kr = Lr.length; Xr < Kr; Xr++) {
                                const An = mt.get(Lr[Xr]);
                                An.__webglTexture === void 0 && (An.__webglTexture = Tt.createTexture(),
                                Ct.memory.textures++)
                            }
                        } else
                            console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
                    if (Mt && Dr.samples > 0 && jn(Dr) === !1) {
                        const Lr = _r ? Sr : [Sr];
                        Fr.__webglMultisampledFramebuffer = Tt.createFramebuffer(),
                        Fr.__webglColorRenderbuffer = [],
                        lt.bindFramebuffer(Tt.FRAMEBUFFER, Fr.__webglMultisampledFramebuffer);
                        for (let Xr = 0; Xr < Lr.length; Xr++) {
                            const Kr = Lr[Xr];
                            Fr.__webglColorRenderbuffer[Xr] = Tt.createRenderbuffer(),
                            Tt.bindRenderbuffer(Tt.RENDERBUFFER, Fr.__webglColorRenderbuffer[Xr]);
                            const An = xt.convert(Kr.format, Kr.colorSpace)
                              , pn = xt.convert(Kr.type)
                              , _o = Pr(Kr.internalFormat, An, pn, Kr.colorSpace, Dr.isXRRenderTarget === !0)
                              , to = Zn(Dr);
                            Tt.renderbufferStorageMultisample(Tt.RENDERBUFFER, to, _o, Dr.width, Dr.height),
                            Tt.framebufferRenderbuffer(Tt.FRAMEBUFFER, Tt.COLOR_ATTACHMENT0 + Xr, Tt.RENDERBUFFER, Fr.__webglColorRenderbuffer[Xr])
                        }
                        Tt.bindRenderbuffer(Tt.RENDERBUFFER, null),
                        Dr.depthBuffer && (Fr.__webglDepthRenderbuffer = Tt.createRenderbuffer(),
                        Un(Fr.__webglDepthRenderbuffer, Dr, !0)),
                        lt.bindFramebuffer(Tt.FRAMEBUFFER, null)
                    }
                }
                if (kr) {
                    lt.bindTexture(Tt.TEXTURE_CUBE_MAP, Wr.__webglTexture),
                    Yr(Tt.TEXTURE_CUBE_MAP, Sr, Br);
                    for (let Lr = 0; Lr < 6; Lr++)
                        if (Mt && Sr.mipmaps && Sr.mipmaps.length > 0)
                            for (let Xr = 0; Xr < Sr.mipmaps.length; Xr++)
                                on(Fr.__webglFramebuffer[Lr][Xr], Dr, Sr, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_CUBE_MAP_POSITIVE_X + Lr, Xr);
                        else
                            on(Fr.__webglFramebuffer[Lr], Dr, Sr, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_CUBE_MAP_POSITIVE_X + Lr, 0);
                    br(Sr, Br) && yr(Tt.TEXTURE_CUBE_MAP),
                    lt.unbindTexture()
                } else if (_r) {
                    const Lr = Dr.texture;
                    for (let Xr = 0, Kr = Lr.length; Xr < Kr; Xr++) {
                        const An = Lr[Xr]
                          , pn = mt.get(An);
                        lt.bindTexture(Tt.TEXTURE_2D, pn.__webglTexture),
                        Yr(Tt.TEXTURE_2D, An, Br),
                        on(Fr.__webglFramebuffer, Dr, An, Tt.COLOR_ATTACHMENT0 + Xr, Tt.TEXTURE_2D, 0),
                        br(An, Br) && yr(Tt.TEXTURE_2D)
                    }
                    lt.unbindTexture()
                } else {
                    let Lr = Tt.TEXTURE_2D;
                    if ((Dr.isWebGL3DRenderTarget || Dr.isWebGLArrayRenderTarget) && (Mt ? Lr = Dr.isWebGL3DRenderTarget ? Tt.TEXTURE_3D : Tt.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),
                    lt.bindTexture(Lr, Wr.__webglTexture),
                    Yr(Lr, Sr, Br),
                    Mt && Sr.mipmaps && Sr.mipmaps.length > 0)
                        for (let Xr = 0; Xr < Sr.mipmaps.length; Xr++)
                            on(Fr.__webglFramebuffer[Xr], Dr, Sr, Tt.COLOR_ATTACHMENT0, Lr, Xr);
                    else
                        on(Fr.__webglFramebuffer, Dr, Sr, Tt.COLOR_ATTACHMENT0, Lr, 0);
                    br(Sr, Br) && yr(Lr),
                    lt.unbindTexture()
                }
                Dr.depthBuffer && ro(Dr)
            }
            ,
            this.updateRenderTargetMipmap = function(Dr) {
                const Sr = xr(Dr) || Mt
                  , Fr = Dr.isWebGLMultipleRenderTargets === !0 ? Dr.texture : [Dr.texture]
                  , Wr = Dr.isWebGLCubeRenderTarget ? Tt.TEXTURE_CUBE_MAP : Tt.TEXTURE_2D;
                for (let kr = 0, _r = Fr.length; kr < _r; kr++) {
                    const Br = Fr[kr]
                      , Lr = mt.get(Br)
                      , Xr = Lr.__webglTexture;
                    Lr.__version !== Br.version && (lt.bindTexture(Wr, Xr),
                    Yr(Wr, Br, Sr),
                    lt.unbindTexture(),
                    Lr.__version = Br.version),
                    br(Br, Sr) && (lt.bindTexture(Wr, Xr),
                    yr(Wr),
                    lt.unbindTexture())
                }
            }
            ,
            this.updateMultisampleRenderTarget = function(Dr) {
                if (Mt && Dr.samples > 0 && jn(Dr) === !1) {
                    const Sr = Dr.isWebGLMultipleRenderTargets ? Dr.texture : [Dr.texture]
                      , Fr = Dr.width
                      , Wr = Dr.height;
                    let kr = Tt.COLOR_BUFFER_BIT;
                    const _r = []
                      , Br = Dr.stencilBuffer ? Tt.DEPTH_STENCIL_ATTACHMENT : Tt.DEPTH_ATTACHMENT
                      , Lr = mt.get(Dr)
                      , Xr = Dr.isWebGLMultipleRenderTargets === !0;
                    if (Xr)
                        for (let Kr = 0; Kr < Sr.length; Kr++)
                            lt.bindFramebuffer(Tt.FRAMEBUFFER, Lr.__webglMultisampledFramebuffer),
                            Tt.framebufferRenderbuffer(Tt.FRAMEBUFFER, Tt.COLOR_ATTACHMENT0 + Kr, Tt.RENDERBUFFER, null),
                            lt.bindFramebuffer(Tt.FRAMEBUFFER, Lr.__webglFramebuffer),
                            Tt.framebufferTexture2D(Tt.DRAW_FRAMEBUFFER, Tt.COLOR_ATTACHMENT0 + Kr, Tt.TEXTURE_2D, null, 0);
                    lt.bindFramebuffer(Tt.READ_FRAMEBUFFER, Lr.__webglMultisampledFramebuffer),
                    lt.bindFramebuffer(Tt.DRAW_FRAMEBUFFER, Lr.__webglFramebuffer);
                    for (let Kr = 0; Kr < Sr.length; Kr++) {
                        _r.push(Tt.COLOR_ATTACHMENT0 + Kr),
                        Dr.depthBuffer && _r.push(Br);
                        const An = Lr.__ignoreDepthValues !== void 0 && Lr.__ignoreDepthValues;
                        if (An === !1 && (Dr.depthBuffer && (kr |= Tt.DEPTH_BUFFER_BIT),
                        Dr.stencilBuffer && (kr |= Tt.STENCIL_BUFFER_BIT)),
                        Xr && Tt.framebufferRenderbuffer(Tt.READ_FRAMEBUFFER, Tt.COLOR_ATTACHMENT0, Tt.RENDERBUFFER, Lr.__webglColorRenderbuffer[Kr]),
                        An === !0 && (Tt.invalidateFramebuffer(Tt.READ_FRAMEBUFFER, [Br]),
                        Tt.invalidateFramebuffer(Tt.DRAW_FRAMEBUFFER, [Br])),
                        Xr) {
                            const pn = mt.get(Sr[Kr]).__webglTexture;
                            Tt.framebufferTexture2D(Tt.DRAW_FRAMEBUFFER, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_2D, pn, 0)
                        }
                        Tt.blitFramebuffer(0, 0, Fr, Wr, 0, 0, Fr, Wr, kr, Tt.NEAREST),
                        qt && Tt.invalidateFramebuffer(Tt.READ_FRAMEBUFFER, _r)
                    }
                    if (lt.bindFramebuffer(Tt.READ_FRAMEBUFFER, null),
                    lt.bindFramebuffer(Tt.DRAW_FRAMEBUFFER, null),
                    Xr)
                        for (let Kr = 0; Kr < Sr.length; Kr++) {
                            lt.bindFramebuffer(Tt.FRAMEBUFFER, Lr.__webglMultisampledFramebuffer),
                            Tt.framebufferRenderbuffer(Tt.FRAMEBUFFER, Tt.COLOR_ATTACHMENT0 + Kr, Tt.RENDERBUFFER, Lr.__webglColorRenderbuffer[Kr]);
                            const An = mt.get(Sr[Kr]).__webglTexture;
                            lt.bindFramebuffer(Tt.FRAMEBUFFER, Lr.__webglFramebuffer),
                            Tt.framebufferTexture2D(Tt.DRAW_FRAMEBUFFER, Tt.COLOR_ATTACHMENT0 + Kr, Tt.TEXTURE_2D, An, 0)
                        }
                    lt.bindFramebuffer(Tt.DRAW_FRAMEBUFFER, Lr.__webglMultisampledFramebuffer)
                }
            }
            ,
            this.setupDepthRenderbuffer = ro,
            this.setupFrameBufferTexture = on,
            this.useMultisampledRTT = jn
        }
        function _x(Tt, tt, lt) {
            const mt = lt.isWebGL2;
            return {
                convert: function(ft, xt=Oo) {
                    let Ct;
                    const Mt = Do.getTransfer(xt);
                    if (ft === $n)
                        return Tt.UNSIGNED_BYTE;
                    if (ft === $l)
                        return Tt.UNSIGNED_SHORT_4_4_4_4;
                    if (ft === wl)
                        return Tt.UNSIGNED_SHORT_5_5_5_1;
                    if (ft === ao)
                        return Tt.BYTE;
                    if (ft === zo)
                        return Tt.SHORT;
                    if (ft === Zo)
                        return Tt.UNSIGNED_SHORT;
                    if (ft === $o)
                        return Tt.INT;
                    if (ft === Yo)
                        return Tt.UNSIGNED_INT;
                    if (ft === ss)
                        return Tt.FLOAT;
                    if (ft === Os)
                        return mt ? Tt.HALF_FLOAT : (Ct = tt.get("OES_texture_half_float"),
                        Ct !== null ? Ct.HALF_FLOAT_OES : null);
                    if (ft === ys)
                        return Tt.ALPHA;
                    if (ft === as)
                        return Tt.RGBA;
                    if (ft === Ln)
                        return Tt.LUMINANCE;
                    if (ft === Vn)
                        return Tt.LUMINANCE_ALPHA;
                    if (ft === Ys)
                        return Tt.DEPTH_COMPONENT;
                    if (ft === Eo)
                        return Tt.DEPTH_STENCIL;
                    if (ft === _h)
                        return Ct = tt.get("EXT_sRGB"),
                        Ct !== null ? Ct.SRGB_ALPHA_EXT : null;
                    if (ft === Sl)
                        return Tt.RED;
                    if (ft === Ks)
                        return Tt.RED_INTEGER;
                    if (ft === ds)
                        return Tt.RG;
                    if (ft === yo)
                        return Tt.RG_INTEGER;
                    if (ft === ko)
                        return Tt.RGBA_INTEGER;
                    if (ft === xs || ft === Js || ft === bs || ft === Bl)
                        if (Mt === Vo) {
                            if (Ct = tt.get("WEBGL_compressed_texture_s3tc_srgb"),
                            Ct === null)
                                return null;
                            if (ft === xs)
                                return Ct.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                            if (ft === Js)
                                return Ct.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                            if (ft === bs)
                                return Ct.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                            if (ft === Bl)
                                return Ct.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                        } else {
                            if (Ct = tt.get("WEBGL_compressed_texture_s3tc"),
                            Ct === null)
                                return null;
                            if (ft === xs)
                                return Ct.COMPRESSED_RGB_S3TC_DXT1_EXT;
                            if (ft === Js)
                                return Ct.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                            if (ft === bs)
                                return Ct.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                            if (ft === Bl)
                                return Ct.COMPRESSED_RGBA_S3TC_DXT5_EXT
                        }
                    if (ft === Bm || ft === Vp || ft === Lm || ft === Om) {
                        if (Ct = tt.get("WEBGL_compressed_texture_pvrtc"),
                        Ct === null)
                            return null;
                        if (ft === Bm)
                            return Ct.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (ft === Vp)
                            return Ct.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (ft === Lm)
                            return Ct.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (ft === Om)
                            return Ct.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                    }
                    if (ft === G_)
                        return Ct = tt.get("WEBGL_compressed_texture_etc1"),
                        Ct !== null ? Ct.COMPRESSED_RGB_ETC1_WEBGL : null;
                    if (ft === lu || ft === Zs) {
                        if (Ct = tt.get("WEBGL_compressed_texture_etc"),
                        Ct === null)
                            return null;
                        if (ft === lu)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ETC2 : Ct.COMPRESSED_RGB8_ETC2;
                        if (ft === Zs)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : Ct.COMPRESSED_RGBA8_ETC2_EAC
                    }
                    if (ft === Xl || ft === cu || ft === Gp || ft === Ru || ft === op || ft === Nm || ft === uu || ft === zp || ft === Fm || ft === Hp || ft === Qp || ft === Um || ft === Iu || ft === Wp) {
                        if (Ct = tt.get("WEBGL_compressed_texture_astc"),
                        Ct === null)
                            return null;
                        if (ft === Xl)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : Ct.COMPRESSED_RGBA_ASTC_4x4_KHR;
                        if (ft === cu)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : Ct.COMPRESSED_RGBA_ASTC_5x4_KHR;
                        if (ft === Gp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : Ct.COMPRESSED_RGBA_ASTC_5x5_KHR;
                        if (ft === Ru)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : Ct.COMPRESSED_RGBA_ASTC_6x5_KHR;
                        if (ft === op)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : Ct.COMPRESSED_RGBA_ASTC_6x6_KHR;
                        if (ft === Nm)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : Ct.COMPRESSED_RGBA_ASTC_8x5_KHR;
                        if (ft === uu)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : Ct.COMPRESSED_RGBA_ASTC_8x6_KHR;
                        if (ft === zp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : Ct.COMPRESSED_RGBA_ASTC_8x8_KHR;
                        if (ft === Fm)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : Ct.COMPRESSED_RGBA_ASTC_10x5_KHR;
                        if (ft === Hp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : Ct.COMPRESSED_RGBA_ASTC_10x6_KHR;
                        if (ft === Qp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : Ct.COMPRESSED_RGBA_ASTC_10x8_KHR;
                        if (ft === Um)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : Ct.COMPRESSED_RGBA_ASTC_10x10_KHR;
                        if (ft === Iu)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : Ct.COMPRESSED_RGBA_ASTC_12x10_KHR;
                        if (ft === Wp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : Ct.COMPRESSED_RGBA_ASTC_12x12_KHR
                    }
                    if (ft === sp || ft === jm || ft === Vm) {
                        if (Ct = tt.get("EXT_texture_compression_bptc"),
                        Ct === null)
                            return null;
                        if (ft === sp)
                            return Mt === Vo ? Ct.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : Ct.COMPRESSED_RGBA_BPTC_UNORM_EXT;
                        if (ft === jm)
                            return Ct.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
                        if (ft === Vm)
                            return Ct.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
                    }
                    if (ft === z_ || ft === Gm || ft === zm || ft === ap) {
                        if (Ct = tt.get("EXT_texture_compression_rgtc"),
                        Ct === null)
                            return null;
                        if (ft === sp)
                            return Ct.COMPRESSED_RED_RGTC1_EXT;
                        if (ft === Gm)
                            return Ct.COMPRESSED_SIGNED_RED_RGTC1_EXT;
                        if (ft === zm)
                            return Ct.COMPRESSED_RED_GREEN_RGTC2_EXT;
                        if (ft === ap)
                            return Ct.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
                    }
                    return ft === Ps ? mt ? Tt.UNSIGNED_INT_24_8 : (Ct = tt.get("WEBGL_depth_texture"),
                    Ct !== null ? Ct.UNSIGNED_INT_24_8_WEBGL : null) : Tt[ft] !== void 0 ? Tt[ft] : null
                }
            }
        }
        class vx extends Cs {
            constructor(tt=[]) {
                super(),
                this.isArrayCamera = !0,
                this.cameras = tt
            }
        }
        class Am extends Mo {
            constructor() {
                super(),
                this.isGroup = !0,
                this.type = "Group"
            }
        }
        const eS = {
            type: "move"
        };
        class W0 {
            constructor() {
                this._targetRay = null,
                this._grip = null,
                this._hand = null
            }
            getHandSpace() {
                return this._hand === null && (this._hand = new Am,
                this._hand.matrixAutoUpdate = !1,
                this._hand.visible = !1,
                this._hand.joints = {},
                this._hand.inputState = {
                    pinching: !1
                }),
                this._hand
            }
            getTargetRaySpace() {
                return this._targetRay === null && (this._targetRay = new Am,
                this._targetRay.matrixAutoUpdate = !1,
                this._targetRay.visible = !1,
                this._targetRay.hasLinearVelocity = !1,
                this._targetRay.linearVelocity = new Er,
                this._targetRay.hasAngularVelocity = !1,
                this._targetRay.angularVelocity = new Er),
                this._targetRay
            }
            getGripSpace() {
                return this._grip === null && (this._grip = new Am,
                this._grip.matrixAutoUpdate = !1,
                this._grip.visible = !1,
                this._grip.hasLinearVelocity = !1,
                this._grip.linearVelocity = new Er,
                this._grip.hasAngularVelocity = !1,
                this._grip.angularVelocity = new Er),
                this._grip
            }
            dispatchEvent(tt) {
                return this._targetRay !== null && this._targetRay.dispatchEvent(tt),
                this._grip !== null && this._grip.dispatchEvent(tt),
                this._hand !== null && this._hand.dispatchEvent(tt),
                this
            }
            connect(tt) {
                if (tt && tt.hand) {
                    const lt = this._hand;
                    if (lt)
                        for (const mt of tt.hand.values())
                            this._getHandJoint(lt, mt)
                }
                return this.dispatchEvent({
                    type: "connected",
                    data: tt
                }),
                this
            }
            disconnect(tt) {
                return this.dispatchEvent({
                    type: "disconnected",
                    data: tt
                }),
                this._targetRay !== null && (this._targetRay.visible = !1),
                this._grip !== null && (this._grip.visible = !1),
                this._hand !== null && (this._hand.visible = !1),
                this
            }
            update(tt, lt, mt) {
                let ft = null
                  , xt = null
                  , Ct = null;
                const Mt = this._targetRay
                  , Lt = this._grip
                  , Nt = this._hand;
                if (tt && lt.session.visibilityState !== "visible-blurred") {
                    if (Nt && tt.hand) {
                        Ct = !0;
                        for (const Zt of tt.hand.values()) {
                            const Yt = lt.getJointPose(Zt, mt)
                              , sr = this._getHandJoint(Nt, Zt);
                            Yt !== null && (sr.matrix.fromArray(Yt.transform.matrix),
                            sr.matrix.decompose(sr.position, sr.rotation, sr.scale),
                            sr.matrixWorldNeedsUpdate = !0,
                            sr.jointRadius = Yt.radius),
                            sr.visible = Yt !== null
                        }
                        const jt = Nt.joints["index-finger-tip"]
                          , Wt = Nt.joints["thumb-tip"]
                          , Qt = jt.position.distanceTo(Wt.position)
                          , qt = .02
                          , Xt = .005;
                        Nt.inputState.pinching && Qt > qt + Xt ? (Nt.inputState.pinching = !1,
                        this.dispatchEvent({
                            type: "pinchend",
                            handedness: tt.handedness,
                            target: this
                        })) : !Nt.inputState.pinching && Qt <= qt - Xt && (Nt.inputState.pinching = !0,
                        this.dispatchEvent({
                            type: "pinchstart",
                            handedness: tt.handedness,
                            target: this
                        }))
                    } else
                        Lt !== null && tt.gripSpace && (xt = lt.getPose(tt.gripSpace, mt),
                        xt !== null && (Lt.matrix.fromArray(xt.transform.matrix),
                        Lt.matrix.decompose(Lt.position, Lt.rotation, Lt.scale),
                        Lt.matrixWorldNeedsUpdate = !0,
                        xt.linearVelocity ? (Lt.hasLinearVelocity = !0,
                        Lt.linearVelocity.copy(xt.linearVelocity)) : Lt.hasLinearVelocity = !1,
                        xt.angularVelocity ? (Lt.hasAngularVelocity = !0,
                        Lt.angularVelocity.copy(xt.angularVelocity)) : Lt.hasAngularVelocity = !1));
                    Mt !== null && (ft = lt.getPose(tt.targetRaySpace, mt),
                    ft === null && xt !== null && (ft = xt),
                    ft !== null && (Mt.matrix.fromArray(ft.transform.matrix),
                    Mt.matrix.decompose(Mt.position, Mt.rotation, Mt.scale),
                    Mt.matrixWorldNeedsUpdate = !0,
                    ft.linearVelocity ? (Mt.hasLinearVelocity = !0,
                    Mt.linearVelocity.copy(ft.linearVelocity)) : Mt.hasLinearVelocity = !1,
                    ft.angularVelocity ? (Mt.hasAngularVelocity = !0,
                    Mt.angularVelocity.copy(ft.angularVelocity)) : Mt.hasAngularVelocity = !1,
                    this.dispatchEvent(eS)))
                }
                return Mt !== null && (Mt.visible = ft !== null),
                Lt !== null && (Lt.visible = xt !== null),
                Nt !== null && (Nt.visible = Ct !== null),
                this
            }
            _getHandJoint(tt, lt) {
                if (tt.joints[lt.jointName] === void 0) {
                    const mt = new Am;
                    mt.matrixAutoUpdate = !1,
                    mt.visible = !1,
                    tt.joints[lt.jointName] = mt,
                    tt.add(mt)
                }
                return tt.joints[lt.jointName]
            }
        }
        class yx extends Ho {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt) {
                if ((jt = jt !== void 0 ? jt : Ys) !== Ys && jt !== Eo)
                    throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
                mt === void 0 && jt === Ys && (mt = Yo),
                mt === void 0 && jt === Eo && (mt = Ps),
                super(null, ft, xt, Ct, Mt, Lt, jt, mt, Nt),
                this.isDepthTexture = !0,
                this.image = {
                    width: tt,
                    height: lt
                },
                this.magFilter = Mt !== void 0 ? Mt : fn,
                this.minFilter = Lt !== void 0 ? Lt : fn,
                this.flipY = !1,
                this.generateMipmaps = !1,
                this.compareFunction = null
            }
            copy(tt) {
                return super.copy(tt),
                this.compareFunction = tt.compareFunction,
                this
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return this.compareFunction !== null && (lt.compareFunction = this.compareFunction),
                lt
            }
        }
        class tS extends As {
            constructor(tt, lt) {
                super();
                const mt = this;
                let ft = null
                  , xt = 1
                  , Ct = null
                  , Mt = "local-floor"
                  , Lt = 1
                  , Nt = null
                  , jt = null
                  , Wt = null
                  , Qt = null
                  , qt = null
                  , Xt = null;
                const Zt = lt.getContextAttributes();
                let Yt = null
                  , sr = null;
                const er = []
                  , rr = []
                  , xr = new Cs;
                xr.layers.enable(1),
                xr.viewport = new Lo;
                const br = new Cs;
                br.layers.enable(2),
                br.viewport = new Lo;
                const yr = [xr, br]
                  , Pr = new vx;
                Pr.layers.enable(1),
                Pr.layers.enable(2);
                let zr = null
                  , Nr = null;
                function Vr(Yr) {
                    const Jr = rr.indexOf(Yr.inputSource);
                    if (Jr === -1)
                        return;
                    const sn = er[Jr];
                    sn !== void 0 && (sn.update(Yr.inputSource, Yr.frame, Nt || Ct),
                    sn.dispatchEvent({
                        type: Yr.type,
                        data: Yr.inputSource
                    }))
                }
                function Gr() {
                    ft.removeEventListener("select", Vr),
                    ft.removeEventListener("selectstart", Vr),
                    ft.removeEventListener("selectend", Vr),
                    ft.removeEventListener("squeeze", Vr),
                    ft.removeEventListener("squeezestart", Vr),
                    ft.removeEventListener("squeezeend", Vr),
                    ft.removeEventListener("end", Gr),
                    ft.removeEventListener("inputsourceschange", Hr);
                    for (let Yr = 0; Yr < er.length; Yr++) {
                        const Jr = rr[Yr];
                        Jr !== null && (rr[Yr] = null,
                        er[Yr].disconnect(Jr))
                    }
                    zr = null,
                    Nr = null,
                    tt.setRenderTarget(Yt),
                    qt = null,
                    Qt = null,
                    Wt = null,
                    ft = null,
                    sr = null,
                    cn.stop(),
                    mt.isPresenting = !1,
                    mt.dispatchEvent({
                        type: "sessionend"
                    })
                }
                function Hr(Yr) {
                    for (let Jr = 0; Jr < Yr.removed.length; Jr++) {
                        const sn = Yr.removed[Jr]
                          , on = rr.indexOf(sn);
                        on >= 0 && (rr[on] = null,
                        er[on].disconnect(sn))
                    }
                    for (let Jr = 0; Jr < Yr.added.length; Jr++) {
                        const sn = Yr.added[Jr];
                        let on = rr.indexOf(sn);
                        if (on === -1) {
                            for (let ro = 0; ro < er.length; ro++) {
                                if (ro >= rr.length) {
                                    rr.push(sn),
                                    on = ro;
                                    break
                                }
                                if (rr[ro] === null) {
                                    rr[ro] = sn,
                                    on = ro;
                                    break
                                }
                            }
                            if (on === -1)
                                break
                        }
                        const Un = er[on];
                        Un && Un.connect(sn)
                    }
                }
                this.cameraAutoUpdate = !0,
                this.enabled = !1,
                this.isPresenting = !1,
                this.getController = function(Yr) {
                    let Jr = er[Yr];
                    return Jr === void 0 && (Jr = new W0,
                    er[Yr] = Jr),
                    Jr.getTargetRaySpace()
                }
                ,
                this.getControllerGrip = function(Yr) {
                    let Jr = er[Yr];
                    return Jr === void 0 && (Jr = new W0,
                    er[Yr] = Jr),
                    Jr.getGripSpace()
                }
                ,
                this.getHand = function(Yr) {
                    let Jr = er[Yr];
                    return Jr === void 0 && (Jr = new W0,
                    er[Yr] = Jr),
                    Jr.getHandSpace()
                }
                ,
                this.setFramebufferScaleFactor = function(Yr) {
                    xt = Yr,
                    mt.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
                }
                ,
                this.setReferenceSpaceType = function(Yr) {
                    Mt = Yr,
                    mt.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
                }
                ,
                this.getReferenceSpace = function() {
                    return Nt || Ct
                }
                ,
                this.setReferenceSpace = function(Yr) {
                    Nt = Yr
                }
                ,
                this.getBaseLayer = function() {
                    return Qt !== null ? Qt : qt
                }
                ,
                this.getBinding = function() {
                    return Wt
                }
                ,
                this.getFrame = function() {
                    return Xt
                }
                ,
                this.getSession = function() {
                    return ft
                }
                ,
                this.setSession = async function(Yr) {
                    if (ft = Yr,
                    ft !== null) {
                        if (Yt = tt.getRenderTarget(),
                        ft.addEventListener("select", Vr),
                        ft.addEventListener("selectstart", Vr),
                        ft.addEventListener("selectend", Vr),
                        ft.addEventListener("squeeze", Vr),
                        ft.addEventListener("squeezestart", Vr),
                        ft.addEventListener("squeezeend", Vr),
                        ft.addEventListener("end", Gr),
                        ft.addEventListener("inputsourceschange", Hr),
                        Zt.xrCompatible !== !0 && await lt.makeXRCompatible(),
                        ft.renderState.layers === void 0 || tt.capabilities.isWebGL2 === !1) {
                            const Jr = {
                                antialias: ft.renderState.layers !== void 0 || Zt.antialias,
                                alpha: !0,
                                depth: Zt.depth,
                                stencil: Zt.stencil,
                                framebufferScaleFactor: xt
                            };
                            qt = new XRWebGLLayer(ft,lt,Jr),
                            ft.updateRenderState({
                                baseLayer: qt
                            }),
                            sr = new Rs(qt.framebufferWidth,qt.framebufferHeight,{
                                format: as,
                                type: $n,
                                colorSpace: tt.outputColorSpace,
                                stencilBuffer: Zt.stencil
                            })
                        } else {
                            let Jr = null
                              , sn = null
                              , on = null;
                            Zt.depth && (on = Zt.stencil ? lt.DEPTH24_STENCIL8 : lt.DEPTH_COMPONENT24,
                            Jr = Zt.stencil ? Eo : Ys,
                            sn = Zt.stencil ? Ps : Yo);
                            const Un = {
                                colorFormat: lt.RGBA8,
                                depthFormat: on,
                                scaleFactor: xt
                            };
                            Wt = new XRWebGLBinding(ft,lt),
                            Qt = Wt.createProjectionLayer(Un),
                            ft.updateRenderState({
                                layers: [Qt]
                            }),
                            sr = new Rs(Qt.textureWidth,Qt.textureHeight,{
                                format: as,
                                type: $n,
                                depthTexture: new yx(Qt.textureWidth,Qt.textureHeight,sn,void 0,void 0,void 0,void 0,void 0,void 0,Jr),
                                stencilBuffer: Zt.stencil,
                                colorSpace: tt.outputColorSpace,
                                samples: Zt.antialias ? 4 : 0
                            }),
                            tt.properties.get(sr).__ignoreDepthValues = Qt.ignoreDepthValues
                        }
                        sr.isXRRenderTarget = !0,
                        this.setFoveation(Lt),
                        Nt = null,
                        Ct = await ft.requestReferenceSpace(Mt),
                        cn.setContext(ft),
                        cn.start(),
                        mt.isPresenting = !0,
                        mt.dispatchEvent({
                            type: "sessionstart"
                        })
                    }
                }
                ,
                this.getEnvironmentBlendMode = function() {
                    if (ft !== null)
                        return ft.environmentBlendMode
                }
                ;
                const _n = new Er
                  , dn = new Er;
                function kn(Yr, Jr) {
                    Jr === null ? Yr.matrixWorld.copy(Yr.matrix) : Yr.matrixWorld.multiplyMatrices(Jr.matrixWorld, Yr.matrix),
                    Yr.matrixWorldInverse.copy(Yr.matrixWorld).invert()
                }
                this.updateCamera = function(Yr) {
                    if (ft === null)
                        return;
                    Pr.near = br.near = xr.near = Yr.near,
                    Pr.far = br.far = xr.far = Yr.far,
                    zr === Pr.near && Nr === Pr.far || (ft.updateRenderState({
                        depthNear: Pr.near,
                        depthFar: Pr.far
                    }),
                    zr = Pr.near,
                    Nr = Pr.far);
                    const Jr = Yr.parent
                      , sn = Pr.cameras;
                    kn(Pr, Jr);
                    for (let on = 0; on < sn.length; on++)
                        kn(sn[on], Jr);
                    sn.length === 2 ? function(on, Un, ro) {
                        _n.setFromMatrixPosition(Un.matrixWorld),
                        dn.setFromMatrixPosition(ro.matrixWorld);
                        const Zn = _n.distanceTo(dn)
                          , jn = Un.projectionMatrix.elements
                          , uo = ro.projectionMatrix.elements
                          , Dr = jn[14] / (jn[10] - 1)
                          , Sr = jn[14] / (jn[10] + 1)
                          , Fr = (jn[9] + 1) / jn[5]
                          , Wr = (jn[9] - 1) / jn[5]
                          , kr = (jn[8] - 1) / jn[0]
                          , _r = (uo[8] + 1) / uo[0]
                          , Br = Dr * kr
                          , Lr = Dr * _r
                          , Xr = Zn / (-kr + _r)
                          , Kr = Xr * -kr;
                        Un.matrixWorld.decompose(on.position, on.quaternion, on.scale),
                        on.translateX(Kr),
                        on.translateZ(Xr),
                        on.matrixWorld.compose(on.position, on.quaternion, on.scale),
                        on.matrixWorldInverse.copy(on.matrixWorld).invert();
                        const An = Dr + Xr
                          , pn = Sr + Xr
                          , _o = Br - Kr
                          , to = Lr + (Zn - Kr)
                          , Pn = Fr * Sr / pn * An
                          , eo = Wr * Sr / pn * An;
                        on.projectionMatrix.makePerspective(_o, to, Pn, eo, An, pn),
                        on.projectionMatrixInverse.copy(on.projectionMatrix).invert()
                    }(Pr, xr, br) : Pr.projectionMatrix.copy(xr.projectionMatrix),
                    function(on, Un, ro) {
                        ro === null ? on.matrix.copy(Un.matrixWorld) : (on.matrix.copy(ro.matrixWorld),
                        on.matrix.invert(),
                        on.matrix.multiply(Un.matrixWorld)),
                        on.matrix.decompose(on.position, on.quaternion, on.scale),
                        on.updateMatrixWorld(!0),
                        on.projectionMatrix.copy(Un.projectionMatrix),
                        on.projectionMatrixInverse.copy(Un.projectionMatrixInverse),
                        on.isPerspectiveCamera && (on.fov = 2 * _u * Math.atan(1 / on.projectionMatrix.elements[5]),
                        on.zoom = 1)
                    }(Yr, Pr, Jr)
                }
                ,
                this.getCamera = function() {
                    return Pr
                }
                ,
                this.getFoveation = function() {
                    if (Qt !== null || qt !== null)
                        return Lt
                }
                ,
                this.setFoveation = function(Yr) {
                    Lt = Yr,
                    Qt !== null && (Qt.fixedFoveation = Yr),
                    qt !== null && qt.fixedFoveation !== void 0 && (qt.fixedFoveation = Yr)
                }
                ;
                let Bn = null;
                this.onPreAnimationFrameCallback = null;
                const cn = new Hy;
                cn.setAnimationLoop(function(Yr, Jr) {
                    if (mt.onPreAnimationFrameCallback && mt.onPreAnimationFrameCallback(Yr, Jr),
                    jt = Jr.getViewerPose(Nt || Ct),
                    Xt = Jr,
                    jt !== null) {
                        const sn = jt.views;
                        qt !== null && (tt.setRenderTargetFramebuffer(sr, qt.framebuffer),
                        tt.setRenderTarget(sr));
                        let on = !1;
                        sn.length !== Pr.cameras.length && (Pr.cameras.length = 0,
                        on = !0);
                        for (let Un = 0; Un < sn.length; Un++) {
                            const ro = sn[Un];
                            let Zn = null;
                            if (qt !== null)
                                Zn = qt.getViewport(ro);
                            else {
                                const uo = Wt.getViewSubImage(Qt, ro);
                                Zn = uo.viewport,
                                Un === 0 && (tt.setRenderTargetTextures(sr, uo.colorTexture, Qt.ignoreDepthValues ? void 0 : uo.depthStencilTexture),
                                tt.setRenderTarget(sr))
                            }
                            let jn = yr[Un];
                            jn === void 0 && (jn = new Cs,
                            jn.layers.enable(Un),
                            jn.viewport = new Lo,
                            yr[Un] = jn),
                            jn.matrix.fromArray(ro.transform.matrix),
                            jn.matrix.decompose(jn.position, jn.quaternion, jn.scale),
                            jn.projectionMatrix.fromArray(ro.projectionMatrix),
                            jn.projectionMatrixInverse.copy(jn.projectionMatrix).invert(),
                            jn.viewport.set(Zn.x, Zn.y, Zn.width, Zn.height),
                            Un === 0 && (Pr.matrix.copy(jn.matrix),
                            Pr.matrix.decompose(Pr.position, Pr.quaternion, Pr.scale)),
                            on === !0 && Pr.cameras.push(jn)
                        }
                    }
                    for (let sn = 0; sn < er.length; sn++) {
                        const on = rr[sn]
                          , Un = er[sn];
                        on !== null && Un !== void 0 && Un.update(on, Jr, Nt || Ct)
                    }
                    Bn && Bn(Yr, Jr),
                    Jr.detectedPlanes && mt.dispatchEvent({
                        type: "planesdetected",
                        data: Jr
                    }),
                    Xt = null
                }),
                this.setAnimationLoop = function(Yr) {
                    Bn = Yr
                }
                ,
                this.dispose = function() {}
            }
        }
        function rS(Tt, tt) {
            function lt(ft, xt) {
                ft.matrixAutoUpdate === !0 && ft.updateMatrix(),
                xt.value.copy(ft.matrix)
            }
            function mt(ft, xt) {
                ft.opacity.value = xt.opacity,
                xt.color && ft.diffuse.value.copy(xt.color),
                xt.emissive && ft.emissive.value.copy(xt.emissive).multiplyScalar(xt.emissiveIntensity),
                xt.map && (ft.map.value = xt.map,
                lt(xt.map, ft.mapTransform)),
                xt.alphaMap && (ft.alphaMap.value = xt.alphaMap,
                lt(xt.alphaMap, ft.alphaMapTransform)),
                xt.bumpMap && (ft.bumpMap.value = xt.bumpMap,
                lt(xt.bumpMap, ft.bumpMapTransform),
                ft.bumpScale.value = xt.bumpScale,
                xt.side === bt && (ft.bumpScale.value *= -1)),
                xt.normalMap && (ft.normalMap.value = xt.normalMap,
                lt(xt.normalMap, ft.normalMapTransform),
                ft.normalScale.value.copy(xt.normalScale),
                xt.side === bt && ft.normalScale.value.negate()),
                xt.displacementMap && (ft.displacementMap.value = xt.displacementMap,
                lt(xt.displacementMap, ft.displacementMapTransform),
                ft.displacementScale.value = xt.displacementScale,
                ft.displacementBias.value = xt.displacementBias),
                xt.emissiveMap && (ft.emissiveMap.value = xt.emissiveMap,
                lt(xt.emissiveMap, ft.emissiveMapTransform)),
                xt.specularMap && (ft.specularMap.value = xt.specularMap,
                lt(xt.specularMap, ft.specularMapTransform)),
                xt.alphaTest > 0 && (ft.alphaTest.value = xt.alphaTest);
                const Ct = tt.get(xt).envMap;
                if (Ct) {
                    ft.envMap.value = Ct;
                    const Mt = xt.envMap || tt.get(xt).environment || Ct;
                    ft.envMapRotation.value = Mt ? Mt.rotation : 0,
                    ft.flipEnvMap.value = Ct.isCubeTexture && Ct.isRenderTargetTexture === !1 ? -1 : 1,
                    ft.reflectivity.value = xt.reflectivity,
                    ft.ior.value = xt.ior,
                    ft.refractionRatio.value = xt.refractionRatio
                }
                if (xt.lightMap) {
                    ft.lightMap.value = xt.lightMap;
                    const Mt = Tt._useLegacyLights === !0 ? Math.PI : 1;
                    ft.lightMapIntensity.value = xt.lightMapIntensity * Mt,
                    lt(xt.lightMap, ft.lightMapTransform)
                }
                xt.aoMap && (ft.aoMap.value = xt.aoMap,
                ft.aoMapIntensity.value = xt.aoMapIntensity,
                lt(xt.aoMap, ft.aoMapTransform))
            }
            return {
                refreshTransformUniform: lt,
                refreshFogUniforms: function(ft, xt) {
                    xt.color.getRGB(ft.fogColor.value, jy(Tt)),
                    xt.isFog ? (ft.fogNear.value = xt.near,
                    ft.fogFar.value = xt.far) : xt.isFogExp2 && (ft.fogDensity.value = xt.density)
                },
                refreshMaterialUniforms: function(ft, xt, Ct, Mt, Lt) {
                    xt.isMeshBasicMaterial || xt.isMeshLambertMaterial ? mt(ft, xt) : xt.isMeshToonMaterial ? (mt(ft, xt),
                    function(Nt, jt) {
                        jt.gradientMap && (Nt.gradientMap.value = jt.gradientMap)
                    }(ft, xt)) : xt.isMeshPhongMaterial ? (mt(ft, xt),
                    function(Nt, jt) {
                        Nt.specular.value.copy(jt.specular),
                        Nt.shininess.value = Math.max(jt.shininess, 1e-4)
                    }(ft, xt)) : xt.isMeshStandardMaterial ? (mt(ft, xt),
                    function(Nt, jt) {
                        Nt.metalness.value = jt.metalness,
                        jt.metalnessMap && (Nt.metalnessMap.value = jt.metalnessMap,
                        lt(jt.metalnessMap, Nt.metalnessMapTransform)),
                        Nt.roughness.value = jt.roughness,
                        jt.roughnessMap && (Nt.roughnessMap.value = jt.roughnessMap,
                        lt(jt.roughnessMap, Nt.roughnessMapTransform)),
                        tt.get(jt).envMap && (Nt.envMapIntensity.value = jt.envMapIntensity)
                    }(ft, xt),
                    xt.isMeshPhysicalMaterial && function(Nt, jt, Wt) {
                        Nt.ior.value = jt.ior,
                        jt.sheen > 0 && (Nt.sheenColor.value.copy(jt.sheenColor).multiplyScalar(jt.sheen),
                        Nt.sheenRoughness.value = jt.sheenRoughness,
                        jt.sheenColorMap && (Nt.sheenColorMap.value = jt.sheenColorMap,
                        lt(jt.sheenColorMap, Nt.sheenColorMapTransform)),
                        jt.sheenRoughnessMap && (Nt.sheenRoughnessMap.value = jt.sheenRoughnessMap,
                        lt(jt.sheenRoughnessMap, Nt.sheenRoughnessMapTransform))),
                        jt.clearcoat > 0 && (Nt.clearcoat.value = jt.clearcoat,
                        Nt.clearcoatRoughness.value = jt.clearcoatRoughness,
                        jt.clearcoatMap && (Nt.clearcoatMap.value = jt.clearcoatMap,
                        lt(jt.clearcoatMap, Nt.clearcoatMapTransform)),
                        jt.clearcoatRoughnessMap && (Nt.clearcoatRoughnessMap.value = jt.clearcoatRoughnessMap,
                        lt(jt.clearcoatRoughnessMap, Nt.clearcoatRoughnessMapTransform)),
                        jt.clearcoatNormalMap && (Nt.clearcoatNormalMap.value = jt.clearcoatNormalMap,
                        lt(jt.clearcoatNormalMap, Nt.clearcoatNormalMapTransform),
                        Nt.clearcoatNormalScale.value.copy(jt.clearcoatNormalScale),
                        jt.side === bt && Nt.clearcoatNormalScale.value.negate())),
                        jt.iridescence > 0 && (Nt.iridescence.value = jt.iridescence,
                        Nt.iridescenceIOR.value = jt.iridescenceIOR,
                        Nt.iridescenceThicknessMinimum.value = jt.iridescenceThicknessRange[0],
                        Nt.iridescenceThicknessMaximum.value = jt.iridescenceThicknessRange[1],
                        jt.iridescenceMap && (Nt.iridescenceMap.value = jt.iridescenceMap,
                        lt(jt.iridescenceMap, Nt.iridescenceMapTransform)),
                        jt.iridescenceThicknessMap && (Nt.iridescenceThicknessMap.value = jt.iridescenceThicknessMap,
                        lt(jt.iridescenceThicknessMap, Nt.iridescenceThicknessMapTransform))),
                        jt.transmission > 0 && (Nt.transmission.value = jt.transmission,
                        Nt.transmissionSamplerMap.value = Wt.texture,
                        Nt.transmissionSamplerSize.value.set(Wt.width, Wt.height),
                        jt.transmissionMap && (Nt.transmissionMap.value = jt.transmissionMap,
                        lt(jt.transmissionMap, Nt.transmissionMapTransform)),
                        Nt.thickness.value = jt.thickness,
                        jt.thicknessMap && (Nt.thicknessMap.value = jt.thicknessMap,
                        lt(jt.thicknessMap, Nt.thicknessMapTransform)),
                        Nt.attenuationDistance.value = jt.attenuationDistance,
                        Nt.attenuationColor.value.copy(jt.attenuationColor)),
                        jt.anisotropy > 0 && (Nt.anisotropyVector.value.set(jt.anisotropy * Math.cos(jt.anisotropyRotation), jt.anisotropy * Math.sin(jt.anisotropyRotation)),
                        jt.anisotropyMap && (Nt.anisotropyMap.value = jt.anisotropyMap,
                        lt(jt.anisotropyMap, Nt.anisotropyMapTransform))),
                        Nt.specularIntensity.value = jt.specularIntensity,
                        Nt.specularColor.value.copy(jt.specularColor),
                        jt.specularColorMap && (Nt.specularColorMap.value = jt.specularColorMap,
                        lt(jt.specularColorMap, Nt.specularColorMapTransform)),
                        jt.specularIntensityMap && (Nt.specularIntensityMap.value = jt.specularIntensityMap,
                        lt(jt.specularIntensityMap, Nt.specularIntensityMapTransform))
                    }(ft, xt, Lt)) : xt.isMeshMatcapMaterial ? (mt(ft, xt),
                    function(Nt, jt) {
                        jt.matcap && (Nt.matcap.value = jt.matcap)
                    }(ft, xt)) : xt.isMeshDepthMaterial ? mt(ft, xt) : xt.isMeshDistanceMaterial ? (mt(ft, xt),
                    function(Nt, jt) {
                        const Wt = tt.get(jt).light;
                        Nt.referencePosition.value.setFromMatrixPosition(Wt.matrixWorld),
                        Nt.nearDistance.value = Wt.shadow.camera.near,
                        Nt.farDistance.value = Wt.shadow.camera.far
                    }(ft, xt)) : xt.isMeshNormalMaterial ? mt(ft, xt) : xt.isLineBasicMaterial ? (function(Nt, jt) {
                        Nt.diffuse.value.copy(jt.color),
                        Nt.opacity.value = jt.opacity,
                        jt.map && (Nt.map.value = jt.map,
                        lt(jt.map, Nt.mapTransform))
                    }(ft, xt),
                    xt.isLineDashedMaterial && function(Nt, jt) {
                        Nt.dashSize.value = jt.dashSize,
                        Nt.totalSize.value = jt.dashSize + jt.gapSize,
                        Nt.scale.value = jt.scale
                    }(ft, xt)) : xt.isPointsMaterial ? function(Nt, jt, Wt, Qt) {
                        Nt.diffuse.value.copy(jt.color),
                        Nt.opacity.value = jt.opacity,
                        Nt.size.value = jt.size * Wt,
                        Nt.scale.value = .5 * Qt,
                        jt.map && (Nt.map.value = jt.map,
                        lt(jt.map, Nt.uvTransform)),
                        jt.alphaMap && (Nt.alphaMap.value = jt.alphaMap,
                        lt(jt.alphaMap, Nt.alphaMapTransform)),
                        jt.alphaTest > 0 && (Nt.alphaTest.value = jt.alphaTest)
                    }(ft, xt, Ct, Mt) : xt.isSpriteMaterial ? function(Nt, jt) {
                        Nt.diffuse.value.copy(jt.color),
                        Nt.opacity.value = jt.opacity,
                        Nt.rotation.value = jt.rotation,
                        jt.map && (Nt.map.value = jt.map,
                        lt(jt.map, Nt.mapTransform)),
                        jt.alphaMap && (Nt.alphaMap.value = jt.alphaMap,
                        lt(jt.alphaMap, Nt.alphaMapTransform)),
                        jt.alphaTest > 0 && (Nt.alphaTest.value = jt.alphaTest)
                    }(ft, xt) : xt.isShadowMaterial ? (ft.color.value.copy(xt.color),
                    ft.opacity.value = xt.opacity) : xt.isShaderMaterial && (xt.transmission !== void 0 && (ft.transmission && (ft.transmission.value = xt.transmission),
                    ft.transmissionSamplerMap && Lt && (ft.transmissionSamplerMap.value = Lt ? Lt.texture : null),
                    ft.transmissionSamplerSize && Lt && ft.transmissionSamplerSize.value.set(Lt.width, Lt.height)),
                    xt.uniformsNeedUpdate = !1)
                }
            }
        }
        function nS(Tt, tt, lt, mt) {
            let ft = {}
              , xt = {}
              , Ct = [];
            const Mt = lt.isWebGL2 ? Tt.getParameter(Tt.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
            function Lt(Wt, Qt, qt) {
                const Xt = Wt.value;
                if (qt[Qt] === void 0) {
                    if (typeof Xt == "number")
                        qt[Qt] = Xt;
                    else {
                        const Zt = Array.isArray(Xt) ? Xt : [Xt]
                          , Yt = [];
                        for (let sr = 0; sr < Zt.length; sr++)
                            Yt.push(Zt[sr].clone());
                        qt[Qt] = Yt
                    }
                    return !0
                }
                if (typeof Xt == "number") {
                    if (qt[Qt] !== Xt)
                        return qt[Qt] = Xt,
                        !0
                } else {
                    const Zt = Array.isArray(qt[Qt]) ? qt[Qt] : [qt[Qt]]
                      , Yt = Array.isArray(Xt) ? Xt : [Xt];
                    for (let sr = 0; sr < Zt.length; sr++) {
                        const er = Zt[sr];
                        if (er.equals(Yt[sr]) === !1)
                            return er.copy(Yt[sr]),
                            !0
                    }
                }
                return !1
            }
            function Nt(Wt) {
                const Qt = {
                    boundary: 0,
                    storage: 0
                };
                return typeof Wt == "number" ? (Qt.boundary = 4,
                Qt.storage = 4) : Wt.isVector2 ? (Qt.boundary = 8,
                Qt.storage = 8) : Wt.isVector3 || Wt.isColor ? (Qt.boundary = 16,
                Qt.storage = 12) : Wt.isVector4 ? (Qt.boundary = 16,
                Qt.storage = 16) : Wt.isMatrix3 ? (Qt.boundary = 48,
                Qt.storage = 48) : Wt.isMatrix4 ? (Qt.boundary = 64,
                Qt.storage = 64) : Wt.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", Wt),
                Qt
            }
            function jt(Wt) {
                const Qt = Wt.target;
                Qt.removeEventListener("dispose", jt);
                const qt = Ct.indexOf(Qt.__bindingPointIndex);
                Ct.splice(qt, 1),
                Tt.deleteBuffer(ft[Qt.id]),
                delete ft[Qt.id],
                delete xt[Qt.id]
            }
            return {
                bind: function(Wt, Qt) {
                    const qt = Qt.program;
                    mt.uniformBlockBinding(Wt, qt)
                },
                update: function(Wt, Qt) {
                    let qt = ft[Wt.id];
                    qt === void 0 && (function(Yt) {
                        const sr = Yt.uniforms;
                        let er = 0
                          , rr = 0;
                        for (let xr = 0, br = sr.length; xr < br; xr++) {
                            const yr = sr[xr]
                              , Pr = {
                                boundary: 0,
                                storage: 0
                            }
                              , zr = Array.isArray(yr.value) ? yr.value : [yr.value];
                            for (let Nr = 0, Vr = zr.length; Nr < Vr; Nr++) {
                                const Gr = Nt(zr[Nr]);
                                Pr.boundary += Gr.boundary,
                                Pr.storage += Gr.storage
                            }
                            yr.__data = new Float32Array(Pr.storage / Float32Array.BYTES_PER_ELEMENT),
                            yr.__offset = er,
                            xr > 0 && (rr = er % 16,
                            rr !== 0 && 16 - rr - Pr.boundary < 0 && (er += 16 - rr,
                            yr.__offset = er)),
                            er += Pr.storage
                        }
                        rr = er % 16,
                        rr > 0 && (er += 16 - rr),
                        Yt.__size = er,
                        Yt.__cache = {}
                    }(Wt),
                    qt = function(Yt) {
                        const sr = function() {
                            for (let br = 0; br < Mt; br++)
                                if (Ct.indexOf(br) === -1)
                                    return Ct.push(br),
                                    br;
                            return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
                            0
                        }();
                        Yt.__bindingPointIndex = sr;
                        const er = Tt.createBuffer()
                          , rr = Yt.__size
                          , xr = Yt.usage;
                        return Tt.bindBuffer(Tt.UNIFORM_BUFFER, er),
                        Tt.bufferData(Tt.UNIFORM_BUFFER, rr, xr),
                        Tt.bindBuffer(Tt.UNIFORM_BUFFER, null),
                        Tt.bindBufferBase(Tt.UNIFORM_BUFFER, sr, er),
                        er
                    }(Wt),
                    ft[Wt.id] = qt,
                    Wt.addEventListener("dispose", jt));
                    const Xt = Qt.program;
                    mt.updateUBOMapping(Wt, Xt);
                    const Zt = tt.render.frame;
                    xt[Wt.id] !== Zt && (function(Yt) {
                        const sr = ft[Yt.id]
                          , er = Yt.uniforms
                          , rr = Yt.__cache;
                        Tt.bindBuffer(Tt.UNIFORM_BUFFER, sr);
                        for (let xr = 0, br = er.length; xr < br; xr++) {
                            const yr = er[xr];
                            if (Lt(yr, xr, rr) === !0) {
                                const Pr = yr.__offset
                                  , zr = Array.isArray(yr.value) ? yr.value : [yr.value];
                                let Nr = 0;
                                for (let Vr = 0; Vr < zr.length; Vr++) {
                                    const Gr = zr[Vr]
                                      , Hr = Nt(Gr);
                                    typeof Gr == "number" ? (yr.__data[0] = Gr,
                                    Tt.bufferSubData(Tt.UNIFORM_BUFFER, Pr + Nr, yr.__data)) : Gr.isMatrix3 ? (yr.__data[0] = Gr.elements[0],
                                    yr.__data[1] = Gr.elements[1],
                                    yr.__data[2] = Gr.elements[2],
                                    yr.__data[3] = Gr.elements[0],
                                    yr.__data[4] = Gr.elements[3],
                                    yr.__data[5] = Gr.elements[4],
                                    yr.__data[6] = Gr.elements[5],
                                    yr.__data[7] = Gr.elements[0],
                                    yr.__data[8] = Gr.elements[6],
                                    yr.__data[9] = Gr.elements[7],
                                    yr.__data[10] = Gr.elements[8],
                                    yr.__data[11] = Gr.elements[0]) : (Gr.toArray(yr.__data, Nr),
                                    Nr += Hr.storage / Float32Array.BYTES_PER_ELEMENT)
                                }
                                Tt.bufferSubData(Tt.UNIFORM_BUFFER, Pr, yr.__data)
                            }
                        }
                        Tt.bindBuffer(Tt.UNIFORM_BUFFER, null)
                    }(Wt),
                    xt[Wt.id] = Zt)
                },
                dispose: function() {
                    for (const Wt in ft)
                        Tt.deleteBuffer(ft[Wt]);
                    Ct = [],
                    ft = {},
                    xt = {}
                }
            }
        }
        class xx {
            constructor(tt={}) {
                const {canvas: lt=Zm(), context: mt=null, depth: ft=!0, stencil: xt=!0, alpha: Ct=!1, antialias: Mt=!1, premultipliedAlpha: Lt=!0, preserveDrawingBuffer: Nt=!1, powerPreference: jt="default", failIfMajorPerformanceCaveat: Wt=!1} = tt;
                let Qt;
                this.isWebGLRenderer = !0,
                Qt = mt !== null ? mt.getContextAttributes().alpha : Ct;
                const qt = new Uint32Array(4)
                  , Xt = new Int32Array(4);
                let Zt = null
                  , Yt = null;
                const sr = []
                  , er = [];
                this.domElement = lt,
                this.debug = {
                    checkShaderErrors: !0,
                    onShaderError: null
                },
                this.autoClear = !0,
                this.autoClearColor = !0,
                this.autoClearDepth = !0,
                this.autoClearStencil = !0,
                this.sortObjects = !0,
                this.clippingPlanes = [],
                this.localClippingEnabled = !1,
                this._outputColorSpace = jo,
                this._useLegacyLights = !1,
                this.toneMapping = Ur,
                this.toneMappingExposure = 1,
                this.userData = {},
                this.onContextLost = () => {}
                ,
                this.onContextRestore = () => {}
                ,
                this.onContextCreationError = () => {}
                ;
                const rr = this;
                let xr = !1
                  , br = 0
                  , yr = 0
                  , Pr = null
                  , zr = -1
                  , Nr = null;
                const Vr = new Lo
                  , Gr = new Lo;
                let Hr = null;
                const _n = new Gn(0);
                let dn = 0
                  , kn = lt.width
                  , Bn = lt.height
                  , cn = 1
                  , Yr = null
                  , Jr = null;
                const sn = new Lo(0,0,kn,Bn)
                  , on = new Lo(0,0,kn,Bn);
                let Un = !1;
                const ro = new Av;
                let Zn = !1
                  , jn = !1
                  , uo = null;
                const Dr = new no
                  , Sr = new mn
                  , Fr = new Er
                  , Wr = {
                    background: null,
                    fog: null,
                    environment: null,
                    overrideMaterial: null,
                    isScene: !0
                };
                function kr() {
                    return Pr === null ? cn : 1
                }
                let _r, Br, Lr, Xr, Kr, An, pn, _o, to, Pn, eo, Kn, po, Ao, Fo, Io, Jn, Co, yl, ho, Qo, Po, Cu, Pu, en = mt;
                function g0(Mr, tn) {
                    for (let an = 0; an < Mr.length; an++) {
                        const un = Mr[an]
                          , yn = lt.getContext(un, tn);
                        if (yn !== null)
                            return yn
                    }
                    return null
                }
                try {
                    const Mr = {
                        alpha: !0,
                        depth: ft,
                        stencil: xt,
                        antialias: Mt,
                        premultipliedAlpha: Lt,
                        preserveDrawingBuffer: Nt,
                        powerPreference: jt,
                        failIfMajorPerformanceCaveat: Wt
                    };
                    if ("setAttribute"in lt && lt.setAttribute("data-engine", `three.js r${h}`),
                    lt.addEventListener("webglcontextlost", F_, !1),
                    lt.addEventListener("webglcontextrestored", ow, !1),
                    lt.addEventListener("webglcontextcreationerror", sw, !1),
                    en === null) {
                        const tn = ["webgl2", "webgl", "experimental-webgl"];
                        if (rr.isWebGL1Renderer === !0 && tn.shift(),
                        en = g0(tn, Mr),
                        en === null)
                            throw g0(tn) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
                    }
                    typeof WebGLRenderingContext < "u" && en instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),
                    en.getShaderPrecisionFormat === void 0 && (en.getShaderPrecisionFormat = function() {
                        return {
                            rangeMin: 1,
                            rangeMax: 1,
                            precision: 1
                        }
                    }
                    )
                } catch (Mr) {
                    throw console.error("THREE.WebGLRenderer: " + Mr.message),
                    Mr
                }
                function _0() {
                    _r = new kw(en),
                    Br = new Pw(en,_r,tt),
                    _r.init(Br),
                    Po = new _x(en,_r,Br),
                    Lr = new J1(en,_r,Br),
                    Xr = new Lw(en),
                    Kr = new z1,
                    An = new Z1(en,_r,Lr,Kr,Br,Po,Xr),
                    pn = new Rw(rr),
                    _o = new Iw(rr),
                    to = new Sw(en,Br),
                    Cu = new Tw(en,_r,to,Br),
                    Pn = new Dw(en,to,Xr,Cu),
                    eo = new Uw(en,Pn,to,Xr),
                    yl = new Fw(en,Br,An),
                    Io = new Mw(Kr),
                    Kn = new G1(rr,pn,_o,_r,Br,Cu,Io),
                    po = new rS(rr,Kr),
                    Ao = new Q1,
                    Fo = new Y1(_r,Br),
                    Co = new Ew(rr,pn,_o,Lr,eo,Qt,Lt),
                    Jn = new K1(rr,eo,Br),
                    Pu = new nS(en,Xr,Br,Lr),
                    ho = new Cw(en,_r,Xr,Br),
                    Qo = new Bw(en,_r,Xr,Br),
                    Xr.programs = Kn.programs,
                    rr.capabilities = Br,
                    rr.extensions = _r,
                    rr.properties = Kr,
                    rr.renderLists = Ao,
                    rr.shadowMap = Jn,
                    rr.state = Lr,
                    rr.info = Xr,
                    rr.background = Co,
                    rr.cubemaps = pn,
                    rr.cubeuvmaps = _o,
                    rr.materials = po
                }
                _0();
                const Bs = new tS(rr,en);
                function F_(Mr) {
                    Mr.preventDefault(),
                    console.log("THREE.WebGLRenderer: Context Lost."),
                    xr = !0,
                    rr.onContextLost(Mr)
                }
                function ow() {
                    console.log("THREE.WebGLRenderer: Context Restored."),
                    xr = !1;
                    const Mr = rr.info ? rr.info.autoReset : void 0
                      , tn = Jn.enabled
                      , an = Jn.autoUpdate
                      , un = Jn.needsUpdate
                      , yn = Jn.type;
                    _0(),
                    rr.info && Mr !== void 0 && (rr.info.autoReset = Mr),
                    Jn.enabled = tn,
                    Jn.autoUpdate = an,
                    Jn.needsUpdate = un,
                    Jn.type = yn,
                    rr.onContextRestore && rr.onContextRestore()
                }
                function sw(Mr) {
                    console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", Mr.statusMessage),
                    rr.onContextCreationError(Mr)
                }
                function aw(Mr) {
                    const tn = Mr.target;
                    tn.removeEventListener("dispose", aw),
                    function(an) {
                        (function(un) {
                            const yn = Kr.get(un).programs;
                            yn !== void 0 && (yn.forEach(function(On) {
                                Kn.releaseProgram(On)
                            }),
                            un.isShaderMaterial && Kn.releaseShaderCache(un))
                        }
                        )(an),
                        Kr.remove(an)
                    }(tn)
                }
                this.xr = Bs,
                this.getContext = function() {
                    return en
                }
                ,
                this.getContextAttributes = function() {
                    return en.getContextAttributes()
                }
                ,
                this.forceContextLoss = function() {
                    const Mr = _r.get("WEBGL_lose_context");
                    Mr && Mr.loseContext()
                }
                ,
                this.forceContextRestore = function() {
                    const Mr = _r.get("WEBGL_lose_context");
                    Mr && Mr.restoreContext()
                }
                ,
                this.getPixelRatio = function() {
                    return cn
                }
                ,
                this.setPixelRatio = function(Mr) {
                    Mr !== void 0 && (cn = Mr,
                    this.setSize(kn, Bn, !1))
                }
                ,
                this.getSize = function(Mr) {
                    return Mr.set(kn, Bn)
                }
                ,
                this.setSize = function(Mr, tn, an=!0) {
                    Bs.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (kn = Mr,
                    Bn = tn,
                    lt.width = Math.floor(Mr * cn),
                    lt.height = Math.floor(tn * cn),
                    an === !0 && (lt.style.width = Mr + "px",
                    lt.style.height = tn + "px"),
                    this.setViewport(0, 0, Mr, tn))
                }
                ,
                this.getDrawingBufferSize = function(Mr) {
                    return Mr.set(kn * cn, Bn * cn).floor()
                }
                ,
                this.setDrawingBufferSize = function(Mr, tn, an) {
                    kn = Mr,
                    Bn = tn,
                    cn = an,
                    lt.width = Math.floor(Mr * an),
                    lt.height = Math.floor(tn * an),
                    this.setViewport(0, 0, Mr, tn)
                }
                ,
                this.getCurrentViewport = function(Mr) {
                    return Mr.copy(Vr)
                }
                ,
                this.getViewport = function(Mr) {
                    return Mr.copy(sn)
                }
                ,
                this.setViewport = function(Mr, tn, an, un) {
                    Mr.isVector4 ? sn.set(Mr.x, Mr.y, Mr.z, Mr.w) : sn.set(Mr, tn, an, un),
                    Lr.viewport(Vr.copy(sn).multiplyScalar(cn).floor())
                }
                ,
                this.getScissor = function(Mr) {
                    return Mr.copy(on)
                }
                ,
                this.setScissor = function(Mr, tn, an, un) {
                    Mr.isVector4 ? on.set(Mr.x, Mr.y, Mr.z, Mr.w) : on.set(Mr, tn, an, un),
                    Lr.scissor(Gr.copy(on).multiplyScalar(cn).floor())
                }
                ,
                this.getScissorTest = function() {
                    return Un
                }
                ,
                this.setScissorTest = function(Mr) {
                    Lr.setScissorTest(Un = Mr)
                }
                ,
                this.setOpaqueSort = function(Mr) {
                    Yr = Mr
                }
                ,
                this.setTransparentSort = function(Mr) {
                    Jr = Mr
                }
                ,
                this.getClearColor = function(Mr) {
                    return Mr.copy(Co.getClearColor())
                }
                ,
                this.setClearColor = function() {
                    Co.setClearColor.apply(Co, arguments)
                }
                ,
                this.getClearAlpha = function() {
                    return Co.getClearAlpha()
                }
                ,
                this.setClearAlpha = function() {
                    Co.setClearAlpha.apply(Co, arguments)
                }
                ,
                this.clear = function(Mr=!0, tn=!0, an=!0) {
                    let un = 0;
                    if (Mr) {
                        let yn = !1;
                        if (Pr !== null) {
                            const On = Pr.texture.format;
                            yn = On === ko || On === yo || On === Ks
                        }
                        if (yn) {
                            const On = Pr.texture.type
                              , To = On === $n || On === Yo || On === Zo || On === Ps || On === $l || On === wl
                              , _i = Co.getClearColor()
                              , fo = Co.getClearAlpha()
                              , wo = _i.r
                              , So = _i.g
                              , so = _i.b;
                            To ? (qt[0] = wo,
                            qt[1] = So,
                            qt[2] = so,
                            qt[3] = fo,
                            en.clearBufferuiv(en.COLOR, 0, qt)) : (Xt[0] = wo,
                            Xt[1] = So,
                            Xt[2] = so,
                            Xt[3] = fo,
                            en.clearBufferiv(en.COLOR, 0, Xt))
                        } else
                            un |= en.COLOR_BUFFER_BIT
                    }
                    tn && (un |= en.DEPTH_BUFFER_BIT),
                    an && (un |= en.STENCIL_BUFFER_BIT),
                    en.clear(un)
                }
                ,
                this.clearColor = function() {
                    this.clear(!0, !1, !1)
                }
                ,
                this.clearDepth = function() {
                    this.clear(!1, !0, !1)
                }
                ,
                this.clearStencil = function() {
                    this.clear(!1, !1, !0)
                }
                ,
                this.dispose = function() {
                    lt.removeEventListener("webglcontextlost", F_, !1),
                    lt.removeEventListener("webglcontextrestored", ow, !1),
                    lt.removeEventListener("webglcontextcreationerror", sw, !1),
                    Ao.dispose(),
                    Fo.dispose(),
                    Kr.dispose(),
                    pn.dispose(),
                    _o.dispose(),
                    eo.dispose(),
                    Cu.dispose(),
                    Pu.dispose(),
                    Kn.dispose(),
                    Bs.dispose(),
                    Bs.removeEventListener("sessionstart", lw),
                    Bs.removeEventListener("sessionend", cw),
                    uo && (uo.dispose(),
                    uo = null),
                    Fp.stop()
                }
                ,
                this.renderBufferDirect = function(Mr, tn, an, un, yn, On) {
                    tn === null && (tn = Wr);
                    const To = yn.isMesh && yn.matrixWorld.determinant() < 0
                      , _i = function(ns, Al, Xs, io, Jo) {
                        Al.isScene !== !0 && (Al = Wr),
                        An.resetTextureUnits();
                        const U_ = Al.fog
                          , xE = io.userData && io.userData.envMapSlotKey && Al.textureSlots && Al.textureSlots[io.userData.envMapSlotKey] ? Al.textureSlots[io.userData.envMapSlotKey] : io.isMeshStandardMaterial ? Al.environment : null
                          , bE = Pr === null ? rr.outputColorSpace : Pr.isXRRenderTarget === !0 || Pr.texture.colorSpace && Pr.texture.colorSpace !== jo ? Pr.texture.colorSpace : Xo
                          , b0 = (io.isMeshStandardMaterial ? _o : pn).get(io.envMap || xE)
                          , AE = io.vertexColors === !0 && !!Xs.attributes.color && Xs.attributes.color.itemSize === 4
                          , wE = !!Xs.attributes.tangent && (!!io.normalMap || io.anisotropy > 0 || Xs.userData.__forceUseTangent)
                          , SE = !!Xs.morphAttributes.position
                          , EE = !!Xs.morphAttributes.normal
                          , TE = !!Xs.morphAttributes.color;
                        let mw = Ur;
                        io.toneMapped && (Pr !== null && Pr.isXRRenderTarget !== !0 || (mw = rr.toneMapping));
                        const fw = Xs.morphAttributes.position || Xs.morphAttributes.normal || Xs.morphAttributes.color
                          , CE = fw !== void 0 ? fw.length : 0
                          , Uo = Kr.get(io)
                          , PE = Yt.state.lights;
                        if (Zn === !0 && (jn === !0 || ns !== Nr)) {
                            const zs = ns === Nr && io.id === zr;
                            Io.setState(io, ns, zs)
                        }
                        let Mu = !1;
                        io.version === Uo.__version ? Uo.needsLights && Uo.lightsStateVersion !== PE.state.version || Uo.outputColorSpace !== bE || Jo.isInstancedMesh && Uo.instancing === !1 ? Mu = !0 : Jo.isInstancedMesh || Uo.instancing !== !0 ? Jo.isSkinnedMesh && Uo.skinning === !1 ? Mu = !0 : Jo.isSkinnedMesh || Uo.skinning !== !0 ? Jo.isInstancedMesh && Uo.instancingColor === !0 && Jo.instanceColor === null || Jo.isInstancedMesh && Uo.instancingColor === !1 && Jo.instanceColor !== null || Uo.envMap !== b0 || io.fog === !0 && Uo.fog !== U_ ? Mu = !0 : Uo.numClippingPlanes === void 0 || Uo.numClippingPlanes === Io.numPlanes && Uo.numIntersection === Io.numIntersection ? (Uo.vertexAlphas !== AE || Uo.vertexTangents !== wE || Uo.morphTargets !== SE || Uo.morphNormals !== EE || Uo.morphColors !== TE || Uo.toneMapping !== mw || Br.isWebGL2 === !0 && Uo.morphTargetsCount !== CE) && (Mu = !0) : Mu = !0 : Mu = !0 : Mu = !0 : (Mu = !0,
                        Uo.__version = io.version);
                        let Up = Uo.currentProgram;
                        Mu === !0 && (Up = x0(io, Al, Jo));
                        let gw = !1
                          , j_ = !1
                          , Iy = !1;
                        const Ls = Up.getUniforms()
                          , jp = Uo.uniforms;
                        if (Lr.useProgram(Up.program) && (gw = !0,
                        j_ = !0,
                        Iy = !0),
                        io.id !== zr && (zr = io.id,
                        j_ = !0),
                        gw || Nr !== ns) {
                            Ls.setValue(en, "projectionMatrix", ns.projectionMatrix),
                            Ls.setValue(en, "viewMatrix", ns.matrixWorldInverse);
                            const zs = Ls.map.cameraPosition;
                            zs !== void 0 && zs.setValue(en, Fr.setFromMatrixPosition(ns.matrixWorld)),
                            Br.logarithmicDepthBuffer && Ls.setValue(en, "logDepthBufFC", 2 / (Math.log(ns.far + 1) / Math.LN2)),
                            (io.isMeshPhongMaterial || io.isMeshToonMaterial || io.isMeshLambertMaterial || io.isMeshBasicMaterial || io.isMeshStandardMaterial || io.isShaderMaterial) && Ls.setValue(en, "isOrthographic", ns.isOrthographicCamera === !0),
                            Nr !== ns && (Nr = ns,
                            j_ = !0,
                            Iy = !0)
                        }
                        if (Jo.isSkinnedMesh) {
                            Ls.setOptional(en, Jo, "bindMatrix"),
                            Ls.setOptional(en, Jo, "bindMatrixInverse");
                            const zs = Jo.skeleton;
                            zs && (Br.floatVertexTextures ? (zs.boneTexture === null && zs.computeBoneTexture(),
                            Ls.setValue(en, "boneTexture", zs.boneTexture, An),
                            Ls.setValue(en, "boneTextureSize", zs.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))
                        }
                        const ky = Xs.morphAttributes;
                        var au, Wl;
                        (ky.position !== void 0 || ky.normal !== void 0 || ky.color !== void 0 && Br.isWebGL2 === !0) && yl.update(Jo, Xs, Up),
                        (j_ || Uo.receiveShadow !== Jo.receiveShadow) && (Uo.receiveShadow = Jo.receiveShadow,
                        Ls.setValue(en, "receiveShadow", Jo.receiveShadow)),
                        io.isMeshGouraudMaterial && io.envMap !== null && (jp.envMap.value = b0,
                        jp.flipEnvMap.value = b0.isCubeTexture && b0.isRenderTargetTexture === !1 ? -1 : 1),
                        j_ && (Ls.setValue(en, "toneMappingExposure", rr.toneMappingExposure),
                        Uo.needsLights && (Wl = Iy,
                        (au = jp).ambientLightColor.needsUpdate = Wl,
                        au.lightProbe.needsUpdate = Wl,
                        au.directionalLights.needsUpdate = Wl,
                        au.directionalLightShadows.needsUpdate = Wl,
                        au.pointLights.needsUpdate = Wl,
                        au.pointLightShadows.needsUpdate = Wl,
                        au.spotLights.needsUpdate = Wl,
                        au.spotLightShadows.needsUpdate = Wl,
                        au.rectAreaLights.needsUpdate = Wl,
                        au.hemisphereLights.needsUpdate = Wl),
                        U_ && io.fog === !0 && po.refreshFogUniforms(jp, U_),
                        po.refreshMaterialUniforms(jp, io, cn, Bn, rr.userData.transmissionRenderTarget || uo),
                        Cv.upload(en, Uo.uniformsList, jp, An)),
                        io.isShaderMaterial && io.uniformsNeedUpdate === !0 && (Cv.upload(en, Uo.uniformsList, jp, An),
                        io.uniformsNeedUpdate = !1),
                        io.isSpriteMaterial && Ls.setValue(en, "center", Jo.center),
                        Ls.setValue(en, "modelViewMatrix", Jo.modelViewMatrix),
                        Ls.setValue(en, "normalMatrix", Jo.normalMatrix),
                        Ls.setValue(en, "modelMatrix", Jo.matrixWorld);
                        const _w = io.extraUniformsToUpload;
                        if (_w && Object.entries(_w).forEach( ([zs,V_]) => Ls.setValue(en, zs, V_.value, An)),
                        io.isShaderMaterial || io.isRawShaderMaterial) {
                            const zs = io.uniformsGroups;
                            for (let V_ = 0, ME = zs.length; V_ < ME; V_++)
                                if (Br.isWebGL2) {
                                    const yw = zs[V_];
                                    Pu.update(yw, Up),
                                    Pu.bind(yw, Up)
                                } else
                                    console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")
                        }
                        return Up
                    }(Mr, tn, an, un, yn);
                    Lr.setMaterial(un, To);
                    let fo = an.index
                      , wo = 1;
                    if (un.wireframe === !0) {
                        if (fo = Pn.getWireframeAttribute(an),
                        fo === void 0)
                            return;
                        wo = 2
                    }
                    const So = an.drawRange
                      , so = an.attributes.position;
                    let _s = So.start * wo
                      , xl = (So.start + So.count) * wo;
                    On !== null && (_s = Math.max(_s, On.start * wo),
                    xl = Math.min(xl, (On.start + On.count) * wo)),
                    fo !== null ? (_s = Math.max(_s, 0),
                    xl = Math.min(xl, fo.count)) : so != null && (_s = Math.max(_s, 0),
                    xl = Math.min(xl, so.count));
                    const vs = xl - _s;
                    if (vs < 0 || vs === 1 / 0)
                        return;
                    let ip;
                    Cu.setup(yn, un, _i, an, fo);
                    let ls = ho;
                    if (fo !== null && (ip = to.get(fo),
                    ls = Qo,
                    ls.setIndex(ip)),
                    yn.isMesh)
                        un.wireframe === !0 ? (Lr.setLineWidth(un.wireframeLinewidth * kr()),
                        ls.setMode(en.LINES)) : ls.setMode(en.TRIANGLES);
                    else if (yn.isLine) {
                        let ns = un.linewidth;
                        ns === void 0 && (ns = 1),
                        Lr.setLineWidth(ns * kr()),
                        yn.isLineSegments ? ls.setMode(en.LINES) : yn.isLineLoop ? ls.setMode(en.LINE_LOOP) : ls.setMode(en.LINE_STRIP)
                    } else
                        yn.isPoints ? ls.setMode(en.POINTS) : yn.isSprite && ls.setMode(en.TRIANGLES);
                    if (yn.isInstancedMesh)
                        ls.renderInstances(_s, vs, yn.count);
                    else if (an.isInstancedBufferGeometry) {
                        const ns = an._maxInstanceCount !== void 0 ? an._maxInstanceCount : 1 / 0
                          , Al = Math.min(an.instanceCount, ns);
                        ls.renderInstances(_s, vs, Al)
                    } else
                        ls.render(_s, vs)
                }
                ,
                this.compile = function(Mr, tn) {
                    function an(un, yn, On) {
                        un.transparent === !0 && un.side === St && un.forceSinglePass === !1 ? (un.side = bt,
                        un.needsUpdate = !0,
                        x0(un, yn, On),
                        un.side = vt,
                        un.needsUpdate = !0,
                        x0(un, yn, On),
                        un.side = St) : x0(un, yn, On)
                    }
                    Yt = Fo.get(Mr),
                    Yt.init(),
                    er.push(Yt),
                    Mr.traverseVisible(function(un) {
                        un.isLight && un.layers.test(tn.layers) && (Yt.pushLight(un),
                        un.castShadow && Yt.pushShadow(un))
                    }),
                    Yt.setupLights(rr._useLegacyLights),
                    Mr.traverse(function(un) {
                        const yn = un.material;
                        if (yn)
                            if (Array.isArray(yn))
                                for (let On = 0; On < yn.length; On++)
                                    an(yn[On], Mr, un);
                            else
                                an(yn, Mr, un)
                    }),
                    er.pop(),
                    Yt = null
                }
                ;
                let Ry = null;
                function lw() {
                    Fp.stop()
                }
                function cw() {
                    Fp.start()
                }
                const Fp = new Hy;
                function uw(Mr, tn, an, un) {
                    if (Mr.visible === !1)
                        return;
                    if (Mr.layers.test(tn.layers)) {
                        if (Mr.isGroup)
                            an = Mr.renderOrder;
                        else if (Mr.isLOD)
                            Mr.autoUpdate === !0 && Mr.update(tn);
                        else if (Mr.isLight)
                            Yt.pushLight(Mr),
                            Mr.castShadow && Yt.pushShadow(Mr);
                        else if (Mr.isSprite) {
                            if (!Mr.frustumCulled || ro.intersectsSprite(Mr)) {
                                un && Fr.setFromMatrixPosition(Mr.matrixWorld).applyMatrix4(Dr);
                                const On = eo.update(Mr)
                                  , To = Mr.material;
                                To.visible && Zt.push(Mr, On, To, an, Fr.z, null)
                            }
                        } else if ((Mr.isMesh || Mr.isLine || Mr.isPoints) && (!Mr.frustumCulled || ro.intersectsObject(Mr))) {
                            const On = eo.update(Mr)
                              , To = Mr.material;
                            if (un && (Mr.boundingSphere !== void 0 ? (Mr.boundingSphere === null && Mr.computeBoundingSphere(),
                            Fr.copy(Mr.boundingSphere.center)) : (On.boundingSphere === null && On.computeBoundingSphere(),
                            Fr.copy(On.boundingSphere.center)),
                            Fr.applyMatrix4(Mr.matrixWorld).applyMatrix4(Dr)),
                            Array.isArray(To)) {
                                const _i = On.groups;
                                for (let fo = 0, wo = _i.length; fo < wo; fo++) {
                                    const So = _i[fo]
                                      , so = To[So.materialIndex];
                                    so && so.visible && Zt.push(Mr, On, so, an, Fr.z, So)
                                }
                            } else
                                To.visible && Zt.push(Mr, On, To, an, Fr.z, null)
                        }
                    }
                    const yn = Mr.children;
                    for (let On = 0, To = yn.length; On < To; On++)
                        uw(yn[On], tn, an, un)
                }
                function dw(Mr, tn, an, un) {
                    const yn = Mr.opaque
                      , On = Mr.transmissive
                      , To = Mr.transparent;
                    if (Yt.setupLightsView(an),
                    Zn === !0 && Io.setGlobalState(rr.clippingPlanes, an),
                    rr.userData.transmissionRender === void 0 && rr.userData.renderTransmissionPass !== !1 && On.length > 0 && function(_i, fo, wo, So) {
                        console.warn("three.js internal render transmission pass should not be called");
                        const so = Br.isWebGL2;
                        uo === null && (uo = new Rs(1,1,{
                            generateMipmaps: !0,
                            type: _r.has("EXT_color_buffer_half_float") ? Os : $n,
                            minFilter: vo,
                            samples: so ? 4 : 0
                        })),
                        rr.getDrawingBufferSize(Sr),
                        so ? uo.setSize(Sr.x, Sr.y) : uo.setSize(gp(Sr.x), gp(Sr.y));
                        const _s = rr.getRenderTarget();
                        rr.setRenderTarget(uo),
                        rr.getClearColor(_n),
                        dn = rr.getClearAlpha(),
                        dn < 1 && rr.setClearColor(16777215, .5),
                        rr.clear();
                        const xl = rr.toneMapping;
                        rr.toneMapping = Ur,
                        y0(_i, wo, So),
                        An.updateMultisampleRenderTarget(uo),
                        An.updateRenderTargetMipmap(uo);
                        let vs = !1;
                        for (let ip = 0, ls = fo.length; ip < ls; ip++) {
                            const ns = fo[ip]
                              , Al = ns.object
                              , Xs = ns.geometry
                              , io = ns.material
                              , Jo = ns.group;
                            if (io.side === St && Al.layers.test(So.layers)) {
                                const U_ = io.side;
                                io.side = bt,
                                io.needsUpdate = !0,
                                pw(Al, wo, So, Xs, io, Jo),
                                io.side = U_,
                                io.needsUpdate = !0,
                                vs = !0
                            }
                        }
                        vs === !0 && (An.updateMultisampleRenderTarget(uo),
                        An.updateRenderTargetMipmap(uo)),
                        rr.setRenderTarget(_s),
                        rr.setClearColor(_n, dn),
                        rr.toneMapping = xl
                    }([...yn, ...To], On, tn, an),
                    un && Lr.viewport(Vr.copy(un)),
                    rr.userData.opaqueRender !== !1 && yn.length > 0 && y0(yn, tn, an),
                    rr.userData.transparentRender !== !1 && To.length > 0 && y0(To, tn, an),
                    rr.userData.transmissionRender !== !1 && On.length > 0) {
                        uo || (uo = new Rs(1,1));
                        const _i = (rr.userData.transmissionRenderTarget || uo).texture
                          , fo = Br.isWebGL2
                          , wo = _i.generateMipmaps
                          , So = _i.minFilter;
                        fo && rr.userData.blurTransmissionTarget && rr.userData.transmissionRenderTarget && (_i.generateMipmaps = !0,
                        _i.minFilter = vo,
                        _i.needsUpdate = !0,
                        An.updateMultisampleRenderTarget(rr.userData.transmissionRenderTarget),
                        An.updateRenderTargetMipmap(rr.userData.transmissionRenderTarget)),
                        y0(On, tn, an),
                        fo && rr.userData.blurTransmissionTarget && rr.userData.transmissionRenderTarget && (_i.generateMipmaps = wo,
                        _i.minFilter = So,
                        _i.needsUpdate = !0,
                        An.updateMultisampleRenderTarget(rr.userData.transmissionRenderTarget),
                        An.updateRenderTargetMipmap(rr.userData.transmissionRenderTarget))
                    }
                    Lr.buffers.depth.setTest(!0),
                    Lr.buffers.depth.setMask(!0),
                    Lr.buffers.color.setMask(!0),
                    Lr.setPolygonOffset(!1)
                }
                function y0(Mr, tn, an) {
                    const un = {
                        ...rr.userData
                    };
                    rr.userData.opaqueRender = void 0,
                    rr.userData.transparentRender = void 0,
                    rr.userData.transmissionRender = void 0,
                    rr.userData.backgroundRender = void 0;
                    const yn = tn.isScene === !0 ? tn.overrideMaterial : null;
                    for (let On = 0, To = Mr.length; On < To; On++) {
                        const _i = Mr[On]
                          , fo = _i.object
                          , wo = _i.geometry
                          , So = yn === null ? _i.material : yn
                          , so = _i.group;
                        fo.layers.test(an.layers) && pw(fo, tn, an, wo, So, so)
                    }
                    Object.assign(rr.userData, un)
                }
                function pw(Mr, tn, an, un, yn, On) {
                    Mr.onBeforeRender(rr, tn, an, un, yn, On),
                    Mr.modelViewMatrix.multiplyMatrices(an.matrixWorldInverse, Mr.matrixWorld),
                    Mr.normalMatrix.getNormalMatrix(Mr.modelViewMatrix),
                    yn.onBeforeRender(rr, tn, an, un, Mr, On),
                    yn.transparent === !0 && yn.side === St && yn.forceSinglePass === !1 ? (yn.side = bt,
                    yn.needsUpdate = !0,
                    rr.renderBufferDirect(an, tn, un, yn, Mr, On),
                    yn.side = vt,
                    yn.needsUpdate = !0,
                    rr.renderBufferDirect(an, tn, un, yn, Mr, On),
                    yn.side = St) : rr.renderBufferDirect(an, tn, un, yn, Mr, On),
                    Mr.onAfterRender(rr, tn, an, un, yn, On),
                    yn.onAfterRender(rr, tn, an, un, Mr, On)
                }
                function x0(Mr, tn, an) {
                    tn.isScene !== !0 && (tn = Wr);
                    const un = Kr.get(Mr)
                      , yn = Yt.state.lights
                      , On = Yt.state.shadowsArray
                      , To = yn.state.version
                      , _i = Kn.getParameters(Mr, yn.state, On, tn, an)
                      , fo = Kn.getProgramCacheKey(_i);
                    let wo = un.programs;
                    un.environment = Mr.userData && Mr.userData.envMapSlotKey && tn.textureSlots && tn.textureSlots[Mr.userData.envMapSlotKey] ? tn.textureSlots[Mr.userData.envMapSlotKey] : Mr.isMeshStandardMaterial ? tn.environment : null,
                    un.fog = tn.fog,
                    un.envMap = (Mr.isMeshStandardMaterial ? _o : pn).get(Mr.envMap || un.environment),
                    wo === void 0 && (Mr.addEventListener("dispose", aw),
                    wo = new Map,
                    un.programs = wo);
                    let So = wo.get(fo);
                    if (So !== void 0) {
                        if (un.currentProgram === So && un.lightsStateVersion === To)
                            return hw(Mr, _i),
                            So
                    } else
                        _i.uniforms = Kn.getUniforms(Mr),
                        Mr.onBuild(an, _i, rr),
                        Mr.onBeforeCompile(_i, rr),
                        So = Kn.acquireProgram(_i, fo),
                        wo.set(fo, So),
                        un.uniforms = _i.uniforms;
                    const so = un.uniforms;
                    (Mr.isShaderMaterial || Mr.isRawShaderMaterial) && Mr.clipping !== !0 || (so.clippingPlanes = Io.uniform),
                    hw(Mr, _i),
                    un.needsLights = function(vs) {
                        return vs.isMeshLambertMaterial || vs.isMeshToonMaterial || vs.isMeshPhongMaterial || vs.isMeshStandardMaterial || vs.isShadowMaterial || vs.isShaderMaterial && vs.lights === !0
                    }(Mr),
                    un.lightsStateVersion = To,
                    un.needsLights && (so.ambientLightColor.value = yn.state.ambient,
                    so.lightProbe.value = yn.state.probe,
                    so.directionalLights.value = yn.state.directional,
                    so.directionalLightShadows.value = yn.state.directionalShadow,
                    so.spotLights.value = yn.state.spot,
                    so.spotLightShadows.value = yn.state.spotShadow,
                    so.rectAreaLights.value = yn.state.rectArea,
                    so.ltc_1.value = yn.state.rectAreaLTC1,
                    so.ltc_2.value = yn.state.rectAreaLTC2,
                    so.pointLights.value = yn.state.point,
                    so.pointLightShadows.value = yn.state.pointShadow,
                    so.hemisphereLights.value = yn.state.hemi,
                    so.directionalShadowMap.value = yn.state.directionalShadowMap,
                    so.directionalShadowMatrix.value = yn.state.directionalShadowMatrix,
                    so.spotShadowMap.value = yn.state.spotShadowMap,
                    so.spotLightMatrix.value = yn.state.spotLightMatrix,
                    so.spotLightMap.value = yn.state.spotLightMap,
                    so.pointShadowMap.value = yn.state.pointShadowMap,
                    so.pointShadowMatrix.value = yn.state.pointShadowMatrix);
                    const _s = So.getUniforms()
                      , xl = Cv.seqWithValue(_s.seq, so);
                    return un.currentProgram = So,
                    un.uniformsList = xl,
                    So
                }
                function hw(Mr, tn) {
                    const an = Kr.get(Mr);
                    an.outputColorSpace = tn.outputColorSpace,
                    an.instancing = tn.instancing,
                    an.instancingColor = tn.instancingColor,
                    an.skinning = tn.skinning,
                    an.morphTargets = tn.morphTargets,
                    an.morphNormals = tn.morphNormals,
                    an.morphColors = tn.morphColors,
                    an.morphTargetsCount = tn.morphTargetsCount,
                    an.numClippingPlanes = tn.numClippingPlanes,
                    an.numIntersection = tn.numClipIntersection,
                    an.vertexAlphas = tn.vertexAlphas,
                    an.vertexTangents = tn.vertexTangents,
                    an.toneMapping = tn.toneMapping
                }
                Fp.setAnimationLoop(function(Mr) {
                    Ry && Ry(Mr)
                }),
                typeof self < "u" && Fp.setContext(self),
                this.setAnimationLoop = function(Mr) {
                    Ry = Mr,
                    Bs.setAnimationLoop(Mr),
                    Mr === null ? Fp.stop() : Fp.start()
                }
                ,
                Bs.addEventListener("sessionstart", lw),
                Bs.addEventListener("sessionend", cw),
                this.render = function(Mr, tn) {
                    if (tn === void 0 || tn.isCamera === !0) {
                        if (xr !== !0) {
                            if (Mr.matrixWorldAutoUpdate === !0 && Mr.updateMatrixWorld(),
                            tn.parent === null && tn.matrixWorldAutoUpdate === !0 && tn.updateMatrixWorld(),
                            Bs.enabled === !0 && Bs.isPresenting === !0 && (Bs.cameraAutoUpdate === !0 && Bs.updateCamera(tn),
                            tn = Bs.getCamera()),
                            Mr.isScene === !0 && Mr.onBeforeRender(rr, Mr, tn, Pr),
                            Yt = Fo.get(Mr, er.length),
                            Yt.init(),
                            er.push(Yt),
                            Dr.multiplyMatrices(tn.projectionMatrix, tn.matrixWorldInverse),
                            ro.setFromProjectionMatrix(Dr),
                            jn = this.localClippingEnabled,
                            Zn = Io.init(this.clippingPlanes, jn),
                            Zt = Ao.get(Mr, sr.length),
                            Zt.init(),
                            sr.push(Zt),
                            uw(Mr, tn, 0, rr.sortObjects),
                            Zt.finish(),
                            rr.sortObjects === !0 && Zt.sort(Yr, Jr),
                            this.info.render.frame++,
                            rr.userData.shadowMapRender !== !1) {
                                Zn === !0 && Io.beginShadows();
                                const an = Yt.state.shadowsArray;
                                an.length > 0 && Jn.render(an, Mr, tn),
                                Zn === !0 && Io.endShadows()
                            }
                            if (this.info.autoReset === !0 && this.info.reset(),
                            rr.userData.backgroundRender !== !1 && Co.render(Zt, Mr),
                            rr.userData.sceneRender !== !1)
                                if (Yt.setupLights(rr._useLegacyLights),
                                tn.isArrayCamera) {
                                    const an = tn.cameras;
                                    for (let un = 0, yn = an.length; un < yn; un++) {
                                        const On = an[un];
                                        dw(Zt, Mr, On, On.viewport)
                                    }
                                } else
                                    dw(Zt, Mr, tn);
                            Pr !== null && (An.updateMultisampleRenderTarget(Pr),
                            An.updateRenderTargetMipmap(Pr)),
                            Mr.isScene === !0 && Mr.onAfterRender(rr, Mr, tn),
                            Cu.resetDefaultState(),
                            zr = -1,
                            Nr = null,
                            er.pop(),
                            Yt = er.length > 0 ? er[er.length - 1] : null,
                            sr.pop(),
                            Zt = sr.length > 0 ? sr[sr.length - 1] : null
                        }
                    } else
                        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
                }
                ,
                this.getActiveCubeFace = function() {
                    return br
                }
                ,
                this.getActiveMipmapLevel = function() {
                    return yr
                }
                ,
                this.getRenderTarget = function() {
                    return Pr
                }
                ,
                this.setRenderTargetTextures = function(Mr, tn, an) {
                    Kr.get(Mr.texture).__webglTexture = tn,
                    Kr.get(Mr.depthTexture).__webglTexture = an;
                    const un = Kr.get(Mr);
                    un.__hasExternalTextures = !0,
                    un.__hasExternalTextures && (un.__autoAllocateDepthBuffer = an === void 0,
                    un.__autoAllocateDepthBuffer || _r.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),
                    un.__useRenderToTexture = !1))
                }
                ,
                this.setRenderTargetFramebuffer = function(Mr, tn) {
                    const an = Kr.get(Mr);
                    an.__webglFramebuffer = tn,
                    an.__useDefaultFramebuffer = tn === void 0
                }
                ,
                this.setRenderTarget = function(Mr, tn=0, an=0) {
                    Pr = Mr,
                    br = tn,
                    yr = an;
                    let un = !0
                      , yn = null
                      , On = !1
                      , To = !1;
                    if (Mr) {
                        const _i = Kr.get(Mr);
                        _i.__useDefaultFramebuffer !== void 0 ? (Lr.bindFramebuffer(en.FRAMEBUFFER, null),
                        un = !1) : _i.__webglFramebuffer === void 0 ? An.setupRenderTarget(Mr) : _i.__hasExternalTextures && An.rebindTextures(Mr, Kr.get(Mr.texture).__webglTexture, Kr.get(Mr.depthTexture).__webglTexture);
                        const fo = Mr.texture;
                        (fo.isData3DTexture || fo.isDataArrayTexture || fo.isCompressedArrayTexture) && (To = !0);
                        const wo = Kr.get(Mr).__webglFramebuffer;
                        Mr.isWebGLCubeRenderTarget ? (yn = Array.isArray(wo[tn]) ? wo[tn][an] : wo[tn],
                        On = !0) : yn = Br.isWebGL2 && Mr.samples > 0 && An.useMultisampledRTT(Mr) === !1 ? Kr.get(Mr).__webglMultisampledFramebuffer : Array.isArray(wo) ? wo[an] : wo,
                        Vr.copy(Mr.viewport),
                        Gr.copy(Mr.scissor),
                        Hr = Mr.scissorTest
                    } else
                        Vr.copy(sn).multiplyScalar(cn).floor(),
                        Gr.copy(on).multiplyScalar(cn).floor(),
                        Hr = Un;
                    if (Lr.bindFramebuffer(en.FRAMEBUFFER, yn) && Br.drawBuffers && un && Lr.drawBuffers(Mr, yn),
                    Lr.viewport(Vr),
                    Lr.scissor(Gr),
                    Lr.setScissorTest(Hr),
                    On) {
                        const _i = Kr.get(Mr.texture);
                        en.framebufferTexture2D(en.FRAMEBUFFER, en.COLOR_ATTACHMENT0, en.TEXTURE_CUBE_MAP_POSITIVE_X + tn, _i.__webglTexture, an)
                    } else if (To) {
                        const _i = Kr.get(Mr.texture)
                          , fo = tn || 0;
                        en.framebufferTextureLayer(en.FRAMEBUFFER, en.COLOR_ATTACHMENT0, _i.__webglTexture, an || 0, fo)
                    }
                    zr = -1
                }
                ,
                this.readRenderTargetPixels = function(Mr, tn, an, un, yn, On, To, _i) {
                    if (!Mr || !Mr.isWebGLRenderTarget)
                        return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                    let fo = Kr.get(Mr).__webglFramebuffer;
                    if (Mr.isWebGLCubeRenderTarget && To !== void 0 && (fo = fo[To]),
                    fo) {
                        Lr.bindFramebuffer(en.FRAMEBUFFER, fo);
                        try {
                            const wo = Array.isArray(Mr.texture) ? Mr.texture[_i || 0] : Mr.texture
                              , So = wo.format
                              , so = wo.type;
                            if (So !== as && Po.convert(So) !== en.getParameter(en.IMPLEMENTATION_COLOR_READ_FORMAT))
                                return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                            const _s = so === Os && (_r.has("EXT_color_buffer_half_float") || Br.isWebGL2 && _r.has("EXT_color_buffer_float"));
                            if (!(so === $n || Po.convert(so) === en.getParameter(en.IMPLEMENTATION_COLOR_READ_TYPE) || so === ss && (Br.isWebGL2 || _r.has("OES_texture_float") || _r.has("WEBGL_color_buffer_float")) || _s))
                                return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                            tn >= 0 && tn <= Mr.width - un && an >= 0 && an <= Mr.height - yn && (Mr.isWebGLMultipleRenderTargets && en.readBuffer(en.COLOR_ATTACHMENT0 + _i),
                            en.readPixels(tn, an, un, yn, Po.convert(So), Po.convert(so), On))
                        } finally {
                            const wo = Pr ? Kr.get(Pr).__webglFramebuffer : null;
                            Lr.bindFramebuffer(en.FRAMEBUFFER, wo)
                        }
                    }
                }
                ,
                this.copyFramebufferToTexture = function(Mr, tn, an=0) {
                    const un = Math.pow(2, -an)
                      , yn = Math.floor(tn.image.width * un)
                      , On = Math.floor(tn.image.height * un);
                    An.setTexture2D(tn, 0),
                    en.copyTexSubImage2D(en.TEXTURE_2D, an, 0, 0, Mr.x, Mr.y, yn, On),
                    Lr.unbindTexture()
                }
                ,
                this.copyTextureToTexture = function(Mr, tn, an, un=0) {
                    const yn = tn.image.width
                      , On = tn.image.height
                      , To = Po.convert(an.format)
                      , _i = Po.convert(an.type);
                    An.setTexture2D(an, 0),
                    en.pixelStorei(en.UNPACK_FLIP_Y_WEBGL, an.flipY),
                    en.pixelStorei(en.UNPACK_PREMULTIPLY_ALPHA_WEBGL, an.premultiplyAlpha),
                    en.pixelStorei(en.UNPACK_ALIGNMENT, an.unpackAlignment),
                    tn.isDataTexture ? en.texSubImage2D(en.TEXTURE_2D, un, Mr.x, Mr.y, yn, On, To, _i, tn.image.data) : tn.isCompressedTexture ? en.compressedTexSubImage2D(en.TEXTURE_2D, un, Mr.x, Mr.y, tn.mipmaps[0].width, tn.mipmaps[0].height, To, tn.mipmaps[0].data) : en.texSubImage2D(en.TEXTURE_2D, un, Mr.x, Mr.y, To, _i, tn.image),
                    un === 0 && an.generateMipmaps && en.generateMipmap(en.TEXTURE_2D),
                    Lr.unbindTexture()
                }
                ,
                this.copyTextureToTexture3D = function(Mr, tn, an, un, yn=0) {
                    if (rr.isWebGL1Renderer)
                        return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
                    const On = Mr.max.x - Mr.min.x + 1
                      , To = Mr.max.y - Mr.min.y + 1
                      , _i = Mr.max.z - Mr.min.z + 1
                      , fo = Po.convert(un.format)
                      , wo = Po.convert(un.type);
                    let So;
                    if (un.isData3DTexture)
                        An.setTexture3D(un, 0),
                        So = en.TEXTURE_3D;
                    else {
                        if (!un.isDataArrayTexture)
                            return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
                        An.setTexture2DArray(un, 0),
                        So = en.TEXTURE_2D_ARRAY
                    }
                    en.pixelStorei(en.UNPACK_FLIP_Y_WEBGL, un.flipY),
                    en.pixelStorei(en.UNPACK_PREMULTIPLY_ALPHA_WEBGL, un.premultiplyAlpha),
                    en.pixelStorei(en.UNPACK_ALIGNMENT, un.unpackAlignment);
                    const so = en.getParameter(en.UNPACK_ROW_LENGTH)
                      , _s = en.getParameter(en.UNPACK_IMAGE_HEIGHT)
                      , xl = en.getParameter(en.UNPACK_SKIP_PIXELS)
                      , vs = en.getParameter(en.UNPACK_SKIP_ROWS)
                      , ip = en.getParameter(en.UNPACK_SKIP_IMAGES)
                      , ls = an.isCompressedTexture ? an.mipmaps[0] : an.image;
                    en.pixelStorei(en.UNPACK_ROW_LENGTH, ls.width),
                    en.pixelStorei(en.UNPACK_IMAGE_HEIGHT, ls.height),
                    en.pixelStorei(en.UNPACK_SKIP_PIXELS, Mr.min.x),
                    en.pixelStorei(en.UNPACK_SKIP_ROWS, Mr.min.y),
                    en.pixelStorei(en.UNPACK_SKIP_IMAGES, Mr.min.z),
                    an.isDataTexture || an.isData3DTexture ? en.texSubImage3D(So, yn, tn.x, tn.y, tn.z, On, To, _i, fo, wo, ls.data) : an.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),
                    en.compressedTexSubImage3D(So, yn, tn.x, tn.y, tn.z, On, To, _i, fo, ls.data)) : en.texSubImage3D(So, yn, tn.x, tn.y, tn.z, On, To, _i, fo, wo, ls),
                    en.pixelStorei(en.UNPACK_ROW_LENGTH, so),
                    en.pixelStorei(en.UNPACK_IMAGE_HEIGHT, _s),
                    en.pixelStorei(en.UNPACK_SKIP_PIXELS, xl),
                    en.pixelStorei(en.UNPACK_SKIP_ROWS, vs),
                    en.pixelStorei(en.UNPACK_SKIP_IMAGES, ip),
                    yn === 0 && un.generateMipmaps && en.generateMipmap(So),
                    Lr.unbindTexture()
                }
                ,
                this.initTexture = function(Mr) {
                    Mr.isCubeTexture ? An.setTextureCube(Mr, 0) : Mr.isData3DTexture ? An.setTexture3D(Mr, 0) : Mr.isDataArrayTexture || Mr.isCompressedArrayTexture ? An.setTexture2DArray(Mr, 0) : An.setTexture2D(Mr, 0),
                    Lr.unbindTexture()
                }
                ,
                this.resetState = function() {
                    br = 0,
                    yr = 0,
                    Pr = null,
                    Lr.reset(),
                    Cu.reset()
                }
                ,
                typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
                    detail: this
                }))
            }
            get coordinateSystem() {
                return Qs
            }
            get outputColorSpace() {
                return this._outputColorSpace
            }
            set outputColorSpace(tt) {
                this._outputColorSpace = tt;
                const lt = this.getContext();
                lt.drawingBufferColorSpace = tt === dp ? "display-p3" : "srgb",
                lt.unpackColorSpace = Do.workingColorSpace === hu ? "display-p3" : "srgb"
            }
            get physicallyCorrectLights() {
                return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),
                !this.useLegacyLights
            }
            set physicallyCorrectLights(tt) {
                console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),
                this.useLegacyLights = !tt
            }
            get outputEncoding() {
                return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),
                this.outputColorSpace === jo ? Ol : ts
            }
            set outputEncoding(tt) {
                console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),
                this.outputColorSpace = tt === Ol ? jo : Xo
            }
            get useLegacyLights() {
                return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),
                this._useLegacyLights
            }
            set useLegacyLights(tt) {
                console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),
                this._useLegacyLights = tt
            }
        }
        class bx extends xx {
        }
        bx.prototype.isWebGL1Renderer = !0;
        class Pv {
            constructor(tt, lt=25e-5) {
                this.isFogExp2 = !0,
                this.name = "",
                this.color = new Gn(tt),
                this.density = lt
            }
            clone() {
                return new Pv(this.color,this.density)
            }
            toJSON() {
                return {
                    type: "FogExp2",
                    name: this.name,
                    color: this.color.getHex(),
                    density: this.density
                }
            }
        }
        class Mv {
            constructor(tt, lt=1, mt=1e3) {
                this.isFog = !0,
                this.name = "",
                this.color = new Gn(tt),
                this.near = lt,
                this.far = mt
            }
            clone() {
                return new Mv(this.color,this.near,this.far)
            }
            toJSON() {
                return {
                    type: "Fog",
                    name: this.name,
                    color: this.color.getHex(),
                    near: this.near,
                    far: this.far
                }
            }
        }
        class Ax extends Mo {
            constructor() {
                super(),
                this.isScene = !0,
                this.type = "Scene",
                this.background = null,
                this.environment = null,
                this.fog = null,
                this.backgroundBlurriness = 0,
                this.backgroundIntensity = 1,
                this.overrideMaterial = null,
                typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
                    detail: this
                }))
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                tt.background !== null && (this.background = tt.background.clone()),
                tt.environment !== null && (this.environment = tt.environment.clone()),
                tt.fog !== null && (this.fog = tt.fog.clone()),
                this.backgroundBlurriness = tt.backgroundBlurriness,
                this.backgroundIntensity = tt.backgroundIntensity,
                tt.overrideMaterial !== null && (this.overrideMaterial = tt.overrideMaterial.clone()),
                this.matrixAutoUpdate = tt.matrixAutoUpdate,
                this
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return this.fog !== null && (lt.object.fog = this.fog.toJSON()),
                this.backgroundBlurriness > 0 && (lt.object.backgroundBlurriness = this.backgroundBlurriness),
                this.backgroundIntensity !== 1 && (lt.object.backgroundIntensity = this.backgroundIntensity),
                lt
            }
        }
        class Rv {
            constructor(tt, lt) {
                this.isInterleavedBuffer = !0,
                this.array = tt,
                this.stride = lt,
                this.count = tt !== void 0 ? tt.length / lt : 0,
                this.usage = Nu,
                this.updateRange = {
                    offset: 0,
                    count: -1
                },
                this.version = 0,
                this.uuid = Ms()
            }
            onUploadCallback() {}
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
            setUsage(tt) {
                return this.usage = tt,
                this
            }
            copy(tt) {
                return this.array = new tt.array.constructor(tt.array),
                this.count = tt.count,
                this.stride = tt.stride,
                this.usage = tt.usage,
                this
            }
            copyAt(tt, lt, mt) {
                tt *= this.stride,
                mt *= lt.stride;
                for (let ft = 0, xt = this.stride; ft < xt; ft++)
                    this.array[tt + ft] = lt.array[mt + ft];
                return this
            }
            set(tt, lt=0) {
                return this.array.set(tt, lt),
                this
            }
            clone(tt) {
                tt.arrayBuffers === void 0 && (tt.arrayBuffers = {}),
                this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ms()),
                tt.arrayBuffers[this.array.buffer._uuid] === void 0 && (tt.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
                const lt = new this.array.constructor(tt.arrayBuffers[this.array.buffer._uuid])
                  , mt = new this.constructor(lt,this.stride);
                return mt.setUsage(this.usage),
                mt
            }
            onUpload(tt) {
                return this.onUploadCallback = tt,
                this
            }
            toJSON(tt) {
                return tt.arrayBuffers === void 0 && (tt.arrayBuffers = {}),
                this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ms()),
                tt.arrayBuffers[this.array.buffer._uuid] === void 0 && (tt.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))),
                {
                    uuid: this.uuid,
                    buffer: this.array.buffer._uuid,
                    type: this.array.constructor.name,
                    stride: this.stride
                }
            }
        }
        const Vs = new Er;
        class Cp {
            constructor(tt, lt, mt, ft=!1) {
                this.isInterleavedBufferAttribute = !0,
                this.name = "",
                this.data = tt,
                this.itemSize = lt,
                this.offset = mt,
                this.normalized = ft
            }
            get count() {
                return this.data.count
            }
            get array() {
                return this.data.array
            }
            set needsUpdate(tt) {
                this.data.needsUpdate = tt
            }
            applyMatrix4(tt) {
                for (let lt = 0, mt = this.data.count; lt < mt; lt++)
                    Vs.fromBufferAttribute(this, lt),
                    Vs.applyMatrix4(tt),
                    this.setXYZ(lt, Vs.x, Vs.y, Vs.z);
                return this
            }
            applyNormalMatrix(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    Vs.fromBufferAttribute(this, lt),
                    Vs.applyNormalMatrix(tt),
                    this.setXYZ(lt, Vs.x, Vs.y, Vs.z);
                return this
            }
            transformDirection(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    Vs.fromBufferAttribute(this, lt),
                    Vs.transformDirection(tt),
                    this.setXYZ(lt, Vs.x, Vs.y, Vs.z);
                return this
            }
            setX(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.data.array[tt * this.data.stride + this.offset] = lt,
                this
            }
            setY(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.data.array[tt * this.data.stride + this.offset + 1] = lt,
                this
            }
            setZ(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.data.array[tt * this.data.stride + this.offset + 2] = lt,
                this
            }
            setW(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.data.array[tt * this.data.stride + this.offset + 3] = lt,
                this
            }
            getX(tt) {
                let lt = this.data.array[tt * this.data.stride + this.offset];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            getY(tt) {
                let lt = this.data.array[tt * this.data.stride + this.offset + 1];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            getZ(tt) {
                let lt = this.data.array[tt * this.data.stride + this.offset + 2];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            getW(tt) {
                let lt = this.data.array[tt * this.data.stride + this.offset + 3];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setXY(tt, lt, mt) {
                return tt = tt * this.data.stride + this.offset,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array)),
                this.data.array[tt + 0] = lt,
                this.data.array[tt + 1] = mt,
                this
            }
            setXYZ(tt, lt, mt, ft) {
                return tt = tt * this.data.stride + this.offset,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array)),
                this.data.array[tt + 0] = lt,
                this.data.array[tt + 1] = mt,
                this.data.array[tt + 2] = ft,
                this
            }
            setXYZW(tt, lt, mt, ft, xt) {
                return tt = tt * this.data.stride + this.offset,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array),
                xt = oo(xt, this.array)),
                this.data.array[tt + 0] = lt,
                this.data.array[tt + 1] = mt,
                this.data.array[tt + 2] = ft,
                this.data.array[tt + 3] = xt,
                this
            }
            clone(tt) {
                if (tt === void 0) {
                    console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
                    const lt = [];
                    for (let mt = 0; mt < this.count; mt++) {
                        const ft = mt * this.data.stride + this.offset;
                        for (let xt = 0; xt < this.itemSize; xt++)
                            lt.push(this.data.array[ft + xt])
                    }
                    return new mr(new this.array.constructor(lt),this.itemSize,this.normalized)
                }
                return tt.interleavedBuffers === void 0 && (tt.interleavedBuffers = {}),
                tt.interleavedBuffers[this.data.uuid] === void 0 && (tt.interleavedBuffers[this.data.uuid] = this.data.clone(tt)),
                new Cp(tt.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)
            }
            toJSON(tt) {
                if (tt === void 0) {
                    console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
                    const lt = [];
                    for (let mt = 0; mt < this.count; mt++) {
                        const ft = mt * this.data.stride + this.offset;
                        for (let xt = 0; xt < this.itemSize; xt++)
                            lt.push(this.data.array[ft + xt])
                    }
                    return {
                        itemSize: this.itemSize,
                        type: this.array.constructor.name,
                        array: lt,
                        normalized: this.normalized
                    }
                }
                return tt.interleavedBuffers === void 0 && (tt.interleavedBuffers = {}),
                tt.interleavedBuffers[this.data.uuid] === void 0 && (tt.interleavedBuffers[this.data.uuid] = this.data.toJSON(tt)),
                {
                    isInterleavedBufferAttribute: !0,
                    itemSize: this.itemSize,
                    data: this.data.uuid,
                    offset: this.offset,
                    normalized: this.normalized
                }
            }
        }
        class q0 extends hs {
            constructor(tt) {
                super(),
                this.isSpriteMaterial = !0,
                this.type = "SpriteMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.alphaMap = null,
                this.rotation = 0,
                this.sizeAttenuation = !0,
                this.transparent = !0,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.alphaMap = tt.alphaMap,
                this.rotation = tt.rotation,
                this.sizeAttenuation = tt.sizeAttenuation,
                this.fog = tt.fog,
                this
            }
        }
        let wm;
        const v_ = new Er
          , Sm = new Er
          , Em = new Er
          , Tm = new mn
          , y_ = new mn
          , wx = new no
          , Iv = new Er
          , x_ = new Er
          , kv = new Er
          , Sx = new mn
          , $0 = new mn
          , Ex = new mn;
        class Tx extends Mo {
            constructor(tt=new q0) {
                if (super(),
                this.isSprite = !0,
                this.type = "Sprite",
                wm === void 0) {
                    wm = new bo;
                    const lt = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1])
                      , mt = new Rv(lt,5);
                    wm.setIndex([0, 1, 2, 0, 2, 3]),
                    wm.setAttribute("position", new Cp(mt,3,0,!1)),
                    wm.setAttribute("uv", new Cp(mt,2,3,!1))
                }
                this.geometry = wm,
                this.material = tt,
                this.center = new mn(.5,.5)
            }
            raycast(tt, lt) {
                tt.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),
                Sm.setFromMatrixScale(this.matrixWorld),
                wx.copy(tt.camera.matrixWorld),
                this.modelViewMatrix.multiplyMatrices(tt.camera.matrixWorldInverse, this.matrixWorld),
                Em.setFromMatrixPosition(this.modelViewMatrix),
                tt.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Sm.multiplyScalar(-Em.z);
                const mt = this.material.rotation;
                let ft, xt;
                mt !== 0 && (xt = Math.cos(mt),
                ft = Math.sin(mt));
                const Ct = this.center;
                Dv(Iv.set(-.5, -.5, 0), Em, Ct, Sm, ft, xt),
                Dv(x_.set(.5, -.5, 0), Em, Ct, Sm, ft, xt),
                Dv(kv.set(.5, .5, 0), Em, Ct, Sm, ft, xt),
                Sx.set(0, 0),
                $0.set(1, 0),
                Ex.set(1, 1);
                let Mt = tt.ray.intersectTriangle(Iv, x_, kv, !1, v_);
                if (Mt === null && (Dv(x_.set(-.5, .5, 0), Em, Ct, Sm, ft, xt),
                $0.set(0, 1),
                Mt = tt.ray.intersectTriangle(Iv, kv, x_, !1, v_),
                Mt === null))
                    return;
                const Lt = tt.ray.origin.distanceTo(v_);
                Lt < tt.near || Lt > tt.far || lt.push({
                    distance: Lt,
                    point: v_.clone(),
                    uv: Es.getInterpolation(v_, Iv, x_, kv, Sx, $0, Ex, new mn),
                    face: null,
                    object: this
                })
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                tt.center !== void 0 && this.center.copy(tt.center),
                this.material = tt.material,
                this
            }
        }
        function Dv(Tt, tt, lt, mt, ft, xt) {
            Tm.subVectors(Tt, lt).addScalar(.5).multiply(mt),
            ft !== void 0 ? (y_.x = xt * Tm.x - ft * Tm.y,
            y_.y = ft * Tm.x + xt * Tm.y) : y_.copy(Tm),
            Tt.copy(tt),
            Tt.x += y_.x,
            Tt.y += y_.y,
            Tt.applyMatrix4(wx)
        }
        const Bv = new Er
          , Cx = new Er;
        class Px extends Mo {
            constructor() {
                super(),
                this._currentLevel = 0,
                this.type = "LOD",
                Object.defineProperties(this, {
                    levels: {
                        enumerable: !0,
                        value: []
                    },
                    isLOD: {
                        value: !0
                    }
                }),
                this.autoUpdate = !0
            }
            copy(tt) {
                super.copy(tt, !1);
                const lt = tt.levels;
                for (let mt = 0, ft = lt.length; mt < ft; mt++) {
                    const xt = lt[mt];
                    this.addLevel(xt.object.clone(), xt.distance, xt.hysteresis)
                }
                return this.autoUpdate = tt.autoUpdate,
                this
            }
            addLevel(tt, lt=0, mt=0) {
                lt = Math.abs(lt);
                const ft = this.levels;
                let xt;
                for (xt = 0; xt < ft.length && !(lt < ft[xt].distance); xt++)
                    ;
                return ft.splice(xt, 0, {
                    distance: lt,
                    hysteresis: mt,
                    object: tt
                }),
                this.add(tt),
                this
            }
            getCurrentLevel() {
                return this._currentLevel
            }
            getObjectForDistance(tt) {
                const lt = this.levels;
                if (lt.length > 0) {
                    let mt, ft;
                    for (mt = 1,
                    ft = lt.length; mt < ft; mt++) {
                        let xt = lt[mt].distance;
                        if (lt[mt].object.visible && (xt -= xt * lt[mt].hysteresis),
                        tt < xt)
                            break
                    }
                    return lt[mt - 1].object
                }
                return null
            }
            raycast(tt, lt) {
                if (this.levels.length > 0) {
                    Bv.setFromMatrixPosition(this.matrixWorld);
                    const mt = tt.ray.origin.distanceTo(Bv);
                    this.getObjectForDistance(mt).raycast(tt, lt)
                }
            }
            update(tt) {
                const lt = this.levels;
                if (lt.length > 1) {
                    Bv.setFromMatrixPosition(tt.matrixWorld),
                    Cx.setFromMatrixPosition(this.matrixWorld);
                    const mt = Bv.distanceTo(Cx) / tt.zoom;
                    let ft, xt;
                    for (lt[0].object.visible = !0,
                    ft = 1,
                    xt = lt.length; ft < xt; ft++) {
                        let Ct = lt[ft].distance;
                        if (lt[ft].object.visible && (Ct -= Ct * lt[ft].hysteresis),
                        !(mt >= Ct))
                            break;
                        lt[ft - 1].object.visible = !1,
                        lt[ft].object.visible = !0
                    }
                    for (this._currentLevel = ft - 1; ft < xt; ft++)
                        lt[ft].object.visible = !1
                }
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                this.autoUpdate === !1 && (lt.object.autoUpdate = !1),
                lt.object.levels = [];
                const mt = this.levels;
                for (let ft = 0, xt = mt.length; ft < xt; ft++) {
                    const Ct = mt[ft];
                    lt.object.levels.push({
                        object: Ct.object.uuid,
                        distance: Ct.distance,
                        hysteresis: Ct.hysteresis
                    })
                }
                return lt
            }
        }
        const Mx = new Er
          , Rx = new Lo
          , Ix = new Lo
          , iS = new Er
          , kx = new no
          , Cm = new Er
          , X0 = new Ws
          , Dx = new no
          , Y0 = new Qu;
        class Bx extends gs {
            constructor(tt, lt) {
                super(tt, lt),
                this.isSkinnedMesh = !0,
                this.type = "SkinnedMesh",
                this.bindMode = "attached",
                this.bindMatrix = new no,
                this.bindMatrixInverse = new no,
                this.boundingBox = null,
                this.boundingSphere = null
            }
            computeBoundingBox() {
                const tt = this.geometry;
                this.boundingBox === null && (this.boundingBox = new Tl),
                this.boundingBox.makeEmpty();
                const lt = tt.getAttribute("position");
                for (let mt = 0; mt < lt.count; mt++)
                    Cm.fromBufferAttribute(lt, mt),
                    this.applyBoneTransform(mt, Cm),
                    this.boundingBox.expandByPoint(Cm)
            }
            computeBoundingSphere() {
                const tt = this.geometry;
                this.boundingSphere === null && (this.boundingSphere = new Ws),
                this.boundingSphere.makeEmpty();
                const lt = tt.getAttribute("position");
                for (let mt = 0; mt < lt.count; mt++)
                    Cm.fromBufferAttribute(lt, mt),
                    this.applyBoneTransform(mt, Cm),
                    this.boundingSphere.expandByPoint(Cm)
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.bindMode = tt.bindMode,
                this.bindMatrix.copy(tt.bindMatrix),
                this.bindMatrixInverse.copy(tt.bindMatrixInverse),
                this.skeleton = tt.skeleton,
                tt.boundingBox !== null && (this.boundingBox = tt.boundingBox.clone()),
                tt.boundingSphere !== null && (this.boundingSphere = tt.boundingSphere.clone()),
                this
            }
            raycast(tt, lt) {
                const mt = this.material
                  , ft = this.matrixWorld;
                mt !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(),
                X0.copy(this.boundingSphere),
                X0.applyMatrix4(ft),
                tt.ray.intersectsSphere(X0) !== !1 && (Dx.copy(ft).invert(),
                Y0.copy(tt.ray).applyMatrix4(Dx),
                this.boundingBox !== null && Y0.intersectsBox(this.boundingBox) === !1 || this._computeIntersections(tt, lt, Y0)))
            }
            getVertexPosition(tt, lt) {
                return super.getVertexPosition(tt, lt),
                this.applyBoneTransform(tt, lt),
                lt
            }
            bind(tt, lt) {
                this.skeleton = tt,
                lt === void 0 && (this.updateMatrixWorld(!0),
                this.skeleton.calculateInverses(),
                lt = this.matrixWorld),
                this.bindMatrix.copy(lt),
                this.bindMatrixInverse.copy(lt).invert()
            }
            pose() {
                this.skeleton.pose()
            }
            normalizeSkinWeights() {
                const tt = new Lo
                  , lt = this.geometry.attributes.skinWeight;
                for (let mt = 0, ft = lt.count; mt < ft; mt++) {
                    tt.fromBufferAttribute(lt, mt);
                    const xt = 1 / tt.manhattanLength();
                    xt !== 1 / 0 ? tt.multiplyScalar(xt) : tt.set(1, 0, 0, 0),
                    lt.setXYZW(mt, tt.x, tt.y, tt.z, tt.w)
                }
            }
            updateMatrixWorld(tt) {
                super.updateMatrixWorld(tt),
                this.bindMode === "attached" ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === "detached" ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
            }
            applyBoneTransform(tt, lt) {
                const mt = this.skeleton
                  , ft = this.geometry;
                Rx.fromBufferAttribute(ft.attributes.skinIndex, tt),
                Ix.fromBufferAttribute(ft.attributes.skinWeight, tt),
                Mx.copy(lt).applyMatrix4(this.bindMatrix),
                lt.set(0, 0, 0);
                for (let xt = 0; xt < 4; xt++) {
                    const Ct = Ix.getComponent(xt);
                    if (Ct !== 0) {
                        const Mt = Rx.getComponent(xt);
                        kx.multiplyMatrices(mt.bones[Mt].matrixWorld, mt.boneInverses[Mt]),
                        lt.addScaledVector(iS.copy(Mx).applyMatrix4(kx), Ct)
                    }
                }
                return lt.applyMatrix4(this.bindMatrixInverse)
            }
            boneTransform(tt, lt) {
                return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),
                this.applyBoneTransform(tt, lt)
            }
        }
        class K0 extends Mo {
            constructor() {
                super(),
                this.isBone = !0,
                this.type = "Bone"
            }
        }
        class Pm extends Ho {
            constructor(tt=null, lt=1, mt=1, ft, xt, Ct, Mt, Lt, Nt=fn, jt=fn, Wt, Qt) {
                super(null, Ct, Mt, Lt, Nt, jt, ft, xt, Wt, Qt),
                this.isDataTexture = !0,
                this.image = {
                    data: tt,
                    width: lt,
                    height: mt
                },
                this.generateMipmaps = !1,
                this.flipY = !1,
                this.unpackAlignment = 1
            }
        }
        const Lx = new no
          , oS = new no;
        class Lv {
            constructor(tt=[], lt=[]) {
                this.uuid = Ms(),
                this.bones = tt.slice(0),
                this.boneInverses = lt,
                this.boneMatrices = null,
                this.boneTexture = null,
                this.boneTextureSize = 0,
                this.init()
            }
            init() {
                const tt = this.bones
                  , lt = this.boneInverses;
                if (this.boneMatrices = new Float32Array(16 * tt.length),
                lt.length === 0)
                    this.calculateInverses();
                else if (tt.length !== lt.length) {
                    console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),
                    this.boneInverses = [];
                    for (let mt = 0, ft = this.bones.length; mt < ft; mt++)
                        this.boneInverses.push(new no)
                }
            }
            calculateInverses() {
                this.boneInverses.length = 0;
                for (let tt = 0, lt = this.bones.length; tt < lt; tt++) {
                    const mt = new no;
                    this.bones[tt] && mt.copy(this.bones[tt].matrixWorld).invert(),
                    this.boneInverses.push(mt)
                }
            }
            pose() {
                for (let tt = 0, lt = this.bones.length; tt < lt; tt++) {
                    const mt = this.bones[tt];
                    mt && mt.matrixWorld.copy(this.boneInverses[tt]).invert()
                }
                for (let tt = 0, lt = this.bones.length; tt < lt; tt++) {
                    const mt = this.bones[tt];
                    mt && (mt.parent && mt.parent.isBone ? (mt.matrix.copy(mt.parent.matrixWorld).invert(),
                    mt.matrix.multiply(mt.matrixWorld)) : mt.matrix.copy(mt.matrixWorld),
                    mt.matrix.decompose(mt.position, mt.quaternion, mt.scale))
                }
            }
            update() {
                const tt = this.bones
                  , lt = this.boneInverses
                  , mt = this.boneMatrices
                  , ft = this.boneTexture;
                for (let xt = 0, Ct = tt.length; xt < Ct; xt++) {
                    const Mt = tt[xt] ? tt[xt].matrixWorld : oS;
                    Lx.multiplyMatrices(Mt, lt[xt]),
                    Lx.toArray(mt, 16 * xt)
                }
                ft !== null && (ft.needsUpdate = !0)
            }
            clone() {
                return new Lv(this.bones,this.boneInverses)
            }
            computeBoneTexture() {
                let tt = Math.sqrt(4 * this.bones.length);
                tt = Km(tt),
                tt = Math.max(tt, 4);
                const lt = new Float32Array(tt * tt * 4);
                lt.set(this.boneMatrices);
                const mt = new Pm(lt,tt,tt,as,ss);
                return mt.needsUpdate = !0,
                this.boneMatrices = lt,
                this.boneTexture = mt,
                this.boneTextureSize = tt,
                this
            }
            getBoneByName(tt) {
                for (let lt = 0, mt = this.bones.length; lt < mt; lt++) {
                    const ft = this.bones[lt];
                    if (ft.name === tt)
                        return ft
                }
            }
            dispose() {
                this.boneTexture !== null && (this.boneTexture.dispose(),
                this.boneTexture = null)
            }
            fromJSON(tt, lt) {
                this.uuid = tt.uuid;
                for (let mt = 0, ft = tt.bones.length; mt < ft; mt++) {
                    const xt = tt.bones[mt];
                    let Ct = lt[xt];
                    Ct === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", xt),
                    Ct = new K0),
                    this.bones.push(Ct),
                    this.boneInverses.push(new no().fromArray(tt.boneInverses[mt]))
                }
                return this.init(),
                this
            }
            toJSON() {
                const tt = {
                    metadata: {
                        version: 4.6,
                        type: "Skeleton",
                        generator: "Skeleton.toJSON"
                    },
                    bones: [],
                    boneInverses: []
                };
                tt.uuid = this.uuid;
                const lt = this.bones
                  , mt = this.boneInverses;
                for (let ft = 0, xt = lt.length; ft < xt; ft++) {
                    const Ct = lt[ft];
                    tt.bones.push(Ct.uuid);
                    const Mt = mt[ft];
                    tt.boneInverses.push(Mt.toArray())
                }
                return tt
            }
        }
        class Mm extends mr {
            constructor(tt, lt, mt, ft=1) {
                super(tt, lt, mt),
                this.isInstancedBufferAttribute = !0,
                this.meshPerAttribute = ft
            }
            copy(tt) {
                return super.copy(tt),
                this.meshPerAttribute = tt.meshPerAttribute,
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.meshPerAttribute = this.meshPerAttribute,
                tt.isInstancedBufferAttribute = !0,
                tt
            }
        }
        const Rm = new no
          , Ox = new no
          , Ov = []
          , Nx = new Tl
          , sS = new no
          , b_ = new gs
          , A_ = new Ws;
        class Fx extends gs {
            constructor(tt, lt, mt) {
                super(tt, lt),
                this.isInstancedMesh = !0,
                this.instanceMatrix = new Mm(new Float32Array(16 * mt),16),
                this.instanceColor = null,
                this.sourceTrs = null,
                this.count = mt,
                this.boundingBox = null,
                this.boundingSphere = null;
                for (let ft = 0; ft < mt; ft++)
                    this.setMatrixAt(ft, sS)
            }
            computeBoundingBox() {
                const tt = this.geometry
                  , lt = this.count;
                this.boundingBox === null && (this.boundingBox = new Tl),
                tt.boundingBox === null && tt.computeBoundingBox(),
                this.boundingBox.makeEmpty();
                for (let mt = 0; mt < lt; mt++)
                    this.getMatrixAt(mt, Rm),
                    Nx.copy(tt.boundingBox).applyMatrix4(Rm),
                    this.boundingBox.union(Nx)
            }
            computeBoundingSphere() {
                const tt = this.geometry
                  , lt = this.count;
                this.boundingSphere === null && (this.boundingSphere = new Ws),
                tt.boundingSphere === null && tt.computeBoundingSphere(),
                this.boundingSphere.makeEmpty();
                for (let mt = 0; mt < lt; mt++)
                    this.getMatrixAt(mt, Rm),
                    A_.copy(tt.boundingSphere).applyMatrix4(Rm),
                    this.boundingSphere.union(A_)
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                tt.isInstancedMesh ? (this.instanceMatrix.copy(tt.instanceMatrix),
                tt.instanceColor !== null && (this.instanceColor = tt.instanceColor.clone()),
                this.count = tt.count,
                tt.boundingBox !== null && (this.boundingBox = tt.boundingBox.clone()),
                tt.boundingSphere !== null && (this.boundingSphere = tt.boundingSphere.clone()),
                this) : this
            }
            getColorAt(tt, lt) {
                lt.fromArray(this.instanceColor.array, 3 * tt)
            }
            getMatrixAt(tt, lt) {
                lt.fromArray(this.instanceMatrix.array, 16 * tt)
            }
            raycast(tt, lt) {
                const mt = this.matrixWorld
                  , ft = this.count;
                if (b_.geometry = this.geometry,
                b_.material = this.material,
                b_.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(),
                A_.copy(this.boundingSphere),
                A_.applyMatrix4(mt),
                tt.ray.intersectsSphere(A_) !== !1))
                    for (let xt = 0; xt < ft; xt++) {
                        this.getMatrixAt(xt, Rm),
                        Ox.multiplyMatrices(mt, Rm),
                        b_.matrixWorld = Ox,
                        b_.raycast(tt, Ov);
                        for (let Ct = 0, Mt = Ov.length; Ct < Mt; Ct++) {
                            const Lt = Ov[Ct];
                            Lt.instanceId = xt,
                            Lt.object = this,
                            lt.push(Lt)
                        }
                        Ov.length = 0
                    }
            }
            setColorAt(tt, lt) {
                this.instanceColor === null && (this.instanceColor = new Mm(new Float32Array(3 * this.instanceMatrix.count),3)),
                lt.toArray(this.instanceColor.array, 3 * tt)
            }
            setMatrixAt(tt, lt) {
                lt.toArray(this.instanceMatrix.array, 16 * tt)
            }
            updateMorphTargets() {}
            dispose() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }
        class Gs extends hs {
            constructor(tt) {
                super(),
                this.isLineBasicMaterial = !0,
                this.type = "LineBasicMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.linewidth = 1,
                this.linecap = "round",
                this.linejoin = "round",
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.linewidth = tt.linewidth,
                this.linecap = tt.linecap,
                this.linejoin = tt.linejoin,
                this.fog = tt.fog,
                this
            }
        }
        const Ux = new Er
          , jx = new Er
          , Vx = new no
          , J0 = new Qu
          , Nv = new Ws;
        class ep extends Mo {
            constructor(tt=new bo, lt=new Gs) {
                super(),
                this.isLine = !0,
                this.type = "Line",
                this.geometry = tt,
                this.material = lt,
                this.updateMorphTargets()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.material = Array.isArray(tt.material) ? tt.material.slice() : tt.material,
                this.geometry = tt.geometry,
                this
            }
            computeLineDistances() {
                const tt = this.geometry;
                if (tt.index === null) {
                    const lt = tt.attributes.position
                      , mt = [0];
                    for (let ft = 1, xt = lt.count; ft < xt; ft++)
                        Ux.fromBufferAttribute(lt, ft - 1),
                        jx.fromBufferAttribute(lt, ft),
                        mt[ft] = mt[ft - 1],
                        mt[ft] += Ux.distanceTo(jx);
                    tt.setAttribute("lineDistance", new Fn(mt,1))
                } else
                    console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
                return this
            }
            raycast(tt, lt) {
                const mt = this.geometry
                  , ft = this.matrixWorld
                  , xt = tt.params.Line.threshold
                  , Ct = mt.drawRange;
                if (mt.boundingSphere === null && mt.computeBoundingSphere(),
                Nv.copy(mt.boundingSphere),
                Nv.applyMatrix4(ft),
                Nv.radius += xt,
                tt.ray.intersectsSphere(Nv) === !1)
                    return;
                Vx.copy(ft).invert(),
                J0.copy(tt.ray).applyMatrix4(Vx);
                const Mt = xt / ((this.scale.x + this.scale.y + this.scale.z) / 3)
                  , Lt = Mt * Mt
                  , Nt = new Er
                  , jt = new Er
                  , Wt = new Er
                  , Qt = new Er
                  , qt = this.isLineSegments ? 2 : 1
                  , Xt = mt.index
                  , Zt = mt.attributes.position;
                if (Xt !== null)
                    for (let Yt = Math.max(0, Ct.start), sr = Math.min(Xt.count, Ct.start + Ct.count) - 1; Yt < sr; Yt += qt) {
                        const er = Xt.getX(Yt)
                          , rr = Xt.getX(Yt + 1);
                        if (Nt.fromBufferAttribute(Zt, er),
                        jt.fromBufferAttribute(Zt, rr),
                        J0.distanceSqToSegment(Nt, jt, Qt, Wt) > Lt)
                            continue;
                        Qt.applyMatrix4(this.matrixWorld);
                        const xr = tt.ray.origin.distanceTo(Qt);
                        xr < tt.near || xr > tt.far || lt.push({
                            distance: xr,
                            point: Wt.clone().applyMatrix4(this.matrixWorld),
                            index: Yt,
                            face: null,
                            faceIndex: null,
                            object: this
                        })
                    }
                else
                    for (let Yt = Math.max(0, Ct.start), sr = Math.min(Zt.count, Ct.start + Ct.count) - 1; Yt < sr; Yt += qt) {
                        if (Nt.fromBufferAttribute(Zt, Yt),
                        jt.fromBufferAttribute(Zt, Yt + 1),
                        J0.distanceSqToSegment(Nt, jt, Qt, Wt) > Lt)
                            continue;
                        Qt.applyMatrix4(this.matrixWorld);
                        const er = tt.ray.origin.distanceTo(Qt);
                        er < tt.near || er > tt.far || lt.push({
                            distance: er,
                            point: Wt.clone().applyMatrix4(this.matrixWorld),
                            index: Yt,
                            face: null,
                            faceIndex: null,
                            object: this
                        })
                    }
            }
            updateMorphTargets() {
                const tt = this.geometry.morphAttributes
                  , lt = Object.keys(tt);
                if (lt.length > 0) {
                    const mt = tt[lt[0]];
                    if (mt !== void 0) {
                        this.morphTargetInfluences = [],
                        this.morphTargetDictionary = {};
                        for (let ft = 0, xt = mt.length; ft < xt; ft++) {
                            const Ct = mt[ft].name || String(ft);
                            this.morphTargetInfluences.push(0),
                            this.morphTargetDictionary[Ct] = ft
                        }
                    }
                }
            }
        }
        const Gx = new Er
          , zx = new Er;
        class iu extends ep {
            constructor(tt, lt) {
                super(tt, lt),
                this.isLineSegments = !0,
                this.type = "LineSegments"
            }
            computeLineDistances() {
                const tt = this.geometry;
                if (tt.index === null) {
                    const lt = tt.attributes.position
                      , mt = [];
                    for (let ft = 0, xt = lt.count; ft < xt; ft += 2)
                        Gx.fromBufferAttribute(lt, ft),
                        zx.fromBufferAttribute(lt, ft + 1),
                        mt[ft] = ft === 0 ? 0 : mt[ft - 1],
                        mt[ft + 1] = mt[ft] + Gx.distanceTo(zx);
                    tt.setAttribute("lineDistance", new Fn(mt,1))
                } else
                    console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
                return this
            }
        }
        class Hx extends ep {
            constructor(tt, lt) {
                super(tt, lt),
                this.isLineLoop = !0,
                this.type = "LineLoop"
            }
        }
        class Z0 extends hs {
            constructor(tt) {
                super(),
                this.isPointsMaterial = !0,
                this.type = "PointsMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.alphaMap = null,
                this.size = 1,
                this.sizeAttenuation = !0,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.alphaMap = tt.alphaMap,
                this.size = tt.size,
                this.sizeAttenuation = tt.sizeAttenuation,
                this.fog = tt.fog,
                this
            }
        }
        const Qx = new no
          , ey = new Qu
          , Fv = new Ws
          , Uv = new Er;
        class Wx extends Mo {
            constructor(tt=new bo, lt=new Z0) {
                super(),
                this.isPoints = !0,
                this.type = "Points",
                this.geometry = tt,
                this.material = lt,
                this.updateMorphTargets()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.material = Array.isArray(tt.material) ? tt.material.slice() : tt.material,
                this.geometry = tt.geometry,
                this
            }
            raycast(tt, lt) {
                const mt = this.geometry
                  , ft = this.matrixWorld
                  , xt = tt.params.Points.threshold
                  , Ct = mt.drawRange;
                if (mt.boundingSphere === null && mt.computeBoundingSphere(),
                Fv.copy(mt.boundingSphere),
                Fv.applyMatrix4(ft),
                Fv.radius += xt,
                tt.ray.intersectsSphere(Fv) === !1)
                    return;
                Qx.copy(ft).invert(),
                ey.copy(tt.ray).applyMatrix4(Qx);
                const Mt = xt / ((this.scale.x + this.scale.y + this.scale.z) / 3)
                  , Lt = Mt * Mt
                  , Nt = mt.index
                  , jt = mt.attributes.position;
                if (Nt !== null)
                    for (let Wt = Math.max(0, Ct.start), Qt = Math.min(Nt.count, Ct.start + Ct.count); Wt < Qt; Wt++) {
                        const qt = Nt.getX(Wt);
                        Uv.fromBufferAttribute(jt, qt),
                        qx(Uv, qt, Lt, ft, tt, lt, this)
                    }
                else
                    for (let Wt = Math.max(0, Ct.start), Qt = Math.min(jt.count, Ct.start + Ct.count); Wt < Qt; Wt++)
                        Uv.fromBufferAttribute(jt, Wt),
                        qx(Uv, Wt, Lt, ft, tt, lt, this)
            }
            updateMorphTargets() {
                const tt = this.geometry.morphAttributes
                  , lt = Object.keys(tt);
                if (lt.length > 0) {
                    const mt = tt[lt[0]];
                    if (mt !== void 0) {
                        this.morphTargetInfluences = [],
                        this.morphTargetDictionary = {};
                        for (let ft = 0, xt = mt.length; ft < xt; ft++) {
                            const Ct = mt[ft].name || String(ft);
                            this.morphTargetInfluences.push(0),
                            this.morphTargetDictionary[Ct] = ft
                        }
                    }
                }
            }
        }
        function qx(Tt, tt, lt, mt, ft, xt, Ct) {
            const Mt = ey.distanceSqToPoint(Tt);
            if (Mt < lt) {
                const Lt = new Er;
                ey.closestPointToPoint(Tt, Lt),
                Lt.applyMatrix4(mt);
                const Nt = ft.ray.origin.distanceTo(Lt);
                if (Nt < ft.near || Nt > ft.far)
                    return;
                xt.push({
                    distance: Nt,
                    distanceToRay: Math.sqrt(Mt),
                    point: Lt,
                    index: tt,
                    face: null,
                    object: Ct
                })
            }
        }
        class aS extends Ho {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt) {
                super(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt),
                this.isVideoTexture = !0,
                this.minFilter = Ct !== void 0 ? Ct : Rn,
                this.magFilter = xt !== void 0 ? xt : Rn,
                this.generateMipmaps = !1;
                const jt = this;
                "requestVideoFrameCallback"in tt && tt.requestVideoFrameCallback(function Wt() {
                    jt.needsUpdate = !0,
                    tt.requestVideoFrameCallback(Wt)
                })
            }
            clone() {
                return new this.constructor(this.image).copy(this)
            }
            update() {
                const tt = this.image;
                !("requestVideoFrameCallback"in tt) && tt.readyState >= tt.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
            }
        }
        class lS extends Ho {
            constructor(tt, lt) {
                super({
                    width: tt,
                    height: lt
                }),
                this.isFramebufferTexture = !0,
                this.magFilter = fn,
                this.minFilter = fn,
                this.generateMipmaps = !1,
                this.needsUpdate = !0
            }
        }
        class jv extends Ho {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt, Wt, Qt) {
                super(null, Ct, Mt, Lt, Nt, jt, ft, xt, Wt, Qt),
                this.isCompressedTexture = !0,
                this.image = {
                    width: lt,
                    height: mt
                },
                this.mipmaps = tt,
                this.flipY = !1,
                this.generateMipmaps = !1
            }
        }
        class cS extends jv {
            constructor(tt, lt, mt, ft, xt, Ct) {
                super(tt, lt, mt, xt, Ct),
                this.isCompressedArrayTexture = !0,
                this.image.depth = ft,
                this.wrapR = wn
            }
        }
        class uS extends jv {
            constructor(tt, lt, mt) {
                super(void 0, tt[0].width, tt[0].height, lt, mt, Qr),
                this.isCompressedCubeTexture = !0,
                this.isCubeTexture = !0,
                this.image = tt
            }
        }
        class dS extends Ho {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt) {
                super(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt),
                this.isCanvasTexture = !0,
                this.needsUpdate = !0
            }
        }
        class Hl {
            constructor() {
                this.type = "Curve",
                this.arcLengthDivisions = 200
            }
            getPoint() {
                return console.warn("THREE.Curve: .getPoint() not implemented."),
                null
            }
            getPointAt(tt, lt) {
                const mt = this.getUtoTmapping(tt);
                return this.getPoint(mt, lt)
            }
            getPoints(tt=5) {
                const lt = [];
                for (let mt = 0; mt <= tt; mt++)
                    lt.push(this.getPoint(mt / tt));
                return lt
            }
            getSpacedPoints(tt=5) {
                const lt = [];
                for (let mt = 0; mt <= tt; mt++)
                    lt.push(this.getPointAt(mt / tt));
                return lt
            }
            getLength() {
                const tt = this.getLengths();
                return tt[tt.length - 1]
            }
            getLengths(tt=this.arcLengthDivisions) {
                if (this.cacheArcLengths && this.cacheArcLengths.length === tt + 1 && !this.needsUpdate)
                    return this.cacheArcLengths;
                this.needsUpdate = !1;
                const lt = [];
                let mt, ft = this.getPoint(0), xt = 0;
                lt.push(0);
                for (let Ct = 1; Ct <= tt; Ct++)
                    mt = this.getPoint(Ct / tt),
                    xt += mt.distanceTo(ft),
                    lt.push(xt),
                    ft = mt;
                return this.cacheArcLengths = lt,
                lt
            }
            updateArcLengths() {
                this.needsUpdate = !0,
                this.getLengths()
            }
            getUtoTmapping(tt, lt) {
                const mt = this.getLengths();
                let ft = 0;
                const xt = mt.length;
                let Ct;
                Ct = lt || tt * mt[xt - 1];
                let Mt, Lt = 0, Nt = xt - 1;
                for (; Lt <= Nt; )
                    if (ft = Math.floor(Lt + (Nt - Lt) / 2),
                    Mt = mt[ft] - Ct,
                    Mt < 0)
                        Lt = ft + 1;
                    else {
                        if (!(Mt > 0)) {
                            Nt = ft;
                            break
                        }
                        Nt = ft - 1
                    }
                if (ft = Nt,
                mt[ft] === Ct)
                    return ft / (xt - 1);
                const jt = mt[ft];
                return (ft + (Ct - jt) / (mt[ft + 1] - jt)) / (xt - 1)
            }
            getTangent(tt, lt) {
                let ft = tt - 1e-4
                  , xt = tt + 1e-4;
                ft < 0 && (ft = 0),
                xt > 1 && (xt = 1);
                const Ct = this.getPoint(ft)
                  , Mt = this.getPoint(xt)
                  , Lt = lt || (Ct.isVector2 ? new mn : new Er);
                return Lt.copy(Mt).sub(Ct).normalize(),
                Lt
            }
            getTangentAt(tt, lt) {
                const mt = this.getUtoTmapping(tt);
                return this.getTangent(mt, lt)
            }
            computeFrenetFrames(tt, lt) {
                const mt = new Er
                  , ft = []
                  , xt = []
                  , Ct = []
                  , Mt = new Er
                  , Lt = new no;
                for (let qt = 0; qt <= tt; qt++) {
                    const Xt = qt / tt;
                    ft[qt] = this.getTangentAt(Xt, new Er)
                }
                xt[0] = new Er,
                Ct[0] = new Er;
                let Nt = Number.MAX_VALUE;
                const jt = Math.abs(ft[0].x)
                  , Wt = Math.abs(ft[0].y)
                  , Qt = Math.abs(ft[0].z);
                jt <= Nt && (Nt = jt,
                mt.set(1, 0, 0)),
                Wt <= Nt && (Nt = Wt,
                mt.set(0, 1, 0)),
                Qt <= Nt && mt.set(0, 0, 1),
                Mt.crossVectors(ft[0], mt).normalize(),
                xt[0].crossVectors(ft[0], Mt),
                Ct[0].crossVectors(ft[0], xt[0]);
                for (let qt = 1; qt <= tt; qt++) {
                    if (xt[qt] = xt[qt - 1].clone(),
                    Ct[qt] = Ct[qt - 1].clone(),
                    Mt.crossVectors(ft[qt - 1], ft[qt]),
                    Mt.length() > Number.EPSILON) {
                        Mt.normalize();
                        const Xt = Math.acos(qo(ft[qt - 1].dot(ft[qt]), -1, 1));
                        xt[qt].applyMatrix4(Lt.makeRotationAxis(Mt, Xt))
                    }
                    Ct[qt].crossVectors(ft[qt], xt[qt])
                }
                if (lt === !0) {
                    let qt = Math.acos(qo(xt[0].dot(xt[tt]), -1, 1));
                    qt /= tt,
                    ft[0].dot(Mt.crossVectors(xt[0], xt[tt])) > 0 && (qt = -qt);
                    for (let Xt = 1; Xt <= tt; Xt++)
                        xt[Xt].applyMatrix4(Lt.makeRotationAxis(ft[Xt], qt * Xt)),
                        Ct[Xt].crossVectors(ft[Xt], xt[Xt])
                }
                return {
                    tangents: ft,
                    normals: xt,
                    binormals: Ct
                }
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                return this.arcLengthDivisions = tt.arcLengthDivisions,
                this
            }
            toJSON() {
                const tt = {
                    metadata: {
                        version: 4.6,
                        type: "Curve",
                        generator: "Curve.toJSON"
                    }
                };
                return tt.arcLengthDivisions = this.arcLengthDivisions,
                tt.type = this.type,
                tt
            }
            fromJSON(tt) {
                return this.arcLengthDivisions = tt.arcLengthDivisions,
                this
            }
        }
        class Vv extends Hl {
            constructor(tt=0, lt=0, mt=1, ft=1, xt=0, Ct=2 * Math.PI, Mt=!1, Lt=0) {
                super(),
                this.isEllipseCurve = !0,
                this.type = "EllipseCurve",
                this.aX = tt,
                this.aY = lt,
                this.xRadius = mt,
                this.yRadius = ft,
                this.aStartAngle = xt,
                this.aEndAngle = Ct,
                this.aClockwise = Mt,
                this.aRotation = Lt
            }
            getPoint(tt, lt) {
                const mt = lt || new mn
                  , ft = 2 * Math.PI;
                let xt = this.aEndAngle - this.aStartAngle;
                const Ct = Math.abs(xt) < Number.EPSILON;
                for (; xt < 0; )
                    xt += ft;
                for (; xt > ft; )
                    xt -= ft;
                xt < Number.EPSILON && (xt = Ct ? 0 : ft),
                this.aClockwise !== !0 || Ct || (xt === ft ? xt = -ft : xt -= ft);
                const Mt = this.aStartAngle + tt * xt;
                let Lt = this.aX + this.xRadius * Math.cos(Mt)
                  , Nt = this.aY + this.yRadius * Math.sin(Mt);
                if (this.aRotation !== 0) {
                    const jt = Math.cos(this.aRotation)
                      , Wt = Math.sin(this.aRotation)
                      , Qt = Lt - this.aX
                      , qt = Nt - this.aY;
                    Lt = Qt * jt - qt * Wt + this.aX,
                    Nt = Qt * Wt + qt * jt + this.aY
                }
                return mt.set(Lt, Nt)
            }
            copy(tt) {
                return super.copy(tt),
                this.aX = tt.aX,
                this.aY = tt.aY,
                this.xRadius = tt.xRadius,
                this.yRadius = tt.yRadius,
                this.aStartAngle = tt.aStartAngle,
                this.aEndAngle = tt.aEndAngle,
                this.aClockwise = tt.aClockwise,
                this.aRotation = tt.aRotation,
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.aX = this.aX,
                tt.aY = this.aY,
                tt.xRadius = this.xRadius,
                tt.yRadius = this.yRadius,
                tt.aStartAngle = this.aStartAngle,
                tt.aEndAngle = this.aEndAngle,
                tt.aClockwise = this.aClockwise,
                tt.aRotation = this.aRotation,
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.aX = tt.aX,
                this.aY = tt.aY,
                this.xRadius = tt.xRadius,
                this.yRadius = tt.yRadius,
                this.aStartAngle = tt.aStartAngle,
                this.aEndAngle = tt.aEndAngle,
                this.aClockwise = tt.aClockwise,
                this.aRotation = tt.aRotation,
                this
            }
        }
        class $x extends Vv {
            constructor(tt, lt, mt, ft, xt, Ct) {
                super(tt, lt, mt, mt, ft, xt, Ct),
                this.isArcCurve = !0,
                this.type = "ArcCurve"
            }
        }
        function ty() {
            let Tt = 0
              , tt = 0
              , lt = 0
              , mt = 0;
            function ft(xt, Ct, Mt, Lt) {
                Tt = xt,
                tt = Mt,
                lt = -3 * xt + 3 * Ct - 2 * Mt - Lt,
                mt = 2 * xt - 2 * Ct + Mt + Lt
            }
            return {
                initCatmullRom: function(xt, Ct, Mt, Lt, Nt) {
                    ft(Ct, Mt, Nt * (Mt - xt), Nt * (Lt - Ct))
                },
                initNonuniformCatmullRom: function(xt, Ct, Mt, Lt, Nt, jt, Wt) {
                    let Qt = (Ct - xt) / Nt - (Mt - xt) / (Nt + jt) + (Mt - Ct) / jt
                      , qt = (Mt - Ct) / jt - (Lt - Ct) / (jt + Wt) + (Lt - Mt) / Wt;
                    Qt *= jt,
                    qt *= jt,
                    ft(Ct, Mt, Qt, qt)
                },
                calc: function(xt) {
                    const Ct = xt * xt;
                    return Tt + tt * xt + lt * Ct + mt * (Ct * xt)
                }
            }
        }
        const Gv = new Er
          , ry = new ty
          , ny = new ty
          , iy = new ty;
        class Xx extends Hl {
            constructor(tt=[], lt=!1, mt="centripetal", ft=.5) {
                super(),
                this.isCatmullRomCurve3 = !0,
                this.type = "CatmullRomCurve3",
                this.points = tt,
                this.closed = lt,
                this.curveType = mt,
                this.tension = ft
            }
            getPoint(tt, lt=new Er) {
                const mt = lt
                  , ft = this.points
                  , xt = ft.length
                  , Ct = (xt - (this.closed ? 0 : 1)) * tt;
                let Mt, Lt, Nt = Math.floor(Ct), jt = Ct - Nt;
                this.closed ? Nt += Nt > 0 ? 0 : (Math.floor(Math.abs(Nt) / xt) + 1) * xt : jt === 0 && Nt === xt - 1 && (Nt = xt - 2,
                jt = 1),
                this.closed || Nt > 0 ? Mt = ft[(Nt - 1) % xt] : (Gv.subVectors(ft[0], ft[1]).add(ft[0]),
                Mt = Gv);
                const Wt = ft[Nt % xt]
                  , Qt = ft[(Nt + 1) % xt];
                if (this.closed || Nt + 2 < xt ? Lt = ft[(Nt + 2) % xt] : (Gv.subVectors(ft[xt - 1], ft[xt - 2]).add(ft[xt - 1]),
                Lt = Gv),
                this.curveType === "centripetal" || this.curveType === "chordal") {
                    const qt = this.curveType === "chordal" ? .5 : .25;
                    let Xt = Math.pow(Mt.distanceToSquared(Wt), qt)
                      , Zt = Math.pow(Wt.distanceToSquared(Qt), qt)
                      , Yt = Math.pow(Qt.distanceToSquared(Lt), qt);
                    Zt < 1e-4 && (Zt = 1),
                    Xt < 1e-4 && (Xt = Zt),
                    Yt < 1e-4 && (Yt = Zt),
                    ry.initNonuniformCatmullRom(Mt.x, Wt.x, Qt.x, Lt.x, Xt, Zt, Yt),
                    ny.initNonuniformCatmullRom(Mt.y, Wt.y, Qt.y, Lt.y, Xt, Zt, Yt),
                    iy.initNonuniformCatmullRom(Mt.z, Wt.z, Qt.z, Lt.z, Xt, Zt, Yt)
                } else
                    this.curveType === "catmullrom" && (ry.initCatmullRom(Mt.x, Wt.x, Qt.x, Lt.x, this.tension),
                    ny.initCatmullRom(Mt.y, Wt.y, Qt.y, Lt.y, this.tension),
                    iy.initCatmullRom(Mt.z, Wt.z, Qt.z, Lt.z, this.tension));
                return mt.set(ry.calc(jt), ny.calc(jt), iy.calc(jt)),
                mt
            }
            copy(tt) {
                super.copy(tt),
                this.points = [];
                for (let lt = 0, mt = tt.points.length; lt < mt; lt++) {
                    const ft = tt.points[lt];
                    this.points.push(ft.clone())
                }
                return this.closed = tt.closed,
                this.curveType = tt.curveType,
                this.tension = tt.tension,
                this
            }
            toJSON() {
                const tt = super.toJSON();
                tt.points = [];
                for (let lt = 0, mt = this.points.length; lt < mt; lt++) {
                    const ft = this.points[lt];
                    tt.points.push(ft.toArray())
                }
                return tt.closed = this.closed,
                tt.curveType = this.curveType,
                tt.tension = this.tension,
                tt
            }
            fromJSON(tt) {
                super.fromJSON(tt),
                this.points = [];
                for (let lt = 0, mt = tt.points.length; lt < mt; lt++) {
                    const ft = tt.points[lt];
                    this.points.push(new Er().fromArray(ft))
                }
                return this.closed = tt.closed,
                this.curveType = tt.curveType,
                this.tension = tt.tension,
                this
            }
        }
        function Yx(Tt, tt, lt, mt, ft) {
            const xt = .5 * (mt - tt)
              , Ct = .5 * (ft - lt)
              , Mt = Tt * Tt;
            return (2 * lt - 2 * mt + xt + Ct) * (Tt * Mt) + (-3 * lt + 3 * mt - 2 * xt - Ct) * Mt + xt * Tt + lt
        }
        function w_(Tt, tt, lt, mt) {
            return function(ft, xt) {
                const Ct = 1 - ft;
                return Ct * Ct * xt
            }(Tt, tt) + function(ft, xt) {
                return 2 * (1 - ft) * ft * xt
            }(Tt, lt) + function(ft, xt) {
                return ft * ft * xt
            }(Tt, mt)
        }
        function S_(Tt, tt, lt, mt, ft) {
            return function(xt, Ct) {
                const Mt = 1 - xt;
                return Mt * Mt * Mt * Ct
            }(Tt, tt) + function(xt, Ct) {
                const Mt = 1 - xt;
                return 3 * Mt * Mt * xt * Ct
            }(Tt, lt) + function(xt, Ct) {
                return 3 * (1 - xt) * xt * xt * Ct
            }(Tt, mt) + function(xt, Ct) {
                return xt * xt * xt * Ct
            }(Tt, ft)
        }
        class oy extends Hl {
            constructor(tt=new mn, lt=new mn, mt=new mn, ft=new mn) {
                super(),
                this.isCubicBezierCurve = !0,
                this.type = "CubicBezierCurve",
                this.v0 = tt,
                this.v1 = lt,
                this.v2 = mt,
                this.v3 = ft
            }
            getPoint(tt, lt=new mn) {
                const mt = lt
                  , ft = this.v0
                  , xt = this.v1
                  , Ct = this.v2
                  , Mt = this.v3;
                return mt.set(S_(tt, ft.x, xt.x, Ct.x, Mt.x), S_(tt, ft.y, xt.y, Ct.y, Mt.y)),
                mt
            }
            copy(tt) {
                return super.copy(tt),
                this.v0.copy(tt.v0),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this.v3.copy(tt.v3),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v0 = this.v0.toArray(),
                tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt.v3 = this.v3.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v0.fromArray(tt.v0),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this.v3.fromArray(tt.v3),
                this
            }
        }
        class Kx extends Hl {
            constructor(tt=new Er, lt=new Er, mt=new Er, ft=new Er) {
                super(),
                this.isCubicBezierCurve3 = !0,
                this.type = "CubicBezierCurve3",
                this.v0 = tt,
                this.v1 = lt,
                this.v2 = mt,
                this.v3 = ft
            }
            getPoint(tt, lt=new Er) {
                const mt = lt
                  , ft = this.v0
                  , xt = this.v1
                  , Ct = this.v2
                  , Mt = this.v3;
                return mt.set(S_(tt, ft.x, xt.x, Ct.x, Mt.x), S_(tt, ft.y, xt.y, Ct.y, Mt.y), S_(tt, ft.z, xt.z, Ct.z, Mt.z)),
                mt
            }
            copy(tt) {
                return super.copy(tt),
                this.v0.copy(tt.v0),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this.v3.copy(tt.v3),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v0 = this.v0.toArray(),
                tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt.v3 = this.v3.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v0.fromArray(tt.v0),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this.v3.fromArray(tt.v3),
                this
            }
        }
        class sy extends Hl {
            constructor(tt=new mn, lt=new mn) {
                super(),
                this.isLineCurve = !0,
                this.type = "LineCurve",
                this.v1 = tt,
                this.v2 = lt
            }
            getPoint(tt, lt=new mn) {
                const mt = lt;
                return tt === 1 ? mt.copy(this.v2) : (mt.copy(this.v2).sub(this.v1),
                mt.multiplyScalar(tt).add(this.v1)),
                mt
            }
            getPointAt(tt, lt) {
                return this.getPoint(tt, lt)
            }
            getTangent(tt, lt=new mn) {
                return lt.subVectors(this.v2, this.v1).normalize()
            }
            getTangentAt(tt, lt) {
                return this.getTangent(tt, lt)
            }
            copy(tt) {
                return super.copy(tt),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this
            }
        }
        class Jx extends Hl {
            constructor(tt=new Er, lt=new Er) {
                super(),
                this.isLineCurve3 = !0,
                this.type = "LineCurve3",
                this.v1 = tt,
                this.v2 = lt
            }
            getPoint(tt, lt=new Er) {
                const mt = lt;
                return tt === 1 ? mt.copy(this.v2) : (mt.copy(this.v2).sub(this.v1),
                mt.multiplyScalar(tt).add(this.v1)),
                mt
            }
            getPointAt(tt, lt) {
                return this.getPoint(tt, lt)
            }
            getTangent(tt, lt=new Er) {
                return lt.subVectors(this.v2, this.v1).normalize()
            }
            getTangentAt(tt, lt) {
                return this.getTangent(tt, lt)
            }
            copy(tt) {
                return super.copy(tt),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this
            }
        }
        class ay extends Hl {
            constructor(tt=new mn, lt=new mn, mt=new mn) {
                super(),
                this.isQuadraticBezierCurve = !0,
                this.type = "QuadraticBezierCurve",
                this.v0 = tt,
                this.v1 = lt,
                this.v2 = mt
            }
            getPoint(tt, lt=new mn) {
                const mt = lt
                  , ft = this.v0
                  , xt = this.v1
                  , Ct = this.v2;
                return mt.set(w_(tt, ft.x, xt.x, Ct.x), w_(tt, ft.y, xt.y, Ct.y)),
                mt
            }
            copy(tt) {
                return super.copy(tt),
                this.v0.copy(tt.v0),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v0 = this.v0.toArray(),
                tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v0.fromArray(tt.v0),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this
            }
        }
        class ly extends Hl {
            constructor(tt=new Er, lt=new Er, mt=new Er) {
                super(),
                this.isQuadraticBezierCurve3 = !0,
                this.type = "QuadraticBezierCurve3",
                this.v0 = tt,
                this.v1 = lt,
                this.v2 = mt
            }
            getPoint(tt, lt=new Er) {
                const mt = lt
                  , ft = this.v0
                  , xt = this.v1
                  , Ct = this.v2;
                return mt.set(w_(tt, ft.x, xt.x, Ct.x), w_(tt, ft.y, xt.y, Ct.y), w_(tt, ft.z, xt.z, Ct.z)),
                mt
            }
            copy(tt) {
                return super.copy(tt),
                this.v0.copy(tt.v0),
                this.v1.copy(tt.v1),
                this.v2.copy(tt.v2),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.v0 = this.v0.toArray(),
                tt.v1 = this.v1.toArray(),
                tt.v2 = this.v2.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.v0.fromArray(tt.v0),
                this.v1.fromArray(tt.v1),
                this.v2.fromArray(tt.v2),
                this
            }
        }
        class cy extends Hl {
            constructor(tt=[]) {
                super(),
                this.isSplineCurve = !0,
                this.type = "SplineCurve",
                this.points = tt
            }
            getPoint(tt, lt=new mn) {
                const mt = lt
                  , ft = this.points
                  , xt = (ft.length - 1) * tt
                  , Ct = Math.floor(xt)
                  , Mt = xt - Ct
                  , Lt = ft[Ct === 0 ? Ct : Ct - 1]
                  , Nt = ft[Ct]
                  , jt = ft[Ct > ft.length - 2 ? ft.length - 1 : Ct + 1]
                  , Wt = ft[Ct > ft.length - 3 ? ft.length - 1 : Ct + 2];
                return mt.set(Yx(Mt, Lt.x, Nt.x, jt.x, Wt.x), Yx(Mt, Lt.y, Nt.y, jt.y, Wt.y)),
                mt
            }
            copy(tt) {
                super.copy(tt),
                this.points = [];
                for (let lt = 0, mt = tt.points.length; lt < mt; lt++) {
                    const ft = tt.points[lt];
                    this.points.push(ft.clone())
                }
                return this
            }
            toJSON() {
                const tt = super.toJSON();
                tt.points = [];
                for (let lt = 0, mt = this.points.length; lt < mt; lt++) {
                    const ft = this.points[lt];
                    tt.points.push(ft.toArray())
                }
                return tt
            }
            fromJSON(tt) {
                super.fromJSON(tt),
                this.points = [];
                for (let lt = 0, mt = tt.points.length; lt < mt; lt++) {
                    const ft = tt.points[lt];
                    this.points.push(new mn().fromArray(ft))
                }
                return this
            }
        }
        var zv = Object.freeze({
            __proto__: null,
            ArcCurve: $x,
            CatmullRomCurve3: Xx,
            CubicBezierCurve: oy,
            CubicBezierCurve3: Kx,
            EllipseCurve: Vv,
            LineCurve: sy,
            LineCurve3: Jx,
            QuadraticBezierCurve: ay,
            QuadraticBezierCurve3: ly,
            SplineCurve: cy
        });
        class Zx extends Hl {
            constructor() {
                super(),
                this.type = "CurvePath",
                this.curves = [],
                this.autoClose = !1
            }
            add(tt) {
                this.curves.push(tt)
            }
            closePath() {
                const tt = this.curves[0].getPoint(0)
                  , lt = this.curves[this.curves.length - 1].getPoint(1);
                if (!tt.equals(lt)) {
                    const mt = tt.isVector2 === !0 ? "LineCurve" : "LineCurve3";
                    this.curves.push(new zv[mt](lt,tt))
                }
                return this
            }
            getPoint(tt, lt) {
                const mt = tt * this.getLength()
                  , ft = this.getCurveLengths();
                let xt = 0;
                for (; xt < ft.length; ) {
                    if (ft[xt] >= mt) {
                        const Ct = ft[xt] - mt
                          , Mt = this.curves[xt]
                          , Lt = Mt.getLength()
                          , Nt = Lt === 0 ? 0 : 1 - Ct / Lt;
                        return Mt.getPointAt(Nt, lt)
                    }
                    xt++
                }
                return null
            }
            getLength() {
                const tt = this.getCurveLengths();
                return tt[tt.length - 1]
            }
            updateArcLengths() {
                this.needsUpdate = !0,
                this.cacheLengths = null,
                this.getCurveLengths()
            }
            getCurveLengths() {
                if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
                    return this.cacheLengths;
                const tt = [];
                let lt = 0;
                for (let mt = 0, ft = this.curves.length; mt < ft; mt++)
                    lt += this.curves[mt].getLength(),
                    tt.push(lt);
                return this.cacheLengths = tt,
                tt
            }
            getSpacedPoints(tt=40) {
                const lt = [];
                for (let mt = 0; mt <= tt; mt++)
                    lt.push(this.getPoint(mt / tt));
                return this.autoClose && lt.push(lt[0]),
                lt
            }
            getPoints(tt=12) {
                const lt = [];
                let mt;
                for (let ft = 0, xt = this.curves; ft < xt.length; ft++) {
                    const Ct = xt[ft]
                      , Mt = Ct.isEllipseCurve ? 2 * tt : Ct.isLineCurve || Ct.isLineCurve3 ? 1 : Ct.isSplineCurve ? tt * Ct.points.length : tt
                      , Lt = Ct.getPoints(Mt);
                    for (let Nt = 0; Nt < Lt.length; Nt++) {
                        const jt = Lt[Nt];
                        mt && mt.equals(jt) || (lt.push(jt),
                        mt = jt)
                    }
                }
                return this.autoClose && lt.length > 1 && !lt[lt.length - 1].equals(lt[0]) && lt.push(lt[0]),
                lt
            }
            copy(tt) {
                super.copy(tt),
                this.curves = [];
                for (let lt = 0, mt = tt.curves.length; lt < mt; lt++) {
                    const ft = tt.curves[lt];
                    this.curves.push(ft.clone())
                }
                return this.autoClose = tt.autoClose,
                this
            }
            toJSON() {
                const tt = super.toJSON();
                tt.autoClose = this.autoClose,
                tt.curves = [];
                for (let lt = 0, mt = this.curves.length; lt < mt; lt++) {
                    const ft = this.curves[lt];
                    tt.curves.push(ft.toJSON())
                }
                return tt
            }
            fromJSON(tt) {
                super.fromJSON(tt),
                this.autoClose = tt.autoClose,
                this.curves = [];
                for (let lt = 0, mt = tt.curves.length; lt < mt; lt++) {
                    const ft = tt.curves[lt];
                    this.curves.push(new zv[ft.type]().fromJSON(ft))
                }
                return this
            }
        }
        class E_ extends Zx {
            constructor(tt) {
                super(),
                this.type = "Path",
                this.currentPoint = new mn,
                tt && this.setFromPoints(tt)
            }
            setFromPoints(tt) {
                this.moveTo(tt[0].x, tt[0].y);
                for (let lt = 1, mt = tt.length; lt < mt; lt++)
                    this.lineTo(tt[lt].x, tt[lt].y);
                return this
            }
            moveTo(tt, lt) {
                return this.currentPoint.set(tt, lt),
                this
            }
            lineTo(tt, lt) {
                const mt = new sy(this.currentPoint.clone(),new mn(tt,lt));
                return this.curves.push(mt),
                this.currentPoint.set(tt, lt),
                this
            }
            quadraticCurveTo(tt, lt, mt, ft) {
                const xt = new ay(this.currentPoint.clone(),new mn(tt,lt),new mn(mt,ft));
                return this.curves.push(xt),
                this.currentPoint.set(mt, ft),
                this
            }
            bezierCurveTo(tt, lt, mt, ft, xt, Ct) {
                const Mt = new oy(this.currentPoint.clone(),new mn(tt,lt),new mn(mt,ft),new mn(xt,Ct));
                return this.curves.push(Mt),
                this.currentPoint.set(xt, Ct),
                this
            }
            splineThru(tt) {
                const lt = [this.currentPoint.clone()].concat(tt)
                  , mt = new cy(lt);
                return this.curves.push(mt),
                this.currentPoint.copy(tt[tt.length - 1]),
                this
            }
            arc(tt, lt, mt, ft, xt, Ct) {
                const Mt = this.currentPoint.x
                  , Lt = this.currentPoint.y;
                return this.absarc(tt + Mt, lt + Lt, mt, ft, xt, Ct),
                this
            }
            absarc(tt, lt, mt, ft, xt, Ct) {
                return this.absellipse(tt, lt, mt, mt, ft, xt, Ct),
                this
            }
            ellipse(tt, lt, mt, ft, xt, Ct, Mt, Lt) {
                const Nt = this.currentPoint.x
                  , jt = this.currentPoint.y;
                return this.absellipse(tt + Nt, lt + jt, mt, ft, xt, Ct, Mt, Lt),
                this
            }
            absellipse(tt, lt, mt, ft, xt, Ct, Mt, Lt) {
                const Nt = new Vv(tt,lt,mt,ft,xt,Ct,Mt,Lt);
                if (this.curves.length > 0) {
                    const Wt = Nt.getPoint(0);
                    Wt.equals(this.currentPoint) || this.lineTo(Wt.x, Wt.y)
                }
                this.curves.push(Nt);
                const jt = Nt.getPoint(1);
                return this.currentPoint.copy(jt),
                this
            }
            copy(tt) {
                return super.copy(tt),
                this.currentPoint.copy(tt.currentPoint),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.currentPoint = this.currentPoint.toArray(),
                tt
            }
            fromJSON(tt) {
                return super.fromJSON(tt),
                this.currentPoint.fromArray(tt.currentPoint),
                this
            }
        }
        class T_ extends bo {
            constructor(tt=[new mn(0,-.5), new mn(.5,0), new mn(0,.5)], lt=12, mt=0, ft=2 * Math.PI) {
                super(),
                this.type = "LatheGeometry",
                this.parameters = {
                    points: tt,
                    segments: lt,
                    phiStart: mt,
                    phiLength: ft
                },
                lt = Math.floor(lt),
                ft = qo(ft, 0, 2 * Math.PI);
                const xt = []
                  , Ct = []
                  , Mt = []
                  , Lt = []
                  , Nt = []
                  , jt = 1 / lt
                  , Wt = new Er
                  , Qt = new mn
                  , qt = new Er
                  , Xt = new Er
                  , Zt = new Er;
                let Yt = 0
                  , sr = 0;
                for (let er = 0; er <= tt.length - 1; er++)
                    switch (er) {
                    case 0:
                        Yt = tt[er + 1].x - tt[er].x,
                        sr = tt[er + 1].y - tt[er].y,
                        qt.x = 1 * sr,
                        qt.y = -Yt,
                        qt.z = 0 * sr,
                        Zt.copy(qt),
                        qt.normalize(),
                        Lt.push(qt.x, qt.y, qt.z);
                        break;
                    case tt.length - 1:
                        Lt.push(Zt.x, Zt.y, Zt.z);
                        break;
                    default:
                        Yt = tt[er + 1].x - tt[er].x,
                        sr = tt[er + 1].y - tt[er].y,
                        qt.x = 1 * sr,
                        qt.y = -Yt,
                        qt.z = 0 * sr,
                        Xt.copy(qt),
                        qt.x += Zt.x,
                        qt.y += Zt.y,
                        qt.z += Zt.z,
                        qt.normalize(),
                        Lt.push(qt.x, qt.y, qt.z),
                        Zt.copy(Xt)
                    }
                for (let er = 0; er <= lt; er++) {
                    const rr = mt + er * jt * ft
                      , xr = Math.sin(rr)
                      , br = Math.cos(rr);
                    for (let yr = 0; yr <= tt.length - 1; yr++) {
                        Wt.x = tt[yr].x * xr,
                        Wt.y = tt[yr].y,
                        Wt.z = tt[yr].x * br,
                        Ct.push(Wt.x, Wt.y, Wt.z),
                        Qt.x = er / lt,
                        Qt.y = yr / (tt.length - 1),
                        Mt.push(Qt.x, Qt.y);
                        const Pr = Lt[3 * yr + 0] * xr
                          , zr = Lt[3 * yr + 1]
                          , Nr = Lt[3 * yr + 0] * br;
                        Nt.push(Pr, zr, Nr)
                    }
                }
                for (let er = 0; er < lt; er++)
                    for (let rr = 0; rr < tt.length - 1; rr++) {
                        const xr = rr + er * tt.length
                          , br = xr
                          , yr = xr + tt.length
                          , Pr = xr + tt.length + 1
                          , zr = xr + 1;
                        xt.push(br, yr, zr),
                        xt.push(Pr, zr, yr)
                    }
                this.setIndex(xt),
                this.setAttribute("position", new Fn(Ct,3)),
                this.setAttribute("uv", new Fn(Mt,2)),
                this.setAttribute("normal", new Fn(Nt,3))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new T_(tt.points,tt.segments,tt.phiStart,tt.phiLength)
            }
        }
        class Hv extends T_ {
            constructor(tt=1, lt=1, mt=4, ft=8) {
                const xt = new E_;
                xt.absarc(0, -lt / 2, tt, 1.5 * Math.PI, 0),
                xt.absarc(0, lt / 2, tt, 0, .5 * Math.PI),
                super(xt.getPoints(mt), ft),
                this.type = "CapsuleGeometry",
                this.parameters = {
                    radius: tt,
                    length: lt,
                    capSegments: mt,
                    radialSegments: ft
                }
            }
            static fromJSON(tt) {
                return new Hv(tt.radius,tt.length,tt.capSegments,tt.radialSegments)
            }
        }
        class Qv extends bo {
            constructor(tt=1, lt=32, mt=0, ft=2 * Math.PI) {
                super(),
                this.type = "CircleGeometry",
                this.parameters = {
                    radius: tt,
                    segments: lt,
                    thetaStart: mt,
                    thetaLength: ft
                },
                lt = Math.max(3, lt);
                const xt = []
                  , Ct = []
                  , Mt = []
                  , Lt = []
                  , Nt = new Er
                  , jt = new mn;
                Ct.push(0, 0, 0),
                Mt.push(0, 0, 1),
                Lt.push(.5, .5);
                for (let Wt = 0, Qt = 3; Wt <= lt; Wt++,
                Qt += 3) {
                    const qt = mt + Wt / lt * ft;
                    Nt.x = tt * Math.cos(qt),
                    Nt.y = tt * Math.sin(qt),
                    Ct.push(Nt.x, Nt.y, Nt.z),
                    Mt.push(0, 0, 1),
                    jt.x = (Ct[Qt] / tt + 1) / 2,
                    jt.y = (Ct[Qt + 1] / tt + 1) / 2,
                    Lt.push(jt.x, jt.y)
                }
                for (let Wt = 1; Wt <= lt; Wt++)
                    xt.push(Wt, Wt + 1, 0);
                this.setIndex(xt),
                this.setAttribute("position", new Fn(Ct,3)),
                this.setAttribute("normal", new Fn(Mt,3)),
                this.setAttribute("uv", new Fn(Lt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new Qv(tt.radius,tt.segments,tt.thetaStart,tt.thetaLength)
            }
        }
        class Im extends bo {
            constructor(tt=1, lt=1, mt=1, ft=32, xt=1, Ct=!1, Mt=0, Lt=2 * Math.PI) {
                super(),
                this.type = "CylinderGeometry",
                this.parameters = {
                    radiusTop: tt,
                    radiusBottom: lt,
                    height: mt,
                    radialSegments: ft,
                    heightSegments: xt,
                    openEnded: Ct,
                    thetaStart: Mt,
                    thetaLength: Lt
                };
                const Nt = this;
                ft = Math.floor(ft),
                xt = Math.floor(xt);
                const jt = []
                  , Wt = []
                  , Qt = []
                  , qt = [];
                let Xt = 0;
                const Zt = []
                  , Yt = mt / 2;
                let sr = 0;
                function er(rr) {
                    const xr = Xt
                      , br = new mn
                      , yr = new Er;
                    let Pr = 0;
                    const zr = rr === !0 ? tt : lt
                      , Nr = rr === !0 ? 1 : -1;
                    for (let Gr = 1; Gr <= ft; Gr++)
                        Wt.push(0, Yt * Nr, 0),
                        Qt.push(0, Nr, 0),
                        qt.push(.5, .5),
                        Xt++;
                    const Vr = Xt;
                    for (let Gr = 0; Gr <= ft; Gr++) {
                        const Hr = Gr / ft * Lt + Mt
                          , _n = Math.cos(Hr)
                          , dn = Math.sin(Hr);
                        yr.x = zr * dn,
                        yr.y = Yt * Nr,
                        yr.z = zr * _n,
                        Wt.push(yr.x, yr.y, yr.z),
                        Qt.push(0, Nr, 0),
                        br.x = .5 * _n + .5,
                        br.y = .5 * dn * Nr + .5,
                        qt.push(br.x, br.y),
                        Xt++
                    }
                    for (let Gr = 0; Gr < ft; Gr++) {
                        const Hr = xr + Gr
                          , _n = Vr + Gr;
                        rr === !0 ? jt.push(_n, _n + 1, Hr) : jt.push(_n + 1, _n, Hr),
                        Pr += 3
                    }
                    Nt.addGroup(sr, Pr, rr === !0 ? 1 : 2),
                    sr += Pr
                }
                (function() {
                    const rr = new Er
                      , xr = new Er;
                    let br = 0;
                    const yr = (lt - tt) / mt;
                    for (let Pr = 0; Pr <= xt; Pr++) {
                        const zr = []
                          , Nr = Pr / xt
                          , Vr = Nr * (lt - tt) + tt;
                        for (let Gr = 0; Gr <= ft; Gr++) {
                            const Hr = Gr / ft
                              , _n = Hr * Lt + Mt
                              , dn = Math.sin(_n)
                              , kn = Math.cos(_n);
                            xr.x = Vr * dn,
                            xr.y = -Nr * mt + Yt,
                            xr.z = Vr * kn,
                            Wt.push(xr.x, xr.y, xr.z),
                            rr.set(dn, yr, kn).normalize(),
                            Qt.push(rr.x, rr.y, rr.z),
                            qt.push(Hr, 1 - Nr),
                            zr.push(Xt++)
                        }
                        Zt.push(zr)
                    }
                    for (let Pr = 0; Pr < ft; Pr++)
                        for (let zr = 0; zr < xt; zr++) {
                            const Nr = Zt[zr][Pr]
                              , Vr = Zt[zr + 1][Pr]
                              , Gr = Zt[zr + 1][Pr + 1]
                              , Hr = Zt[zr][Pr + 1];
                            jt.push(Nr, Vr, Hr),
                            jt.push(Vr, Gr, Hr),
                            br += 6
                        }
                    Nt.addGroup(sr, br, 0),
                    sr += br
                }
                )(),
                Ct === !1 && (tt > 0 && er(!0),
                lt > 0 && er(!1)),
                this.setIndex(jt),
                this.setAttribute("position", new Fn(Wt,3)),
                this.setAttribute("normal", new Fn(Qt,3)),
                this.setAttribute("uv", new Fn(qt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new Im(tt.radiusTop,tt.radiusBottom,tt.height,tt.radialSegments,tt.heightSegments,tt.openEnded,tt.thetaStart,tt.thetaLength)
            }
        }
        class Wv extends Im {
            constructor(tt=1, lt=1, mt=32, ft=1, xt=!1, Ct=0, Mt=2 * Math.PI) {
                super(0, tt, lt, mt, ft, xt, Ct, Mt),
                this.type = "ConeGeometry",
                this.parameters = {
                    radius: tt,
                    height: lt,
                    radialSegments: mt,
                    heightSegments: ft,
                    openEnded: xt,
                    thetaStart: Ct,
                    thetaLength: Mt
                }
            }
            static fromJSON(tt) {
                return new Wv(tt.radius,tt.height,tt.radialSegments,tt.heightSegments,tt.openEnded,tt.thetaStart,tt.thetaLength)
            }
        }
        class tp extends bo {
            constructor(tt=[], lt=[], mt=1, ft=0) {
                super(),
                this.type = "PolyhedronGeometry",
                this.parameters = {
                    vertices: tt,
                    indices: lt,
                    radius: mt,
                    detail: ft
                };
                const xt = []
                  , Ct = [];
                function Mt(Qt, qt, Xt, Zt) {
                    const Yt = Zt + 1
                      , sr = [];
                    for (let er = 0; er <= Yt; er++) {
                        sr[er] = [];
                        const rr = Qt.clone().lerp(Xt, er / Yt)
                          , xr = qt.clone().lerp(Xt, er / Yt)
                          , br = Yt - er;
                        for (let yr = 0; yr <= br; yr++)
                            sr[er][yr] = yr === 0 && er === Yt ? rr : rr.clone().lerp(xr, yr / br)
                    }
                    for (let er = 0; er < Yt; er++)
                        for (let rr = 0; rr < 2 * (Yt - er) - 1; rr++) {
                            const xr = Math.floor(rr / 2);
                            rr % 2 == 0 ? (Lt(sr[er][xr + 1]),
                            Lt(sr[er + 1][xr]),
                            Lt(sr[er][xr])) : (Lt(sr[er][xr + 1]),
                            Lt(sr[er + 1][xr + 1]),
                            Lt(sr[er + 1][xr]))
                        }
                }
                function Lt(Qt) {
                    xt.push(Qt.x, Qt.y, Qt.z)
                }
                function Nt(Qt, qt) {
                    const Xt = 3 * Qt;
                    qt.x = tt[Xt + 0],
                    qt.y = tt[Xt + 1],
                    qt.z = tt[Xt + 2]
                }
                function jt(Qt, qt, Xt, Zt) {
                    Zt < 0 && Qt.x === 1 && (Ct[qt] = Qt.x - 1),
                    Xt.x === 0 && Xt.z === 0 && (Ct[qt] = Zt / 2 / Math.PI + .5)
                }
                function Wt(Qt) {
                    return Math.atan2(Qt.z, -Qt.x)
                }
                (function(Qt) {
                    const qt = new Er
                      , Xt = new Er
                      , Zt = new Er;
                    for (let Yt = 0; Yt < lt.length; Yt += 3)
                        Nt(lt[Yt + 0], qt),
                        Nt(lt[Yt + 1], Xt),
                        Nt(lt[Yt + 2], Zt),
                        Mt(qt, Xt, Zt, Qt)
                }
                )(ft),
                function(Qt) {
                    const qt = new Er;
                    for (let Xt = 0; Xt < xt.length; Xt += 3)
                        qt.x = xt[Xt + 0],
                        qt.y = xt[Xt + 1],
                        qt.z = xt[Xt + 2],
                        qt.normalize().multiplyScalar(Qt),
                        xt[Xt + 0] = qt.x,
                        xt[Xt + 1] = qt.y,
                        xt[Xt + 2] = qt.z
                }(mt),
                function() {
                    const Qt = new Er;
                    for (let Xt = 0; Xt < xt.length; Xt += 3) {
                        Qt.x = xt[Xt + 0],
                        Qt.y = xt[Xt + 1],
                        Qt.z = xt[Xt + 2];
                        const Zt = Wt(Qt) / 2 / Math.PI + .5
                          , Yt = (qt = Qt,
                        Math.atan2(-qt.y, Math.sqrt(qt.x * qt.x + qt.z * qt.z)) / Math.PI + .5);
                        Ct.push(Zt, 1 - Yt)
                    }
                    var qt;
                    (function() {
                        const Xt = new Er
                          , Zt = new Er
                          , Yt = new Er
                          , sr = new Er
                          , er = new mn
                          , rr = new mn
                          , xr = new mn;
                        for (let br = 0, yr = 0; br < xt.length; br += 9,
                        yr += 6) {
                            Xt.set(xt[br + 0], xt[br + 1], xt[br + 2]),
                            Zt.set(xt[br + 3], xt[br + 4], xt[br + 5]),
                            Yt.set(xt[br + 6], xt[br + 7], xt[br + 8]),
                            er.set(Ct[yr + 0], Ct[yr + 1]),
                            rr.set(Ct[yr + 2], Ct[yr + 3]),
                            xr.set(Ct[yr + 4], Ct[yr + 5]),
                            sr.copy(Xt).add(Zt).add(Yt).divideScalar(3);
                            const Pr = Wt(sr);
                            jt(er, yr + 0, Xt, Pr),
                            jt(rr, yr + 2, Zt, Pr),
                            jt(xr, yr + 4, Yt, Pr)
                        }
                    }
                    )(),
                    function() {
                        for (let Xt = 0; Xt < Ct.length; Xt += 6) {
                            const Zt = Ct[Xt + 0]
                              , Yt = Ct[Xt + 2]
                              , sr = Ct[Xt + 4]
                              , er = Math.max(Zt, Yt, sr)
                              , rr = Math.min(Zt, Yt, sr);
                            er > .9 && rr < .1 && (Zt < .2 && (Ct[Xt + 0] += 1),
                            Yt < .2 && (Ct[Xt + 2] += 1),
                            sr < .2 && (Ct[Xt + 4] += 1))
                        }
                    }()
                }(),
                this.setAttribute("position", new Fn(xt,3)),
                this.setAttribute("normal", new Fn(xt.slice(),3)),
                this.setAttribute("uv", new Fn(Ct,2)),
                ft === 0 ? this.computeVertexNormals() : this.normalizeNormals()
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new tp(tt.vertices,tt.indices,tt.radius,tt.details)
            }
        }
        class qv extends tp {
            constructor(tt=1, lt=0) {
                const mt = (1 + Math.sqrt(5)) / 2
                  , ft = 1 / mt;
                super([-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -ft, -mt, 0, -ft, mt, 0, ft, -mt, 0, ft, mt, -ft, -mt, 0, -ft, mt, 0, ft, -mt, 0, ft, mt, 0, -mt, 0, -ft, mt, 0, -ft, -mt, 0, ft, mt, 0, ft], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], tt, lt),
                this.type = "DodecahedronGeometry",
                this.parameters = {
                    radius: tt,
                    detail: lt
                }
            }
            static fromJSON(tt) {
                return new qv(tt.radius,tt.detail)
            }
        }
        const $v = new Er
          , Xv = new Er
          , uy = new Er
          , Yv = new Es;
        class eA extends bo {
            constructor(tt=null, lt=1) {
                if (super(),
                this.type = "EdgesGeometry",
                this.parameters = {
                    geometry: tt,
                    thresholdAngle: lt
                },
                tt !== null) {
                    const ft = Math.pow(10, 4)
                      , xt = Math.cos(Zl * lt)
                      , Ct = tt.getIndex()
                      , Mt = tt.getAttribute("position")
                      , Lt = Ct ? Ct.count : Mt.count
                      , Nt = [0, 0, 0]
                      , jt = ["a", "b", "c"]
                      , Wt = new Array(3)
                      , Qt = {}
                      , qt = [];
                    for (let Xt = 0; Xt < Lt; Xt += 3) {
                        Ct ? (Nt[0] = Ct.getX(Xt),
                        Nt[1] = Ct.getX(Xt + 1),
                        Nt[2] = Ct.getX(Xt + 2)) : (Nt[0] = Xt,
                        Nt[1] = Xt + 1,
                        Nt[2] = Xt + 2);
                        const {a: Zt, b: Yt, c: sr} = Yv;
                        if (Zt.fromBufferAttribute(Mt, Nt[0]),
                        Yt.fromBufferAttribute(Mt, Nt[1]),
                        sr.fromBufferAttribute(Mt, Nt[2]),
                        Yv.getNormal(uy),
                        Wt[0] = `${Math.round(Zt.x * ft)},${Math.round(Zt.y * ft)},${Math.round(Zt.z * ft)}`,
                        Wt[1] = `${Math.round(Yt.x * ft)},${Math.round(Yt.y * ft)},${Math.round(Yt.z * ft)}`,
                        Wt[2] = `${Math.round(sr.x * ft)},${Math.round(sr.y * ft)},${Math.round(sr.z * ft)}`,
                        Wt[0] !== Wt[1] && Wt[1] !== Wt[2] && Wt[2] !== Wt[0])
                            for (let er = 0; er < 3; er++) {
                                const rr = (er + 1) % 3
                                  , xr = Wt[er]
                                  , br = Wt[rr]
                                  , yr = Yv[jt[er]]
                                  , Pr = Yv[jt[rr]]
                                  , zr = `${xr}_${br}`
                                  , Nr = `${br}_${xr}`;
                                Nr in Qt && Qt[Nr] ? (uy.dot(Qt[Nr].normal) <= xt && (qt.push(yr.x, yr.y, yr.z),
                                qt.push(Pr.x, Pr.y, Pr.z)),
                                Qt[Nr] = null) : zr in Qt || (Qt[zr] = {
                                    index0: Nt[er],
                                    index1: Nt[rr],
                                    normal: uy.clone()
                                })
                            }
                    }
                    for (const Xt in Qt)
                        if (Qt[Xt]) {
                            const {index0: Zt, index1: Yt} = Qt[Xt];
                            $v.fromBufferAttribute(Mt, Zt),
                            Xv.fromBufferAttribute(Mt, Yt),
                            qt.push($v.x, $v.y, $v.z),
                            qt.push(Xv.x, Xv.y, Xv.z)
                        }
                    this.setAttribute("position", new Fn(qt,3))
                }
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
        }
        class Pp extends E_ {
            constructor(tt) {
                super(tt),
                this.uuid = Ms(),
                this.type = "Shape",
                this.holes = []
            }
            getPointsHoles(tt) {
                const lt = [];
                for (let mt = 0, ft = this.holes.length; mt < ft; mt++)
                    lt[mt] = this.holes[mt].getPoints(tt);
                return lt
            }
            extractPoints(tt) {
                return {
                    shape: this.getPoints(tt),
                    holes: this.getPointsHoles(tt)
                }
            }
            copy(tt) {
                super.copy(tt),
                this.holes = [];
                for (let lt = 0, mt = tt.holes.length; lt < mt; lt++) {
                    const ft = tt.holes[lt];
                    this.holes.push(ft.clone())
                }
                return this
            }
            toJSON() {
                const tt = super.toJSON();
                tt.uuid = this.uuid,
                tt.holes = [];
                for (let lt = 0, mt = this.holes.length; lt < mt; lt++) {
                    const ft = this.holes[lt];
                    tt.holes.push(ft.toJSON())
                }
                return tt
            }
            fromJSON(tt) {
                super.fromJSON(tt),
                this.uuid = tt.uuid,
                this.holes = [];
                for (let lt = 0, mt = tt.holes.length; lt < mt; lt++) {
                    const ft = tt.holes[lt];
                    this.holes.push(new E_().fromJSON(ft))
                }
                return this
            }
        }
        function tA(Tt, tt, lt, mt, ft) {
            let xt, Ct;
            if (ft === function(Mt, Lt, Nt, jt) {
                let Wt = 0;
                for (let Qt = Lt, qt = Nt - jt; Qt < Nt; Qt += jt)
                    Wt += (Mt[qt] - Mt[Qt]) * (Mt[Qt + 1] + Mt[qt + 1]),
                    qt = Qt;
                return Wt
            }(Tt, tt, lt, mt) > 0)
                for (xt = tt; xt < lt; xt += mt)
                    Ct = iA(xt, Tt[xt], Tt[xt + 1], Ct);
            else
                for (xt = lt - mt; xt >= tt; xt -= mt)
                    Ct = iA(xt, Tt[xt], Tt[xt + 1], Ct);
            return Ct && Kv(Ct, Ct.next) && (M_(Ct),
            Ct = Ct.next),
            Ct
        }
        function Mp(Tt, tt) {
            if (!Tt)
                return Tt;
            tt || (tt = Tt);
            let lt, mt = Tt;
            do
                if (lt = !1,
                mt.steiner || !Kv(mt, mt.next) && Ko(mt.prev, mt, mt.next) !== 0)
                    mt = mt.next;
                else {
                    if (M_(mt),
                    mt = tt = mt.prev,
                    mt === mt.next)
                        break;
                    lt = !0
                }
            while (lt || mt !== tt);
            return tt
        }
        function C_(Tt, tt, lt, mt, ft, xt, Ct) {
            if (!Tt)
                return;
            !Ct && xt && function(jt, Wt, Qt, qt) {
                let Xt = jt;
                do
                    Xt.z === 0 && (Xt.z = dy(Xt.x, Xt.y, Wt, Qt, qt)),
                    Xt.prevZ = Xt.prev,
                    Xt.nextZ = Xt.next,
                    Xt = Xt.next;
                while (Xt !== jt);
                Xt.prevZ.nextZ = null,
                Xt.prevZ = null,
                function(Zt) {
                    let Yt, sr, er, rr, xr, br, yr, Pr, zr = 1;
                    do {
                        for (sr = Zt,
                        Zt = null,
                        xr = null,
                        br = 0; sr; ) {
                            for (br++,
                            er = sr,
                            yr = 0,
                            Yt = 0; Yt < zr && (yr++,
                            er = er.nextZ,
                            er); Yt++)
                                ;
                            for (Pr = zr; yr > 0 || Pr > 0 && er; )
                                yr !== 0 && (Pr === 0 || !er || sr.z <= er.z) ? (rr = sr,
                                sr = sr.nextZ,
                                yr--) : (rr = er,
                                er = er.nextZ,
                                Pr--),
                                xr ? xr.nextZ = rr : Zt = rr,
                                rr.prevZ = xr,
                                xr = rr;
                            sr = er
                        }
                        xr.nextZ = null,
                        zr *= 2
                    } while (br > 1)
                }(Xt)
            }(Tt, mt, ft, xt);
            let Mt, Lt, Nt = Tt;
            for (; Tt.prev !== Tt.next; )
                if (Mt = Tt.prev,
                Lt = Tt.next,
                xt ? hS(Tt, mt, ft, xt) : pS(Tt))
                    tt.push(Mt.i / lt | 0),
                    tt.push(Tt.i / lt | 0),
                    tt.push(Lt.i / lt | 0),
                    M_(Tt),
                    Tt = Lt.next,
                    Nt = Lt.next;
                else if ((Tt = Lt) === Nt) {
                    Ct ? Ct === 1 ? C_(Tt = mS(Mp(Tt), tt, lt), tt, lt, mt, ft, xt, 2) : Ct === 2 && fS(Tt, tt, lt, mt, ft, xt) : C_(Mp(Tt), tt, lt, mt, ft, xt, 1);
                    break
                }
        }
        function pS(Tt) {
            const tt = Tt.prev
              , lt = Tt
              , mt = Tt.next;
            if (Ko(tt, lt, mt) >= 0)
                return !1;
            const ft = tt.x
              , xt = lt.x
              , Ct = mt.x
              , Mt = tt.y
              , Lt = lt.y
              , Nt = mt.y
              , jt = ft < xt ? ft < Ct ? ft : Ct : xt < Ct ? xt : Ct
              , Wt = Mt < Lt ? Mt < Nt ? Mt : Nt : Lt < Nt ? Lt : Nt
              , Qt = ft > xt ? ft > Ct ? ft : Ct : xt > Ct ? xt : Ct
              , qt = Mt > Lt ? Mt > Nt ? Mt : Nt : Lt > Nt ? Lt : Nt;
            let Xt = mt.next;
            for (; Xt !== tt; ) {
                if (Xt.x >= jt && Xt.x <= Qt && Xt.y >= Wt && Xt.y <= qt && km(ft, Mt, xt, Lt, Ct, Nt, Xt.x, Xt.y) && Ko(Xt.prev, Xt, Xt.next) >= 0)
                    return !1;
                Xt = Xt.next
            }
            return !0
        }
        function hS(Tt, tt, lt, mt) {
            const ft = Tt.prev
              , xt = Tt
              , Ct = Tt.next;
            if (Ko(ft, xt, Ct) >= 0)
                return !1;
            const Mt = ft.x
              , Lt = xt.x
              , Nt = Ct.x
              , jt = ft.y
              , Wt = xt.y
              , Qt = Ct.y
              , qt = Mt < Lt ? Mt < Nt ? Mt : Nt : Lt < Nt ? Lt : Nt
              , Xt = jt < Wt ? jt < Qt ? jt : Qt : Wt < Qt ? Wt : Qt
              , Zt = Mt > Lt ? Mt > Nt ? Mt : Nt : Lt > Nt ? Lt : Nt
              , Yt = jt > Wt ? jt > Qt ? jt : Qt : Wt > Qt ? Wt : Qt
              , sr = dy(qt, Xt, tt, lt, mt)
              , er = dy(Zt, Yt, tt, lt, mt);
            let rr = Tt.prevZ
              , xr = Tt.nextZ;
            for (; rr && rr.z >= sr && xr && xr.z <= er; ) {
                if (rr.x >= qt && rr.x <= Zt && rr.y >= Xt && rr.y <= Yt && rr !== ft && rr !== Ct && km(Mt, jt, Lt, Wt, Nt, Qt, rr.x, rr.y) && Ko(rr.prev, rr, rr.next) >= 0 || (rr = rr.prevZ,
                xr.x >= qt && xr.x <= Zt && xr.y >= Xt && xr.y <= Yt && xr !== ft && xr !== Ct && km(Mt, jt, Lt, Wt, Nt, Qt, xr.x, xr.y) && Ko(xr.prev, xr, xr.next) >= 0))
                    return !1;
                xr = xr.nextZ
            }
            for (; rr && rr.z >= sr; ) {
                if (rr.x >= qt && rr.x <= Zt && rr.y >= Xt && rr.y <= Yt && rr !== ft && rr !== Ct && km(Mt, jt, Lt, Wt, Nt, Qt, rr.x, rr.y) && Ko(rr.prev, rr, rr.next) >= 0)
                    return !1;
                rr = rr.prevZ
            }
            for (; xr && xr.z <= er; ) {
                if (xr.x >= qt && xr.x <= Zt && xr.y >= Xt && xr.y <= Yt && xr !== ft && xr !== Ct && km(Mt, jt, Lt, Wt, Nt, Qt, xr.x, xr.y) && Ko(xr.prev, xr, xr.next) >= 0)
                    return !1;
                xr = xr.nextZ
            }
            return !0
        }
        function mS(Tt, tt, lt) {
            let mt = Tt;
            do {
                const ft = mt.prev
                  , xt = mt.next.next;
                !Kv(ft, xt) && rA(ft, mt, mt.next, xt) && P_(ft, xt) && P_(xt, ft) && (tt.push(ft.i / lt | 0),
                tt.push(mt.i / lt | 0),
                tt.push(xt.i / lt | 0),
                M_(mt),
                M_(mt.next),
                mt = Tt = xt),
                mt = mt.next
            } while (mt !== Tt);
            return Mp(mt)
        }
        function fS(Tt, tt, lt, mt, ft, xt) {
            let Ct = Tt;
            do {
                let Mt = Ct.next.next;
                for (; Mt !== Ct.prev; ) {
                    if (Ct.i !== Mt.i && xS(Ct, Mt)) {
                        let Lt = nA(Ct, Mt);
                        return Ct = Mp(Ct, Ct.next),
                        Lt = Mp(Lt, Lt.next),
                        C_(Ct, tt, lt, mt, ft, xt, 0),
                        void C_(Lt, tt, lt, mt, ft, xt, 0)
                    }
                    Mt = Mt.next
                }
                Ct = Ct.next
            } while (Ct !== Tt)
        }
        function gS(Tt, tt) {
            return Tt.x - tt.x
        }
        function _S(Tt, tt) {
            const lt = function(ft, xt) {
                let Ct, Mt = xt, Lt = -1 / 0;
                const Nt = ft.x
                  , jt = ft.y;
                do {
                    if (jt <= Mt.y && jt >= Mt.next.y && Mt.next.y !== Mt.y) {
                        const Yt = Mt.x + (jt - Mt.y) * (Mt.next.x - Mt.x) / (Mt.next.y - Mt.y);
                        if (Yt <= Nt && Yt > Lt && (Lt = Yt,
                        Ct = Mt.x < Mt.next.x ? Mt : Mt.next,
                        Yt === Nt))
                            return Ct
                    }
                    Mt = Mt.next
                } while (Mt !== xt);
                if (!Ct)
                    return null;
                const Wt = Ct
                  , Qt = Ct.x
                  , qt = Ct.y;
                let Xt, Zt = 1 / 0;
                Mt = Ct;
                do
                    Nt >= Mt.x && Mt.x >= Qt && Nt !== Mt.x && km(jt < qt ? Nt : Lt, jt, Qt, qt, jt < qt ? Lt : Nt, jt, Mt.x, Mt.y) && (Xt = Math.abs(jt - Mt.y) / (Nt - Mt.x),
                    P_(Mt, ft) && (Xt < Zt || Xt === Zt && (Mt.x > Ct.x || Mt.x === Ct.x && vS(Ct, Mt))) && (Ct = Mt,
                    Zt = Xt)),
                    Mt = Mt.next;
                while (Mt !== Wt);
                return Ct
            }(Tt, tt);
            if (!lt)
                return tt;
            const mt = nA(lt, Tt);
            return Mp(mt, mt.next),
            Mp(lt, lt.next)
        }
        function vS(Tt, tt) {
            return Ko(Tt.prev, Tt, tt.prev) < 0 && Ko(tt.next, Tt, Tt.next) < 0
        }
        function dy(Tt, tt, lt, mt, ft) {
            return (Tt = 1431655765 & ((Tt = 858993459 & ((Tt = 252645135 & ((Tt = 16711935 & ((Tt = (Tt - lt) * ft | 0) | Tt << 8)) | Tt << 4)) | Tt << 2)) | Tt << 1)) | (tt = 1431655765 & ((tt = 858993459 & ((tt = 252645135 & ((tt = 16711935 & ((tt = (tt - mt) * ft | 0) | tt << 8)) | tt << 4)) | tt << 2)) | tt << 1)) << 1
        }
        function yS(Tt) {
            let tt = Tt
              , lt = Tt;
            do
                (tt.x < lt.x || tt.x === lt.x && tt.y < lt.y) && (lt = tt),
                tt = tt.next;
            while (tt !== Tt);
            return lt
        }
        function km(Tt, tt, lt, mt, ft, xt, Ct, Mt) {
            return (ft - Ct) * (tt - Mt) >= (Tt - Ct) * (xt - Mt) && (Tt - Ct) * (mt - Mt) >= (lt - Ct) * (tt - Mt) && (lt - Ct) * (xt - Mt) >= (ft - Ct) * (mt - Mt)
        }
        function xS(Tt, tt) {
            return Tt.next.i !== tt.i && Tt.prev.i !== tt.i && !function(lt, mt) {
                let ft = lt;
                do {
                    if (ft.i !== lt.i && ft.next.i !== lt.i && ft.i !== mt.i && ft.next.i !== mt.i && rA(ft, ft.next, lt, mt))
                        return !0;
                    ft = ft.next
                } while (ft !== lt);
                return !1
            }(Tt, tt) && (P_(Tt, tt) && P_(tt, Tt) && function(lt, mt) {
                let ft = lt
                  , xt = !1;
                const Ct = (lt.x + mt.x) / 2
                  , Mt = (lt.y + mt.y) / 2;
                do
                    ft.y > Mt != ft.next.y > Mt && ft.next.y !== ft.y && Ct < (ft.next.x - ft.x) * (Mt - ft.y) / (ft.next.y - ft.y) + ft.x && (xt = !xt),
                    ft = ft.next;
                while (ft !== lt);
                return xt
            }(Tt, tt) && (Ko(Tt.prev, Tt, tt.prev) || Ko(Tt, tt.prev, tt)) || Kv(Tt, tt) && Ko(Tt.prev, Tt, Tt.next) > 0 && Ko(tt.prev, tt, tt.next) > 0)
        }
        function Ko(Tt, tt, lt) {
            return (tt.y - Tt.y) * (lt.x - tt.x) - (tt.x - Tt.x) * (lt.y - tt.y)
        }
        function Kv(Tt, tt) {
            return Tt.x === tt.x && Tt.y === tt.y
        }
        function rA(Tt, tt, lt, mt) {
            const ft = Zv(Ko(Tt, tt, lt))
              , xt = Zv(Ko(Tt, tt, mt))
              , Ct = Zv(Ko(lt, mt, Tt))
              , Mt = Zv(Ko(lt, mt, tt));
            return ft !== xt && Ct !== Mt || !(ft !== 0 || !Jv(Tt, lt, tt)) || !(xt !== 0 || !Jv(Tt, mt, tt)) || !(Ct !== 0 || !Jv(lt, Tt, mt)) || !(Mt !== 0 || !Jv(lt, tt, mt))
        }
        function Jv(Tt, tt, lt) {
            return tt.x <= Math.max(Tt.x, lt.x) && tt.x >= Math.min(Tt.x, lt.x) && tt.y <= Math.max(Tt.y, lt.y) && tt.y >= Math.min(Tt.y, lt.y)
        }
        function Zv(Tt) {
            return Tt > 0 ? 1 : Tt < 0 ? -1 : 0
        }
        function P_(Tt, tt) {
            return Ko(Tt.prev, Tt, Tt.next) < 0 ? Ko(Tt, tt, Tt.next) >= 0 && Ko(Tt, Tt.prev, tt) >= 0 : Ko(Tt, tt, Tt.prev) < 0 || Ko(Tt, Tt.next, tt) < 0
        }
        function nA(Tt, tt) {
            const lt = new py(Tt.i,Tt.x,Tt.y)
              , mt = new py(tt.i,tt.x,tt.y)
              , ft = Tt.next
              , xt = tt.prev;
            return Tt.next = tt,
            tt.prev = Tt,
            lt.next = ft,
            ft.prev = lt,
            mt.next = lt,
            lt.prev = mt,
            xt.next = mt,
            mt.prev = xt,
            mt
        }
        function iA(Tt, tt, lt, mt) {
            const ft = new py(Tt,tt,lt);
            return mt ? (ft.next = mt.next,
            ft.prev = mt,
            mt.next.prev = ft,
            mt.next = ft) : (ft.prev = ft,
            ft.next = ft),
            ft
        }
        function M_(Tt) {
            Tt.next.prev = Tt.prev,
            Tt.prev.next = Tt.next,
            Tt.prevZ && (Tt.prevZ.nextZ = Tt.nextZ),
            Tt.nextZ && (Tt.nextZ.prevZ = Tt.prevZ)
        }
        function py(Tt, tt, lt) {
            this.i = Tt,
            this.x = tt,
            this.y = lt,
            this.prev = null,
            this.next = null,
            this.z = 0,
            this.prevZ = null,
            this.nextZ = null,
            this.steiner = !1
        }
        class ou {
            static area(tt) {
                const lt = tt.length;
                let mt = 0;
                for (let ft = lt - 1, xt = 0; xt < lt; ft = xt++)
                    mt += tt[ft].x * tt[xt].y - tt[xt].x * tt[ft].y;
                return .5 * mt
            }
            static isClockWise(tt) {
                return ou.area(tt) < 0
            }
            static triangulateShape(tt, lt) {
                const mt = []
                  , ft = []
                  , xt = [];
                oA(tt),
                sA(mt, tt);
                let Ct = tt.length;
                lt.forEach(oA);
                for (let Lt = 0; Lt < lt.length; Lt++)
                    ft.push(Ct),
                    Ct += lt[Lt].length,
                    sA(mt, lt[Lt]);
                const Mt = function(Lt, Nt, jt=2) {
                    const Wt = Nt && Nt.length
                      , Qt = Wt ? Nt[0] * jt : Lt.length;
                    let qt = tA(Lt, 0, Qt, jt, !0);
                    const Xt = [];
                    if (!qt || qt.next === qt.prev)
                        return Xt;
                    let Zt, Yt, sr, er, rr, xr, br;
                    if (Wt && (qt = function(yr, Pr, zr, Nr) {
                        const Vr = [];
                        let Gr, Hr, _n, dn, kn;
                        for (Gr = 0,
                        Hr = Pr.length; Gr < Hr; Gr++)
                            _n = Pr[Gr] * Nr,
                            dn = Gr < Hr - 1 ? Pr[Gr + 1] * Nr : yr.length,
                            kn = tA(yr, _n, dn, Nr, !1),
                            kn === kn.next && (kn.steiner = !0),
                            Vr.push(yS(kn));
                        for (Vr.sort(gS),
                        Gr = 0; Gr < Vr.length; Gr++)
                            zr = _S(Vr[Gr], zr);
                        return zr
                    }(Lt, Nt, qt, jt)),
                    Lt.length > 80 * jt) {
                        Zt = sr = Lt[0],
                        Yt = er = Lt[1];
                        for (let yr = jt; yr < Qt; yr += jt)
                            rr = Lt[yr],
                            xr = Lt[yr + 1],
                            rr < Zt && (Zt = rr),
                            xr < Yt && (Yt = xr),
                            rr > sr && (sr = rr),
                            xr > er && (er = xr);
                        br = Math.max(sr - Zt, er - Yt),
                        br = br !== 0 ? 32767 / br : 0
                    }
                    return C_(qt, Xt, jt, Zt, Yt, br, 0),
                    Xt
                }(mt, ft);
                for (let Lt = 0; Lt < Mt.length; Lt += 3)
                    xt.push(Mt.slice(Lt, Lt + 3));
                return xt
            }
        }
        function oA(Tt) {
            const tt = Tt.length;
            tt > 2 && Tt[tt - 1].equals(Tt[0]) && Tt.pop()
        }
        function sA(Tt, tt) {
            for (let lt = 0; lt < tt.length; lt++)
                Tt.push(tt[lt].x),
                Tt.push(tt[lt].y)
        }
        class e0 extends bo {
            constructor(tt=new Pp([new mn(.5,.5), new mn(-.5,.5), new mn(-.5,-.5), new mn(.5,-.5)]), lt={}) {
                super(),
                this.type = "ExtrudeGeometry",
                this.parameters = {
                    shapes: tt,
                    options: lt
                },
                tt = Array.isArray(tt) ? tt : [tt];
                const mt = this
                  , ft = []
                  , xt = [];
                for (let Mt = 0, Lt = tt.length; Mt < Lt; Mt++)
                    Ct(tt[Mt]);
                function Ct(Mt) {
                    const Lt = []
                      , Nt = lt.curveSegments !== void 0 ? lt.curveSegments : 12
                      , jt = lt.steps !== void 0 ? lt.steps : 1
                      , Wt = lt.depth !== void 0 ? lt.depth : 1;
                    let Qt = lt.bevelEnabled === void 0 || lt.bevelEnabled
                      , qt = lt.bevelThickness !== void 0 ? lt.bevelThickness : .2
                      , Xt = lt.bevelSize !== void 0 ? lt.bevelSize : qt - .1
                      , Zt = lt.bevelOffset !== void 0 ? lt.bevelOffset : 0
                      , Yt = lt.bevelSegments !== void 0 ? lt.bevelSegments : 3;
                    const sr = lt.extrudePath
                      , er = lt.UVGenerator !== void 0 ? lt.UVGenerator : bS;
                    let rr, xr, br, yr, Pr, zr = !1;
                    sr && (rr = sr.getSpacedPoints(jt),
                    zr = !0,
                    Qt = !1,
                    xr = sr.computeFrenetFrames(jt, !1),
                    br = new Er,
                    yr = new Er,
                    Pr = new Er),
                    Qt || (Yt = 0,
                    qt = 0,
                    Xt = 0,
                    Zt = 0);
                    const Nr = Mt.extractPoints(Nt);
                    let Vr = Nr.shape;
                    const Gr = Nr.holes;
                    if (!ou.isClockWise(Vr)) {
                        Vr = Vr.reverse();
                        for (let Fr = 0, Wr = Gr.length; Fr < Wr; Fr++) {
                            const kr = Gr[Fr];
                            ou.isClockWise(kr) && (Gr[Fr] = kr.reverse())
                        }
                    }
                    const Hr = ou.triangulateShape(Vr, Gr)
                      , _n = Vr;
                    for (let Fr = 0, Wr = Gr.length; Fr < Wr; Fr++) {
                        const kr = Gr[Fr];
                        Vr = Vr.concat(kr)
                    }
                    function dn(Fr, Wr, kr) {
                        return Wr || console.error("THREE.ExtrudeGeometry: vec does not exist"),
                        Fr.clone().addScaledVector(Wr, kr)
                    }
                    const kn = Vr.length
                      , Bn = Hr.length;
                    function cn(Fr, Wr, kr) {
                        let _r, Br, Lr;
                        const Xr = Fr.x - Wr.x
                          , Kr = Fr.y - Wr.y
                          , An = kr.x - Fr.x
                          , pn = kr.y - Fr.y
                          , _o = Xr * Xr + Kr * Kr
                          , to = Xr * pn - Kr * An;
                        if (Math.abs(to) > Number.EPSILON) {
                            const Pn = Math.sqrt(_o)
                              , eo = Math.sqrt(An * An + pn * pn)
                              , Kn = Wr.x - Kr / Pn
                              , po = Wr.y + Xr / Pn
                              , Ao = ((kr.x - pn / eo - Kn) * pn - (kr.y + An / eo - po) * An) / (Xr * pn - Kr * An);
                            _r = Kn + Xr * Ao - Fr.x,
                            Br = po + Kr * Ao - Fr.y;
                            const Fo = _r * _r + Br * Br;
                            if (Fo <= 2)
                                return new mn(_r,Br);
                            Lr = Math.sqrt(Fo / 2)
                        } else {
                            let Pn = !1;
                            Xr > Number.EPSILON ? An > Number.EPSILON && (Pn = !0) : Xr < -Number.EPSILON ? An < -Number.EPSILON && (Pn = !0) : Math.sign(Kr) === Math.sign(pn) && (Pn = !0),
                            Pn ? (_r = -Kr,
                            Br = Xr,
                            Lr = Math.sqrt(_o)) : (_r = Xr,
                            Br = Kr,
                            Lr = Math.sqrt(_o / 2))
                        }
                        return new mn(_r / Lr,Br / Lr)
                    }
                    const Yr = [];
                    for (let Fr = 0, Wr = _n.length, kr = Wr - 1, _r = Fr + 1; Fr < Wr; Fr++,
                    kr++,
                    _r++)
                        kr === Wr && (kr = 0),
                        _r === Wr && (_r = 0),
                        Yr[Fr] = cn(_n[Fr], _n[kr], _n[_r]);
                    const Jr = [];
                    let sn, on = Yr.concat();
                    for (let Fr = 0, Wr = Gr.length; Fr < Wr; Fr++) {
                        const kr = Gr[Fr];
                        sn = [];
                        for (let _r = 0, Br = kr.length, Lr = Br - 1, Xr = _r + 1; _r < Br; _r++,
                        Lr++,
                        Xr++)
                            Lr === Br && (Lr = 0),
                            Xr === Br && (Xr = 0),
                            sn[_r] = cn(kr[_r], kr[Lr], kr[Xr]);
                        Jr.push(sn),
                        on = on.concat(sn)
                    }
                    for (let Fr = 0; Fr < Yt; Fr++) {
                        const Wr = Fr / Yt
                          , kr = qt * Math.cos(Wr * Math.PI / 2)
                          , _r = Xt * Math.sin(Wr * Math.PI / 2) + Zt;
                        for (let Br = 0, Lr = _n.length; Br < Lr; Br++) {
                            const Xr = dn(_n[Br], Yr[Br], _r);
                            Zn(Xr.x, Xr.y, -kr)
                        }
                        for (let Br = 0, Lr = Gr.length; Br < Lr; Br++) {
                            const Xr = Gr[Br];
                            sn = Jr[Br];
                            for (let Kr = 0, An = Xr.length; Kr < An; Kr++) {
                                const pn = dn(Xr[Kr], sn[Kr], _r);
                                Zn(pn.x, pn.y, -kr)
                            }
                        }
                    }
                    const Un = Xt + Zt;
                    for (let Fr = 0; Fr < kn; Fr++) {
                        const Wr = Qt ? dn(Vr[Fr], on[Fr], Un) : Vr[Fr];
                        zr ? (yr.copy(xr.normals[0]).multiplyScalar(Wr.x),
                        br.copy(xr.binormals[0]).multiplyScalar(Wr.y),
                        Pr.copy(rr[0]).add(yr).add(br),
                        Zn(Pr.x, Pr.y, Pr.z)) : Zn(Wr.x, Wr.y, 0)
                    }
                    for (let Fr = 1; Fr <= jt; Fr++)
                        for (let Wr = 0; Wr < kn; Wr++) {
                            const kr = Qt ? dn(Vr[Wr], on[Wr], Un) : Vr[Wr];
                            zr ? (yr.copy(xr.normals[Fr]).multiplyScalar(kr.x),
                            br.copy(xr.binormals[Fr]).multiplyScalar(kr.y),
                            Pr.copy(rr[Fr]).add(yr).add(br),
                            Zn(Pr.x, Pr.y, Pr.z)) : Zn(kr.x, kr.y, Wt / jt * Fr)
                        }
                    for (let Fr = Yt - 1; Fr >= 0; Fr--) {
                        const Wr = Fr / Yt
                          , kr = qt * Math.cos(Wr * Math.PI / 2)
                          , _r = Xt * Math.sin(Wr * Math.PI / 2) + Zt;
                        for (let Br = 0, Lr = _n.length; Br < Lr; Br++) {
                            const Xr = dn(_n[Br], Yr[Br], _r);
                            Zn(Xr.x, Xr.y, Wt + kr)
                        }
                        for (let Br = 0, Lr = Gr.length; Br < Lr; Br++) {
                            const Xr = Gr[Br];
                            sn = Jr[Br];
                            for (let Kr = 0, An = Xr.length; Kr < An; Kr++) {
                                const pn = dn(Xr[Kr], sn[Kr], _r);
                                zr ? Zn(pn.x, pn.y + rr[jt - 1].y, rr[jt - 1].x + kr) : Zn(pn.x, pn.y, Wt + kr)
                            }
                        }
                    }
                    function ro(Fr, Wr) {
                        let kr = Fr.length;
                        for (; --kr >= 0; ) {
                            const _r = kr;
                            let Br = kr - 1;
                            Br < 0 && (Br = Fr.length - 1);
                            for (let Lr = 0, Xr = jt + 2 * Yt; Lr < Xr; Lr++) {
                                const Kr = kn * Lr
                                  , An = kn * (Lr + 1);
                                uo(Wr + _r + Kr, Wr + Br + Kr, Wr + Br + An, Wr + _r + An)
                            }
                        }
                    }
                    function Zn(Fr, Wr, kr) {
                        Lt.push(Fr),
                        Lt.push(Wr),
                        Lt.push(kr)
                    }
                    function jn(Fr, Wr, kr) {
                        Dr(Fr),
                        Dr(Wr),
                        Dr(kr);
                        const _r = ft.length / 3
                          , Br = er.generateTopUV(mt, ft, _r - 3, _r - 2, _r - 1);
                        Sr(Br[0]),
                        Sr(Br[1]),
                        Sr(Br[2])
                    }
                    function uo(Fr, Wr, kr, _r) {
                        Dr(Fr),
                        Dr(Wr),
                        Dr(_r),
                        Dr(Wr),
                        Dr(kr),
                        Dr(_r);
                        const Br = ft.length / 3
                          , Lr = er.generateSideWallUV(mt, ft, Br - 6, Br - 3, Br - 2, Br - 1);
                        Sr(Lr[0]),
                        Sr(Lr[1]),
                        Sr(Lr[3]),
                        Sr(Lr[1]),
                        Sr(Lr[2]),
                        Sr(Lr[3])
                    }
                    function Dr(Fr) {
                        ft.push(Lt[3 * Fr + 0]),
                        ft.push(Lt[3 * Fr + 1]),
                        ft.push(Lt[3 * Fr + 2])
                    }
                    function Sr(Fr) {
                        xt.push(Fr.x),
                        xt.push(Fr.y)
                    }
                    (function() {
                        const Fr = ft.length / 3;
                        if (Qt) {
                            let Wr = 0
                              , kr = kn * Wr;
                            for (let _r = 0; _r < Bn; _r++) {
                                const Br = Hr[_r];
                                jn(Br[2] + kr, Br[1] + kr, Br[0] + kr)
                            }
                            Wr = jt + 2 * Yt,
                            kr = kn * Wr;
                            for (let _r = 0; _r < Bn; _r++) {
                                const Br = Hr[_r];
                                jn(Br[0] + kr, Br[1] + kr, Br[2] + kr)
                            }
                        } else {
                            for (let Wr = 0; Wr < Bn; Wr++) {
                                const kr = Hr[Wr];
                                jn(kr[2], kr[1], kr[0])
                            }
                            for (let Wr = 0; Wr < Bn; Wr++) {
                                const kr = Hr[Wr];
                                jn(kr[0] + kn * jt, kr[1] + kn * jt, kr[2] + kn * jt)
                            }
                        }
                        mt.addGroup(Fr, ft.length / 3 - Fr, 0)
                    }
                    )(),
                    function() {
                        const Fr = ft.length / 3;
                        let Wr = 0;
                        ro(_n, Wr),
                        Wr += _n.length;
                        for (let kr = 0, _r = Gr.length; kr < _r; kr++) {
                            const Br = Gr[kr];
                            ro(Br, Wr),
                            Wr += Br.length
                        }
                        mt.addGroup(Fr, ft.length / 3 - Fr, 1)
                    }()
                }
                this.setAttribute("position", new Fn(ft,3)),
                this.setAttribute("uv", new Fn(xt,2)),
                this.computeVertexNormals()
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return function(lt, mt, ft) {
                    if (ft.shapes = [],
                    Array.isArray(lt))
                        for (let xt = 0, Ct = lt.length; xt < Ct; xt++) {
                            const Mt = lt[xt];
                            ft.shapes.push(Mt.uuid)
                        }
                    else
                        ft.shapes.push(lt.uuid);
                    return ft.options = Object.assign({}, mt),
                    mt.extrudePath !== void 0 && (ft.options.extrudePath = mt.extrudePath.toJSON()),
                    ft
                }(this.parameters.shapes, this.parameters.options, tt)
            }
            static fromJSON(tt, lt) {
                const mt = [];
                for (let xt = 0, Ct = tt.shapes.length; xt < Ct; xt++) {
                    const Mt = lt[tt.shapes[xt]];
                    mt.push(Mt)
                }
                const ft = tt.options.extrudePath;
                return ft !== void 0 && (tt.options.extrudePath = new zv[ft.type]().fromJSON(ft)),
                new e0(mt,tt.options)
            }
        }
        const bS = {
            generateTopUV: function(Tt, tt, lt, mt, ft) {
                const xt = tt[3 * lt]
                  , Ct = tt[3 * lt + 1]
                  , Mt = tt[3 * mt]
                  , Lt = tt[3 * mt + 1]
                  , Nt = tt[3 * ft]
                  , jt = tt[3 * ft + 1];
                return [new mn(xt,Ct), new mn(Mt,Lt), new mn(Nt,jt)]
            },
            generateSideWallUV: function(Tt, tt, lt, mt, ft, xt) {
                const Ct = tt[3 * lt]
                  , Mt = tt[3 * lt + 1]
                  , Lt = tt[3 * lt + 2]
                  , Nt = tt[3 * mt]
                  , jt = tt[3 * mt + 1]
                  , Wt = tt[3 * mt + 2]
                  , Qt = tt[3 * ft]
                  , qt = tt[3 * ft + 1]
                  , Xt = tt[3 * ft + 2]
                  , Zt = tt[3 * xt]
                  , Yt = tt[3 * xt + 1]
                  , sr = tt[3 * xt + 2];
                return Math.abs(Mt - jt) < Math.abs(Ct - Nt) ? [new mn(Ct,1 - Lt), new mn(Nt,1 - Wt), new mn(Qt,1 - Xt), new mn(Zt,1 - sr)] : [new mn(Mt,1 - Lt), new mn(jt,1 - Wt), new mn(qt,1 - Xt), new mn(Yt,1 - sr)]
            }
        };
        class t0 extends tp {
            constructor(tt=1, lt=0) {
                const mt = (1 + Math.sqrt(5)) / 2;
                super([-1, mt, 0, 1, mt, 0, -1, -mt, 0, 1, -mt, 0, 0, -1, mt, 0, 1, mt, 0, -1, -mt, 0, 1, -mt, mt, 0, -1, mt, 0, 1, -mt, 0, -1, -mt, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], tt, lt),
                this.type = "IcosahedronGeometry",
                this.parameters = {
                    radius: tt,
                    detail: lt
                }
            }
            static fromJSON(tt) {
                return new t0(tt.radius,tt.detail)
            }
        }
        class R_ extends tp {
            constructor(tt=1, lt=0) {
                super([1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], tt, lt),
                this.type = "OctahedronGeometry",
                this.parameters = {
                    radius: tt,
                    detail: lt
                }
            }
            static fromJSON(tt) {
                return new R_(tt.radius,tt.detail)
            }
        }
        class r0 extends bo {
            constructor(tt=.5, lt=1, mt=32, ft=1, xt=0, Ct=2 * Math.PI) {
                super(),
                this.type = "RingGeometry",
                this.parameters = {
                    innerRadius: tt,
                    outerRadius: lt,
                    thetaSegments: mt,
                    phiSegments: ft,
                    thetaStart: xt,
                    thetaLength: Ct
                },
                mt = Math.max(3, mt);
                const Mt = []
                  , Lt = []
                  , Nt = []
                  , jt = [];
                let Wt = tt;
                const Qt = (lt - tt) / (ft = Math.max(1, ft))
                  , qt = new Er
                  , Xt = new mn;
                for (let Zt = 0; Zt <= ft; Zt++) {
                    for (let Yt = 0; Yt <= mt; Yt++) {
                        const sr = xt + Yt / mt * Ct;
                        qt.x = Wt * Math.cos(sr),
                        qt.y = Wt * Math.sin(sr),
                        Lt.push(qt.x, qt.y, qt.z),
                        Nt.push(0, 0, 1),
                        Xt.x = (qt.x / lt + 1) / 2,
                        Xt.y = (qt.y / lt + 1) / 2,
                        jt.push(Xt.x, Xt.y)
                    }
                    Wt += Qt
                }
                for (let Zt = 0; Zt < ft; Zt++) {
                    const Yt = Zt * (mt + 1);
                    for (let sr = 0; sr < mt; sr++) {
                        const er = sr + Yt
                          , rr = er
                          , xr = er + mt + 1
                          , br = er + mt + 2
                          , yr = er + 1;
                        Mt.push(rr, xr, yr),
                        Mt.push(xr, br, yr)
                    }
                }
                this.setIndex(Mt),
                this.setAttribute("position", new Fn(Lt,3)),
                this.setAttribute("normal", new Fn(Nt,3)),
                this.setAttribute("uv", new Fn(jt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new r0(tt.innerRadius,tt.outerRadius,tt.thetaSegments,tt.phiSegments,tt.thetaStart,tt.thetaLength)
            }
        }
        class n0 extends bo {
            constructor(tt=new Pp([new mn(0,.5), new mn(-.5,-.5), new mn(.5,-.5)]), lt=12) {
                super(),
                this.type = "ShapeGeometry",
                this.parameters = {
                    shapes: tt,
                    curveSegments: lt
                };
                const mt = []
                  , ft = []
                  , xt = []
                  , Ct = [];
                let Mt = 0
                  , Lt = 0;
                if (Array.isArray(tt) === !1)
                    Nt(tt);
                else
                    for (let jt = 0; jt < tt.length; jt++)
                        Nt(tt[jt]),
                        this.addGroup(Mt, Lt, jt),
                        Mt += Lt,
                        Lt = 0;
                function Nt(jt) {
                    const Wt = ft.length / 3
                      , Qt = jt.extractPoints(lt);
                    let qt = Qt.shape;
                    const Xt = Qt.holes;
                    ou.isClockWise(qt) === !1 && (qt = qt.reverse());
                    for (let Yt = 0, sr = Xt.length; Yt < sr; Yt++) {
                        const er = Xt[Yt];
                        ou.isClockWise(er) === !0 && (Xt[Yt] = er.reverse())
                    }
                    const Zt = ou.triangulateShape(qt, Xt);
                    for (let Yt = 0, sr = Xt.length; Yt < sr; Yt++) {
                        const er = Xt[Yt];
                        qt = qt.concat(er)
                    }
                    for (let Yt = 0, sr = qt.length; Yt < sr; Yt++) {
                        const er = qt[Yt];
                        ft.push(er.x, er.y, 0),
                        xt.push(0, 0, 1),
                        Ct.push(er.x, er.y)
                    }
                    for (let Yt = 0, sr = Zt.length; Yt < sr; Yt++) {
                        const er = Zt[Yt]
                          , rr = er[0] + Wt
                          , xr = er[1] + Wt
                          , br = er[2] + Wt;
                        mt.push(rr, xr, br),
                        Lt += 3
                    }
                }
                this.setIndex(mt),
                this.setAttribute("position", new Fn(ft,3)),
                this.setAttribute("normal", new Fn(xt,3)),
                this.setAttribute("uv", new Fn(Ct,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return function(lt, mt) {
                    if (mt.shapes = [],
                    Array.isArray(lt))
                        for (let ft = 0, xt = lt.length; ft < xt; ft++) {
                            const Ct = lt[ft];
                            mt.shapes.push(Ct.uuid)
                        }
                    else
                        mt.shapes.push(lt.uuid);
                    return mt
                }(this.parameters.shapes, tt)
            }
            static fromJSON(tt, lt) {
                const mt = [];
                for (let ft = 0, xt = tt.shapes.length; ft < xt; ft++) {
                    const Ct = lt[tt.shapes[ft]];
                    mt.push(Ct)
                }
                return new n0(mt,tt.curveSegments)
            }
        }
        class I_ extends bo {
            constructor(tt=1, lt=32, mt=16, ft=0, xt=2 * Math.PI, Ct=0, Mt=Math.PI) {
                super(),
                this.type = "SphereGeometry",
                this.parameters = {
                    radius: tt,
                    widthSegments: lt,
                    heightSegments: mt,
                    phiStart: ft,
                    phiLength: xt,
                    thetaStart: Ct,
                    thetaLength: Mt
                },
                lt = Math.max(3, Math.floor(lt)),
                mt = Math.max(2, Math.floor(mt));
                const Lt = Math.min(Ct + Mt, Math.PI);
                let Nt = 0;
                const jt = []
                  , Wt = new Er
                  , Qt = new Er
                  , qt = []
                  , Xt = []
                  , Zt = []
                  , Yt = [];
                for (let sr = 0; sr <= mt; sr++) {
                    const er = []
                      , rr = sr / mt;
                    let xr = 0;
                    sr === 0 && Ct === 0 ? xr = .5 / lt : sr === mt && Lt === Math.PI && (xr = -.5 / lt);
                    for (let br = 0; br <= lt; br++) {
                        const yr = br / lt;
                        Wt.x = -tt * Math.cos(ft + yr * xt) * Math.sin(Ct + rr * Mt),
                        Wt.y = tt * Math.cos(Ct + rr * Mt),
                        Wt.z = tt * Math.sin(ft + yr * xt) * Math.sin(Ct + rr * Mt),
                        Xt.push(Wt.x, Wt.y, Wt.z),
                        Qt.copy(Wt).normalize(),
                        Zt.push(Qt.x, Qt.y, Qt.z),
                        Yt.push(yr + xr, 1 - rr),
                        er.push(Nt++)
                    }
                    jt.push(er)
                }
                for (let sr = 0; sr < mt; sr++)
                    for (let er = 0; er < lt; er++) {
                        const rr = jt[sr][er + 1]
                          , xr = jt[sr][er]
                          , br = jt[sr + 1][er]
                          , yr = jt[sr + 1][er + 1];
                        (sr !== 0 || Ct > 0) && qt.push(rr, xr, yr),
                        (sr !== mt - 1 || Lt < Math.PI) && qt.push(xr, br, yr)
                    }
                this.setIndex(qt),
                this.setAttribute("position", new Fn(Xt,3)),
                this.setAttribute("normal", new Fn(Zt,3)),
                this.setAttribute("uv", new Fn(Yt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new I_(tt.radius,tt.widthSegments,tt.heightSegments,tt.phiStart,tt.phiLength,tt.thetaStart,tt.thetaLength)
            }
        }
        class i0 extends tp {
            constructor(tt=1, lt=0) {
                super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], tt, lt),
                this.type = "TetrahedronGeometry",
                this.parameters = {
                    radius: tt,
                    detail: lt
                }
            }
            static fromJSON(tt) {
                return new i0(tt.radius,tt.detail)
            }
        }
        class o0 extends bo {
            constructor(tt=1, lt=.4, mt=12, ft=48, xt=2 * Math.PI) {
                super(),
                this.type = "TorusGeometry",
                this.parameters = {
                    radius: tt,
                    tube: lt,
                    radialSegments: mt,
                    tubularSegments: ft,
                    arc: xt
                },
                mt = Math.floor(mt),
                ft = Math.floor(ft);
                const Ct = []
                  , Mt = []
                  , Lt = []
                  , Nt = []
                  , jt = new Er
                  , Wt = new Er
                  , Qt = new Er;
                for (let qt = 0; qt <= mt; qt++)
                    for (let Xt = 0; Xt <= ft; Xt++) {
                        const Zt = Xt / ft * xt
                          , Yt = qt / mt * Math.PI * 2;
                        Wt.x = (tt + lt * Math.cos(Yt)) * Math.cos(Zt),
                        Wt.y = (tt + lt * Math.cos(Yt)) * Math.sin(Zt),
                        Wt.z = lt * Math.sin(Yt),
                        Mt.push(Wt.x, Wt.y, Wt.z),
                        jt.x = tt * Math.cos(Zt),
                        jt.y = tt * Math.sin(Zt),
                        Qt.subVectors(Wt, jt).normalize(),
                        Lt.push(Qt.x, Qt.y, Qt.z),
                        Nt.push(Xt / ft),
                        Nt.push(qt / mt)
                    }
                for (let qt = 1; qt <= mt; qt++)
                    for (let Xt = 1; Xt <= ft; Xt++) {
                        const Zt = (ft + 1) * qt + Xt - 1
                          , Yt = (ft + 1) * (qt - 1) + Xt - 1
                          , sr = (ft + 1) * (qt - 1) + Xt
                          , er = (ft + 1) * qt + Xt;
                        Ct.push(Zt, Yt, er),
                        Ct.push(Yt, sr, er)
                    }
                this.setIndex(Ct),
                this.setAttribute("position", new Fn(Mt,3)),
                this.setAttribute("normal", new Fn(Lt,3)),
                this.setAttribute("uv", new Fn(Nt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new o0(tt.radius,tt.tube,tt.radialSegments,tt.tubularSegments,tt.arc)
            }
        }
        class s0 extends bo {
            constructor(tt=1, lt=.4, mt=64, ft=8, xt=2, Ct=3) {
                super(),
                this.type = "TorusKnotGeometry",
                this.parameters = {
                    radius: tt,
                    tube: lt,
                    tubularSegments: mt,
                    radialSegments: ft,
                    p: xt,
                    q: Ct
                },
                mt = Math.floor(mt),
                ft = Math.floor(ft);
                const Mt = []
                  , Lt = []
                  , Nt = []
                  , jt = []
                  , Wt = new Er
                  , Qt = new Er
                  , qt = new Er
                  , Xt = new Er
                  , Zt = new Er
                  , Yt = new Er
                  , sr = new Er;
                for (let rr = 0; rr <= mt; ++rr) {
                    const xr = rr / mt * xt * Math.PI * 2;
                    er(xr, xt, Ct, tt, qt),
                    er(xr + .01, xt, Ct, tt, Xt),
                    Yt.subVectors(Xt, qt),
                    sr.addVectors(Xt, qt),
                    Zt.crossVectors(Yt, sr),
                    sr.crossVectors(Zt, Yt),
                    Zt.normalize(),
                    sr.normalize();
                    for (let br = 0; br <= ft; ++br) {
                        const yr = br / ft * Math.PI * 2
                          , Pr = -lt * Math.cos(yr)
                          , zr = lt * Math.sin(yr);
                        Wt.x = qt.x + (Pr * sr.x + zr * Zt.x),
                        Wt.y = qt.y + (Pr * sr.y + zr * Zt.y),
                        Wt.z = qt.z + (Pr * sr.z + zr * Zt.z),
                        Lt.push(Wt.x, Wt.y, Wt.z),
                        Qt.subVectors(Wt, qt).normalize(),
                        Nt.push(Qt.x, Qt.y, Qt.z),
                        jt.push(rr / mt),
                        jt.push(br / ft)
                    }
                }
                for (let rr = 1; rr <= mt; rr++)
                    for (let xr = 1; xr <= ft; xr++) {
                        const br = (ft + 1) * (rr - 1) + (xr - 1)
                          , yr = (ft + 1) * rr + (xr - 1)
                          , Pr = (ft + 1) * rr + xr
                          , zr = (ft + 1) * (rr - 1) + xr;
                        Mt.push(br, yr, zr),
                        Mt.push(yr, Pr, zr)
                    }
                function er(rr, xr, br, yr, Pr) {
                    const zr = Math.cos(rr)
                      , Nr = Math.sin(rr)
                      , Vr = br / xr * rr
                      , Gr = Math.cos(Vr);
                    Pr.x = yr * (2 + Gr) * .5 * zr,
                    Pr.y = yr * (2 + Gr) * Nr * .5,
                    Pr.z = yr * Math.sin(Vr) * .5
                }
                this.setIndex(Mt),
                this.setAttribute("position", new Fn(Lt,3)),
                this.setAttribute("normal", new Fn(Nt,3)),
                this.setAttribute("uv", new Fn(jt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new s0(tt.radius,tt.tube,tt.tubularSegments,tt.radialSegments,tt.p,tt.q)
            }
        }
        class a0 extends bo {
            constructor(tt=new ly(new Er(-1,-1,0),new Er(-1,1,0),new Er(1,1,0)), lt=64, mt=1, ft=8, xt=!1) {
                super(),
                this.type = "TubeGeometry",
                this.parameters = {
                    path: tt,
                    tubularSegments: lt,
                    radius: mt,
                    radialSegments: ft,
                    closed: xt
                };
                const Ct = tt.computeFrenetFrames(lt, xt);
                this.tangents = Ct.tangents,
                this.normals = Ct.normals,
                this.binormals = Ct.binormals;
                const Mt = new Er
                  , Lt = new Er
                  , Nt = new mn;
                let jt = new Er;
                const Wt = []
                  , Qt = []
                  , qt = []
                  , Xt = [];
                function Zt(Yt) {
                    jt = tt.getPointAt(Yt / lt, jt);
                    const sr = Ct.normals[Yt]
                      , er = Ct.binormals[Yt];
                    for (let rr = 0; rr <= ft; rr++) {
                        const xr = rr / ft * Math.PI * 2
                          , br = Math.sin(xr)
                          , yr = -Math.cos(xr);
                        Lt.x = yr * sr.x + br * er.x,
                        Lt.y = yr * sr.y + br * er.y,
                        Lt.z = yr * sr.z + br * er.z,
                        Lt.normalize(),
                        Qt.push(Lt.x, Lt.y, Lt.z),
                        Mt.x = jt.x + mt * Lt.x,
                        Mt.y = jt.y + mt * Lt.y,
                        Mt.z = jt.z + mt * Lt.z,
                        Wt.push(Mt.x, Mt.y, Mt.z)
                    }
                }
                (function() {
                    for (let Yt = 0; Yt < lt; Yt++)
                        Zt(Yt);
                    Zt(xt === !1 ? lt : 0),
                    function() {
                        for (let Yt = 0; Yt <= lt; Yt++)
                            for (let sr = 0; sr <= ft; sr++)
                                Nt.x = Yt / lt,
                                Nt.y = sr / ft,
                                qt.push(Nt.x, Nt.y)
                    }(),
                    function() {
                        for (let Yt = 1; Yt <= lt; Yt++)
                            for (let sr = 1; sr <= ft; sr++) {
                                const er = (ft + 1) * (Yt - 1) + (sr - 1)
                                  , rr = (ft + 1) * Yt + (sr - 1)
                                  , xr = (ft + 1) * Yt + sr
                                  , br = (ft + 1) * (Yt - 1) + sr;
                                Xt.push(er, rr, br),
                                Xt.push(rr, xr, br)
                            }
                    }()
                }
                )(),
                this.setIndex(Xt),
                this.setAttribute("position", new Fn(Wt,3)),
                this.setAttribute("normal", new Fn(Qt,3)),
                this.setAttribute("uv", new Fn(qt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.path = this.parameters.path.toJSON(),
                tt
            }
            static fromJSON(tt) {
                return new a0(new zv[tt.path.type]().fromJSON(tt.path),tt.tubularSegments,tt.radius,tt.radialSegments,tt.closed)
            }
        }
        class aA extends bo {
            constructor(tt=null) {
                if (super(),
                this.type = "WireframeGeometry",
                this.parameters = {
                    geometry: tt
                },
                tt !== null) {
                    const lt = []
                      , mt = new Set
                      , ft = new Er
                      , xt = new Er;
                    if (tt.index !== null) {
                        const Ct = tt.attributes.position
                          , Mt = tt.index;
                        let Lt = tt.groups;
                        Lt.length === 0 && (Lt = [{
                            start: 0,
                            count: Mt.count,
                            materialIndex: 0
                        }]);
                        for (let Nt = 0, jt = Lt.length; Nt < jt; ++Nt) {
                            const Wt = Lt[Nt]
                              , Qt = Wt.start;
                            for (let qt = Qt, Xt = Qt + Wt.count; qt < Xt; qt += 3)
                                for (let Zt = 0; Zt < 3; Zt++) {
                                    const Yt = Mt.getX(qt + Zt)
                                      , sr = Mt.getX(qt + (Zt + 1) % 3);
                                    ft.fromBufferAttribute(Ct, Yt),
                                    xt.fromBufferAttribute(Ct, sr),
                                    lA(ft, xt, mt) === !0 && (lt.push(ft.x, ft.y, ft.z),
                                    lt.push(xt.x, xt.y, xt.z))
                                }
                        }
                    } else {
                        const Ct = tt.attributes.position;
                        for (let Mt = 0, Lt = Ct.count / 3; Mt < Lt; Mt++)
                            for (let Nt = 0; Nt < 3; Nt++) {
                                const jt = 3 * Mt + Nt
                                  , Wt = 3 * Mt + (Nt + 1) % 3;
                                ft.fromBufferAttribute(Ct, jt),
                                xt.fromBufferAttribute(Ct, Wt),
                                lA(ft, xt, mt) === !0 && (lt.push(ft.x, ft.y, ft.z),
                                lt.push(xt.x, xt.y, xt.z))
                            }
                    }
                    this.setAttribute("position", new Fn(lt,3))
                }
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
        }
        function lA(Tt, tt, lt) {
            const mt = `${Tt.x},${Tt.y},${Tt.z}-${tt.x},${tt.y},${tt.z}`
              , ft = `${tt.x},${tt.y},${tt.z}-${Tt.x},${Tt.y},${Tt.z}`;
            return lt.has(mt) !== !0 && lt.has(ft) !== !0 && (lt.add(mt),
            lt.add(ft),
            !0)
        }
        var cA = Object.freeze({
            __proto__: null,
            BoxGeometry: Zu,
            CapsuleGeometry: Hv,
            CircleGeometry: Qv,
            ConeGeometry: Wv,
            CylinderGeometry: Im,
            DodecahedronGeometry: qv,
            EdgesGeometry: eA,
            ExtrudeGeometry: e0,
            IcosahedronGeometry: t0,
            LatheGeometry: T_,
            OctahedronGeometry: R_,
            PlaneGeometry: g_,
            PolyhedronGeometry: tp,
            RingGeometry: r0,
            ShapeGeometry: n0,
            SphereGeometry: I_,
            TetrahedronGeometry: i0,
            TorusGeometry: o0,
            TorusKnotGeometry: s0,
            TubeGeometry: a0,
            WireframeGeometry: aA
        });
        class uA extends hs {
            constructor(tt) {
                super(),
                this.isShadowMaterial = !0,
                this.type = "ShadowMaterial",
                this.color = new Gn(0),
                this.transparent = !0,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.fog = tt.fog,
                this
            }
        }
        class dA extends zl {
            constructor(tt) {
                super(tt),
                this.isRawShaderMaterial = !0,
                this.type = "RawShaderMaterial"
            }
        }
        class hy extends hs {
            constructor(tt) {
                super(),
                this.isMeshStandardMaterial = !0,
                this.defines = {
                    STANDARD: ""
                },
                this.type = "MeshStandardMaterial",
                this.color = new Gn(16777215),
                this.roughness = 1,
                this.metalness = 0,
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.emissive = new Gn(0),
                this.emissiveIntensity = 1,
                this.emissiveMap = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.roughnessMap = null,
                this.metalnessMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.envMapIntensity = 1,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.flatShading = !1,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.defines = {
                    STANDARD: ""
                },
                this.color.copy(tt.color),
                this.roughness = tt.roughness,
                this.metalness = tt.metalness,
                this.map = tt.map,
                this.lightMap = tt.lightMap,
                this.lightMapIntensity = tt.lightMapIntensity,
                this.aoMap = tt.aoMap,
                this.aoMapIntensity = tt.aoMapIntensity,
                this.emissive.copy(tt.emissive),
                this.emissiveMap = tt.emissiveMap,
                this.emissiveIntensity = tt.emissiveIntensity,
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.roughnessMap = tt.roughnessMap,
                this.metalnessMap = tt.metalnessMap,
                this.alphaMap = tt.alphaMap,
                this.envMap = tt.envMap,
                this.envMapIntensity = tt.envMapIntensity,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.wireframeLinecap = tt.wireframeLinecap,
                this.wireframeLinejoin = tt.wireframeLinejoin,
                this.flatShading = tt.flatShading,
                this.fog = tt.fog,
                this
            }
        }
        class pA extends hy {
            constructor(tt) {
                super(),
                this.isMeshPhysicalMaterial = !0,
                this.defines = {
                    STANDARD: "",
                    PHYSICAL: ""
                },
                this.type = "MeshPhysicalMaterial",
                this.anisotropyRotation = 0,
                this.anisotropyMap = null,
                this.clearcoatMap = null,
                this.clearcoatRoughness = 0,
                this.clearcoatRoughnessMap = null,
                this.clearcoatNormalScale = new mn(1,1),
                this.clearcoatNormalMap = null,
                this.ior = 1.5,
                Object.defineProperty(this, "reflectivity", {
                    get: function() {
                        return qo(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1)
                    },
                    set: function(lt) {
                        this.ior = (1 + .4 * lt) / (1 - .4 * lt)
                    }
                }),
                this.iridescenceMap = null,
                this.iridescenceIOR = 1.3,
                this.iridescenceThicknessRange = [100, 400],
                this.iridescenceThicknessMap = null,
                this.sheenColor = new Gn(0),
                this.sheenColorMap = null,
                this.sheenRoughness = 1,
                this.sheenRoughnessMap = null,
                this.transmissionMap = null,
                this.thickness = 0,
                this.thicknessMap = null,
                this.attenuationDistance = 1 / 0,
                this.attenuationColor = new Gn(1,1,1),
                this.specularIntensity = 1,
                this.specularIntensityMap = null,
                this.specularColor = new Gn(1,1,1),
                this.specularColorMap = null,
                this._anisotropy = 0,
                this._clearcoat = 0,
                this._iridescence = 0,
                this._sheen = 0,
                this._transmission = 0,
                this.setValues(tt)
            }
            get anisotropy() {
                return this._anisotropy
            }
            set anisotropy(tt) {
                this._anisotropy > 0 != tt > 0 && this.version++,
                this._anisotropy = tt
            }
            get clearcoat() {
                return this._clearcoat
            }
            set clearcoat(tt) {
                this._clearcoat > 0 != tt > 0 && this.version++,
                this._clearcoat = tt
            }
            get iridescence() {
                return this._iridescence
            }
            set iridescence(tt) {
                this._iridescence > 0 != tt > 0 && this.version++,
                this._iridescence = tt
            }
            get sheen() {
                return this._sheen
            }
            set sheen(tt) {
                this._sheen > 0 != tt > 0 && this.version++,
                this._sheen = tt
            }
            get transmission() {
                return this._transmission
            }
            set transmission(tt) {
                this._transmission > 0 != tt > 0 && this.version++,
                this._transmission = tt
            }
            copy(tt) {
                return super.copy(tt),
                this.defines = {
                    STANDARD: "",
                    PHYSICAL: ""
                },
                this.anisotropy = tt.anisotropy,
                this.anisotropyRotation = tt.anisotropyRotation,
                this.anisotropyMap = tt.anisotropyMap,
                this.clearcoat = tt.clearcoat,
                this.clearcoatMap = tt.clearcoatMap,
                this.clearcoatRoughness = tt.clearcoatRoughness,
                this.clearcoatRoughnessMap = tt.clearcoatRoughnessMap,
                this.clearcoatNormalMap = tt.clearcoatNormalMap,
                this.clearcoatNormalScale.copy(tt.clearcoatNormalScale),
                this.ior = tt.ior,
                this.iridescence = tt.iridescence,
                this.iridescenceMap = tt.iridescenceMap,
                this.iridescenceIOR = tt.iridescenceIOR,
                this.iridescenceThicknessRange = [...tt.iridescenceThicknessRange],
                this.iridescenceThicknessMap = tt.iridescenceThicknessMap,
                this.sheen = tt.sheen,
                this.sheenColor.copy(tt.sheenColor),
                this.sheenColorMap = tt.sheenColorMap,
                this.sheenRoughness = tt.sheenRoughness,
                this.sheenRoughnessMap = tt.sheenRoughnessMap,
                this.transmission = tt.transmission,
                this.transmissionMap = tt.transmissionMap,
                this.thickness = tt.thickness,
                this.thicknessMap = tt.thicknessMap,
                this.attenuationDistance = tt.attenuationDistance,
                this.attenuationColor.copy(tt.attenuationColor),
                this.specularIntensity = tt.specularIntensity,
                this.specularIntensityMap = tt.specularIntensityMap,
                this.specularColor.copy(tt.specularColor),
                this.specularColorMap = tt.specularColorMap,
                this
            }
        }
        class hA extends hs {
            constructor(tt) {
                super(),
                this.isMeshPhongMaterial = !0,
                this.type = "MeshPhongMaterial",
                this.color = new Gn(16777215),
                this.specular = new Gn(1118481),
                this.shininess = 30,
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.emissive = new Gn(0),
                this.emissiveIntensity = 1,
                this.emissiveMap = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.specularMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.combine = Wn,
                this.reflectivity = 1,
                this.refractionRatio = .98,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.flatShading = !1,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.specular.copy(tt.specular),
                this.shininess = tt.shininess,
                this.map = tt.map,
                this.lightMap = tt.lightMap,
                this.lightMapIntensity = tt.lightMapIntensity,
                this.aoMap = tt.aoMap,
                this.aoMapIntensity = tt.aoMapIntensity,
                this.emissive.copy(tt.emissive),
                this.emissiveMap = tt.emissiveMap,
                this.emissiveIntensity = tt.emissiveIntensity,
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.specularMap = tt.specularMap,
                this.alphaMap = tt.alphaMap,
                this.envMap = tt.envMap,
                this.combine = tt.combine,
                this.reflectivity = tt.reflectivity,
                this.refractionRatio = tt.refractionRatio,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.wireframeLinecap = tt.wireframeLinecap,
                this.wireframeLinejoin = tt.wireframeLinejoin,
                this.flatShading = tt.flatShading,
                this.fog = tt.fog,
                this
            }
        }
        class mA extends hs {
            constructor(tt) {
                super(),
                this.isMeshToonMaterial = !0,
                this.defines = {
                    TOON: ""
                },
                this.type = "MeshToonMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.gradientMap = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.emissive = new Gn(0),
                this.emissiveIntensity = 1,
                this.emissiveMap = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.alphaMap = null,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.gradientMap = tt.gradientMap,
                this.lightMap = tt.lightMap,
                this.lightMapIntensity = tt.lightMapIntensity,
                this.aoMap = tt.aoMap,
                this.aoMapIntensity = tt.aoMapIntensity,
                this.emissive.copy(tt.emissive),
                this.emissiveMap = tt.emissiveMap,
                this.emissiveIntensity = tt.emissiveIntensity,
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.alphaMap = tt.alphaMap,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.wireframeLinecap = tt.wireframeLinecap,
                this.wireframeLinejoin = tt.wireframeLinejoin,
                this.fog = tt.fog,
                this
            }
        }
        class fA extends hs {
            constructor(tt) {
                super(),
                this.isMeshNormalMaterial = !0,
                this.type = "MeshNormalMaterial",
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.flatShading = !1,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.flatShading = tt.flatShading,
                this
            }
        }
        class gA extends hs {
            constructor(tt) {
                super(),
                this.isMeshLambertMaterial = !0,
                this.type = "MeshLambertMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.emissive = new Gn(0),
                this.emissiveIntensity = 1,
                this.emissiveMap = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.specularMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.combine = Wn,
                this.reflectivity = 1,
                this.refractionRatio = .98,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.flatShading = !1,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.lightMap = tt.lightMap,
                this.lightMapIntensity = tt.lightMapIntensity,
                this.aoMap = tt.aoMap,
                this.aoMapIntensity = tt.aoMapIntensity,
                this.emissive.copy(tt.emissive),
                this.emissiveMap = tt.emissiveMap,
                this.emissiveIntensity = tt.emissiveIntensity,
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.specularMap = tt.specularMap,
                this.alphaMap = tt.alphaMap,
                this.envMap = tt.envMap,
                this.combine = tt.combine,
                this.reflectivity = tt.reflectivity,
                this.refractionRatio = tt.refractionRatio,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.wireframeLinecap = tt.wireframeLinecap,
                this.wireframeLinejoin = tt.wireframeLinejoin,
                this.flatShading = tt.flatShading,
                this.fog = tt.fog,
                this
            }
        }
        class _A extends hs {
            constructor(tt) {
                super(),
                this.isMeshMatcapMaterial = !0,
                this.defines = {
                    MATCAP: ""
                },
                this.type = "MeshMatcapMaterial",
                this.color = new Gn(16777215),
                this.matcap = null,
                this.map = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = El,
                this.normalScale = new mn(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.alphaMap = null,
                this.flatShading = !1,
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.defines = {
                    MATCAP: ""
                },
                this.color.copy(tt.color),
                this.matcap = tt.matcap,
                this.map = tt.map,
                this.bumpMap = tt.bumpMap,
                this.bumpScale = tt.bumpScale,
                this.normalMap = tt.normalMap,
                this.normalMapType = tt.normalMapType,
                this.normalScale.copy(tt.normalScale),
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.alphaMap = tt.alphaMap,
                this.flatShading = tt.flatShading,
                this.fog = tt.fog,
                this
            }
        }
        class vA extends Gs {
            constructor(tt) {
                super(),
                this.isLineDashedMaterial = !0,
                this.type = "LineDashedMaterial",
                this.scale = 1,
                this.dashSize = 3,
                this.gapSize = 1,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.scale = tt.scale,
                this.dashSize = tt.dashSize,
                this.gapSize = tt.gapSize,
                this
            }
        }
        function Rp(Tt, tt, lt) {
            return !Tt || !lt && Tt.constructor === tt ? Tt : typeof tt.BYTES_PER_ELEMENT == "number" ? new tt(Tt) : Array.prototype.slice.call(Tt)
        }
        function yA(Tt) {
            return ArrayBuffer.isView(Tt) && !(Tt instanceof DataView)
        }
        function xA(Tt) {
            const tt = Tt.length
              , lt = new Array(tt);
            for (let mt = 0; mt !== tt; ++mt)
                lt[mt] = mt;
            return lt.sort(function(mt, ft) {
                return Tt[mt] - Tt[ft]
            }),
            lt
        }
        function my(Tt, tt, lt) {
            const mt = Tt.length
              , ft = new Tt.constructor(mt);
            for (let xt = 0, Ct = 0; Ct !== mt; ++xt) {
                const Mt = lt[xt] * tt;
                for (let Lt = 0; Lt !== tt; ++Lt)
                    ft[Ct++] = Tt[Mt + Lt]
            }
            return ft
        }
        function fy(Tt, tt, lt, mt) {
            let ft = 1
              , xt = Tt[0];
            for (; xt !== void 0 && xt[mt] === void 0; )
                xt = Tt[ft++];
            if (xt === void 0)
                return;
            let Ct = xt[mt];
            if (Ct !== void 0)
                if (Array.isArray(Ct))
                    do
                        Ct = xt[mt],
                        Ct !== void 0 && (tt.push(xt.time),
                        lt.push.apply(lt, Ct)),
                        xt = Tt[ft++];
                    while (xt !== void 0);
                else if (Ct.toArray !== void 0)
                    do
                        Ct = xt[mt],
                        Ct !== void 0 && (tt.push(xt.time),
                        Ct.toArray(lt, lt.length)),
                        xt = Tt[ft++];
                    while (xt !== void 0);
                else
                    do
                        Ct = xt[mt],
                        Ct !== void 0 && (tt.push(xt.time),
                        lt.push(Ct)),
                        xt = Tt[ft++];
                    while (xt !== void 0)
        }
        const AS = {
            convertArray: Rp,
            isTypedArray: yA,
            getKeyframeOrder: xA,
            sortedArray: my,
            flattenJSON: fy,
            subclip: function(Tt, tt, lt, mt, ft=30) {
                const xt = Tt.clone();
                xt.name = tt;
                const Ct = [];
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt) {
                    const Nt = xt.tracks[Lt]
                      , jt = Nt.getValueSize()
                      , Wt = []
                      , Qt = [];
                    for (let qt = 0; qt < Nt.times.length; ++qt) {
                        const Xt = Nt.times[qt] * ft;
                        if (!(Xt < lt || Xt >= mt)) {
                            Wt.push(Nt.times[qt]);
                            for (let Zt = 0; Zt < jt; ++Zt)
                                Qt.push(Nt.values[qt * jt + Zt])
                        }
                    }
                    Wt.length !== 0 && (Nt.times = Rp(Wt, Nt.times.constructor),
                    Nt.values = Rp(Qt, Nt.values.constructor),
                    Ct.push(Nt))
                }
                xt.tracks = Ct;
                let Mt = 1 / 0;
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt)
                    Mt > xt.tracks[Lt].times[0] && (Mt = xt.tracks[Lt].times[0]);
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt)
                    xt.tracks[Lt].shift(-1 * Mt);
                return xt.resetDuration(),
                xt
            },
            makeClipAdditive: function(Tt, tt=0, lt=Tt, mt=30) {
                mt <= 0 && (mt = 30);
                const ft = lt.tracks.length
                  , xt = tt / mt;
                for (let Ct = 0; Ct < ft; ++Ct) {
                    const Mt = lt.tracks[Ct]
                      , Lt = Mt.ValueTypeName;
                    if (Lt === "bool" || Lt === "string")
                        continue;
                    const Nt = Tt.tracks.find(function(sr) {
                        return sr.name === Mt.name && sr.ValueTypeName === Lt
                    });
                    if (Nt === void 0)
                        continue;
                    let jt = 0;
                    const Wt = Mt.getValueSize();
                    Mt.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (jt = Wt / 3);
                    let Qt = 0;
                    const qt = Nt.getValueSize();
                    Nt.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (Qt = qt / 3);
                    const Xt = Mt.times.length - 1;
                    let Zt;
                    if (xt <= Mt.times[0]) {
                        const sr = jt
                          , er = Wt - jt;
                        Zt = Mt.values.slice(sr, er)
                    } else if (xt >= Mt.times[Xt]) {
                        const sr = Xt * Wt + jt
                          , er = sr + Wt - jt;
                        Zt = Mt.values.slice(sr, er)
                    } else {
                        const sr = Mt.createInterpolant()
                          , er = jt
                          , rr = Wt - jt;
                        sr.evaluate(xt),
                        Zt = sr.resultBuffer.slice(er, rr)
                    }
                    Lt === "quaternion" && new Is().fromArray(Zt).normalize().conjugate().toArray(Zt);
                    const Yt = Nt.times.length;
                    for (let sr = 0; sr < Yt; ++sr) {
                        const er = sr * qt + Qt;
                        if (Lt === "quaternion")
                            Is.multiplyQuaternionsFlat(Nt.values, er, Zt, 0, Nt.values, er);
                        else {
                            const rr = qt - 2 * Qt;
                            for (let xr = 0; xr < rr; ++xr)
                                Nt.values[er + xr] -= Zt[xr]
                        }
                    }
                }
                return Tt.blendMode = Xp,
                Tt
            }
        };
        class k_ {
            constructor(tt, lt, mt, ft) {
                this.parameterPositions = tt,
                this._cachedIndex = 0,
                this.resultBuffer = ft !== void 0 ? ft : new lt.constructor(mt),
                this.sampleValues = lt,
                this.valueSize = mt,
                this.settings = null,
                this.DefaultSettings_ = {}
            }
            evaluate(tt) {
                const lt = this.parameterPositions;
                let mt = this._cachedIndex
                  , ft = lt[mt]
                  , xt = lt[mt - 1];
                e: {
                    t: {
                        let Ct;
                        r: {
                            n: if (!(tt < ft)) {
                                for (let Mt = mt + 2; ; ) {
                                    if (ft === void 0) {
                                        if (tt < xt)
                                            break n;
                                        return mt = lt.length,
                                        this._cachedIndex = mt,
                                        this.copySampleValue_(mt - 1)
                                    }
                                    if (mt === Mt)
                                        break;
                                    if (xt = ft,
                                    ft = lt[++mt],
                                    tt < ft)
                                        break t
                                }
                                Ct = lt.length;
                                break r
                            }
                            if (tt >= xt)
                                break e;
                            {
                                const Mt = lt[1];
                                tt < Mt && (mt = 2,
                                xt = Mt);
                                for (let Lt = mt - 2; ; ) {
                                    if (xt === void 0)
                                        return this._cachedIndex = 0,
                                        this.copySampleValue_(0);
                                    if (mt === Lt)
                                        break;
                                    if (ft = xt,
                                    xt = lt[--mt - 1],
                                    tt >= xt)
                                        break t
                                }
                                Ct = mt,
                                mt = 0
                            }
                        }
                        for (; mt < Ct; ) {
                            const Mt = mt + Ct >>> 1;
                            tt < lt[Mt] ? Ct = Mt : mt = Mt + 1
                        }
                        if (ft = lt[mt],
                        xt = lt[mt - 1],
                        xt === void 0)
                            return this._cachedIndex = 0,
                            this.copySampleValue_(0);
                        if (ft === void 0)
                            return mt = lt.length,
                            this._cachedIndex = mt,
                            this.copySampleValue_(mt - 1)
                    }
                    this._cachedIndex = mt,
                    this.intervalChanged_(mt, xt, ft)
                }
                return this.interpolate_(mt, xt, tt, ft)
            }
            getSettings_() {
                return this.settings || this.DefaultSettings_
            }
            copySampleValue_(tt) {
                const lt = this.resultBuffer
                  , mt = this.sampleValues
                  , ft = this.valueSize
                  , xt = tt * ft;
                for (let Ct = 0; Ct !== ft; ++Ct)
                    lt[Ct] = mt[xt + Ct];
                return lt
            }
            interpolate_() {
                throw new Error("call to abstract method")
            }
            intervalChanged_() {}
        }
        class bA extends k_ {
            constructor(tt, lt, mt, ft) {
                super(tt, lt, mt, ft),
                this._weightPrev = -0,
                this._offsetPrev = -0,
                this._weightNext = -0,
                this._offsetNext = -0,
                this.DefaultSettings_ = {
                    endingStart: du,
                    endingEnd: du
                }
            }
            intervalChanged_(tt, lt, mt) {
                const ft = this.parameterPositions;
                let xt = tt - 2
                  , Ct = tt + 1
                  , Mt = ft[xt]
                  , Lt = ft[Ct];
                if (Mt === void 0)
                    switch (this.getSettings_().endingStart) {
                    case pu:
                        xt = tt,
                        Mt = 2 * lt - mt;
                        break;
                    case cp:
                        xt = ft.length - 2,
                        Mt = lt + ft[xt] - ft[xt + 1];
                        break;
                    default:
                        xt = tt,
                        Mt = mt
                    }
                if (Lt === void 0)
                    switch (this.getSettings_().endingEnd) {
                    case pu:
                        Ct = tt,
                        Lt = 2 * mt - lt;
                        break;
                    case cp:
                        Ct = 1,
                        Lt = mt + ft[1] - ft[0];
                        break;
                    default:
                        Ct = tt - 1,
                        Lt = lt
                    }
                const Nt = .5 * (mt - lt)
                  , jt = this.valueSize;
                this._weightPrev = Nt / (lt - Mt),
                this._weightNext = Nt / (Lt - mt),
                this._offsetPrev = xt * jt,
                this._offsetNext = Ct * jt
            }
            interpolate_(tt, lt, mt, ft) {
                const xt = this.resultBuffer
                  , Ct = this.sampleValues
                  , Mt = this.valueSize
                  , Lt = tt * Mt
                  , Nt = Lt - Mt
                  , jt = this._offsetPrev
                  , Wt = this._offsetNext
                  , Qt = this._weightPrev
                  , qt = this._weightNext
                  , Xt = (mt - lt) / (ft - lt)
                  , Zt = Xt * Xt
                  , Yt = Zt * Xt
                  , sr = -Qt * Yt + 2 * Qt * Zt - Qt * Xt
                  , er = (1 + Qt) * Yt + (-1.5 - 2 * Qt) * Zt + (-.5 + Qt) * Xt + 1
                  , rr = (-1 - qt) * Yt + (1.5 + qt) * Zt + .5 * Xt
                  , xr = qt * Yt - qt * Zt;
                for (let br = 0; br !== Mt; ++br)
                    xt[br] = sr * Ct[jt + br] + er * Ct[Nt + br] + rr * Ct[Lt + br] + xr * Ct[Wt + br];
                return xt
            }
        }
        class gy extends k_ {
            constructor(tt, lt, mt, ft) {
                super(tt, lt, mt, ft)
            }
            interpolate_(tt, lt, mt, ft) {
                const xt = this.resultBuffer
                  , Ct = this.sampleValues
                  , Mt = this.valueSize
                  , Lt = tt * Mt
                  , Nt = Lt - Mt
                  , jt = (mt - lt) / (ft - lt)
                  , Wt = 1 - jt;
                for (let Qt = 0; Qt !== Mt; ++Qt)
                    xt[Qt] = Ct[Nt + Qt] * Wt + Ct[Lt + Qt] * jt;
                return xt
            }
        }
        class AA extends k_ {
            constructor(tt, lt, mt, ft) {
                super(tt, lt, mt, ft)
            }
            interpolate_(tt) {
                return this.copySampleValue_(tt - 1)
            }
        }
        class Ql {
            constructor(tt, lt, mt, ft) {
                if (tt === void 0)
                    throw new Error("THREE.KeyframeTrack: track name is undefined");
                if (lt === void 0 || lt.length === 0)
                    throw new Error("THREE.KeyframeTrack: no keyframes in track named " + tt);
                this.name = tt,
                this.times = Rp(lt, this.TimeBufferType),
                this.values = Rp(mt, this.ValueBufferType),
                this.setInterpolation(ft || this.DefaultInterpolation)
            }
            static toJSON(tt) {
                const lt = tt.constructor;
                let mt;
                if (lt.toJSON !== this.toJSON)
                    mt = lt.toJSON(tt);
                else {
                    mt = {
                        name: tt.name,
                        times: Rp(tt.times, Array),
                        values: Rp(tt.values, Array)
                    };
                    const ft = tt.getInterpolation();
                    ft !== tt.DefaultInterpolation && (mt.interpolation = ft)
                }
                return mt.type = tt.ValueTypeName,
                mt
            }
            InterpolantFactoryMethodDiscrete(tt) {
                return new AA(this.times,this.values,this.getValueSize(),tt)
            }
            InterpolantFactoryMethodLinear(tt) {
                return new gy(this.times,this.values,this.getValueSize(),tt)
            }
            InterpolantFactoryMethodSmooth(tt) {
                return new bA(this.times,this.values,this.getValueSize(),tt)
            }
            setInterpolation(tt) {
                let lt;
                switch (tt) {
                case Bu:
                    lt = this.InterpolantFactoryMethodDiscrete;
                    break;
                case lp:
                    lt = this.InterpolantFactoryMethodLinear;
                    break;
                case $p:
                    lt = this.InterpolantFactoryMethodSmooth
                }
                if (lt === void 0) {
                    const mt = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                    if (this.createInterpolant === void 0) {
                        if (tt === this.DefaultInterpolation)
                            throw new Error(mt);
                        this.setInterpolation(this.DefaultInterpolation)
                    }
                    return console.warn("THREE.KeyframeTrack:", mt),
                    this
                }
                return this.createInterpolant = lt,
                this
            }
            getInterpolation() {
                switch (this.createInterpolant) {
                case this.InterpolantFactoryMethodDiscrete:
                    return Bu;
                case this.InterpolantFactoryMethodLinear:
                    return lp;
                case this.InterpolantFactoryMethodSmooth:
                    return $p
                }
            }
            getValueSize() {
                return this.values.length / this.times.length
            }
            shift(tt) {
                if (tt !== 0) {
                    const lt = this.times;
                    for (let mt = 0, ft = lt.length; mt !== ft; ++mt)
                        lt[mt] += tt
                }
                return this
            }
            scale(tt) {
                if (tt !== 1) {
                    const lt = this.times;
                    for (let mt = 0, ft = lt.length; mt !== ft; ++mt)
                        lt[mt] *= tt
                }
                return this
            }
            trim(tt, lt) {
                const mt = this.times
                  , ft = mt.length;
                let xt = 0
                  , Ct = ft - 1;
                for (; xt !== ft && mt[xt] < tt; )
                    ++xt;
                for (; Ct !== -1 && mt[Ct] > lt; )
                    --Ct;
                if (++Ct,
                xt !== 0 || Ct !== ft) {
                    xt >= Ct && (Ct = Math.max(Ct, 1),
                    xt = Ct - 1);
                    const Mt = this.getValueSize();
                    this.times = mt.slice(xt, Ct),
                    this.values = this.values.slice(xt * Mt, Ct * Mt)
                }
                return this
            }
            validate() {
                let tt = !0;
                const lt = this.getValueSize();
                lt - Math.floor(lt) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this),
                tt = !1);
                const mt = this.times
                  , ft = this.values
                  , xt = mt.length;
                xt === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this),
                tt = !1);
                let Ct = null;
                for (let Mt = 0; Mt !== xt; Mt++) {
                    const Lt = mt[Mt];
                    if (typeof Lt == "number" && isNaN(Lt)) {
                        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, Mt, Lt),
                        tt = !1;
                        break
                    }
                    if (Ct !== null && Ct > Lt) {
                        console.error("THREE.KeyframeTrack: Out of order keys.", this, Mt, Lt, Ct),
                        tt = !1;
                        break
                    }
                    Ct = Lt
                }
                if (ft !== void 0 && yA(ft))
                    for (let Mt = 0, Lt = ft.length; Mt !== Lt; ++Mt) {
                        const Nt = ft[Mt];
                        if (isNaN(Nt)) {
                            console.error("THREE.KeyframeTrack: Value is not a valid number.", this, Mt, Nt),
                            tt = !1;
                            break
                        }
                    }
                return tt
            }
            optimize() {
                const tt = this.times.slice()
                  , lt = this.values.slice()
                  , mt = this.getValueSize()
                  , ft = this.getInterpolation() === $p
                  , xt = tt.length - 1;
                let Ct = 1;
                for (let Mt = 1; Mt < xt; ++Mt) {
                    let Lt = !1;
                    const Nt = tt[Mt];
                    if (Nt !== tt[Mt + 1] && (Mt !== 1 || Nt !== tt[0]))
                        if (ft)
                            Lt = !0;
                        else {
                            const jt = Mt * mt
                              , Wt = jt - mt
                              , Qt = jt + mt;
                            for (let qt = 0; qt !== mt; ++qt) {
                                const Xt = lt[jt + qt];
                                if (Xt !== lt[Wt + qt] || Xt !== lt[Qt + qt]) {
                                    Lt = !0;
                                    break
                                }
                            }
                        }
                    if (Lt) {
                        if (Mt !== Ct) {
                            tt[Ct] = tt[Mt];
                            const jt = Mt * mt
                              , Wt = Ct * mt;
                            for (let Qt = 0; Qt !== mt; ++Qt)
                                lt[Wt + Qt] = lt[jt + Qt]
                        }
                        ++Ct
                    }
                }
                if (xt > 0) {
                    tt[Ct] = tt[xt];
                    for (let Mt = xt * mt, Lt = Ct * mt, Nt = 0; Nt !== mt; ++Nt)
                        lt[Lt + Nt] = lt[Mt + Nt];
                    ++Ct
                }
                return Ct !== tt.length ? (this.times = tt.slice(0, Ct),
                this.values = lt.slice(0, Ct * mt)) : (this.times = tt,
                this.values = lt),
                this
            }
            clone() {
                const tt = this.times.slice()
                  , lt = this.values.slice()
                  , mt = new this.constructor(this.name,tt,lt);
                return mt.createInterpolant = this.createInterpolant,
                mt
            }
        }
        Ql.prototype.TimeBufferType = Float32Array,
        Ql.prototype.ValueBufferType = Float32Array,
        Ql.prototype.DefaultInterpolation = lp;
        class Ip extends Ql {
        }
        Ip.prototype.ValueTypeName = "bool",
        Ip.prototype.ValueBufferType = Array,
        Ip.prototype.DefaultInterpolation = Bu,
        Ip.prototype.InterpolantFactoryMethodLinear = void 0,
        Ip.prototype.InterpolantFactoryMethodSmooth = void 0;
        class _y extends Ql {
        }
        _y.prototype.ValueTypeName = "color";
        class D_ extends Ql {
        }
        D_.prototype.ValueTypeName = "number";
        class wA extends k_ {
            constructor(tt, lt, mt, ft) {
                super(tt, lt, mt, ft)
            }
            interpolate_(tt, lt, mt, ft) {
                const xt = this.resultBuffer
                  , Ct = this.sampleValues
                  , Mt = this.valueSize
                  , Lt = (mt - lt) / (ft - lt);
                let Nt = tt * Mt;
                for (let jt = Nt + Mt; Nt !== jt; Nt += 4)
                    Is.slerpFlat(xt, 0, Ct, Nt - Mt, Ct, Nt, Lt);
                return xt
            }
        }
        class Dm extends Ql {
            InterpolantFactoryMethodLinear(tt) {
                return new wA(this.times,this.values,this.getValueSize(),tt)
            }
        }
        Dm.prototype.ValueTypeName = "quaternion",
        Dm.prototype.DefaultInterpolation = lp,
        Dm.prototype.InterpolantFactoryMethodSmooth = void 0;
        class kp extends Ql {
        }
        kp.prototype.ValueTypeName = "string",
        kp.prototype.ValueBufferType = Array,
        kp.prototype.DefaultInterpolation = Bu,
        kp.prototype.InterpolantFactoryMethodLinear = void 0,
        kp.prototype.InterpolantFactoryMethodSmooth = void 0;
        class B_ extends Ql {
        }
        B_.prototype.ValueTypeName = "vector";
        class L_ {
            constructor(tt, lt=-1, mt, ft=Hm) {
                this.name = tt,
                this.tracks = mt,
                this.duration = lt,
                this.blendMode = ft,
                this.uuid = Ms(),
                this.duration < 0 && this.resetDuration()
            }
            static parse(tt) {
                const lt = []
                  , mt = tt.tracks
                  , ft = 1 / (tt.fps || 1);
                for (let Ct = 0, Mt = mt.length; Ct !== Mt; ++Ct)
                    lt.push(wS(mt[Ct]).scale(ft));
                const xt = new this(tt.name,tt.duration,lt,tt.blendMode);
                return xt.uuid = tt.uuid,
                xt
            }
            static toJSON(tt) {
                const lt = []
                  , mt = tt.tracks
                  , ft = {
                    name: tt.name,
                    duration: tt.duration,
                    tracks: lt,
                    uuid: tt.uuid,
                    blendMode: tt.blendMode
                };
                for (let xt = 0, Ct = mt.length; xt !== Ct; ++xt)
                    lt.push(Ql.toJSON(mt[xt]));
                return ft
            }
            static CreateFromMorphTargetSequence(tt, lt, mt, ft) {
                const xt = lt.length
                  , Ct = [];
                for (let Mt = 0; Mt < xt; Mt++) {
                    let Lt = []
                      , Nt = [];
                    Lt.push((Mt + xt - 1) % xt, Mt, (Mt + 1) % xt),
                    Nt.push(0, 1, 0);
                    const jt = xA(Lt);
                    Lt = my(Lt, 1, jt),
                    Nt = my(Nt, 1, jt),
                    ft || Lt[0] !== 0 || (Lt.push(xt),
                    Nt.push(Nt[0])),
                    Ct.push(new D_(".morphTargetInfluences[" + lt[Mt].name + "]",Lt,Nt).scale(1 / mt))
                }
                return new this(tt,-1,Ct)
            }
            static findByName(tt, lt) {
                let mt = tt;
                if (!Array.isArray(tt)) {
                    const ft = tt;
                    mt = ft.geometry && ft.geometry.animations || ft.animations
                }
                for (let ft = 0; ft < mt.length; ft++)
                    if (mt[ft].name === lt)
                        return mt[ft];
                return null
            }
            static CreateClipsFromMorphTargetSequences(tt, lt, mt) {
                const ft = {}
                  , xt = /^([\w-]*?)([\d]+)$/;
                for (let Mt = 0, Lt = tt.length; Mt < Lt; Mt++) {
                    const Nt = tt[Mt]
                      , jt = Nt.name.match(xt);
                    if (jt && jt.length > 1) {
                        const Wt = jt[1];
                        let Qt = ft[Wt];
                        Qt || (ft[Wt] = Qt = []),
                        Qt.push(Nt)
                    }
                }
                const Ct = [];
                for (const Mt in ft)
                    Ct.push(this.CreateFromMorphTargetSequence(Mt, ft[Mt], lt, mt));
                return Ct
            }
            static parseAnimation(tt, lt) {
                if (!tt)
                    return console.error("THREE.AnimationClip: No animation in JSONLoader data."),
                    null;
                const mt = function(jt, Wt, Qt, qt, Xt) {
                    if (Qt.length !== 0) {
                        const Zt = []
                          , Yt = [];
                        fy(Qt, Zt, Yt, qt),
                        Zt.length !== 0 && Xt.push(new jt(Wt,Zt,Yt))
                    }
                }
                  , ft = []
                  , xt = tt.name || "default"
                  , Ct = tt.fps || 30
                  , Mt = tt.blendMode;
                let Lt = tt.length || -1;
                const Nt = tt.hierarchy || [];
                for (let jt = 0; jt < Nt.length; jt++) {
                    const Wt = Nt[jt].keys;
                    if (Wt && Wt.length !== 0)
                        if (Wt[0].morphTargets) {
                            const Qt = {};
                            let qt;
                            for (qt = 0; qt < Wt.length; qt++)
                                if (Wt[qt].morphTargets)
                                    for (let Xt = 0; Xt < Wt[qt].morphTargets.length; Xt++)
                                        Qt[Wt[qt].morphTargets[Xt]] = -1;
                            for (const Xt in Qt) {
                                const Zt = []
                                  , Yt = [];
                                for (let sr = 0; sr !== Wt[qt].morphTargets.length; ++sr) {
                                    const er = Wt[qt];
                                    Zt.push(er.time),
                                    Yt.push(er.morphTarget === Xt ? 1 : 0)
                                }
                                ft.push(new D_(".morphTargetInfluence[" + Xt + "]",Zt,Yt))
                            }
                            Lt = Qt.length * Ct
                        } else {
                            const Qt = ".bones[" + lt[jt].name + "]";
                            mt(B_, Qt + ".position", Wt, "pos", ft),
                            mt(Dm, Qt + ".quaternion", Wt, "rot", ft),
                            mt(B_, Qt + ".scale", Wt, "scl", ft)
                        }
                }
                return ft.length === 0 ? null : new this(xt,Lt,ft,Mt)
            }
            resetDuration() {
                let tt = 0;
                for (let lt = 0, mt = this.tracks.length; lt !== mt; ++lt) {
                    const ft = this.tracks[lt];
                    tt = Math.max(tt, ft.times[ft.times.length - 1])
                }
                return this.duration = tt,
                this
            }
            trim() {
                for (let tt = 0; tt < this.tracks.length; tt++)
                    this.tracks[tt].trim(0, this.duration);
                return this
            }
            validate() {
                let tt = !0;
                for (let lt = 0; lt < this.tracks.length; lt++)
                    tt = tt && this.tracks[lt].validate();
                return tt
            }
            optimize() {
                for (let tt = 0; tt < this.tracks.length; tt++)
                    this.tracks[tt].optimize();
                return this
            }
            clone() {
                const tt = [];
                for (let lt = 0; lt < this.tracks.length; lt++)
                    tt.push(this.tracks[lt].clone());
                return new this.constructor(this.name,this.duration,tt,this.blendMode)
            }
            toJSON() {
                return this.constructor.toJSON(this)
            }
        }
        function wS(Tt) {
            if (Tt.type === void 0)
                throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
            const tt = function(lt) {
                switch (lt.toLowerCase()) {
                case "scalar":
                case "double":
                case "float":
                case "number":
                case "integer":
                    return D_;
                case "vector":
                case "vector2":
                case "vector3":
                case "vector4":
                    return B_;
                case "color":
                    return _y;
                case "quaternion":
                    return Dm;
                case "bool":
                case "boolean":
                    return Ip;
                case "string":
                    return kp
                }
                throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + lt)
            }(Tt.type);
            if (Tt.times === void 0) {
                const lt = []
                  , mt = [];
                fy(Tt.keys, lt, mt, "value"),
                Tt.times = lt,
                Tt.values = mt
            }
            return tt.parse !== void 0 ? tt.parse(Tt) : new tt(Tt.name,Tt.times,Tt.values,Tt.interpolation)
        }
        const Eu = {
            enabled: !1,
            files: {},
            add: function(Tt, tt) {
                this.enabled !== !1 && (this.files[Tt] = tt)
            },
            get: function(Tt, tt) {
                return this.enabled === !1 ? tt ? Promise.resolve() : void 0 : tt ? Promise.resolve(this.files[Tt]) : this.files[Tt]
            },
            remove: function(Tt) {
                delete this.files[Tt]
            },
            clear: function() {
                this.files = {}
            }
        };
        class vy {
            constructor(tt, lt, mt) {
                const ft = this;
                let xt, Ct = !1, Mt = 0, Lt = 0;
                const Nt = [];
                this.onStart = void 0,
                this.onLoad = tt,
                this.onProgress = lt,
                this.onError = mt,
                this.itemStart = function(jt) {
                    Lt++,
                    Ct === !1 && ft.onStart !== void 0 && ft.onStart(jt, Mt, Lt),
                    Ct = !0
                }
                ,
                this.itemEnd = function(jt) {
                    Mt++,
                    ft.onProgress !== void 0 && ft.onProgress(jt, Mt, Lt),
                    Mt === Lt && (Ct = !1,
                    ft.onLoad !== void 0 && ft.onLoad())
                }
                ,
                this.itemError = function(jt) {
                    ft.onError !== void 0 && ft.onError(jt)
                }
                ,
                this.resolveURL = function(jt) {
                    return xt ? xt(jt) : jt
                }
                ,
                this.setURLModifier = function(jt) {
                    return xt = jt,
                    this
                }
                ,
                this.addHandler = function(jt, Wt) {
                    return Nt.push(jt, Wt),
                    this
                }
                ,
                this.removeHandler = function(jt) {
                    const Wt = Nt.indexOf(jt);
                    return Wt !== -1 && Nt.splice(Wt, 2),
                    this
                }
                ,
                this.getHandler = function(jt) {
                    for (let Wt = 0, Qt = Nt.length; Wt < Qt; Wt += 2) {
                        const qt = Nt[Wt]
                          , Xt = Nt[Wt + 1];
                        if (qt.global && (qt.lastIndex = 0),
                        qt.test(jt))
                            return Xt
                    }
                    return null
                }
            }
        }
        const SA = new vy;
        class $s {
            constructor(tt) {
                this.manager = tt !== void 0 ? tt : SA,
                this.crossOrigin = "anonymous",
                this.withCredentials = !1,
                this.path = "",
                this.resourcePath = "",
                this.requestHeader = {}
            }
            load() {}
            loadAsync(tt, lt) {
                const mt = this;
                return new Promise(function(ft, xt) {
                    mt.load(tt, ft, lt, xt)
                }
                )
            }
            parse() {}
            setCrossOrigin(tt) {
                return this.crossOrigin = tt,
                this
            }
            setWithCredentials(tt) {
                return this.withCredentials = tt,
                this
            }
            setPath(tt) {
                return this.path = tt,
                this
            }
            setResourcePath(tt) {
                return this.resourcePath = tt,
                this
            }
            setRequestHeader(tt) {
                return this.requestHeader = tt,
                this
            }
        }
        $s.DEFAULT_MATERIAL_NAME = "__DEFAULT";
        const Tu = {};
        class SS extends Error {
            constructor(tt, lt) {
                super(tt),
                this.response = lt
            }
        }
        class su extends $s {
            constructor(tt) {
                super(tt),
                this.responseType = "text",
                this.useCache = !0
            }
            load(tt, lt, mt, ft) {
                tt === void 0 && (tt = ""),
                this.path !== void 0 && (tt = this.path + tt),
                tt = this.manager.resolveURL(tt),
                (this.useCache ? Eu.get(tt, this.responseType, this.mimeType) : Promise.resolve(void 0)).then(xt => {
                    if (xt !== void 0)
                        return this.manager.itemStart(tt),
                        setTimeout( () => {
                            lt && lt(xt),
                            this.manager.itemEnd(tt)
                        }
                        , 0),
                        xt;
                    if (Tu[tt] !== void 0)
                        return void Tu[tt].push({
                            onLoad: lt,
                            onProgress: mt,
                            onError: ft
                        });
                    Tu[tt] = [],
                    Tu[tt].push({
                        onLoad: lt,
                        onProgress: mt,
                        onError: ft
                    });
                    const Ct = new Request(tt,{
                        headers: new Headers(this.requestHeader),
                        credentials: this.withCredentials ? "include" : "same-origin"
                    })
                      , Mt = this.mimeType
                      , Lt = this.responseType;
                    fetch(Ct).then(Nt => {
                        if (Nt.status === 200 || Nt.status === 0) {
                            if (Nt.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."),
                            typeof ReadableStream > "u" || Nt.body === void 0 || Nt.body.getReader === void 0)
                                return Nt;
                            const jt = Tu[tt]
                              , Wt = Nt.body.getReader()
                              , Qt = Nt.headers.get("Content-Length") || Nt.headers.get("X-File-Size")
                              , qt = Qt ? parseInt(Qt) : 0
                              , Xt = qt !== 0;
                            let Zt = 0;
                            const Yt = new ReadableStream({
                                start(sr) {
                                    (function er() {
                                        Wt.read().then( ({done: rr, value: xr}) => {
                                            if (rr)
                                                sr.close();
                                            else {
                                                Zt += xr.byteLength;
                                                const br = new ProgressEvent("progress",{
                                                    lengthComputable: Xt,
                                                    loaded: Zt,
                                                    total: qt
                                                });
                                                for (let yr = 0, Pr = jt.length; yr < Pr; yr++) {
                                                    const zr = jt[yr];
                                                    zr.onProgress && zr.onProgress(br)
                                                }
                                                sr.enqueue(xr),
                                                er()
                                            }
                                        }
                                        )
                                    }
                                    )()
                                }
                            });
                            return new Response(Yt)
                        }
                        throw new SS(`fetch for "${Nt.url}" responded with ${Nt.status}: ${Nt.statusText}`,Nt)
                    }
                    ).then(Nt => {
                        switch (Lt) {
                        case "arraybuffer":
                            return Nt.arrayBuffer();
                        case "blob":
                            return Nt.blob();
                        case "document":
                            return Nt.text().then(jt => new DOMParser().parseFromString(jt, Mt));
                        case "json":
                            return Nt.json();
                        default:
                            if (Mt === void 0)
                                return Nt.text();
                            {
                                const jt = /charset="?([^;"\s]*)"?/i.exec(Mt)
                                  , Wt = jt && jt[1] ? jt[1].toLowerCase() : void 0
                                  , Qt = new TextDecoder(Wt);
                                return Nt.arrayBuffer().then(qt => Qt.decode(qt))
                            }
                        }
                    }
                    ).then(Nt => {
                        this.useCache && Eu.add(tt, Nt, this.responseType);
                        const jt = Tu[tt];
                        delete Tu[tt];
                        for (let Wt = 0, Qt = jt.length; Wt < Qt; Wt++) {
                            const qt = jt[Wt];
                            qt.onLoad && qt.onLoad(Nt)
                        }
                    }
                    ).catch(Nt => {
                        const jt = Tu[tt];
                        if (jt === void 0)
                            throw this.manager.itemError(tt),
                            Nt;
                        delete Tu[tt];
                        for (let Wt = 0, Qt = jt.length; Wt < Qt; Wt++) {
                            const qt = jt[Wt];
                            qt.onError && qt.onError(Nt)
                        }
                        this.manager.itemError(tt)
                    }
                    ).finally( () => {
                        this.useCache && this.manager.itemEnd(tt)
                    }
                    ),
                    this.useCache && this.manager.itemStart(tt)
                }
                )
            }
            setResponseType(tt) {
                return this.responseType = tt,
                this
            }
            setMimeType(tt) {
                return this.mimeType = tt,
                this
            }
        }
        class ES extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = new su(this.manager);
                Ct.setPath(this.path),
                Ct.setRequestHeader(this.requestHeader),
                Ct.setWithCredentials(this.withCredentials),
                Ct.load(tt, function(Mt) {
                    try {
                        lt(xt.parse(JSON.parse(Mt)))
                    } catch (Lt) {
                        ft ? ft(Lt) : console.error(Lt),
                        xt.manager.itemError(tt)
                    }
                }, mt, ft)
            }
            parse(tt) {
                const lt = [];
                for (let mt = 0; mt < tt.length; mt++) {
                    const ft = L_.parse(tt[mt]);
                    lt.push(ft)
                }
                return lt
            }
        }
        class TS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = []
                  , Mt = new jv
                  , Lt = new su(this.manager);
                Lt.setPath(this.path),
                Lt.setResponseType("arraybuffer"),
                Lt.setRequestHeader(this.requestHeader),
                Lt.setWithCredentials(xt.withCredentials);
                let Nt = 0;
                function jt(Wt) {
                    Lt.load(tt[Wt], function(Qt) {
                        const qt = xt.parse(Qt, !0);
                        Ct[Wt] = {
                            width: qt.width,
                            height: qt.height,
                            format: qt.format,
                            mipmaps: qt.mipmaps
                        },
                        Nt += 1,
                        Nt === 6 && (qt.mipmapCount === 1 && (Mt.minFilter = Rn),
                        Mt.image = Ct,
                        Mt.format = qt.format,
                        Mt.needsUpdate = !0,
                        lt && lt(Mt))
                    }, mt, ft)
                }
                if (Array.isArray(tt))
                    for (let Wt = 0, Qt = tt.length; Wt < Qt; ++Wt)
                        jt(Wt);
                else
                    Lt.load(tt, function(Wt) {
                        const Qt = xt.parse(Wt, !0);
                        if (Qt.isCubemap) {
                            const qt = Qt.mipmaps.length / Qt.mipmapCount;
                            for (let Xt = 0; Xt < qt; Xt++) {
                                Ct[Xt] = {
                                    mipmaps: []
                                };
                                for (let Zt = 0; Zt < Qt.mipmapCount; Zt++)
                                    Ct[Xt].mipmaps.push(Qt.mipmaps[Xt * Qt.mipmapCount + Zt]),
                                    Ct[Xt].format = Qt.format,
                                    Ct[Xt].width = Qt.width,
                                    Ct[Xt].height = Qt.height
                            }
                            Mt.image = Ct
                        } else
                            Mt.image.width = Qt.width,
                            Mt.image.height = Qt.height,
                            Mt.mipmaps = Qt.mipmaps;
                        Qt.mipmapCount === 1 && (Mt.minFilter = Rn),
                        Mt.format = Qt.format,
                        Mt.needsUpdate = !0,
                        lt && lt(Mt)
                    }, mt, ft);
                return Mt
            }
        }
        class O_ extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = tt;
                this.path !== void 0 && (tt = this.path + tt),
                tt = this.manager.resolveURL(tt);
                const Ct = this
                  , Mt = Eu.get(tt);
                if (Mt !== void 0)
                    return Ct.manager.itemStart(tt),
                    setTimeout(function() {
                        lt && lt(Mt),
                        Ct.manager.itemEnd(tt)
                    }, 0),
                    Mt;
                const Lt = yu("img");
                function Nt() {
                    Wt(),
                    Eu.add(tt, this),
                    lt && lt(this),
                    Ct.manager.itemEnd(tt)
                }
                function jt(Qt) {
                    Wt(),
                    ft && ft(Qt),
                    Ct.manager.itemError(tt),
                    Ct.manager.itemEnd(tt)
                }
                function Wt() {
                    Lt.removeEventListener("load", Nt, !1),
                    Lt.removeEventListener("error", jt, !1)
                }
                return Lt.addEventListener("load", Nt, !1),
                Lt.addEventListener("error", jt, !1),
                tt.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (Lt.crossOrigin = this.crossOrigin),
                Ct.manager.itemStart(tt),
                Eu.get(tt, "blob").then(Qt => {
                    if (Qt !== void 0 && !Qt.type.startsWith("text/plain"))
                        return Qt.type || (tt.endsWith(".svg") || tt.startsWith("data:image/svg")) && (Qt = new Blob([Qt],{
                            type: "image/svg+xml"
                        })),
                        void (Lt.src = URL.createObjectURL(Qt));
                    const qt = new su(this.manager);
                    qt.useCache = !1,
                    qt.setPath(this.path),
                    qt.setCrossOrigin(this.crossOrigin),
                    qt.setResponseType("blob"),
                    qt.load(xt, function(Xt) {
                        Xt.type || (tt.endsWith(".svg") || tt.startsWith("data:image/svg")) && (Xt = new Blob([Xt],{
                            type: "image/svg+xml"
                        })),
                        Eu.add(tt, Xt, "blob"),
                        Lt.src = URL.createObjectURL(Xt)
                    }, mt, Xt => {
                        Wt(),
                        ft && ft(Xt)
                    }
                    )
                }
                ),
                Lt
            }
        }
        class CS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = new f_;
                xt.colorSpace = jo;
                const Ct = new O_(this.manager);
                Ct.setCrossOrigin(this.crossOrigin),
                Ct.setPath(this.path);
                let Mt = 0;
                function Lt(Nt) {
                    Ct.load(tt[Nt], function(jt) {
                        xt.images[Nt] = jt,
                        Mt++,
                        Mt === 6 && (xt.needsUpdate = !0,
                        lt && lt(xt))
                    }, void 0, ft)
                }
                for (let Nt = 0; Nt < tt.length; ++Nt)
                    Lt(Nt);
                return xt
            }
        }
        class PS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = new Pm
                  , Mt = new su(this.manager);
                return Mt.setResponseType("arraybuffer"),
                Mt.setRequestHeader(this.requestHeader),
                Mt.setPath(this.path),
                Mt.setWithCredentials(xt.withCredentials),
                Mt.load(tt, function(Lt) {
                    let Nt;
                    try {
                        Nt = xt.parse(Lt)
                    } catch (jt) {
                        if (ft === void 0)
                            return void console.error(jt);
                        ft(jt)
                    }
                    Nt.image !== void 0 ? Ct.image = Nt.image : Nt.data !== void 0 && (Ct.image.width = Nt.width,
                    Ct.image.height = Nt.height,
                    Ct.image.data = Nt.data,
                    Ct.image.complete = !0),
                    Ct.wrapS = Nt.wrapS !== void 0 ? Nt.wrapS : wn,
                    Ct.wrapT = Nt.wrapT !== void 0 ? Nt.wrapT : wn,
                    Ct.magFilter = Nt.magFilter !== void 0 ? Nt.magFilter : Rn,
                    Ct.minFilter = Nt.minFilter !== void 0 ? Nt.minFilter : Rn,
                    Ct.anisotropy = Nt.anisotropy !== void 0 ? Nt.anisotropy : 1,
                    Nt.colorSpace !== void 0 ? Ct.colorSpace = Nt.colorSpace : Nt.encoding !== void 0 && (Ct.encoding = Nt.encoding),
                    Nt.flipY !== void 0 && (Ct.flipY = Nt.flipY),
                    Nt.format !== void 0 && (Ct.format = Nt.format),
                    Nt.type !== void 0 && (Ct.type = Nt.type),
                    Nt.mipmaps !== void 0 && (Ct.mipmaps = Nt.mipmaps,
                    Ct.minFilter = vo),
                    Nt.mipmapCount === 1 && (Ct.minFilter = Rn),
                    Nt.generateMipmaps !== void 0 && (Ct.generateMipmaps = Nt.generateMipmaps),
                    Ct.needsUpdate = !0,
                    lt && lt(Ct, Nt)
                }, mt, ft),
                Ct
            }
        }
        class MS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = new Ho
                  , Ct = new O_(this.manager);
                return Ct.setCrossOrigin(this.crossOrigin),
                Ct.setPath(this.path),
                Ct.load(tt, function(Mt) {
                    xt.image = Mt,
                    xt.needsUpdate = !0,
                    lt !== void 0 && lt(xt)
                }, mt, ft),
                xt
            }
        }
        class rp extends Mo {
            constructor(tt, lt=1) {
                super(),
                this.isLight = !0,
                this.type = "Light",
                this.color = new Gn(tt),
                this.intensity = lt
            }
            dispose() {}
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.color.copy(tt.color),
                this.intensity = tt.intensity,
                this
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.object.color = this.color.getHex(),
                lt.object.intensity = this.intensity,
                this.groundColor !== void 0 && (lt.object.groundColor = this.groundColor.getHex()),
                this.distance !== void 0 && (lt.object.distance = this.distance),
                this.angle !== void 0 && (lt.object.angle = this.angle),
                this.decay !== void 0 && (lt.object.decay = this.decay),
                this.penumbra !== void 0 && (lt.object.penumbra = this.penumbra),
                this.shadow !== void 0 && (lt.object.shadow = this.shadow.toJSON()),
                lt
            }
        }
        class EA extends rp {
            constructor(tt, lt, mt) {
                super(tt, mt),
                this.isHemisphereLight = !0,
                this.type = "HemisphereLight",
                this.position.copy(Mo.DEFAULT_UP),
                this.updateMatrix(),
                this.groundColor = new Gn(lt)
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.groundColor.copy(tt.groundColor),
                this
            }
        }
        const yy = new no
          , TA = new Er
          , CA = new Er;
        class xy {
            constructor(tt) {
                this.camera = tt,
                this.bias = 0,
                this.normalBias = 0,
                this.radius = 1,
                this.blurSamples = 8,
                this.mapSize = new mn(512,512),
                this.map = null,
                this.mapPass = null,
                this.matrix = new no,
                this.autoUpdate = !0,
                this.needsUpdate = !1,
                this._frustum = new Av,
                this._frameExtents = new mn(1,1),
                this._viewportCount = 1,
                this._viewports = [new Lo(0,0,1,1)]
            }
            getViewportCount() {
                return this._viewportCount
            }
            getFrustum() {
                return this._frustum
            }
            updateMatrices(tt) {
                const lt = this.camera
                  , mt = this.matrix;
                TA.setFromMatrixPosition(tt.matrixWorld),
                lt.position.copy(TA),
                CA.setFromMatrixPosition(tt.target.matrixWorld),
                lt.lookAt(CA),
                lt.updateMatrixWorld(),
                yy.multiplyMatrices(lt.projectionMatrix, lt.matrixWorldInverse),
                this._frustum.setFromProjectionMatrix(yy),
                mt.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                mt.multiply(yy)
            }
            getViewport(tt) {
                return this._viewports[tt]
            }
            getFrameExtents() {
                return this._frameExtents
            }
            dispose() {
                this.map && this.map.dispose(),
                this.mapPass && this.mapPass.dispose()
            }
            copy(tt) {
                return this.camera = tt.camera.clone(),
                this.bias = tt.bias,
                this.normalBias = tt.normalBias,
                this.radius = tt.radius,
                this.mapSize.copy(tt.mapSize),
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
            toJSON() {
                const tt = {};
                return this.bias !== 0 && (tt.bias = this.bias),
                this.normalBias !== 0 && (tt.normalBias = this.normalBias),
                this.radius !== 1 && (tt.radius = this.radius),
                this.mapSize.x === 512 && this.mapSize.y === 512 || (tt.mapSize = this.mapSize.toArray()),
                tt.camera = this.camera.toJSON(!1).object,
                delete tt.camera.matrix,
                tt
            }
        }
        class RS extends xy {
            constructor() {
                super(new Cs(50,1,.5,500)),
                this.isSpotLightShadow = !0,
                this.focus = 1
            }
            updateMatrices(tt) {
                const lt = this.camera
                  , mt = 2 * _u * tt.angle * this.focus
                  , ft = this.mapSize.width / this.mapSize.height
                  , xt = tt.distance || lt.far;
                mt === lt.fov && ft === lt.aspect && xt === lt.far || (lt.fov = mt,
                lt.aspect = ft,
                lt.far = xt,
                lt.updateProjectionMatrix()),
                super.updateMatrices(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.focus = tt.focus,
                this
            }
        }
        class PA extends rp {
            constructor(tt, lt, mt=0, ft=Math.PI / 3, xt=0, Ct=2) {
                super(tt, lt),
                this.isSpotLight = !0,
                this.type = "SpotLight",
                this.position.copy(Mo.DEFAULT_UP),
                this.updateMatrix(),
                this.target = new Mo,
                this.distance = mt,
                this.angle = ft,
                this.penumbra = xt,
                this.decay = Ct,
                this.map = null,
                this.shadow = new RS
            }
            get power() {
                return this.intensity * Math.PI
            }
            set power(tt) {
                this.intensity = tt / Math.PI
            }
            dispose() {
                this.shadow.dispose()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.distance = tt.distance,
                this.angle = tt.angle,
                this.penumbra = tt.penumbra,
                this.decay = tt.decay,
                this.target = tt.target.clone(),
                this.shadow = tt.shadow.clone(),
                this
            }
        }
        const MA = new no
          , N_ = new Er
          , by = new Er;
        class IS extends xy {
            constructor() {
                super(new Cs(90,1,.5,500)),
                this.isPointLightShadow = !0,
                this._frameExtents = new mn(4,2),
                this._viewportCount = 6,
                this._viewports = [new Lo(2,1,1,1), new Lo(0,1,1,1), new Lo(3,1,1,1), new Lo(1,1,1,1), new Lo(3,0,1,1), new Lo(1,0,1,1)],
                this._cubeDirections = [new Er(1,0,0), new Er(-1,0,0), new Er(0,0,1), new Er(0,0,-1), new Er(0,1,0), new Er(0,-1,0)],
                this._cubeUps = [new Er(0,1,0), new Er(0,1,0), new Er(0,1,0), new Er(0,1,0), new Er(0,0,1), new Er(0,0,-1)]
            }
            updateMatrices(tt, lt=0) {
                const mt = this.camera
                  , ft = this.matrix
                  , xt = tt.distance || mt.far;
                xt !== mt.far && (mt.far = xt,
                mt.updateProjectionMatrix()),
                N_.setFromMatrixPosition(tt.matrixWorld),
                mt.position.copy(N_),
                by.copy(mt.position),
                by.add(this._cubeDirections[lt]),
                mt.up.copy(this._cubeUps[lt]),
                mt.lookAt(by),
                mt.updateMatrixWorld(),
                ft.makeTranslation(-N_.x, -N_.y, -N_.z),
                MA.multiplyMatrices(mt.projectionMatrix, mt.matrixWorldInverse),
                this._frustum.setFromProjectionMatrix(MA)
            }
        }
        class RA extends rp {
            constructor(tt, lt, mt=0, ft=2) {
                super(tt, lt),
                this.isPointLight = !0,
                this.type = "PointLight",
                this.distance = mt,
                this.decay = ft,
                this.shadow = new IS
            }
            get power() {
                return 4 * this.intensity * Math.PI
            }
            set power(tt) {
                this.intensity = tt / (4 * Math.PI)
            }
            dispose() {
                this.shadow.dispose()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.distance = tt.distance,
                this.decay = tt.decay,
                this.shadow = tt.shadow.clone(),
                this
            }
        }
        class kS extends xy {
            constructor() {
                super(new Sv(-5,5,5,-5,.5,500)),
                this.isDirectionalLightShadow = !0
            }
        }
        class IA extends rp {
            constructor(tt, lt) {
                super(tt, lt),
                this.isDirectionalLight = !0,
                this.type = "DirectionalLight",
                this.position.copy(Mo.DEFAULT_UP),
                this.updateMatrix(),
                this.target = new Mo,
                this.shadow = new kS
            }
            dispose() {
                this.shadow.dispose()
            }
            copy(tt) {
                return super.copy(tt),
                this.target = tt.target.clone(),
                this.shadow = tt.shadow.clone(),
                this
            }
        }
        class kA extends rp {
            constructor(tt, lt) {
                super(tt, lt),
                this.isAmbientLight = !0,
                this.type = "AmbientLight"
            }
        }
        class DA extends rp {
            constructor(tt, lt, mt=10, ft=10) {
                super(tt, lt),
                this.isRectAreaLight = !0,
                this.type = "RectAreaLight",
                this.width = mt,
                this.height = ft
            }
            get power() {
                return this.intensity * this.width * this.height * Math.PI
            }
            set power(tt) {
                this.intensity = tt / (this.width * this.height * Math.PI)
            }
            copy(tt) {
                return super.copy(tt),
                this.width = tt.width,
                this.height = tt.height,
                this
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.object.width = this.width,
                lt.object.height = this.height,
                lt
            }
        }
        class BA {
            constructor() {
                this.isSphericalHarmonics3 = !0,
                this.coefficients = [];
                for (let tt = 0; tt < 9; tt++)
                    this.coefficients.push(new Er)
            }
            set(tt) {
                for (let lt = 0; lt < 9; lt++)
                    this.coefficients[lt].copy(tt[lt]);
                return this
            }
            zero() {
                for (let tt = 0; tt < 9; tt++)
                    this.coefficients[tt].set(0, 0, 0);
                return this
            }
            getAt(tt, lt) {
                const mt = tt.x
                  , ft = tt.y
                  , xt = tt.z
                  , Ct = this.coefficients;
                return lt.copy(Ct[0]).multiplyScalar(.282095),
                lt.addScaledVector(Ct[1], .488603 * ft),
                lt.addScaledVector(Ct[2], .488603 * xt),
                lt.addScaledVector(Ct[3], .488603 * mt),
                lt.addScaledVector(Ct[4], mt * ft * 1.092548),
                lt.addScaledVector(Ct[5], ft * xt * 1.092548),
                lt.addScaledVector(Ct[6], .315392 * (3 * xt * xt - 1)),
                lt.addScaledVector(Ct[7], mt * xt * 1.092548),
                lt.addScaledVector(Ct[8], .546274 * (mt * mt - ft * ft)),
                lt
            }
            getIrradianceAt(tt, lt) {
                const mt = tt.x
                  , ft = tt.y
                  , xt = tt.z
                  , Ct = this.coefficients;
                return lt.copy(Ct[0]).multiplyScalar(.886227),
                lt.addScaledVector(Ct[1], 1.023328 * ft),
                lt.addScaledVector(Ct[2], 1.023328 * xt),
                lt.addScaledVector(Ct[3], 1.023328 * mt),
                lt.addScaledVector(Ct[4], .858086 * mt * ft),
                lt.addScaledVector(Ct[5], .858086 * ft * xt),
                lt.addScaledVector(Ct[6], .743125 * xt * xt - .247708),
                lt.addScaledVector(Ct[7], .858086 * mt * xt),
                lt.addScaledVector(Ct[8], .429043 * (mt * mt - ft * ft)),
                lt
            }
            add(tt) {
                for (let lt = 0; lt < 9; lt++)
                    this.coefficients[lt].add(tt.coefficients[lt]);
                return this
            }
            addScaledSH(tt, lt) {
                for (let mt = 0; mt < 9; mt++)
                    this.coefficients[mt].addScaledVector(tt.coefficients[mt], lt);
                return this
            }
            scale(tt) {
                for (let lt = 0; lt < 9; lt++)
                    this.coefficients[lt].multiplyScalar(tt);
                return this
            }
            lerp(tt, lt) {
                for (let mt = 0; mt < 9; mt++)
                    this.coefficients[mt].lerp(tt.coefficients[mt], lt);
                return this
            }
            equals(tt) {
                for (let lt = 0; lt < 9; lt++)
                    if (!this.coefficients[lt].equals(tt.coefficients[lt]))
                        return !1;
                return !0
            }
            copy(tt) {
                return this.set(tt.coefficients)
            }
            clone() {
                return new this.constructor().copy(this)
            }
            fromArray(tt, lt=0) {
                const mt = this.coefficients;
                for (let ft = 0; ft < 9; ft++)
                    mt[ft].fromArray(tt, lt + 3 * ft);
                return this
            }
            toArray(tt=[], lt=0) {
                const mt = this.coefficients;
                for (let ft = 0; ft < 9; ft++)
                    mt[ft].toArray(tt, lt + 3 * ft);
                return tt
            }
            static getBasisAt(tt, lt) {
                const mt = tt.x
                  , ft = tt.y
                  , xt = tt.z;
                lt[0] = .282095,
                lt[1] = .488603 * ft,
                lt[2] = .488603 * xt,
                lt[3] = .488603 * mt,
                lt[4] = 1.092548 * mt * ft,
                lt[5] = 1.092548 * ft * xt,
                lt[6] = .315392 * (3 * xt * xt - 1),
                lt[7] = 1.092548 * mt * xt,
                lt[8] = .546274 * (mt * mt - ft * ft)
            }
        }
        class LA extends rp {
            constructor(tt=new BA, lt=1) {
                super(void 0, lt),
                this.isLightProbe = !0,
                this.sh = tt
            }
            copy(tt) {
                return super.copy(tt),
                this.sh.copy(tt.sh),
                this
            }
            fromJSON(tt) {
                return this.intensity = tt.intensity,
                this.sh.fromArray(tt.sh),
                this
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.object.sh = this.sh.toArray(),
                lt
            }
        }
        class l0 extends $s {
            constructor(tt) {
                super(tt),
                this.textures = {}
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = new su(xt.manager);
                Ct.setPath(xt.path),
                Ct.setRequestHeader(xt.requestHeader),
                Ct.setWithCredentials(xt.withCredentials),
                Ct.load(tt, function(Mt) {
                    try {
                        lt(xt.parse(JSON.parse(Mt)))
                    } catch (Lt) {
                        ft ? ft(Lt) : console.error(Lt),
                        xt.manager.itemError(tt)
                    }
                }, mt, ft)
            }
            parse(tt) {
                const lt = this.textures;
                function mt(Ct) {
                    return lt[Ct] === void 0 && console.warn("THREE.MaterialLoader: Undefined texture", Ct),
                    lt[Ct]
                }
                const ft = tt.metadata && tt.metadata.version <= 4.5 ? Xo : void 0
                  , xt = l0.createMaterialFromType(tt.type);
                if (tt.uuid !== void 0 && (xt.uuid = tt.uuid),
                tt.name !== void 0 && (xt.name = tt.name),
                tt.color !== void 0 && xt.color !== void 0 && xt.color.setHex(tt.color, ft),
                tt.roughness !== void 0 && (xt.roughness = tt.roughness),
                tt.metalness !== void 0 && (xt.metalness = tt.metalness),
                tt.sheen !== void 0 && (xt.sheen = tt.sheen),
                tt.sheenColor !== void 0 && (xt.sheenColor = new Gn().setHex(tt.sheenColor, ft)),
                tt.sheenRoughness !== void 0 && (xt.sheenRoughness = tt.sheenRoughness),
                tt.emissive !== void 0 && xt.emissive !== void 0 && xt.emissive.setHex(tt.emissive, ft),
                tt.specular !== void 0 && xt.specular !== void 0 && xt.specular.setHex(tt.specular, ft),
                tt.specularIntensity !== void 0 && (xt.specularIntensity = tt.specularIntensity),
                tt.specularColor !== void 0 && xt.specularColor !== void 0 && xt.specularColor.setHex(tt.specularColor, ft),
                tt.shininess !== void 0 && (xt.shininess = tt.shininess),
                tt.clearcoat !== void 0 && (xt.clearcoat = tt.clearcoat),
                tt.clearcoatRoughness !== void 0 && (xt.clearcoatRoughness = tt.clearcoatRoughness),
                tt.iridescence !== void 0 && (xt.iridescence = tt.iridescence),
                tt.iridescenceIOR !== void 0 && (xt.iridescenceIOR = tt.iridescenceIOR),
                tt.iridescenceThicknessRange !== void 0 && (xt.iridescenceThicknessRange = tt.iridescenceThicknessRange),
                tt.transmission !== void 0 && (xt.transmission = tt.transmission),
                tt.thickness !== void 0 && (xt.thickness = tt.thickness),
                tt.attenuationDistance !== void 0 && (xt.attenuationDistance = tt.attenuationDistance),
                tt.attenuationColor !== void 0 && xt.attenuationColor !== void 0 && xt.attenuationColor.setHex(tt.attenuationColor, ft),
                tt.anisotropy !== void 0 && (xt.anisotropy = tt.anisotropy),
                tt.anisotropyRotation !== void 0 && (xt.anisotropyRotation = tt.anisotropyRotation),
                tt.fog !== void 0 && (xt.fog = tt.fog),
                tt.flatShading !== void 0 && (xt.flatShading = tt.flatShading),
                tt.blending !== void 0 && (xt.blending = tt.blending),
                tt.combine !== void 0 && (xt.combine = tt.combine),
                tt.side !== void 0 && (xt.side = tt.side),
                tt.shadowSide !== void 0 && (xt.shadowSide = tt.shadowSide),
                tt.opacity !== void 0 && (xt.opacity = tt.opacity),
                tt.transparent !== void 0 && (xt.transparent = tt.transparent),
                tt.alphaTest !== void 0 && (xt.alphaTest = tt.alphaTest),
                tt.alphaHash !== void 0 && (xt.alphaHash = tt.alphaHash),
                tt.depthTest !== void 0 && (xt.depthTest = tt.depthTest),
                tt.depthWrite !== void 0 && (xt.depthWrite = tt.depthWrite),
                tt.colorWrite !== void 0 && (xt.colorWrite = tt.colorWrite),
                tt.stencilWrite !== void 0 && (xt.stencilWrite = tt.stencilWrite),
                tt.stencilWriteMask !== void 0 && (xt.stencilWriteMask = tt.stencilWriteMask),
                tt.stencilFunc !== void 0 && (xt.stencilFunc = tt.stencilFunc),
                tt.stencilRef !== void 0 && (xt.stencilRef = tt.stencilRef),
                tt.stencilFuncMask !== void 0 && (xt.stencilFuncMask = tt.stencilFuncMask),
                tt.stencilFail !== void 0 && (xt.stencilFail = tt.stencilFail),
                tt.stencilZFail !== void 0 && (xt.stencilZFail = tt.stencilZFail),
                tt.stencilZPass !== void 0 && (xt.stencilZPass = tt.stencilZPass),
                tt.wireframe !== void 0 && (xt.wireframe = tt.wireframe),
                tt.wireframeLinewidth !== void 0 && (xt.wireframeLinewidth = tt.wireframeLinewidth),
                tt.wireframeLinecap !== void 0 && (xt.wireframeLinecap = tt.wireframeLinecap),
                tt.wireframeLinejoin !== void 0 && (xt.wireframeLinejoin = tt.wireframeLinejoin),
                tt.rotation !== void 0 && (xt.rotation = tt.rotation),
                tt.linewidth !== void 0 && (xt.linewidth = tt.linewidth),
                tt.dashSize !== void 0 && (xt.dashSize = tt.dashSize),
                tt.gapSize !== void 0 && (xt.gapSize = tt.gapSize),
                tt.scale !== void 0 && (xt.scale = tt.scale),
                tt.polygonOffset !== void 0 && (xt.polygonOffset = tt.polygonOffset),
                tt.polygonOffsetFactor !== void 0 && (xt.polygonOffsetFactor = tt.polygonOffsetFactor),
                tt.polygonOffsetUnits !== void 0 && (xt.polygonOffsetUnits = tt.polygonOffsetUnits),
                tt.dithering !== void 0 && (xt.dithering = tt.dithering),
                tt.alphaToCoverage !== void 0 && (xt.alphaToCoverage = tt.alphaToCoverage),
                tt.premultipliedAlpha !== void 0 && (xt.premultipliedAlpha = tt.premultipliedAlpha),
                tt.forceSinglePass !== void 0 && (xt.forceSinglePass = tt.forceSinglePass),
                tt.visible !== void 0 && (xt.visible = tt.visible),
                tt.toneMapped !== void 0 && (xt.toneMapped = tt.toneMapped),
                tt.userData !== void 0 && (xt.userData = tt.userData),
                tt.vertexColors !== void 0 && (typeof tt.vertexColors == "number" ? xt.vertexColors = tt.vertexColors > 0 : xt.vertexColors = tt.vertexColors),
                tt.uniforms !== void 0)
                    for (const Ct in tt.uniforms) {
                        const Mt = tt.uniforms[Ct];
                        switch (xt.uniforms[Ct] = {},
                        Mt.type) {
                        case "t":
                            xt.uniforms[Ct].value = mt(Mt.value);
                            break;
                        case "c":
                            xt.uniforms[Ct].value = new Gn().setHex(Mt.value, ft);
                            break;
                        case "v2":
                            xt.uniforms[Ct].value = new mn().fromArray(Mt.value);
                            break;
                        case "v3":
                            xt.uniforms[Ct].value = new Er().fromArray(Mt.value);
                            break;
                        case "v4":
                            xt.uniforms[Ct].value = new Lo().fromArray(Mt.value);
                            break;
                        case "m3":
                            xt.uniforms[Ct].value = new lo().fromArray(Mt.value);
                            break;
                        case "m4":
                            xt.uniforms[Ct].value = new no().fromArray(Mt.value);
                            break;
                        default:
                            xt.uniforms[Ct].value = Mt.value
                        }
                    }
                if (tt.defines !== void 0 && (xt.defines = tt.defines),
                tt.vertexShader !== void 0 && (xt.vertexShader = tt.vertexShader),
                tt.fragmentShader !== void 0 && (xt.fragmentShader = tt.fragmentShader),
                tt.glslVersion !== void 0 && (xt.glslVersion = tt.glslVersion),
                tt.extensions !== void 0)
                    for (const Ct in tt.extensions)
                        xt.extensions[Ct] = tt.extensions[Ct];
                if (tt.lights !== void 0 && (xt.lights = tt.lights),
                tt.clipping !== void 0 && (xt.clipping = tt.clipping),
                tt.size !== void 0 && (xt.size = tt.size),
                tt.sizeAttenuation !== void 0 && (xt.sizeAttenuation = tt.sizeAttenuation),
                tt.map !== void 0 && (xt.map = mt(tt.map)),
                tt.matcap !== void 0 && (xt.matcap = mt(tt.matcap)),
                tt.alphaMap !== void 0 && (xt.alphaMap = mt(tt.alphaMap)),
                tt.bumpMap !== void 0 && (xt.bumpMap = mt(tt.bumpMap)),
                tt.bumpScale !== void 0 && (xt.bumpScale = tt.bumpScale),
                tt.normalMap !== void 0 && (xt.normalMap = mt(tt.normalMap)),
                tt.normalMapType !== void 0 && (xt.normalMapType = tt.normalMapType),
                tt.normalScale !== void 0) {
                    let Ct = tt.normalScale;
                    Array.isArray(Ct) === !1 && (Ct = [Ct, Ct]),
                    xt.normalScale = new mn().fromArray(Ct)
                }
                return tt.displacementMap !== void 0 && (xt.displacementMap = mt(tt.displacementMap)),
                tt.displacementScale !== void 0 && (xt.displacementScale = tt.displacementScale),
                tt.displacementBias !== void 0 && (xt.displacementBias = tt.displacementBias),
                tt.roughnessMap !== void 0 && (xt.roughnessMap = mt(tt.roughnessMap)),
                tt.metalnessMap !== void 0 && (xt.metalnessMap = mt(tt.metalnessMap)),
                tt.emissiveMap !== void 0 && (xt.emissiveMap = mt(tt.emissiveMap)),
                tt.emissiveIntensity !== void 0 && (xt.emissiveIntensity = tt.emissiveIntensity),
                tt.specularMap !== void 0 && (xt.specularMap = mt(tt.specularMap)),
                tt.specularIntensityMap !== void 0 && (xt.specularIntensityMap = mt(tt.specularIntensityMap)),
                tt.specularColorMap !== void 0 && (xt.specularColorMap = mt(tt.specularColorMap)),
                tt.envMap !== void 0 && (xt.envMap = mt(tt.envMap)),
                tt.envMapIntensity !== void 0 && (xt.envMapIntensity = tt.envMapIntensity),
                tt.reflectivity !== void 0 && (xt.reflectivity = tt.reflectivity),
                tt.refractionRatio !== void 0 && (xt.refractionRatio = tt.refractionRatio),
                tt.lightMap !== void 0 && (xt.lightMap = mt(tt.lightMap)),
                tt.lightMapIntensity !== void 0 && (xt.lightMapIntensity = tt.lightMapIntensity),
                tt.aoMap !== void 0 && (xt.aoMap = mt(tt.aoMap)),
                tt.aoMapIntensity !== void 0 && (xt.aoMapIntensity = tt.aoMapIntensity),
                tt.gradientMap !== void 0 && (xt.gradientMap = mt(tt.gradientMap)),
                tt.clearcoatMap !== void 0 && (xt.clearcoatMap = mt(tt.clearcoatMap)),
                tt.clearcoatRoughnessMap !== void 0 && (xt.clearcoatRoughnessMap = mt(tt.clearcoatRoughnessMap)),
                tt.clearcoatNormalMap !== void 0 && (xt.clearcoatNormalMap = mt(tt.clearcoatNormalMap)),
                tt.clearcoatNormalScale !== void 0 && (xt.clearcoatNormalScale = new mn().fromArray(tt.clearcoatNormalScale)),
                tt.iridescenceMap !== void 0 && (xt.iridescenceMap = mt(tt.iridescenceMap)),
                tt.iridescenceThicknessMap !== void 0 && (xt.iridescenceThicknessMap = mt(tt.iridescenceThicknessMap)),
                tt.transmissionMap !== void 0 && (xt.transmissionMap = mt(tt.transmissionMap)),
                tt.thicknessMap !== void 0 && (xt.thicknessMap = mt(tt.thicknessMap)),
                tt.anisotropyMap !== void 0 && (xt.anisotropyMap = mt(tt.anisotropyMap)),
                tt.sheenColorMap !== void 0 && (xt.sheenColorMap = mt(tt.sheenColorMap)),
                tt.sheenRoughnessMap !== void 0 && (xt.sheenRoughnessMap = mt(tt.sheenRoughnessMap)),
                xt
            }
            setTextures(tt) {
                return this.textures = tt,
                this
            }
            static createMaterialFromType(tt) {
                return new {
                    ShadowMaterial: uA,
                    SpriteMaterial: q0,
                    RawShaderMaterial: dA,
                    ShaderMaterial: zl,
                    PointsMaterial: Z0,
                    MeshPhysicalMaterial: pA,
                    MeshStandardMaterial: hy,
                    MeshPhongMaterial: hA,
                    MeshToonMaterial: mA,
                    MeshNormalMaterial: fA,
                    MeshLambertMaterial: gA,
                    MeshDepthMaterial: H0,
                    MeshDistanceMaterial: Q0,
                    MeshBasicMaterial: nu,
                    MeshMatcapMaterial: _A,
                    LineDashedMaterial: vA,
                    LineBasicMaterial: Gs,
                    Material: hs
                }[tt]
            }
        }
        class Ay {
            static decodeText(tt) {
                if (typeof TextDecoder < "u")
                    return new TextDecoder().decode(tt);
                let lt = "";
                for (let mt = 0, ft = tt.length; mt < ft; mt++)
                    lt += String.fromCharCode(tt[mt]);
                try {
                    return decodeURIComponent(escape(lt))
                } catch {
                    return lt
                }
            }
            static extractUrlBase(tt) {
                const lt = tt.lastIndexOf("/");
                return lt === -1 ? "./" : tt.slice(0, lt + 1)
            }
            static resolveURL(tt, lt) {
                return typeof tt != "string" || tt === "" ? "" : (/^https?:\/\//i.test(lt) && /^\//.test(tt) && (lt = lt.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
                /^(https?:)?\/\//i.test(tt) || /^data:.*,.*$/i.test(tt) || /^blob:.*$/i.test(tt) ? tt : lt + tt)
            }
        }
        class OA extends bo {
            constructor() {
                super(),
                this.isInstancedBufferGeometry = !0,
                this.type = "InstancedBufferGeometry",
                this.instanceCount = 1 / 0
            }
            copy(tt) {
                return super.copy(tt),
                this.instanceCount = tt.instanceCount,
                this
            }
            toJSON() {
                const tt = super.toJSON();
                return tt.instanceCount = this.instanceCount,
                tt.isInstancedBufferGeometry = !0,
                tt
            }
        }
        class NA extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = new su(xt.manager);
                Ct.setPath(xt.path),
                Ct.setRequestHeader(xt.requestHeader),
                Ct.setWithCredentials(xt.withCredentials),
                Ct.load(tt, function(Mt) {
                    try {
                        lt(xt.parse(JSON.parse(Mt)))
                    } catch (Lt) {
                        ft ? ft(Lt) : console.error(Lt),
                        xt.manager.itemError(tt)
                    }
                }, mt, ft)
            }
            parse(tt) {
                const lt = {}
                  , mt = {};
                function ft(Wt, Qt) {
                    if (lt[Qt] !== void 0)
                        return lt[Qt];
                    const qt = Wt.interleavedBuffers[Qt]
                      , Xt = function(sr, er) {
                        if (mt[er] !== void 0)
                            return mt[er];
                        const rr = sr.arrayBuffers[er]
                          , xr = new Uint32Array(rr).buffer;
                        return mt[er] = xr,
                        xr
                    }(Wt, qt.buffer)
                      , Zt = vu(qt.type, Xt)
                      , Yt = new Rv(Zt,qt.stride);
                    return Yt.uuid = qt.uuid,
                    lt[Qt] = Yt,
                    Yt
                }
                const xt = tt.isInstancedBufferGeometry ? new OA : new bo
                  , Ct = tt.data.index;
                if (Ct !== void 0) {
                    const Wt = vu(Ct.type, Ct.array);
                    xt.setIndex(new mr(Wt,1))
                }
                const Mt = tt.data.attributes;
                for (const Wt in Mt) {
                    const Qt = Mt[Wt];
                    let qt;
                    if (Qt.isInterleavedBufferAttribute) {
                        const Xt = ft(tt.data, Qt.data);
                        qt = new Cp(Xt,Qt.itemSize,Qt.offset,Qt.normalized)
                    } else {
                        const Xt = vu(Qt.type, Qt.array);
                        qt = new (Qt.isInstancedBufferAttribute ? Mm : mr)(Xt,Qt.itemSize,Qt.normalized)
                    }
                    Qt.name !== void 0 && (qt.name = Qt.name),
                    Qt.usage !== void 0 && qt.setUsage(Qt.usage),
                    Qt.updateRange !== void 0 && (qt.updateRange.offset = Qt.updateRange.offset,
                    qt.updateRange.count = Qt.updateRange.count),
                    xt.setAttribute(Wt, qt)
                }
                const Lt = tt.data.morphAttributes;
                if (Lt)
                    for (const Wt in Lt) {
                        const Qt = Lt[Wt]
                          , qt = [];
                        for (let Xt = 0, Zt = Qt.length; Xt < Zt; Xt++) {
                            const Yt = Qt[Xt];
                            let sr;
                            if (Yt.isInterleavedBufferAttribute) {
                                const er = ft(tt.data, Yt.data);
                                sr = new Cp(er,Yt.itemSize,Yt.offset,Yt.normalized)
                            } else {
                                const er = vu(Yt.type, Yt.array);
                                sr = new mr(er,Yt.itemSize,Yt.normalized)
                            }
                            Yt.name !== void 0 && (sr.name = Yt.name),
                            qt.push(sr)
                        }
                        xt.morphAttributes[Wt] = qt
                    }
                tt.data.morphTargetsRelative && (xt.morphTargetsRelative = !0);
                const Nt = tt.data.groups || tt.data.drawcalls || tt.data.offsets;
                if (Nt !== void 0)
                    for (let Wt = 0, Qt = Nt.length; Wt !== Qt; ++Wt) {
                        const qt = Nt[Wt];
                        xt.addGroup(qt.start, qt.count, qt.materialIndex)
                    }
                const jt = tt.data.boundingSphere;
                if (jt !== void 0) {
                    const Wt = new Er;
                    jt.center !== void 0 && Wt.fromArray(jt.center),
                    xt.boundingSphere = new Ws(Wt,jt.radius)
                }
                return tt.name && (xt.name = tt.name),
                tt.userData && (xt.userData = tt.userData),
                xt
            }
        }
        class DS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = this.path === "" ? Ay.extractUrlBase(tt) : this.path;
                this.resourcePath = this.resourcePath || Ct;
                const Mt = new su(this.manager);
                Mt.setPath(this.path),
                Mt.setRequestHeader(this.requestHeader),
                Mt.setWithCredentials(this.withCredentials),
                Mt.load(tt, function(Lt) {
                    let Nt = null;
                    try {
                        Nt = JSON.parse(Lt)
                    } catch (Wt) {
                        return ft !== void 0 && ft(Wt),
                        void console.error("THREE:ObjectLoader: Can't parse " + tt + ".", Wt.message)
                    }
                    const jt = Nt.metadata;
                    if (jt === void 0 || jt.type === void 0 || jt.type.toLowerCase() === "geometry")
                        return ft !== void 0 && ft(new Error("THREE.ObjectLoader: Can't load " + tt)),
                        void console.error("THREE.ObjectLoader: Can't load " + tt);
                    xt.parse(Nt, lt)
                }, mt, ft)
            }
            async loadAsync(tt, lt) {
                const mt = this.path === "" ? Ay.extractUrlBase(tt) : this.path;
                this.resourcePath = this.resourcePath || mt;
                const ft = new su(this.manager);
                ft.setPath(this.path),
                ft.setRequestHeader(this.requestHeader),
                ft.setWithCredentials(this.withCredentials);
                const xt = await ft.loadAsync(tt, lt)
                  , Ct = JSON.parse(xt)
                  , Mt = Ct.metadata;
                if (Mt === void 0 || Mt.type === void 0 || Mt.type.toLowerCase() === "geometry")
                    throw new Error("THREE.ObjectLoader: Can't load " + tt);
                return await this.parseAsync(Ct)
            }
            parse(tt, lt) {
                const mt = this.parseAnimations(tt.animations)
                  , ft = this.parseShapes(tt.shapes)
                  , xt = this.parseGeometries(tt.geometries, ft)
                  , Ct = this.parseImages(tt.images, function() {
                    lt !== void 0 && lt(Nt)
                })
                  , Mt = this.parseTextures(tt.textures, Ct)
                  , Lt = this.parseMaterials(tt.materials, Mt)
                  , Nt = this.parseObject(tt.object, xt, Lt, Mt, mt)
                  , jt = this.parseSkeletons(tt.skeletons, Nt);
                if (this.bindSkeletons(Nt, jt),
                lt !== void 0) {
                    let Wt = !1;
                    for (const Qt in Ct)
                        if (Ct[Qt].data instanceof HTMLImageElement) {
                            Wt = !0;
                            break
                        }
                    Wt === !1 && lt(Nt)
                }
                return Nt
            }
            async parseAsync(tt) {
                const lt = this.parseAnimations(tt.animations)
                  , mt = this.parseShapes(tt.shapes)
                  , ft = this.parseGeometries(tt.geometries, mt)
                  , xt = await this.parseImagesAsync(tt.images)
                  , Ct = this.parseTextures(tt.textures, xt)
                  , Mt = this.parseMaterials(tt.materials, Ct)
                  , Lt = this.parseObject(tt.object, ft, Mt, Ct, lt)
                  , Nt = this.parseSkeletons(tt.skeletons, Lt);
                return this.bindSkeletons(Lt, Nt),
                Lt
            }
            parseShapes(tt) {
                const lt = {};
                if (tt !== void 0)
                    for (let mt = 0, ft = tt.length; mt < ft; mt++) {
                        const xt = new Pp().fromJSON(tt[mt]);
                        lt[xt.uuid] = xt
                    }
                return lt
            }
            parseSkeletons(tt, lt) {
                const mt = {}
                  , ft = {};
                if (lt.traverse(function(xt) {
                    xt.isBone && (ft[xt.uuid] = xt)
                }),
                tt !== void 0)
                    for (let xt = 0, Ct = tt.length; xt < Ct; xt++) {
                        const Mt = new Lv().fromJSON(tt[xt], ft);
                        mt[Mt.uuid] = Mt
                    }
                return mt
            }
            parseGeometries(tt, lt) {
                const mt = {};
                if (tt !== void 0) {
                    const ft = new NA;
                    for (let xt = 0, Ct = tt.length; xt < Ct; xt++) {
                        let Mt;
                        const Lt = tt[xt];
                        switch (Lt.type) {
                        case "BufferGeometry":
                        case "InstancedBufferGeometry":
                            Mt = ft.parse(Lt);
                            break;
                        default:
                            Lt.type in cA ? Mt = cA[Lt.type].fromJSON(Lt, lt) : console.warn(`THREE.ObjectLoader: Unsupported geometry type "${Lt.type}"`)
                        }
                        Mt.uuid = Lt.uuid,
                        Lt.name !== void 0 && (Mt.name = Lt.name),
                        Lt.userData !== void 0 && (Mt.userData = Lt.userData),
                        mt[Lt.uuid] = Mt
                    }
                }
                return mt
            }
            parseMaterials(tt, lt) {
                const mt = {}
                  , ft = {};
                if (tt !== void 0) {
                    const xt = new l0;
                    xt.setTextures(lt);
                    for (let Ct = 0, Mt = tt.length; Ct < Mt; Ct++) {
                        const Lt = tt[Ct];
                        mt[Lt.uuid] === void 0 && (mt[Lt.uuid] = xt.parse(Lt)),
                        ft[Lt.uuid] = mt[Lt.uuid]
                    }
                }
                return ft
            }
            parseAnimations(tt) {
                const lt = {};
                if (tt !== void 0)
                    for (let mt = 0; mt < tt.length; mt++) {
                        const ft = tt[mt]
                          , xt = L_.parse(ft);
                        lt[xt.uuid] = xt
                    }
                return lt
            }
            parseImages(tt, lt) {
                const mt = this
                  , ft = {};
                let xt;
                function Ct(Mt) {
                    if (typeof Mt == "string") {
                        const Lt = Mt;
                        return function(Nt) {
                            return mt.manager.itemStart(Nt),
                            xt.load(Nt, function() {
                                mt.manager.itemEnd(Nt)
                            }, void 0, function() {
                                mt.manager.itemError(Nt),
                                mt.manager.itemEnd(Nt)
                            })
                        }(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(Lt) ? Lt : mt.resourcePath + Lt)
                    }
                    return Mt.data ? {
                        data: vu(Mt.type, Mt.data),
                        width: Mt.width,
                        height: Mt.height,
                        complete: !0
                    } : null
                }
                if (tt !== void 0 && tt.length > 0) {
                    const Mt = new vy(lt);
                    xt = new O_(Mt),
                    xt.setCrossOrigin(this.crossOrigin);
                    for (let Lt = 0, Nt = tt.length; Lt < Nt; Lt++) {
                        const jt = tt[Lt]
                          , Wt = jt.url;
                        if (Array.isArray(Wt)) {
                            const Qt = [];
                            for (let qt = 0, Xt = Wt.length; qt < Xt; qt++) {
                                const Zt = Ct(Wt[qt]);
                                Zt !== null && (Zt instanceof HTMLImageElement ? Qt.push(Zt) : Qt.push(new Pm(Zt.data,Zt.width,Zt.height)))
                            }
                            ft[jt.uuid] = new ga(Qt)
                        } else {
                            const Qt = Ct(jt.url);
                            ft[jt.uuid] = new ga(Qt)
                        }
                    }
                }
                return ft
            }
            async parseImagesAsync(tt) {
                const lt = this
                  , mt = {};
                let ft;
                async function xt(Ct) {
                    if (typeof Ct == "string") {
                        const Mt = Ct
                          , Lt = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(Mt) ? Mt : lt.resourcePath + Mt;
                        return await ft.loadAsync(Lt)
                    }
                    return Ct.data ? {
                        data: vu(Ct.type, Ct.data),
                        width: Ct.width,
                        height: Ct.height,
                        complete: !0
                    } : null
                }
                if (tt !== void 0 && tt.length > 0) {
                    ft = new O_(this.manager),
                    ft.setCrossOrigin(this.crossOrigin);
                    for (let Ct = 0, Mt = tt.length; Ct < Mt; Ct++) {
                        const Lt = tt[Ct]
                          , Nt = Lt.url;
                        if (Array.isArray(Nt)) {
                            const jt = [];
                            for (let Wt = 0, Qt = Nt.length; Wt < Qt; Wt++) {
                                const qt = Nt[Wt]
                                  , Xt = await xt(qt);
                                Xt !== null && (Xt instanceof HTMLImageElement ? jt.push(Xt) : jt.push(new Pm(Xt.data,Xt.width,Xt.height)))
                            }
                            mt[Lt.uuid] = new ga(jt)
                        } else {
                            const jt = await xt(Lt.url);
                            mt[Lt.uuid] = new ga(jt)
                        }
                    }
                }
                return mt
            }
            parseTextures(tt, lt) {
                function mt(xt, Ct) {
                    return typeof xt == "number" ? xt : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", xt),
                    Ct[xt])
                }
                const ft = {};
                if (tt !== void 0)
                    for (let xt = 0, Ct = tt.length; xt < Ct; xt++) {
                        const Mt = tt[xt];
                        Mt.image === void 0 && console.warn('THREE.ObjectLoader: No "image" specified for', Mt.uuid),
                        lt[Mt.image] === void 0 && console.warn("THREE.ObjectLoader: Undefined image", Mt.image);
                        const Lt = lt[Mt.image]
                          , Nt = Lt ? Lt.data : void 0;
                        let jt;
                        Array.isArray(Nt) ? (jt = new f_,
                        Nt.length === 6 && (jt.needsUpdate = !0)) : (jt = Nt && Nt.data ? new Pm : new Ho,
                        Nt && Nt.complete && (jt.needsUpdate = !0)),
                        jt.source = Lt,
                        jt.uuid = Mt.uuid,
                        Mt.name !== void 0 && (jt.name = Mt.name),
                        Mt.mapping !== void 0 && (jt.mapping = mt(Mt.mapping, BS)),
                        Mt.channel !== void 0 && (jt.channel = Mt.channel),
                        Mt.offset !== void 0 && jt.offset.fromArray(Mt.offset),
                        Mt.repeat !== void 0 && jt.repeat.fromArray(Mt.repeat),
                        Mt.center !== void 0 && jt.center.fromArray(Mt.center),
                        Mt.rotation !== void 0 && (jt.rotation = Mt.rotation),
                        Mt.wrap !== void 0 && (jt.wrapS = mt(Mt.wrap[0], FA),
                        jt.wrapT = mt(Mt.wrap[1], FA)),
                        Mt.format !== void 0 && (jt.format = Mt.format),
                        Mt.internalFormat !== void 0 && (jt.internalFormat = Mt.internalFormat),
                        Mt.type !== void 0 && (jt.type = Mt.type),
                        Mt.colorSpace !== void 0 ? jt.colorSpace = Mt.colorSpace : Mt.encoding !== void 0 && (jt.encoding = Mt.encoding),
                        Mt.minFilter !== void 0 && (jt.minFilter = mt(Mt.minFilter, UA)),
                        Mt.magFilter !== void 0 && (jt.magFilter = mt(Mt.magFilter, UA)),
                        Mt.anisotropy !== void 0 && (jt.anisotropy = Mt.anisotropy),
                        Mt.flipY !== void 0 && (jt.flipY = Mt.flipY),
                        Mt.generateMipmaps !== void 0 && (jt.generateMipmaps = Mt.generateMipmaps),
                        Mt.premultiplyAlpha !== void 0 && (jt.premultiplyAlpha = Mt.premultiplyAlpha),
                        Mt.unpackAlignment !== void 0 && (jt.unpackAlignment = Mt.unpackAlignment),
                        Mt.compareFunction !== void 0 && (jt.compareFunction = Mt.compareFunction),
                        Mt.userData !== void 0 && (jt.userData = Mt.userData),
                        ft[Mt.uuid] = jt
                    }
                return ft
            }
            parseObject(tt, lt, mt, ft, xt) {
                let Ct;
                const Mt = tt.metadata && tt.metadata.version <= 4.5 ? Xo : void 0;
                function Lt(qt) {
                    return lt[qt] === void 0 && console.warn("THREE.ObjectLoader: Undefined geometry", qt),
                    lt[qt]
                }
                function Nt(qt) {
                    if (qt !== void 0) {
                        if (Array.isArray(qt)) {
                            const Xt = [];
                            for (let Zt = 0, Yt = qt.length; Zt < Yt; Zt++) {
                                const sr = qt[Zt];
                                mt[sr] === void 0 && console.warn("THREE.ObjectLoader: Undefined material", sr),
                                Xt.push(mt[sr])
                            }
                            return Xt
                        }
                        return mt[qt] === void 0 && console.warn("THREE.ObjectLoader: Undefined material", qt),
                        mt[qt]
                    }
                }
                function jt(qt) {
                    return ft[qt] === void 0 && console.warn("THREE.ObjectLoader: Undefined texture", qt),
                    ft[qt]
                }
                let Wt, Qt;
                switch (tt.type) {
                case "Scene":
                    Ct = new Ax,
                    tt.background !== void 0 && (Number.isInteger(tt.background) ? Ct.background = new Gn().setHex(tt.background, Mt) : Ct.background = jt(tt.background)),
                    tt.environment !== void 0 && (Ct.environment = jt(tt.environment)),
                    tt.fog !== void 0 && (tt.fog.type === "Fog" ? Ct.fog = new Mv(tt.fog.color,tt.fog.near,tt.fog.far) : tt.fog.type === "FogExp2" && (Ct.fog = new Pv(tt.fog.color,tt.fog.density)),
                    tt.fog.name !== "" && (Ct.fog.name = tt.fog.name)),
                    tt.backgroundBlurriness !== void 0 && (Ct.backgroundBlurriness = tt.backgroundBlurriness),
                    tt.backgroundIntensity !== void 0 && (Ct.backgroundIntensity = tt.backgroundIntensity);
                    break;
                case "PerspectiveCamera":
                    Ct = new Cs(tt.fov,tt.aspect,tt.near,tt.far),
                    tt.focus !== void 0 && (Ct.focus = tt.focus),
                    tt.zoom !== void 0 && (Ct.zoom = tt.zoom),
                    tt.filmGauge !== void 0 && (Ct.filmGauge = tt.filmGauge),
                    tt.filmOffset !== void 0 && (Ct.filmOffset = tt.filmOffset),
                    tt.view !== void 0 && (Ct.view = Object.assign({}, tt.view));
                    break;
                case "OrthographicCamera":
                    Ct = new Sv(tt.left,tt.right,tt.top,tt.bottom,tt.near,tt.far),
                    tt.zoom !== void 0 && (Ct.zoom = tt.zoom),
                    tt.view !== void 0 && (Ct.view = Object.assign({}, tt.view));
                    break;
                case "AmbientLight":
                    Ct = new kA(tt.color,tt.intensity);
                    break;
                case "DirectionalLight":
                    Ct = new IA(tt.color,tt.intensity);
                    break;
                case "PointLight":
                    Ct = new RA(tt.color,tt.intensity,tt.distance,tt.decay);
                    break;
                case "RectAreaLight":
                    Ct = new DA(tt.color,tt.intensity,tt.width,tt.height);
                    break;
                case "SpotLight":
                    Ct = new PA(tt.color,tt.intensity,tt.distance,tt.angle,tt.penumbra,tt.decay);
                    break;
                case "HemisphereLight":
                    Ct = new EA(tt.color,tt.groundColor,tt.intensity);
                    break;
                case "LightProbe":
                    Ct = new LA().fromJSON(tt);
                    break;
                case "SkinnedMesh":
                    Wt = Lt(tt.geometry),
                    Qt = Nt(tt.material),
                    Ct = new Bx(Wt,Qt),
                    tt.bindMode !== void 0 && (Ct.bindMode = tt.bindMode),
                    tt.bindMatrix !== void 0 && Ct.bindMatrix.fromArray(tt.bindMatrix),
                    tt.skeleton !== void 0 && (Ct.skeleton = tt.skeleton);
                    break;
                case "Mesh":
                    Wt = Lt(tt.geometry),
                    Qt = Nt(tt.material),
                    Ct = new gs(Wt,Qt);
                    break;
                case "InstancedMesh":
                    Wt = Lt(tt.geometry),
                    Qt = Nt(tt.material);
                    const qt = tt.count
                      , Xt = tt.instanceMatrix
                      , Zt = tt.instanceColor;
                    Ct = new Fx(Wt,Qt,qt),
                    Ct.instanceMatrix = new Mm(new Float32Array(Xt.array),16),
                    Zt !== void 0 && (Ct.instanceColor = new Mm(new Float32Array(Zt.array),Zt.itemSize));
                    break;
                case "LOD":
                    Ct = new Px;
                    break;
                case "Line":
                    Ct = new ep(Lt(tt.geometry),Nt(tt.material));
                    break;
                case "LineLoop":
                    Ct = new Hx(Lt(tt.geometry),Nt(tt.material));
                    break;
                case "LineSegments":
                    Ct = new iu(Lt(tt.geometry),Nt(tt.material));
                    break;
                case "PointCloud":
                case "Points":
                    Ct = new Wx(Lt(tt.geometry),Nt(tt.material));
                    break;
                case "Sprite":
                    Ct = new Tx(Nt(tt.material));
                    break;
                case "Group":
                    Ct = new Am;
                    break;
                case "Bone":
                    Ct = new K0;
                    break;
                default:
                    Ct = new Mo
                }
                if (Ct.uuid = tt.uuid,
                tt.name !== void 0 && (Ct.name = tt.name),
                tt.matrix !== void 0 ? (Ct.matrix.fromArray(tt.matrix),
                tt.matrixAutoUpdate !== void 0 && (Ct.matrixAutoUpdate = tt.matrixAutoUpdate),
                Ct.matrixAutoUpdate && Ct.matrix.decompose(Ct.position, Ct.quaternion, Ct.scale)) : (tt.position !== void 0 && Ct.position.fromArray(tt.position),
                tt.rotation !== void 0 && Ct.rotation.fromArray(tt.rotation),
                tt.quaternion !== void 0 && Ct.quaternion.fromArray(tt.quaternion),
                tt.scale !== void 0 && Ct.scale.fromArray(tt.scale)),
                tt.up !== void 0 && Ct.up.fromArray(tt.up),
                tt.castShadow !== void 0 && (Ct.castShadow = tt.castShadow),
                tt.receiveShadow !== void 0 && (Ct.receiveShadow = tt.receiveShadow),
                tt.shadow && (tt.shadow.bias !== void 0 && (Ct.shadow.bias = tt.shadow.bias),
                tt.shadow.normalBias !== void 0 && (Ct.shadow.normalBias = tt.shadow.normalBias),
                tt.shadow.radius !== void 0 && (Ct.shadow.radius = tt.shadow.radius),
                tt.shadow.mapSize !== void 0 && Ct.shadow.mapSize.fromArray(tt.shadow.mapSize),
                tt.shadow.camera !== void 0 && (Ct.shadow.camera = this.parseObject(tt.shadow.camera))),
                tt.visible !== void 0 && (Ct.visible = tt.visible),
                tt.frustumCulled !== void 0 && (Ct.frustumCulled = tt.frustumCulled),
                tt.renderOrder !== void 0 && (Ct.renderOrder = tt.renderOrder),
                tt.userData !== void 0 && (Ct.userData = tt.userData),
                tt.layers !== void 0 && (Ct.layers.mask = tt.layers),
                tt.children !== void 0) {
                    const qt = tt.children;
                    for (let Xt = 0; Xt < qt.length; Xt++)
                        Ct.add(this.parseObject(qt[Xt], lt, mt, ft, xt))
                }
                if (tt.animations !== void 0) {
                    const qt = tt.animations;
                    for (let Xt = 0; Xt < qt.length; Xt++) {
                        const Zt = qt[Xt];
                        Ct.animations.push(xt[Zt])
                    }
                }
                if (tt.type === "LOD") {
                    tt.autoUpdate !== void 0 && (Ct.autoUpdate = tt.autoUpdate);
                    const qt = tt.levels;
                    for (let Xt = 0; Xt < qt.length; Xt++) {
                        const Zt = qt[Xt]
                          , Yt = Ct.getObjectByProperty("uuid", Zt.object);
                        Yt !== void 0 && Ct.addLevel(Yt, Zt.distance, Zt.hysteresis)
                    }
                }
                return Ct
            }
            bindSkeletons(tt, lt) {
                Object.keys(lt).length !== 0 && tt.traverse(function(mt) {
                    if (mt.isSkinnedMesh === !0 && mt.skeleton !== void 0) {
                        const ft = lt[mt.skeleton];
                        ft === void 0 ? console.warn("THREE.ObjectLoader: No skeleton found with UUID:", mt.skeleton) : mt.bind(ft, mt.bindMatrix)
                    }
                })
            }
        }
        const BS = {
            UVMapping: jr,
            CubeReflectionMapping: Qr,
            CubeRefractionMapping: Or,
            EquirectangularReflectionMapping: qr,
            EquirectangularRefractionMapping: gn,
            CubeUVReflectionMapping: Mn
        }
          , FA = {
            RepeatWrapping: Tn,
            ClampToEdgeWrapping: wn,
            MirroredRepeatWrapping: Cn
        }
          , UA = {
            NearestFilter: fn,
            NearestMipmapNearestFilter: bn,
            NearestMipmapLinearFilter: En,
            LinearFilter: Rn,
            LinearMipmapNearestFilter: Yn,
            LinearMipmapLinearFilter: vo
        };
        class LS extends $s {
            constructor(tt) {
                super(tt),
                this.isImageBitmapLoader = !0,
                typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),
                typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."),
                this.options = {
                    premultiplyAlpha: "none"
                }
            }
            setOptions(tt) {
                return this.options = tt,
                this
            }
            load(tt, lt, mt, ft) {
                tt === void 0 && (tt = ""),
                this.path !== void 0 && (tt = this.path + tt),
                tt = this.manager.resolveURL(tt);
                const xt = this;
                Eu.get(tt, "blob").then(Ct => {
                    if (Ct !== void 0)
                        return xt.manager.itemStart(tt),
                        void createImageBitmap(Ct, Object.assign(xt.options, {
                            colorSpaceConversion: "none"
                        })).then(function(Lt) {
                            lt && lt(Lt),
                            xt.manager.itemEnd(tt)
                        }).catch(function(Lt) {
                            ft && ft(Lt),
                            xt.manager.itemError(tt),
                            xt.manager.itemEnd(tt)
                        });
                    const Mt = {};
                    Mt.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include",
                    Mt.headers = this.requestHeader,
                    fetch(tt, Mt).then(function(Lt) {
                        return Lt.blob()
                    }).then(function(Lt) {
                        return Eu.add(tt, Lt, "blob"),
                        createImageBitmap(Lt, Object.assign(xt.options, {
                            colorSpaceConversion: "none"
                        }))
                    }).then(function(Lt) {
                        lt && lt(Lt),
                        xt.manager.itemEnd(tt)
                    }).catch(function(Lt) {
                        ft && ft(Lt),
                        xt.manager.itemError(tt),
                        xt.manager.itemEnd(tt)
                    }),
                    xt.manager.itemStart(tt)
                }
                )
            }
        }
        let c0;
        class wy {
            static getContext() {
                return c0 === void 0 && (c0 = new (window.AudioContext || window.webkitAudioContext)),
                c0
            }
            static setContext(tt) {
                c0 = tt
            }
        }
        class OS extends $s {
            constructor(tt) {
                super(tt)
            }
            load(tt, lt, mt, ft) {
                const xt = this
                  , Ct = new su(this.manager);
                function Mt(Lt) {
                    ft ? ft(Lt) : console.error(Lt),
                    xt.manager.itemError(tt)
                }
                Ct.setResponseType("arraybuffer"),
                Ct.setPath(this.path),
                Ct.setRequestHeader(this.requestHeader),
                Ct.setWithCredentials(this.withCredentials),
                Ct.load(tt, function(Lt) {
                    try {
                        const Nt = Lt.slice(0);
                        wy.getContext().decodeAudioData(Nt, function(jt) {
                            lt(jt)
                        }, Mt)
                    } catch (Nt) {
                        Mt(Nt)
                    }
                }, mt, ft)
            }
        }
        const jA = new no
          , VA = new no
          , Dp = new no;
        class NS {
            constructor() {
                this.type = "StereoCamera",
                this.aspect = 1,
                this.eyeSep = .064,
                this.cameraL = new Cs,
                this.cameraL.layers.enable(1),
                this.cameraL.matrixAutoUpdate = !1,
                this.cameraR = new Cs,
                this.cameraR.layers.enable(2),
                this.cameraR.matrixAutoUpdate = !1,
                this._cache = {
                    focus: null,
                    fov: null,
                    aspect: null,
                    near: null,
                    far: null,
                    zoom: null,
                    eyeSep: null
                }
            }
            update(tt) {
                const lt = this._cache;
                if (lt.focus !== tt.focus || lt.fov !== tt.fov || lt.aspect !== tt.aspect * this.aspect || lt.near !== tt.near || lt.far !== tt.far || lt.zoom !== tt.zoom || lt.eyeSep !== this.eyeSep) {
                    lt.focus = tt.focus,
                    lt.fov = tt.fov,
                    lt.aspect = tt.aspect * this.aspect,
                    lt.near = tt.near,
                    lt.far = tt.far,
                    lt.zoom = tt.zoom,
                    lt.eyeSep = this.eyeSep,
                    Dp.copy(tt.projectionMatrix);
                    const mt = lt.eyeSep / 2
                      , ft = mt * lt.near / lt.focus
                      , xt = lt.near * Math.tan(Zl * lt.fov * .5) / lt.zoom;
                    let Ct, Mt;
                    VA.elements[12] = -mt,
                    jA.elements[12] = mt,
                    Ct = -xt * lt.aspect + ft,
                    Mt = xt * lt.aspect + ft,
                    Dp.elements[0] = 2 * lt.near / (Mt - Ct),
                    Dp.elements[8] = (Mt + Ct) / (Mt - Ct),
                    this.cameraL.projectionMatrix.copy(Dp),
                    Ct = -xt * lt.aspect - ft,
                    Mt = xt * lt.aspect - ft,
                    Dp.elements[0] = 2 * lt.near / (Mt - Ct),
                    Dp.elements[8] = (Mt + Ct) / (Mt - Ct),
                    this.cameraR.projectionMatrix.copy(Dp)
                }
                this.cameraL.matrixWorld.copy(tt.matrixWorld).multiply(VA),
                this.cameraR.matrixWorld.copy(tt.matrixWorld).multiply(jA)
            }
        }
        class GA {
            constructor(tt=!0) {
                this.autoStart = tt,
                this.startTime = 0,
                this.oldTime = 0,
                this.elapsedTime = 0,
                this.running = !1
            }
            start() {
                this.startTime = zA(),
                this.oldTime = this.startTime,
                this.elapsedTime = 0,
                this.running = !0
            }
            stop() {
                this.getElapsedTime(),
                this.running = !1,
                this.autoStart = !1
            }
            getElapsedTime() {
                return this.getDelta(),
                this.elapsedTime
            }
            getDelta() {
                let tt = 0;
                if (this.autoStart && !this.running)
                    return this.start(),
                    0;
                if (this.running) {
                    const lt = zA();
                    tt = (lt - this.oldTime) / 1e3,
                    this.oldTime = lt,
                    this.elapsedTime += tt
                }
                return tt
            }
        }
        function zA() {
            return (typeof performance > "u" ? Date : performance).now()
        }
        const Bp = new Er
          , HA = new Is
          , FS = new Er
          , Lp = new Er;
        class US extends Mo {
            constructor() {
                super(),
                this.type = "AudioListener",
                this.context = wy.getContext(),
                this.gain = this.context.createGain(),
                this.gain.connect(this.context.destination),
                this.filter = null,
                this.timeDelta = 0,
                this._clock = new GA
            }
            getInput() {
                return this.gain
            }
            removeFilter() {
                return this.filter !== null && (this.gain.disconnect(this.filter),
                this.filter.disconnect(this.context.destination),
                this.gain.connect(this.context.destination),
                this.filter = null),
                this
            }
            getFilter() {
                return this.filter
            }
            setFilter(tt) {
                return this.filter !== null ? (this.gain.disconnect(this.filter),
                this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination),
                this.filter = tt,
                this.gain.connect(this.filter),
                this.filter.connect(this.context.destination),
                this
            }
            getMasterVolume() {
                return this.gain.gain.value
            }
            setMasterVolume(tt) {
                return this.gain.gain.setTargetAtTime(tt, this.context.currentTime, .01),
                this
            }
            updateMatrixWorld(tt) {
                super.updateMatrixWorld(tt);
                const lt = this.context.listener
                  , mt = this.up;
                if (this.timeDelta = this._clock.getDelta(),
                this.matrixWorld.decompose(Bp, HA, FS),
                Lp.set(0, 0, -1).applyQuaternion(HA),
                lt.positionX) {
                    const ft = this.context.currentTime + this.timeDelta;
                    lt.positionX.linearRampToValueAtTime(Bp.x, ft),
                    lt.positionY.linearRampToValueAtTime(Bp.y, ft),
                    lt.positionZ.linearRampToValueAtTime(Bp.z, ft),
                    lt.forwardX.linearRampToValueAtTime(Lp.x, ft),
                    lt.forwardY.linearRampToValueAtTime(Lp.y, ft),
                    lt.forwardZ.linearRampToValueAtTime(Lp.z, ft),
                    lt.upX.linearRampToValueAtTime(mt.x, ft),
                    lt.upY.linearRampToValueAtTime(mt.y, ft),
                    lt.upZ.linearRampToValueAtTime(mt.z, ft)
                } else
                    lt.setPosition(Bp.x, Bp.y, Bp.z),
                    lt.setOrientation(Lp.x, Lp.y, Lp.z, mt.x, mt.y, mt.z)
            }
        }
        class QA extends Mo {
            constructor(tt) {
                super(),
                this.type = "Audio",
                this.listener = tt,
                this.context = tt.context,
                this.gain = this.context.createGain(),
                this.gain.connect(tt.getInput()),
                this.autoplay = !1,
                this.buffer = null,
                this.detune = 0,
                this.loop = !1,
                this.loopStart = 0,
                this.loopEnd = 0,
                this.offset = 0,
                this.duration = void 0,
                this.playbackRate = 1,
                this.isPlaying = !1,
                this.hasPlaybackControl = !0,
                this.source = null,
                this.sourceType = "empty",
                this._startedAt = 0,
                this._progress = 0,
                this._connected = !1,
                this.filters = []
            }
            getOutput() {
                return this.gain
            }
            setNodeSource(tt) {
                return this.hasPlaybackControl = !1,
                this.sourceType = "audioNode",
                this.source = tt,
                this.connect(),
                this
            }
            setMediaElementSource(tt) {
                return this.hasPlaybackControl = !1,
                this.sourceType = "mediaNode",
                this.source = this.context.createMediaElementSource(tt),
                this.connect(),
                this
            }
            setMediaStreamSource(tt) {
                return this.hasPlaybackControl = !1,
                this.sourceType = "mediaStreamNode",
                this.source = this.context.createMediaStreamSource(tt),
                this.connect(),
                this
            }
            setBuffer(tt) {
                return this.buffer = tt,
                this.sourceType = "buffer",
                this.autoplay && this.play(),
                this
            }
            play(tt=0) {
                if (this.isPlaying === !0)
                    return void console.warn("THREE.Audio: Audio is already playing.");
                if (this.hasPlaybackControl === !1)
                    return void console.warn("THREE.Audio: this Audio has no playback control.");
                this._startedAt = this.context.currentTime + tt;
                const lt = this.context.createBufferSource();
                return lt.buffer = this.buffer,
                lt.loop = this.loop,
                lt.loopStart = this.loopStart,
                lt.loopEnd = this.loopEnd,
                lt.onended = this.onEnded.bind(this),
                lt.start(this._startedAt, this._progress + this.offset, this.duration),
                this.isPlaying = !0,
                this.source = lt,
                this.setDetune(this.detune),
                this.setPlaybackRate(this.playbackRate),
                this.connect()
            }
            pause() {
                if (this.hasPlaybackControl !== !1)
                    return this.isPlaying === !0 && (this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate,
                    this.loop === !0 && (this._progress = this._progress % (this.duration || this.buffer.duration)),
                    this.source.stop(),
                    this.source.onended = null,
                    this.isPlaying = !1),
                    this;
                console.warn("THREE.Audio: this Audio has no playback control.")
            }
            stop() {
                if (this.hasPlaybackControl !== !1)
                    return this._progress = 0,
                    this.source !== null && (this.source.stop(),
                    this.source.onended = null),
                    this.isPlaying = !1,
                    this;
                console.warn("THREE.Audio: this Audio has no playback control.")
            }
            connect() {
                if (this.filters.length > 0) {
                    this.source.connect(this.filters[0]);
                    for (let tt = 1, lt = this.filters.length; tt < lt; tt++)
                        this.filters[tt - 1].connect(this.filters[tt]);
                    this.filters[this.filters.length - 1].connect(this.getOutput())
                } else
                    this.source.connect(this.getOutput());
                return this._connected = !0,
                this
            }
            disconnect() {
                if (this._connected !== !1) {
                    if (this.filters.length > 0) {
                        this.source.disconnect(this.filters[0]);
                        for (let tt = 1, lt = this.filters.length; tt < lt; tt++)
                            this.filters[tt - 1].disconnect(this.filters[tt]);
                        this.filters[this.filters.length - 1].disconnect(this.getOutput())
                    } else
                        this.source.disconnect(this.getOutput());
                    return this._connected = !1,
                    this
                }
            }
            getFilters() {
                return this.filters
            }
            setFilters(tt) {
                return tt || (tt = []),
                this._connected === !0 ? (this.disconnect(),
                this.filters = tt.slice(),
                this.connect()) : this.filters = tt.slice(),
                this
            }
            setDetune(tt) {
                if (this.detune = tt,
                this.source.detune !== void 0)
                    return this.isPlaying === !0 && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01),
                    this
            }
            getDetune() {
                return this.detune
            }
            getFilter() {
                return this.getFilters()[0]
            }
            setFilter(tt) {
                return this.setFilters(tt ? [tt] : [])
            }
            setPlaybackRate(tt) {
                if (this.hasPlaybackControl !== !1)
                    return this.playbackRate = tt,
                    this.isPlaying === !0 && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01),
                    this;
                console.warn("THREE.Audio: this Audio has no playback control.")
            }
            getPlaybackRate() {
                return this.playbackRate
            }
            onEnded() {
                this.isPlaying = !1
            }
            getLoop() {
                return this.hasPlaybackControl === !1 ? (console.warn("THREE.Audio: this Audio has no playback control."),
                !1) : this.loop
            }
            setLoop(tt) {
                if (this.hasPlaybackControl !== !1)
                    return this.loop = tt,
                    this.isPlaying === !0 && (this.source.loop = this.loop),
                    this;
                console.warn("THREE.Audio: this Audio has no playback control.")
            }
            setLoopStart(tt) {
                return this.loopStart = tt,
                this
            }
            setLoopEnd(tt) {
                return this.loopEnd = tt,
                this
            }
            getVolume() {
                return this.gain.gain.value
            }
            setVolume(tt) {
                return this.gain.gain.setTargetAtTime(tt, this.context.currentTime, .01),
                this
            }
        }
        const Op = new Er
          , WA = new Is
          , jS = new Er
          , Np = new Er;
        class VS extends QA {
            constructor(tt) {
                super(tt),
                this.panner = this.context.createPanner(),
                this.panner.panningModel = "HRTF",
                this.panner.connect(this.gain)
            }
            connect() {
                super.connect(),
                this.panner.connect(this.gain)
            }
            disconnect() {
                super.disconnect(),
                this.panner.disconnect(this.gain)
            }
            getOutput() {
                return this.panner
            }
            getRefDistance() {
                return this.panner.refDistance
            }
            setRefDistance(tt) {
                return this.panner.refDistance = tt,
                this
            }
            getRolloffFactor() {
                return this.panner.rolloffFactor
            }
            setRolloffFactor(tt) {
                return this.panner.rolloffFactor = tt,
                this
            }
            getDistanceModel() {
                return this.panner.distanceModel
            }
            setDistanceModel(tt) {
                return this.panner.distanceModel = tt,
                this
            }
            getMaxDistance() {
                return this.panner.maxDistance
            }
            setMaxDistance(tt) {
                return this.panner.maxDistance = tt,
                this
            }
            setDirectionalCone(tt, lt, mt) {
                return this.panner.coneInnerAngle = tt,
                this.panner.coneOuterAngle = lt,
                this.panner.coneOuterGain = mt,
                this
            }
            updateMatrixWorld(tt) {
                if (super.updateMatrixWorld(tt),
                this.hasPlaybackControl === !0 && this.isPlaying === !1)
                    return;
                this.matrixWorld.decompose(Op, WA, jS),
                Np.set(0, 0, 1).applyQuaternion(WA);
                const lt = this.panner;
                if (lt.positionX) {
                    const mt = this.context.currentTime + this.listener.timeDelta;
                    lt.positionX.linearRampToValueAtTime(Op.x, mt),
                    lt.positionY.linearRampToValueAtTime(Op.y, mt),
                    lt.positionZ.linearRampToValueAtTime(Op.z, mt),
                    lt.orientationX.linearRampToValueAtTime(Np.x, mt),
                    lt.orientationY.linearRampToValueAtTime(Np.y, mt),
                    lt.orientationZ.linearRampToValueAtTime(Np.z, mt)
                } else
                    lt.setPosition(Op.x, Op.y, Op.z),
                    lt.setOrientation(Np.x, Np.y, Np.z)
            }
        }
        class GS {
            constructor(tt, lt=2048) {
                this.analyser = tt.context.createAnalyser(),
                this.analyser.fftSize = lt,
                this.data = new Uint8Array(this.analyser.frequencyBinCount),
                tt.getOutput().connect(this.analyser)
            }
            getFrequencyData() {
                return this.analyser.getByteFrequencyData(this.data),
                this.data
            }
            getAverageFrequency() {
                let tt = 0;
                const lt = this.getFrequencyData();
                for (let mt = 0; mt < lt.length; mt++)
                    tt += lt[mt];
                return tt / lt.length
            }
        }
        class qA {
            constructor(tt, lt, mt) {
                let ft, xt, Ct;
                switch (this.binding = tt,
                this.valueSize = mt,
                lt) {
                case "quaternion":
                    ft = this._slerp,
                    xt = this._slerpAdditive,
                    Ct = this._setAdditiveIdentityQuaternion,
                    this.buffer = new Float64Array(6 * mt),
                    this._workIndex = 5;
                    break;
                case "string":
                case "bool":
                    ft = this._select,
                    xt = this._select,
                    Ct = this._setAdditiveIdentityOther,
                    this.buffer = new Array(5 * mt);
                    break;
                default:
                    ft = this._lerp,
                    xt = this._lerpAdditive,
                    Ct = this._setAdditiveIdentityNumeric,
                    this.buffer = new Float64Array(5 * mt)
                }
                this._mixBufferRegion = ft,
                this._mixBufferRegionAdditive = xt,
                this._setIdentity = Ct,
                this._origIndex = 3,
                this._addIndex = 4,
                this.cumulativeWeight = 0,
                this.cumulativeWeightAdditive = 0,
                this.useCount = 0,
                this.referenceCount = 0
            }
            accumulate(tt, lt) {
                const mt = this.buffer
                  , ft = this.valueSize
                  , xt = tt * ft + ft;
                let Ct = this.cumulativeWeight;
                if (Ct === 0) {
                    for (let Mt = 0; Mt !== ft; ++Mt)
                        mt[xt + Mt] = mt[Mt];
                    Ct = lt
                } else {
                    Ct += lt;
                    const Mt = lt / Ct;
                    this._mixBufferRegion(mt, xt, 0, Mt, ft)
                }
                this.cumulativeWeight = Ct
            }
            accumulateAdditive(tt) {
                const lt = this.buffer
                  , mt = this.valueSize
                  , ft = mt * this._addIndex;
                this.cumulativeWeightAdditive === 0 && this._setIdentity(),
                this._mixBufferRegionAdditive(lt, ft, 0, tt, mt),
                this.cumulativeWeightAdditive += tt
            }
            apply(tt) {
                const lt = this.valueSize
                  , mt = this.buffer
                  , ft = tt * lt + lt
                  , xt = this.cumulativeWeight
                  , Ct = this.cumulativeWeightAdditive
                  , Mt = this.binding;
                if (this.cumulativeWeight = 0,
                this.cumulativeWeightAdditive = 0,
                xt < 1) {
                    const Lt = lt * this._origIndex;
                    this._mixBufferRegion(mt, ft, Lt, 1 - xt, lt)
                }
                Ct > 0 && this._mixBufferRegionAdditive(mt, ft, this._addIndex * lt, 1, lt);
                for (let Lt = lt, Nt = lt + lt; Lt !== Nt; ++Lt)
                    if (mt[Lt] !== mt[Lt + lt]) {
                        Mt.setValue(mt, ft);
                        break
                    }
            }
            saveOriginalState() {
                const tt = this.binding
                  , lt = this.buffer
                  , mt = this.valueSize
                  , ft = mt * this._origIndex;
                tt.getValue(lt, ft);
                for (let xt = mt, Ct = ft; xt !== Ct; ++xt)
                    lt[xt] = lt[ft + xt % mt];
                this._setIdentity(),
                this.cumulativeWeight = 0,
                this.cumulativeWeightAdditive = 0
            }
            restoreOriginalState() {
                const tt = 3 * this.valueSize;
                this.binding.setValue(this.buffer, tt)
            }
            _setAdditiveIdentityNumeric() {
                const tt = this._addIndex * this.valueSize
                  , lt = tt + this.valueSize;
                for (let mt = tt; mt < lt; mt++)
                    this.buffer[mt] = 0
            }
            _setAdditiveIdentityQuaternion() {
                this._setAdditiveIdentityNumeric(),
                this.buffer[this._addIndex * this.valueSize + 3] = 1
            }
            _setAdditiveIdentityOther() {
                const tt = this._origIndex * this.valueSize
                  , lt = this._addIndex * this.valueSize;
                for (let mt = 0; mt < this.valueSize; mt++)
                    this.buffer[lt + mt] = this.buffer[tt + mt]
            }
            _select(tt, lt, mt, ft, xt) {
                if (ft >= .5)
                    for (let Ct = 0; Ct !== xt; ++Ct)
                        tt[lt + Ct] = tt[mt + Ct]
            }
            _slerp(tt, lt, mt, ft) {
                Is.slerpFlat(tt, lt, tt, lt, tt, mt, ft)
            }
            _slerpAdditive(tt, lt, mt, ft, xt) {
                const Ct = this._workIndex * xt;
                Is.multiplyQuaternionsFlat(tt, Ct, tt, lt, tt, mt),
                Is.slerpFlat(tt, lt, tt, lt, tt, Ct, ft)
            }
            _lerp(tt, lt, mt, ft, xt) {
                const Ct = 1 - ft;
                for (let Mt = 0; Mt !== xt; ++Mt) {
                    const Lt = lt + Mt;
                    tt[Lt] = tt[Lt] * Ct + tt[mt + Mt] * ft
                }
            }
            _lerpAdditive(tt, lt, mt, ft, xt) {
                for (let Ct = 0; Ct !== xt; ++Ct) {
                    const Mt = lt + Ct;
                    tt[Mt] = tt[Mt] + tt[mt + Ct] * ft
                }
            }
        }
        const Sy = "\\[\\]\\.:\\/"
          , zS = new RegExp("[" + Sy + "]","g")
          , Ey = "[^" + Sy + "]"
          , HS = "[^" + Sy.replace("\\.", "") + "]"
          , QS = new RegExp("^" + /((?:WC+[\/:])*)/.source.replace("WC", Ey) + /(WCOD+)?/.source.replace("WCOD", HS) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Ey) + /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Ey) + "$")
          , WS = ["material", "materials", "bones", "map"];
        class Ro {
            constructor(tt, lt, mt) {
                this.path = lt,
                this.parsedPath = mt || Ro.parseTrackName(lt),
                this.node = Ro.findNode(tt, this.parsedPath.nodeName),
                this.rootNode = tt,
                this.getValue = this._getValue_unbound,
                this.setValue = this._setValue_unbound
            }
            static create(tt, lt, mt) {
                return tt && tt.isAnimationObjectGroup ? new Ro.Composite(tt,lt,mt) : new Ro(tt,lt,mt)
            }
            static sanitizeNodeName(tt) {
                return tt.replace(/\s/g, "_").replace(zS, "")
            }
            static parseTrackName(tt) {
                const lt = QS.exec(tt);
                if (lt === null)
                    throw new Error("PropertyBinding: Cannot parse trackName: " + tt);
                const mt = {
                    nodeName: lt[2],
                    objectName: lt[3],
                    objectIndex: lt[4],
                    propertyName: lt[5],
                    propertyIndex: lt[6]
                }
                  , ft = mt.nodeName && mt.nodeName.lastIndexOf(".");
                if (ft !== void 0 && ft !== -1) {
                    const xt = mt.nodeName.substring(ft + 1);
                    WS.indexOf(xt) !== -1 && (mt.nodeName = mt.nodeName.substring(0, ft),
                    mt.objectName = xt)
                }
                if (mt.propertyName === null || mt.propertyName.length === 0)
                    throw new Error("PropertyBinding: can not parse propertyName from trackName: " + tt);
                return mt
            }
            static findNode(tt, lt) {
                if (lt === void 0 || lt === "" || lt === "." || lt === -1 || lt === tt.name || lt === tt.uuid)
                    return tt;
                if (tt.skeleton) {
                    const mt = tt.skeleton.getBoneByName(lt);
                    if (mt !== void 0)
                        return mt
                }
                if (tt.children) {
                    const mt = function(xt) {
                        for (let Ct = 0; Ct < xt.length; Ct++) {
                            const Mt = xt[Ct];
                            if (Mt.name === lt || Mt.uuid === lt)
                                return Mt;
                            const Lt = mt(Mt.children);
                            if (Lt)
                                return Lt
                        }
                        return null
                    }
                      , ft = mt(tt.children);
                    if (ft)
                        return ft
                }
                return null
            }
            _getValue_unavailable() {}
            _setValue_unavailable() {}
            _getValue_direct(tt, lt) {
                tt[lt] = this.targetObject[this.propertyName]
            }
            _getValue_array(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    tt[lt++] = mt[ft]
            }
            _getValue_arrayElement(tt, lt) {
                tt[lt] = this.resolvedProperty[this.propertyIndex]
            }
            _getValue_toArray(tt, lt) {
                this.resolvedProperty.toArray(tt, lt)
            }
            _setValue_direct(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt]
            }
            _setValue_direct_setNeedsUpdate(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt],
                this.targetObject.needsUpdate = !0
            }
            _setValue_direct_setMatrixWorldNeedsUpdate(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt],
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_array(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++]
            }
            _setValue_array_setNeedsUpdate(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++];
                this.targetObject.needsUpdate = !0
            }
            _setValue_array_setMatrixWorldNeedsUpdate(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_arrayElement(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt]
            }
            _setValue_arrayElement_setNeedsUpdate(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt],
                this.targetObject.needsUpdate = !0
            }
            _setValue_arrayElement_setMatrixWorldNeedsUpdate(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt],
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_fromArray(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt)
            }
            _setValue_fromArray_setNeedsUpdate(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt),
                this.targetObject.needsUpdate = !0
            }
            _setValue_fromArray_setMatrixWorldNeedsUpdate(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt),
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _getValue_unbound(tt, lt) {
                this.bind(),
                this.getValue(tt, lt)
            }
            _setValue_unbound(tt, lt) {
                this.bind(),
                this.setValue(tt, lt)
            }
            bind() {
                let tt = this.node;
                const lt = this.parsedPath
                  , mt = lt.objectName
                  , ft = lt.propertyName;
                let xt = lt.propertyIndex;
                if (tt || (tt = Ro.findNode(this.rootNode, lt.nodeName),
                this.node = tt),
                this.getValue = this._getValue_unavailable,
                this.setValue = this._setValue_unavailable,
                !tt)
                    return void console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
                if (mt) {
                    let Nt = lt.objectIndex;
                    switch (mt) {
                    case "materials":
                        if (!tt.material)
                            return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!tt.material.materials)
                            return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                        tt = tt.material.materials;
                        break;
                    case "bones":
                        if (!tt.skeleton)
                            return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                        tt = tt.skeleton.bones;
                        for (let jt = 0; jt < tt.length; jt++)
                            if (tt[jt].name === Nt) {
                                Nt = jt;
                                break
                            }
                        break;
                    case "map":
                        if ("map"in tt) {
                            tt = tt.map;
                            break
                        }
                        if (!tt.material)
                            return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!tt.material.map)
                            return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
                        tt = tt.material.map;
                        break;
                    default:
                        if (tt[mt] === void 0)
                            return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                        tt = tt[mt]
                    }
                    if (Nt !== void 0) {
                        if (tt[Nt] === void 0)
                            return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, tt);
                        tt = tt[Nt]
                    }
                }
                const Ct = tt[ft];
                if (Ct === void 0) {
                    const Nt = lt.nodeName;
                    return void console.error("THREE.PropertyBinding: Trying to update property for track: " + Nt + "." + ft + " but it wasn't found.", tt)
                }
                let Mt = this.Versioning.None;
                this.targetObject = tt,
                tt.needsUpdate !== void 0 ? Mt = this.Versioning.NeedsUpdate : tt.matrixWorldNeedsUpdate !== void 0 && (Mt = this.Versioning.MatrixWorldNeedsUpdate);
                let Lt = this.BindingType.Direct;
                if (xt !== void 0) {
                    if (ft === "morphTargetInfluences") {
                        if (!tt.geometry)
                            return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                        if (!tt.geometry.morphAttributes)
                            return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                        tt.morphTargetDictionary[xt] !== void 0 && (xt = tt.morphTargetDictionary[xt])
                    }
                    Lt = this.BindingType.ArrayElement,
                    this.resolvedProperty = Ct,
                    this.propertyIndex = xt
                } else
                    Ct.fromArray !== void 0 && Ct.toArray !== void 0 ? (Lt = this.BindingType.HasFromToArray,
                    this.resolvedProperty = Ct) : Array.isArray(Ct) ? (Lt = this.BindingType.EntireArray,
                    this.resolvedProperty = Ct) : this.propertyName = ft;
                this.getValue = this.GetterByBindingType[Lt],
                this.setValue = this.SetterByBindingTypeAndVersioning[Lt][Mt]
            }
            unbind() {
                this.node = null,
                this.getValue = this._getValue_unbound,
                this.setValue = this._setValue_unbound
            }
        }
        Ro.Composite = class {
            constructor(Tt, tt, lt) {
                const mt = lt || Ro.parseTrackName(tt);
                this._targetGroup = Tt,
                this._bindings = Tt.subscribe_(tt, mt)
            }
            getValue(Tt, tt) {
                this.bind();
                const lt = this._targetGroup.nCachedObjects_
                  , mt = this._bindings[lt];
                mt !== void 0 && mt.getValue(Tt, tt)
            }
            setValue(Tt, tt) {
                const lt = this._bindings;
                for (let mt = this._targetGroup.nCachedObjects_, ft = lt.length; mt !== ft; ++mt)
                    lt[mt].setValue(Tt, tt)
            }
            bind() {
                const Tt = this._bindings;
                for (let tt = this._targetGroup.nCachedObjects_, lt = Tt.length; tt !== lt; ++tt)
                    Tt[tt].bind()
            }
            unbind() {
                const Tt = this._bindings;
                for (let tt = this._targetGroup.nCachedObjects_, lt = Tt.length; tt !== lt; ++tt)
                    Tt[tt].unbind()
            }
        }
        ,
        Ro.prototype.BindingType = {
            Direct: 0,
            EntireArray: 1,
            ArrayElement: 2,
            HasFromToArray: 3
        },
        Ro.prototype.Versioning = {
            None: 0,
            NeedsUpdate: 1,
            MatrixWorldNeedsUpdate: 2
        },
        Ro.prototype.GetterByBindingType = [Ro.prototype._getValue_direct, Ro.prototype._getValue_array, Ro.prototype._getValue_arrayElement, Ro.prototype._getValue_toArray],
        Ro.prototype.SetterByBindingTypeAndVersioning = [[Ro.prototype._setValue_direct, Ro.prototype._setValue_direct_setNeedsUpdate, Ro.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_array, Ro.prototype._setValue_array_setNeedsUpdate, Ro.prototype._setValue_array_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_arrayElement, Ro.prototype._setValue_arrayElement_setNeedsUpdate, Ro.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_fromArray, Ro.prototype._setValue_fromArray_setNeedsUpdate, Ro.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
        class qS {
            constructor() {
                this.isAnimationObjectGroup = !0,
                this.uuid = Ms(),
                this._objects = Array.prototype.slice.call(arguments),
                this.nCachedObjects_ = 0;
                const tt = {};
                this._indicesByUUID = tt;
                for (let mt = 0, ft = arguments.length; mt !== ft; ++mt)
                    tt[arguments[mt].uuid] = mt;
                this._paths = [],
                this._parsedPaths = [],
                this._bindings = [],
                this._bindingsIndicesByPath = {};
                const lt = this;
                this.stats = {
                    objects: {
                        get total() {
                            return lt._objects.length
                        },
                        get inUse() {
                            return this.total - lt.nCachedObjects_
                        }
                    },
                    get bindingsPerObject() {
                        return lt._bindings.length
                    }
                }
            }
            add() {
                const tt = this._objects
                  , lt = this._indicesByUUID
                  , mt = this._paths
                  , ft = this._parsedPaths
                  , xt = this._bindings
                  , Ct = xt.length;
                let Mt, Lt = tt.length, Nt = this.nCachedObjects_;
                for (let jt = 0, Wt = arguments.length; jt !== Wt; ++jt) {
                    const Qt = arguments[jt]
                      , qt = Qt.uuid;
                    let Xt = lt[qt];
                    if (Xt === void 0) {
                        Xt = Lt++,
                        lt[qt] = Xt,
                        tt.push(Qt);
                        for (let Zt = 0, Yt = Ct; Zt !== Yt; ++Zt)
                            xt[Zt].push(new Ro(Qt,mt[Zt],ft[Zt]))
                    } else if (Xt < Nt) {
                        Mt = tt[Xt];
                        const Zt = --Nt
                          , Yt = tt[Zt];
                        lt[Yt.uuid] = Xt,
                        tt[Xt] = Yt,
                        lt[qt] = Zt,
                        tt[Zt] = Qt;
                        for (let sr = 0, er = Ct; sr !== er; ++sr) {
                            const rr = xt[sr]
                              , xr = rr[Zt];
                            let br = rr[Xt];
                            rr[Xt] = xr,
                            br === void 0 && (br = new Ro(Qt,mt[sr],ft[sr])),
                            rr[Zt] = br
                        }
                    } else
                        tt[Xt] !== Mt && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
                }
                this.nCachedObjects_ = Nt
            }
            remove() {
                const tt = this._objects
                  , lt = this._indicesByUUID
                  , mt = this._bindings
                  , ft = mt.length;
                let xt = this.nCachedObjects_;
                for (let Ct = 0, Mt = arguments.length; Ct !== Mt; ++Ct) {
                    const Lt = arguments[Ct]
                      , Nt = Lt.uuid
                      , jt = lt[Nt];
                    if (jt !== void 0 && jt >= xt) {
                        const Wt = xt++
                          , Qt = tt[Wt];
                        lt[Qt.uuid] = jt,
                        tt[jt] = Qt,
                        lt[Nt] = Wt,
                        tt[Wt] = Lt;
                        for (let qt = 0, Xt = ft; qt !== Xt; ++qt) {
                            const Zt = mt[qt]
                              , Yt = Zt[Wt]
                              , sr = Zt[jt];
                            Zt[jt] = Yt,
                            Zt[Wt] = sr
                        }
                    }
                }
                this.nCachedObjects_ = xt
            }
            uncache() {
                const tt = this._objects
                  , lt = this._indicesByUUID
                  , mt = this._bindings
                  , ft = mt.length;
                let xt = this.nCachedObjects_
                  , Ct = tt.length;
                for (let Mt = 0, Lt = arguments.length; Mt !== Lt; ++Mt) {
                    const Nt = arguments[Mt].uuid
                      , jt = lt[Nt];
                    if (jt !== void 0)
                        if (delete lt[Nt],
                        jt < xt) {
                            const Wt = --xt
                              , Qt = tt[Wt]
                              , qt = --Ct
                              , Xt = tt[qt];
                            lt[Qt.uuid] = jt,
                            tt[jt] = Qt,
                            lt[Xt.uuid] = Wt,
                            tt[Wt] = Xt,
                            tt.pop();
                            for (let Zt = 0, Yt = ft; Zt !== Yt; ++Zt) {
                                const sr = mt[Zt]
                                  , er = sr[Wt]
                                  , rr = sr[qt];
                                sr[jt] = er,
                                sr[Wt] = rr,
                                sr.pop()
                            }
                        } else {
                            const Wt = --Ct
                              , Qt = tt[Wt];
                            Wt > 0 && (lt[Qt.uuid] = jt),
                            tt[jt] = Qt,
                            tt.pop();
                            for (let qt = 0, Xt = ft; qt !== Xt; ++qt) {
                                const Zt = mt[qt];
                                Zt[jt] = Zt[Wt],
                                Zt.pop()
                            }
                        }
                }
                this.nCachedObjects_ = xt
            }
            subscribe_(tt, lt) {
                const mt = this._bindingsIndicesByPath;
                let ft = mt[tt];
                const xt = this._bindings;
                if (ft !== void 0)
                    return xt[ft];
                const Ct = this._paths
                  , Mt = this._parsedPaths
                  , Lt = this._objects
                  , Nt = Lt.length
                  , jt = this.nCachedObjects_
                  , Wt = new Array(Nt);
                ft = xt.length,
                mt[tt] = ft,
                Ct.push(tt),
                Mt.push(lt),
                xt.push(Wt);
                for (let Qt = jt, qt = Lt.length; Qt !== qt; ++Qt) {
                    const Xt = Lt[Qt];
                    Wt[Qt] = new Ro(Xt,tt,lt)
                }
                return Wt
            }
            unsubscribe_(tt) {
                const lt = this._bindingsIndicesByPath
                  , mt = lt[tt];
                if (mt !== void 0) {
                    const ft = this._paths
                      , xt = this._parsedPaths
                      , Ct = this._bindings
                      , Mt = Ct.length - 1
                      , Lt = Ct[Mt];
                    lt[tt[Mt]] = mt,
                    Ct[mt] = Lt,
                    Ct.pop(),
                    xt[mt] = xt[Mt],
                    xt.pop(),
                    ft[mt] = ft[Mt],
                    ft.pop()
                }
            }
        }
        class $A {
            constructor(tt, lt, mt=null, ft=lt.blendMode) {
                this._mixer = tt,
                this._clip = lt,
                this._localRoot = mt,
                this.blendMode = ft;
                const xt = lt.tracks
                  , Ct = xt.length
                  , Mt = new Array(Ct)
                  , Lt = {
                    endingStart: du,
                    endingEnd: du
                };
                for (let Nt = 0; Nt !== Ct; ++Nt) {
                    const jt = xt[Nt].createInterpolant(null);
                    Mt[Nt] = jt,
                    jt.settings = Lt
                }
                this._interpolantSettings = Lt,
                this._interpolants = Mt,
                this._propertyBindings = new Array(Ct),
                this._cacheIndex = null,
                this._byClipCacheIndex = null,
                this._timeScaleInterpolant = null,
                this._weightInterpolant = null,
                this.loop = Du,
                this._loopCount = -1,
                this._startTime = null,
                this.time = 0,
                this.timeScale = 1,
                this._effectiveTimeScale = 1,
                this.weight = 1,
                this._effectiveWeight = 1,
                this.repetitions = 1 / 0,
                this.paused = !1,
                this.enabled = !0,
                this.clampWhenFinished = !1,
                this.zeroSlopeAtStart = !0,
                this.zeroSlopeAtEnd = !0
            }
            play() {
                return this._mixer._activateAction(this),
                this
            }
            stop() {
                return this._mixer._deactivateAction(this),
                this.reset()
            }
            reset() {
                return this.paused = !1,
                this.enabled = !0,
                this.time = 0,
                this._loopCount = -1,
                this._startTime = null,
                this.stopFading().stopWarping()
            }
            isRunning() {
                return this.enabled && !this.paused && this.timeScale !== 0 && this._startTime === null && this._mixer._isActiveAction(this)
            }
            isScheduled() {
                return this._mixer._isActiveAction(this)
            }
            startAt(tt) {
                return this._startTime = tt,
                this
            }
            setLoop(tt, lt) {
                return this.loop = tt,
                this.repetitions = lt,
                this
            }
            setEffectiveWeight(tt) {
                return this.weight = tt,
                this._effectiveWeight = this.enabled ? tt : 0,
                this.stopFading()
            }
            getEffectiveWeight() {
                return this._effectiveWeight
            }
            fadeIn(tt) {
                return this._scheduleFading(tt, 0, 1)
            }
            fadeOut(tt) {
                return this._scheduleFading(tt, 1, 0)
            }
            crossFadeFrom(tt, lt, mt) {
                if (tt.fadeOut(lt),
                this.fadeIn(lt),
                mt) {
                    const ft = this._clip.duration
                      , xt = tt._clip.duration
                      , Ct = xt / ft
                      , Mt = ft / xt;
                    tt.warp(1, Ct, lt),
                    this.warp(Mt, 1, lt)
                }
                return this
            }
            crossFadeTo(tt, lt, mt) {
                return tt.crossFadeFrom(this, lt, mt)
            }
            stopFading() {
                const tt = this._weightInterpolant;
                return tt !== null && (this._weightInterpolant = null,
                this._mixer._takeBackControlInterpolant(tt)),
                this
            }
            setEffectiveTimeScale(tt) {
                return this.timeScale = tt,
                this._effectiveTimeScale = this.paused ? 0 : tt,
                this.stopWarping()
            }
            getEffectiveTimeScale() {
                return this._effectiveTimeScale
            }
            setDuration(tt) {
                return this.timeScale = this._clip.duration / tt,
                this.stopWarping()
            }
            syncWith(tt) {
                return this.time = tt.time,
                this.timeScale = tt.timeScale,
                this.stopWarping()
            }
            halt(tt) {
                return this.warp(this._effectiveTimeScale, 0, tt)
            }
            warp(tt, lt, mt) {
                const ft = this._mixer
                  , xt = ft.time
                  , Ct = this.timeScale;
                let Mt = this._timeScaleInterpolant;
                Mt === null && (Mt = ft._lendControlInterpolant(),
                this._timeScaleInterpolant = Mt);
                const Lt = Mt.parameterPositions
                  , Nt = Mt.sampleValues;
                return Lt[0] = xt,
                Lt[1] = xt + mt,
                Nt[0] = tt / Ct,
                Nt[1] = lt / Ct,
                this
            }
            stopWarping() {
                const tt = this._timeScaleInterpolant;
                return tt !== null && (this._timeScaleInterpolant = null,
                this._mixer._takeBackControlInterpolant(tt)),
                this
            }
            getMixer() {
                return this._mixer
            }
            getClip() {
                return this._clip
            }
            getRoot() {
                return this._localRoot || this._mixer._root
            }
            _update(tt, lt, mt, ft) {
                if (!this.enabled)
                    return void this._updateWeight(tt);
                const xt = this._startTime;
                if (xt !== null) {
                    const Lt = (tt - xt) * mt;
                    Lt < 0 || mt === 0 ? lt = 0 : (this._startTime = null,
                    lt = mt * Lt)
                }
                lt *= this._updateTimeScale(tt);
                const Ct = this._updateTime(lt)
                  , Mt = this._updateWeight(tt);
                if (Mt > 0) {
                    const Lt = this._interpolants
                      , Nt = this._propertyBindings;
                    if (this.blendMode === Xp)
                        for (let jt = 0, Wt = Lt.length; jt !== Wt; ++jt)
                            Lt[jt].evaluate(Ct),
                            Nt[jt].accumulateAdditive(Mt);
                    else
                        for (let jt = 0, Wt = Lt.length; jt !== Wt; ++jt)
                            Lt[jt].evaluate(Ct),
                            Nt[jt].accumulate(ft, Mt)
                }
            }
            _updateWeight(tt) {
                let lt = 0;
                if (this.enabled) {
                    lt = this.weight;
                    const mt = this._weightInterpolant;
                    if (mt !== null) {
                        const ft = mt.evaluate(tt)[0];
                        lt *= ft,
                        tt > mt.parameterPositions[1] && (this.stopFading(),
                        ft === 0 && (this.enabled = !1))
                    }
                }
                return this._effectiveWeight = lt,
                lt
            }
            _updateTimeScale(tt) {
                let lt = 0;
                if (!this.paused) {
                    lt = this.timeScale;
                    const mt = this._timeScaleInterpolant;
                    mt !== null && (lt *= mt.evaluate(tt)[0],
                    tt > mt.parameterPositions[1] && (this.stopWarping(),
                    lt === 0 ? this.paused = !0 : this.timeScale = lt))
                }
                return this._effectiveTimeScale = lt,
                lt
            }
            _updateTime(tt) {
                const lt = this._clip.duration
                  , mt = this.loop;
                let ft = this.time + tt
                  , xt = this._loopCount;
                const Ct = mt === qp;
                if (tt === 0)
                    return xt === -1 || !Ct || 1 & ~xt ? ft : lt - ft;
                if (mt === ku) {
                    xt === -1 && (this._loopCount = 0,
                    this._setEndings(!0, !0, !1));
                    e: {
                        if (ft >= lt)
                            ft = lt;
                        else {
                            if (!(ft < 0)) {
                                this.time = ft;
                                break e
                            }
                            ft = 0
                        }
                        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
                        this.time = ft,
                        this._mixer.dispatchEvent({
                            type: "finished",
                            action: this,
                            direction: tt < 0 ? -1 : 1
                        })
                    }
                } else {
                    if (xt === -1 && (tt >= 0 ? (xt = 0,
                    this._setEndings(!0, this.repetitions === 0, Ct)) : this._setEndings(this.repetitions === 0, !0, Ct)),
                    ft >= lt || ft < 0) {
                        const Mt = Math.floor(ft / lt);
                        ft -= lt * Mt,
                        xt += Math.abs(Mt);
                        const Lt = this.repetitions - xt;
                        if (Lt <= 0)
                            this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
                            ft = tt > 0 ? lt : 0,
                            this.time = ft,
                            this._mixer.dispatchEvent({
                                type: "finished",
                                action: this,
                                direction: tt > 0 ? 1 : -1
                            });
                        else {
                            if (Lt === 1) {
                                const Nt = tt < 0;
                                this._setEndings(Nt, !Nt, Ct)
                            } else
                                this._setEndings(!1, !1, Ct);
                            this._loopCount = xt,
                            this.time = ft,
                            this._mixer.dispatchEvent({
                                type: "loop",
                                action: this,
                                loopDelta: Mt
                            })
                        }
                    } else
                        this.time = ft;
                    if (Ct && !(1 & ~xt))
                        return lt - ft
                }
                return ft
            }
            _setEndings(tt, lt, mt) {
                const ft = this._interpolantSettings;
                mt ? (ft.endingStart = pu,
                ft.endingEnd = pu) : (ft.endingStart = tt ? this.zeroSlopeAtStart ? pu : du : cp,
                ft.endingEnd = lt ? this.zeroSlopeAtEnd ? pu : du : cp)
            }
            _scheduleFading(tt, lt, mt) {
                const ft = this._mixer
                  , xt = ft.time;
                let Ct = this._weightInterpolant;
                Ct === null && (Ct = ft._lendControlInterpolant(),
                this._weightInterpolant = Ct);
                const Mt = Ct.parameterPositions
                  , Lt = Ct.sampleValues;
                return Mt[0] = xt,
                Lt[0] = lt,
                Mt[1] = xt + tt,
                Lt[1] = mt,
                this
            }
        }
        const $S = new Float32Array(1);
        class XS extends As {
            constructor(tt) {
                super(),
                this._root = tt,
                this._initMemoryManager(),
                this._accuIndex = 0,
                this.time = 0,
                this.timeScale = 1
            }
            _bindAction(tt, lt) {
                const mt = tt._localRoot || this._root
                  , ft = tt._clip.tracks
                  , xt = ft.length
                  , Ct = tt._propertyBindings
                  , Mt = tt._interpolants
                  , Lt = mt.uuid
                  , Nt = this._bindingsByRootAndName;
                let jt = Nt[Lt];
                jt === void 0 && (jt = {},
                Nt[Lt] = jt);
                for (let Wt = 0; Wt !== xt; ++Wt) {
                    const Qt = ft[Wt]
                      , qt = Qt.name;
                    let Xt = jt[qt];
                    if (Xt !== void 0)
                        ++Xt.referenceCount,
                        Ct[Wt] = Xt;
                    else {
                        if (Xt = Ct[Wt],
                        Xt !== void 0) {
                            Xt._cacheIndex === null && (++Xt.referenceCount,
                            this._addInactiveBinding(Xt, Lt, qt));
                            continue
                        }
                        const Zt = lt && lt._propertyBindings[Wt].binding.parsedPath;
                        Xt = new qA(Ro.create(mt, qt, Zt),Qt.ValueTypeName,Qt.getValueSize()),
                        ++Xt.referenceCount,
                        this._addInactiveBinding(Xt, Lt, qt),
                        Ct[Wt] = Xt
                    }
                    Mt[Wt].resultBuffer = Xt.buffer
                }
            }
            _activateAction(tt) {
                if (!this._isActiveAction(tt)) {
                    if (tt._cacheIndex === null) {
                        const mt = (tt._localRoot || this._root).uuid
                          , ft = tt._clip.uuid
                          , xt = this._actionsByClip[ft];
                        this._bindAction(tt, xt && xt.knownActions[0]),
                        this._addInactiveAction(tt, ft, mt)
                    }
                    const lt = tt._propertyBindings;
                    for (let mt = 0, ft = lt.length; mt !== ft; ++mt) {
                        const xt = lt[mt];
                        xt.useCount++ == 0 && (this._lendBinding(xt),
                        xt.saveOriginalState())
                    }
                    this._lendAction(tt)
                }
            }
            _deactivateAction(tt) {
                if (this._isActiveAction(tt)) {
                    const lt = tt._propertyBindings;
                    for (let mt = 0, ft = lt.length; mt !== ft; ++mt) {
                        const xt = lt[mt];
                        --xt.useCount == 0 && (xt.restoreOriginalState(),
                        this._takeBackBinding(xt))
                    }
                    this._takeBackAction(tt)
                }
            }
            _initMemoryManager() {
                this._actions = [],
                this._nActiveActions = 0,
                this._actionsByClip = {},
                this._bindings = [],
                this._nActiveBindings = 0,
                this._bindingsByRootAndName = {},
                this._controlInterpolants = [],
                this._nActiveControlInterpolants = 0;
                const tt = this;
                this.stats = {
                    actions: {
                        get total() {
                            return tt._actions.length
                        },
                        get inUse() {
                            return tt._nActiveActions
                        }
                    },
                    bindings: {
                        get total() {
                            return tt._bindings.length
                        },
                        get inUse() {
                            return tt._nActiveBindings
                        }
                    },
                    controlInterpolants: {
                        get total() {
                            return tt._controlInterpolants.length
                        },
                        get inUse() {
                            return tt._nActiveControlInterpolants
                        }
                    }
                }
            }
            _isActiveAction(tt) {
                const lt = tt._cacheIndex;
                return lt !== null && lt < this._nActiveActions
            }
            _addInactiveAction(tt, lt, mt) {
                const ft = this._actions
                  , xt = this._actionsByClip;
                let Ct = xt[lt];
                if (Ct === void 0)
                    Ct = {
                        knownActions: [tt],
                        actionByRoot: {}
                    },
                    tt._byClipCacheIndex = 0,
                    xt[lt] = Ct;
                else {
                    const Mt = Ct.knownActions;
                    tt._byClipCacheIndex = Mt.length,
                    Mt.push(tt)
                }
                tt._cacheIndex = ft.length,
                ft.push(tt),
                Ct.actionByRoot[mt] = tt
            }
            _removeInactiveAction(tt) {
                const lt = this._actions
                  , mt = lt[lt.length - 1]
                  , ft = tt._cacheIndex;
                mt._cacheIndex = ft,
                lt[ft] = mt,
                lt.pop(),
                tt._cacheIndex = null;
                const xt = tt._clip.uuid
                  , Ct = this._actionsByClip
                  , Mt = Ct[xt]
                  , Lt = Mt.knownActions
                  , Nt = Lt[Lt.length - 1]
                  , jt = tt._byClipCacheIndex;
                Nt._byClipCacheIndex = jt,
                Lt[jt] = Nt,
                Lt.pop(),
                tt._byClipCacheIndex = null,
                delete Mt.actionByRoot[(tt._localRoot || this._root).uuid],
                Lt.length === 0 && delete Ct[xt],
                this._removeInactiveBindingsForAction(tt)
            }
            _removeInactiveBindingsForAction(tt) {
                const lt = tt._propertyBindings;
                for (let mt = 0, ft = lt.length; mt !== ft; ++mt) {
                    const xt = lt[mt];
                    --xt.referenceCount == 0 && this._removeInactiveBinding(xt)
                }
            }
            _lendAction(tt) {
                const lt = this._actions
                  , mt = tt._cacheIndex
                  , ft = this._nActiveActions++
                  , xt = lt[ft];
                tt._cacheIndex = ft,
                lt[ft] = tt,
                xt._cacheIndex = mt,
                lt[mt] = xt
            }
            _takeBackAction(tt) {
                const lt = this._actions
                  , mt = tt._cacheIndex
                  , ft = --this._nActiveActions
                  , xt = lt[ft];
                tt._cacheIndex = ft,
                lt[ft] = tt,
                xt._cacheIndex = mt,
                lt[mt] = xt
            }
            _addInactiveBinding(tt, lt, mt) {
                const ft = this._bindingsByRootAndName
                  , xt = this._bindings;
                let Ct = ft[lt];
                Ct === void 0 && (Ct = {},
                ft[lt] = Ct),
                Ct[mt] = tt,
                tt._cacheIndex = xt.length,
                xt.push(tt)
            }
            _removeInactiveBinding(tt) {
                const lt = this._bindings
                  , mt = tt.binding
                  , ft = mt.rootNode.uuid
                  , xt = mt.path
                  , Ct = this._bindingsByRootAndName
                  , Mt = Ct[ft]
                  , Lt = lt[lt.length - 1]
                  , Nt = tt._cacheIndex;
                Lt._cacheIndex = Nt,
                lt[Nt] = Lt,
                lt.pop(),
                delete Mt[xt],
                Object.keys(Mt).length === 0 && delete Ct[ft]
            }
            _lendBinding(tt) {
                const lt = this._bindings
                  , mt = tt._cacheIndex
                  , ft = this._nActiveBindings++
                  , xt = lt[ft];
                tt._cacheIndex = ft,
                lt[ft] = tt,
                xt._cacheIndex = mt,
                lt[mt] = xt
            }
            _takeBackBinding(tt) {
                const lt = this._bindings
                  , mt = tt._cacheIndex
                  , ft = --this._nActiveBindings
                  , xt = lt[ft];
                tt._cacheIndex = ft,
                lt[ft] = tt,
                xt._cacheIndex = mt,
                lt[mt] = xt
            }
            _lendControlInterpolant() {
                const tt = this._controlInterpolants
                  , lt = this._nActiveControlInterpolants++;
                let mt = tt[lt];
                return mt === void 0 && (mt = new gy(new Float32Array(2),new Float32Array(2),1,$S),
                mt.__cacheIndex = lt,
                tt[lt] = mt),
                mt
            }
            _takeBackControlInterpolant(tt) {
                const lt = this._controlInterpolants
                  , mt = tt.__cacheIndex
                  , ft = --this._nActiveControlInterpolants
                  , xt = lt[ft];
                tt.__cacheIndex = ft,
                lt[ft] = tt,
                xt.__cacheIndex = mt,
                lt[mt] = xt
            }
            clipAction(tt, lt, mt) {
                const ft = lt || this._root
                  , xt = ft.uuid;
                let Ct = typeof tt == "string" ? L_.findByName(ft, tt) : tt;
                const Mt = Ct !== null ? Ct.uuid : tt
                  , Lt = this._actionsByClip[Mt];
                let Nt = null;
                if (mt === void 0 && (mt = Ct !== null ? Ct.blendMode : Hm),
                Lt !== void 0) {
                    const Wt = Lt.actionByRoot[xt];
                    if (Wt !== void 0 && Wt.blendMode === mt)
                        return Wt;
                    Nt = Lt.knownActions[0],
                    Ct === null && (Ct = Nt._clip)
                }
                if (Ct === null)
                    return null;
                const jt = new $A(this,Ct,lt,mt);
                return this._bindAction(jt, Nt),
                this._addInactiveAction(jt, Mt, xt),
                jt
            }
            existingAction(tt, lt) {
                const mt = lt || this._root
                  , ft = mt.uuid
                  , xt = typeof tt == "string" ? L_.findByName(mt, tt) : tt
                  , Ct = xt ? xt.uuid : tt
                  , Mt = this._actionsByClip[Ct];
                return Mt !== void 0 && Mt.actionByRoot[ft] || null
            }
            stopAllAction() {
                const tt = this._actions;
                for (let lt = this._nActiveActions - 1; lt >= 0; --lt)
                    tt[lt].stop();
                return this
            }
            update(tt) {
                tt *= this.timeScale;
                const lt = this._actions
                  , mt = this._nActiveActions
                  , ft = this.time += tt
                  , xt = Math.sign(tt)
                  , Ct = this._accuIndex ^= 1;
                for (let Nt = 0; Nt !== mt; ++Nt)
                    lt[Nt]._update(ft, tt, xt, Ct);
                const Mt = this._bindings
                  , Lt = this._nActiveBindings;
                for (let Nt = 0; Nt !== Lt; ++Nt)
                    Mt[Nt].apply(Ct);
                return this
            }
            setTime(tt) {
                this.time = 0;
                for (let lt = 0; lt < this._actions.length; lt++)
                    this._actions[lt].time = 0;
                return this.update(tt)
            }
            getRoot() {
                return this._root
            }
            uncacheClip(tt) {
                const lt = this._actions
                  , mt = tt.uuid
                  , ft = this._actionsByClip
                  , xt = ft[mt];
                if (xt !== void 0) {
                    const Ct = xt.knownActions;
                    for (let Mt = 0, Lt = Ct.length; Mt !== Lt; ++Mt) {
                        const Nt = Ct[Mt];
                        this._deactivateAction(Nt);
                        const jt = Nt._cacheIndex
                          , Wt = lt[lt.length - 1];
                        Nt._cacheIndex = null,
                        Nt._byClipCacheIndex = null,
                        Wt._cacheIndex = jt,
                        lt[jt] = Wt,
                        lt.pop(),
                        this._removeInactiveBindingsForAction(Nt)
                    }
                    delete ft[mt]
                }
            }
            uncacheRoot(tt) {
                const lt = tt.uuid
                  , mt = this._actionsByClip;
                for (const xt in mt) {
                    const Ct = mt[xt].actionByRoot[lt];
                    Ct !== void 0 && (this._deactivateAction(Ct),
                    this._removeInactiveAction(Ct))
                }
                const ft = this._bindingsByRootAndName[lt];
                if (ft !== void 0)
                    for (const xt in ft) {
                        const Ct = ft[xt];
                        Ct.restoreOriginalState(),
                        this._removeInactiveBinding(Ct)
                    }
            }
            uncacheAction(tt, lt) {
                const mt = this.existingAction(tt, lt);
                mt !== null && (this._deactivateAction(mt),
                this._removeInactiveAction(mt))
            }
        }
        class Ty {
            constructor(tt) {
                this.value = tt
            }
            clone() {
                return new Ty(this.value.clone === void 0 ? this.value : this.value.clone())
            }
        }
        let YS = 0;
        class KS extends As {
            constructor() {
                super(),
                this.isUniformsGroup = !0,
                Object.defineProperty(this, "id", {
                    value: YS++
                }),
                this.name = "",
                this.usage = Nu,
                this.uniforms = []
            }
            add(tt) {
                return this.uniforms.push(tt),
                this
            }
            remove(tt) {
                const lt = this.uniforms.indexOf(tt);
                return lt !== -1 && this.uniforms.splice(lt, 1),
                this
            }
            setName(tt) {
                return this.name = tt,
                this
            }
            setUsage(tt) {
                return this.usage = tt,
                this
            }
            dispose() {
                return this.dispatchEvent({
                    type: "dispose"
                }),
                this
            }
            copy(tt) {
                this.name = tt.name,
                this.usage = tt.usage;
                const lt = tt.uniforms;
                this.uniforms.length = 0;
                for (let mt = 0, ft = lt.length; mt < ft; mt++)
                    this.uniforms.push(lt[mt].clone());
                return this
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        class JS extends Rv {
            constructor(tt, lt, mt=1) {
                super(tt, lt),
                this.isInstancedInterleavedBuffer = !0,
                this.meshPerAttribute = mt
            }
            copy(tt) {
                return super.copy(tt),
                this.meshPerAttribute = tt.meshPerAttribute,
                this
            }
            clone(tt) {
                const lt = super.clone(tt);
                return lt.meshPerAttribute = this.meshPerAttribute,
                lt
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.isInstancedInterleavedBuffer = !0,
                lt.meshPerAttribute = this.meshPerAttribute,
                lt
            }
        }
        class ZS {
            constructor(tt, lt, mt, ft, xt) {
                this.isGLBufferAttribute = !0,
                this.name = "",
                this.buffer = tt,
                this.type = lt,
                this.itemSize = mt,
                this.elementSize = ft,
                this.count = xt,
                this.version = 0
            }
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
            setBuffer(tt) {
                return this.buffer = tt,
                this
            }
            setType(tt, lt) {
                return this.type = tt,
                this.elementSize = lt,
                this
            }
            setItemSize(tt) {
                return this.itemSize = tt,
                this
            }
            setCount(tt) {
                return this.count = tt,
                this
            }
        }
        class eE {
            constructor(tt, lt, mt=0, ft=1 / 0) {
                this.ray = new Qu(tt,lt),
                this.near = mt,
                this.far = ft,
                this.camera = null,
                this.layers = new um,
                this.params = {
                    Mesh: {},
                    Line: {
                        threshold: 1
                    },
                    LOD: {},
                    Points: {
                        threshold: 1
                    },
                    Sprite: {}
                }
            }
            set(tt, lt) {
                this.ray.set(tt, lt)
            }
            setFromCamera(tt, lt) {
                lt.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(lt.matrixWorld),
                this.ray.direction.set(tt.x, tt.y, .5).unproject(lt).sub(this.ray.origin).normalize(),
                this.camera = lt) : lt.isOrthographicCamera ? (this.ray.origin.set(tt.x, tt.y, (lt.near + lt.far) / (lt.near - lt.far)).unproject(lt),
                this.ray.direction.set(0, 0, -1).transformDirection(lt.matrixWorld),
                this.camera = lt) : console.error("THREE.Raycaster: Unsupported camera type: " + lt.type)
            }
            intersectObject(tt, lt=!0, mt=[]) {
                return Cy(tt, this, mt, lt),
                mt.sort(XA),
                mt
            }
            intersectObjects(tt, lt=!0, mt=[]) {
                for (let ft = 0, xt = tt.length; ft < xt; ft++)
                    Cy(tt[ft], this, mt, lt);
                return mt.sort(XA),
                mt
            }
        }
        function XA(Tt, tt) {
            return Tt.distance - tt.distance
        }
        function Cy(Tt, tt, lt, mt) {
            if (Tt.layers.test(tt.layers) && Tt.raycast(tt, lt),
            mt === !0) {
                const ft = Tt.children;
                for (let xt = 0, Ct = ft.length; xt < Ct; xt++)
                    Cy(ft[xt], tt, lt, !0)
            }
        }
        class tE {
            constructor(tt=1, lt=0, mt=0) {
                return this.radius = tt,
                this.phi = lt,
                this.theta = mt,
                this
            }
            set(tt, lt, mt) {
                return this.radius = tt,
                this.phi = lt,
                this.theta = mt,
                this
            }
            copy(tt) {
                return this.radius = tt.radius,
                this.phi = tt.phi,
                this.theta = tt.theta,
                this
            }
            makeSafe() {
                return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)),
                this
            }
            setFromVector3(tt) {
                return this.setFromCartesianCoords(tt.x, tt.y, tt.z)
            }
            setFromCartesianCoords(tt, lt, mt) {
                return this.radius = Math.sqrt(tt * tt + lt * lt + mt * mt),
                this.radius === 0 ? (this.theta = 0,
                this.phi = 0) : (this.theta = Math.atan2(tt, mt),
                this.phi = Math.acos(qo(lt / this.radius, -1, 1))),
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        class rE {
            constructor(tt=1, lt=0, mt=0) {
                return this.radius = tt,
                this.theta = lt,
                this.y = mt,
                this
            }
            set(tt, lt, mt) {
                return this.radius = tt,
                this.theta = lt,
                this.y = mt,
                this
            }
            copy(tt) {
                return this.radius = tt.radius,
                this.theta = tt.theta,
                this.y = tt.y,
                this
            }
            setFromVector3(tt) {
                return this.setFromCartesianCoords(tt.x, tt.y, tt.z)
            }
            setFromCartesianCoords(tt, lt, mt) {
                return this.radius = Math.sqrt(tt * tt + mt * mt),
                this.theta = Math.atan2(tt, mt),
                this.y = lt,
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        const YA = new mn;
        class nE {
            constructor(tt=new mn(1 / 0,1 / 0), lt=new mn(-1 / 0,-1 / 0)) {
                this.isBox2 = !0,
                this.min = tt,
                this.max = lt
            }
            set(tt, lt) {
                return this.min.copy(tt),
                this.max.copy(lt),
                this
            }
            setFromPoints(tt) {
                this.makeEmpty();
                for (let lt = 0, mt = tt.length; lt < mt; lt++)
                    this.expandByPoint(tt[lt]);
                return this
            }
            setFromCenterAndSize(tt, lt) {
                const mt = YA.copy(lt).multiplyScalar(.5);
                return this.min.copy(tt).sub(mt),
                this.max.copy(tt).add(mt),
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                return this.min.copy(tt.min),
                this.max.copy(tt.max),
                this
            }
            makeEmpty() {
                return this.min.x = this.min.y = 1 / 0,
                this.max.x = this.max.y = -1 / 0,
                this
            }
            isEmpty() {
                return this.max.x < this.min.x || this.max.y < this.min.y
            }
            getCenter(tt) {
                return this.isEmpty() ? tt.set(0, 0) : tt.addVectors(this.min, this.max).multiplyScalar(.5)
            }
            getSize(tt) {
                return this.isEmpty() ? tt.set(0, 0) : tt.subVectors(this.max, this.min)
            }
            expandByPoint(tt) {
                return this.min.min(tt),
                this.max.max(tt),
                this
            }
            expandByVector(tt) {
                return this.min.sub(tt),
                this.max.add(tt),
                this
            }
            expandByScalar(tt) {
                return this.min.addScalar(-tt),
                this.max.addScalar(tt),
                this
            }
            containsPoint(tt) {
                return !(tt.x < this.min.x || tt.x > this.max.x || tt.y < this.min.y || tt.y > this.max.y)
            }
            containsBox(tt) {
                return this.min.x <= tt.min.x && tt.max.x <= this.max.x && this.min.y <= tt.min.y && tt.max.y <= this.max.y
            }
            getParameter(tt, lt) {
                return lt.set((tt.x - this.min.x) / (this.max.x - this.min.x), (tt.y - this.min.y) / (this.max.y - this.min.y))
            }
            intersectsBox(tt) {
                return !(tt.max.x < this.min.x || tt.min.x > this.max.x || tt.max.y < this.min.y || tt.min.y > this.max.y)
            }
            clampPoint(tt, lt) {
                return lt.copy(tt).clamp(this.min, this.max)
            }
            distanceToPoint(tt) {
                return this.clampPoint(tt, YA).distanceTo(tt)
            }
            intersect(tt) {
                return this.min.max(tt.min),
                this.max.min(tt.max),
                this.isEmpty() && this.makeEmpty(),
                this
            }
            union(tt) {
                return this.min.min(tt.min),
                this.max.max(tt.max),
                this
            }
            translate(tt) {
                return this.min.add(tt),
                this.max.add(tt),
                this
            }
            equals(tt) {
                return tt.min.equals(this.min) && tt.max.equals(this.max)
            }
        }
        const KA = new Er
          , u0 = new Er;
        class iE {
            constructor(tt=new Er, lt=new Er) {
                this.start = tt,
                this.end = lt
            }
            set(tt, lt) {
                return this.start.copy(tt),
                this.end.copy(lt),
                this
            }
            copy(tt) {
                return this.start.copy(tt.start),
                this.end.copy(tt.end),
                this
            }
            getCenter(tt) {
                return tt.addVectors(this.start, this.end).multiplyScalar(.5)
            }
            delta(tt) {
                return tt.subVectors(this.end, this.start)
            }
            distanceSq() {
                return this.start.distanceToSquared(this.end)
            }
            distance() {
                return this.start.distanceTo(this.end)
            }
            at(tt, lt) {
                return this.delta(lt).multiplyScalar(tt).add(this.start)
            }
            closestPointToPointParameter(tt, lt) {
                KA.subVectors(tt, this.start),
                u0.subVectors(this.end, this.start);
                const mt = u0.dot(u0);
                let ft = u0.dot(KA) / mt;
                return lt && (ft = qo(ft, 0, 1)),
                ft
            }
            closestPointToPoint(tt, lt, mt) {
                const ft = this.closestPointToPointParameter(tt, lt);
                return this.delta(mt).multiplyScalar(ft).add(this.start)
            }
            applyMatrix4(tt) {
                return this.start.applyMatrix4(tt),
                this.end.applyMatrix4(tt),
                this
            }
            equals(tt) {
                return tt.start.equals(this.start) && tt.end.equals(this.end)
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        const JA = new Er;
        class oE extends Mo {
            constructor(tt, lt) {
                super(),
                this.light = tt,
                this.matrix = tt.matrixWorld,
                this.matrixAutoUpdate = !1,
                this.color = lt,
                this.type = "SpotLightHelper";
                const mt = new bo
                  , ft = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
                for (let Ct = 0, Mt = 1, Lt = 32; Ct < Lt; Ct++,
                Mt++) {
                    const Nt = Ct / Lt * Math.PI * 2
                      , jt = Mt / Lt * Math.PI * 2;
                    ft.push(Math.cos(Nt), Math.sin(Nt), 1, Math.cos(jt), Math.sin(jt), 1)
                }
                mt.setAttribute("position", new Fn(ft,3));
                const xt = new Gs({
                    fog: !1,
                    toneMapped: !1
                });
                this.cone = new iu(mt,xt),
                this.add(this.cone),
                this.update()
            }
            dispose() {
                this.cone.geometry.dispose(),
                this.cone.material.dispose()
            }
            update() {
                this.light.updateWorldMatrix(!0, !1),
                this.light.target.updateWorldMatrix(!0, !1);
                const tt = this.light.distance ? this.light.distance : 1e3
                  , lt = tt * Math.tan(this.light.angle);
                this.cone.scale.set(lt, lt, tt),
                JA.setFromMatrixPosition(this.light.target.matrixWorld),
                this.cone.lookAt(JA),
                this.color !== void 0 ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
            }
        }
        const np = new Er
          , d0 = new no
          , Py = new no;
        class sE extends iu {
            constructor(tt) {
                const lt = ZA(tt)
                  , mt = new bo
                  , ft = []
                  , xt = []
                  , Ct = new Gn(0,0,1)
                  , Mt = new Gn(0,1,0);
                for (let Lt = 0; Lt < lt.length; Lt++) {
                    const Nt = lt[Lt];
                    Nt.parent && Nt.parent.isBone && (ft.push(0, 0, 0),
                    ft.push(0, 0, 0),
                    xt.push(Ct.r, Ct.g, Ct.b),
                    xt.push(Mt.r, Mt.g, Mt.b))
                }
                mt.setAttribute("position", new Fn(ft,3)),
                mt.setAttribute("color", new Fn(xt,3)),
                super(mt, new Gs({
                    vertexColors: !0,
                    depthTest: !1,
                    depthWrite: !1,
                    toneMapped: !1,
                    transparent: !0
                })),
                this.isSkeletonHelper = !0,
                this.type = "SkeletonHelper",
                this.root = tt,
                this.bones = lt,
                this.matrix = tt.matrixWorld,
                this.matrixAutoUpdate = !1
            }
            updateMatrixWorld(tt) {
                const lt = this.bones
                  , mt = this.geometry
                  , ft = mt.getAttribute("position");
                Py.copy(this.root.matrixWorld).invert();
                for (let xt = 0, Ct = 0; xt < lt.length; xt++) {
                    const Mt = lt[xt];
                    Mt.parent && Mt.parent.isBone && (d0.multiplyMatrices(Py, Mt.matrixWorld),
                    np.setFromMatrixPosition(d0),
                    ft.setXYZ(Ct, np.x, np.y, np.z),
                    d0.multiplyMatrices(Py, Mt.parent.matrixWorld),
                    np.setFromMatrixPosition(d0),
                    ft.setXYZ(Ct + 1, np.x, np.y, np.z),
                    Ct += 2)
                }
                mt.getAttribute("position").needsUpdate = !0,
                super.updateMatrixWorld(tt)
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        function ZA(Tt) {
            const tt = [];
            Tt.isBone === !0 && tt.push(Tt);
            for (let lt = 0; lt < Tt.children.length; lt++)
                tt.push.apply(tt, ZA(Tt.children[lt]));
            return tt
        }
        class aE extends gs {
            constructor(tt, lt, mt) {
                super(new I_(lt,4,2), new nu({
                    wireframe: !0,
                    fog: !1,
                    toneMapped: !1
                })),
                this.light = tt,
                this.color = mt,
                this.type = "PointLightHelper",
                this.matrix = this.light.matrixWorld,
                this.matrixAutoUpdate = !1,
                this.update()
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
            update() {
                this.light.updateWorldMatrix(!0, !1),
                this.color !== void 0 ? this.material.color.set(this.color) : this.material.color.copy(this.light.color)
            }
        }
        const lE = new Er
          , ew = new Gn
          , tw = new Gn;
        class cE extends Mo {
            constructor(tt, lt, mt) {
                super(),
                this.light = tt,
                this.matrix = tt.matrixWorld,
                this.matrixAutoUpdate = !1,
                this.color = mt,
                this.type = "HemisphereLightHelper";
                const ft = new R_(lt);
                ft.rotateY(.5 * Math.PI),
                this.material = new nu({
                    wireframe: !0,
                    fog: !1,
                    toneMapped: !1
                }),
                this.color === void 0 && (this.material.vertexColors = !0);
                const xt = ft.getAttribute("position")
                  , Ct = new Float32Array(3 * xt.count);
                ft.setAttribute("color", new mr(Ct,3)),
                this.add(new gs(ft,this.material)),
                this.update()
            }
            dispose() {
                this.children[0].geometry.dispose(),
                this.children[0].material.dispose()
            }
            update() {
                const tt = this.children[0];
                if (this.color !== void 0)
                    this.material.color.set(this.color);
                else {
                    const lt = tt.geometry.getAttribute("color");
                    ew.copy(this.light.color),
                    tw.copy(this.light.groundColor);
                    for (let mt = 0, ft = lt.count; mt < ft; mt++) {
                        const xt = mt < ft / 2 ? ew : tw;
                        lt.setXYZ(mt, xt.r, xt.g, xt.b)
                    }
                    lt.needsUpdate = !0
                }
                this.light.updateWorldMatrix(!0, !1),
                tt.lookAt(lE.setFromMatrixPosition(this.light.matrixWorld).negate())
            }
        }
        class uE extends iu {
            constructor(tt=10, lt=10, mt=4473924, ft=8947848) {
                mt = new Gn(mt),
                ft = new Gn(ft);
                const xt = lt / 2
                  , Ct = tt / lt
                  , Mt = tt / 2
                  , Lt = []
                  , Nt = [];
                for (let Wt = 0, Qt = 0, qt = -Mt; Wt <= lt; Wt++,
                qt += Ct) {
                    Lt.push(-Mt, 0, qt, Mt, 0, qt),
                    Lt.push(qt, 0, -Mt, qt, 0, Mt);
                    const Xt = Wt === xt ? mt : ft;
                    Xt.toArray(Nt, Qt),
                    Qt += 3,
                    Xt.toArray(Nt, Qt),
                    Qt += 3,
                    Xt.toArray(Nt, Qt),
                    Qt += 3,
                    Xt.toArray(Nt, Qt),
                    Qt += 3
                }
                const jt = new bo;
                jt.setAttribute("position", new Fn(Lt,3)),
                jt.setAttribute("color", new Fn(Nt,3)),
                super(jt, new Gs({
                    vertexColors: !0,
                    toneMapped: !1
                })),
                this.type = "GridHelper"
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        class dE extends iu {
            constructor(tt=10, lt=16, mt=8, ft=64, xt=4473924, Ct=8947848) {
                xt = new Gn(xt),
                Ct = new Gn(Ct);
                const Mt = []
                  , Lt = [];
                if (lt > 1)
                    for (let jt = 0; jt < lt; jt++) {
                        const Wt = jt / lt * (2 * Math.PI)
                          , Qt = Math.sin(Wt) * tt
                          , qt = Math.cos(Wt) * tt;
                        Mt.push(0, 0, 0),
                        Mt.push(Qt, 0, qt);
                        const Xt = 1 & jt ? xt : Ct;
                        Lt.push(Xt.r, Xt.g, Xt.b),
                        Lt.push(Xt.r, Xt.g, Xt.b)
                    }
                for (let jt = 0; jt < mt; jt++) {
                    const Wt = 1 & jt ? xt : Ct
                      , Qt = tt - tt / mt * jt;
                    for (let qt = 0; qt < ft; qt++) {
                        let Xt = qt / ft * (2 * Math.PI)
                          , Zt = Math.sin(Xt) * Qt
                          , Yt = Math.cos(Xt) * Qt;
                        Mt.push(Zt, 0, Yt),
                        Lt.push(Wt.r, Wt.g, Wt.b),
                        Xt = (qt + 1) / ft * (2 * Math.PI),
                        Zt = Math.sin(Xt) * Qt,
                        Yt = Math.cos(Xt) * Qt,
                        Mt.push(Zt, 0, Yt),
                        Lt.push(Wt.r, Wt.g, Wt.b)
                    }
                }
                const Nt = new bo;
                Nt.setAttribute("position", new Fn(Mt,3)),
                Nt.setAttribute("color", new Fn(Lt,3)),
                super(Nt, new Gs({
                    vertexColors: !0,
                    toneMapped: !1
                })),
                this.type = "PolarGridHelper"
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        const rw = new Er
          , p0 = new Er
          , nw = new Er;
        class pE extends Mo {
            constructor(tt, lt, mt) {
                super(),
                this.light = tt,
                this.matrix = tt.matrixWorld,
                this.matrixAutoUpdate = !1,
                this.color = mt,
                this.type = "DirectionalLightHelper",
                lt === void 0 && (lt = 1);
                let ft = new bo;
                ft.setAttribute("position", new Fn([-lt, lt, 0, lt, lt, 0, lt, -lt, 0, -lt, -lt, 0, -lt, lt, 0],3));
                const xt = new Gs({
                    fog: !1,
                    toneMapped: !1
                });
                this.lightPlane = new ep(ft,xt),
                this.add(this.lightPlane),
                ft = new bo,
                ft.setAttribute("position", new Fn([0, 0, 0, 0, 0, 1],3)),
                this.targetLine = new ep(ft,xt),
                this.add(this.targetLine),
                this.update()
            }
            dispose() {
                this.lightPlane.geometry.dispose(),
                this.lightPlane.material.dispose(),
                this.targetLine.geometry.dispose(),
                this.targetLine.material.dispose()
            }
            update() {
                this.light.updateWorldMatrix(!0, !1),
                this.light.target.updateWorldMatrix(!0, !1),
                rw.setFromMatrixPosition(this.light.matrixWorld),
                p0.setFromMatrixPosition(this.light.target.matrixWorld),
                nw.subVectors(p0, rw),
                this.lightPlane.lookAt(p0),
                this.color !== void 0 ? (this.lightPlane.material.color.set(this.color),
                this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color),
                this.targetLine.material.color.copy(this.light.color)),
                this.targetLine.lookAt(p0),
                this.targetLine.scale.z = nw.length()
            }
        }
        const h0 = new Er
          , rs = new xv;
        class hE extends iu {
            constructor(tt) {
                const lt = new bo
                  , mt = new Gs({
                    color: 16777215,
                    vertexColors: !0,
                    toneMapped: !1
                })
                  , ft = []
                  , xt = []
                  , Ct = {};
                function Mt(Xt, Zt) {
                    Lt(Xt),
                    Lt(Zt)
                }
                function Lt(Xt) {
                    ft.push(0, 0, 0),
                    xt.push(0, 0, 0),
                    Ct[Xt] === void 0 && (Ct[Xt] = []),
                    Ct[Xt].push(ft.length / 3 - 1)
                }
                Mt("n1", "n2"),
                Mt("n2", "n4"),
                Mt("n4", "n3"),
                Mt("n3", "n1"),
                Mt("f1", "f2"),
                Mt("f2", "f4"),
                Mt("f4", "f3"),
                Mt("f3", "f1"),
                Mt("n1", "f1"),
                Mt("n2", "f2"),
                Mt("n3", "f3"),
                Mt("n4", "f4"),
                Mt("p", "n1"),
                Mt("p", "n2"),
                Mt("p", "n3"),
                Mt("p", "n4"),
                Mt("u1", "u2"),
                Mt("u2", "u3"),
                Mt("u3", "u1"),
                Mt("c", "t"),
                Mt("p", "c"),
                Mt("cn1", "cn2"),
                Mt("cn3", "cn4"),
                Mt("cf1", "cf2"),
                Mt("cf3", "cf4"),
                lt.setAttribute("position", new Fn(ft,3)),
                lt.setAttribute("color", new Fn(xt,3)),
                super(lt, mt),
                this.type = "CameraHelper",
                this.camera = tt,
                this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(),
                this.matrix = tt.matrixWorld,
                this.matrixAutoUpdate = !1,
                this.pointMap = Ct,
                this.update();
                const Nt = new Gn(16755200)
                  , jt = new Gn(16711680)
                  , Wt = new Gn(43775)
                  , Qt = new Gn(16777215)
                  , qt = new Gn(3355443);
                this.setColors(Nt, jt, Wt, Qt, qt)
            }
            setColors(tt, lt, mt, ft, xt) {
                const Ct = this.geometry.getAttribute("color");
                Ct.setXYZ(0, tt.r, tt.g, tt.b),
                Ct.setXYZ(1, tt.r, tt.g, tt.b),
                Ct.setXYZ(2, tt.r, tt.g, tt.b),
                Ct.setXYZ(3, tt.r, tt.g, tt.b),
                Ct.setXYZ(4, tt.r, tt.g, tt.b),
                Ct.setXYZ(5, tt.r, tt.g, tt.b),
                Ct.setXYZ(6, tt.r, tt.g, tt.b),
                Ct.setXYZ(7, tt.r, tt.g, tt.b),
                Ct.setXYZ(8, tt.r, tt.g, tt.b),
                Ct.setXYZ(9, tt.r, tt.g, tt.b),
                Ct.setXYZ(10, tt.r, tt.g, tt.b),
                Ct.setXYZ(11, tt.r, tt.g, tt.b),
                Ct.setXYZ(12, tt.r, tt.g, tt.b),
                Ct.setXYZ(13, tt.r, tt.g, tt.b),
                Ct.setXYZ(14, tt.r, tt.g, tt.b),
                Ct.setXYZ(15, tt.r, tt.g, tt.b),
                Ct.setXYZ(16, tt.r, tt.g, tt.b),
                Ct.setXYZ(17, tt.r, tt.g, tt.b),
                Ct.setXYZ(18, tt.r, tt.g, tt.b),
                Ct.setXYZ(19, tt.r, tt.g, tt.b),
                Ct.setXYZ(20, tt.r, tt.g, tt.b),
                Ct.setXYZ(21, tt.r, tt.g, tt.b),
                Ct.setXYZ(22, tt.r, tt.g, tt.b),
                Ct.setXYZ(23, tt.r, tt.g, tt.b),
                Ct.setXYZ(24, lt.r, lt.g, lt.b),
                Ct.setXYZ(25, lt.r, lt.g, lt.b),
                Ct.setXYZ(26, lt.r, lt.g, lt.b),
                Ct.setXYZ(27, lt.r, lt.g, lt.b),
                Ct.setXYZ(28, lt.r, lt.g, lt.b),
                Ct.setXYZ(29, lt.r, lt.g, lt.b),
                Ct.setXYZ(30, lt.r, lt.g, lt.b),
                Ct.setXYZ(31, lt.r, lt.g, lt.b),
                Ct.setXYZ(32, mt.r, mt.g, mt.b),
                Ct.setXYZ(33, mt.r, mt.g, mt.b),
                Ct.setXYZ(34, mt.r, mt.g, mt.b),
                Ct.setXYZ(35, mt.r, mt.g, mt.b),
                Ct.setXYZ(36, mt.r, mt.g, mt.b),
                Ct.setXYZ(37, mt.r, mt.g, mt.b),
                Ct.setXYZ(38, ft.r, ft.g, ft.b),
                Ct.setXYZ(39, ft.r, ft.g, ft.b),
                Ct.setXYZ(40, xt.r, xt.g, xt.b),
                Ct.setXYZ(41, xt.r, xt.g, xt.b),
                Ct.setXYZ(42, xt.r, xt.g, xt.b),
                Ct.setXYZ(43, xt.r, xt.g, xt.b),
                Ct.setXYZ(44, xt.r, xt.g, xt.b),
                Ct.setXYZ(45, xt.r, xt.g, xt.b),
                Ct.setXYZ(46, xt.r, xt.g, xt.b),
                Ct.setXYZ(47, xt.r, xt.g, xt.b),
                Ct.setXYZ(48, xt.r, xt.g, xt.b),
                Ct.setXYZ(49, xt.r, xt.g, xt.b),
                Ct.needsUpdate = !0
            }
            update() {
                const tt = this.geometry
                  , lt = this.pointMap;
                rs.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),
                os("c", lt, tt, rs, 0, 0, -1),
                os("t", lt, tt, rs, 0, 0, 1),
                os("n1", lt, tt, rs, -1, -1, -1),
                os("n2", lt, tt, rs, 1, -1, -1),
                os("n3", lt, tt, rs, -1, 1, -1),
                os("n4", lt, tt, rs, 1, 1, -1),
                os("f1", lt, tt, rs, -1, -1, 1),
                os("f2", lt, tt, rs, 1, -1, 1),
                os("f3", lt, tt, rs, -1, 1, 1),
                os("f4", lt, tt, rs, 1, 1, 1),
                os("u1", lt, tt, rs, .7, 1.1, -1),
                os("u2", lt, tt, rs, -.7, 1.1, -1),
                os("u3", lt, tt, rs, 0, 2, -1),
                os("cf1", lt, tt, rs, -1, 0, 1),
                os("cf2", lt, tt, rs, 1, 0, 1),
                os("cf3", lt, tt, rs, 0, -1, 1),
                os("cf4", lt, tt, rs, 0, 1, 1),
                os("cn1", lt, tt, rs, -1, 0, -1),
                os("cn2", lt, tt, rs, 1, 0, -1),
                os("cn3", lt, tt, rs, 0, -1, -1),
                os("cn4", lt, tt, rs, 0, 1, -1),
                tt.getAttribute("position").needsUpdate = !0
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        function os(Tt, tt, lt, mt, ft, xt, Ct) {
            h0.set(ft, xt, Ct).unproject(mt);
            const Mt = tt[Tt];
            if (Mt !== void 0) {
                const Lt = lt.getAttribute("position");
                for (let Nt = 0, jt = Mt.length; Nt < jt; Nt++)
                    Lt.setXYZ(Mt[Nt], h0.x, h0.y, h0.z)
            }
        }
        const m0 = new Tl;
        class mE extends iu {
            constructor(tt, lt=16776960) {
                const mt = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7])
                  , ft = new Float32Array(24)
                  , xt = new bo;
                xt.setIndex(new mr(mt,1)),
                xt.setAttribute("position", new mr(ft,3)),
                super(xt, new Gs({
                    color: lt,
                    toneMapped: !1
                })),
                this.object = tt,
                this.type = "BoxHelper",
                this.matrixAutoUpdate = !1,
                this.update()
            }
            update(tt) {
                if (tt !== void 0 && console.warn("THREE.BoxHelper: .update() has no longer arguments."),
                this.object !== void 0 && m0.setFromObject(this.object),
                m0.isEmpty())
                    return;
                const lt = m0.min
                  , mt = m0.max
                  , ft = this.geometry.attributes.position
                  , xt = ft.array;
                xt[0] = mt.x,
                xt[1] = mt.y,
                xt[2] = mt.z,
                xt[3] = lt.x,
                xt[4] = mt.y,
                xt[5] = mt.z,
                xt[6] = lt.x,
                xt[7] = lt.y,
                xt[8] = mt.z,
                xt[9] = mt.x,
                xt[10] = lt.y,
                xt[11] = mt.z,
                xt[12] = mt.x,
                xt[13] = mt.y,
                xt[14] = lt.z,
                xt[15] = lt.x,
                xt[16] = mt.y,
                xt[17] = lt.z,
                xt[18] = lt.x,
                xt[19] = lt.y,
                xt[20] = lt.z,
                xt[21] = mt.x,
                xt[22] = lt.y,
                xt[23] = lt.z,
                ft.needsUpdate = !0,
                this.geometry.computeBoundingSphere()
            }
            setFromObject(tt) {
                return this.object = tt,
                this.update(),
                this
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.object = tt.object,
                this
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        class fE extends iu {
            constructor(tt, lt=16776960) {
                const mt = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7])
                  , ft = new bo;
                ft.setIndex(new mr(mt,1)),
                ft.setAttribute("position", new Fn([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1],3)),
                super(ft, new Gs({
                    color: lt,
                    toneMapped: !1
                })),
                this.box = tt,
                this.type = "Box3Helper",
                this.geometry.computeBoundingSphere()
            }
            updateMatrixWorld(tt) {
                const lt = this.box;
                lt.isEmpty() || (lt.getCenter(this.position),
                lt.getSize(this.scale),
                this.scale.multiplyScalar(.5),
                super.updateMatrixWorld(tt))
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        class gE extends ep {
            constructor(tt, lt=1, mt=16776960) {
                const ft = mt
                  , xt = new bo;
                xt.setAttribute("position", new Fn([1, -1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0],3)),
                xt.computeBoundingSphere(),
                super(xt, new Gs({
                    color: ft,
                    toneMapped: !1
                })),
                this.type = "PlaneHelper",
                this.plane = tt,
                this.size = lt;
                const Ct = new bo;
                Ct.setAttribute("position", new Fn([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0],3)),
                Ct.computeBoundingSphere(),
                this.add(new gs(Ct,new nu({
                    color: ft,
                    opacity: .2,
                    transparent: !0,
                    depthWrite: !1,
                    toneMapped: !1
                })))
            }
            updateMatrixWorld(tt) {
                this.position.set(0, 0, 0),
                this.scale.set(.5 * this.size, .5 * this.size, 1),
                this.lookAt(this.plane.normal),
                this.translateZ(-this.plane.constant),
                super.updateMatrixWorld(tt)
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose(),
                this.children[0].geometry.dispose(),
                this.children[0].material.dispose()
            }
        }
        const iw = new Er;
        let f0, My;
        class _E extends Mo {
            constructor(tt=new Er(0,0,1), lt=new Er(0,0,0), mt=1, ft=16776960, xt=.2 * mt, Ct=.2 * xt) {
                super(),
                this.type = "ArrowHelper",
                f0 === void 0 && (f0 = new bo,
                f0.setAttribute("position", new Fn([0, 0, 0, 0, 1, 0],3)),
                My = new Im(0,.5,1,5,1),
                My.translate(0, -.5, 0)),
                this.position.copy(lt),
                this.line = new ep(f0,new Gs({
                    color: ft,
                    toneMapped: !1
                })),
                this.line.matrixAutoUpdate = !1,
                this.add(this.line),
                this.cone = new gs(My,new nu({
                    color: ft,
                    toneMapped: !1
                })),
                this.cone.matrixAutoUpdate = !1,
                this.add(this.cone),
                this.setDirection(tt),
                this.setLength(mt, xt, Ct)
            }
            setDirection(tt) {
                if (tt.y > .99999)
                    this.quaternion.set(0, 0, 0, 1);
                else if (tt.y < -.99999)
                    this.quaternion.set(1, 0, 0, 0);
                else {
                    iw.set(tt.z, 0, -tt.x).normalize();
                    const lt = Math.acos(tt.y);
                    this.quaternion.setFromAxisAngle(iw, lt)
                }
            }
            setLength(tt, lt=.2 * tt, mt=.2 * lt) {
                this.line.scale.set(1, Math.max(1e-4, tt - lt), 1),
                this.line.updateMatrix(),
                this.cone.scale.set(mt, lt, mt),
                this.cone.position.y = tt,
                this.cone.updateMatrix()
            }
            setColor(tt) {
                this.line.material.color.set(tt),
                this.cone.material.color.set(tt)
            }
            copy(tt) {
                return super.copy(tt, !1),
                this.line.copy(tt.line),
                this.cone.copy(tt.cone),
                this
            }
            dispose() {
                this.line.geometry.dispose(),
                this.line.material.dispose(),
                this.cone.geometry.dispose(),
                this.cone.material.dispose()
            }
        }
        class vE extends iu {
            constructor(tt=1) {
                const lt = [0, 0, 0, tt, 0, 0, 0, 0, 0, 0, tt, 0, 0, 0, 0, 0, 0, tt]
                  , mt = new bo;
                mt.setAttribute("position", new Fn(lt,3)),
                mt.setAttribute("color", new Fn([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1],3)),
                super(mt, new Gs({
                    vertexColors: !0,
                    toneMapped: !1
                })),
                this.type = "AxesHelper"
            }
            setColors(tt, lt, mt) {
                const ft = new Gn
                  , xt = this.geometry.attributes.color.array;
                return ft.set(tt),
                ft.toArray(xt, 0),
                ft.toArray(xt, 3),
                ft.set(lt),
                ft.toArray(xt, 6),
                ft.toArray(xt, 9),
                ft.set(mt),
                ft.toArray(xt, 12),
                ft.toArray(xt, 15),
                this.geometry.attributes.color.needsUpdate = !0,
                this
            }
            dispose() {
                this.geometry.dispose(),
                this.material.dispose()
            }
        }
        class yE {
            constructor() {
                this.type = "ShapePath",
                this.color = new Gn,
                this.subPaths = [],
                this.currentPath = null
            }
            moveTo(tt, lt) {
                return this.currentPath = new E_,
                this.subPaths.push(this.currentPath),
                this.currentPath.moveTo(tt, lt),
                this
            }
            lineTo(tt, lt) {
                return this.currentPath.lineTo(tt, lt),
                this
            }
            quadraticCurveTo(tt, lt, mt, ft) {
                return this.currentPath.quadraticCurveTo(tt, lt, mt, ft),
                this
            }
            bezierCurveTo(tt, lt, mt, ft, xt, Ct) {
                return this.currentPath.bezierCurveTo(tt, lt, mt, ft, xt, Ct),
                this
            }
            splineThru(tt) {
                return this.currentPath.splineThru(tt),
                this
            }
            toShapes(tt) {
                function lt(Yt, sr) {
                    const er = sr.length;
                    let rr = !1;
                    for (let xr = er - 1, br = 0; br < er; xr = br++) {
                        let yr = sr[xr]
                          , Pr = sr[br]
                          , zr = Pr.x - yr.x
                          , Nr = Pr.y - yr.y;
                        if (Math.abs(Nr) > Number.EPSILON) {
                            if (Nr < 0 && (yr = sr[br],
                            zr = -zr,
                            Pr = sr[xr],
                            Nr = -Nr),
                            Yt.y < yr.y || Yt.y > Pr.y)
                                continue;
                            if (Yt.y === yr.y) {
                                if (Yt.x === yr.x)
                                    return !0
                            } else {
                                const Vr = Nr * (Yt.x - yr.x) - zr * (Yt.y - yr.y);
                                if (Vr === 0)
                                    return !0;
                                if (Vr < 0)
                                    continue;
                                rr = !rr
                            }
                        } else {
                            if (Yt.y !== yr.y)
                                continue;
                            if (Pr.x <= Yt.x && Yt.x <= yr.x || yr.x <= Yt.x && Yt.x <= Pr.x)
                                return !0
                        }
                    }
                    return rr
                }
                const mt = ou.isClockWise
                  , ft = this.subPaths;
                if (ft.length === 0)
                    return [];
                let xt, Ct, Mt;
                const Lt = [];
                if (ft.length === 1)
                    return Ct = ft[0],
                    Mt = new Pp,
                    Mt.curves = Ct.curves,
                    Lt.push(Mt),
                    Lt;
                let Nt = !mt(ft[0].getPoints());
                Nt = tt ? !Nt : Nt;
                const jt = []
                  , Wt = [];
                let Qt, qt, Xt = [], Zt = 0;
                Wt[Zt] = void 0,
                Xt[Zt] = [];
                for (let Yt = 0, sr = ft.length; Yt < sr; Yt++)
                    Ct = ft[Yt],
                    Qt = Ct.getPoints(),
                    xt = mt(Qt),
                    xt = tt ? !xt : xt,
                    xt ? (!Nt && Wt[Zt] && Zt++,
                    Wt[Zt] = {
                        s: new Pp,
                        p: Qt
                    },
                    Wt[Zt].s.curves = Ct.curves,
                    Nt && Zt++,
                    Xt[Zt] = []) : Xt[Zt].push({
                        h: Ct,
                        p: Qt[0]
                    });
                if (!Wt[0])
                    return function(Yt) {
                        const sr = [];
                        for (let er = 0, rr = Yt.length; er < rr; er++) {
                            const xr = Yt[er]
                              , br = new Pp;
                            br.curves = xr.curves,
                            sr.push(br)
                        }
                        return sr
                    }(ft);
                if (Wt.length > 1) {
                    let Yt = !1
                      , sr = 0;
                    for (let er = 0, rr = Wt.length; er < rr; er++)
                        jt[er] = [];
                    for (let er = 0, rr = Wt.length; er < rr; er++) {
                        const xr = Xt[er];
                        for (let br = 0; br < xr.length; br++) {
                            const yr = xr[br];
                            let Pr = !0;
                            for (let zr = 0; zr < Wt.length; zr++)
                                lt(yr.p, Wt[zr].p) && (er !== zr && sr++,
                                Pr ? (Pr = !1,
                                jt[zr].push(yr)) : Yt = !0);
                            Pr && jt[er].push(yr)
                        }
                    }
                    sr > 0 && Yt === !1 && (Xt = jt)
                }
                for (let Yt = 0, sr = Wt.length; Yt < sr; Yt++) {
                    Mt = Wt[Yt].s,
                    Lt.push(Mt),
                    qt = Xt[Yt];
                    for (let er = 0, rr = qt.length; er < rr; er++)
                        Mt.holes.push(qt[er].h)
                }
                return Lt
            }
        }
        typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{
            detail: {
                revision: h
            }
        })),
        typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = h)
    },
    149: function(d, o, c) {
        c.d(o, {
            Z: function() {
                return b
            }
        });
        var h = c(848);
        const _ = new WeakMap;
        class b extends h.aHM {
            constructor(it) {
                super(it),
                this.decoderPath = "",
                this.decoderConfig = {},
                this.decoderBinary = null,
                this.decoderPending = null,
                this.workerLimit = 4,
                this.workerPool = [],
                this.workerNextTaskID = 1,
                this.workerSourceURL = "",
                this.defaultAttributeIDs = {
                    position: "POSITION",
                    normal: "NORMAL",
                    color: "COLOR",
                    uv: "TEX_COORD"
                },
                this.defaultAttributeTypes = {
                    position: "Float32Array",
                    normal: "Float32Array",
                    color: "Float32Array",
                    uv: "Float32Array"
                }
            }
            setDecoderPath(it) {
                return this.decoderPath = it,
                this
            }
            setDecoderConfig(it) {
                return this.decoderConfig = it,
                this
            }
            setWorkerLimit(it) {
                return this.workerLimit = it,
                this
            }
            load(it, at, ut, pt) {
                const ht = new h.Y9S(this.manager);
                ht.setPath(this.path),
                ht.setResponseType("arraybuffer"),
                ht.setRequestHeader(this.requestHeader),
                ht.setWithCredentials(this.withCredentials),
                ht.load(it, _t => {
                    this.parse(_t, at, pt)
                }
                , ut, pt)
            }
            parse(it, at, ut) {
                this.decodeDracoFile(it, at, null, null, h.er$).catch(ut)
            }
            decodeDracoFile(it, at, ut, pt, ht=h.Zr2) {
                const _t = {
                    attributeIDs: ut || this.defaultAttributeIDs,
                    attributeTypes: pt || this.defaultAttributeTypes,
                    useUniqueIDs: !!ut,
                    vertexColorSpace: ht
                };
                return this.decodeGeometry(it, _t).then(at)
            }
            decodeGeometry(it, at) {
                const ut = JSON.stringify(at);
                if (_.has(it)) {
                    const bt = _.get(it);
                    if (bt.key === ut)
                        return bt.promise;
                    if (it.byteLength === 0)
                        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")
                }
                let pt;
                const ht = this.workerNextTaskID++
                  , _t = it.byteLength
                  , vt = this._getWorker(ht, _t).then(bt => (pt = bt,
                new Promise( (St, At) => {
                    pt._callbacks[ht] = {
                        resolve: St,
                        reject: At
                    },
                    pt.postMessage({
                        type: "decode",
                        id: ht,
                        taskConfig: at,
                        buffer: it
                    }, [it])
                }
                ))).then(bt => this._createGeometry(bt.geometry));
                return vt.catch( () => !0).then( () => {
                    pt && ht && this._releaseTask(pt, ht)
                }
                ),
                _.set(it, {
                    key: ut,
                    promise: vt
                }),
                vt
            }
            _createGeometry(it) {
                const at = new h.LoY;
                it.index && at.setIndex(new h.THS(it.index.array,1));
                for (let ut = 0; ut < it.attributes.length; ut++) {
                    const pt = it.attributes[ut]
                      , ht = pt.name
                      , _t = pt.array
                      , vt = pt.itemSize
                      , bt = new h.THS(_t,vt);
                    ht === "color" && (this._assignVertexColorSpace(bt, pt.vertexColorSpace),
                    bt.normalized = _t instanceof Float32Array == 0),
                    at.setAttribute(ht, bt)
                }
                return at
            }
            _assignVertexColorSpace(it, at) {
                if (at !== h.er$)
                    return;
                const ut = new h.Q1f;
                for (let pt = 0, ht = it.count; pt < ht; pt++)
                    ut.fromBufferAttribute(it, pt).convertSRGBToLinear(),
                    it.setXYZ(pt, ut.r, ut.g, ut.b)
            }
            _loadLibrary(it, at) {
                const ut = new h.Y9S(this.manager);
                return ut.setPath(this.decoderPath),
                ut.setResponseType(at),
                ut.setWithCredentials(this.withCredentials),
                new Promise( (pt, ht) => {
                    ut.load(it, pt, void 0, ht)
                }
                )
            }
            preload() {
                return this._initDecoder(),
                this
            }
            _initDecoder() {
                if (this.decoderPending)
                    return this.decoderPending;
                const it = typeof WebAssembly != "object" || this.decoderConfig.type === "js"
                  , at = [];
                return it ? at.push(this._loadLibrary("draco_decoder.js", "text")) : (at.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
                at.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
                this.decoderPending = Promise.all(at).then(ut => {
                    const pt = ut[0];
                    it || (this.decoderConfig.wasmBinary = ut[1]);
                    const ht = _e
                      , _t = ["/* draco decoder */", pt, "", "/* worker */", ht.substring(ht.indexOf("{") + 1, ht.lastIndexOf("}"))].join(`
`);
                    this.workerSourceURL = URL.createObjectURL(new Blob([_t]))
                }
                ),
                this.decoderPending
            }
            _getWorker(it, at) {
                return this._initDecoder().then( () => {
                    if (this.workerPool.length < this.workerLimit) {
                        const pt = new Worker(this.workerSourceURL);
                        pt._callbacks = {},
                        pt._taskCosts = {},
                        pt._taskLoad = 0,
                        pt.postMessage({
                            type: "init",
                            decoderConfig: this.decoderConfig
                        }),
                        pt.onmessage = function(ht) {
                            const _t = ht.data;
                            switch (_t.type) {
                            case "decode":
                                pt._callbacks[_t.id].resolve(_t);
                                break;
                            case "error":
                                pt._callbacks[_t.id].reject(_t);
                                break;
                            default:
                                console.error('THREE.DRACOLoader: Unexpected message, "' + _t.type + '"')
                            }
                        }
                        ,
                        this.workerPool.push(pt)
                    } else
                        this.workerPool.sort(function(pt, ht) {
                            return pt._taskLoad > ht._taskLoad ? -1 : 1
                        });
                    const ut = this.workerPool[this.workerPool.length - 1];
                    return ut._taskCosts[it] = at,
                    ut._taskLoad += at,
                    ut
                }
                )
            }
            _releaseTask(it, at) {
                it._taskLoad -= it._taskCosts[at],
                delete it._callbacks[at],
                delete it._taskCosts[at]
            }
            debug() {
                console.log("Task load: ", this.workerPool.map(it => it._taskLoad))
            }
            dispose() {
                for (let it = 0; it < this.workerPool.length; ++it)
                    this.workerPool[it].terminate();
                return this.workerPool.length = 0,
                this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL),
                this
            }
        }
        const _e = `
function DRACOWorker() {

	let decoderConfig;
	let decoderPending;

	onmessage = function ( e ) {

		const message = e.data;

		switch ( message.type ) {

			case 'init':
				decoderConfig = message.decoderConfig;
				decoderPending = new Promise( function ( resolve/*, reject*/ ) {

					decoderConfig.onModuleLoaded = function ( draco ) {

						// Module is Promise-like. Wrap before resolving to avoid loop.
						resolve( { draco: draco } );

					};

					DracoDecoderModule( decoderConfig ); // eslint-disable-line no-undef

				} );
				break;

			case 'decode':
				const buffer = message.buffer;
				const taskConfig = message.taskConfig;
				decoderPending.then( ( module ) => {

					const draco = module.draco;
					const decoder = new draco.Decoder();

					try {

						const geometry = decodeGeometry( draco, decoder, new Int8Array( buffer ), taskConfig );

						const buffers = geometry.attributes.map( ( attr ) => attr.array.buffer );

						if ( geometry.index ) buffers.push( geometry.index.array.buffer );

						self.postMessage( { type: 'decode', id: message.id, geometry }, buffers );

					} catch ( error ) {

						console.error( error );

						self.postMessage( { type: 'error', id: message.id, error: error.message } );

					} finally {

						draco.destroy( decoder );

					}

				} );
				break;

		}

	};

	function decodeGeometry( draco, decoder, array, taskConfig ) {

		const attributeIDs = taskConfig.attributeIDs;
		const attributeTypes = taskConfig.attributeTypes;

		let dracoGeometry;
		let decodingStatus;

		const geometryType = decoder.GetEncodedGeometryType( array );

		if ( geometryType === draco.TRIANGULAR_MESH ) {

			dracoGeometry = new draco.Mesh();
			decodingStatus = decoder.DecodeArrayToMesh( array, array.byteLength, dracoGeometry );

		} else if ( geometryType === draco.POINT_CLOUD ) {

			dracoGeometry = new draco.PointCloud();
			decodingStatus = decoder.DecodeArrayToPointCloud( array, array.byteLength, dracoGeometry );

		} else {

			throw new Error( 'THREE.DRACOLoader: Unexpected geometry type.' );

		}

		if ( ! decodingStatus.ok() || dracoGeometry.ptr === 0 ) {

			throw new Error( 'THREE.DRACOLoader: Decoding failed: ' + decodingStatus.error_msg() );

		}

		const geometry = { index: null, attributes: [] };

		// Gather all vertex attributes.
		for ( const attributeName in attributeIDs ) {

			const attributeType = self[ attributeTypes[ attributeName ] ];

			let attribute;
			let attributeID;

			// A Draco file may be created with default vertex attributes, whose attribute IDs
			// are mapped 1:1 from their semantic name (POSITION, NORMAL, ...). Alternatively,
			// a Draco file may contain a custom set of attributes, identified by known unique
			// IDs. glTF files always do the latter, and .drc files typically do the former.
			if ( taskConfig.useUniqueIDs ) {

				attributeID = attributeIDs[ attributeName ];
				attribute = decoder.GetAttributeByUniqueId( dracoGeometry, attributeID );

			} else {

				attributeID = decoder.GetAttributeId( dracoGeometry, draco[ attributeIDs[ attributeName ] ] );

				if ( attributeID === - 1 ) continue;

				attribute = decoder.GetAttribute( dracoGeometry, attributeID );

			}

			const attributeResult = decodeAttribute( draco, decoder, dracoGeometry, attributeName, attributeType, attribute );

			if ( attributeName === 'color' ) {

				attributeResult.vertexColorSpace = taskConfig.vertexColorSpace;

			}

			geometry.attributes.push( attributeResult );

		}

		// Add index.
		if ( geometryType === draco.TRIANGULAR_MESH ) {

			geometry.index = decodeIndex( draco, decoder, dracoGeometry );

		}

		draco.destroy( dracoGeometry );

		return geometry;

	}

	function decodeIndex( draco, decoder, dracoGeometry ) {

		const numFaces = dracoGeometry.num_faces();
		const numIndices = numFaces * 3;
		const byteLength = numIndices * 4;

		const ptr = draco._malloc( byteLength );
		decoder.GetTrianglesUInt32Array( dracoGeometry, byteLength, ptr );
		const index = new Uint32Array( draco.HEAPF32.buffer, ptr, numIndices ).slice();
		draco._free( ptr );

		return { array: index, itemSize: 1 };

	}

	function decodeAttribute( draco, decoder, dracoGeometry, attributeName, attributeType, attribute ) {

		const numComponents = attribute.num_components();
		const numPoints = dracoGeometry.num_points();
		const numValues = numPoints * numComponents;
		const byteLength = numValues * attributeType.BYTES_PER_ELEMENT;
		const dataType = getDracoDataType( draco, attributeType );

		const ptr = draco._malloc( byteLength );
		decoder.GetAttributeDataArrayForAllPoints( dracoGeometry, attribute, dataType, byteLength, ptr );
		const array = new attributeType( draco.HEAPF32.buffer, ptr, numValues ).slice();
		draco._free( ptr );

		return {
			name: attributeName,
			array: array,
			itemSize: numComponents
		};

	}

	function getDracoDataType( draco, attributeType ) {

		switch ( attributeType ) {

			case Float32Array: return draco.DT_FLOAT32;
			case Int8Array: return draco.DT_INT8;
			case Int16Array: return draco.DT_INT16;
			case Int32Array: return draco.DT_INT32;
			case Uint8Array: return draco.DT_UINT8;
			case Uint16Array: return draco.DT_UINT16;
			case Uint32Array: return draco.DT_UINT32;

		}

	}

}

export default er;
