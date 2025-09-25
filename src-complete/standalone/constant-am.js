/* Standalone Constant: am */

const am = {
                id: "input-color-object",
                type: "input",
                accept: (Vt, wt) => {
                    if (!xo.isColorObject(Vt))
                        return null;
                    const Rt = Qs(wt);
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => _p(As(Vt.params)),
                    equals: xo.equals,
                    writer: Vt => {
                        return zt = Vt.initialValue,
                        wt = xo.isRgbaColorObject(zt),
                        Rt = As(Vt.params),
                        (nr, mr) => {
                            wt ? function(Tr, $r, vn) {
                                const zn = $r.toRgbaObject(vn);
                                Tr.writeProperty("r", zn.r),
                                Tr.writeProperty("g", zn.g),
                                Tr.writeProperty("b", zn.b),
                                Tr.writeProperty("a", zn.a)
                            }(nr, mr, Rt) : function(Tr, $r, vn) {
                                const zn = $r.toRgbaObject(vn);
                                Tr.writeProperty("r", zn.r),
                                Tr.writeProperty("g", zn.g),
                                Tr.writeProperty("b", zn.b)
                            }(nr, mr, Rt)
                        }
                        ;
                        var wt, Rt, zt
                    }
                },
                controller: Vt => {
                    var wt;
                    const Rt = xo.isRgbaColorObject(Vt.initialValue)
                      , zt = "expanded"in Vt.params ? Vt.params.expanded : void 0
                      , nr = "picker"in Vt.params ? Vt.params.picker : void 0
                      , mr = (wt = As(Vt.params)) !== null && wt !== void 0 ? wt : "int";
                    return new xa(Vt.document,{
                        colorType: mr,
                        expanded: zt != null && zt,
                        formatter: sm(Rt, mr),
                        parser: yu(mr),
                        pickerLayout: nr ?? "popup",
                        supportsAlpha: Rt,
                        value: Vt.value,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , wu = {
                id: "input-color-string",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "string" || "view"in wt && wt.view === "text")
                        return null;
                    const Rt = Jm(Vt, As(wt));
                    if (!Rt || !t_(Rt))
                        return null;
                    const zt = Qs(wt);
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => {
                        var wt;
                        return function(Rt) {
                            const zt = vu[Rt];
                            return nr => {
                                if (typeof nr != "string")
                                    return xo.black(Rt);
                                const mr = zt.reduce( (Tr, $r) => Tr || $r(nr), null);
                                return mr ?? xo.black(Rt)
                            }
                        }((wt = As(Vt.params)) !== null && wt !== void 0 ? wt : "int")
                    }
                    ,
                    equals: xo.equals,
                    writer: Vt => {
                        const wt = Jm(Vt.initialValue, As(Vt.params));
                        if (!wt)
                            throw _t.shouldNeverHappen();
                        const Rt = function(zt) {
                            const nr = t_(zt);
                            return nr ? (mr, Tr) => {
                                hp(mr, nr(Tr))
                            }
                            : null
                        }(wt);
                        if (!Rt)
                            throw _t.notBindable();
                        return Rt
                    }
                },
                controller: Vt => {
                    const wt = Jm(Vt.initialValue, As(Vt.params));
                    if (!wt)
                        throw _t.shouldNeverHappen();
                    const Rt = t_(wt);
                    if (!Rt)
                        throw _t.shouldNeverHappen();
                    const zt = "expanded"in Vt.params ? Vt.params.expanded : void 0
                      , nr = "picker"in Vt.params ? Vt.params.picker : void 0;
                    return new xa(Vt.document,{
                        colorType: wt.type,
                        expanded: zt != null && zt,
                        formatter: Rt,
                        parser: yu(wt.type),
                        pickerLayout: nr ?? "popup",
                        supportsAlpha: wt.alpha,
                        value: Vt.value,
                        viewProps: Vt.viewProps
                    })
                }
            };

export default am;
