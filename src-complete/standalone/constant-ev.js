/* Standalone Constant: ev */

const ev = {
            DEG2RAD: Zl,
            RAD2DEG: _u,
            generateUUID: Ms,
            clamp: qo,
            euclideanModulo: em,
            mapLinear: function(Tt, tt, lt, mt, ft) {
                return mt + (Tt - tt) * (ft - mt) / (lt - tt)
            },
            inverseLerp: function(Tt, tt, lt) {
                return Tt !== tt ? (lt - Tt) / (tt - Tt) : 0
            },
            lerp: Fu,
            damp: function(Tt, tt, lt, mt) {
                return Fu(Tt, tt, 1 - Math.exp(-lt * mt))
            },
            pingpong: function(Tt, tt=1) {
                return tt - Math.abs(em(Tt, 2 * tt) - tt)
            },
            smoothstep: function(Tt, tt, lt) {
                return Tt <= tt ? 0 : Tt >= lt ? 1 : (Tt = (Tt - tt) / (lt - tt)) * Tt * (3 - 2 * Tt)
            },
            smootherstep: function(Tt, tt, lt) {
                return Tt <= tt ? 0 : Tt >= lt ? 1 : (Tt = (Tt - tt) / (lt - tt)) * Tt * Tt * (Tt * (6 * Tt - 15) + 10)
            },
            randInt: function(Tt, tt) {
                return Tt + Math.floor(Math.random() * (tt - Tt + 1))
            },
            randFloat: function(Tt, tt) {
                return Tt + Math.random() * (tt - Tt)
            },
            randFloatSpread: function(Tt) {
                return Tt * (.5 - Math.random())
            },
            seededRandom: function(Tt) {
                Tt !== void 0 && (Z_ = Tt);
                let tt = Z_ += 1831565813;
                return tt = Math.imul(tt ^ tt >>> 15, 1 | tt),
                tt ^= tt + Math.imul(tt ^ tt >>> 7, 61 | tt),
                ((tt ^ tt >>> 14) >>> 0) / 4294967296
            },
            degToRad: function(Tt) {
                return Tt * Zl
            },
            radToDeg: function(Tt) {
                return Tt * _u
            },
            isPowerOfTwo: tm,
            ceilPowerOfTwo: Km,
            floorPowerOfTwo: gp,
            setQuaternionFromProperEuler: function(Tt, tt, lt, mt, ft) {
                const xt = Math.cos
                  , Ct = Math.sin
                  , Mt = xt(lt / 2)
                  , Lt = Ct(lt / 2)
                  , Nt = xt((tt + mt) / 2)
                  , jt = Ct((tt + mt) / 2)
                  , Wt = xt((tt - mt) / 2)
                  , Qt = Ct((tt - mt) / 2)
                  , qt = xt((mt - tt) / 2)
                  , Xt = Ct((mt - tt) / 2);
                switch (ft) {
                case "XYX":
                    Tt.set(Mt * jt, Lt * Wt, Lt * Qt, Mt * Nt);
                    break;
                case "YZY":
                    Tt.set(Lt * Qt, Mt * jt, Lt * Wt, Mt * Nt);
                    break;
                case "ZXZ":
                    Tt.set(Lt * Wt, Lt * Qt, Mt * jt, Mt * Nt);
                    break;
                case "XZX":
                    Tt.set(Mt * jt, Lt * Xt, Lt * qt, Mt * Nt);
                    break;
                case "YXY":
                    Tt.set(Lt * qt, Mt * jt, Lt * Xt, Mt * Nt);
                    break;
                case "ZYZ":
                    Tt.set(Lt * Xt, Lt * qt, Mt * jt, Mt * Nt);
                    break;
                default:
                    console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + ft)
                }
            },
            normalize: oo,
            denormalize: ws
        };

export default ev;
