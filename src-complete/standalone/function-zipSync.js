/* Standalone Function: zipSync */

function zipSync(d, o) {
    o || (o = {});
    var c = {}
      , h = [];
    fltn(d, "", c, o);
    var _ = 0
      , b = 0;
    for (var _e in c) {
        var nt = c[_e]
          , it = nt[0]
          , at = nt[1]
          , ut = at.level == 0 ? 0 : 8
          , pt = (Bt = strToU8(_e)).length
          , ht = at.comment
          , _t = ht && strToU8(ht)
          , vt = _t && _t.length
          , bt = exfl(at.extra);
        if (pt > 65535)
            throw "filename too long";
        var St = ut ? deflateSync(it, at) : it
          , At = St.length
          , Et = crc();
        Et.p(it),
        h.push(mrg(at, {
            size: it.length,
            crc: Et.d(),
            c: St,
            f: Bt,
            m: _t,
            u: pt != _e.length || _t && ht.length != vt,
            o: _,
            compression: ut
        })),
        _ += 30 + pt + bt + At,
        b += 76 + 2 * (pt + bt) + (vt || 0) + At
    }
    for (var Pt = new u8(b + 22), It = _, Dt = b - _, Gt = 0; Gt < h.length; ++Gt) {
        var Bt = h[Gt];
        wzh(Pt, Bt.o, Bt, Bt.f, Bt.u, Bt.c.length);
        var kt = 30 + Bt.f.length + exfl(Bt.extra);
        Pt.set(Bt.c, Bt.o + kt),
        wzh(Pt, _, Bt, Bt.f, Bt.u, Bt.c.length, Bt.o, Bt.m),
        _ += 16 + kt + (Bt.m ? Bt.m.length : 0)
    }
    return wzf(Pt, _, h.length, Dt, It),
    Pt
}

export default zipSync;
