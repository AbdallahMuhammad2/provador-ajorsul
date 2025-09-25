/* Standalone Function: zip */

function zip(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    var h = {};
    fltn(d, "", h, o);
    var _ = Object.keys(h)
      , b = _.length
      , _e = 0
      , nt = 0
      , it = b
      , at = new Array(b)
      , ut = []
      , pt = function() {
        for (var bt = 0; bt < ut.length; ++bt)
            ut[bt]()
    }
      , ht = function() {
        var bt = new u8(nt + 22)
          , St = _e
          , At = nt - _e;
        nt = 0;
        for (var Et = 0; Et < it; ++Et) {
            var Pt = at[Et];
            try {
                var It = Pt.c.length;
                wzh(bt, nt, Pt, Pt.f, Pt.u, It);
                var Dt = 30 + Pt.f.length + exfl(Pt.extra)
                  , Gt = nt + Dt;
                bt.set(Pt.c, Gt),
                wzh(bt, _e, Pt, Pt.f, Pt.u, It, nt, Pt.m),
                _e += 16 + Dt + (Pt.m ? Pt.m.length : 0),
                nt = Gt + It
            } catch (Bt) {
                return c(Bt, null)
            }
        }
        wzf(bt, _e, at.length, At, St),
        c(null, bt)
    };
    b || ht();
    for (var _t = function(bt) {
        var St = _[bt]
          , At = h[St]
          , Et = At[0]
          , Pt = At[1]
          , It = crc()
          , Dt = Et.length;
        It.p(Et);
        var Gt = strToU8(St)
          , Bt = Gt.length
          , kt = Pt.comment
          , Ut = kt && strToU8(kt)
          , Ht = Ut && Ut.length
          , Kt = exfl(Pt.extra)
          , Jt = Pt.level == 0 ? 0 : 8
          , or = function(ir, lr) {
            if (ir)
                pt(),
                c(ir, null);
            else {
                var ar = lr.length;
                at[bt] = mrg(Pt, {
                    size: Dt,
                    crc: It.d(),
                    c: lr,
                    f: Gt,
                    m: Ut,
                    u: Bt != St.length || Ut && kt.length != Ht,
                    compression: Jt
                }),
                _e += 30 + Bt + Kt + ar,
                nt += 76 + 2 * (Bt + Kt) + (Ht || 0) + ar,
                --b || ht()
            }
        };
        if (Bt > 65535 && or("filename too long", null),
        Jt)
            if (Dt < 16e4)
                try {
                    or(null, deflateSync(Et, Pt))
                } catch (ir) {
                    or(ir, null)
                }
            else
                ut.push(deflate(Et, Pt, or));
        else
            or(null, Et)
    }, vt = 0; vt < it; ++vt)
        _t(vt);
    return pt
}

export default zip;
