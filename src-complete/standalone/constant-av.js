/* Standalone Constant: av */

const av = {
                id: "input-point4d",
                type: "input",
                accept: (Vt, wt) => {
                    if (!Su.isObject(Vt))
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        x: Rt.optional.custom(Yl),
                        y: Rt.optional.custom(Yl),
                        z: Rt.optional.custom(Yl),
                        w: Rt.optional.custom(Yl)
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => um,
                    constraint: Vt => {
                        return wt = Vt.params,
                        Rt = Vt.initialValue,
                        new Pl({
                            assembly: $u,
                            components: [_l("x"in wt ? wt.x : void 0, Rt.x), _l("y"in wt ? wt.y : void 0, Rt.y), _l("z"in wt ? wt.z : void 0, Rt.z), _l("w"in wt ? wt.w : void 0, Rt.w)]
                        });
                        var wt, Rt
                    }
                    ,
                    equals: Su.equals,
                    writer: Vt => D0
                },
                controller: Vt => {
                    const wt = Vt.value
                      , Rt = Vt.constraint;
                    if (!(Rt instanceof Pl))
                        throw _t.shouldNeverHappen();
                    return new yp(Vt.document,{
                        assembly: $u,
                        axes: wt.rawValue.getComponents().map( (zt, nr) => {
                            return mr = zt,
                            {
                                baseStep: mu(Tr = Rt.components[nr]),
                                constraint: Tr,
                                textProps: ir.fromObject({
                                    draggingScale: fu(Tr, mr),
                                    formatter: ts(mp(Tr, mr))
                                })
                            };

export default av;
