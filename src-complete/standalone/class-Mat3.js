/* Standalone Class: Mat3 */

class Mat3 {
    constructor(o) {
        o === void 0 && (o = [0, 0, 0, 0, 0, 0, 0, 0, 0]),
        this.elements = o
    }
    identity() {
        const o = this.elements;
        o[0] = 1,
        o[1] = 0,
        o[2] = 0,
        o[3] = 0,
        o[4] = 1,
        o[5] = 0,
        o[6] = 0,
        o[7] = 0,
        o[8] = 1
    }
    setZero() {
        const o = this.elements;
        o[0] = 0,
        o[1] = 0,
        o[2] = 0,
        o[3] = 0,
        o[4] = 0,
        o[5] = 0,
        o[6] = 0,
        o[7] = 0,
        o[8] = 0
    }
    setTrace(o) {
        const c = this.elements;
        c[0] = o.x,
        c[4] = o.y,
        c[8] = o.z
    }
    getTrace(o) {
        o === void 0 && (o = new Vec3);
        const c = this.elements;
        return o.x = c[0],
        o.y = c[4],
        o.z = c[8],
        o
    }
    vmult(o, c) {
        c === void 0 && (c = new Vec3);
        const h = this.elements
          , _ = o.x
          , b = o.y
          , _e = o.z;
        return c.x = h[0] * _ + h[1] * b + h[2] * _e,
        c.y = h[3] * _ + h[4] * b + h[5] * _e,
        c.z = h[6] * _ + h[7] * b + h[8] * _e,
        c
    }
    smult(o) {
        for (let c = 0; c < this.elements.length; c++)
            this.elements[c] *= o
    }
    mmult(o, c) {
        c === void 0 && (c = new Mat3);
        const h = this.elements
          , _ = o.elements
          , b = c.elements
          , _e = h[0]
          , nt = h[1]
          , it = h[2]
          , at = h[3]
          , ut = h[4]
          , pt = h[5]
          , ht = h[6]
          , _t = h[7]
          , vt = h[8]
          , bt = _[0]
          , St = _[1]
          , At = _[2]
          , Et = _[3]
          , Pt = _[4]
          , It = _[5]
          , Dt = _[6]
          , Gt = _[7]
          , Bt = _[8];
        return b[0] = _e * bt + nt * Et + it * Dt,
        b[1] = _e * St + nt * Pt + it * Gt,
        b[2] = _e * At + nt * It + it * Bt,
        b[3] = at * bt + ut * Et + pt * Dt,
        b[4] = at * St + ut * Pt + pt * Gt,
        b[5] = at * At + ut * It + pt * Bt,
        b[6] = ht * bt + _t * Et + vt * Dt,
        b[7] = ht * St + _t * Pt + vt * Gt,
        b[8] = ht * At + _t * It + vt * Bt,
        c
    }
    scale(o, c) {
        c === void 0 && (c = new Mat3);
        const h = this.elements
          , _ = c.elements;
        for (let b = 0; b !== 3; b++)
            _[3 * b + 0] = o.x * h[3 * b + 0],
            _[3 * b + 1] = o.y * h[3 * b + 1],
            _[3 * b + 2] = o.z * h[3 * b + 2];
        return c
    }
    solve(o, c) {
        c === void 0 && (c = new Vec3);
        const h = [];
        let _, b;
        for (_ = 0; _ < 12; _++)
            h.push(0);
        for (_ = 0; _ < 3; _++)
            for (b = 0; b < 3; b++)
                h[_ + 4 * b] = this.elements[_ + 3 * b];
        h[3] = o.x,
        h[7] = o.y,
        h[11] = o.z;
        let _e = 3;
        const nt = _e;
        let it, at;
        do {
            if (_ = nt - _e,
            h[_ + 4 * _] === 0) {
                for (b = _ + 1; b < nt; b++)
                    if (h[_ + 4 * b] !== 0) {
                        it = 4;
                        do
                            at = 4 - it,
                            h[at + 4 * _] += h[at + 4 * b];
                        while (--it);
                        break
                    }
            }
            if (h[_ + 4 * _] !== 0)
                for (b = _ + 1; b < nt; b++) {
                    const ut = h[_ + 4 * b] / h[_ + 4 * _];
                    it = 4;
                    do
                        at = 4 - it,
                        h[at + 4 * b] = at <= _ ? 0 : h[at + 4 * b] - h[at + 4 * _] * ut;
                    while (--it)
                }
        } while (--_e);
        if (c.z = h[11] / h[10],
        c.y = (h[7] - h[6] * c.z) / h[5],
        c.x = (h[3] - h[2] * c.z - h[1] * c.y) / h[0],
        isNaN(c.x) || isNaN(c.y) || isNaN(c.z) || c.x === 1 / 0 || c.y === 1 / 0 || c.z === 1 / 0)
            throw `Could not solve equation! Got x=[${c.toString()}], b=[${o.toString()}], A=[${this.toString()}]`;
        return c
    }
    e(o, c, h) {
        if (h === void 0)
            return this.elements[c + 3 * o];
        this.elements[c + 3 * o] = h
    }
    copy(o) {
        for (let c = 0; c < o.elements.length; c++)
            this.elements[c] = o.elements[c];
        return this
    }
    toString() {
        let o = "";
        for (let c = 0; c < 9; c++)
            o += this.elements[c] + ",";
        return o
    }
    reverse(o) {
        o === void 0 && (o = new Mat3);
        const c = reverse_eqns;
        let h, _;
        for (h = 0; h < 3; h++)
            for (_ = 0; _ < 3; _++)
                c[h + 6 * _] = this.elements[h + 3 * _];
        c[3] = 1,
        c[9] = 0,
        c[15] = 0,
        c[4] = 0,
        c[10] = 1,
        c[16] = 0,
        c[5] = 0,
        c[11] = 0,
        c[17] = 1;
        let b = 3;
        const _e = b;
        let nt, it;
        do {
            if (h = _e - b,
            c[h + 6 * h] === 0) {
                for (_ = h + 1; _ < _e; _++)
                    if (c[h + 6 * _] !== 0) {
                        nt = 6;
                        do
                            it = 6 - nt,
                            c[it + 6 * h] += c[it + 6 * _];
                        while (--nt);
                        break
                    }
            }
            if (c[h + 6 * h] !== 0)
                for (_ = h + 1; _ < _e; _++) {
                    const at = c[h + 6 * _] / c[h + 6 * h];
                    nt = 6;
                    do
                        it = 6 - nt,
                        c[it + 6 * _] = it <= h ? 0 : c[it + 6 * _] - c[it + 6 * h] * at;
                    while (--nt)
                }
        } while (--b);
        h = 2;
        do {
            _ = h - 1;
            do {
                const at = c[h + 6 * _] / c[h + 6 * h];
                nt = 6;
                do
                    it = 6 - nt,
                    c[it + 6 * _] = c[it + 6 * _] - c[it + 6 * h] * at;
                while (--nt)
            } while (_--)
        } while (--h);
        h = 2;
        do {
            const at = 1 / c[h + 6 * h];
            nt = 6;
            do
                it = 6 - nt,
                c[it + 6 * h] = c[it + 6 * h] * at;
            while (--nt)
        } while (h--);
        h = 2;
        do {
            _ = 2;
            do {
                if (it = c[3 + _ + 6 * h],
                isNaN(it) || it === 1 / 0)
                    throw `Could not reverse! A=[${this.toString()}]`;
                o.e(h, _, it)
            } while (_--)
        } while (h--);
        return o
    }
    setRotationFromQuaternion(o) {
        const c = o.x
          , h = o.y
          , _ = o.z
          , b = o.w
          , _e = c + c
          , nt = h + h
          , it = _ + _
          , at = c * _e
          , ut = c * nt
          , pt = c * it
          , ht = h * nt
          , _t = h * it
          , vt = _ * it
          , bt = b * _e
          , St = b * nt
          , At = b * it
          , Et = this.elements;
        return Et[0] = 1 - (ht + vt),
        Et[1] = ut - At,
        Et[2] = pt + St,
        Et[3] = ut + At,
        Et[4] = 1 - (at + vt),
        Et[5] = _t - bt,
        Et[6] = pt - St,
        Et[7] = _t + bt,
        Et[8] = 1 - (at + ht),
        this
    }
    transpose(o) {
        o === void 0 && (o = new Mat3);
        const c = this.elements
          , h = o.elements;
        let _;
        return h[0] = c[0],
        h[4] = c[4],
        h[8] = c[8],
        _ = c[1],
        h[1] = c[3],
        h[3] = _,
        _ = c[2],
        h[2] = c[6],
        h[6] = _,
        _ = c[5],
        h[5] = c[7],
        h[7] = _,
        o
    }
}

export default Mat3;
