/* Standalone Function: nt */

function nt(ur, pr, Ir, jr, Qr) {
            for (; Ir < ur; )
                pr = pr << 8 | wr(jr, Qr),
                Ir += 8;
            Ir -= ur,
            _e.l = pr >> Ir & (1 << ur) - 1,
            _e.c = pr,
            _e.lc = Ir
        }
        const it = new Array(59);
        function at(ur) {
            return 63 & ur
        }
        function ut(ur) {
            return ur >> 6
        }
        const pt = {
            c: 0,
            lc: 0
        };
        function ht(ur, pr, Ir, jr) {
            ur = ur << 8 | wr(Ir, jr),
            pr += 8,
            pt.c = ur,
            pt.lc = pr
        }
        const _t = {
            c: 0,
            lc: 0
        };
        function vt(ur, pr, Ir, jr, Qr, Or, qr, gn, Mn) {
            if (ur == pr) {
                jr < 8 && (ht(Ir, jr, Qr, Or),
                Ir = pt.c,
                jr = pt.lc);
                let Tn = Ir >> (jr -= 8);
                if (Tn = new Uint8Array([Tn])[0],
                gn.value + Tn > Mn)
                    return !1;
                const wn = qr[gn.value - 1];
                for (; Tn-- > 0; )
                    qr[gn.value++] = wn
            } else {
                if (!(gn.value < Mn))
                    return !1;
                qr[gn.value++] = ur
            }
            _t.c = Ir,
            _t.lc = jr
        }
        function bt(ur) {
            return 65535 & ur
        }
        function St(ur) {
            const pr = bt(ur);
            return pr > 32767 ? pr - 65536 : pr
        }
        const At = {
            a: 0,
            b: 0
        };
        function Et(ur, pr) {
            const Ir = St(ur)
              , jr = St(pr)
              , Qr = Ir + (1 & jr) + (jr >> 1)
              , Or = Qr
              , qr = Qr - jr;
            At.a = Or,
            At.b = qr
        }
        function Pt(ur, pr) {
            const Ir = bt(ur)
              , jr = bt(pr)
              , Qr = Ir - (jr >> 1) & 65535
              , Or = jr + Qr - 32768 & 65535;
            At.a = Or,
            At.b = Qr
        }
        function It(ur, pr, Ir, jr, Qr, Or, qr) {
            const gn = qr < 16384
              , Mn = Ir > Qr ? Qr : Ir;
            let Tn, wn, Cn = 1;
            for (; Cn <= Mn; )
                Cn <<= 1;
            for (Cn >>= 1,
            Tn = Cn,
            Cn >>= 1; Cn >= 1; ) {
                wn = 0;
                const fn = wn + Or * (Qr - Tn)
                  , bn = Or * Cn
                  , Xn = Or * Tn
                  , En = jr * Cn
                  , Qn = jr * Tn;
                let Rn, Yn, Bo, vo;
                for (; wn <= fn; wn += Xn) {
                    let Hn = wn;
                    const $n = wn + jr * (Ir - Tn);
                    for (; Hn <= $n; Hn += Qn) {
                        const ao = Hn + En
                          , zo = Hn + bn
                          , Zo = zo + En;
                        gn ? (Et(ur[Hn + pr], ur[zo + pr]),
                        Rn = At.a,
                        Bo = At.b,
                        Et(ur[ao + pr], ur[Zo + pr]),
                        Yn = At.a,
                        vo = At.b,
                        Et(Rn, Yn),
                        ur[Hn + pr] = At.a,
                        ur[ao + pr] = At.b,
                        Et(Bo, vo),
                        ur[zo + pr] = At.a,
                        ur[Zo + pr] = At.b) : (Pt(ur[Hn + pr], ur[zo + pr]),
                        Rn = At.a,
                        Bo = At.b,
                        Pt(ur[ao + pr], ur[Zo + pr]),
                        Yn = At.a,
                        vo = At.b,
                        Pt(Rn, Yn),
                        ur[Hn + pr] = At.a,
                        ur[ao + pr] = At.b,
                        Pt(Bo, vo),
                        ur[zo + pr] = At.a,
                        ur[Zo + pr] = At.b)
                    }
                    if (Ir & Cn) {
                        const ao = Hn + bn;
                        gn ? Et(ur[Hn + pr], ur[ao + pr]) : Pt(ur[Hn + pr], ur[ao + pr]),
                        Rn = At.a,
                        ur[ao + pr] = At.b,
                        ur[Hn + pr] = Rn
                    }
                }
                if (Qr & Cn) {
                    let Hn = wn;
                    const $n = wn + jr * (Ir - Tn);
                    for (; Hn <= $n; Hn += Qn) {
                        const ao = Hn + En;
                        gn ? Et(ur[Hn + pr], ur[ao + pr]) : Pt(ur[Hn + pr], ur[ao + pr]),
                        Rn = At.a,
                        ur[ao + pr] = At.b,
                        ur[Hn + pr] = Rn
                    }
                }
                Tn = Cn,
                Cn >>= 1
            }
            return wn
        }
        function Dt(ur, pr, Ir, jr, Qr, Or) {
            const qr = Ir.value
              , gn = Ar(pr, Ir)
              , Mn = Ar(pr, Ir);
            Ir.value += 4;
            const Tn = Ar(pr, Ir);
            if (Ir.value += 4,
            gn < 0 || gn >= 65537 || Mn < 0 || Mn >= 65537)
                throw new Error("Something wrong with HUF_ENCSIZE");
            const wn = new Array(65537)
              , Cn = new Array(16384);
            if (function(fn) {
                for (let bn = 0; bn < 16384; bn++)
                    fn[bn] = {},
                    fn[bn].len = 0,
                    fn[bn].lit = 0,
                    fn[bn].p = null
            }(Cn),
            function(fn, bn, Xn, En, Qn, Rn) {
                const Yn = bn;
                let Bo = 0
                  , vo = 0;
                for (; En <= Qn; En++) {
                    if (Yn.value - bn.value > Xn)
                        return !1;
                    nt(6, Bo, vo, fn, Yn);
                    const Hn = _e.l;
                    if (Bo = _e.c,
                    vo = _e.lc,
                    Rn[En] = Hn,
                    Hn == 63) {
                        if (Yn.value - bn.value > Xn)
                            throw new Error("Something wrong with hufUnpackEncTable");
                        nt(8, Bo, vo, fn, Yn);
                        let $n = _e.l + 6;
                        if (Bo = _e.c,
                        vo = _e.lc,
                        En + $n > Qn + 1)
                            throw new Error("Something wrong with hufUnpackEncTable");
                        for (; $n--; )
                            Rn[En++] = 0;
                        En--
                    } else if (Hn >= 59) {
                        let $n = Hn - 59 + 2;
                        if (En + $n > Qn + 1)
                            throw new Error("Something wrong with hufUnpackEncTable");
                        for (; $n--; )
                            Rn[En++] = 0;
                        En--
                    }
                }
                (function(Hn) {
                    for (let ao = 0; ao <= 58; ++ao)
                        it[ao] = 0;
                    for (let ao = 0; ao < 65537; ++ao)
                        it[Hn[ao]] += 1;
                    let $n = 0;
                    for (let ao = 58; ao > 0; --ao) {
                        const zo = $n + it[ao] >> 1;
                        it[ao] = $n,
                        $n = zo
                    }
                    for (let ao = 0; ao < 65537; ++ao) {
                        const zo = Hn[ao];
                        zo > 0 && (Hn[ao] = zo | it[zo]++ << 6)
                    }
                }
                )(Rn)
            }(ur, Ir, jr - (Ir.value - qr), gn, Mn, wn),
            Tn > 8 * (jr - (Ir.value - qr)))
                throw new Error("Something wrong with hufUncompress");
            (function(fn, bn, Xn, En) {
                for (; bn <= Xn; bn++) {
                    const Qn = ut(fn[bn])
                      , Rn = at(fn[bn]);
                    if (Qn >> Rn)
                        throw new Error("Invalid table entry");
                    if (Rn > 14) {
                        const Yn = En[Qn >> Rn - 14];
                        if (Yn.len)
                            throw new Error("Invalid table entry");
                        if (Yn.lit++,
                        Yn.p) {
                            const Bo = Yn.p;
                            Yn.p = new Array(Yn.lit);
                            for (let vo = 0; vo < Yn.lit - 1; ++vo)
                                Yn.p[vo] = Bo[vo]
                        } else
                            Yn.p = new Array(1);
                        Yn.p[Yn.lit - 1] = bn
                    } else if (Rn) {
                        let Yn = 0;
                        for (let Bo = 1 << 14 - Rn; Bo > 0; Bo--) {
                            const vo = En[(Qn << 14 - Rn) + Yn];
                            if (vo.len || vo.p)
                                throw new Error("Invalid table entry");
                            vo.len = Rn,
                            vo.lit = bn,
                            Yn++
                        }
                    }
                }
            }
            )(wn, gn, Mn, Cn),
            function(fn, bn, Xn, En, Qn, Rn, Yn, Bo, vo) {
                let Hn = 0
                  , $n = 0;
                const ao = Yn
                  , zo = Math.trunc(En.value + (Qn + 7) / 8);
                for (; En.value < zo; )
                    for (ht(Hn, $n, Xn, En),
                    Hn = pt.c,
                    $n = pt.lc; $n >= 14; ) {
                        const $o = bn[Hn >> $n - 14 & 16383];
                        if ($o.len)
                            $n -= $o.len,
                            vt($o.lit, Rn, Hn, $n, Xn, En, Bo, vo, ao),
                            Hn = _t.c,
                            $n = _t.lc;
                        else {
                            if (!$o.p)
                                throw new Error("hufDecode issues");
                            let Yo;
                            for (Yo = 0; Yo < $o.lit; Yo++) {
                                const ss = at(fn[$o.p[Yo]]);
                                for (; $n < ss && En.value < zo; )
                                    ht(Hn, $n, Xn, En),
                                    Hn = pt.c,
                                    $n = pt.lc;
                                if ($n >= ss && ut(fn[$o.p[Yo]]) == (Hn >> $n - ss & (1 << ss) - 1)) {
                                    $n -= ss,
                                    vt($o.p[Yo], Rn, Hn, $n, Xn, En, Bo, vo, ao),
                                    Hn = _t.c,
                                    $n = _t.lc;
                                    break
                                }
                            }
                            if (Yo == $o.lit)
                                throw new Error("hufDecode issues")
                        }
                    }
                const Zo = 8 - Qn & 7;
                for (Hn >>= Zo,
                $n -= Zo; $n > 0; ) {
                    const $o = bn[Hn << 14 - $n & 16383];
                    if (!$o.len)
                        throw new Error("hufDecode issues");
                    $n -= $o.len,
                    vt($o.lit, Rn, Hn, $n, Xn, En, Bo, vo, ao),
                    Hn = _t.c,
                    $n = _t.lc
                }
            }(wn, Cn, ur, Ir, Tn, Mn, Or, Qr, {
                value: 0
            })
        }
        function Gt(ur) {
            for (let pr = 1; pr < ur.length; pr++) {
                const Ir = ur[pr - 1] + ur[pr] - 128;
                ur[pr] = Ir
            }
        }
        function Bt(ur, pr) {
            let Ir = 0
              , jr = Math.floor((ur.length + 1) / 2)
              , Qr = 0;
            const Or = ur.length - 1;
            for (; !(Qr > Or || (pr[Qr++] = ur[Ir++],
            Qr > Or)); )
                pr[Qr++] = ur[jr++]
        }
        function kt(ur) {
            let pr = ur.byteLength;
            const Ir = new Array;
            let jr = 0;
            const Qr = new DataView(ur);
            for (; pr > 0; ) {
                const Or = Qr.getInt8(jr++);
                if (Or < 0) {
                    const qr = -Or;
                    pr -= qr + 1;
                    for (let gn = 0; gn < qr; gn++)
                        Ir.push(Qr.getUint8(jr++))
                } else {
                    const qr = Or;
                    pr -= 2;
                    const gn = Qr.getUint8(jr++);
                    for (let Mn = 0; Mn < qr + 1; Mn++)
                        Ir.push(gn)
                }
            }
            return Ir
        }
        function Ut(ur, pr, Ir) {
            let jr, Qr = 1;
            for (; Qr < 64; )
                jr = pr[ur.value],
                jr == 65280 ? Qr = 64 : jr >> 8 == 255 ? Qr += 255 & jr : (Ir[Qr] = jr,
                Qr++),
                ur.value++
        }
        function Ht(ur) {
            const pr = .5 * Math.cos(.7853975)
              , Ir = .5 * Math.cos(3.14159 / 16)
              , jr = .5 * Math.cos(3.14159 / 8)
              , Qr = .5 * Math.cos(3 * 3.14159 / 16)
              , Or = .5 * Math.cos(.981746875)
              , qr = .5 * Math.cos(3 * 3.14159 / 8)
              , gn = .5 * Math.cos(1.374445625)
              , Mn = new Array(4)
              , Tn = new Array(4)
              , wn = new Array(4)
              , Cn = new Array(4);
            for (let fn = 0; fn < 8; ++fn) {
                const bn = 8 * fn;
                Mn[0] = jr * ur[bn + 2],
                Mn[1] = qr * ur[bn + 2],
                Mn[2] = jr * ur[bn + 6],
                Mn[3] = qr * ur[bn + 6],
                Tn[0] = Ir * ur[bn + 1] + Qr * ur[bn + 3] + Or * ur[bn + 5] + gn * ur[bn + 7],
                Tn[1] = Qr * ur[bn + 1] - gn * ur[bn + 3] - Ir * ur[bn + 5] - Or * ur[bn + 7],
                Tn[2] = Or * ur[bn + 1] - Ir * ur[bn + 3] + gn * ur[bn + 5] + Qr * ur[bn + 7],
                Tn[3] = gn * ur[bn + 1] - Or * ur[bn + 3] + Qr * ur[bn + 5] - Ir * ur[bn + 7],
                wn[0] = pr * (ur[bn + 0] + ur[bn + 4]),
                wn[3] = pr * (ur[bn + 0] - ur[bn + 4]),
                wn[1] = Mn[0] + Mn[3],
                wn[2] = Mn[1] - Mn[2],
                Cn[0] = wn[0] + wn[1],
                Cn[1] = wn[3] + wn[2],
                Cn[2] = wn[3] - wn[2],
                Cn[3] = wn[0] - wn[1],
                ur[bn + 0] = Cn[0] + Tn[0],
                ur[bn + 1] = Cn[1] + Tn[1],
                ur[bn + 2] = Cn[2] + Tn[2],
                ur[bn + 3] = Cn[3] + Tn[3],
                ur[bn + 4] = Cn[3] - Tn[3],
                ur[bn + 5] = Cn[2] - Tn[2],
                ur[bn + 6] = Cn[1] - Tn[1],
                ur[bn + 7] = Cn[0] - Tn[0]
            }
            for (let fn = 0; fn < 8; ++fn)
                Mn[0] = jr * ur[16 + fn],
                Mn[1] = qr * ur[16 + fn],
                Mn[2] = jr * ur[48 + fn],
                Mn[3] = qr * ur[48 + fn],
                Tn[0] = Ir * ur[8 + fn] + Qr * ur[24 + fn] + Or * ur[40 + fn] + gn * ur[56 + fn],
                Tn[1] = Qr * ur[8 + fn] - gn * ur[24 + fn] - Ir * ur[40 + fn] - Or * ur[56 + fn],
                Tn[2] = Or * ur[8 + fn] - Ir * ur[24 + fn] + gn * ur[40 + fn] + Qr * ur[56 + fn],
                Tn[3] = gn * ur[8 + fn] - Or * ur[24 + fn] + Qr * ur[40 + fn] - Ir * ur[56 + fn],
                wn[0] = pr * (ur[fn] + ur[32 + fn]),
                wn[3] = pr * (ur[fn] - ur[32 + fn]),
                wn[1] = Mn[0] + Mn[3],
                wn[2] = Mn[1] - Mn[2],
                Cn[0] = wn[0] + wn[1],
                Cn[1] = wn[3] + wn[2],
                Cn[2] = wn[3] - wn[2],
                Cn[3] = wn[0] - wn[1],
                ur[0 + fn] = Cn[0] + Tn[0],
                ur[8 + fn] = Cn[1] + Tn[1],
                ur[16 + fn] = Cn[2] + Tn[2],
                ur[24 + fn] = Cn[3] + Tn[3],
                ur[32 + fn] = Cn[3] - Tn[3],
                ur[40 + fn] = Cn[2] - Tn[2],
                ur[48 + fn] = Cn[1] - Tn[1],
                ur[56 + fn] = Cn[0] - Tn[0]
        }
        function Kt(ur) {
            for (let pr = 0; pr < 64; ++pr) {
                const Ir = ur[0][pr]
                  , jr = ur[1][pr]
                  , Qr = ur[2][pr];
                ur[0][pr] = Ir + 1.5747 * Qr,
                ur[1][pr] = Ir - .1873 * jr - .4682 * Qr,
                ur[2][pr] = Ir + 1.8556 * jr
            }
        }
        function Jt(ur, pr, Ir) {
            for (let Qr = 0; Qr < 64; ++Qr)
                pr[Ir + Qr] = three_module.GxU.toHalfFloat((jr = ur[Qr]) <= 1 ? Math.sign(jr) * Math.pow(Math.abs(jr), 2.2) : Math.sign(jr) * Math.pow(b, Math.abs(jr) - 1));
            var jr
        }
        function or(ur) {
            return new DataView(ur.array.buffer,ur.offset.value,ur.size)
        }
        function ir(ur) {
            const pr = ur.viewer.buffer.slice(ur.offset.value, ur.offset.value + ur.size)
              , Ir = new Uint8Array(kt(pr))
              , jr = new Uint8Array(Ir.length);
            return Gt(Ir),
            Bt(Ir, jr),
            new DataView(jr.buffer)
        }
        function lr(ur) {
            const pr = fflate_module_unzlibSync(ur.array.slice(ur.offset.value, ur.offset.value + ur.size))
              , Ir = new Uint8Array(pr.length);
            return Gt(pr),
            Bt(pr, Ir),
            new DataView(Ir.buffer)
        }
        function ar(ur) {
            const pr = ur.viewer
              , Ir = {
                value: ur.offset.value
            }
              , jr = new Uint16Array(ur.width * ur.scanlineBlockSize * (ur.channels * ur.type))
              , Qr = new Uint8Array(8192);
            let Or = 0;
            const qr = new Array(ur.channels);
            for (let Xn = 0; Xn < ur.channels; Xn++)
                qr[Xn] = {},
                qr[Xn].start = Or,
                qr[Xn].end = qr[Xn].start,
                qr[Xn].nx = ur.width,
                qr[Xn].ny = ur.lines,
                qr[Xn].size = ur.type,
                Or += qr[Xn].nx * qr[Xn].ny * qr[Xn].size;
            const gn = Zr(pr, Ir)
              , Mn = Zr(pr, Ir);
            if (Mn >= 8192)
                throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
            if (gn <= Mn)
                for (let Xn = 0; Xn < Mn - gn + 1; Xn++)
                    Qr[Xn + gn] = Rr(pr, Ir);
            const Tn = new Uint16Array(65536)
              , wn = function(Xn, En) {
                let Qn = 0;
                for (let Yn = 0; Yn < 65536; ++Yn)
                    (Yn == 0 || Xn[Yn >> 3] & 1 << (7 & Yn)) && (En[Qn++] = Yn);
                const Rn = Qn - 1;
                for (; Qn < 65536; )
                    En[Qn++] = 0;
                return Rn
            }(Qr, Tn)
              , Cn = Ar(pr, Ir);
            Dt(ur.array, pr, Ir, Cn, jr, Or);
            for (let Xn = 0; Xn < ur.channels; ++Xn) {
                const En = qr[Xn];
                for (let Qn = 0; Qn < qr[Xn].size; ++Qn)
                    It(jr, En.start + Qn, En.nx, En.size, En.ny, En.nx * En.size, wn)
            }
            (function(Xn, En, Qn) {
                for (let Rn = 0; Rn < Qn; ++Rn)
                    En[Rn] = Xn[En[Rn]]
            }
            )(Tn, jr, Or);
            let fn = 0;
            const bn = new Uint8Array(jr.buffer.byteLength);
            for (let Xn = 0; Xn < ur.lines; Xn++)
                for (let En = 0; En < ur.channels; En++) {
                    const Qn = qr[En]
                      , Rn = Qn.nx * Qn.size
                      , Yn = new Uint8Array(jr.buffer,2 * Qn.end,2 * Rn);
                    bn.set(Yn, fn),
                    fn += 2 * Rn,
                    Qn.end += Rn
                }
            return new DataView(bn.buffer)
        }
        function hr(ur) {
            const pr = fflate_module_unzlibSync(ur.array.slice(ur.offset.value, ur.offset.value + ur.size))
              , Ir = ur.lines * ur.channels * ur.width
              , jr = ur.type == 1 ? new Uint16Array(Ir) : new Uint32Array(Ir);
            let Qr = 0
              , Or = 0;
            const qr = new Array(4);
            for (let gn = 0; gn < ur.lines; gn++)
                for (let Mn = 0; Mn < ur.channels; Mn++) {
                    let Tn = 0;
                    switch (ur.type) {
                    case 1:
                        qr[0] = Qr,
                        qr[1] = qr[0] + ur.width,
                        Qr = qr[1] + ur.width;
                        for (let wn = 0; wn < ur.width; ++wn)
                            Tn += pr[qr[0]++] << 8 | pr[qr[1]++],
                            jr[Or] = Tn,
                            Or++;
                        break;
                    case 2:
                        qr[0] = Qr,
                        qr[1] = qr[0] + ur.width,
                        qr[2] = qr[1] + ur.width,
                        Qr = qr[2] + ur.width;
                        for (let wn = 0; wn < ur.width; ++wn)
                            Tn += pr[qr[0]++] << 24 | pr[qr[1]++] << 16 | pr[qr[2]++] << 8,
                            jr[Or] = Tn,
                            Or++
                    }
                }
            return new DataView(jr.buffer)
        }
        function gr(ur) {
            const pr = ur.viewer
              , Ir = {
                value: ur.offset.value
            }
              , jr = new Uint8Array(ur.width * ur.lines * (ur.channels * ur.type * 2))
              , Qr = {
                version: Cr(pr, Ir),
                unknownUncompressedSize: Cr(pr, Ir),
                unknownCompressedSize: Cr(pr, Ir),
                acCompressedSize: Cr(pr, Ir),
                dcCompressedSize: Cr(pr, Ir),
                rleCompressedSize: Cr(pr, Ir),
                rleUncompressedSize: Cr(pr, Ir),
                rleRawSize: Cr(pr, Ir),
                totalAcUncompressedCount: Cr(pr, Ir),
                totalDcUncompressedCount: Cr(pr, Ir),
                acCompression: Cr(pr, Ir)
            };
            if (Qr.version < 2)
                throw new Error("EXRLoader.parse: " + mo.compression + " version " + Qr.version + " is unsupported");
            const Or = new Array;
            let qr = Zr(pr, Ir) - 2;
            for (; qr > 0; ) {
                const En = dr(pr.buffer, Ir)
                  , Qn = Rr(pr, Ir)
                  , Rn = Qn >> 2 & 3
                  , Yn = new Int8Array([(Qn >> 4) - 1])[0]
                  , Bo = Rr(pr, Ir);
                Or.push({
                    name: En,
                    index: Yn,
                    type: Bo,
                    compression: Rn
                }),
                qr -= En.length + 3
            }
            const gn = mo.channels
              , Mn = new Array(ur.channels);
            for (let En = 0; En < ur.channels; ++En) {
                const Qn = Mn[En] = {}
                  , Rn = gn[En];
                Qn.name = Rn.name,
                Qn.compression = 0,
                Qn.decoded = !1,
                Qn.type = Rn.pixelType,
                Qn.pLinear = Rn.pLinear,
                Qn.width = ur.width,
                Qn.height = ur.lines
            }
            const Tn = {
                idx: new Array(3)
            };
            for (let En = 0; En < ur.channels; ++En) {
                const Qn = Mn[En];
                for (let Rn = 0; Rn < Or.length; ++Rn) {
                    const Yn = Or[Rn];
                    Qn.name == Yn.name && (Qn.compression = Yn.compression,
                    Yn.index >= 0 && (Tn.idx[Yn.index] = En),
                    Qn.offset = En)
                }
            }
            let wn, Cn, fn;
            if (Qr.acCompressedSize > 0)
                switch (Qr.acCompression) {
                case 0:
                    wn = new Uint16Array(Qr.totalAcUncompressedCount),
                    Dt(ur.array, pr, Ir, Qr.acCompressedSize, wn, Qr.totalAcUncompressedCount);
                    break;
                case 1:
                    const En = fflate_module_unzlibSync(ur.array.slice(Ir.value, Ir.value + Qr.totalAcUncompressedCount));
                    wn = new Uint16Array(En.buffer),
                    Ir.value += Qr.totalAcUncompressedCount
                }
            if (Qr.dcCompressedSize > 0) {
                const En = {
                    array: ur.array,
                    offset: Ir,
                    size: Qr.dcCompressedSize
                };
                Cn = new Uint16Array(lr(En).buffer),
                Ir.value += Qr.dcCompressedSize
            }
            Qr.rleRawSize > 0 && (fn = kt(fflate_module_unzlibSync(ur.array.slice(Ir.value, Ir.value + Qr.rleCompressedSize)).buffer),
            Ir.value += Qr.rleCompressedSize);
            let bn = 0;
            const Xn = new Array(Mn.length);
            for (let En = 0; En < Xn.length; ++En)
                Xn[En] = new Array;
            for (let En = 0; En < ur.lines; ++En)
                for (let Qn = 0; Qn < Mn.length; ++Qn)
                    Xn[Qn].push(bn),
                    bn += Mn[Qn].width * ur.type * 2;
            (function(En, Qn, Rn, Yn, Bo, vo) {
                let Hn = new DataView(vo.buffer);
                const $n = Rn[En.idx[0]].width
                  , ao = Rn[En.idx[0]].height
                  , zo = Math.floor($n / 8)
                  , Zo = Math.ceil($n / 8)
                  , $o = Math.ceil(ao / 8)
                  , Yo = $n - 8 * (Zo - 1)
                  , ss = ao - 8 * ($o - 1)
                  , Os = {
                    value: 0
                }
                  , $l = new Array(3)
                  , wl = new Array(3)
                  , Ps = new Array(3)
                  , ys = new Array(3)
                  , as = new Array(3);
                for (let Eo = 0; Eo < 3; ++Eo)
                    as[Eo] = Qn[En.idx[Eo]],
                    $l[Eo] = Eo < 1 ? 0 : $l[Eo - 1] + Zo * $o,
                    wl[Eo] = new Float32Array(64),
                    Ps[Eo] = new Uint16Array(64),
                    ys[Eo] = new Uint16Array(64 * Zo);
                for (let Eo = 0; Eo < $o; ++Eo) {
                    let Sl = 8;
                    Eo == $o - 1 && (Sl = ss);
                    let Ks = 8;
                    for (let yo = 0; yo < Zo; ++yo) {
                        yo == Zo - 1 && (Ks = Yo);
                        for (let ko = 0; ko < 3; ++ko)
                            Ps[ko].fill(0),
                            Ps[ko][0] = Bo[$l[ko]++],
                            Ut(Os, Yn, Ps[ko]),
                            Ln = Ps[ko],
                            (Vn = wl[ko])[0] = vr(Ln[0]),
                            Vn[1] = vr(Ln[1]),
                            Vn[2] = vr(Ln[5]),
                            Vn[3] = vr(Ln[6]),
                            Vn[4] = vr(Ln[14]),
                            Vn[5] = vr(Ln[15]),
                            Vn[6] = vr(Ln[27]),
                            Vn[7] = vr(Ln[28]),
                            Vn[8] = vr(Ln[2]),
                            Vn[9] = vr(Ln[4]),
                            Vn[10] = vr(Ln[7]),
                            Vn[11] = vr(Ln[13]),
                            Vn[12] = vr(Ln[16]),
                            Vn[13] = vr(Ln[26]),
                            Vn[14] = vr(Ln[29]),
                            Vn[15] = vr(Ln[42]),
                            Vn[16] = vr(Ln[3]),
                            Vn[17] = vr(Ln[8]),
                            Vn[18] = vr(Ln[12]),
                            Vn[19] = vr(Ln[17]),
                            Vn[20] = vr(Ln[25]),
                            Vn[21] = vr(Ln[30]),
                            Vn[22] = vr(Ln[41]),
                            Vn[23] = vr(Ln[43]),
                            Vn[24] = vr(Ln[9]),
                            Vn[25] = vr(Ln[11]),
                            Vn[26] = vr(Ln[18]),
                            Vn[27] = vr(Ln[24]),
                            Vn[28] = vr(Ln[31]),
                            Vn[29] = vr(Ln[40]),
                            Vn[30] = vr(Ln[44]),
                            Vn[31] = vr(Ln[53]),
                            Vn[32] = vr(Ln[10]),
                            Vn[33] = vr(Ln[19]),
                            Vn[34] = vr(Ln[23]),
                            Vn[35] = vr(Ln[32]),
                            Vn[36] = vr(Ln[39]),
                            Vn[37] = vr(Ln[45]),
                            Vn[38] = vr(Ln[52]),
                            Vn[39] = vr(Ln[54]),
                            Vn[40] = vr(Ln[20]),
                            Vn[41] = vr(Ln[22]),
                            Vn[42] = vr(Ln[33]),
                            Vn[43] = vr(Ln[38]),
                            Vn[44] = vr(Ln[46]),
                            Vn[45] = vr(Ln[51]),
                            Vn[46] = vr(Ln[55]),
                            Vn[47] = vr(Ln[60]),
                            Vn[48] = vr(Ln[21]),
                            Vn[49] = vr(Ln[34]),
                            Vn[50] = vr(Ln[37]),
                            Vn[51] = vr(Ln[47]),
                            Vn[52] = vr(Ln[50]),
                            Vn[53] = vr(Ln[56]),
                            Vn[54] = vr(Ln[59]),
                            Vn[55] = vr(Ln[61]),
                            Vn[56] = vr(Ln[35]),
                            Vn[57] = vr(Ln[36]),
                            Vn[58] = vr(Ln[48]),
                            Vn[59] = vr(Ln[49]),
                            Vn[60] = vr(Ln[57]),
                            Vn[61] = vr(Ln[58]),
                            Vn[62] = vr(Ln[62]),
                            Vn[63] = vr(Ln[63]),
                            Ht(wl[ko]);
                        Kt(wl);
                        for (let ko = 0; ko < 3; ++ko)
                            Jt(wl[ko], ys[ko], 64 * yo)
                    }
                    let ds = 0;
                    for (let yo = 0; yo < 3; ++yo) {
                        const ko = Rn[En.idx[yo]].type;
                        for (let xs = 8 * Eo; xs < 8 * Eo + Sl; ++xs) {
                            ds = as[yo][xs];
                            for (let Js = 0; Js < zo; ++Js) {
                                const bs = 64 * Js + 8 * (7 & xs);
                                Hn.setUint16(ds + 0 * ko, ys[yo][bs + 0], !0),
                                Hn.setUint16(ds + 2 * ko, ys[yo][bs + 1], !0),
                                Hn.setUint16(ds + 4 * ko, ys[yo][bs + 2], !0),
                                Hn.setUint16(ds + 6 * ko, ys[yo][bs + 3], !0),
                                Hn.setUint16(ds + 8 * ko, ys[yo][bs + 4], !0),
                                Hn.setUint16(ds + 10 * ko, ys[yo][bs + 5], !0),
                                Hn.setUint16(ds + 12 * ko, ys[yo][bs + 6], !0),
                                Hn.setUint16(ds + 14 * ko, ys[yo][bs + 7], !0),
                                ds += 16 * ko
                            }
                        }
                        if (zo != Zo)
                            for (let xs = 8 * Eo; xs < 8 * Eo + Sl; ++xs) {
                                const Js = as[yo][xs] + 8 * zo * 2 * ko
                                  , bs = 64 * zo + 8 * (7 & xs);
                                for (let Bl = 0; Bl < Ks; ++Bl)
                                    Hn.setUint16(Js + 2 * Bl * ko, ys[yo][bs + Bl], !0)
                            }
                    }
                }
                var Ln, Vn;
                const Ys = new Uint16Array($n);
                Hn = new DataView(vo.buffer);
                for (let Eo = 0; Eo < 3; ++Eo) {
                    Rn[En.idx[Eo]].decoded = !0;
                    const Sl = Rn[En.idx[Eo]].type;
                    if (Rn[Eo].type == 2)
                        for (let Ks = 0; Ks < ao; ++Ks) {
                            const ds = as[Eo][Ks];
                            for (let yo = 0; yo < $n; ++yo)
                                Ys[yo] = Hn.getUint16(ds + 2 * yo * Sl, !0);
                            for (let yo = 0; yo < $n; ++yo)
                                Hn.setFloat32(ds + 2 * yo * Sl, vr(Ys[yo]), !0)
                        }
                }
            }
            )(Tn, Xn, Mn, wn, Cn, jr);
            for (let En = 0; En < Mn.length; ++En) {
                const Qn = Mn[En];
                if (!Qn.decoded) {
                    if (Qn.compression !== 2)
                        throw new Error("EXRLoader.parse: unsupported channel compression");
                    {
                        let Rn = 0
                          , Yn = 0;
                        for (let Bo = 0; Bo < ur.lines; ++Bo) {
                            let vo = Xn[En][Rn];
                            for (let Hn = 0; Hn < Qn.width; ++Hn) {
                                for (let $n = 0; $n < 2 * Qn.type; ++$n)
                                    jr[vo++] = fn[Yn + $n * Qn.width * Qn.height];
                                Yn++
                            }
                            Rn++
                        }
                    }
                }
            }
            return new DataView(jr.buffer)
        }
        function dr(ur, pr) {
            const Ir = new Uint8Array(ur);
            let jr = 0;
            for (; Ir[pr.value + jr] != 0; )
                jr += 1;
            const Qr = new TextDecoder().decode(Ir.slice(pr.value, pr.value + jr));
            return pr.value = pr.value + jr + 1,
            Qr
        }
        function cr(ur, pr) {
            const Ir = ur.getInt32(pr.value, !0);
            return pr.value = pr.value + 4,
            Ir
        }
        function Ar(ur, pr) {
            const Ir = ur.getUint32(pr.value, !0);
            return pr.value = pr.value + 4,
            Ir
        }
        function wr(ur, pr) {
            const Ir = ur[pr.value];
            return pr.value = pr.value + 1,
            Ir
        }
        function Rr(ur, pr) {
            const Ir = ur.getUint8(pr.value);
            return pr.value = pr.value + 1,
            Ir
        }
        const Cr = function(ur, pr) {
            let Ir;
            return Ir = "getBigInt64"in DataView.prototype ? Number(ur.getBigInt64(pr.value, !0)) : ur.getUint32(pr.value + 4, !0) + Number(ur.getUint32(pr.value, !0) << 32),
            pr.value += 8,
            Ir
        };
        function tr(ur, pr) {
            const Ir = ur.getFloat32(pr.value, !0);
            return pr.value += 4,
            Ir
        }
        function fr(ur, pr) {
            return three_module.GxU.toHalfFloat(tr(ur, pr))
        }
        function vr(ur) {
            const pr = (31744 & ur) >> 10
              , Ir = 1023 & ur;
            return (ur >> 15 ? -1 : 1) * (pr ? pr === 31 ? Ir ? NaN : 1 / 0 : Math.pow(2, pr - 15) * (1 + Ir / 1024) : Ir / 1024 * 6103515625e-14)
        }
        function Zr(ur, pr) {
            const Ir = ur.getUint16(pr.value, !0);
            return pr.value += 2,
            Ir
        }
        function rn(ur, pr) {
            return vr(Zr(ur, pr))
        }
        function hn(ur, pr, Ir, jr, Qr) {
            return jr === "string" || jr === "stringvector" || jr === "iccProfile" ? function(Or, qr, gn) {
                const Mn = new TextDecoder().decode(new Uint8Array(Or).slice(qr.value, qr.value + gn));
                return qr.value = qr.value + gn,
                Mn
            }(pr, Ir, Qr) : jr === "chlist" ? function(Or, qr, gn, Mn) {
                const Tn = gn.value
                  , wn = [];
                for (; gn.value < Tn + Mn - 1; ) {
                    const Cn = dr(qr, gn)
                      , fn = cr(Or, gn)
                      , bn = Rr(Or, gn);
                    gn.value += 3;
                    const Xn = cr(Or, gn)
                      , En = cr(Or, gn);
                    wn.push({
                        name: Cn,
                        pixelType: fn,
                        pLinear: bn,
                        xSampling: Xn,
                        ySampling: En
                    })
                }
                return gn.value += 1,
                wn
            }(ur, pr, Ir, Qr) : jr === "chromaticities" ? function(Or, qr) {
                return {
                    redX: tr(Or, qr),
                    redY: tr(Or, qr),
                    greenX: tr(Or, qr),
                    greenY: tr(Or, qr),
                    blueX: tr(Or, qr),
                    blueY: tr(Or, qr),
                    whiteX: tr(Or, qr),
                    whiteY: tr(Or, qr)
                }
            }(ur, Ir) : jr === "compression" ? function(Or, qr) {
                return ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"][Rr(Or, qr)]
            }(ur, Ir) : jr === "box2i" ? function(Or, qr) {
                return {
                    xMin: Ar(Or, qr),
                    yMin: Ar(Or, qr),
                    xMax: Ar(Or, qr),
                    yMax: Ar(Or, qr)
                }
            }(ur, Ir) : jr === "lineOrder" ? function(Or, qr) {
                return ["INCREASING_Y"][Rr(Or, qr)]
            }(ur, Ir) : jr === "float" ? tr(ur, Ir) : jr === "v2f" ? function(Or, qr) {
                return [tr(Or, qr), tr(Or, qr)]
            }(ur, Ir) : jr === "v3f" ? function(Or, qr) {
                return [tr(Or, qr), tr(Or, qr), tr(Or, qr)]
            }(ur, Ir) : jr === "int" ? cr(ur, Ir) : jr === "rational" ? function(Or, qr) {
                return [cr(Or, qr), Ar(Or, qr)]
            }(ur, Ir) : jr === "timecode" ? function(Or, qr) {
                return [Ar(Or, qr), Ar(Or, qr)]
            }(ur, Ir) : jr === "preview" ? (Ir.value += Qr,
            "skipped") : void (Ir.value += Qr)
        }
        const Nn = new DataView(o)
          , Wn = new Uint8Array(o)
          , qn = {
            value: 0
        }
          , mo = function(ur, pr, Ir) {
            const jr = {};
            if (ur.getUint32(0, !0) != 20000630)
                throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
            jr.version = ur.getUint8(4);
            const Qr = ur.getUint8(5);
            jr.spec = {
                singleTile: !!(2 & Qr),
                longName: !!(4 & Qr),
                deepFormat: !!(8 & Qr),
                multiPart: !!(16 & Qr)
            },
            Ir.value = 8;
            let Or = !0;
            for (; Or; ) {
                const qr = dr(pr, Ir);
                if (qr == 0)
                    Or = !1;
                else {
                    const gn = dr(pr, Ir)
                      , Mn = hn(ur, pr, Ir, gn, Ar(ur, Ir));
                    Mn === void 0 ? console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${gn}'.`) : jr[qr] = Mn
                }
            }
            if (-5 & Qr)
                throw console.error("THREE.EXRHeader:", jr),
                new Error("THREE.EXRLoader: Provided file is currently unsupported.");
            return jr
        }(Nn, o, qn)
          , Ur = function(ur, pr, Ir, jr, Qr) {
            const Or = {
                size: 0,
                viewer: pr,
                array: Ir,
                offset: jr,
                width: ur.dataWindow.xMax - ur.dataWindow.xMin + 1,
                height: ur.dataWindow.yMax - ur.dataWindow.yMin + 1,
                channels: ur.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: ur.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                colorSpace: three_module.Zr2
            };
            switch (ur.compression) {
            case "NO_COMPRESSION":
                Or.lines = 1,
                Or.uncompress = or;
                break;
            case "RLE_COMPRESSION":
                Or.lines = 1,
                Or.uncompress = ir;
                break;
            case "ZIPS_COMPRESSION":
                Or.lines = 1,
                Or.uncompress = lr;
                break;
            case "ZIP_COMPRESSION":
                Or.lines = 16,
                Or.uncompress = lr;
                break;
            case "PIZ_COMPRESSION":
                Or.lines = 32,
                Or.uncompress = ar;
                break;
            case "PXR24_COMPRESSION":
                Or.lines = 16,
                Or.uncompress = hr;
                break;
            case "DWAA_COMPRESSION":
                Or.lines = 32,
                Or.uncompress = gr;
                break;
            case "DWAB_COMPRESSION":
                Or.lines = 256,
                Or.uncompress = gr;
                break;
            default:
                throw new Error("EXRLoader.parse: " + ur.compression + " is unsupported")
            }
            if (Or.scanlineBlockSize = Or.lines,
            Or.type == 1)
                switch (Qr) {
                case three_module.RQf:
                    Or.getter = rn,
                    Or.inputSize = 2;
                    break;
                case three_module.ix0:
                    Or.getter = Zr,
                    Or.inputSize = 2
                }
            else {
                if (Or.type != 2)
                    throw new Error("EXRLoader.parse: unsupported pixelType " + Or.type + " for " + ur.compression + ".");
                switch (Qr) {
                case three_module.RQf:
                    Or.getter = tr,
                    Or.inputSize = 4;
                    break;
                case three_module.ix0:
                    Or.getter = fr,
                    Or.inputSize = 4
                }
            }
            Or.blockCount = (ur.dataWindow.yMax + 1) / Or.scanlineBlockSize;
            for (let gn = 0; gn < Or.blockCount; gn++)
                Cr(pr, jr);
            Or.outputChannels = Or.channels == 3 ? 4 : Or.channels;
            const qr = Or.width * Or.height * Or.outputChannels;
            switch (Qr) {
            case three_module.RQf:
                Or.byteArray = new Float32Array(qr),
                Or.channels < Or.outputChannels && Or.byteArray.fill(1, 0, qr);
                break;
            case three_module.ix0:
                Or.byteArray = new Uint16Array(qr),
                Or.channels < Or.outputChannels && Or.byteArray.fill(15360, 0, qr);
                break;
            default:
                console.error("THREE.EXRLoader: unsupported type: ", Qr)
            }
            return Or.bytesPerLine = Or.width * Or.inputSize * Or.channels,
            Or.outputChannels == 4 ? (Or.format = three_module.GWd,
            Or.colorSpace = three_module.Zr2) : (Or.format = three_module.VT0,
            Or.colorSpace = three_module.jf0),
            Or
        }(mo, Nn, Wn, qn, this.type)
          , nn = {
            value: 0
        }
          , xn = {
            R: 0,
            G: 1,
            B: 2,
            A: 3,
            Y: 0
        };
        for (let ur = 0; ur < Ur.height / Ur.scanlineBlockSize; ur++) {
            const pr = Ar(Nn, qn);
            Ur.size = Ar(Nn, qn),
            Ur.lines = pr + Ur.scanlineBlockSize > Ur.height ? Ur.height - pr : Ur.scanlineBlockSize;
            const Ir = Ur.size < Ur.lines * Ur.bytesPerLine ? Ur.uncompress(Ur) : or(Ur);
            qn.value += Ur.size;
            for (let jr = 0; jr < Ur.scanlineBlockSize; jr++) {
                const Qr = jr + ur * Ur.scanlineBlockSize;
                if (Qr >= Ur.height)
                    break;
                for (let Or = 0; Or < Ur.channels; Or++) {
                    const qr = xn[mo.channels[Or].name];
                    for (let gn = 0; gn < Ur.width; gn++) {
                        nn.value = (jr * (Ur.channels * Ur.width) + Or * Ur.width + gn) * Ur.inputSize;
                        const Mn = (Ur.height - 1 - Qr) * (Ur.width * Ur.outputChannels) + gn * Ur.outputChannels + qr;
                        Ur.byteArray[Mn] = Ur.getter(Ir, nn)
                    }
                }
            }
        }
        return {
            header: mo,
            width: Ur.width,
            height: Ur.height,
            data: Ur.byteArray,
            format: Ur.format,
            colorSpace: Ur.colorSpace,
            type: this.type
        }
    }
    setDataType(o) {
        return this.type = o,
        this
    }
    load(o, c, h, _) {
        return super.load(o, function(b, _e) {
            b.colorSpace = _e.colorSpace,
            b.minFilter = three_module.k6q,
            b.magFilter = three_module.k6q,
            b.generateMipmaps = !1,
            b.flipY = !1,
            c && c(b, _e)
        }, h, _)
    }
}

export default nt;
