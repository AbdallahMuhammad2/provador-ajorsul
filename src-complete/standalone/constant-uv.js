/* Standalone Constant: uv */

const uv = {
                id: "monitor-bool",
                type: "monitor",
                accept: (Vt, wt) => {
                    if (typeof Vt != "boolean")
                        return null;
                    const Rt = gr(wt, {
                        lineCount: hr.optional.number
                    });
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Wp
                },
                controller: Vt => {
                    var wt;
                    return Vt.value.rawValue.length === 1 ? new dm(Vt.document,{
                        formatter: sp,
                        value: Vt.value,
                        viewProps: Vt.viewProps
                    }) : new l_(Vt.document,{
                        formatter: sp,
                        lineCount: (wt = Vt.params.lineCount) !== null && wt !== void 0 ? wt : Ns.defaultLineCount,
                        value: Vt.value,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , ru = Et("grl");
            class B0 {
                constructor(wt, Rt) {
                    this.onCursorChange_ = this.onCursorChange_.bind(this),
                    this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(ru()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    this.formatter_ = Rt.formatter,
                    this.props_ = Rt.props,
                    this.cursor_ = Rt.cursor,
                    this.cursor_.emitter.on("change", this.onCursorChange_);
                    const zt = wt.createElementNS(vr, "svg");
                    zt.classList.add(ru("g")),
                    zt.style.height = `calc(var(--bld-us) * ${Rt.lineCount})`,
                    this.element.appendChild(zt),
                    this.svgElem_ = zt;
                    const nr = wt.createElementNS(vr, "polyline");
                    this.svgElem_.appendChild(nr),
                    this.lineElem_ = nr;
                    const mr = wt.createElement("div");
                    mr.classList.add(ru("t"), Et("tt")()),
                    this.element.appendChild(mr),
                    this.tooltipElem_ = mr,
                    Rt.value.emitter.on("change", this.onValueUpdate_),
                    this.value = Rt.value,
                    this.update_()
                }
                get graphElement() {
                    return this.svgElem_
                }
                update_() {
                    const wt = this.svgElem_.getBoundingClientRect()
                      , Rt = this.value.rawValue.length - 1
                      , zt = this.props_.get("minValue")
                      , nr = this.props_.get("maxValue")
                      , mr = [];
                    this.value.rawValue.forEach( (co, is) => {
                        if (co === void 0)
                            return;
                        const Ts = No(is, 0, Rt, 0, wt.width)
                          , ks = No(co, zt, nr, wt.height, 0);
                        mr.push([Ts, ks].join(","))
                    }
                    ),
                    this.lineElem_.setAttributeNS(null, "points", mr.join(" "));
                    const Tr = this.tooltipElem_
                      , $r = this.value.rawValue[this.cursor_.rawValue];
                    if ($r === void 0)
                        return void Tr.classList.remove(ru("t", "a"));
                    const vn = No(this.cursor_.rawValue, 0, Rt, 0, wt.width)
                      , zn = No($r, zt, nr, wt.height, 0);
                    Tr.style.left = `${vn}px`,
                    Tr.style.top = `${zn}px`,
                    Tr.textContent = `${this.formatter_($r)}`,
                    Tr.classList.contains(ru("t", "a")) || (Tr.classList.add(ru("t", "a"), ru("t", "in")),
                    Zr(Tr),
                    Tr.classList.remove(ru("t", "in")))
                }
                onValueUpdate_() {
                    this.update_()
                }
                onCursorChange_() {
                    this.update_()
                }
            }
            class Mo {
                constructor(wt, Rt) {
                    if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this),
                    this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this),
                    this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this),
                    this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this),
                    this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this),
                    this.props_ = Rt.props,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.cursor_ = or(-1),
                    this.view = new B0(wt,{
                        cursor: this.cursor_,
                        formatter: Rt.formatter,
                        lineCount: Rt.lineCount,
                        props: this.props_,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    rn(wt)) {
                        const zt = new ps(this.view.element);
                        zt.emitter.on("down", this.onGraphPointerDown_),
                        zt.emitter.on("move", this.onGraphPointerMove_),
                        zt.emitter.on("up", this.onGraphPointerUp_)
                    } else
                        this.view.element.addEventListener("mousemove", this.onGraphMouseMove_),
                        this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_)
                }
                onGraphMouseLeave_() {
                    this.cursor_.rawValue = -1
                }
                onGraphMouseMove_(wt) {
                    const Rt = this.view.element.getBoundingClientRect();
                    this.cursor_.rawValue = Math.floor(No(wt.offsetX, 0, Rt.width, 0, this.value.rawValue.length))
                }
                onGraphPointerDown_(wt) {
                    this.onGraphPointerMove_(wt)
                }
                onGraphPointerMove_(wt) {
                    wt.data.point ? this.cursor_.rawValue = Math.floor(No(wt.data.point.x, 0, wt.data.bounds.width, 0, this.value.rawValue.length)) : this.cursor_.rawValue = -1
                }
                onGraphPointerUp_() {
                    this.cursor_.rawValue = -1
                }
            }
            function Fs(Vt) {
                return "format"in Vt && !at(Vt.format) ? Vt.format : ts(2)
            }
            function Il(Vt) {
                return "view"in Vt && Vt.view === "graph"
            }
            const c_ = {
                id: "monitor-number",
                type: "monitor",
                accept: (Vt, wt) => {
                    if (typeof Vt != "number")
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        format: Rt.optional.function,
                        lineCount: Rt.optional.number,
                        max: Rt.optional.number,
                        min: Rt.optional.number,
                        view: Rt.optional.string
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    defaultBufferSize: Vt => Il(Vt) ? 64 : 1,
                    reader: Vt => H_
                },
                controller: Vt => Il(Vt.params) ? function(wt) {
                    var Rt, zt, nr;
                    return new Mo(wt.document,{
                        formatter: Fs(wt.params),
                        lineCount: (Rt = wt.params.lineCount) !== null && Rt !== void 0 ? Rt : Ns.defaultLineCount,
                        props: ir.fromObject({
                            maxValue: (zt = "max"in wt.params ? wt.params.max : null) !== null && zt !== void 0 ? zt : 100,
                            minValue: (nr = "min"in wt.params ? wt.params.min : null) !== null && nr !== void 0 ? nr : 0
                        }),
                        value: wt.value,
                        viewProps: wt.viewProps
                    })
                }(Vt) : function(wt) {
                    var Rt;
                    return wt.value.rawValue.length === 1 ? new dm(wt.document,{
                        formatter: Fs(wt.params),
                        value: wt.value,
                        viewProps: wt.viewProps
                    }) : new l_(wt.document,{
                        formatter: Fs(wt.params),
                        lineCount: (Rt = wt.params.lineCount) !== null && Rt !== void 0 ? Rt : Ns.defaultLineCount,
                        value: wt.value,
                        viewProps: wt.viewProps
                    })
                }(Vt)
            }
              , Ul = {
                id: "monitor-string",
                type: "monitor",
                accept: (Vt, wt) => {
                    if (typeof Vt != "string")
                        return null;
                    const Rt = hr
                      , zt = gr(wt, {
                        lineCount: Rt.optional.number,
                        multiline: Rt.optional.boolean
                    });
                    return zt ? {
                        initialValue: Vt,
                        params: zt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Qm
                },
                controller: Vt => {
                    var wt;
                    const Rt = Vt.value;
                    return Rt.rawValue.length > 1 || "multiline"in Vt.params && Vt.params.multiline ? new l_(Vt.document,{
                        formatter: El,
                        lineCount: (wt = Vt.params.lineCount) !== null && wt !== void 0 ? wt : Ns.defaultLineCount,
                        value: Rt,
                        viewProps: Vt.viewProps
                    }) : new dm(Vt.document,{
                        formatter: El,
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            };

export default uv;
