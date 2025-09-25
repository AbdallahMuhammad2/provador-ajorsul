/* Standalone Constant: Fn */

const Fn = {
                            target: vn.target,
                            initialValue: ks.initialValue,
                            params: ks.params
                        }
                          , m_ = $r.binding.reader(Fn)
                          , fm = (co = (zn = Ts.optional.number(vn.params.bufferSize).value) !== null && zn !== void 0 ? zn : $r.binding.defaultBufferSize && $r.binding.defaultBufferSize(ks.params)) !== null && co !== void 0 ? co : 1
                          , Ds = Ts.optional.number(vn.params.interval).value
                          , Ju = new G_({
                            reader: m_,
                            target: vn.target,
                            ticker: Yu(vn.document, Ds),
                            value: Lm(fm)
                        })
                          , Gl = Ts.optional.boolean(vn.params.disabled).value
                          , Us = Ts.optional.boolean(vn.params.hidden).value
                          , Ap = $r.controller({
                            document: vn.document,
                            params: ks.params,
                            value: Ju.value,
                            viewProps: Rr.create({
                                disabled: Gl,
                                hidden: Us
                            })
                        });
                        return new bn(vn.document,{
                            binding: Ju,
                            blade: Qr(),
                            props: ir.fromObject({
                                label: "label"in vn.params ? (is = Ts.optional.string(vn.params.label).value) !== null && is !== void 0 ? is : null : vn.target.key
                            }),
                            valueController: Ap
                        })
                    }(Tr, {
                        document: wt,
                        params: zt,
                        target: Rt
                    }), null);
                    if (nr)
                        return nr;
                    throw new _t({
                        context: {
                            key: Rt.key
                        },
                        type: "nomatchingcontroller"
                    })
                }
                createBlade(wt, Rt) {
                    const zt = this.pluginsMap_.blades.reduce( (nr, mr) => nr ?? function(Tr, $r) {
                        const vn = Tr.accept($r.params);
                        if (!vn)
                            return null;
                        const zn = hr.optional.boolean($r.params.disabled).value
                          , co = hr.optional.boolean($r.params.hidden).value;
                        return Tr.controller({
                            blade: Qr(),
                            document: $r.document,
                            params: Object.assign(Object.assign({}, vn.params), {
                                disabled: zn,
                                hidden: co
                            }),
                            viewProps: Rr.create({
                                disabled: zn,
                                hidden: co
                            })
                        })
                    }(mr, {
                        document: wt,
                        params: Rt
                    }), null);
                    if (!zt)
                        throw new _t({
                            type: "nomatchingview",
                            context: {
                                params: Rt
                            }
                        });
                    return zt
                }
                createBladeApi(wt) {
                    if (wt instanceof Cn)
                        return new wn(wt);
                    if (wt instanceof bn)
                        return new fn(wt);
                    if (wt instanceof zo)
                        return new Rn(wt,this);
                    const Rt = this.pluginsMap_.blades.reduce( (zt, nr) => zt ?? nr.api({
                        controller: wt,
                        pool: this
                    }), null);
                    if (!Rt)
                        throw _t.shouldNeverHappen();
                    return Rt
                }
            }
            function dv(Vt) {
                return ba.isObject(Vt) ? new ba(Vt.x,Vt.y) : new ba
            }
            function u_(Vt, wt) {
                Vt.writeProperty("x", wt.x),
                Vt.writeProperty("y", wt.y)
            }
            function _l(Vt, wt) {
                if (!Vt)
                    return;
                const Rt = []
                  , zt = Ws(Vt, wt);
                zt && Rt.push(zt);
                const nr = Ml(Vt);
                return nr && Rt.push(nr),
                new lu(Rt)
            }
            function pm(Vt, wt) {
                const [Rt,zt] = Vt ? function(mr) {
                    const Tr = Zs(mr, Xl);
                    if (Tr)
                        return [Tr.values.get("min"), Tr.values.get("max")];
                    const $r = Zs(mr, Gp);
                    return $r ? [$r.minValue, $r.maxValue] : [void 0, void 0]
                }(Vt) : [];
                if (!at(Rt) || !at(zt))
                    return Math.max(Math.abs(Rt ?? 0), Math.abs(zt ?? 0));
                const nr = mu(Vt);
                return Math.max(10 * Math.abs(nr), 10 * Math.abs(wt))
            }
            function hm(Vt, wt) {
                const Rt = wt instanceof Pl ? wt.components[0] : void 0
                  , zt = wt instanceof Pl ? wt.components[1] : void 0
                  , nr = pm(Rt, Vt.x)
                  , mr = pm(zt, Vt.y);
                return Math.max(nr, mr)
            }
            function Es(Vt, wt) {
                return {
                    baseStep: mu(wt),
                    constraint: wt,
                    textProps: ir.fromObject({
                        draggingScale: fu(wt, Vt),
                        formatter: ts(mp(wt, Vt))
                    })
                }
            }
            function L0(Vt) {
                if (!("y"in Vt))
                    return !1;
                const wt = Vt.y;
                return !!wt && "inverted"in wt && !!wt.inverted
            }
            const hs = {
                id: "input-point2d",
                type: "input",
                accept: (Vt, wt) => {
                    if (!ba.isObject(Vt))
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        expanded: Rt.optional.boolean,
                        picker: Rt.optional.custom(Q_),
                        x: Rt.optional.custom(Yl),
                        y: Rt.optional.object({
                            inverted: Rt.optional.boolean,
                            max: Rt.optional.number,
                            min: Rt.optional.number,
                            step: Rt.optional.number
                        })
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => dv,
                    constraint: Vt => {
                        return wt = Vt.params,
                        Rt = Vt.initialValue,
                        new Pl({
                            assembly: Fl,
                            components: [_l("x"in wt ? wt.x : void 0, Rt.x), _l("y"in wt ? wt.y : void 0, Rt.y)]
                        });
                        var wt, Rt
                    }
                    ,
                    equals: ba.equals,
                    writer: Vt => u_
                },
                controller: Vt => {
                    const wt = Vt.document
                      , Rt = Vt.value
                      , zt = Vt.constraint;
                    if (!(zt instanceof Pl))
                        throw _t.shouldNeverHappen();
                    const nr = "expanded"in Vt.params ? Vt.params.expanded : void 0
                      , mr = "picker"in Vt.params ? Vt.params.picker : void 0;
                    return new $a(wt,{
                        axes: [Es(Rt.rawValue.x, zt.components[0]), Es(Rt.rawValue.y, zt.components[1])],
                        expanded: nr != null && nr,
                        invertsY: L0(Vt.params),
                        maxValue: hm(Rt.rawValue, zt),
                        parser: Ll,
                        pickerLayout: mr ?? "popup",
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            };

export default Fn;
