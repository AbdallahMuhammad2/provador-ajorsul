/* Standalone Function: unzip */

function unzip(d, o) {
    if (typeof o != "function")
        throw "no callback";
    for (var c = [], h = function() {
        for (var ht = 0; ht < c.length; ++ht)
            c[ht]()
    }, _ = {}, b = d.length - 22; b4(d, b) != 101010256; --b)
        if (!b || d.length - b > 65558)
            return void o("invalid zip file", null);
    var _e = b2(d, b + 8);
    _e || o(null, {});
    var nt = _e
      , it = b4(d, b + 16)
      , at = it == 4294967295;
    if (at) {
        if (b = b4(d, b - 12),
        b4(d, b) != 101075792)
            return void o("invalid zip file", null);
        nt = _e = b4(d, b + 32),
        it = b4(d, b + 48)
    }
    for (var ut = function(ht) {
        var _t = zh$1(d, it, at)
          , vt = _t[0]
          , bt = _t[1]
          , St = _t[2]
          , At = _t[3]
          , Et = _t[4]
          , Pt = _t[5]
          , It = slzh(d, Pt);
        it = Et;
        var Dt = function(Bt, kt) {
            Bt ? (h(),
            o(Bt, null)) : (_[At] = kt,
            --_e || o(null, _))
        };
        if (vt)
            if (vt == 8) {
                var Gt = d.subarray(It, It + bt);
                if (bt < 32e4)
                    try {
                        Dt(null, inflateSync(Gt, new u8(St)))
                    } catch (Bt) {
                        Dt(Bt, null)
                    }
                else
                    c.push(inflate(Gt, {
                        size: St
                    }, Dt))
            } else
                Dt("unknown compression type " + vt, null);
        else
            Dt(null, slc(d, It, It + bt))
    }, pt = 0; pt < nt; ++pt)
        ut();
    return h
}

export default unzip;
