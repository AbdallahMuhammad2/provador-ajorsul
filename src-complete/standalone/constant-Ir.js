/* Standalone Constant: Ir */

const Ir = {
                id: "button",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        title: wt.required.string,
                        view: wt.required.constant("button"),
                        label: wt.optional.string
                    });
                    return Rt ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    return new pr(Vt.document,{
                        blade: Vt.blade,
                        props: ir.fromObject({
                            label: Vt.params.label
                        }),
                        valueController: new Ht(Vt.document,{
                            props: ir.fromObject({
                                title: Vt.params.title
                            }),
                            viewProps: Vt.viewProps
                        })
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof pr && Vt.controller.valueController instanceof Ht ? new bt(Vt.controller) : null
                }
            };

export default Ir;
