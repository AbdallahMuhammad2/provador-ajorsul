/* Standalone Constant: X_ */

const X_ = {
                id: "input-bool",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "boolean")
                        return null;
                    const Rt = gr(wt, {
                        options: hr.optional.custom(Kp)
                    });
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Wp,
                    constraint: Vt => function(wt) {
                        const Rt = []
                          , zt = Xm(wt.options);
                        return zt && Rt.push(zt),
                        new lu(Rt)
                    }(Vt.params),
                    writer: Vt => hp
                },
                controller: Vt => {
                    const wt = Vt.document
                      , Rt = Vt.value
                      , zt = Vt.constraint
                      , nr = zt && Zs(zt, cu);
                    return nr ? new uu(wt,{
                        props: new ir({
                            options: nr.values.value("options")
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    }) : new $_(wt,{
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , Kl = Et("col");
            class Y_ {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Kl()),
                    Rt.foldable.bindExpandedClass(this.element, Kl(void 0, "expanded")),
                    Dt(Rt.foldable, "completed", Gt(this.element, Kl(void 0, "cpl")));
                    const zt = wt.createElement("div");
                    zt.classList.add(Kl("h")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("div");
                    nr.classList.add(Kl("s")),
                    zt.appendChild(nr),
                    this.swatchElement = nr;
                    const mr = wt.createElement("div");
                    if (mr.classList.add(Kl("t")),
                    zt.appendChild(mr),
                    this.textElement = mr,
                    Rt.pickerLayout === "inline") {
                        const Tr = wt.createElement("div");
                        Tr.classList.add(Kl("p")),
                        this.element.appendChild(Tr),
                        this.pickerElement = Tr
                    } else
                        this.pickerElement = null
                }
            }
            function Nu(Vt, wt, Rt) {
                const zt = Ou(Vt, 360)
                  , nr = Wo(wt / 100, 0, 1)
                  , mr = Wo(Rt / 100, 0, 1)
                  , Tr = mr * nr
                  , $r = Tr * (1 - Math.abs(zt / 60 % 2 - 1))
                  , vn = mr - Tr;
                let zn, co, is;
                return [zn,co,is] = zt >= 0 && zt < 60 ? [Tr, $r, 0] : zt >= 60 && zt < 120 ? [$r, Tr, 0] : zt >= 120 && zt < 180 ? [0, Tr, $r] : zt >= 180 && zt < 240 ? [0, $r, Tr] : zt >= 240 && zt < 300 ? [$r, 0, Tr] : [Tr, 0, $r],
                [255 * (zn + vn), 255 * (co + vn), 255 * (is + vn)]
            }
            function gu(Vt) {
                return [Vt[0], Vt[1], Vt[2]]
            }
            function K_(Vt, wt) {
                return [Vt[0], Vt[1], Vt[2], wt]
            }
            const P0 = {
                hsl: {
                    hsl: (Vt, wt, Rt) => [Vt, wt, Rt],
                    hsv: function(Vt, wt, Rt) {
                        const zt = Rt + wt * (100 - Math.abs(2 * Rt - 100)) / 200;
                        return [Vt, zt !== 0 ? wt * (100 - Math.abs(2 * Rt - 100)) / zt : 0, Rt + wt * (100 - Math.abs(2 * Rt - 100)) / 200]
                    },
                    rgb: function(Vt, wt, Rt) {
                        const zt = (Vt % 360 + 360) % 360
                          , nr = Wo(wt / 100, 0, 1)
                          , mr = Wo(Rt / 100, 0, 1)
                          , Tr = (1 - Math.abs(2 * mr - 1)) * nr
                          , $r = Tr * (1 - Math.abs(zt / 60 % 2 - 1))
                          , vn = mr - Tr / 2;
                        let zn, co, is;
                        return [zn,co,is] = zt >= 0 && zt < 60 ? [Tr, $r, 0] : zt >= 60 && zt < 120 ? [$r, Tr, 0] : zt >= 120 && zt < 180 ? [0, Tr, $r] : zt >= 180 && zt < 240 ? [0, $r, Tr] : zt >= 240 && zt < 300 ? [$r, 0, Tr] : [Tr, 0, $r],
                        [255 * (zn + vn), 255 * (co + vn), 255 * (is + vn)]
                    }
                },
                hsv: {
                    hsl: function(Vt, wt, Rt) {
                        const zt = 100 - Math.abs(Rt * (200 - wt) / 100 - 100);
                        return [Vt, zt !== 0 ? wt * Rt / zt : 0, Rt * (200 - wt) / 200]
                    },
                    hsv: (Vt, wt, Rt) => [Vt, wt, Rt],
                    rgb: Nu
                },
                rgb: {
                    hsl: function(Vt, wt, Rt) {
                        const zt = Wo(Vt / 255, 0, 1)
                          , nr = Wo(wt / 255, 0, 1)
                          , mr = Wo(Rt / 255, 0, 1)
                          , Tr = Math.max(zt, nr, mr)
                          , $r = Math.min(zt, nr, mr)
                          , vn = Tr - $r;
                        let zn = 0
                          , co = 0;
                        const is = ($r + Tr) / 2;
                        return vn !== 0 && (co = vn / (1 - Math.abs(Tr + $r - 1)),
                        zn = zt === Tr ? (nr - mr) / vn : nr === Tr ? 2 + (mr - zt) / vn : 4 + (zt - nr) / vn,
                        zn = zn / 6 + (zn < 0 ? 1 : 0)),
                        [360 * zn, 100 * co, 100 * is]
                    },
                    hsv: function(Vt, wt, Rt) {
                        const zt = Wo(Vt / 255, 0, 1)
                          , nr = Wo(wt / 255, 0, 1)
                          , mr = Wo(Rt / 255, 0, 1)
                          , Tr = Math.max(zt, nr, mr)
                          , $r = Tr - Math.min(zt, nr, mr);
                        let vn;
                        return vn = $r === 0 ? 0 : Tr === zt ? ((nr - mr) / $r % 6 + 6) % 6 * 60 : Tr === nr ? 60 * ((mr - zt) / $r + 2) : 60 * ((zt - nr) / $r + 4),
                        [vn, 100 * (Tr === 0 ? 0 : $r / Tr), 100 * Tr]
                    },
                    rgb: (Vt, wt, Rt) => [Vt, wt, Rt]
                }
            };

export default X_;
