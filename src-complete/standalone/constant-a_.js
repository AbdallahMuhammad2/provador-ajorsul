/* Standalone Constant: a_ */

const a_ = {
                id: "input-number",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "number")
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        format: Rt.optional.function,
                        max: Rt.optional.number,
                        min: Rt.optional.number,
                        options: Rt.optional.custom(Kp),
                        step: Rt.optional.number
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => H_,
                    constraint: Vt => function(wt, Rt) {
                        const zt = []
                          , nr = Ws(wt, Rt);
                        nr && zt.push(nr);
                        const mr = Ml(wt);
                        mr && zt.push(mr);
                        const Tr = Xm(wt.options);
                        return Tr && zt.push(Tr),
                        new lu(zt)
                    }(Vt.params, Vt.initialValue),
                    writer: Vt => hp
                },
                controller: Vt => {
                    var wt;
                    const Rt = Vt.value
                      , zt = Vt.constraint
                      , nr = zt && Zs(zt, cu);
                    if (nr)
                        return new uu(Vt.document,{
                            props: new ir({
                                options: nr.values.value("options")
                            }),
                            value: Rt,
                            viewProps: Vt.viewProps
                        });
                    const mr = (wt = "format"in Vt.params ? Vt.params.format : void 0) !== null && wt !== void 0 ? wt : ts(mp(zt, Rt.rawValue))
                      , Tr = zt && Zs(zt, Xl);
                    return Tr ? new $m(Vt.document,{
                        baseStep: mu(zt),
                        parser: Ll,
                        sliderProps: new ir({
                            maxValue: Tr.values.value("max"),
                            minValue: Tr.values.value("min")
                        }),
                        textProps: ir.fromObject({
                            draggingScale: fu(zt, Rt.rawValue),
                            formatter: mr
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    }) : new pp(Vt.document,{
                        baseStep: mu(zt),
                        parser: Ll,
                        props: ir.fromObject({
                            draggingScale: fu(zt, Rt.rawValue),
                            formatter: mr
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            };

export default a_;
