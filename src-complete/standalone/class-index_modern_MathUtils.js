/* Standalone Class: index_modern_MathUtils */

class index_modern_MathUtils {
    static identity(o) {
        return o
    }
    static eq(o, c, h=1e-5) {
        if (o.length !== c.length)
            return !1;
        for (let _ = 0; _ < o.length; _++)
            if (Math.abs(o[_] - c[_]) > h)
                return !1;
        return !0
    }
    static clamp(o, c, h) {
        return o < c ? c : o > h ? h : o
    }
    static decodeNormalizedInt(o, c) {
        switch (c) {
        case 5126:
            return o;
        case 5123:
            return o / 65535;
        case 5121:
            return o / 255;
        case 5122:
            return Math.max(o / 32767, -1);
        case 5120:
            return Math.max(o / 127, -1);
        default:
            throw new Error("Invalid component type.")
        }
    }
    static encodeNormalizedInt(o, c) {
        switch (c) {
        case 5126:
            return o;
        case 5123:
            return Math.round(65535 * index_modern_MathUtils.clamp(o, 0, 1));
        case 5121:
            return Math.round(255 * index_modern_MathUtils.clamp(o, 0, 1));
        case 5122:
            return Math.round(32767 * index_modern_MathUtils.clamp(o, -1, 1));
        case 5120:
            return Math.round(127 * index_modern_MathUtils.clamp(o, -1, 1));
        default:
            throw new Error("Invalid component type.")
        }
    }
    static decompose(o, c, h, _) {
        let b = index_modern_length([o[0], o[1], o[2]]);
        const _e = index_modern_length([o[4], o[5], o[6]])
          , nt = index_modern_length([o[8], o[9], o[10]]);
        determinant(o) < 0 && (b = -b),
        c[0] = o[12],
        c[1] = o[13],
        c[2] = o[14];
        const it = o.slice()
          , at = 1 / b
          , ut = 1 / _e
          , pt = 1 / nt;
        it[0] *= at,
        it[1] *= at,
        it[2] *= at,
        it[4] *= ut,
        it[5] *= ut,
        it[6] *= ut,
        it[8] *= pt,
        it[9] *= pt,
        it[10] *= pt,
        getRotation(h, it),
        _[0] = b,
        _[1] = _e,
        _[2] = nt
    }
    static compose(o, c, h, _) {
        const b = _
          , _e = c[0]
          , nt = c[1]
          , it = c[2]
          , at = c[3]
          , ut = _e + _e
          , pt = nt + nt
          , ht = it + it
          , _t = _e * ut
          , vt = _e * pt
          , bt = _e * ht
          , St = nt * pt
          , At = nt * ht
          , Et = it * ht
          , Pt = at * ut
          , It = at * pt
          , Dt = at * ht
          , Gt = h[0]
          , Bt = h[1]
          , kt = h[2];
        return b[0] = (1 - (St + Et)) * Gt,
        b[1] = (vt + Dt) * Gt,
        b[2] = (bt - It) * Gt,
        b[3] = 0,
        b[4] = (vt - Dt) * Bt,
        b[5] = (1 - (_t + Et)) * Bt,
        b[6] = (At + Pt) * Bt,
        b[7] = 0,
        b[8] = (bt + It) * kt,
        b[9] = (At - Pt) * kt,
        b[10] = (1 - (_t + St)) * kt,
        b[11] = 0,
        b[12] = o[0],
        b[13] = o[1],
        b[14] = o[2],
        b[15] = 1,
        b
    }
}

export default index_modern_MathUtils;
