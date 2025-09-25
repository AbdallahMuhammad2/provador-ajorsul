/* Standalone Constant: ms */

const ms = {
                id: "slider",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        max: wt.required.number,
                        min: wt.required.number,
                        view: wt.required.constant("slider"),
                        format: wt.optional.function,
                        label: wt.optional.string,
                        value: wt.optional.number
                    });
                    return Rt ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    var wt, Rt;
                    const zt = (wt = Vt.params.value) !== null && wt !== void 0 ? wt : 0
                      , nr = new Xl({
                        max: Vt.params.max,
                        min: Vt.params.min
                    })
                      , mr = new $m(Vt.document,{
                        baseStep: 1,
                        parser: Ll,
                        sliderProps: new ir({
                            maxValue: nr.values.value("max"),
                            minValue: nr.values.value("min")
                        }),
                        textProps: ir.fromObject({
                            draggingScale: fu(void 0, zt),
                            formatter: (Rt = Vt.params.format) !== null && Rt !== void 0 ? Rt : S0
                        }),
                        value: or(zt, {
                            constraint: nr
                        }),
                        viewProps: Vt.viewProps
                    });
                    return new Os(Vt.document,{
                        blade: Vt.blade,
                        props: ir.fromObject({
                            label: Vt.params.label
                        }),
                        valueController: mr
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof Os && Vt.controller.valueController instanceof $m ? new p_(Vt.controller) : null
                }
            }
              , nu = {
                id: "text",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        parse: wt.required.function,
                        value: wt.required.raw,
                        view: wt.required.constant("text"),
                        format: wt.optional.function,
                        label: wt.optional.string
                    });
                    return Rt ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    var wt;
                    const Rt = new Iu(Vt.document,{
                        parser: Vt.params.parse,
                        props: ir.fromObject({
                            formatter: (wt = Vt.params.format) !== null && wt !== void 0 ? wt : zt => String(zt)
                        }),
                        value: or(Vt.params.value),
                        viewProps: Vt.viewProps
                    });
                    return new Os(Vt.document,{
                        blade: Vt.blade,
                        props: ir.fromObject({
                            label: Vt.params.label
                        }),
                        valueController: Rt
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof Os && Vt.controller.valueController instanceof Iu ? new Vl(Vt.controller) : null
                }
            };

export default ms;
