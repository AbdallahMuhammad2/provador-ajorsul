/* Standalone Constant: ch2 */

var ch2 = {}
  , wk$1 = function(d, o, c, h, _) {
    var b = new Worker(ch2[o] || (ch2[o] = URL.createObjectURL(new Blob([d],{
        type: "text/javascript"
    }))));
    return b.onerror = function(_e) {
        return _(_e.error, null)
    }
    ,
    b.onmessage = function(_e) {
        return _(null, _e.data)
    }
    ,
    b.postMessage(c, h),
    b
}
  , u8 = Uint8Array
  , u16 = Uint16Array
  , u32 = Uint32Array
  , fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0])
  , fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0])
  , clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  , freb = function(d, o) {
    for (var c = new u16(31), h = 0; h < 31; ++h)
        c[h] = o += 1 << d[h - 1];
    var _ = new u32(c[30]);
    for (h = 1; h < 30; ++h)
        for (var b = c[h]; b < c[h + 1]; ++b)
            _[b] = b - c[h] << 5 | h;
    return [c, _]
}
  , _a = freb(fleb, 2)
  , fl$1 = _a[0]
  , revfl = _a[1];
fl$1[28] = 258,
revfl[258] = 28;
for (var _b = freb(fdeb, 0), fd$1 = _b[0], revfd = _b[1], rev = new u16(32768), browser_i = 0; browser_i < 32768; ++browser_i) {
    var browser_x = (43690 & browser_i) >>> 1 | (21845 & browser_i) << 1;
    browser_x = (52428 & browser_x) >>> 2 | (13107 & browser_x) << 2,
    browser_x = (61680 & browser_x) >>> 4 | (3855 & browser_x) << 4,
    rev[browser_i] = ((65280 & browser_x) >>> 8 | (255 & browser_x) << 8) >>> 1
}
for (var hMap = function(o, c, h) {
    for (var _ = o.length, b = 0, _e = new u16(c); b < _; ++b)
        ++_e[o[b] - 1];
    var nt, it = new u16(c);
    for (b = 0; b < c; ++b)
        it[b] = it[b - 1] + _e[b - 1] << 1;
    if (h) {
        nt = new u16(1 << c);
        var at = 15 - c;
        for (b = 0; b < _; ++b)
            if (o[b])
                for (var ut = b << 4 | o[b], pt = c - o[b], ht = it[o[b] - 1]++ << pt, _t = ht | (1 << pt) - 1; ht <= _t; ++ht)
                    nt[rev[ht] >>> at] = ut
    } else
        for (nt = new u16(_),
        b = 0; b < _; ++b)
            o[b] && (nt[b] = rev[it[o[b] - 1]++] >>> 15 - o[b]);
    return nt
}, flt = new u8(288), browser_i = 0; browser_i < 144; ++browser_i)
    flt[browser_i] = 8;
for (var browser_i = 144; browser_i < 256; ++browser_i)
    flt[browser_i] = 9;
for (var browser_i = 256; browser_i < 280; ++browser_i)
    flt[browser_i] = 7;
for (var browser_i = 280; browser_i < 288; ++browser_i)
    flt[browser_i] = 8;
for (var fdt = new u8(32), browser_i = 0; browser_i < 32; ++browser_i)
    fdt[browser_i] = 5;
