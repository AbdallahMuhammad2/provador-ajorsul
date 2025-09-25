/* Standalone Constant: mm */

const mm = {
                id: "list",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        options: wt.required.custom(Kp),
                        value: wt.required.raw,
                        view: wt.required.constant("list"),
                        label: wt.optional.string
                    });
                    return Rt ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    const wt = new cu(W_(Vt.params.options))
                      , Rt = or(Vt.params.value, {
                        constraint: wt
                    })
                      , zt = new uu(Vt.document,{
                        props: new ir({
                            options: wt.values.value("options")
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    });
                    return new Os(Vt.document,{
                        blade: Vt.blade,
                        props: ir.fromObject({
                            label: Vt.params.label
                        }),
                        valueController: zt
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof Os && Vt.controller.valueController instanceof uu ? new d_(Vt.controller) : null
                }
            };

export default mm;
