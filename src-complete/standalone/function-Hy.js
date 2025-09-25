/* Standalone Function: Hy */

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

export default Hy;
