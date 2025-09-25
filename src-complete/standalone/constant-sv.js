/* Standalone Constant: sv */

const sv = {
                id: "input-point3d",
                type: "input",
                accept: (Vt, wt) => {
                    if (!qu.isObject(Vt))
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        x: Rt.optional.custom(Yl),
                        y: Rt.optional.custom(Yl),
                        z: Rt.optional.custom(Yl)
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => tu,
                    constraint: Vt => {
                        return wt = Vt.params,
                        Rt = Vt.initialValue,
                        new Pl({
                            assembly: ov,
                            components: [_l("x"in wt ? wt.x : void 0, Rt.x), _l("y"in wt ? wt.y : void 0, Rt.y), _l("z"in wt ? wt.z : void 0, Rt.z)]
                        });
                        var wt, Rt
                    }
                    ,
                    equals: qu.equals,
                    writer: Vt => cm
                },
                controller: Vt => {
                    const wt = Vt.value
                      , Rt = Vt.constraint;
                    if (!(Rt instanceof Pl))
                        throw _t.shouldNeverHappen();
                    return new yp(Vt.document,{
                        assembly: ov,
                        axes: [Ss(wt.rawValue.x, Rt.components[0]), Ss(wt.rawValue.y, Rt.components[1]), Ss(wt.rawValue.z, Rt.components[2])],
                        parser: Ll,
                        value: wt,
                        viewProps: Vt.viewProps
                    })
                }
            };

export default sv;
