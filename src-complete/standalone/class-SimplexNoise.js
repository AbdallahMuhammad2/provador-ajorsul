/* Standalone Class: SimplexNoise */

class SimplexNoise {
    constructor(o=Math) {
        this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]],
        this.grad4 = [[0, 1, 1, 1], [0, 1, 1, -1], [0, 1, -1, 1], [0, 1, -1, -1], [0, -1, 1, 1], [0, -1, 1, -1], [0, -1, -1, 1], [0, -1, -1, -1], [1, 0, 1, 1], [1, 0, 1, -1], [1, 0, -1, 1], [1, 0, -1, -1], [-1, 0, 1, 1], [-1, 0, 1, -1], [-1, 0, -1, 1], [-1, 0, -1, -1], [1, 1, 0, 1], [1, 1, 0, -1], [1, -1, 0, 1], [1, -1, 0, -1], [-1, 1, 0, 1], [-1, 1, 0, -1], [-1, -1, 0, 1], [-1, -1, 0, -1], [1, 1, 1, 0], [1, 1, -1, 0], [1, -1, 1, 0], [1, -1, -1, 0], [-1, 1, 1, 0], [-1, 1, -1, 0], [-1, -1, 1, 0], [-1, -1, -1, 0]],
        this.p = [];
        for (let c = 0; c < 256; c++)
            this.p[c] = Math.floor(256 * o.random());
        this.perm = [];
        for (let c = 0; c < 512; c++)
            this.perm[c] = this.p[255 & c];
        this.simplex = [[0, 1, 2, 3], [0, 1, 3, 2], [0, 0, 0, 0], [0, 2, 3, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 0], [0, 2, 1, 3], [0, 0, 0, 0], [0, 3, 1, 2], [0, 3, 2, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 3, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 0, 3], [0, 0, 0, 0], [1, 3, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 3, 0, 1], [2, 3, 1, 0], [1, 0, 2, 3], [1, 0, 3, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 3, 1], [0, 0, 0, 0], [2, 1, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 1, 2], [3, 0, 2, 1], [0, 0, 0, 0], [3, 1, 2, 0], [2, 1, 0, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 1, 0, 2], [0, 0, 0, 0], [3, 2, 0, 1], [3, 2, 1, 0]]
    }
    dot(o, c, h) {
        return o[0] * c + o[1] * h
    }
    dot3(o, c, h, _) {
        return o[0] * c + o[1] * h + o[2] * _
    }
    dot4(o, c, h, _, b) {
        return o[0] * c + o[1] * h + o[2] * _ + o[3] * b
    }
    noise(o, c) {
        let h, _, b;
        const _e = (o + c) * (.5 * (Math.sqrt(3) - 1))
          , nt = Math.floor(o + _e)
          , it = Math.floor(c + _e)
          , at = (3 - Math.sqrt(3)) / 6
          , ut = (nt + it) * at
          , pt = o - (nt - ut)
          , ht = c - (it - ut);
        let _t, vt;
        pt > ht ? (_t = 1,
        vt = 0) : (_t = 0,
        vt = 1);
        const bt = pt - _t + at
          , St = ht - vt + at
          , At = pt - 1 + 2 * at
          , Et = ht - 1 + 2 * at
          , Pt = 255 & nt
          , It = 255 & it
          , Dt = this.perm[Pt + this.perm[It]] % 12
          , Gt = this.perm[Pt + _t + this.perm[It + vt]] % 12
          , Bt = this.perm[Pt + 1 + this.perm[It + 1]] % 12;
        let kt = .5 - pt * pt - ht * ht;
        kt < 0 ? h = 0 : (kt *= kt,
        h = kt * kt * this.dot(this.grad3[Dt], pt, ht));
        let Ut = .5 - bt * bt - St * St;
        Ut < 0 ? _ = 0 : (Ut *= Ut,
        _ = Ut * Ut * this.dot(this.grad3[Gt], bt, St));
        let Ht = .5 - At * At - Et * Et;
        return Ht < 0 ? b = 0 : (Ht *= Ht,
        b = Ht * Ht * this.dot(this.grad3[Bt], At, Et)),
        70 * (h + _ + b)
    }
    noise3d(o, c, h) {
        let _, b, _e, nt;
        const it = (o + c + h) * .3333333333333333
          , at = Math.floor(o + it)
          , ut = Math.floor(c + it)
          , pt = Math.floor(h + it)
          , ht = 1 / 6
          , _t = (at + ut + pt) * ht
          , vt = o - (at - _t)
          , bt = c - (ut - _t)
          , St = h - (pt - _t);
        let At, Et, Pt, It, Dt, Gt;
        vt >= bt ? bt >= St ? (At = 1,
        Et = 0,
        Pt = 0,
        It = 1,
        Dt = 1,
        Gt = 0) : vt >= St ? (At = 1,
        Et = 0,
        Pt = 0,
        It = 1,
        Dt = 0,
        Gt = 1) : (At = 0,
        Et = 0,
        Pt = 1,
        It = 1,
        Dt = 0,
        Gt = 1) : bt < St ? (At = 0,
        Et = 0,
        Pt = 1,
        It = 0,
        Dt = 1,
        Gt = 1) : vt < St ? (At = 0,
        Et = 1,
        Pt = 0,
        It = 0,
        Dt = 1,
        Gt = 1) : (At = 0,
        Et = 1,
        Pt = 0,
        It = 1,
        Dt = 1,
        Gt = 0);
        const Bt = vt - At + ht
          , kt = bt - Et + ht
          , Ut = St - Pt + ht
          , Ht = vt - It + 2 * ht
          , Kt = bt - Dt + 2 * ht
          , Jt = St - Gt + 2 * ht
          , or = vt - 1 + .5
          , ir = bt - 1 + .5
          , lr = St - 1 + .5
          , ar = 255 & at
          , hr = 255 & ut
          , gr = 255 & pt
          , dr = this.perm[ar + this.perm[hr + this.perm[gr]]] % 12
          , cr = this.perm[ar + At + this.perm[hr + Et + this.perm[gr + Pt]]] % 12
          , Ar = this.perm[ar + It + this.perm[hr + Dt + this.perm[gr + Gt]]] % 12
          , wr = this.perm[ar + 1 + this.perm[hr + 1 + this.perm[gr + 1]]] % 12;
        let Rr = .6 - vt * vt - bt * bt - St * St;
        Rr < 0 ? _ = 0 : (Rr *= Rr,
        _ = Rr * Rr * this.dot3(this.grad3[dr], vt, bt, St));
        let Cr = .6 - Bt * Bt - kt * kt - Ut * Ut;
        Cr < 0 ? b = 0 : (Cr *= Cr,
        b = Cr * Cr * this.dot3(this.grad3[cr], Bt, kt, Ut));
        let tr = .6 - Ht * Ht - Kt * Kt - Jt * Jt;
        tr < 0 ? _e = 0 : (tr *= tr,
        _e = tr * tr * this.dot3(this.grad3[Ar], Ht, Kt, Jt));
        let fr = .6 - or * or - ir * ir - lr * lr;
        return fr < 0 ? nt = 0 : (fr *= fr,
        nt = fr * fr * this.dot3(this.grad3[wr], or, ir, lr)),
        32 * (_ + b + _e + nt)
    }
    noise4d(o, c, h, _) {
        const b = this.grad4
          , _e = this.simplex
          , nt = this.perm
          , it = (Math.sqrt(5) - 1) / 4
          , at = (5 - Math.sqrt(5)) / 20;
        let ut, pt, ht, _t, vt;
        const bt = (o + c + h + _) * it
          , St = Math.floor(o + bt)
          , At = Math.floor(c + bt)
          , Et = Math.floor(h + bt)
          , Pt = Math.floor(_ + bt)
          , It = (St + At + Et + Pt) * at
          , Dt = o - (St - It)
          , Gt = c - (At - It)
          , Bt = h - (Et - It)
          , kt = _ - (Pt - It)
          , Ut = (Dt > Gt ? 32 : 0) + (Dt > Bt ? 16 : 0) + (Gt > Bt ? 8 : 0) + (Dt > kt ? 4 : 0) + (Gt > kt ? 2 : 0) + (Bt > kt ? 1 : 0)
          , Ht = _e[Ut][0] >= 3 ? 1 : 0
          , Kt = _e[Ut][1] >= 3 ? 1 : 0
          , Jt = _e[Ut][2] >= 3 ? 1 : 0
          , or = _e[Ut][3] >= 3 ? 1 : 0
          , ir = _e[Ut][0] >= 2 ? 1 : 0
          , lr = _e[Ut][1] >= 2 ? 1 : 0
          , ar = _e[Ut][2] >= 2 ? 1 : 0
          , hr = _e[Ut][3] >= 2 ? 1 : 0
          , gr = _e[Ut][0] >= 1 ? 1 : 0
          , dr = _e[Ut][1] >= 1 ? 1 : 0
          , cr = _e[Ut][2] >= 1 ? 1 : 0
          , Ar = _e[Ut][3] >= 1 ? 1 : 0
          , wr = Dt - Ht + at
          , Rr = Gt - Kt + at
          , Cr = Bt - Jt + at
          , tr = kt - or + at
          , fr = Dt - ir + 2 * at
          , vr = Gt - lr + 2 * at
          , Zr = Bt - ar + 2 * at
          , rn = kt - hr + 2 * at
          , hn = Dt - gr + 3 * at
          , Nn = Gt - dr + 3 * at
          , Wn = Bt - cr + 3 * at
          , qn = kt - Ar + 3 * at
          , mo = Dt - 1 + 4 * at
          , Ur = Gt - 1 + 4 * at
          , nn = Bt - 1 + 4 * at
          , xn = kt - 1 + 4 * at
          , ur = 255 & St
          , pr = 255 & At
          , Ir = 255 & Et
          , jr = 255 & Pt
          , Qr = nt[ur + nt[pr + nt[Ir + nt[jr]]]] % 32
          , Or = nt[ur + Ht + nt[pr + Kt + nt[Ir + Jt + nt[jr + or]]]] % 32
          , qr = nt[ur + ir + nt[pr + lr + nt[Ir + ar + nt[jr + hr]]]] % 32
          , gn = nt[ur + gr + nt[pr + dr + nt[Ir + cr + nt[jr + Ar]]]] % 32
          , Mn = nt[ur + 1 + nt[pr + 1 + nt[Ir + 1 + nt[jr + 1]]]] % 32;
        let Tn = .6 - Dt * Dt - Gt * Gt - Bt * Bt - kt * kt;
        Tn < 0 ? ut = 0 : (Tn *= Tn,
        ut = Tn * Tn * this.dot4(b[Qr], Dt, Gt, Bt, kt));
        let wn = .6 - wr * wr - Rr * Rr - Cr * Cr - tr * tr;
        wn < 0 ? pt = 0 : (wn *= wn,
        pt = wn * wn * this.dot4(b[Or], wr, Rr, Cr, tr));
        let Cn = .6 - fr * fr - vr * vr - Zr * Zr - rn * rn;
        Cn < 0 ? ht = 0 : (Cn *= Cn,
        ht = Cn * Cn * this.dot4(b[qr], fr, vr, Zr, rn));
        let fn = .6 - hn * hn - Nn * Nn - Wn * Wn - qn * qn;
        fn < 0 ? _t = 0 : (fn *= fn,
        _t = fn * fn * this.dot4(b[gn], hn, Nn, Wn, qn));
        let bn = .6 - mo * mo - Ur * Ur - nn * nn - xn * xn;
        return bn < 0 ? vt = 0 : (bn *= bn,
        vt = bn * bn * this.dot4(b[Mn], mo, Ur, nn, xn)),
        27 * (ut + pt + ht + _t + vt)
    }
}

export default SimplexNoise;