var flm = hMap(flt, 9, 0)
  , flrm = hMap(flt, 9, 1)
  , fdm = hMap(fdt, 5, 0)
  , fdrm = hMap(fdt, 5, 1)
  , max = function(d) {
    for (var o = d[0], c = 1; c < d.length; ++c)
        d[c] > o && (o = d[c]);
    return o
}
  , bits = function(d, o, c) {
    var h = o / 8 | 0;
    return (d[h] | d[h + 1] << 8) >> (7 & o) & c
}
  , bits16 = function(d, o) {
    var c = o / 8 | 0;
    return (d[c] | d[c + 1] << 8 | d[c + 2] << 16) >> (7 & o)
}
  , shft = function(d) {
    return (d / 8 | 0) + (7 & d && 1)
}
  , slc = function(d, o, c) {
    (o == null || o < 0) && (o = 0),
    (c == null || c > d.length) && (c = d.length);
    var h = new (d instanceof u16 ? u16 : d instanceof u32 ? u32 : u8)(c - o);
    return h.set(d.subarray(o, c)),
    h
}
  , inflt = function(d, o, c) {
    var h = d.length;
    if (!h || c && !c.l && h < 5)
        return o || new u8(0);
    var _ = !o || c
      , b = !c || c.i;
    c || (c = {}),
    o || (o = new u8(3 * h));
    var _e = function(fr) {
        var vr = o.length;
        if (fr > vr) {
            var Zr = new u8(Math.max(2 * vr, fr));
            Zr.set(o),
            o = Zr
        }
    }
      , nt = c.f || 0
      , it = c.p || 0
      , at = c.b || 0
      , ut = c.l
      , pt = c.d
      , ht = c.m
      , _t = c.n
      , vt = 8 * h;
    do {
        if (!ut) {
            c.f = nt = bits(d, it, 1);
            var bt = bits(d, it + 1, 3);
            if (it += 3,
            !bt) {
                var St = d[(Kt = shft(it) + 4) - 4] | d[Kt - 3] << 8
                  , At = Kt + St;
                if (At > h) {
                    if (b)
                        throw "unexpected EOF";
                    break
                }
                _ && _e(at + St),
                o.set(d.subarray(Kt, At), at),
                c.b = at += St,
                c.p = it = 8 * At;
                continue
            }
            if (bt == 1)
                ut = flrm,
                pt = fdrm,
                ht = 9,
                _t = 5;
            else {
                if (bt != 2)
                    throw "invalid block type";
                var Et = bits(d, it, 31) + 257
                  , Pt = bits(d, it + 10, 15) + 4
                  , It = Et + bits(d, it + 5, 31) + 1;
                it += 14;
                for (var Dt = new u8(It), Gt = new u8(19), Bt = 0; Bt < Pt; ++Bt)
                    Gt[clim[Bt]] = bits(d, it + 3 * Bt, 7);
                it += 3 * Pt;
                var kt = max(Gt)
                  , Ut = (1 << kt) - 1
                  , Ht = hMap(Gt, kt, 1);
                for (Bt = 0; Bt < It; ) {
                    var Kt, Jt = Ht[bits(d, it, Ut)];
                    if (it += 15 & Jt,
                    (Kt = Jt >>> 4) < 16)
                        Dt[Bt++] = Kt;
                    else {
                        var or = 0
                          , ir = 0;
                        for (Kt == 16 ? (ir = 3 + bits(d, it, 3),
                        it += 2,
                        or = Dt[Bt - 1]) : Kt == 17 ? (ir = 3 + bits(d, it, 7),
                        it += 3) : Kt == 18 && (ir = 11 + bits(d, it, 127),
                        it += 7); ir--; )
                            Dt[Bt++] = or
                    }
                }
                var lr = Dt.subarray(0, Et)
                  , ar = Dt.subarray(Et);
                ht = max(lr),
                _t = max(ar),
                ut = hMap(lr, ht, 1),
                pt = hMap(ar, _t, 1)
            }
            if (it > vt) {
                if (b)
                    throw "unexpected EOF";
                break
            }
        }
        _ && _e(at + 131072);
        for (var hr = (1 << ht) - 1, gr = (1 << _t) - 1, dr = it; ; dr = it) {
            var cr = (or = ut[bits16(d, it) & hr]) >>> 4;
            if ((it += 15 & or) > vt) {
                if (b)
                    throw "unexpected EOF";
                break
            }
            if (!or)
                throw "invalid length/literal";
            if (cr < 256)
                o[at++] = cr;
            else {
                if (cr == 256) {
                    dr = it,
                    ut = null;
                    break
                }
                var Ar = cr - 254;
                if (cr > 264) {
                    var wr = fleb[Bt = cr - 257];
                    Ar = bits(d, it, (1 << wr) - 1) + fl$1[Bt],
                    it += wr
                }
                var Rr = pt[bits16(d, it) & gr]
                  , Cr = Rr >>> 4;
                if (!Rr)
                    throw "invalid distance";
                if (it += 15 & Rr,
                ar = fd$1[Cr],
                Cr > 3 && (wr = fdeb[Cr],
                ar += bits16(d, it) & (1 << wr) - 1,
                it += wr),
                it > vt) {
                    if (b)
                        throw "unexpected EOF";
                    break
                }
                _ && _e(at + 131072);
                for (var tr = at + Ar; at < tr; at += 4)
                    o[at] = o[at - ar],
                    o[at + 1] = o[at + 1 - ar],
                    o[at + 2] = o[at + 2 - ar],
                    o[at + 3] = o[at + 3 - ar];
                at = tr
            }
        }
        c.l = ut,
        c.p = dr,
        c.b = at,
        ut && (nt = 1,
        c.m = ht,
        c.d = pt,
        c.n = _t)
    } while (!nt);
    return at == o.length ? o : slc(o, 0, at)
}
  , wbits = function(d, o, c) {
    c <<= 7 & o;
    var h = o / 8 | 0;
    d[h] |= c,
    d[h + 1] |= c >>> 8
}
  , wbits16 = function(d, o, c) {
    c <<= 7 & o;
    var h = o / 8 | 0;
    d[h] |= c,
    d[h + 1] |= c >>> 8,
    d[h + 2] |= c >>> 16
}
  , hTree = function(d, o) {
    for (var c = [], h = 0; h < d.length; ++h)
        d[h] && c.push({
            s: h,
            f: d[h]
        });
    var _ = c.length
      , b = c.slice();
    if (!_)
        return [browser_et, 0];
    if (_ == 1) {
        var _e = new u8(c[0].s + 1);
        return _e[c[0].s] = 1,
        [_e, 1]
    }
    c.sort(function(Dt, Gt) {
        return Dt.f - Gt.f
    }),
    c.push({
        s: -1,
        f: 25001
    });
    var nt = c[0]
      , it = c[1]
      , at = 0
      , ut = 1
      , pt = 2;
    for (c[0] = {
        s: -1,
        f: nt.f + it.f,
        l: nt,
        r: it
    };

export default ch2;
