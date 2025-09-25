/* Standalone Constant: ss */

const ss = {
                id: "folder",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        title: wt.required.string,
                        view: wt.required.constant("folder"),
                        expanded: wt.optional.boolean
                    });
                    return Rt ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    return new Yo(Vt.document,{
                        blade: Vt.blade,
                        expanded: Vt.params.expanded,
                        props: ir.fromObject({
                            title: Vt.params.title
                        }),
                        viewProps: Vt.viewProps
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof Yo ? new Yn(Vt.controller,Vt.pool) : null
                }
            };

export default ss;
