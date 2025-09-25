/* Standalone Class: xv */

class xv extends Mo {
            constructor() {
                super(),
                this.isCamera = !0,
                this.type = "Camera",
                this.matrixWorldInverse = new no,
                this.projectionMatrix = new no,
                this.projectionMatrixInverse = new no,
                this.coordinateSystem = Qs
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.matrixWorldInverse.copy(tt.matrixWorldInverse),
                this.projectionMatrix.copy(tt.projectionMatrix),
                this.projectionMatrixInverse.copy(tt.projectionMatrixInverse),
                this.coordinateSystem = tt.coordinateSystem,
                this
            }
            getWorldDirection(tt) {
                return super.getWorldDirection(tt).negate()
            }
            updateMatrixWorld(tt) {
                super.updateMatrixWorld(tt),
                this.matrixWorldInverse.copy(this.matrixWorld).invert()
            }
            updateWorldMatrix(tt, lt) {
                super.updateWorldMatrix(tt, lt),
                this.matrixWorldInverse.copy(this.matrixWorld).invert()
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        class Cs extends xv {
            constructor(tt=50, lt=1, mt=.1, ft=2e3) {
                super(),
                this.isPerspectiveCamera = !0,
                this.type = "PerspectiveCamera",
                this.fov = tt,
                this.zoom = 1,
                this.near = mt,
                this.far = ft,
                this.focus = 10,
                this.aspect = lt,
                this.view = null,
                this.filmGauge = 35,
                this.filmOffset = 0,
                this.updateProjectionMatrix()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                this.fov = tt.fov,
                this.zoom = tt.zoom,
                this.near = tt.near,
                this.far = tt.far,
                this.focus = tt.focus,
                this.aspect = tt.aspect,
                this.view = tt.view === null ? null : Object.assign({}, tt.view),
                this.filmGauge = tt.filmGauge,
                this.filmOffset = tt.filmOffset,
                this
            }
            setFocalLength(tt) {
                const lt = .5 * this.getFilmHeight() / tt;
                this.fov = 2 * _u * Math.atan(lt),
                this.updateProjectionMatrix()
            }
            getFocalLength() {
                const tt = Math.tan(.5 * Zl * this.fov);
                return .5 * this.getFilmHeight() / tt
            }
            getEffectiveFOV() {
                return 2 * _u * Math.atan(Math.tan(.5 * Zl * this.fov) / this.zoom)
            }
            getFilmWidth() {
                return this.filmGauge * Math.min(this.aspect, 1)
            }
            getFilmHeight() {
                return this.filmGauge / Math.max(this.aspect, 1)
            }
            setViewOffset(tt, lt, mt, ft, xt, Ct) {
                this.aspect = tt / lt,
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
                const tt = this.near;
                let lt = tt * Math.tan(.5 * Zl * this.fov) / this.zoom
                  , mt = 2 * lt
                  , ft = this.aspect * mt
                  , xt = -.5 * ft;
                const Ct = this.view;
                if (this.view !== null && this.view.enabled) {
                    const Lt = Ct.fullWidth
                      , Nt = Ct.fullHeight;
                    xt += Ct.offsetX * ft / Lt,
                    lt -= Ct.offsetY * mt / Nt,
                    ft *= Ct.width / Lt,
                    mt *= Ct.height / Nt
                }
                const Mt = this.filmOffset;
                Mt !== 0 && (xt += tt * Mt / this.getFilmWidth()),
                this.projectionMatrix.makePerspective(xt, xt + ft, lt, lt - mt, tt, this.far, this.coordinateSystem),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
            }
            toJSON(tt) {
                const lt = super.toJSON(tt);
                return lt.object.fov = this.fov,
                lt.object.zoom = this.zoom,
                lt.object.near = this.near,
                lt.object.far = this.far,
                lt.object.focus = this.focus,
                lt.object.aspect = this.aspect,
                this.view !== null && (lt.object.view = Object.assign({}, this.view)),
                lt.object.filmGauge = this.filmGauge,
                lt.object.filmOffset = this.filmOffset,
                lt
            }
        }
        const ym = -90;
        class Gy extends Mo {
            constructor(tt, lt, mt) {
                super(),
                this.type = "CubeCamera",
                this.renderTarget = mt,
                this.coordinateSystem = null,
                this.activeMipmapLevel = 0;
                const ft = new Cs(ym,1,tt,lt);
                ft.layers = this.layers,
                this.add(ft);
                const xt = new Cs(ym,1,tt,lt);
                xt.layers = this.layers,
                this.add(xt);
                const Ct = new Cs(ym,1,tt,lt);
                Ct.layers = this.layers,
                this.add(Ct);
                const Mt = new Cs(ym,1,tt,lt);
                Mt.layers = this.layers,
                this.add(Mt);
                const Lt = new Cs(ym,1,tt,lt);
                Lt.layers = this.layers,
                this.add(Lt);
                const Nt = new Cs(ym,1,tt,lt);
                Nt.layers = this.layers,
                this.add(Nt)
            }
            updateCoordinateSystem() {
                const tt = this.coordinateSystem
                  , lt = this.children.concat()
                  , [mt,ft,xt,Ct,Mt,Lt] = lt;
                for (const Nt of lt)
                    this.remove(Nt);
                if (tt === Qs)
                    mt.up.set(0, 1, 0),
                    mt.lookAt(1, 0, 0),
                    ft.up.set(0, 1, 0),
                    ft.lookAt(-1, 0, 0),
                    xt.up.set(0, 0, -1),
                    xt.lookAt(0, 1, 0),
                    Ct.up.set(0, 0, 1),
                    Ct.lookAt(0, -1, 0),
                    Mt.up.set(0, 1, 0),
                    Mt.lookAt(0, 0, 1),
                    Lt.up.set(0, 1, 0),
                    Lt.lookAt(0, 0, -1);
                else {
                    if (tt !== na)
                        throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + tt);
                    mt.up.set(0, -1, 0),
                    mt.lookAt(-1, 0, 0),
                    ft.up.set(0, -1, 0),
                    ft.lookAt(1, 0, 0),
                    xt.up.set(0, 0, 1),
                    xt.lookAt(0, 1, 0),
                    Ct.up.set(0, 0, -1),
                    Ct.lookAt(0, -1, 0),
                    Mt.up.set(0, -1, 0),
                    Mt.lookAt(0, 0, 1),
                    Lt.up.set(0, -1, 0),
                    Lt.lookAt(0, 0, -1)
                }
                for (const Nt of lt)
                    this.add(Nt),
                    Nt.updateMatrixWorld()
            }
            update(tt, lt) {
                this.parent === null && this.updateMatrixWorld();
                const {renderTarget: mt, activeMipmapLevel: ft} = this;
                this.coordinateSystem !== tt.coordinateSystem && (this.coordinateSystem = tt.coordinateSystem,
                this.updateCoordinateSystem());
                const [xt,Ct,Mt,Lt,Nt,jt] = this.children
                  , Wt = tt.getRenderTarget()
                  , Qt = tt.getActiveCubeFace()
                  , qt = tt.getActiveMipmapLevel()
                  , Xt = tt.xr.enabled;
                tt.xr.enabled = !1;
                const Zt = mt.texture.generateMipmaps;
                mt.texture.generateMipmaps = !1,
                tt.setRenderTarget(mt, 0, ft),
                tt.render(lt, xt),
                tt.setRenderTarget(mt, 1, ft),
                tt.render(lt, Ct),
                tt.setRenderTarget(mt, 2, ft),
                tt.render(lt, Mt),
                tt.setRenderTarget(mt, 3, ft),
                tt.render(lt, Lt),
                tt.setRenderTarget(mt, 4, ft),
                tt.render(lt, Nt),
                mt.texture.generateMipmaps = Zt,
                tt.setRenderTarget(mt, 5, ft),
                tt.render(lt, jt),
                tt.setRenderTarget(Wt, Qt, qt),
                tt.xr.enabled = Xt,
                mt.texture.needsPMREMUpdate = !0
            }
        }
        class f_ extends Ho {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt) {
                super(tt = tt !== void 0 ? tt : [], lt = lt !== void 0 ? lt : Qr, mt, ft, xt, Ct, Mt, Lt, Nt, jt),
                this.isCubeTexture = !0,
                this.flipY = !1
            }
            get images() {
                return this.image
            }
            set images(tt) {
                this.image = tt
            }
        }
        class zy extends Rs {
            constructor(tt=1, lt={}) {
                super(tt, tt, lt),
                this.isWebGLCubeRenderTarget = !0;
                const mt = {
                    width: tt,
                    height: tt,
                    depth: 1
                }
                  , ft = [mt, mt, mt, mt, mt, mt];
                lt.encoding !== void 0 && (xu("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),
                lt.colorSpace = lt.encoding === Ol ? jo : Oo),
                this.texture = new f_(ft,lt.mapping,lt.wrapS,lt.wrapT,lt.magFilter,lt.minFilter,lt.format,lt.type,lt.anisotropy,lt.colorSpace),
                this.texture.isRenderTargetTexture = !0,
                this.texture.generateMipmaps = lt.generateMipmaps !== void 0 && lt.generateMipmaps,
                this.texture.minFilter = lt.minFilter !== void 0 ? lt.minFilter : Rn
            }
            fromEquirectangularTexture(tt, lt) {
                this.texture.type = lt.type,
                this.texture.colorSpace = lt.colorSpace,
                this.texture.generateMipmaps = lt.generateMipmaps,
                this.texture.minFilter = lt.minFilter,
                this.texture.magFilter = lt.magFilter;
                const mt = {
                    tEquirect: {
                        value: null
                    }
                }
                  , ft = `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
                  , xt = `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
                  , Ct = new Zu(5,5,5)
                  , Mt = new zl({
                    name: "CubemapFromEquirect",
                    uniforms: Sp(mt),
                    vertexShader: ft,
                    fragmentShader: xt,
                    side: bt,
                    blending: Et
                });
                Mt.uniforms.tEquirect.value = lt;
                const Lt = new gs(Ct,Mt)
                  , Nt = lt.minFilter;
                return lt.minFilter === vo && (lt.minFilter = Rn),
                new Gy(1,10,this).update(tt, Lt),
                lt.minFilter = Nt,
                Lt.geometry.dispose(),
                Lt.material.dispose(),
                this
            }
            clear(tt, lt, mt, ft) {
                const xt = tt.getRenderTarget();
                for (let Ct = 0; Ct < 6; Ct++)
                    tt.setRenderTarget(this, Ct),
                    tt.clear(lt, mt, ft);
                tt.setRenderTarget(xt)
            }
        }
        const F0 = new Er
          , Aw = new Er
          , ww = new lo;
        class _d {
            constructor(tt=new Er(1,0,0), lt=0) {
                this.isPlane = !0,
                this.normal = tt,
                this.constant = lt
            }
            set(tt, lt) {
                return this.normal.copy(tt),
                this.constant = lt,
                this
            }
            setComponents(tt, lt, mt, ft) {
                return this.normal.set(tt, lt, mt),
                this.constant = ft,
                this
            }
            setFromNormalAndCoplanarPoint(tt, lt) {
                return this.normal.copy(tt),
                this.constant = -lt.dot(this.normal),
                this
            }
            setFromCoplanarPoints(tt, lt, mt) {
                const ft = F0.subVectors(mt, lt).cross(Aw.subVectors(tt, lt)).normalize();
                return this.setFromNormalAndCoplanarPoint(ft, tt),
                this
            }
            copy(tt) {
                return this.normal.copy(tt.normal),
                this.constant = tt.constant,
                this
            }
            normalize() {
                const tt = 1 / this.normal.length();
                return this.normal.multiplyScalar(tt),
                this.constant *= tt,
                this
            }
            negate() {
                return this.constant *= -1,
                this.normal.negate(),
                this
            }
            distanceToPoint(tt) {
                return this.normal.dot(tt) + this.constant
            }
            distanceToSphere(tt) {
                return this.distanceToPoint(tt.center) - tt.radius
            }
            projectPoint(tt, lt) {
                return lt.copy(tt).addScaledVector(this.normal, -this.distanceToPoint(tt))
            }
            intersectLine(tt, lt) {
                const mt = tt.delta(F0)
                  , ft = this.normal.dot(mt);
                if (ft === 0)
                    return this.distanceToPoint(tt.start) === 0 ? lt.copy(tt.start) : null;
                const xt = -(tt.start.dot(this.normal) + this.constant) / ft;
                return xt < 0 || xt > 1 ? null : lt.copy(tt.start).addScaledVector(mt, xt)
            }
            intersectsLine(tt) {
                const lt = this.distanceToPoint(tt.start)
                  , mt = this.distanceToPoint(tt.end);
                return lt < 0 && mt > 0 || mt < 0 && lt > 0
            }
            intersectsBox(tt) {
                return tt.intersectsPlane(this)
            }
            intersectsSphere(tt) {
                return tt.intersectsPlane(this)
            }
            coplanarPoint(tt) {
                return tt.copy(this.normal).multiplyScalar(-this.constant)
            }
            applyMatrix4(tt, lt) {
                const mt = lt || ww.getNormalMatrix(tt)
                  , ft = this.coplanarPoint(F0).applyMatrix4(tt)
                  , xt = this.normal.applyMatrix3(mt).normalize();
                return this.constant = -ft.dot(xt),
                this
            }
            translate(tt) {
                return this.constant -= tt.dot(this.normal),
                this
            }
            equals(tt) {
                return tt.normal.equals(this.normal) && tt.constant === this.constant
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        const Ep = new Ws
          , bv = new Er;
        class Av {
            constructor(tt=new _d, lt=new _d, mt=new _d, ft=new _d, xt=new _d, Ct=new _d) {
                this.planes = [tt, lt, mt, ft, xt, Ct]
            }
            set(tt, lt, mt, ft, xt, Ct) {
                const Mt = this.planes;
                return Mt[0].copy(tt),
                Mt[1].copy(lt),
                Mt[2].copy(mt),
                Mt[3].copy(ft),
                Mt[4].copy(xt),
                Mt[5].copy(Ct),
                this
            }
            copy(tt) {
                const lt = this.planes;
                for (let mt = 0; mt < 6; mt++)
                    lt[mt].copy(tt.planes[mt]);
                return this
            }
            setFromProjectionMatrix(tt, lt=Qs) {
                const mt = this.planes
                  , ft = tt.elements
                  , xt = ft[0]
                  , Ct = ft[1]
                  , Mt = ft[2]
                  , Lt = ft[3]
                  , Nt = ft[4]
                  , jt = ft[5]
                  , Wt = ft[6]
                  , Qt = ft[7]
                  , qt = ft[8]
                  , Xt = ft[9]
                  , Zt = ft[10]
                  , Yt = ft[11]
                  , sr = ft[12]
                  , er = ft[13]
                  , rr = ft[14]
                  , xr = ft[15];
                if (mt[0].setComponents(Lt - xt, Qt - Nt, Yt - qt, xr - sr).normalize(),
                mt[1].setComponents(Lt + xt, Qt + Nt, Yt + qt, xr + sr).normalize(),
                mt[2].setComponents(Lt + Ct, Qt + jt, Yt + Xt, xr + er).normalize(),
                mt[3].setComponents(Lt - Ct, Qt - jt, Yt - Xt, xr - er).normalize(),
                mt[4].setComponents(Lt - Mt, Qt - Wt, Yt - Zt, xr - rr).normalize(),
                lt === Qs)
                    mt[5].setComponents(Lt + Mt, Qt + Wt, Yt + Zt, xr + rr).normalize();
                else {
                    if (lt !== na)
                        throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + lt);
                    mt[5].setComponents(Mt, Wt, Zt, rr).normalize()
                }
                return this
            }
            intersectsObject(tt) {
                if (tt.boundingSphere !== void 0)
                    tt.boundingSphere === null && tt.computeBoundingSphere(),
                    Ep.copy(tt.boundingSphere).applyMatrix4(tt.matrixWorld);
                else {
                    const lt = tt.geometry;
                    lt.boundingSphere === null && lt.computeBoundingSphere(),
                    Ep.copy(lt.boundingSphere).applyMatrix4(tt.matrixWorld)
                }
                return this.intersectsSphere(Ep)
            }
            intersectsSprite(tt) {
                return Ep.center.set(0, 0, 0),
                Ep.radius = .7071067811865476,
                Ep.applyMatrix4(tt.matrixWorld),
                this.intersectsSphere(Ep)
            }
            intersectsSphere(tt) {
                const lt = this.planes
                  , mt = tt.center
                  , ft = -tt.radius;
                for (let xt = 0; xt < 6; xt++)
                    if (lt[xt].distanceToPoint(mt) < ft)
                        return !1;
                return !0
            }
            intersectsBox(tt) {
                const lt = this.planes;
                for (let mt = 0; mt < 6; mt++) {
                    const ft = lt[mt];
                    if (bv.x = ft.normal.x > 0 ? tt.max.x : tt.min.x,
                    bv.y = ft.normal.y > 0 ? tt.max.y : tt.min.y,
                    bv.z = ft.normal.z > 0 ? tt.max.z : tt.min.z,
                    ft.distanceToPoint(bv) < 0)
                        return !1
                }
                return !0
            }
            containsPoint(tt) {
                const lt = this.planes;
                for (let mt = 0; mt < 6; mt++)
                    if (lt[mt].distanceToPoint(tt) < 0)
                        return !1;
                return !0
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        function Hy() {
            let Tt = null
              , tt = !1
              , lt = null
              , mt = null;
            function ft(xt, Ct) {
                lt(xt, Ct),
                mt = Tt.requestAnimationFrame(ft)
            }
            return {
                start: function() {
                    tt !== !0 && lt !== null && (mt = Tt.requestAnimationFrame(ft),
                    tt = !0)
                },
                stop: function() {
                    Tt.cancelAnimationFrame(mt),
                    tt = !1
                },
                setAnimationLoop: function(xt) {
                    lt = xt
                },
                setContext: function(xt) {
                    Tt = xt
                }
            }
        }
        function Sw(Tt, tt) {
            const lt = tt.isWebGL2
              , mt = new WeakMap;
            return {
                get: function(ft) {
                    return ft.isInterleavedBufferAttribute && (ft = ft.data),
                    mt.get(ft)
                },
                remove: function(ft) {
                    ft.isInterleavedBufferAttribute && (ft = ft.data);
                    const xt = mt.get(ft);
                    xt && (Tt.deleteBuffer(xt.buffer),
                    mt.delete(ft))
                },
                update: function(ft, xt) {
                    if (ft.isGLBufferAttribute) {
                        const Mt = mt.get(ft);
                        return void ((!Mt || Mt.version < ft.version) && mt.set(ft, {
                            buffer: ft.buffer,
                            type: ft.type,
                            bytesPerElement: ft.elementSize,
                            version: ft.version
                        }))
                    }
                    ft.isInterleavedBufferAttribute && (ft = ft.data);
                    const Ct = mt.get(ft);
                    Ct === void 0 ? mt.set(ft, function(Mt, Lt) {
                        const Nt = Mt.array
                          , jt = Mt.usage
                          , Wt = Tt.createBuffer();
                        let Qt;
                        if (Tt.bindBuffer(Lt, Wt),
                        Tt.bufferData(Lt, Nt, jt),
                        Mt.onUploadCallback(),
                        Nt instanceof Float32Array)
                            Qt = Tt.FLOAT;
                        else if (Nt instanceof Uint16Array)
                            if (Mt.isFloat16BufferAttribute) {
                                if (!lt)
                                    throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
                                Qt = Tt.HALF_FLOAT
                            } else
                                Qt = Tt.UNSIGNED_SHORT;
                        else if (Nt instanceof Int16Array)
                            Qt = Tt.SHORT;
                        else if (Nt instanceof Uint32Array)
                            Qt = Tt.UNSIGNED_INT;
                        else if (Nt instanceof Int32Array)
                            Qt = Tt.INT;
                        else if (Nt instanceof Int8Array)
                            Qt = Tt.BYTE;
                        else if (Nt instanceof Uint8Array)
                            Qt = Tt.UNSIGNED_BYTE;
                        else {
                            if (!(Nt instanceof Uint8ClampedArray))
                                throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + Nt);
                            Qt = Tt.UNSIGNED_BYTE
                        }
                        return {
                            buffer: Wt,
                            type: Qt,
                            bytesPerElement: Nt.BYTES_PER_ELEMENT,
                            version: Mt.version
                        }
                    }(ft, xt)) : Ct.version < ft.version && (function(Mt, Lt, Nt) {
                        const jt = Lt.array
                          , Wt = Lt.updateRange;
                        Tt.bindBuffer(Nt, Mt),
                        Wt.count === -1 ? Tt.bufferSubData(Nt, 0, jt) : (lt ? Tt.bufferSubData(Nt, Wt.offset * jt.BYTES_PER_ELEMENT, jt, Wt.offset, Wt.count) : Tt.bufferSubData(Nt, Wt.offset * jt.BYTES_PER_ELEMENT, jt.subarray(Wt.offset, Wt.offset + Wt.count)),
                        Wt.count = -1),
                        Lt.onUploadCallback()
                    }(Ct.buffer, ft, xt),
                    Ct.version = ft.version)
                }
            }
        }
        class g_ extends bo {
            constructor(tt=1, lt=1, mt=1, ft=1) {
                super(),
                this.type = "PlaneGeometry",
                this.parameters = {
                    width: tt,
                    height: lt,
                    widthSegments: mt,
                    heightSegments: ft
                };
                const xt = tt / 2
                  , Ct = lt / 2
                  , Mt = Math.floor(mt)
                  , Lt = Math.floor(ft)
                  , Nt = Mt + 1
                  , jt = Lt + 1
                  , Wt = tt / Mt
                  , Qt = lt / Lt
                  , qt = []
                  , Xt = []
                  , Zt = []
                  , Yt = [];
                for (let sr = 0; sr < jt; sr++) {
                    const er = sr * Qt - Ct;
                    for (let rr = 0; rr < Nt; rr++) {
                        const xr = rr * Wt - xt;
                        Xt.push(xr, -er, 0),
                        Zt.push(0, 0, 1),
                        Yt.push(rr / Mt),
                        Yt.push(1 - sr / Lt)
                    }
                }
                for (let sr = 0; sr < Lt; sr++)
                    for (let er = 0; er < Mt; er++) {
                        const rr = er + Nt * sr
                          , xr = er + Nt * (sr + 1)
                          , br = er + 1 + Nt * (sr + 1)
                          , yr = er + 1 + Nt * sr;
                        qt.push(rr, xr, yr),
                        qt.push(xr, br, yr)
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
                return new g_(tt.width,tt.height,tt.widthSegments,tt.heightSegments)
            }
        }
        const go = {
            alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
            alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
            alphamap_fragment: `#ifdef USE_ALPHAMAP
	#if defined(INVERSE_ALPHAMAP) && INVERSE_ALPHAMAP >= 1
	diffuseColor.a *= 1.0-texture2D( alphaMap, vAlphaMapUv ).g;
	#else
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
	#endif
#endif`,
            alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
            alphatest_fragment: `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
            alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
            aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
            aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
            begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
            beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
            bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}

export default xv;
