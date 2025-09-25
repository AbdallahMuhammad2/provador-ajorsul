/* Standalone Class: Sv */

class Sv extends xv {
            constructor(tt=-1, lt=1, mt=1, ft=-1, xt=.1, Ct=2e3) {
                super(),
                this.isOrthographicCamera = !0,
                this.type = "OrthographicCamera",
                this.zoom = 1,
                this.view = null,
                this.left = tt,
                this.right = lt,
                this.top = mt,
                this.bottom = ft,
                this.near = xt,
                this.far = Ct,
                this.updateProjectionMatrix()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.left = tt.left,
                this.right = tt.right,
                this.top = tt.top,
                this.bottom = tt.bottom,
                this.near = tt.near,
                this.far = tt.far,
                this.zoom = tt.zoom,
                this.view = tt.view === null ? null : Object.assign({}, tt.view),
                this
            }
            setViewOffset(tt, lt, mt, ft, xt, Ct) {
                this.view === null && (this.view = {
                    enabled: !0,
                    fullWidth: 1,
                    fullHeight: 1,
                    offsetX: 0,
                    offsetY: 0,
                    width: 1,
                    height: 1
                }),
                this.view.enabled = !0,
                this.view.fullWidth = tt,
                this.view.fullHeight = lt,
                this.view.offsetX = mt,
                this.view.offsetY = ft,
                this.view.width = xt,
                this.view.height = Ct,
                this.updateProjectionMatrix()
            }
            clearViewOffset() {
                this.view !== null && (this.view.enabled = !1),
                this.updateProjectionMatrix()
            }
            updateProjectionMatrix() {
                const tt = (this.right - this.left) / (2 * this.zoom)
                  , lt = (this.top - this.bottom) / (2 * this.zoom)
                  , mt = (this.right + this.left) / 2
                  , ft = (this.top + this.bottom) / 2;
                let xt = mt - tt
                  , Ct = mt + tt
                  , Mt = ft + lt
                  , Lt = ft - lt;
                if (this.view !== null && this.view.enabled) {
                    const Nt = (this.right - this.left) / this.view.fullWidth / this.zoom
                      , jt = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                    xt += Nt * this.view.offsetX,
                    Ct = xt + Nt * this.view.width,
                    Mt -= jt * this.view.offsetY,
                    Lt = Mt - jt * this.view.height
                }
                this.projectionMatrix.makeOrthographic(xt, Ct, Mt, Lt, this.near, this.far, this.coordinateSystem),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.object.zoom = this.zoom,
                lt.object.left = this.left,
                lt.object.right = this.right,
                lt.object.top = this.top,
                lt.object.bottom = this.bottom,
                lt.object.near = this.near,
                lt.object.far = this.far,
                this.view !== null && (lt.object.view = Object.assign({}, this.view)),
                lt
            }
        }
        const Qy = [.125, .215, .35, .446, .526, .582]
          , U0 = new Sv
          , Wy = new Gn;
        let j0 = null;
        const Tp = (1 + Math.sqrt(5)) / 2
          , xm = 1 / Tp
          , qy = [new Er(1,1,1), new Er(-1,1,1), new Er(1,1,-1), new Er(-1,1,-1), new Er(0,Tp,xm), new Er(0,Tp,-xm), new Er(xm,0,Tp), new Er(-xm,0,Tp), new Er(Tp,xm,0), new Er(-Tp,xm,0)];
        class V0 {
            constructor(tt) {
                this._renderer = tt,
                this._pingPongRenderTarget = null,
                this._lodMax = 0,
                this._cubeSize = 0,
                this._lodPlanes = [],
                this._sizeLods = [],
                this._sigmas = [],
                this._blurMaterial = null,
                this._cubemapMaterial = null,
                this._equirectMaterial = null,
                this._compileMaterial(this._blurMaterial)
            }
            fromScene(tt, lt=0, mt=.1, ft=100) {
                j0 = this._renderer.getRenderTarget(),
                this._setSize(256);
                const xt = this._allocateTargets();
                return xt.depthBuffer = !0,
                this._sceneToCubeUV(tt, mt, ft, xt),
                lt > 0 && this._blur(xt, 0, 0, lt),
                this._applyPMREM(xt),
                this._cleanup(xt),
                xt
            }
            fromEquirectangular(tt, lt=null) {
                return this._fromTexture(tt, lt)
            }
            fromCubemap(tt, lt=null) {
                return this._fromTexture(tt, lt)
            }
            compileCubemapShader() {
                this._cubemapMaterial === null && (this._cubemapMaterial = Yy(),
                this._compileMaterial(this._cubemapMaterial))
            }
            compileEquirectangularShader() {
                this._equirectMaterial === null && (this._equirectMaterial = Xy(),
                this._compileMaterial(this._equirectMaterial))
            }
            dispose() {
                this._dispose(),
                this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
                this._equirectMaterial !== null && this._equirectMaterial.dispose()
            }
            _setSize(tt) {
                this._lodMax = Math.floor(Math.log2(tt)),
                this._cubeSize = Math.pow(2, this._lodMax)
            }
            _dispose() {
                this._blurMaterial !== null && this._blurMaterial.dispose(),
                this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
                for (let tt = 0; tt < this._lodPlanes.length; tt++)
                    this._lodPlanes[tt].dispose()
            }
            _cleanup(tt) {
                this._renderer.setRenderTarget(j0),
                tt.scissorTest = !1,
                Ev(tt, 0, 0, tt.width, tt.height)
            }
            _fromTexture(tt, lt) {
                tt.mapping === Qr || tt.mapping === Or ? this._setSize(tt.image.length === 0 ? 16 : tt.image[0].width || tt.image[0].image.width) : this._setSize(tt.image.width / 4),
                j0 = this._renderer.getRenderTarget();
                const mt = lt || this._allocateTargets();
                return this._textureToCubeUV(tt, mt),
                this._applyPMREM(mt),
                this._cleanup(mt),
                mt
            }
            _allocateTargets() {
                const tt = 3 * Math.max(this._cubeSize, 112)
                  , lt = 4 * this._cubeSize
                  , mt = {
                    magFilter: Rn,
                    minFilter: Rn,
                    generateMipmaps: !1,
                    type: Os,
                    format: as,
                    colorSpace: Xo,
                    depthBuffer: !1
                }
                  , ft = $y(tt, lt, mt);
                if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== tt || this._pingPongRenderTarget.height !== lt) {
                    this._pingPongRenderTarget !== null && this._dispose(),
                    this._pingPongRenderTarget = $y(tt, lt, mt);
                    const {_lodMax: xt} = this;
                    ({sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas} = function(Ct) {
                        const Mt = []
                          , Lt = []
                          , Nt = [];
                        let jt = Ct;
                        const Wt = Ct - 4 + 1 + Qy.length;
                        for (let Qt = 0; Qt < Wt; Qt++) {
                            const qt = Math.pow(2, jt);
                            Lt.push(qt);
                            let Xt = 1 / qt;
                            Qt > Ct - 4 ? Xt = Qy[Qt - Ct + 4 - 1] : Qt === 0 && (Xt = 0),
                            Nt.push(Xt);
                            const Zt = 1 / (qt - 2)
                              , Yt = -Zt
                              , sr = 1 + Zt
                              , er = [Yt, Yt, sr, Yt, sr, sr, Yt, Yt, sr, sr, Yt, sr]
                              , rr = 6
                              , xr = 6
                              , br = 3
                              , yr = 2
                              , Pr = 1
                              , zr = new Float32Array(br * xr * rr)
                              , Nr = new Float32Array(yr * xr * rr)
                              , Vr = new Float32Array(Pr * xr * rr);
                            for (let Hr = 0; Hr < rr; Hr++) {
                                const _n = Hr % 3 * 2 / 3 - 1
                                  , dn = Hr > 2 ? 0 : -1
                                  , kn = [_n, dn, 0, _n + 2 / 3, dn, 0, _n + 2 / 3, dn + 1, 0, _n, dn, 0, _n + 2 / 3, dn + 1, 0, _n, dn + 1, 0];
                                zr.set(kn, br * xr * Hr),
                                Nr.set(er, yr * xr * Hr);
                                const Bn = [Hr, Hr, Hr, Hr, Hr, Hr];
                                Vr.set(Bn, Pr * xr * Hr)
                            }
                            const Gr = new bo;
                            Gr.setAttribute("position", new mr(zr,br)),
                            Gr.setAttribute("uv", new mr(Nr,yr)),
                            Gr.setAttribute("faceIndex", new mr(Vr,Pr)),
                            Mt.push(Gr),
                            jt > 4 && jt--
                        }
                        return {
                            lodPlanes: Mt,
                            sizeLods: Lt,
                            sigmas: Nt
                        }
                    }(xt)),
                    this._blurMaterial = function(Ct, Mt, Lt) {
                        const Nt = new Float32Array(20)
                          , jt = new Er(0,1,0);
                        return new zl({
                            name: "SphericalGaussianBlur",
                            defines: {
                                n: 20,
                                CUBEUV_TEXEL_WIDTH: 1 / Mt,
                                CUBEUV_TEXEL_HEIGHT: 1 / Lt,
                                CUBEUV_MAX_MIP: `${Ct}.0`
                            },
                            uniforms: {
                                envMap: {
                                    value: null
                                },
                                samples: {
                                    value: 1
                                },
                                weights: {
                                    value: Nt
                                },
                                latitudinal: {
                                    value: !1
                                },
                                dTheta: {
                                    value: 0
                                },
                                mipInt: {
                                    value: 0
                                },
                                poleAxis: {
                                    value: jt
                                }
                            },
                            vertexShader: `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`,
                            fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
                            blending: Et,
                            depthTest: !1,
                            depthWrite: !1
                        })
                    }(xt, tt, lt)
                }
                return ft
            }
            _compileMaterial(tt) {
                const lt = new gs(this._lodPlanes[0],tt);
                this._renderer.compile(lt, U0)
            }
            _sceneToCubeUV(tt, lt, mt, ft) {
                const xt = new Cs(90,1,lt,mt)
                  , Ct = [1, -1, 1, 1, 1, 1]
                  , Mt = [1, 1, 1, -1, -1, -1]
                  , Lt = this._renderer
                  , Nt = Lt.autoClear
                  , jt = Lt.toneMapping;
                Lt.getClearColor(Wy),
                Lt.toneMapping = Ur,
                Lt.autoClear = !1;
                const Wt = new nu({
                    name: "PMREM.Background",
                    side: bt,
                    depthWrite: !1,
                    depthTest: !1
                })
                  , Qt = new gs(new Zu,Wt);
                let qt = !1;
                const Xt = tt.background;
                Xt ? Xt.isColor && (Wt.color.copy(Xt),
                tt.background = null,
                qt = !0) : (Wt.color.copy(Wy),
                qt = !0);
                for (let Zt = 0; Zt < 6; Zt++) {
                    const Yt = Zt % 3;
                    Yt === 0 ? (xt.up.set(0, Ct[Zt], 0),
                    xt.lookAt(Mt[Zt], 0, 0)) : Yt === 1 ? (xt.up.set(0, 0, Ct[Zt]),
                    xt.lookAt(0, Mt[Zt], 0)) : (xt.up.set(0, Ct[Zt], 0),
                    xt.lookAt(0, 0, Mt[Zt]));
                    const sr = this._cubeSize;
                    Ev(ft, Yt * sr, Zt > 2 ? sr : 0, sr, sr),
                    Lt.setRenderTarget(ft),
                    qt && Lt.render(Qt, xt),
                    Lt.render(tt, xt)
                }
                Qt.geometry.dispose(),
                Qt.material.dispose(),
                Lt.toneMapping = jt,
                Lt.autoClear = Nt,
                tt.background = Xt
            }
            _textureToCubeUV(tt, lt) {
                const mt = this._renderer
                  , ft = tt.mapping === Qr || tt.mapping === Or;
                ft ? (this._cubemapMaterial === null && (this._cubemapMaterial = Yy()),
                this._cubemapMaterial.uniforms.flipEnvMap.value = tt.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Xy());
                const xt = ft ? this._cubemapMaterial : this._equirectMaterial
                  , Ct = new gs(this._lodPlanes[0],xt);
                xt.uniforms.envMap.value = tt;
                const Mt = this._cubeSize;
                Ev(lt, 0, 0, 3 * Mt, 2 * Mt),
                mt.setRenderTarget(lt),
                mt.render(Ct, U0)
            }
            _applyPMREM(tt) {
                const lt = this._renderer
                  , mt = lt.autoClear;
                lt.autoClear = !1;
                for (let ft = 1; ft < this._lodPlanes.length; ft++) {
                    const xt = Math.sqrt(this._sigmas[ft] * this._sigmas[ft] - this._sigmas[ft - 1] * this._sigmas[ft - 1])
                      , Ct = qy[(ft - 1) % qy.length];
                    this._blur(tt, ft - 1, ft, xt, Ct)
                }
                lt.autoClear = mt
            }
            _blur(tt, lt, mt, ft, xt) {
                const Ct = this._pingPongRenderTarget;
                this._halfBlur(tt, Ct, lt, mt, ft, "latitudinal", xt),
                this._halfBlur(Ct, tt, mt, mt, ft, "longitudinal", xt)
            }
            _halfBlur(tt, lt, mt, ft, xt, Ct, Mt) {
                const Lt = this._renderer
                  , Nt = this._blurMaterial;
                Ct !== "latitudinal" && Ct !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
                const jt = new gs(this._lodPlanes[ft],Nt)
                  , Wt = Nt.uniforms
                  , Qt = this._sizeLods[mt] - 1
                  , qt = isFinite(xt) ? Math.PI / (2 * Qt) : 2 * Math.PI / 39
                  , Xt = xt / qt
                  , Zt = isFinite(xt) ? 1 + Math.floor(3 * Xt) : 20;
                Zt > 20 && console.warn(`sigmaRadians, ${xt}, is too large and will clip, as it requested ${Zt} samples when the maximum is set to 20`);
                const Yt = [];
                let sr = 0;
                for (let xr = 0; xr < 20; ++xr) {
                    const br = xr / Xt
                      , yr = Math.exp(-br * br / 2);
                    Yt.push(yr),
                    xr === 0 ? sr += yr : xr < Zt && (sr += 2 * yr)
                }
                for (let xr = 0; xr < Yt.length; xr++)
                    Yt[xr] = Yt[xr] / sr;
                Wt.envMap.value = tt.texture,
                Wt.samples.value = Zt,
                Wt.weights.value = Yt,
                Wt.latitudinal.value = Ct === "latitudinal",
                Mt && (Wt.poleAxis.value = Mt);
                const {_lodMax: er} = this;
                Wt.dTheta.value = qt,
                Wt.mipInt.value = er - mt;
                const rr = this._sizeLods[ft];
                Ev(lt, 3 * rr * (ft > er - 4 ? ft - er + 4 : 0), 4 * (this._cubeSize - rr), 3 * rr, 2 * rr),
                Lt.setRenderTarget(lt),
                Lt.render(jt, U0)
            }
        }
        function $y(Tt, tt, lt) {
            const mt = new Rs(Tt,tt,lt);
            return mt.texture.mapping = Mn,
            mt.texture.name = "PMREM.cubeUv",
            mt.scissorTest = !0,
            mt
        }
        function Ev(Tt, tt, lt, mt, ft) {
            Tt.viewport.set(tt, lt, mt, ft),
            Tt.scissor.set(tt, lt, mt, ft)
        }
        function Xy() {
            return new zl({
                name: "EquirectangularToCubeUV",
                uniforms: {
                    envMap: {
                        value: null
                    }
                },
                vertexShader: `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`,
                fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
                blending: Et,
                depthTest: !1,
                depthWrite: !1
            })
        }
        function Yy() {
            return new zl({
                name: "CubemapToCubeUV",
                uniforms: {
                    envMap: {
                        value: null
                    },
                    flipEnvMap: {
                        value: -1
                    }
                },
                vertexShader: `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`,
                fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
                blending: Et,
                depthTest: !1,
                depthWrite: !1
            })
        }
        function Iw(Tt) {
            let tt = new WeakMap
              , lt = null;
            function mt(ft) {
                const xt = ft.target;
                xt.removeEventListener("dispose", mt);
                const Ct = tt.get(xt);
                Ct !== void 0 && (tt.delete(xt),
                Ct.dispose())
            }
            return {
                get: function(ft) {
                    if (ft && ft.isTexture) {
                        const xt = ft.mapping
                          , Ct = xt === qr || xt === gn
                          , Mt = xt === Qr || xt === Or;
                        if (Ct || Mt) {
                            if (ft.isRenderTargetTexture && ft.needsPMREMUpdate === !0) {
                                ft.needsPMREMUpdate = !1;
                                let Lt = tt.get(ft);
                                return lt === null && (lt = new V0(Tt)),
                                Lt = Ct ? lt.fromEquirectangular(ft, Lt) : lt.fromCubemap(ft, Lt),
                                tt.set(ft, Lt),
                                Lt.texture
                            }
                            if (tt.has(ft))
                                return tt.get(ft).texture;
                            {
                                const Lt = ft.image;
                                if (Ct && Lt && Lt.height > 0 || Mt && Lt && function(Nt) {
                                    let jt = 0;
                                    for (let Wt = 0; Wt < 6; Wt++)
                                        Nt[Wt] !== void 0 && jt++;
                                    return jt === 6
                                }(Lt)) {
                                    lt === null && (lt = new V0(Tt));
                                    const Nt = Ct ? lt.fromEquirectangular(ft) : lt.fromCubemap(ft);
                                    return tt.set(ft, Nt),
                                    ft.addEventListener("dispose", mt),
                                    Nt.texture
                                }
                                return null
                            }
                        }
                    }
                    return ft
                },
                dispose: function() {
                    tt = new WeakMap,
                    lt !== null && (lt.dispose(),
                    lt = null)
                }
            }
        }
        function kw(Tt) {
            const tt = {};
            function lt(mt) {
                if (tt[mt] !== void 0)
                    return tt[mt];
                let ft;
                switch (mt) {
                case "WEBGL_depth_texture":
                    ft = Tt.getExtension("WEBGL_depth_texture") || Tt.getExtension("MOZ_WEBGL_depth_texture") || Tt.getExtension("WEBKIT_WEBGL_depth_texture");
                    break;
                case "EXT_texture_filter_anisotropic":
                    ft = Tt.getExtension("EXT_texture_filter_anisotropic") || Tt.getExtension("MOZ_EXT_texture_filter_anisotropic") || Tt.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case "WEBGL_compressed_texture_s3tc":
                    ft = Tt.getExtension("WEBGL_compressed_texture_s3tc") || Tt.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || Tt.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case "WEBGL_compressed_texture_pvrtc":
                    ft = Tt.getExtension("WEBGL_compressed_texture_pvrtc") || Tt.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    ft = Tt.getExtension(mt)
                }
                return tt[mt] = ft,
                ft
            }
            return {
                has: function(mt) {
                    return lt(mt) !== null
                },
                init: function(mt) {
                    mt.isWebGL2 ? lt("EXT_color_buffer_float") : (lt("WEBGL_depth_texture"),
                    lt("OES_texture_float"),
                    lt("OES_texture_half_float"),
                    lt("OES_texture_half_float_linear"),
                    lt("OES_standard_derivatives"),
                    lt("OES_element_index_uint"),
                    lt("OES_vertex_array_object"),
                    lt("ANGLE_instanced_arrays")),
                    lt("OES_texture_float_linear"),
                    lt("EXT_color_buffer_half_float"),
                    lt("WEBGL_multisampled_render_to_texture")
                },
                get: function(mt) {
                    const ft = lt(mt);
                    return ft === null && console.warn("THREE.WebGLRenderer: " + mt + " extension not supported."),
                    ft
                }
            }
        }
        function Dw(Tt, tt, lt, mt) {
            const ft = {}
              , xt = new WeakMap;
            function Ct(Lt) {
                const Nt = Lt.target;
                Nt.index !== null && tt.remove(Nt.index);
                for (const Wt in Nt.attributes)
                    tt.remove(Nt.attributes[Wt]);
                for (const Wt in Nt.morphAttributes) {
                    const Qt = Nt.morphAttributes[Wt];
                    for (let qt = 0, Xt = Qt.length; qt < Xt; qt++)
                        tt.remove(Qt[qt])
                }
                Nt.removeEventListener("dispose", Ct),
                delete ft[Nt.id];
                const jt = xt.get(Nt);
                jt && (tt.remove(jt),
                xt.delete(Nt)),
                mt.releaseStatesOfGeometry(Nt),
                Nt.isInstancedBufferGeometry === !0 && delete Nt._maxInstanceCount,
                lt.memory.geometries--
            }
            function Mt(Lt) {
                const Nt = []
                  , jt = Lt.index
                  , Wt = Lt.attributes.position;
                let Qt = 0;
                if (jt !== null) {
                    const Zt = jt.array;
                    Qt = jt.version;
                    for (let Yt = 0, sr = Zt.length; Yt < sr; Yt += 3) {
                        const er = Zt[Yt + 0]
                          , rr = Zt[Yt + 1]
                          , xr = Zt[Yt + 2];
                        Nt.push(er, rr, rr, xr, xr, er)
                    }
                } else {
                    if (Wt === void 0)
                        return;
                    {
                        const Zt = Wt.array;
                        Qt = Wt.version;
                        for (let Yt = 0, sr = Zt.length / 3 - 1; Yt < sr; Yt += 3) {
                            const er = Yt + 0
                              , rr = Yt + 1
                              , xr = Yt + 2;
                            Nt.push(er, rr, rr, xr, xr, er)
                        }
                    }
                }
                const qt = new (tv(Nt) ? Ts : co)(Nt,1);
                qt.version = Qt;
                const Xt = xt.get(Lt);
                Xt && tt.remove(Xt),
                xt.set(Lt, qt)
            }
            return {
                get: function(Lt, Nt) {
                    return ft[Nt.id] === !0 || (Nt.addEventListener("dispose", Ct),
                    ft[Nt.id] = !0,
                    lt.memory.geometries++),
                    Nt
                },
                update: function(Lt) {
                    const Nt = Lt.attributes;
                    for (const Wt in Nt)
                        tt.update(Nt[Wt], Tt.ARRAY_BUFFER);
                    const jt = Lt.morphAttributes;
                    for (const Wt in jt) {
                        const Qt = jt[Wt];
                        for (let qt = 0, Xt = Qt.length; qt < Xt; qt++)
                            tt.update(Qt[qt], Tt.ARRAY_BUFFER)
                    }
                },
                getWireframeAttribute: function(Lt) {
                    const Nt = xt.get(Lt);
                    if (Nt) {
                        const jt = Lt.index;
                        jt !== null && Nt.version < jt.version && Mt(Lt)
                    } else
                        Mt(Lt);
                    return xt.get(Lt)
                }
            }
        }
        function Bw(Tt, tt, lt, mt) {
            const ft = mt.isWebGL2;
            let xt, Ct, Mt;
            this.setMode = function(Lt) {
                xt = Lt
            }
            ,
            this.setIndex = function(Lt) {
                Ct = Lt.type,
                Mt = Lt.bytesPerElement
            }
            ,
            this.render = function(Lt, Nt) {
                Tt.drawElements(xt, Nt, Ct, Lt * Mt),
                lt.update(Nt, xt, 1)
            }
            ,
            this.renderInstances = function(Lt, Nt, jt) {
                if (jt === 0)
                    return;
                let Wt, Qt;
                if (ft)
                    Wt = Tt,
                    Qt = "drawElementsInstanced";
                else if (Wt = tt.get("ANGLE_instanced_arrays"),
                Qt = "drawElementsInstancedANGLE",
                Wt === null)
                    return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                Wt[Qt](xt, Nt, Ct, Lt * Mt, jt),
                lt.update(Nt, xt, jt)
            }
        }
        function Lw(Tt) {
            const tt = {
                frame: 0,
                calls: 0,
                triangles: 0,
                points: 0,
                lines: 0
            };
            return {
                memory: {
                    geometries: 0,
                    textures: 0
                },
                render: tt,
                programs: null,
                autoReset: !0,
                reset: function() {
                    tt.calls = 0,
                    tt.triangles = 0,
                    tt.points = 0,
                    tt.lines = 0
                },
                update: function(lt, mt, ft) {
                    switch (tt.calls++,
                    mt) {
                    case Tt.TRIANGLES:
                        tt.triangles += ft * (lt / 3);
                        break;
                    case Tt.LINES:
                        tt.lines += ft * (lt / 2);
                        break;
                    case Tt.LINE_STRIP:
                        tt.lines += ft * (lt - 1);
                        break;
                    case Tt.LINE_LOOP:
                        tt.lines += ft * lt;
                        break;
                    case Tt.POINTS:
                        tt.points += ft * lt;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", mt)
                    }
                }
            }
        }
        function Ow(Tt, tt) {
            return Tt[0] - tt[0]
        }
        function Nw(Tt, tt) {
            return Math.abs(tt[1]) - Math.abs(Tt[1])
        }
        function Fw(Tt, tt, lt) {
            const mt = {}
              , ft = new Float32Array(8)
              , xt = new WeakMap
              , Ct = new Lo
              , Mt = [];
            for (let Lt = 0; Lt < 8; Lt++)
                Mt[Lt] = [Lt, 0];
            return {
                update: function(Lt, Nt, jt) {
                    const Wt = Lt.morphTargetInfluences;
                    if (tt.isWebGL2 === !0) {
                        const Qt = Nt.morphAttributes.position || Nt.morphAttributes.normal || Nt.morphAttributes.color
                          , qt = Qt !== void 0 ? Qt.length : 0;
                        let Xt = xt.get(Nt);
                        if (Xt === void 0 || Xt.count !== qt) {
                            let _n = function() {
                                Gr.dispose(),
                                xt.delete(Nt),
                                Nt.removeEventListener("dispose", _n)
                            };
                            Xt !== void 0 && Xt.texture.dispose();
                            const sr = Nt.morphAttributes.position !== void 0
                              , er = Nt.morphAttributes.normal !== void 0
                              , rr = Nt.morphAttributes.color !== void 0
                              , xr = Nt.morphAttributes.position || []
                              , br = Nt.morphAttributes.normal || []
                              , yr = Nt.morphAttributes.color || [];
                            let Pr = 0;
                            sr === !0 && (Pr = 1),
                            er === !0 && (Pr = 2),
                            rr === !0 && (Pr = 3);
                            let zr = Nt.attributes.position.count * Pr
                              , Nr = 1;
                            zr > tt.maxTextureSize && (Nr = Math.ceil(zr / tt.maxTextureSize),
                            zr = tt.maxTextureSize);
                            const Vr = new Float32Array(zr * Nr * 4 * qt)
                              , Gr = new im(Vr,zr,Nr,qt);
                            Gr.type = ss,
                            Gr.needsUpdate = !0;
                            const Hr = 4 * Pr;
                            for (let dn = 0; dn < qt; dn++) {
                                const kn = xr[dn]
                                  , Bn = br[dn]
                                  , cn = yr[dn]
                                  , Yr = zr * Nr * 4 * dn;
                                for (let Jr = 0; Jr < kn.count; Jr++) {
                                    const sn = Jr * Hr;
                                    sr === !0 && (Ct.fromBufferAttribute(kn, Jr),
                                    Vr[Yr + sn + 0] = Ct.x,
                                    Vr[Yr + sn + 1] = Ct.y,
                                    Vr[Yr + sn + 2] = Ct.z,
                                    Vr[Yr + sn + 3] = 0),
                                    er === !0 && (Ct.fromBufferAttribute(Bn, Jr),
                                    Vr[Yr + sn + 4] = Ct.x,
                                    Vr[Yr + sn + 5] = Ct.y,
                                    Vr[Yr + sn + 6] = Ct.z,
                                    Vr[Yr + sn + 7] = 0),
                                    rr === !0 && (Ct.fromBufferAttribute(cn, Jr),
                                    Vr[Yr + sn + 8] = Ct.x,
                                    Vr[Yr + sn + 9] = Ct.y,
                                    Vr[Yr + sn + 10] = Ct.z,
                                    Vr[Yr + sn + 11] = cn.itemSize === 4 ? Ct.w : 1)
                                }
                            }
                            Xt = {
                                count: qt,
                                texture: Gr,
                                size: new mn(zr,Nr)
                            },
                            xt.set(Nt, Xt),
                            Nt.addEventListener("dispose", _n)
                        }
                        let Zt = 0;
                        for (let sr = 0; sr < Wt.length; sr++)
                            Zt += Wt[sr];
                        const Yt = Nt.morphTargetsRelative ? 1 : 1 - Zt;
                        jt.getUniforms().setValue(Tt, "morphTargetBaseInfluence", Yt),
                        jt.getUniforms().setValue(Tt, "morphTargetInfluences", Wt),
                        jt.getUniforms().setValue(Tt, "morphTargetsTexture", Xt.texture, lt),
                        jt.getUniforms().setValue(Tt, "morphTargetsTextureSize", Xt.size)
                    } else {
                        const Qt = Wt === void 0 ? 0 : Wt.length;
                        let qt = mt[Nt.id];
                        if (qt === void 0 || qt.length !== Qt) {
                            qt = [];
                            for (let er = 0; er < Qt; er++)
                                qt[er] = [er, 0];
                            mt[Nt.id] = qt
                        }
                        for (let er = 0; er < Qt; er++) {
                            const rr = qt[er];
                            rr[0] = er,
                            rr[1] = Wt[er]
                        }
                        qt.sort(Nw);
                        for (let er = 0; er < 8; er++)
                            er < Qt && qt[er][1] ? (Mt[er][0] = qt[er][0],
                            Mt[er][1] = qt[er][1]) : (Mt[er][0] = Number.MAX_SAFE_INTEGER,
                            Mt[er][1] = 0);
                        Mt.sort(Ow);
                        const Xt = Nt.morphAttributes.position
                          , Zt = Nt.morphAttributes.normal;
                        let Yt = 0;
                        for (let er = 0; er < 8; er++) {
                            const rr = Mt[er]
                              , xr = rr[0]
                              , br = rr[1];
                            xr !== Number.MAX_SAFE_INTEGER && br ? (Xt && Nt.getAttribute("morphTarget" + er) !== Xt[xr] && Nt.setAttribute("morphTarget" + er, Xt[xr]),
                            Zt && Nt.getAttribute("morphNormal" + er) !== Zt[xr] && Nt.setAttribute("morphNormal" + er, Zt[xr]),
                            ft[er] = br,
                            Yt += br) : (Xt && Nt.hasAttribute("morphTarget" + er) === !0 && Nt.deleteAttribute("morphTarget" + er),
                            Zt && Nt.hasAttribute("morphNormal" + er) === !0 && Nt.deleteAttribute("morphNormal" + er),
                            ft[er] = 0)
                        }
                        const sr = Nt.morphTargetsRelative ? 1 : 1 - Yt;
                        jt.getUniforms().setValue(Tt, "morphTargetBaseInfluence", sr),
                        jt.getUniforms().setValue(Tt, "morphTargetInfluences", ft)
                    }
                }
            }
        }
        function Uw(Tt, tt, lt, mt) {
            let ft = new WeakMap;
            function xt(Ct) {
                const Mt = Ct.target;
                Mt.removeEventListener("dispose", xt),
                lt.remove(Mt.instanceMatrix),
                Mt.instanceColor !== null && lt.remove(Mt.instanceColor)
            }
            return {
                update: function(Ct) {
                    const Mt = mt.render.frame
                      , Lt = Ct.geometry
                      , Nt = tt.get(Ct, Lt);
                    if (ft.get(Nt) !== Mt && (tt.update(Nt),
                    ft.set(Nt, Mt)),
                    Ct.isInstancedMesh && (Ct.hasEventListener("dispose", xt) === !1 && Ct.addEventListener("dispose", xt),
                    ft.get(Ct) !== Mt && (lt.update(Ct.instanceMatrix, Tt.ARRAY_BUFFER),
                    Ct.instanceColor !== null && lt.update(Ct.instanceColor, Tt.ARRAY_BUFFER),
                    ft.set(Ct, Mt))),
                    Ct.isSkinnedMesh) {
                        const jt = Ct.skeleton;
                        ft.get(jt) !== Mt && (jt.update(),
                        ft.set(jt, Mt))
                    }
                    return Nt
                },
                dispose: function() {
                    ft = new WeakMap
                }
            }
        }
        const Ky = new Ho
          , Jy = new im
          , Zy = new i_
          , ex = new f_
          , tx = []
          , rx = []
          , nx = new Float32Array(16)
          , ix = new Float32Array(9)
          , ox = new Float32Array(4);
        function bm(Tt, tt, lt) {
            const mt = Tt[0];
            if (mt <= 0 || mt > 0)
                return Tt;
            const ft = tt * lt;
            let xt = tx[ft];
            if (xt === void 0 && (xt = new Float32Array(ft),
            tx[ft] = xt),
            tt !== 0) {
                mt.toArray(xt, 0);
                for (let Ct = 1, Mt = 0; Ct !== tt; ++Ct)
                    Mt += lt,
                    Tt[Ct].toArray(xt, Mt)
            }
            return xt
        }
        function cs(Tt, tt) {
            if (Tt.length !== tt.length)
                return !1;
            for (let lt = 0, mt = Tt.length; lt < mt; lt++)
                if (Tt[lt] !== tt[lt])
                    return !1;
            return !0
        }
        function us(Tt, tt) {
            for (let lt = 0, mt = tt.length; lt < mt; lt++)
                Tt[lt] = tt[lt]
        }
        function Tv(Tt, tt) {
            let lt = rx[tt];
            lt === void 0 && (lt = new Int32Array(tt),
            rx[tt] = lt);
            for (let mt = 0; mt !== tt; ++mt)
                lt[mt] = Tt.allocateTextureUnit();
            return lt
        }
        function jw(Tt, tt) {
            const lt = this.cache;
            lt[0] !== tt && (Tt.uniform1f(this.addr, tt),
            lt[0] = tt)
        }
        function Vw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y || (Tt.uniform2f(this.addr, tt.x, tt.y),
                lt[0] = tt.x,
                lt[1] = tt.y);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform2fv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Gw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z || (Tt.uniform3f(this.addr, tt.x, tt.y, tt.z),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z);
            else if (tt.r !== void 0)
                lt[0] === tt.r && lt[1] === tt.g && lt[2] === tt.b || (Tt.uniform3f(this.addr, tt.r, tt.g, tt.b),
                lt[0] = tt.r,
                lt[1] = tt.g,
                lt[2] = tt.b);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform3fv(this.addr, tt),
                us(lt, tt)
            }
        }
        function zw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z && lt[3] === tt.w || (Tt.uniform4f(this.addr, tt.x, tt.y, tt.z, tt.w),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z,
                lt[3] = tt.w);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform4fv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Hw(Tt, tt) {
            const lt = this.cache
              , mt = tt.elements;
            if (mt === void 0) {
                if (cs(lt, tt))
                    return;
                Tt.uniformMatrix2fv(this.addr, !1, tt),
                us(lt, tt)
            } else {
                if (cs(lt, mt))
                    return;
                ox.set(mt),
                Tt.uniformMatrix2fv(this.addr, !1, ox),
                us(lt, mt)
            }
        }
        function Qw(Tt, tt) {
            const lt = this.cache
              , mt = tt.elements;
            if (mt === void 0) {
                if (cs(lt, tt))
                    return;
                Tt.uniformMatrix3fv(this.addr, !1, tt),
                us(lt, tt)
            } else {
                if (cs(lt, mt))
                    return;
                ix.set(mt),
                Tt.uniformMatrix3fv(this.addr, !1, ix),
                us(lt, mt)
            }
        }
        function Ww(Tt, tt) {
            const lt = this.cache
              , mt = tt.elements;
            if (mt === void 0) {
                if (cs(lt, tt))
                    return;
                Tt.uniformMatrix4fv(this.addr, !1, tt),
                us(lt, tt)
            } else {
                if (cs(lt, mt))
                    return;
                nx.set(mt),
                Tt.uniformMatrix4fv(this.addr, !1, nx),
                us(lt, mt)
            }
        }
        function qw(Tt, tt) {
            const lt = this.cache;
            lt[0] !== tt && (Tt.uniform1i(this.addr, tt),
            lt[0] = tt)
        }
        function $w(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y || (Tt.uniform2i(this.addr, tt.x, tt.y),
                lt[0] = tt.x,
                lt[1] = tt.y);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform2iv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Xw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z || (Tt.uniform3i(this.addr, tt.x, tt.y, tt.z),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform3iv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Yw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z && lt[3] === tt.w || (Tt.uniform4i(this.addr, tt.x, tt.y, tt.z, tt.w),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z,
                lt[3] = tt.w);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform4iv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Kw(Tt, tt) {
            const lt = this.cache;
            lt[0] !== tt && (Tt.uniform1ui(this.addr, tt),
            lt[0] = tt)
        }
        function Jw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y || (Tt.uniform2ui(this.addr, tt.x, tt.y),
                lt[0] = tt.x,
                lt[1] = tt.y);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform2uiv(this.addr, tt),
                us(lt, tt)
            }
        }
        function Zw(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z || (Tt.uniform3ui(this.addr, tt.x, tt.y, tt.z),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform3uiv(this.addr, tt),
                us(lt, tt)
            }
        }
        function e1(Tt, tt) {
            const lt = this.cache;
            if (tt.x !== void 0)
                lt[0] === tt.x && lt[1] === tt.y && lt[2] === tt.z && lt[3] === tt.w || (Tt.uniform4ui(this.addr, tt.x, tt.y, tt.z, tt.w),
                lt[0] = tt.x,
                lt[1] = tt.y,
                lt[2] = tt.z,
                lt[3] = tt.w);
            else {
                if (cs(lt, tt))
                    return;
                Tt.uniform4uiv(this.addr, tt),
                us(lt, tt)
            }
        }
        function t1(Tt, tt, lt) {
            const mt = this.cache
              , ft = lt.allocateTextureUnit();
            mt[0] !== ft && (Tt.uniform1i(this.addr, ft),
            mt[0] = ft),
            lt.setTexture2D(tt || Ky, ft)
        }
        function r1(Tt, tt, lt) {
            const mt = this.cache
              , ft = lt.allocateTextureUnit();
            mt[0] !== ft && (Tt.uniform1i(this.addr, ft),
            mt[0] = ft),
            lt.setTexture3D(tt || Zy, ft)
        }
        function n1(Tt, tt, lt) {
            const mt = this.cache
              , ft = lt.allocateTextureUnit();
            mt[0] !== ft && (Tt.uniform1i(this.addr, ft),
            mt[0] = ft),
            lt.setTextureCube(tt || ex, ft)
        }
        function i1(Tt, tt, lt) {
            const mt = this.cache
              , ft = lt.allocateTextureUnit();
            mt[0] !== ft && (Tt.uniform1i(this.addr, ft),
            mt[0] = ft),
            lt.setTexture2DArray(tt || Jy, ft)
        }
        function o1(Tt, tt) {
            Tt.uniform1fv(this.addr, tt)
        }
        function s1(Tt, tt) {
            const lt = bm(tt, this.size, 2);
            Tt.uniform2fv(this.addr, lt)
        }
        function a1(Tt, tt) {
            const lt = bm(tt, this.size, 3);
            Tt.uniform3fv(this.addr, lt)
        }
        function l1(Tt, tt) {
            const lt = bm(tt, this.size, 4);
            Tt.uniform4fv(this.addr, lt)
        }
        function c1(Tt, tt) {
            const lt = bm(tt, this.size, 4);
            Tt.uniformMatrix2fv(this.addr, !1, lt)
        }
        function u1(Tt, tt) {
            const lt = bm(tt, this.size, 9);
            Tt.uniformMatrix3fv(this.addr, !1, lt)
        }
        function d1(Tt, tt) {
            const lt = bm(tt, this.size, 16);
            Tt.uniformMatrix4fv(this.addr, !1, lt)
        }
        function p1(Tt, tt) {
            Tt.uniform1iv(this.addr, tt)
        }
        function h1(Tt, tt) {
            Tt.uniform2iv(this.addr, tt)
        }
        function m1(Tt, tt) {
            Tt.uniform3iv(this.addr, tt)
        }
        function f1(Tt, tt) {
            Tt.uniform4iv(this.addr, tt)
        }
        function g1(Tt, tt) {
            Tt.uniform1uiv(this.addr, tt)
        }
        function _1(Tt, tt) {
            Tt.uniform2uiv(this.addr, tt)
        }
        function y1(Tt, tt) {
            Tt.uniform3uiv(this.addr, tt)
        }
        function x1(Tt, tt) {
            Tt.uniform4uiv(this.addr, tt)
        }
        function b1(Tt, tt, lt) {
            const mt = this.cache
              , ft = tt.length
              , xt = Tv(lt, ft);
            cs(mt, xt) || (Tt.uniform1iv(this.addr, xt),
            us(mt, xt));
            for (let Ct = 0; Ct !== ft; ++Ct)
                lt.setTexture2D(tt[Ct] || Ky, xt[Ct])
        }
        function A1(Tt, tt, lt) {
            const mt = this.cache
              , ft = tt.length
              , xt = Tv(lt, ft);
            cs(mt, xt) || (Tt.uniform1iv(this.addr, xt),
            us(mt, xt));
            for (let Ct = 0; Ct !== ft; ++Ct)
                lt.setTexture3D(tt[Ct] || Zy, xt[Ct])
        }
        function w1(Tt, tt, lt) {
            const mt = this.cache
              , ft = tt.length
              , xt = Tv(lt, ft);
            cs(mt, xt) || (Tt.uniform1iv(this.addr, xt),
            us(mt, xt));
            for (let Ct = 0; Ct !== ft; ++Ct)
                lt.setTextureCube(tt[Ct] || ex, xt[Ct])
        }
        function S1(Tt, tt, lt) {
            const mt = this.cache
              , ft = tt.length
              , xt = Tv(lt, ft);
            cs(mt, xt) || (Tt.uniform1iv(this.addr, xt),
            us(mt, xt));
            for (let Ct = 0; Ct !== ft; ++Ct)
                lt.setTexture2DArray(tt[Ct] || Jy, xt[Ct])
        }
        class E1 {
            constructor(tt, lt, mt) {
                this.id = tt,
                this.addr = mt,
                this.cache = [],
                this.setValue = function(ft) {
                    switch (ft) {
                    case 5126:
                        return jw;
                    case 35664:
                        return Vw;
                    case 35665:
                        return Gw;
                    case 35666:
                        return zw;
                    case 35674:
                        return Hw;
                    case 35675:
                        return Qw;
                    case 35676:
                        return Ww;
                    case 5124:
                    case 35670:
                        return qw;
                    case 35667:
                    case 35671:
                        return $w;
                    case 35668:
                    case 35672:
                        return Xw;
                    case 35669:
                    case 35673:
                        return Yw;
                    case 5125:
                        return Kw;
                    case 36294:
                        return Jw;
                    case 36295:
                        return Zw;
                    case 36296:
                        return e1;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return t1;
                    case 35679:
                    case 36299:
                    case 36307:
                        return r1;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return n1;
                    case 36289:
                    case 36303:
                    case 36311:
                    case 36292:
                        return i1
                    }
                }(lt.type)
            }
        }
        class T1 {
            constructor(tt, lt, mt) {
                this.id = tt,
                this.addr = mt,
                this.cache = [],
                this.size = lt.size,
                this.setValue = function(ft) {
                    switch (ft) {
                    case 5126:
                        return o1;
                    case 35664:
                        return s1;
                    case 35665:
                        return a1;
                    case 35666:
                        return l1;
                    case 35674:
                        return c1;
                    case 35675:
                        return u1;
                    case 35676:
                        return d1;
                    case 5124:
                    case 35670:
                        return p1;
                    case 35667:
                    case 35671:
                        return h1;
                    case 35668:
                    case 35672:
                        return m1;
                    case 35669:
                    case 35673:
                        return f1;
                    case 5125:
                        return g1;
                    case 36294:
                        return _1;
                    case 36295:
                        return y1;
                    case 36296:
                        return x1;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return b1;
                    case 35679:
                    case 36299:
                    case 36307:
                        return A1;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return w1;
                    case 36289:
                    case 36303:
                    case 36311:
                    case 36292:
                        return S1
                    }
                }(lt.type)
            }
        }
        class C1 {
            constructor(tt) {
                this.id = tt,
                this.seq = [],
                this.map = {}
            }
            setValue(tt, lt, mt) {
                const ft = this.seq;
                for (let xt = 0, Ct = ft.length; xt !== Ct; ++xt) {
                    const Mt = ft[xt];
                    Mt.setValue(tt, lt[Mt.id], mt)
                }
            }
        }
        const G0 = /(\w+)(\])?(\[|\.)?/g;
        function sx(Tt, tt) {
            Tt.seq.push(tt),
            Tt.map[tt.id] = tt
        }
        function P1(Tt, tt, lt) {
            const mt = Tt.name
              , ft = mt.length;
            for (G0.lastIndex = 0; ; ) {
                const xt = G0.exec(mt)
                  , Ct = G0.lastIndex;
                let Mt = xt[1];
                const Lt = xt[2] === "]"
                  , Nt = xt[3];
                if (Lt && (Mt |= 0),
                Nt === void 0 || Nt === "[" && Ct + 2 === ft) {
                    sx(lt, Nt === void 0 ? new E1(Mt,Tt,tt) : new T1(Mt,Tt,tt));
                    break
                }
                {
                    let jt = lt.map[Mt];
                    jt === void 0 && (jt = new C1(Mt),
                    sx(lt, jt)),
                    lt = jt
                }
            }
        }
        class Cv {
            constructor(tt, lt) {
                this.seq = [],
                this.map = {};
                const mt = tt.getProgramParameter(lt, tt.ACTIVE_UNIFORMS);
                for (let ft = 0; ft < mt; ++ft) {
                    const xt = tt.getActiveUniform(lt, ft);
                    P1(xt, tt.getUniformLocation(lt, xt.name), this)
                }
            }
            setValue(tt, lt, mt, ft) {
                const xt = this.map[lt];
                xt !== void 0 && xt.setValue(tt, mt, ft)
            }
            setOptional(tt, lt, mt) {
                const ft = lt[mt];
                ft !== void 0 && this.setValue(tt, mt, ft)
            }
            static upload(tt, lt, mt, ft) {
                for (let xt = 0, Ct = lt.length; xt !== Ct; ++xt) {
                    const Mt = lt[xt]
                      , Lt = mt[Mt.id];
                    Lt.needsUpdate !== !1 && Mt.setValue(tt, Lt.value, ft)
                }
            }
            static seqWithValue(tt, lt) {
                const mt = [];
                for (let ft = 0, xt = tt.length; ft !== xt; ++ft) {
                    const Ct = tt[ft];
                    Ct.id in lt && mt.push(Ct)
                }
                return mt
            }
        }
        function ax(Tt, tt, lt) {
            const mt = Tt.createShader(tt);
            return Tt.shaderSource(mt, lt),
            Tt.compileShader(mt),
            mt
        }
        let M1 = 0;
        function lx(Tt, tt, lt) {
            const mt = Tt.getShaderParameter(tt, Tt.COMPILE_STATUS)
              , ft = Tt.getShaderInfoLog(tt).trim();
            if (mt && ft === "")
                return "";
            const xt = /ERROR: 0:(\d+)/.exec(ft);
            if (xt) {
                const Ct = parseInt(xt[1]);
                return lt.toUpperCase() + `

` + ft + `

` + function(Mt, Lt) {
                    const Nt = Mt.split(`
`)
                      , jt = []
                      , Wt = Math.max(Lt - 6, 0)
                      , Qt = Math.min(Lt + 6, Nt.length);
                    for (let qt = Wt; qt < Qt; qt++) {
                        const Xt = qt + 1;
                        jt.push(`${Xt === Lt ? ">" : " "} ${Xt}: ${Nt[qt]}`)
                    }
                    return jt.join(`
`)
                }(Tt.getShaderSource(tt), Ct)
            }
            return ft
        }
        function R1(Tt, tt) {
            let lt;
            switch (tt) {
            case Xo:
                lt = "";
                break;
            case jo:
                lt = "sRGBToLinear";
                break;
            case ps:
                lt = "RGBM16ToLinear";
                break;
            default:
                console.warn("THREE.WebGLProgram: Unsupported color space:", tt),
                lt = ""
            }
            return `vec4 ${Tt}( vec4 value ) { return ${lt} ( value ); }`
        }
        function I1(Tt, tt) {
            const lt = function(mt) {
                const ft = Do.getPrimaries(Do.workingColorSpace)
                  , xt = mt === Oo || mt === ps ? null : Do.getPrimaries(mt);
                let Ct;
                switch (ft !== xt && xt ? ft === Ou && xt === Wo ? Ct = "LinearDisplayP3ToLinearSRGB" : ft === Wo && xt === Ou && (Ct = "LinearSRGBToLinearDisplayP3") : Ct = "",
                mt) {
                case Oo:
                    return ["", ""];
                case Xo:
                case hu:
                    return [Ct, "LinearTransferOETF"];
                case jo:
                case dp:
                    return [Ct, "sRGBTransferOETF"];
                case ps:
                    return ["", "LinearToRGBM16"];
                default:
                    return console.warn("THREE.WebGLProgram: Unsupported color space:", mt),
                    [Ct, "LinearTransferOETF"]
                }
            }(tt);
            return `vec4 ${Tt}( vec4 value ) { return ${lt[0]}( ${lt[1]}( value ) ); }`
        }
        function k1(Tt, tt) {
            let lt;
            switch (tt) {
            case nn:
                lt = "Linear";
                break;
            case xn:
                lt = "Reinhard";
                break;
            case ur:
                lt = "OptimizedCineon";
                break;
            case pr:
                lt = "ACESFilmic";
                break;
            case Ir:
                lt = "Custom";
                break;
            default:
                console.warn("THREE.WebGLProgram: Unsupported toneMapping:", tt),
                lt = "Linear"
            }
            return "vec3 " + Tt + "( vec3 color ) { return " + lt + "ToneMapping( color ); }"
        }
        function __(Tt) {
            return Tt !== ""
        }
        function cx(Tt, tt) {
            const lt = tt.numSpotLightShadows + tt.numSpotLightMaps - tt.numSpotLightShadowsWithMaps;
            return Tt.replace(/NUM_DIR_LIGHTS/g, tt.numDirLights).replace(/NUM_SPOT_LIGHTS/g, tt.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, tt.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, lt).replace(/NUM_RECT_AREA_LIGHTS/g, tt.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, tt.numPointLights).replace(/NUM_HEMI_LIGHTS/g, tt.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, tt.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, tt.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, tt.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, tt.numPointLightShadows)
        }
        function ux(Tt, tt) {
            return Tt.replace(/NUM_CLIPPING_PLANES/g, tt.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, tt.numClippingPlanes - tt.numClipIntersection)
        }
        const D1 = /^[ \t]*#include +<([\w\d./]+)>/gm;
        function z0(Tt) {
            return Tt.replace(D1, L1)
        }
        const B1 = new Map([["encodings_fragment", "colorspace_fragment"], ["encodings_pars_fragment", "colorspace_pars_fragment"], ["output_fragment", "opaque_fragment"]]);
        function L1(Tt, tt) {
            let lt = go[tt];
            if (lt === void 0) {
                const mt = B1.get(tt);
                if (mt === void 0)
                    throw new Error("Can not resolve #include <" + tt + ">");
                lt = go[mt],
                console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', tt, mt)
            }
            return z0(lt)
        }
        const O1 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
        function dx(Tt) {
            return Tt.replace(O1, N1)
        }
        function N1(Tt, tt, lt, mt) {
            let ft = "";
            for (let xt = parseInt(tt); xt < parseInt(lt); xt++)
                ft += mt.replace(/\[\s*i\s*\]/g, "[ " + xt + " ]").replace(/UNROLLED_LOOP_INDEX/g, xt);
            return ft
        }
        function hx(Tt) {
            let tt = "precision " + Tt.precision + ` float;
precision ` + Tt.precision + " int;";
            return Tt.precision === "highp" ? tt += `
#define HIGH_PRECISION` : Tt.precision === "mediump" ? tt += `
#define MEDIUM_PRECISION` : Tt.precision === "lowp" && (tt += `
#define LOW_PRECISION`),
            tt
        }
        function F1(Tt, tt, lt, mt) {
            const ft = Tt.getContext()
              , xt = lt.defines;
            let Ct = lt.vertexShader
              , Mt = lt.fragmentShader;
            const Lt = function(Nr) {
                let Vr = "SHADOWMAP_TYPE_BASIC";
                return Nr.shadowMapType === pt ? Vr = "SHADOWMAP_TYPE_PCF" : Nr.shadowMapType === ht ? Vr = "SHADOWMAP_TYPE_PCF_SOFT" : Nr.shadowMapType === _t && (Vr = "SHADOWMAP_TYPE_VSM"),
                Vr
            }(lt)
              , Nt = function(Nr) {
                let Vr = "ENVMAP_TYPE_CUBE";
                if (Nr.envMap)
                    switch (Nr.envMapMode) {
                    case Qr:
                    case Or:
                        Vr = "ENVMAP_TYPE_CUBE";
                        break;
                    case Mn:
                        Vr = "ENVMAP_TYPE_CUBE_UV"
                    }
                return Vr
            }(lt)
              , jt = function(Nr) {
                let Vr = "ENVMAP_MODE_REFLECTION";
                return Nr.envMap && Nr.envMapMode === Or && (Vr = "ENVMAP_MODE_REFRACTION"),
                Vr
            }(lt)
              , Wt = function(Nr) {
                let Vr = "ENVMAP_BLENDING_NONE";
                if (Nr.envMap)
                    switch (Nr.combine) {
                    case Wn:
                        Vr = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case qn:
                        Vr = "ENVMAP_BLENDING_MIX";
                        break;
                    case mo:
                        Vr = "ENVMAP_BLENDING_ADD"
                    }
                return Vr
            }(lt)
              , Qt = function(Nr) {
                const Vr = Nr.envMapCubeUVHeight;
                if (Vr === null)
                    return null;
                const Gr = Math.log2(Vr) - 2
                  , Hr = 1 / Vr;
                return {
                    texelWidth: 1 / (3 * Math.max(Math.pow(2, Gr), 112)),
                    texelHeight: Hr,
                    maxMip: Gr
                }
            }(lt)
              , qt = lt.isWebGL2 ? "" : function(Nr) {
                return [Nr.extensionDerivatives || Nr.envMapCubeUVHeight || Nr.bumpMap || Nr.normalMapTangentSpace || Nr.clearcoatNormalMap || Nr.flatShading || Nr.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (Nr.extensionFragDepth || Nr.logarithmicDepthBuffer) && Nr.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", Nr.extensionDrawBuffers && Nr.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (Nr.extensionShaderTextureLOD || Nr.envMap || Nr.transmission) && Nr.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(__).join(`
`)
            }(lt)
              , Xt = function(Nr) {
                const Vr = [];
                for (const Gr in Nr) {
                    const Hr = Nr[Gr];
                    Hr !== !1 && Vr.push("#define " + Gr + " " + Hr)
                }
                return Vr.join(`
`)
            }(xt)
              , Zt = ft.createProgram();
            let Yt, sr, er = lt.glslVersion ? "#version " + lt.glslVersion + `
` : "";
            lt.isRawShaderMaterial ? (Yt = ["#define SHADER_TYPE " + lt.shaderType, "#define SHADER_NAME " + lt.shaderName, Xt].filter(__).join(`
`),
            Yt.length > 0 && (Yt += `
`),
            sr = [qt, "#define SHADER_TYPE " + lt.shaderType, "#define SHADER_NAME " + lt.shaderName, Xt].filter(__).join(`
`),
            sr.length > 0 && (sr += `
`)) : (Yt = [hx(lt), "#define SHADER_TYPE " + lt.shaderType, "#define SHADER_NAME " + lt.shaderName, Xt, lt.instancing ? "#define USE_INSTANCING" : "", lt.instancingColor ? "#define USE_INSTANCING_COLOR" : "", lt.useFog && lt.fog ? "#define USE_FOG" : "", lt.useFog && lt.fogExp2 ? "#define FOG_EXP2" : "", lt.map ? "#define USE_MAP" : "", lt.envMap ? "#define USE_ENVMAP" : "", lt.envMap ? "#define " + jt : "", lt.lightMap ? "#define USE_LIGHTMAP" : "", lt.aoMap ? "#define USE_AOMAP" : "", lt.bumpMap ? "#define USE_BUMPMAP" : "", lt.normalMap ? "#define USE_NORMALMAP" : "", lt.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", lt.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", lt.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", lt.emissiveMap ? "#define USE_EMISSIVEMAP" : "", lt.anisotropy ? "#define USE_ANISOTROPY" : "", lt.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", lt.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", lt.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", lt.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", lt.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", lt.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", lt.specularMap ? "#define USE_SPECULARMAP" : "", lt.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", lt.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", lt.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", lt.metalnessMap ? "#define USE_METALNESSMAP" : "", lt.alphaMap ? "#define USE_ALPHAMAP" : "", lt.alphaHash ? "#define USE_ALPHAHASH" : "", lt.transmission ? "#define USE_TRANSMISSION" : "", lt.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", lt.thicknessMap ? "#define USE_THICKNESSMAP" : "", lt.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", lt.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", lt.mapUv ? "#define MAP_UV " + lt.mapUv : "", lt.alphaMapUv ? "#define ALPHAMAP_UV " + lt.alphaMapUv : "", lt.lightMapUv ? "#define LIGHTMAP_UV " + lt.lightMapUv : "", lt.aoMapUv ? "#define AOMAP_UV " + lt.aoMapUv : "", lt.emissiveMapUv ? "#define EMISSIVEMAP_UV " + lt.emissiveMapUv : "", lt.bumpMapUv ? "#define BUMPMAP_UV " + lt.bumpMapUv : "", lt.normalMapUv ? "#define NORMALMAP_UV " + lt.normalMapUv : "", lt.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + lt.displacementMapUv : "", lt.metalnessMapUv ? "#define METALNESSMAP_UV " + lt.metalnessMapUv : "", lt.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + lt.roughnessMapUv : "", lt.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + lt.anisotropyMapUv : "", lt.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + lt.clearcoatMapUv : "", lt.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + lt.clearcoatNormalMapUv : "", lt.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + lt.clearcoatRoughnessMapUv : "", lt.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + lt.iridescenceMapUv : "", lt.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + lt.iridescenceThicknessMapUv : "", lt.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + lt.sheenColorMapUv : "", lt.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + lt.sheenRoughnessMapUv : "", lt.specularMapUv ? "#define SPECULARMAP_UV " + lt.specularMapUv : "", lt.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + lt.specularColorMapUv : "", lt.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + lt.specularIntensityMapUv : "", lt.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + lt.transmissionMapUv : "", lt.thicknessMapUv ? "#define THICKNESSMAP_UV " + lt.thicknessMapUv : "", lt.vertexTangents && lt.flatShading === !1 ? "#define USE_TANGENT" : "", lt.vertexColors ? "#define USE_COLOR" : "", lt.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", lt.vertexUv1s ? "#define USE_UV1" : "", lt.vertexUv2s ? "#define USE_UV2" : "", lt.vertexUv3s ? "#define USE_UV3" : "", lt.pointsUvs ? "#define USE_POINTS_UV" : "", lt.flatShading ? "#define FLAT_SHADED" : "", lt.skinning ? "#define USE_SKINNING" : "", lt.morphTargets ? "#define USE_MORPHTARGETS" : "", lt.morphNormals && lt.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", lt.morphColors && lt.isWebGL2 ? "#define USE_MORPHCOLORS" : "", lt.morphTargetsCount > 0 && lt.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", lt.morphTargetsCount > 0 && lt.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + lt.morphTextureStride : "", lt.morphTargetsCount > 0 && lt.isWebGL2 ? "#define MORPHTARGETS_COUNT " + lt.morphTargetsCount : "", lt.doubleSided ? "#define DOUBLE_SIDED" : "", lt.flipSided ? "#define FLIP_SIDED" : "", lt.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", lt.shadowMapEnabled ? "#define " + Lt : "", lt.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", lt.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", lt.useLegacyLights ? "#define LEGACY_LIGHTS" : "", lt.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", lt.logarithmicDepthBuffer && lt.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(__).join(`
`),
            sr = [qt, hx(lt), "#define SHADER_TYPE " + lt.shaderType, "#define SHADER_NAME " + lt.shaderName, Xt, lt.instancing ? "#define USE_INSTANCING" : "", lt.instancingColor ? "#define USE_INSTANCING_COLOR" : "", lt.useFog && lt.fog ? "#define USE_FOG" : "", lt.useFog && lt.fogExp2 ? "#define FOG_EXP2" : "", lt.map ? "#define USE_MAP" : "", lt.matcap ? "#define USE_MATCAP" : "", lt.envMap ? "#define USE_ENVMAP" : "", lt.envMap ? "#define " + Nt : "", lt.envMap ? "#define " + jt : "", lt.envMap ? "#define " + Wt : "", Qt ? "#define CUBEUV_TEXEL_WIDTH " + Qt.texelWidth : "", Qt ? "#define CUBEUV_TEXEL_HEIGHT " + Qt.texelHeight : "", Qt ? "#define CUBEUV_MAX_MIP " + Qt.maxMip + ".0" : "", lt.lightMap ? "#define USE_LIGHTMAP" : "", lt.aoMap ? "#define USE_AOMAP" : "", lt.bumpMap ? "#define USE_BUMPMAP" : "", lt.normalMap ? "#define USE_NORMALMAP" : "", lt.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", lt.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", lt.emissiveMap ? "#define USE_EMISSIVEMAP" : "", lt.anisotropy ? "#define USE_ANISOTROPY" : "", lt.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", lt.clearcoat ? "#define USE_CLEARCOAT" : "", lt.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", lt.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", lt.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", lt.iridescence ? "#define USE_IRIDESCENCE" : "", lt.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", lt.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", lt.specularMap ? "#define USE_SPECULARMAP" : "", lt.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", lt.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", lt.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", lt.metalnessMap ? "#define USE_METALNESSMAP" : "", lt.alphaMap ? "#define USE_ALPHAMAP" : "", lt.alphaTest ? "#define USE_ALPHATEST" : "", lt.alphaHash ? "#define USE_ALPHAHASH" : "", lt.sheen ? "#define USE_SHEEN" : "", lt.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", lt.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", lt.transmission ? "#define USE_TRANSMISSION" : "", lt.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", lt.thicknessMap ? "#define USE_THICKNESSMAP" : "", lt.vertexTangents && lt.flatShading === !1 ? "#define USE_TANGENT" : "", lt.vertexColors || lt.instancingColor ? "#define USE_COLOR" : "", lt.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", lt.vertexUv1s ? "#define USE_UV1" : "", lt.vertexUv2s ? "#define USE_UV2" : "", lt.vertexUv3s ? "#define USE_UV3" : "", lt.pointsUvs ? "#define USE_POINTS_UV" : "", lt.gradientMap ? "#define USE_GRADIENTMAP" : "", lt.flatShading ? "#define FLAT_SHADED" : "", lt.doubleSided ? "#define DOUBLE_SIDED" : "", lt.flipSided ? "#define FLIP_SIDED" : "", lt.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", lt.shadowMapEnabled ? "#define " + Lt : "", lt.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", lt.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", lt.useLegacyLights ? "#define LEGACY_LIGHTS" : "", lt.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", lt.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", lt.logarithmicDepthBuffer && lt.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", lt.toneMapping !== Ur ? "#define TONE_MAPPING" : "", lt.toneMapping !== Ur ? go.tonemapping_pars_fragment : "", lt.toneMapping !== Ur ? k1("toneMapping", lt.toneMapping) : "", lt.dithering ? "#define DITHERING" : "", lt.opaque ? "#define OPAQUE" : "", go.colorspace_pars_fragment, I1("linearToOutputTexel", lt.outputColorSpace), lt.transmissionSamplerMapEncoding ? R1("transmissionSamplerMapTexelToLinear", lt.transmissionSamplerMapEncoding) : "", lt.useDepthPacking ? "#define DEPTH_PACKING " + lt.depthPacking : "", `
`].filter(__).join(`
`)),
            Ct = z0(Ct),
            Ct = cx(Ct, lt),
            Ct = ux(Ct, lt),
            Mt = z0(Mt),
            Mt = cx(Mt, lt),
            Mt = ux(Mt, lt),
            Ct = dx(Ct),
            Mt = dx(Mt),
            lt.isWebGL2 && lt.isRawShaderMaterial !== !0 && (er = `#version 300 es
`,
            Yt = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + Yt,
            sr = ["#define varying in", lt.glslVersion === Ym ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", lt.glslVersion === Ym ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad", "#define WebGL2Context 1"].join(`
`) + `
` + sr);
            const rr = er + Yt + Ct
              , xr = er + sr + Mt
              , br = ax(ft, ft.VERTEX_SHADER, rr)
              , yr = ax(ft, ft.FRAGMENT_SHADER, xr);
            if (ft.attachShader(Zt, br),
            ft.attachShader(Zt, yr),
            lt.index0AttributeName !== void 0 ? ft.bindAttribLocation(Zt, 0, lt.index0AttributeName) : lt.morphTargets === !0 && ft.bindAttribLocation(Zt, 0, "position"),
            ft.linkProgram(Zt),
            Tt.debug.checkShaderErrors) {
                const Nr = ft.getProgramInfoLog(Zt).trim()
                  , Vr = ft.getShaderInfoLog(br).trim()
                  , Gr = ft.getShaderInfoLog(yr).trim();
                let Hr = !0
                  , _n = !0;
                if (ft.getProgramParameter(Zt, ft.LINK_STATUS) === !1)
                    if (Hr = !1,
                    typeof Tt.debug.onShaderError == "function")
                        Tt.debug.onShaderError(ft, Zt, br, yr);
                    else {
                        const dn = lx(ft, br, "vertex")
                          , kn = lx(ft, yr, "fragment");
                        console.error("THREE.WebGLProgram: Shader Error " + ft.getError() + " - VALIDATE_STATUS " + ft.getProgramParameter(Zt, ft.VALIDATE_STATUS) + `

Program Info Log: ` + Nr + `
` + dn + `
` + kn)
                    }
                else
                    Nr !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", Nr) : Vr !== "" && Gr !== "" || (_n = !1);
                _n && (this.diagnostics = {
                    runnable: Hr,
                    programLog: Nr,
                    vertexShader: {
                        log: Vr,
                        prefix: Yt
                    },
                    fragmentShader: {
                        log: Gr,
                        prefix: sr
                    }
                })
            }
            let Pr, zr;
            return ft.deleteShader(br),
            ft.deleteShader(yr),
            this.getUniforms = function() {
                return Pr === void 0 && (Pr = new Cv(ft,Zt)),
                Pr
            }
            ,
            this.getAttributes = function() {
                return zr === void 0 && (zr = function(Nr, Vr) {
                    const Gr = {}
                      , Hr = Nr.getProgramParameter(Vr, Nr.ACTIVE_ATTRIBUTES);
                    for (let _n = 0; _n < Hr; _n++) {
                        const dn = Nr.getActiveAttrib(Vr, _n)
                          , kn = dn.name;
                        let Bn = 1;
                        dn.type === Nr.FLOAT_MAT2 && (Bn = 2),
                        dn.type === Nr.FLOAT_MAT3 && (Bn = 3),
                        dn.type === Nr.FLOAT_MAT4 && (Bn = 4),
                        Gr[kn] = {
                            type: dn.type,
                            location: Nr.getAttribLocation(Vr, kn),
                            locationSize: Bn
                        }
                    }
                    return Gr
                }(ft, Zt)),
                zr
            }
            ,
            this.destroy = function() {
                mt.releaseStatesOfProgram(this),
                ft.deleteProgram(Zt),
                this.program = void 0
            }
            ,
            this.type = lt.shaderType,
            this.name = lt.shaderName,
            this.id = M1++,
            this.cacheKey = tt,
            this.usedTimes = 1,
            this.program = Zt,
            this.vertexShader = br,
            this.fragmentShader = yr,
            this
        }
        let U1 = 0;
        class j1 {
            constructor() {
                this.shaderCache = new Map,
                this.materialCache = new Map
            }
            update(tt) {
                const lt = tt.vertexShader
                  , mt = tt.fragmentShader
                  , ft = this._getShaderStage(lt)
                  , xt = this._getShaderStage(mt)
                  , Ct = this._getShaderCacheForMaterial(tt);
                return Ct.has(ft) === !1 && (Ct.add(ft),
                ft.usedTimes++),
                Ct.has(xt) === !1 && (Ct.add(xt),
                xt.usedTimes++),
                this
            }
            remove(tt) {
                const lt = this.materialCache.get(tt);
                for (const mt of lt)
                    mt.usedTimes--,
                    mt.usedTimes === 0 && this.shaderCache.delete(mt.code);
                return this.materialCache.delete(tt),
                this
            }
            getVertexShaderID(tt) {
                return this._getShaderStage(tt.vertexShader).id
            }
            getFragmentShaderID(tt) {
                return this._getShaderStage(tt.fragmentShader).id
            }
            dispose() {
                this.shaderCache.clear(),
                this.materialCache.clear()
            }
            _getShaderCacheForMaterial(tt) {
                const lt = this.materialCache;
                let mt = lt.get(tt);
                return mt === void 0 && (mt = new Set,
                lt.set(tt, mt)),
                mt
            }
            _getShaderStage(tt) {
                const lt = this.shaderCache;
                let mt = lt.get(tt);
                return mt === void 0 && (mt = new V1(tt),
                lt.set(tt, mt)),
                mt
            }
        }
        class V1 {
            constructor(tt) {
                this.id = U1++,
                this.code = tt,
                this.usedTimes = 0
            }
        }
        function G1(Tt, tt, lt, mt, ft, xt, Ct) {
            const Mt = new um
              , Lt = new j1
              , Nt = []
              , jt = ft.isWebGL2
              , Wt = ft.logarithmicDepthBuffer
              , Qt = ft.vertexTextures;
            let qt = ft.precision;
            const Xt = {
                MeshDepthMaterial: "depth",
                MeshDistanceMaterial: "distanceRGBA",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "toon",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                MeshMatcapMaterial: "matcap",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points",
                ShadowMaterial: "shadow",
                SpriteMaterial: "sprite"
            };
            function Zt(Yt) {
                return Yt === 0 ? "uv" : `uv${Yt}`
            }
            return {
                getParameters: function(Yt, sr, er, rr, xr) {
                    const br = rr.fog
                      , yr = xr.geometry
                      , Pr = Yt.isMeshStandardMaterial ? rr.environment : null
                      , zr = (Yt.isMeshStandardMaterial ? lt : tt).get(Yt.envMap || Pr)
                      , Nr = zr && zr.mapping === Mn ? zr.image.height : null
                      , Vr = Xt[Yt.type];
                    Yt.precision !== null && (qt = ft.getMaxPrecision(Yt.precision),
                    qt !== Yt.precision && console.warn("THREE.WebGLProgram.getParameters:", Yt.precision, "not supported, using", qt, "instead."));
                    const Gr = yr.morphAttributes.position || yr.morphAttributes.normal || yr.morphAttributes.color
                      , Hr = Gr !== void 0 ? Gr.length : 0;
                    let _n, dn, kn, Bn, cn = 0;
                    if (yr.morphAttributes.position !== void 0 && (cn = 1),
                    yr.morphAttributes.normal !== void 0 && (cn = 2),
                    yr.morphAttributes.color !== void 0 && (cn = 3),
                    Vr) {
                        const F_ = qs[Vr];
                        _n = F_.vertexShader,
                        dn = F_.fragmentShader
                    } else
                        _n = Yt.vertexShader,
                        dn = Yt.fragmentShader,
                        Lt.update(Yt),
                        kn = Lt.getVertexShaderID(Yt),
                        Bn = Lt.getFragmentShaderID(Yt);
                    const Yr = Tt.getRenderTarget()
                      , Jr = Tt.userData && Tt.userData.transmissionRenderTarget
                      , sn = Yr ? Array.isArray(Yr.texture) ? Yr.texture[0] : Yr.texture : null
                      , on = xr.isInstancedMesh === !0
                      , Un = !!Yt.map
                      , ro = !!Yt.matcap
                      , Zn = !!zr
                      , jn = !!Yt.aoMap
                      , uo = !!Yt.lightMap
                      , Dr = !!Yt.bumpMap
                      , Sr = !!Yt.normalMap
                      , Fr = !!Yt.displacementMap
                      , Wr = !!Yt.emissiveMap
                      , kr = !!Yt.metalnessMap
                      , _r = !!Yt.roughnessMap
                      , Br = Yt.anisotropy > 0
                      , Lr = Yt.clearcoat > 0
                      , Xr = Yt.iridescence > 0
                      , Kr = Yt.sheen > 0
                      , An = Yt.transmission > 0
                      , pn = Br && !!Yt.anisotropyMap
                      , _o = Lr && !!Yt.clearcoatMap
                      , to = Lr && !!Yt.clearcoatNormalMap
                      , Pn = Lr && !!Yt.clearcoatRoughnessMap
                      , eo = Xr && !!Yt.iridescenceMap
                      , Kn = Xr && !!Yt.iridescenceThicknessMap
                      , po = Kr && !!Yt.sheenColorMap
                      , Ao = Kr && !!Yt.sheenRoughnessMap
                      , Fo = !!Yt.specularMap
                      , Io = !!Yt.specularColorMap
                      , Jn = !!Yt.specularIntensityMap
                      , Co = An && !!Yt.transmissionMap
                      , yl = An && !!Yt.thicknessMap
                      , ho = !!Yt.gradientMap
                      , Qo = !!Yt.alphaMap
                      , Po = Yt.alphaTest > 0
                      , Cu = !!Yt.alphaHash
                      , Pu = !!Yt.extensions
                      , en = !!yr.attributes.uv1
                      , g0 = !!yr.attributes.uv2
                      , _0 = !!yr.attributes.uv3;
                    let Bs = Ur;
                    return Yt.toneMapped && (Yr !== null && Yr.isXRRenderTarget !== !0 || (Bs = Tt.toneMapping)),
                    {
                        isWebGL2: jt,
                        shaderID: Vr,
                        shaderType: Yt.type,
                        shaderName: Yt.name,
                        vertexShader: _n,
                        fragmentShader: dn,
                        defines: Yt.defines,
                        customVertexShaderID: kn,
                        customFragmentShaderID: Bn,
                        isRawShaderMaterial: Yt.isRawShaderMaterial === !0,
                        glslVersion: Yt.glslVersion,
                        precision: qt,
                        instancing: on,
                        instancingColor: on && xr.instanceColor !== null,
                        supportsVertexTextures: Qt,
                        outputColorSpace: Yr === null ? Tt.outputColorSpace : Yr.isXRRenderTarget === !0 || sn.colorSpace && sn.colorSpace !== jo ? sn.colorSpace : Xo,
                        map: Un,
                        matcap: ro,
                        envMap: Zn,
                        envMapMode: Zn && zr.mapping,
                        envMapCubeUVHeight: Nr,
                        aoMap: jn,
                        lightMap: uo,
                        bumpMap: Dr,
                        normalMap: Sr,
                        displacementMap: Qt && Fr,
                        emissiveMap: Wr,
                        normalMapObjectSpace: Sr && Yt.normalMapType === Lu,
                        normalMapTangentSpace: Sr && Yt.normalMapType === El,
                        metalnessMap: kr,
                        roughnessMap: _r,
                        anisotropy: Br,
                        anisotropyMap: pn,
                        clearcoat: Lr,
                        clearcoatMap: _o,
                        clearcoatNormalMap: to,
                        clearcoatRoughnessMap: Pn,
                        iridescence: Xr,
                        iridescenceMap: eo,
                        iridescenceThicknessMap: Kn,
                        sheen: Kr,
                        sheenColorMap: po,
                        sheenRoughnessMap: Ao,
                        specularMap: Fo,
                        specularColorMap: Io,
                        specularIntensityMap: Jn,
                        transmission: An,
                        transmissionMap: Co,
                        thicknessMap: yl,
                        transmissionSamplerMapEncoding: Jr && Jr.texture.colorSpace || Xo,
                        gradientMap: ho,
                        opaque: Yt.transparent === !1 && Yt.blending === Pt && !(Yt.transmission > 0),
                        alphaMap: Qo,
                        alphaTest: Po,
                        alphaHash: Cu,
                        combine: Yt.combine,
                        mapUv: Un && Zt(Yt.map.channel),
                        aoMapUv: jn && Zt(Yt.aoMap.channel),
                        lightMapUv: uo && Zt(Yt.lightMap.channel),
                        bumpMapUv: Dr && Zt(Yt.bumpMap.channel),
                        normalMapUv: Sr && Zt(Yt.normalMap.channel),
                        displacementMapUv: Fr && Zt(Yt.displacementMap.channel),
                        emissiveMapUv: Wr && Zt(Yt.emissiveMap.channel),
                        metalnessMapUv: kr && Zt(Yt.metalnessMap.channel),
                        roughnessMapUv: _r && Zt(Yt.roughnessMap.channel),
                        anisotropyMapUv: pn && Zt(Yt.anisotropyMap.channel),
                        clearcoatMapUv: _o && Zt(Yt.clearcoatMap.channel),
                        clearcoatNormalMapUv: to && Zt(Yt.clearcoatNormalMap.channel),
                        clearcoatRoughnessMapUv: Pn && Zt(Yt.clearcoatRoughnessMap.channel),
                        iridescenceMapUv: eo && Zt(Yt.iridescenceMap.channel),
                        iridescenceThicknessMapUv: Kn && Zt(Yt.iridescenceThicknessMap.channel),
                        sheenColorMapUv: po && Zt(Yt.sheenColorMap.channel),
                        sheenRoughnessMapUv: Ao && Zt(Yt.sheenRoughnessMap.channel),
                        specularMapUv: Fo && Zt(Yt.specularMap.channel),
                        specularColorMapUv: Io && Zt(Yt.specularColorMap.channel),
                        specularIntensityMapUv: Jn && Zt(Yt.specularIntensityMap.channel),
                        transmissionMapUv: Co && Zt(Yt.transmissionMap.channel),
                        thicknessMapUv: yl && Zt(Yt.thicknessMap.channel),
                        alphaMapUv: Qo && Zt(Yt.alphaMap.channel),
                        vertexTangents: !!yr.attributes.tangent && (Sr || Br || yr.userData.__forceUseTangent),
                        vertexColors: Yt.vertexColors,
                        vertexAlphas: Yt.vertexColors === !0 && !!yr.attributes.color && yr.attributes.color.itemSize === 4,
                        vertexUv1s: en,
                        vertexUv2s: g0,
                        vertexUv3s: _0,
                        pointsUvs: xr.isPoints === !0 && !!yr.attributes.uv && (Un || Qo),
                        fog: !!br,
                        useFog: Yt.fog === !0,
                        fogExp2: br && br.isFogExp2,
                        flatShading: Yt.flatShading === !0,
                        sizeAttenuation: Yt.sizeAttenuation === !0,
                        logarithmicDepthBuffer: Wt,
                        skinning: xr.isSkinnedMesh === !0,
                        morphTargets: yr.morphAttributes.position !== void 0,
                        morphNormals: yr.morphAttributes.normal !== void 0,
                        morphColors: yr.morphAttributes.color !== void 0,
                        morphTargetsCount: Hr,
                        morphTextureStride: cn,
                        numDirLights: sr.directional.length,
                        numPointLights: sr.point.length,
                        numSpotLights: sr.spot.length,
                        numSpotLightMaps: sr.spotLightMap.length,
                        numRectAreaLights: sr.rectArea.length,
                        numHemiLights: sr.hemi.length,
                        numDirLightShadows: sr.directionalShadowMap.length,
                        numPointLightShadows: sr.pointShadowMap.length,
                        numSpotLightShadows: sr.spotShadowMap.length,
                        numSpotLightShadowsWithMaps: sr.numSpotLightShadowsWithMaps,
                        numLightProbes: sr.numLightProbes,
                        numClippingPlanes: Ct.numPlanes,
                        numClipIntersection: Ct.numIntersection,
                        dithering: Yt.dithering,
                        shadowMapEnabled: Tt.shadowMap.enabled && er.length > 0,
                        shadowMapType: Tt.shadowMap.type,
                        toneMapping: Bs,
                        useLegacyLights: Tt._useLegacyLights,
                        decodeVideoTexture: Un && Yt.map.isVideoTexture === !0 && Do.getTransfer(Yt.map.colorSpace) === Vo,
                        premultipliedAlpha: Yt.premultipliedAlpha,
                        doubleSided: Yt.side === St,
                        flipSided: Yt.side === bt,
                        useDepthPacking: Yt.depthPacking >= 0,
                        depthPacking: Yt.depthPacking || 0,
                        index0AttributeName: Yt.index0AttributeName,
                        extensionDerivatives: Pu && Yt.extensions.derivatives === !0,
                        extensionFragDepth: Pu && Yt.extensions.fragDepth === !0,
                        extensionDrawBuffers: Pu && Yt.extensions.drawBuffers === !0,
                        extensionShaderTextureLOD: Pu && Yt.extensions.shaderTextureLOD === !0,
                        rendererExtensionFragDepth: jt || mt.has("EXT_frag_depth"),
                        rendererExtensionDrawBuffers: jt || mt.has("WEBGL_draw_buffers"),
                        rendererExtensionShaderTextureLod: jt || mt.has("EXT_shader_texture_lod"),
                        customProgramCacheKey: Yt.customProgramCacheKey()
                    }
                },
                getProgramCacheKey: function(Yt) {
                    const sr = [];
                    if (Yt.shaderID ? sr.push(Yt.shaderID) : (sr.push(Yt.customVertexShaderID),
                    sr.push(Yt.customFragmentShaderID)),
                    Yt.defines !== void 0)
                        for (const er in Yt.defines)
                            sr.push(er),
                            sr.push(Yt.defines[er]);
                    return Yt.isRawShaderMaterial === !1 && (function(er, rr) {
                        er.push(rr.precision),
                        er.push(rr.outputColorSpace),
                        er.push(rr.envMapMode),
                        er.push(rr.envMapCubeUVHeight),
                        er.push(rr.mapUv),
                        er.push(rr.alphaMapUv),
                        er.push(rr.lightMapUv),
                        er.push(rr.aoMapUv),
                        er.push(rr.bumpMapUv),
                        er.push(rr.normalMapUv),
                        er.push(rr.displacementMapUv),
                        er.push(rr.emissiveMapUv),
                        er.push(rr.metalnessMapUv),
                        er.push(rr.roughnessMapUv),
                        er.push(rr.anisotropyMapUv),
                        er.push(rr.clearcoatMapUv),
                        er.push(rr.clearcoatNormalMapUv),
                        er.push(rr.clearcoatRoughnessMapUv),
                        er.push(rr.iridescenceMapUv),
                        er.push(rr.iridescenceThicknessMapUv),
                        er.push(rr.sheenColorMapUv),
                        er.push(rr.sheenRoughnessMapUv),
                        er.push(rr.specularMapUv),
                        er.push(rr.specularColorMapUv),
                        er.push(rr.specularIntensityMapUv),
                        er.push(rr.transmissionMapUv),
                        er.push(rr.thicknessMapUv),
                        er.push(rr.combine),
                        er.push(rr.fogExp2),
                        er.push(rr.sizeAttenuation),
                        er.push(rr.morphTargetsCount),
                        er.push(rr.morphAttributeCount),
                        er.push(rr.numDirLights),
                        er.push(rr.numPointLights),
                        er.push(rr.numSpotLights),
                        er.push(rr.numSpotLightMaps),
                        er.push(rr.numHemiLights),
                        er.push(rr.numRectAreaLights),
                        er.push(rr.numDirLightShadows),
                        er.push(rr.numPointLightShadows),
                        er.push(rr.numSpotLightShadows),
                        er.push(rr.numSpotLightShadowsWithMaps),
                        er.push(rr.numLightProbes),
                        er.push(rr.shadowMapType),
                        er.push(rr.toneMapping),
                        er.push(rr.numClippingPlanes),
                        er.push(rr.numClipIntersection),
                        er.push(rr.depthPacking)
                    }(sr, Yt),
                    function(er, rr) {
                        Mt.disableAll(),
                        rr.isWebGL2 && Mt.enable(0),
                        rr.supportsVertexTextures && Mt.enable(1),
                        rr.instancing && Mt.enable(2),
                        rr.instancingColor && Mt.enable(3),
                        rr.matcap && Mt.enable(4),
                        rr.envMap && Mt.enable(5),
                        rr.normalMapObjectSpace && Mt.enable(6),
                        rr.normalMapTangentSpace && Mt.enable(7),
                        rr.clearcoat && Mt.enable(8),
                        rr.iridescence && Mt.enable(9),
                        rr.alphaTest && Mt.enable(10),
                        rr.vertexColors && Mt.enable(11),
                        rr.vertexAlphas && Mt.enable(12),
                        rr.vertexUv1s && Mt.enable(13),
                        rr.vertexUv2s && Mt.enable(14),
                        rr.vertexUv3s && Mt.enable(15),
                        rr.vertexTangents && Mt.enable(16),
                        rr.anisotropy && Mt.enable(17),
                        er.push(Mt.mask),
                        Mt.disableAll(),
                        rr.fog && Mt.enable(0),
                        rr.useFog && Mt.enable(1),
                        rr.flatShading && Mt.enable(2),
                        rr.logarithmicDepthBuffer && Mt.enable(3),
                        rr.skinning && Mt.enable(4),
                        rr.morphTargets && Mt.enable(5),
                        rr.morphNormals && Mt.enable(6),
                        rr.morphColors && Mt.enable(7),
                        rr.premultipliedAlpha && Mt.enable(8),
                        rr.shadowMapEnabled && Mt.enable(9),
                        rr.useLegacyLights && Mt.enable(10),
                        rr.doubleSided && Mt.enable(11),
                        rr.flipSided && Mt.enable(12),
                        rr.useDepthPacking && Mt.enable(13),
                        rr.dithering && Mt.enable(14),
                        rr.transmission && Mt.enable(15),
                        rr.sheen && Mt.enable(16),
                        rr.opaque && Mt.enable(17),
                        rr.pointsUvs && Mt.enable(18),
                        rr.decodeVideoTexture && Mt.enable(19),
                        er.push(Mt.mask)
                    }(sr, Yt),
                    sr.push(Tt.outputColorSpace)),
                    sr.push(Yt.customProgramCacheKey),
                    sr.join()
                },
                getUniforms: function(Yt) {
                    const sr = Xt[Yt.type];
                    let er;
                    if (sr) {
                        const rr = qs[sr];
                        er = Vy.clone(rr.uniforms)
                    } else
                        er = Yt.uniforms;
                    return er
                },
                acquireProgram: function(Yt, sr) {
                    let er;
                    for (let rr = 0, xr = Nt.length; rr < xr; rr++) {
                        const br = Nt[rr];
                        if (br.cacheKey === sr) {
                            er = br,
                            ++er.usedTimes;
                            break
                        }
                    }
                    return er === void 0 && (er = new F1(Tt,sr,Yt,xt),
                    Nt.push(er)),
                    er
                },
                releaseProgram: function(Yt) {
                    if (--Yt.usedTimes == 0) {
                        const sr = Nt.indexOf(Yt);
                        Nt[sr] = Nt[Nt.length - 1],
                        Nt.pop(),
                        Yt.destroy()
                    }
                },
                releaseShaderCache: function(Yt) {
                    Lt.remove(Yt)
                },
                programs: Nt,
                dispose: function() {
                    Lt.dispose()
                }
            }
        }
        function z1() {
            let Tt = new WeakMap;
            return {
                get: function(tt) {
                    let lt = Tt.get(tt);
                    return lt === void 0 && (lt = {},
                    Tt.set(tt, lt)),
                    lt
                },
                remove: function(tt) {
                    Tt.delete(tt)
                },
                update: function(tt, lt, mt) {
                    Tt.get(tt)[lt] = mt
                },
                dispose: function() {
                    Tt = new WeakMap
                }
            }
        }
        function H1(Tt, tt) {
            return Tt.groupOrder !== tt.groupOrder ? Tt.groupOrder - tt.groupOrder : Tt.renderOrder !== tt.renderOrder ? Tt.renderOrder - tt.renderOrder : Tt.material.id !== tt.material.id ? Tt.material.id - tt.material.id : Tt.z !== tt.z ? Tt.z - tt.z : Tt.id - tt.id
        }
        function mx(Tt, tt) {
            return Tt.groupOrder !== tt.groupOrder ? Tt.groupOrder - tt.groupOrder : Tt.renderOrder !== tt.renderOrder ? Tt.renderOrder - tt.renderOrder : Tt.z !== tt.z ? tt.z - Tt.z : Tt.id - tt.id
        }
        function fx() {
            const Tt = [];
            let tt = 0;
            const lt = []
              , mt = []
              , ft = [];
            function xt(Ct, Mt, Lt, Nt, jt, Wt) {
                let Qt = Tt[tt];
                return Qt === void 0 ? (Qt = {
                    id: Ct.id,
                    object: Ct,
                    geometry: Mt,
                    material: Lt,
                    groupOrder: Nt,
                    renderOrder: Ct.renderOrder,
                    z: jt,
                    group: Wt
                },
                Tt[tt] = Qt) : (Qt.id = Ct.id,
                Qt.object = Ct,
                Qt.geometry = Mt,
                Qt.material = Lt,
                Qt.groupOrder = Nt,
                Qt.renderOrder = Ct.renderOrder,
                Qt.z = jt,
                Qt.group = Wt),
                tt++,
                Qt
            }
            return {
                opaque: lt,
                transmissive: mt,
                transparent: ft,
                init: function() {
                    tt = 0,
                    lt.length = 0,
                    mt.length = 0,
                    ft.length = 0
                },
                push: function(Ct, Mt, Lt, Nt, jt, Wt) {
                    const Qt = xt(Ct, Mt, Lt, Nt, jt, Wt);
                    Lt.transmission > 0 ? mt.push(Qt) : Lt.transparent === !0 ? ft.push(Qt) : lt.push(Qt)
                },
                unshift: function(Ct, Mt, Lt, Nt, jt, Wt) {
                    const Qt = xt(Ct, Mt, Lt, Nt, jt, Wt);
                    Lt.transmission > 0 ? mt.unshift(Qt) : Lt.transparent === !0 ? ft.unshift(Qt) : lt.unshift(Qt)
                },
                finish: function() {
                    for (let Ct = tt, Mt = Tt.length; Ct < Mt; Ct++) {
                        const Lt = Tt[Ct];
                        if (Lt.id === null)
                            break;
                        Lt.id = null,
                        Lt.object = null,
                        Lt.geometry = null,
                        Lt.material = null,
                        Lt.group = null
                    }
                },
                sort: function(Ct, Mt) {
                    lt.length > 1 && lt.sort(Ct || H1),
                    mt.length > 1 && mt.sort(Mt || mx),
                    ft.length > 1 && ft.sort(Mt || mx)
                }
            }
        }
        function Q1() {
            let Tt = new WeakMap;
            return {
                get: function(tt, lt) {
                    const mt = Tt.get(tt);
                    let ft;
                    return mt === void 0 ? (ft = new fx,
                    Tt.set(tt, [ft])) : lt >= mt.length ? (ft = new fx,
                    mt.push(ft)) : ft = mt[lt],
                    ft
                },
                dispose: function() {
                    Tt = new WeakMap
                }
            }
        }
        function W1() {
            const Tt = {};
            return {
                get: function(tt) {
                    if (Tt[tt.id] !== void 0)
                        return Tt[tt.id];
                    let lt;
                    switch (tt.type) {
                    case "DirectionalLight":
                        lt = {
                            direction: new Er,
                            color: new Gn
                        };
                        break;
                    case "SpotLight":
                        lt = {
                            position: new Er,
                            direction: new Er,
                            color: new Gn,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0
                        };
                        break;
                    case "PointLight":
                        lt = {
                            position: new Er,
                            color: new Gn,
                            distance: 0,
                            decay: 0
                        };
                        break;
                    case "HemisphereLight":
                        lt = {
                            direction: new Er,
                            skyColor: new Gn,
                            groundColor: new Gn
                        };
                        break;
                    case "RectAreaLight":
                        lt = {
                            color: new Gn,
                            position: new Er,
                            halfWidth: new Er,
                            halfHeight: new Er
                        }
                    }
                    return Tt[tt.id] = lt,
                    lt
                }
            }
        }
        let q1 = 0;
        function $1(Tt, tt) {
            return (tt.castShadow ? 2 : 0) - (Tt.castShadow ? 2 : 0) + (tt.map ? 1 : 0) - (Tt.map ? 1 : 0)
        }
        function X1(Tt, tt) {
            const lt = new W1
              , mt = function() {
                const Lt = {};
                return {
                    get: function(Nt) {
                        if (Lt[Nt.id] !== void 0)
                            return Lt[Nt.id];
                        let jt;
                        switch (Nt.type) {
                        case "DirectionalLight":
                        case "SpotLight":
                            jt = {
                                shadowBias: 0,
                                shadowNormalBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new mn
                            };
                            break;
                        case "PointLight":
                            jt = {
                                shadowBias: 0,
                                shadowNormalBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new mn,
                                shadowCameraNear: 1,
                                shadowCameraFar: 1e3
                            }
                        }
                        return Lt[Nt.id] = jt,
                        jt
                    }
                }
            }()
              , ft = {
                version: 0,
                hash: {
                    directionalLength: -1,
                    pointLength: -1,
                    spotLength: -1,
                    rectAreaLength: -1,
                    hemiLength: -1,
                    numDirectionalShadows: -1,
                    numPointShadows: -1,
                    numSpotShadows: -1,
                    numSpotMaps: -1,
                    numLightProbes: -1
                },
                ambient: [0, 0, 0],
                probe: [],
                directional: [],
                directionalShadow: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotLightMap: [],
                spotShadow: [],
                spotShadowMap: [],
                spotLightMatrix: [],
                rectArea: [],
                rectAreaLTC1: null,
                rectAreaLTC2: null,
                point: [],
                pointShadow: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: [],
                numSpotLightShadowsWithMaps: 0,
                numLightProbes: 0
            };
            for (let Lt = 0; Lt < 9; Lt++)
                ft.probe.push(new Er);
            const xt = new Er
              , Ct = new no
              , Mt = new no;
            return {
                setup: function(Lt, Nt) {
                    let jt = 0
                      , Wt = 0
                      , Qt = 0;
                    for (let Vr = 0; Vr < 9; Vr++)
                        ft.probe[Vr].set(0, 0, 0);
                    let qt = 0
                      , Xt = 0
                      , Zt = 0
                      , Yt = 0
                      , sr = 0
                      , er = 0
                      , rr = 0
                      , xr = 0
                      , br = 0
                      , yr = 0
                      , Pr = 0;
                    Lt.sort($1);
                    const zr = Nt === !0 ? Math.PI : 1;
                    for (let Vr = 0, Gr = Lt.length; Vr < Gr; Vr++) {
                        const Hr = Lt[Vr]
                          , _n = Hr.color
                          , dn = Hr.intensity
                          , kn = Hr.distance
                          , Bn = Hr.shadow && Hr.shadow.map ? Hr.shadow.map.texture : null;
                        if (Hr.isAmbientLight)
                            jt += _n.r * dn * zr,
                            Wt += _n.g * dn * zr,
                            Qt += _n.b * dn * zr;
                        else if (Hr.isLightProbe) {
                            for (let cn = 0; cn < 9; cn++)
                                ft.probe[cn].addScaledVector(Hr.sh.coefficients[cn], dn);
                            Pr++
                        } else if (Hr.isDirectionalLight) {
                            const cn = lt.get(Hr);
                            if (cn.color.copy(Hr.color).multiplyScalar(Hr.intensity * zr),
                            Hr.castShadow) {
                                const Yr = Hr.shadow
                                  , Jr = mt.get(Hr);
                                Jr.shadowBias = Yr.bias,
                                Jr.shadowNormalBias = Yr.normalBias,
                                Jr.shadowRadius = Yr.radius,
                                Jr.shadowMapSize = Yr.mapSize,
                                ft.directionalShadow[qt] = Jr,
                                ft.directionalShadowMap[qt] = Bn,
                                ft.directionalShadowMatrix[qt] = Hr.shadow.matrix,
                                er++
                            }
                            ft.directional[qt] = cn,
                            qt++
                        } else if (Hr.isSpotLight) {
                            const cn = lt.get(Hr);
                            cn.position.setFromMatrixPosition(Hr.matrixWorld),
                            cn.color.copy(_n).multiplyScalar(dn * zr),
                            cn.distance = kn,
                            cn.coneCos = Math.cos(Hr.angle),
                            cn.penumbraCos = Math.cos(Hr.angle * (1 - Hr.penumbra)),
                            cn.decay = Hr.decay,
                            ft.spot[Zt] = cn;
                            const Yr = Hr.shadow;
                            if (Hr.map && (ft.spotLightMap[br] = Hr.map,
                            br++,
                            Yr.updateMatrices(Hr),
                            Hr.castShadow && yr++),
                            ft.spotLightMatrix[Zt] = Yr.matrix,
                            Hr.castShadow) {
                                const Jr = mt.get(Hr);
                                Jr.shadowBias = Yr.bias,
                                Jr.shadowNormalBias = Yr.normalBias,
                                Jr.shadowRadius = Yr.radius,
                                Jr.shadowMapSize = Yr.mapSize,
                                ft.spotShadow[Zt] = Jr,
                                ft.spotShadowMap[Zt] = Bn,
                                xr++
                            }
                            Zt++
                        } else if (Hr.isRectAreaLight) {
                            const cn = lt.get(Hr);
                            cn.color.copy(_n).multiplyScalar(dn),
                            cn.halfWidth.set(.5 * Hr.width, 0, 0),
                            cn.halfHeight.set(0, .5 * Hr.height, 0),
                            ft.rectArea[Yt] = cn,
                            Yt++
                        } else if (Hr.isPointLight) {
                            const cn = lt.get(Hr);
                            if (cn.color.copy(Hr.color).multiplyScalar(Hr.intensity * zr),
                            cn.distance = Hr.distance,
                            cn.decay = Hr.decay,
                            Hr.castShadow) {
                                const Yr = Hr.shadow
                                  , Jr = mt.get(Hr);
                                Jr.shadowBias = Yr.bias,
                                Jr.shadowNormalBias = Yr.normalBias,
                                Jr.shadowRadius = Yr.radius,
                                Jr.shadowMapSize = Yr.mapSize,
                                Jr.shadowCameraNear = Yr.camera.near,
                                Jr.shadowCameraFar = Yr.camera.far,
                                ft.pointShadow[Xt] = Jr,
                                ft.pointShadowMap[Xt] = Bn,
                                ft.pointShadowMatrix[Xt] = Hr.shadow.matrix,
                                rr++
                            }
                            ft.point[Xt] = cn,
                            Xt++
                        } else if (Hr.isHemisphereLight) {
                            const cn = lt.get(Hr);
                            cn.skyColor.copy(Hr.color).multiplyScalar(dn * zr),
                            cn.groundColor.copy(Hr.groundColor).multiplyScalar(dn * zr),
                            ft.hemi[sr] = cn,
                            sr++
                        }
                    }
                    Yt > 0 && (tt.isWebGL2 || Tt.has("OES_texture_float_linear") === !0 ? (ft.rectAreaLTC1 = Dn.LTC_FLOAT_1,
                    ft.rectAreaLTC2 = Dn.LTC_FLOAT_2) : Tt.has("OES_texture_half_float_linear") === !0 ? (ft.rectAreaLTC1 = Dn.LTC_HALF_1,
                    ft.rectAreaLTC2 = Dn.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
                    ft.ambient[0] = jt,
                    ft.ambient[1] = Wt,
                    ft.ambient[2] = Qt;
                    const Nr = ft.hash;
                    Nr.directionalLength === qt && Nr.pointLength === Xt && Nr.spotLength === Zt && Nr.rectAreaLength === Yt && Nr.hemiLength === sr && Nr.numDirectionalShadows === er && Nr.numPointShadows === rr && Nr.numSpotShadows === xr && Nr.numSpotMaps === br && Nr.numLightProbes === Pr || (ft.directional.length = qt,
                    ft.spot.length = Zt,
                    ft.rectArea.length = Yt,
                    ft.point.length = Xt,
                    ft.hemi.length = sr,
                    ft.directionalShadow.length = er,
                    ft.directionalShadowMap.length = er,
                    ft.pointShadow.length = rr,
                    ft.pointShadowMap.length = rr,
                    ft.spotShadow.length = xr,
                    ft.spotShadowMap.length = xr,
                    ft.directionalShadowMatrix.length = er,
                    ft.pointShadowMatrix.length = rr,
                    ft.spotLightMatrix.length = xr + br - yr,
                    ft.spotLightMap.length = br,
                    ft.numSpotLightShadowsWithMaps = yr,
                    ft.numLightProbes = Pr,
                    Nr.directionalLength = qt,
                    Nr.pointLength = Xt,
                    Nr.spotLength = Zt,
                    Nr.rectAreaLength = Yt,
                    Nr.hemiLength = sr,
                    Nr.numDirectionalShadows = er,
                    Nr.numPointShadows = rr,
                    Nr.numSpotShadows = xr,
                    Nr.numSpotMaps = br,
                    Nr.numLightProbes = Pr,
                    ft.version = q1++)
                },
                setupView: function(Lt, Nt) {
                    let jt = 0
                      , Wt = 0
                      , Qt = 0
                      , qt = 0
                      , Xt = 0;
                    const Zt = Nt.matrixWorldInverse;
                    for (let Yt = 0, sr = Lt.length; Yt < sr; Yt++) {
                        const er = Lt[Yt];
                        if (er.isDirectionalLight) {
                            const rr = ft.directional[jt];
                            rr.direction.setFromMatrixPosition(er.matrixWorld),
                            xt.setFromMatrixPosition(er.target.matrixWorld),
                            rr.direction.sub(xt),
                            rr.direction.transformDirection(Zt),
                            jt++
                        } else if (er.isSpotLight) {
                            const rr = ft.spot[Qt];
                            rr.position.setFromMatrixPosition(er.matrixWorld),
                            rr.position.applyMatrix4(Zt),
                            rr.direction.setFromMatrixPosition(er.matrixWorld),
                            xt.setFromMatrixPosition(er.target.matrixWorld),
                            rr.direction.sub(xt),
                            rr.direction.transformDirection(Zt),
                            Qt++
                        } else if (er.isRectAreaLight) {
                            const rr = ft.rectArea[qt];
                            rr.position.setFromMatrixPosition(er.matrixWorld),
                            rr.position.applyMatrix4(Zt),
                            Mt.identity(),
                            Ct.copy(er.matrixWorld),
                            Ct.premultiply(Zt),
                            Mt.extractRotation(Ct),
                            rr.halfWidth.set(.5 * er.width, 0, 0),
                            rr.halfHeight.set(0, .5 * er.height, 0),
                            rr.halfWidth.applyMatrix4(Mt),
                            rr.halfHeight.applyMatrix4(Mt),
                            qt++
                        } else if (er.isPointLight) {
                            const rr = ft.point[Wt];
                            rr.position.setFromMatrixPosition(er.matrixWorld),
                            rr.position.applyMatrix4(Zt),
                            Wt++
                        } else if (er.isHemisphereLight) {
                            const rr = ft.hemi[Xt];
                            rr.direction.setFromMatrixPosition(er.matrixWorld),
                            rr.direction.transformDirection(Zt),
                            Xt++
                        }
                    }
                },
                state: ft
            }
        }
        function gx(Tt, tt) {
            const lt = new X1(Tt,tt)
              , mt = []
              , ft = [];
            return {
                init: function() {
                    mt.length = 0,
                    ft.length = 0
                },
                state: {
                    lightsArray: mt,
                    shadowsArray: ft,
                    lights: lt
                },
                setupLights: function(xt) {
                    lt.setup(mt, xt)
                },
                setupLightsView: function(xt) {
                    lt.setupView(mt, xt)
                },
                pushLight: function(xt) {
                    mt.push(xt)
                },
                pushShadow: function(xt) {
                    ft.push(xt)
                }
            }
        }
        function Y1(Tt, tt) {
            let lt = new WeakMap;
            return {
                get: function(mt, ft=0) {
                    const xt = lt.get(mt);
                    let Ct;
                    return xt === void 0 ? (Ct = new gx(Tt,tt),
                    lt.set(mt, [Ct])) : ft >= xt.length ? (Ct = new gx(Tt,tt),
                    xt.push(Ct)) : Ct = xt[ft],
                    Ct
                },
                dispose: function() {
                    lt = new WeakMap
                }
            }
        }
        class H0 extends hs {
            constructor(tt) {
                super(),
                this.isMeshDepthMaterial = !0,
                this.type = "MeshDepthMaterial",
                this.depthPacking = up,
                this.map = null,
                this.alphaMap = null,
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.depthPacking = tt.depthPacking,
                this.map = tt.map,
                this.alphaMap = tt.alphaMap,
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this
            }
        }
        class Q0 extends hs {
            constructor(tt) {
                super(),
                this.isMeshDistanceMaterial = !0,
                this.type = "MeshDistanceMaterial",
                this.map = null,
                this.alphaMap = null,
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.map = tt.map,
                this.alphaMap = tt.alphaMap,
                this.displacementMap = tt.displacementMap,
                this.displacementScale = tt.displacementScale,
                this.displacementBias = tt.displacementBias,
                this
            }
        }
        function K1(Tt, tt, lt) {
            let mt = new Av;
            const ft = new mn
              , xt = new mn
              , Ct = new Lo
              , Mt = new H0({
                depthPacking: Qm
            })
              , Lt = new Q0
              , Nt = {}
              , jt = lt.maxTextureSize
              , Wt = {
                [vt]: bt,
                [bt]: vt,
                [St]: St
            }
              , Qt = new zl({
                defines: {
                    VSM_SAMPLES: 8
                },
                uniforms: {
                    shadow_pass: {
                        value: null
                    },
                    resolution: {
                        value: new mn
                    },
                    radius: {
                        value: 4
                    }
                },
                vertexShader: `void main() {
	gl_Position = vec4( position, 1.0 );
}

export default Sv;
