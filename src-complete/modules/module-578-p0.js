/*
 * Module 578 (Pattern 0)
 * Params: d, o
 * Size: 290817 chars
 */

// === MODULE CONTENT ===
function module578(d, o) {
(function(c) {
            class h {
                constructor(wt) {
                    this.controller_ = wt
                }
                get element() {
                    return this.controller_.view.element
                }
                get disabled() {
                    return this.controller_.viewProps.get("disabled")
                }
                set disabled(wt) {
                    this.controller_.viewProps.set("disabled", wt)
                }
                get hidden() {
                    return this.controller_.viewProps.get("hidden")
                }
                set hidden(wt) {
                    this.controller_.viewProps.set("hidden", wt)
                }
                dispose() {
                    this.controller_.viewProps.set("disposed", !0)
                }
            }
            class _ {
                constructor(wt) {
                    this.target = wt
                }
            }
            class b extends _ {
                constructor(wt, Rt, zt, nr) {
                    super(wt),
                    this.value = Rt,
                    this.presetKey = zt,
                    this.last = nr == null || nr
                }
            }
            class _e extends _ {
                constructor(wt, Rt, zt) {
                    super(wt),
                    this.value = Rt,
                    this.presetKey = zt
                }
            }
            class nt extends _ {
                constructor(wt, Rt) {
                    super(wt),
                    this.expanded = Rt
                }
            }
            class it extends _ {
                constructor(wt, Rt) {
                    super(wt),
                    this.index = Rt
                }
            }
            function at(Vt) {
                return Vt == null
            }
            function ut(Vt, wt) {
                if (Vt.length !== wt.length)
                    return !1;
                for (let Rt = 0; Rt < Vt.length; Rt++)
                    if (Vt[Rt] !== wt[Rt])
                        return !1;
                return !0
            }
            function pt(Vt, wt) {
                let Rt = Vt;
                do {
                    const zt = Object.getOwnPropertyDescriptor(Rt, wt);
                    if (zt && (zt.set !== void 0 || zt.writable === !0))
                        return !0;
                    Rt = Object.getPrototypeOf(Rt)
                } while (Rt !== null);
                return !1
            }
            const ht = {
                alreadydisposed: () => "View has been already disposed",
                invalidparams: Vt => `Invalid parameters for '${
Vt.name}'`,
                nomatchingcontroller: Vt => `No matching controller for '${
Vt.key}'`,
                nomatchingview: Vt => `No matching view for '${
JSON.stringify(Vt.params)}'`,
                notbindable: () => "Value is not bindable",
                propertynotfound: Vt => `Property '${
Vt.name}' not found`,
                shouldneverhappen: () => "This error should never happen"
            };
            class _t {
                static alreadyDisposed() {
                    return new _t({
                        type: "alreadydisposed"
                    })
                }
                static notBindable() {
                    return new _t({
                        type: "notbindable"
                    })
                }
                static propertyNotFound(wt) {
                    return new _t({
                        type: "propertynotfound",
                        context: {
                            name: wt
                        }
                    })
                }
                static shouldNeverHappen() {
                    return new _t({
                        type: "shouldneverhappen"
                    })
                }
                constructor(wt) {
                    var Rt;
                    this.message = (Rt = ht[wt.type](wt.context)) !== null && Rt !== void 0 ? Rt : "Unexpected error",
                    this.name = this.constructor.name,
                    this.stack = new Error(this.message).stack,
                    this.type = wt.type
                }
            }
            class vt {
                constructor(wt, Rt, zt) {
                    this.obj_ = wt,
                    this.key_ = Rt,
                    this.presetKey_ = zt ?? Rt
                }
                static isBindable(wt) {
                    return wt !== null && (typeof wt == "object" || typeof wt == "function")
                }
                get key() {
                    return this.key_
                }
                get presetKey() {
                    return this.presetKey_
                }
                read() {
                    return this.obj_[this.key_]
                }
                write(wt) {
                    this.obj_[this.key_] = wt
                }
                writeProperty(wt, Rt) {
                    const zt = this.read();
                    if (!vt.isBindable(zt))
                        throw _t.notBindable();
                    if (!(wt in zt))
                        throw _t.propertyNotFound(wt);
                    zt[wt] = Rt
                }
            }
            class bt extends h {
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                get title() {
                    var wt;
                    return (wt = this.controller_.valueController.props.get("title")) !== null && wt !== void 0 ? wt : ""
                }
                set title(wt) {
                    this.controller_.valueController.props.set("title", wt)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.controller_.valueController.emitter.on(wt, () => {
                        zt(new _(this))
                    }
                    ),
                    this
                }
            }
            class St {
                constructor() {
                    this.observers_ = {}
                }
                on(wt, Rt) {
                    let zt = this.observers_[wt];
                    return zt || (zt = this.observers_[wt] = []),
                    zt.push({
                        handler: Rt
                    }),
                    this
                }
                off(wt, Rt) {
                    const zt = this.observers_[wt];
                    return zt && (this.observers_[wt] = zt.filter(nr => nr.handler !== Rt)),
                    this
                }
                emit(wt, Rt) {
                    const zt = this.observers_[wt];
                    zt && zt.forEach(nr => {
                        nr.handler(Rt)
                    }
                    )
                }
            }
            const At = "tp";
            function Et(Vt) {
                return (wt, Rt) => [At, "-", Vt, "v", wt ? `_${
wt}` : "", Rt ? `-${
Rt}` : ""].join("")
            }
            function Pt(Vt) {
                return Vt.rawValue
            }
            function It(Vt, wt) {
                var Rt, zt;
                Vt.emitter.on("change", (Rt = Pt,
                zt = wt,
                nr => zt(Rt(nr)))),
                wt(Vt.rawValue)
            }
            function Dt(Vt, wt, Rt) {
                It(Vt.value(wt), Rt)
            }
            function Gt(Vt, wt) {
                return Rt => {
                    (function(zt, nr, mr) {
                        mr ? zt.classList.add(nr) : zt.classList.remove(nr)
                    }
                    )(Vt, wt, Rt)
                }
            }
            function Bt(Vt, wt) {
                It(Vt, Rt => {
                    wt.textContent = Rt ?? ""
                }
                )
            }
            const kt = Et("btn");
            class Ut {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(kt()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("button");
                    zt.classList.add(kt("b")),
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.buttonElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(kt("t")),
                    Bt(Rt.props.value("title"), nr),
                    this.buttonElement.appendChild(nr)
                }
            }
            class Ht {
                constructor(wt, Rt) {
                    this.emitter = new St,
                    this.onClick_ = this.onClick_.bind(this),
                    this.props = Rt.props,
                    this.viewProps = Rt.viewProps,
                    this.view = new Ut(wt,{
                        props: this.props,
                        viewProps: this.viewProps
                    }),
                    this.view.buttonElement.addEventListener("click", this.onClick_)
                }
                onClick_() {
                    this.emitter.emit("click", {
                        sender: this
                    })
                }
            }
            class Kt {
                constructor(wt, Rt) {
                    var zt;
                    this.constraint_ = Rt == null ? void 0 : Rt.constraint,
                    this.equals_ = (zt = Rt == null ? void 0 : Rt.equals) !== null && zt !== void 0 ? zt : (nr, mr) => nr === mr,
                    this.emitter = new St,
                    this.rawValue_ = wt
                }
                get constraint() {
                    return this.constraint_
                }
                get rawValue() {
                    return this.rawValue_
                }
                set rawValue(wt) {
                    this.setRawValue(wt, {
                        forceEmit: !1,
                        last: !0
                    })
                }
                setRawValue(wt, Rt) {
                    const zt = Rt ?? {
                        forceEmit: !1,
                        last: !0
                    }
                      , nr = this.constraint_ ? this.constraint_.constrain(wt) : wt
                      , mr = this.rawValue_;
                    (!this.equals_(mr, nr) || zt.forceEmit) && (this.emitter.emit("beforechange", {
                        sender: this
                    }),
                    this.rawValue_ = nr,
                    this.emitter.emit("change", {
                        options: zt,
                        previousRawValue: mr,
                        rawValue: nr,
                        sender: this
                    }))
                }
            }
            class Jt {
                constructor(wt) {
                    this.emitter = new St,
                    this.value_ = wt
                }
                get rawValue() {
                    return this.value_
                }
                set rawValue(wt) {
                    this.setRawValue(wt, {
                        forceEmit: !1,
                        last: !0
                    })
                }
                setRawValue(wt, Rt) {
                    const zt = Rt ?? {
                        forceEmit: !1,
                        last: !0
                    }
                      , nr = this.value_;
                    (nr !== wt || zt.forceEmit) && (this.emitter.emit("beforechange", {
                        sender: this
                    }),
                    this.value_ = wt,
                    this.emitter.emit("change", {
                        options: zt,
                        previousRawValue: nr,
                        rawValue: this.value_,
                        sender: this
                    }))
                }
            }
            function or(Vt, wt) {
                const Rt = wt == null ? void 0 : wt.constraint
                  , zt = wt == null ? void 0 : wt.equals;
                return Rt || zt ? new Kt(Vt,wt) : new Jt(Vt)
            }
            class ir {
                constructor(wt) {
                    this.emitter = new St,
                    this.valMap_ = wt;
                    for (const Rt in this.valMap_)
                        this.valMap_[Rt].emitter.on("change", () => {
                            this.emitter.emit("change", {
                                key: Rt,
                                sender: this
                            })
                        }
                        )
                }
                static createCore(wt) {
                    return Object.keys(wt).reduce( (Rt, zt) => Object.assign(Rt, {
                        [zt]: or(wt[zt])
                    }), {})
                }
                static fromObject(wt) {
                    const Rt = this.createCore(wt);
                    return new ir(Rt)
                }
                get(wt) {
                    return this.valMap_[wt].rawValue
                }
                set(wt, Rt) {
                    this.valMap_[wt].rawValue = Rt
                }
                value(wt) {
                    return this.valMap_[wt]
                }
            }
            function lr(Vt) {
                return wt => Rt => {
                    if (!wt && Rt === void 0)
                        return {
                            succeeded: !1,
                            value: void 0
                        };
                    if (wt && Rt === void 0)
                        return {
                            succeeded: !0,
                            value: void 0
                        };
                    const zt = Vt(Rt);
                    return zt !== void 0 ? {
                        succeeded: !0,
                        value: zt
                    } : {
                        succeeded: !1,
                        value: void 0
                    }
                }
            }
            function ar(Vt) {
                return {
                    custom: wt => lr(wt)(Vt),
                    boolean: lr(wt => typeof wt == "boolean" ? wt : void 0)(Vt),
                    number: lr(wt => typeof wt == "number" ? wt : void 0)(Vt),
                    string: lr(wt => typeof wt == "string" ? wt : void 0)(Vt),
                    function: lr(wt => typeof wt == "function" ? wt : void 0)(Vt),
                    constant: wt => lr(Rt => Rt === wt ? wt : void 0)(Vt),
                    raw: lr(wt => wt)(Vt),
                    object: wt => lr(Rt => {
                        if ((zt = Rt) !== null && typeof zt == "object")
                            return function(nr, mr) {
                                return Object.keys(mr).reduce( ($r, vn) => {
                                    if ($r === void 0)
                                        return;
                                    const zn = (0,
                                    mr[vn])(nr[vn]);
                                    return zn.succeeded ? Object.assign(Object.assign({}, $r), {
                                        [vn]: zn.value
                                    }) : void 0
                                }
                                , {})
                            }(Rt, wt);
                        var zt
                    }
                    )(Vt),
                    array: wt => lr(Rt => {
                        if (Array.isArray(Rt))
                            return zt = wt,
                            Rt.reduce( (nr, mr) => {
                                if (nr === void 0)
                                    return;
                                const Tr = zt(mr);
                                return Tr.succeeded && Tr.value !== void 0 ? [...nr, Tr.value] : void 0
                            }
                            , []);
                        var zt
                    }
                    )(Vt)
                }
            }
            const hr = {
                optional: ar(!0),
                required: ar(!1)
            };
            function gr(Vt, wt) {
                const Rt = hr.required.object(wt)(Vt);
                return Rt.succeeded ? Rt.value : void 0
            }
            function dr(Vt) {
                console.warn([`Missing '${
Vt.key}' of ${
Vt.target} in ${
Vt.place}.`, "Please rebuild plugins with the latest core package."].join(" "))
            }
            class cr {
                constructor(wt) {
                    this.value_ = wt
                }
                static create(wt) {
                    return [new cr(wt), (Rt, zt) => {
                        wt.setRawValue(Rt, zt)
                    }
                    ]
                }
                get emitter() {
                    return this.value_.emitter
                }
                get rawValue() {
                    return this.value_.rawValue
                }
            }
            const Ar = Et("");
            function wr(Vt, wt) {
                return Gt(Vt, Ar(void 0, wt))
            }
            class Rr extends ir {
                constructor(wt) {
                    var Rt;
                    super(wt),
                    this.onDisabledChange_ = this.onDisabledChange_.bind(this),
                    this.onParentChange_ = this.onParentChange_.bind(this),
                    this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this),
                    [this.globalDisabled_,this.setGlobalDisabled_] = cr.create(or(this.getGlobalDisabled_())),
                    this.value("disabled").emitter.on("change", this.onDisabledChange_),
                    this.value("parent").emitter.on("change", this.onParentChange_),
                    (Rt = this.get("parent")) === null || Rt === void 0 || Rt.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_)
                }
                static create(wt) {
                    var Rt, zt, nr;
                    const mr = wt ?? {};
                    return new Rr(ir.createCore({
                        disabled: (Rt = mr.disabled) !== null && Rt !== void 0 && Rt,
                        disposed: !1,
                        hidden: (zt = mr.hidden) !== null && zt !== void 0 && zt,
                        parent: (nr = mr.parent) !== null && nr !== void 0 ? nr : null
                    }))
                }
                get globalDisabled() {
                    return this.globalDisabled_
                }
                bindClassModifiers(wt) {
                    It(this.globalDisabled_, wr(wt, "disabled")),
                    Dt(this, "hidden", wr(wt, "hidden"))
                }
                bindDisabled(wt) {
                    It(this.globalDisabled_, Rt => {
                        wt.disabled = Rt
                    }
                    )
                }
                bindTabIndex(wt) {
                    It(this.globalDisabled_, Rt => {
                        wt.tabIndex = Rt ? -1 : 0
                    }
                    )
                }
                handleDispose(wt) {
                    this.value("disposed").emitter.on("change", Rt => {
                        Rt && wt()
                    }
                    )
                }
                getGlobalDisabled_() {
                    const wt = this.get("parent");
                    return !!wt && wt.globalDisabled.rawValue || this.get("disabled")
                }
                updateGlobalDisabled_() {
                    this.setGlobalDisabled_(this.getGlobalDisabled_())
                }
                onDisabledChange_() {
                    this.updateGlobalDisabled_()
                }
                onParentGlobalDisabledChange_() {
                    this.updateGlobalDisabled_()
                }
                onParentChange_(wt) {
                    var Rt;
                    const zt = wt.previousRawValue;
                    zt == null || zt.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_),
                    (Rt = this.get("parent")) === null || Rt === void 0 || Rt.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_),
                    this.updateGlobalDisabled_()
                }
            }
            const Cr = Et("")
              , tr = {
                veryfirst: "vfst",
                first: "fst",
                last: "lst",
                verylast: "vlst"
            };
            class fr {
                constructor(wt) {
                    this.parent_ = null,
                    this.blade = wt.blade,
                    this.view = wt.view,
                    this.viewProps = wt.viewProps;
                    const Rt = this.view.element;
                    this.blade.value("positions").emitter.on("change", () => {
                        ["veryfirst", "first", "last", "verylast"].forEach(zt => {
                            Rt.classList.remove(Cr(void 0, tr[zt]))
                        }
                        ),
                        this.blade.get("positions").forEach(zt => {
                            Rt.classList.add(Cr(void 0, tr[zt]))
                        }
                        )
                    }
                    ),
                    this.viewProps.handleDispose( () => {
                        (function(zt) {
                            zt && zt.parentElement && zt.parentElement.removeChild(zt)
                        }
                        )(Rt)
                    }
                    )
                }
                get parent() {
                    return this.parent_
                }
                set parent(wt) {
                    this.parent_ = wt,
                    "parent"in this.viewProps.valMap_ ? this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null) : dr({
                        key: "parent",
                        target: Rr.name,
                        place: "BladeController.parent"
                    })
                }
            }
            const vr = "http://www.w3.org/2000/svg";
            function Zr(Vt) {
                Vt.offsetHeight
            }
            function rn(Vt) {
                return Vt.ontouchstart !== void 0
            }
            function hn() {
                return globalThis.document
            }
            const Nn = {
                check: '<path d="M2 8l4 4l8 -8"/>',
                dropdown: '<path d="M5 7h6l-3 3 z"/>',
                p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
            };
            function Wn(Vt, wt) {
                const Rt = Vt.createElementNS(vr, "svg");
                return Rt.innerHTML = Nn[wt],
                Rt
            }
            function qn(Vt, wt, Rt) {
                Vt.insertBefore(wt, Vt.children[Rt])
            }
            function mo(Vt) {
                Vt.parentElement && Vt.parentElement.removeChild(Vt)
            }
            function Ur(Vt) {
                for (; Vt.children.length > 0; )
                    Vt.removeChild(Vt.children[0])
            }
            function nn(Vt) {
                return Vt.relatedTarget ? Vt.relatedTarget : "explicitOriginalTarget"in Vt ? Vt.explicitOriginalTarget : null
            }
            const xn = Et("lbl");
            class ur {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(xn()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(xn("l")),
                    Dt(Rt.props, "label", mr => {
                        at(mr) ? this.element.classList.add(xn(void 0, "nol")) : (this.element.classList.remove(xn(void 0, "nol")),
                        function(Tr) {
                            for (; Tr.childNodes.length > 0; )
                                Tr.removeChild(Tr.childNodes[0])
                        }(zt),
                        zt.appendChild(function(Tr, $r) {
                            const vn = Tr.createDocumentFragment();
                            return $r.split(`
`).map(zn => Tr.createTextNode(zn)).forEach( (zn, co) => {
                                co > 0 && vn.appendChild(Tr.createElement("br")),
                                vn.appendChild(zn)
                            }
                            ),
                            vn
                        }(wt, mr)))
                    }
                    ),
                    this.element.appendChild(zt),
                    this.labelElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(xn("v")),
                    this.element.appendChild(nr),
                    this.valueElement = nr
                }
            }
            class pr extends fr {
                constructor(wt, Rt) {
                    const zt = Rt.valueController.viewProps;
                    super(Object.assign(Object.assign({}, Rt), {
                        view: new ur(wt,{
                            props: Rt.props,
                            viewProps: zt
                        }),
                        viewProps: zt
                    })),
                    this.props = Rt.props,
                    this.valueController = Rt.valueController,
                    this.view.valueElement.appendChild(this.valueController.view.element)
                }
            }
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
            class jr extends fr {
                constructor(wt) {
                    super(wt),
                    this.value = wt.value
                }
            }
            function Qr() {
                return new ir({
                    positions: or([], {
                        equals: ut
                    })
                })
            }
            class Or extends ir {
                constructor(wt) {
                    super(wt)
                }
                static create(wt) {
                    const Rt = {
                        completed: !0,
                        expanded: wt,
                        expandedHeight: null,
                        shouldFixHeight: !1,
                        temporaryExpanded: null
                    }
                      , zt = ir.createCore(Rt);
                    return new Or(zt)
                }
                get styleExpanded() {
                    var wt;
                    return (wt = this.get("temporaryExpanded")) !== null && wt !== void 0 ? wt : this.get("expanded")
                }
                get styleHeight() {
                    if (!this.styleExpanded)
                        return "0";
                    const wt = this.get("expandedHeight");
                    return this.get("shouldFixHeight") && !at(wt) ? `${
wt}
px` : "auto"
                }
                bindExpandedClass(wt, Rt) {
                    const zt = () => {
                        this.styleExpanded ? wt.classList.add(Rt) : wt.classList.remove(Rt)
                    }
                    ;
                    Dt(this, "expanded", zt),
                    Dt(this, "temporaryExpanded", zt)
                }
                cleanUpTransition() {
                    this.set("shouldFixHeight", !1),
                    this.set("expandedHeight", null),
                    this.set("completed", !0)
                }
            }
            function qr(Vt, wt) {
                wt.style.height = Vt.styleHeight
            }
            function gn(Vt, wt) {
                Vt.value("expanded").emitter.on("beforechange", () => {
                    if (Vt.set("completed", !1),
                    at(Vt.get("expandedHeight"))) {
                        const Rt = function(zt, nr) {
                            let mr = 0;
                            return function(Tr, $r) {
                                const vn = Tr.style.transition;
                                Tr.style.transition = "none",
                                $r(),
                                Tr.style.transition = vn
                            }(nr, () => {
                                zt.set("expandedHeight", null),
                                zt.set("temporaryExpanded", !0),
                                Zr(nr),
                                mr = nr.clientHeight,
                                zt.set("temporaryExpanded", null),
                                Zr(nr)
                            }
                            ),
                            mr
                        }(Vt, wt);
                        Rt > 0 && Vt.set("expandedHeight", Rt)
                    }
                    Vt.set("shouldFixHeight", !0),
                    Zr(wt)
                }
                ),
                Vt.emitter.on("change", () => {
                    qr(Vt, wt)
                }
                ),
                qr(Vt, wt),
                wt.addEventListener("transitionend", Rt => {
                    Rt.propertyName === "height" && Vt.cleanUpTransition()
                }
                )
            }
            class Mn extends h {
                constructor(wt, Rt) {
                    super(wt),
                    this.rackApi_ = Rt
                }
            }
            class Tn {
                constructor(wt) {
                    this.emitter = new St,
                    this.items_ = [],
                    this.cache_ = new Set,
                    this.onSubListAdd_ = this.onSubListAdd_.bind(this),
                    this.onSubListRemove_ = this.onSubListRemove_.bind(this),
                    this.extract_ = wt
                }
                get items() {
                    return this.items_
                }
                allItems() {
                    return Array.from(this.cache_)
                }
                find(wt) {
                    for (const Rt of this.allItems())
                        if (wt(Rt))
                            return Rt;
                    return null
                }
                includes(wt) {
                    return this.cache_.has(wt)
                }
                add(wt, Rt) {
                    if (this.includes(wt))
                        throw _t.shouldNeverHappen();
                    const zt = Rt !== void 0 ? Rt : this.items_.length;
                    this.items_.splice(zt, 0, wt),
                    this.cache_.add(wt);
                    const nr = this.extract_(wt);
                    nr && (nr.emitter.on("add", this.onSubListAdd_),
                    nr.emitter.on("remove", this.onSubListRemove_),
                    nr.allItems().forEach(mr => {
                        this.cache_.add(mr)
                    }
                    )),
                    this.emitter.emit("add", {
                        index: zt,
                        item: wt,
                        root: this,
                        target: this
                    })
                }
                remove(wt) {
                    const Rt = this.items_.indexOf(wt);
                    if (Rt < 0)
                        return;
                    this.items_.splice(Rt, 1),
                    this.cache_.delete(wt);
                    const zt = this.extract_(wt);
                    zt && (zt.emitter.off("add", this.onSubListAdd_),
                    zt.emitter.off("remove", this.onSubListRemove_)),
                    this.emitter.emit("remove", {
                        index: Rt,
                        item: wt,
                        root: this,
                        target: this
                    })
                }
                onSubListAdd_(wt) {
                    this.cache_.add(wt.item),
                    this.emitter.emit("add", {
                        index: wt.index,
                        item: wt.item,
                        root: this,
                        target: wt.target
                    })
                }
                onSubListRemove_(wt) {
                    this.cache_.delete(wt.item),
                    this.emitter.emit("remove", {
                        index: wt.index,
                        item: wt.item,
                        root: this,
                        target: wt.target
                    })
                }
            }
            class wn extends h {
                constructor(wt) {
                    super(wt),
                    this.onBindingChange_ = this.onBindingChange_.bind(this),
                    this.emitter_ = new St,
                    this.controller_.binding.emitter.on("change", this.onBindingChange_)
                }
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
                refresh() {
                    this.controller_.binding.read()
                }
                onBindingChange_(wt) {
                    const Rt = wt.sender.target.read();
                    this.emitter_.emit("change", {
                        event: new b(this,Rt,this.controller_.binding.target.presetKey,wt.options.last)
                    })
                }
            }
            class Cn extends pr {
                constructor(wt, Rt) {
                    super(wt, Rt),
                    this.binding = Rt.binding
                }
            }
            class fn extends h {
                constructor(wt) {
                    super(wt),
                    this.onBindingUpdate_ = this.onBindingUpdate_.bind(this),
                    this.emitter_ = new St,
                    this.controller_.binding.emitter.on("update", this.onBindingUpdate_)
                }
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
                refresh() {
                    this.controller_.binding.read()
                }
                onBindingUpdate_(wt) {
                    const Rt = wt.sender.target.read();
                    this.emitter_.emit("update", {
                        event: new _e(this,Rt,this.controller_.binding.target.presetKey)
                    })
                }
            }
            class bn extends pr {
                constructor(wt, Rt) {
                    super(wt, Rt),
                    this.binding = Rt.binding,
                    this.viewProps.bindDisabled(this.binding.ticker),
                    this.viewProps.handleDispose( () => {
                        this.binding.dispose()
                    }
                    )
                }
            }
            function Xn(Vt) {
                return Vt instanceof Rn ? Vt.apiSet_ : Vt instanceof Mn ? Vt.rackApi_.apiSet_ : null
            }
            function En(Vt, wt) {
                const Rt = Vt.find(zt => zt.controller_ === wt);
                if (!Rt)
                    throw _t.shouldNeverHappen();
                return Rt
            }
            function Qn(Vt, wt, Rt) {
                if (!vt.isBindable(Vt))
                    throw _t.notBindable();
                return new vt(Vt,wt,Rt)
            }
            class Rn extends h {
                constructor(wt, Rt) {
                    super(wt),
                    this.onRackAdd_ = this.onRackAdd_.bind(this),
                    this.onRackRemove_ = this.onRackRemove_.bind(this),
                    this.onRackInputChange_ = this.onRackInputChange_.bind(this),
                    this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this),
                    this.emitter_ = new St,
                    this.apiSet_ = new Tn(Xn),
                    this.pool_ = Rt;
                    const zt = this.controller_.rack;
                    zt.emitter.on("add", this.onRackAdd_),
                    zt.emitter.on("remove", this.onRackRemove_),
                    zt.emitter.on("inputchange", this.onRackInputChange_),
                    zt.emitter.on("monitorupdate", this.onRackMonitorUpdate_),
                    zt.children.forEach(nr => {
                        this.setUpApi_(nr)
                    }
                    )
                }
                get children() {
                    return this.controller_.rack.children.map(wt => En(this.apiSet_, wt))
                }
                addInput(wt, Rt, zt) {
                    const nr = zt ?? {}
                      , mr = this.controller_.view.element.ownerDocument
                      , Tr = this.pool_.createInput(mr, Qn(wt, Rt, nr.presetKey), nr)
                      , $r = new wn(Tr);
                    return this.add($r, nr.index)
                }
                addMonitor(wt, Rt, zt) {
                    const nr = zt ?? {}
                      , mr = this.controller_.view.element.ownerDocument
                      , Tr = this.pool_.createMonitor(mr, Qn(wt, Rt), nr)
                      , $r = new fn(Tr);
                    return this.add($r, nr.index)
                }
                addFolder(wt) {
                    return function(Rt, zt) {
                        return Rt.addBlade(Object.assign(Object.assign({}, zt), {
                            view: "folder"
                        }))
                    }(this, wt)
                }
                addButton(wt) {
                    return function(Rt, zt) {
                        return Rt.addBlade(Object.assign(Object.assign({}, zt), {
                            view: "button"
                        }))
                    }(this, wt)
                }
                addSeparator(wt) {
                    return function(Rt, zt) {
                        const nr = zt ?? {};
                        return Rt.addBlade(Object.assign(Object.assign({}, nr), {
                            view: "separator"
                        }))
                    }(this, wt)
                }
                addTab(wt) {
                    return function(Rt, zt) {
                        return Rt.addBlade(Object.assign(Object.assign({}, zt), {
                            view: "tab"
                        }))
                    }(this, wt)
                }
                add(wt, Rt) {
                    this.controller_.rack.add(wt.controller_, Rt);
                    const zt = this.apiSet_.find(nr => nr.controller_ === wt.controller_);
                    return zt && this.apiSet_.remove(zt),
                    this.apiSet_.add(wt),
                    wt
                }
                remove(wt) {
                    this.controller_.rack.remove(wt.controller_)
                }
                addBlade(wt) {
                    const Rt = this.controller_.view.element.ownerDocument
                      , zt = this.pool_.createBlade(Rt, wt)
                      , nr = this.pool_.createBladeApi(zt);
                    return this.add(nr, wt.index)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
                setUpApi_(wt) {
                    this.apiSet_.find(Rt => Rt.controller_ === wt) || this.apiSet_.add(this.pool_.createBladeApi(wt))
                }
                onRackAdd_(wt) {
                    this.setUpApi_(wt.bladeController)
                }
                onRackRemove_(wt) {
                    if (wt.isRoot) {
                        const Rt = En(this.apiSet_, wt.bladeController);
                        this.apiSet_.remove(Rt)
                    }
                }
                onRackInputChange_(wt) {
                    const Rt = wt.bladeController;
                    if (Rt instanceof Cn) {
                        const zt = En(this.apiSet_, Rt)
                          , nr = Rt.binding;
                        this.emitter_.emit("change", {
                            event: new b(zt,nr.target.read(),nr.target.presetKey,wt.options.last)
                        })
                    } else if (Rt instanceof jr) {
                        const zt = En(this.apiSet_, Rt);
                        this.emitter_.emit("change", {
                            event: new b(zt,Rt.value.rawValue,void 0,wt.options.last)
                        })
                    }
                }
                onRackMonitorUpdate_(wt) {
                    if (!(wt.bladeController instanceof bn))
                        throw _t.shouldNeverHappen();
                    const Rt = En(this.apiSet_, wt.bladeController)
                      , zt = wt.bladeController.binding;
                    this.emitter_.emit("update", {
                        event: new _e(Rt,zt.target.read(),zt.target.presetKey)
                    })
                }
            }
            class Yn extends Mn {
                constructor(wt, Rt) {
                    super(wt, new Rn(wt.rackController,Rt)),
                    this.emitter_ = new St,
                    this.controller_.foldable.value("expanded").emitter.on("change", zt => {
                        this.emitter_.emit("fold", {
                            event: new nt(this,zt.sender.rawValue)
                        })
                    }
                    ),
                    this.rackApi_.on("change", zt => {
                        this.emitter_.emit("change", {
                            event: zt
                        })
                    }
                    ),
                    this.rackApi_.on("update", zt => {
                        this.emitter_.emit("update", {
                            event: zt
                        })
                    }
                    )
                }
                get expanded() {
                    return this.controller_.foldable.get("expanded")
                }
                set expanded(wt) {
                    this.controller_.foldable.set("expanded", wt)
                }
                get title() {
                    return this.controller_.props.get("title")
                }
                set title(wt) {
                    this.controller_.props.set("title", wt)
                }
                get children() {
                    return this.rackApi_.children
                }
                addInput(wt, Rt, zt) {
                    return this.rackApi_.addInput(wt, Rt, zt)
                }
                addMonitor(wt, Rt, zt) {
                    return this.rackApi_.addMonitor(wt, Rt, zt)
                }
                addFolder(wt) {
                    return this.rackApi_.addFolder(wt)
                }
                addButton(wt) {
                    return this.rackApi_.addButton(wt)
                }
                addSeparator(wt) {
                    return this.rackApi_.addSeparator(wt)
                }
                addTab(wt) {
                    return this.rackApi_.addTab(wt)
                }
                add(wt, Rt) {
                    return this.rackApi_.add(wt, Rt)
                }
                remove(wt) {
                    this.rackApi_.remove(wt)
                }
                addBlade(wt) {
                    return this.rackApi_.addBlade(wt)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
            }
            class Bo extends fr {
                constructor(wt) {
                    super({
                        blade: wt.blade,
                        view: wt.view,
                        viewProps: wt.rackController.viewProps
                    }),
                    this.rackController = wt.rackController
                }
            }
            class vo {
                constructor(wt, Rt) {
                    const zt = Et(Rt.viewName);
                    this.element = wt.createElement("div"),
                    this.element.classList.add(zt()),
                    Rt.viewProps.bindClassModifiers(this.element)
                }
            }
            function Hn(Vt) {
                return Vt instanceof zo ? Vt.rack : Vt instanceof Bo ? Vt.rackController.rack : null
            }
            function $n(Vt) {
                const wt = Hn(Vt);
                return wt ? wt.bcSet_ : null
            }
            class ao {
                constructor(wt) {
                    var Rt, zt;
                    this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this),
                    this.onSetAdd_ = this.onSetAdd_.bind(this),
                    this.onSetRemove_ = this.onSetRemove_.bind(this),
                    this.onChildDispose_ = this.onChildDispose_.bind(this),
                    this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this),
                    this.onChildInputChange_ = this.onChildInputChange_.bind(this),
                    this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this),
                    this.onChildValueChange_ = this.onChildValueChange_.bind(this),
                    this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this),
                    this.onDescendantLayout_ = this.onDescendantLayout_.bind(this),
                    this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this),
                    this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this),
                    this.emitter = new St,
                    this.blade_ = (Rt = wt.blade) !== null && Rt !== void 0 ? Rt : null,
                    (zt = this.blade_) === null || zt === void 0 || zt.value("positions").emitter.on("change", this.onBladePositionsChange_),
                    this.viewProps = wt.viewProps,
                    this.bcSet_ = new Tn($n),
                    this.bcSet_.emitter.on("add", this.onSetAdd_),
                    this.bcSet_.emitter.on("remove", this.onSetRemove_)
                }
                get children() {
                    return this.bcSet_.items
                }
                add(wt, Rt) {
                    var zt;
                    (zt = wt.parent) === null || zt === void 0 || zt.remove(wt),
                    pt(wt, "parent") ? wt.parent = this : (wt.parent_ = this,
                    dr({
                        key: "parent",
                        target: "BladeController",
                        place: "BladeRack.add"
                    })),
                    this.bcSet_.add(wt, Rt)
                }
                remove(wt) {
                    pt(wt, "parent") ? wt.parent = null : (wt.parent_ = null,
                    dr({
                        key: "parent",
                        target: "BladeController",
                        place: "BladeRack.remove"
                    })),
                    this.bcSet_.remove(wt)
                }
                find(wt) {
                    return this.bcSet_.allItems().filter(Rt => Rt instanceof wt)
                }
                onSetAdd_(wt) {
                    this.updatePositions_();
                    const Rt = wt.target === wt.root;
                    if (this.emitter.emit("add", {
                        bladeController: wt.item,
                        index: wt.index,
                        isRoot: Rt,
                        sender: this
                    }),
                    !Rt)
                        return;
                    const zt = wt.item;
                    if (zt.viewProps.emitter.on("change", this.onChildViewPropsChange_),
                    zt.blade.value("positions").emitter.on("change", this.onChildPositionsChange_),
                    zt.viewProps.handleDispose(this.onChildDispose_),
                    zt instanceof Cn)
                        zt.binding.emitter.on("change", this.onChildInputChange_);
                    else if (zt instanceof bn)
                        zt.binding.emitter.on("update", this.onChildMonitorUpdate_);
                    else if (zt instanceof jr)
                        zt.value.emitter.on("change", this.onChildValueChange_);
                    else {
                        const nr = Hn(zt);
                        if (nr) {
                            const mr = nr.emitter;
                            mr.on("layout", this.onDescendantLayout_),
                            mr.on("inputchange", this.onDescendantInputChange_),
                            mr.on("monitorupdate", this.onDescendantMonitorUpdate_)
                        }
                    }
                }
                onSetRemove_(wt) {
                    this.updatePositions_();
                    const Rt = wt.target === wt.root;
                    if (this.emitter.emit("remove", {
                        bladeController: wt.item,
                        isRoot: Rt,
                        sender: this
                    }),
                    !Rt)
                        return;
                    const zt = wt.item;
                    if (zt instanceof Cn)
                        zt.binding.emitter.off("change", this.onChildInputChange_);
                    else if (zt instanceof bn)
                        zt.binding.emitter.off("update", this.onChildMonitorUpdate_);
                    else if (zt instanceof jr)
                        zt.value.emitter.off("change", this.onChildValueChange_);
                    else {
                        const nr = Hn(zt);
                        if (nr) {
                            const mr = nr.emitter;
                            mr.off("layout", this.onDescendantLayout_),
                            mr.off("inputchange", this.onDescendantInputChange_),
                            mr.off("monitorupdate", this.onDescendantMonitorUpdate_)
                        }
                    }
                }
                updatePositions_() {
                    const wt = this.bcSet_.items.filter(nr => !nr.viewProps.get("hidden"))
                      , Rt = wt[0]
                      , zt = wt[wt.length - 1];
                    this.bcSet_.items.forEach(nr => {
                        const mr = [];
                        nr === Rt && (mr.push("first"),
                        this.blade_ && !this.blade_.get("positions").includes("veryfirst") || mr.push("veryfirst")),
                        nr === zt && (mr.push("last"),
                        this.blade_ && !this.blade_.get("positions").includes("verylast") || mr.push("verylast")),
                        nr.blade.set("positions", mr)
                    }
                    )
                }
                onChildPositionsChange_() {
                    this.updatePositions_(),
                    this.emitter.emit("layout", {
                        sender: this
                    })
                }
                onChildViewPropsChange_(wt) {
                    this.updatePositions_(),
                    this.emitter.emit("layout", {
                        sender: this
                    })
                }
                onChildDispose_() {
                    this.bcSet_.items.filter(wt => wt.viewProps.get("disposed")).forEach(wt => {
                        this.bcSet_.remove(wt)
                    }
                    )
                }
                onChildInputChange_(wt) {
                    const Rt = function(zt, nr) {
                        for (let mr = 0; mr < zt.length; mr++) {
                            const Tr = zt[mr];
                            if (Tr instanceof Cn && Tr.binding === nr)
                                return Tr
                        }
                        return null
                    }(this.find(Cn), wt.sender);
                    if (!Rt)
                        throw _t.alreadyDisposed();
                    this.emitter.emit("inputchange", {
                        bladeController: Rt,
                        options: wt.options,
                        sender: this
                    })
                }
                onChildMonitorUpdate_(wt) {
                    const Rt = function(zt, nr) {
                        for (let mr = 0; mr < zt.length; mr++) {
                            const Tr = zt[mr];
                            if (Tr instanceof bn && Tr.binding === nr)
                                return Tr
                        }
                        return null
                    }(this.find(bn), wt.sender);
                    if (!Rt)
                        throw _t.alreadyDisposed();
                    this.emitter.emit("monitorupdate", {
                        bladeController: Rt,
                        sender: this
                    })
                }
                onChildValueChange_(wt) {
                    const Rt = function(zt, nr) {
                        for (let mr = 0; mr < zt.length; mr++) {
                            const Tr = zt[mr];
                            if (Tr instanceof jr && Tr.value === nr)
                                return Tr
                        }
                        return null
                    }(this.find(jr), wt.sender);
                    if (!Rt)
                        throw _t.alreadyDisposed();
                    this.emitter.emit("inputchange", {
                        bladeController: Rt,
                        options: wt.options,
                        sender: this
                    })
                }
                onDescendantLayout_(wt) {
                    this.updatePositions_(),
                    this.emitter.emit("layout", {
                        sender: this
                    })
                }
                onDescendantInputChange_(wt) {
                    this.emitter.emit("inputchange", {
                        bladeController: wt.bladeController,
                        options: wt.options,
                        sender: this
                    })
                }
                onDescendantMonitorUpdate_(wt) {
                    this.emitter.emit("monitorupdate", {
                        bladeController: wt.bladeController,
                        sender: this
                    })
                }
                onBladePositionsChange_() {
                    this.updatePositions_()
                }
            }
            class zo extends fr {
                constructor(wt, Rt) {
                    super(Object.assign(Object.assign({}, Rt), {
                        view: new vo(wt,{
                            viewName: "brk",
                            viewProps: Rt.viewProps
                        })
                    })),
                    this.onRackAdd_ = this.onRackAdd_.bind(this),
                    this.onRackRemove_ = this.onRackRemove_.bind(this);
                    const zt = new ao({
                        blade: Rt.root ? void 0 : Rt.blade,
                        viewProps: Rt.viewProps
                    });
                    zt.emitter.on("add", this.onRackAdd_),
                    zt.emitter.on("remove", this.onRackRemove_),
                    this.rack = zt,
                    this.viewProps.handleDispose( () => {
                        for (let nr = this.rack.children.length - 1; nr >= 0; nr--)
                            this.rack.children[nr].viewProps.set("disposed", !0)
                    }
                    )
                }
                onRackAdd_(wt) {
                    wt.isRoot && qn(this.view.element, wt.bladeController.view.element, wt.index)
                }
                onRackRemove_(wt) {
                    wt.isRoot && mo(wt.bladeController.view.element)
                }
            }
            const Zo = Et("cnt");
            class $o {
                constructor(wt, Rt) {
                    var zt;
                    this.className_ = Et((zt = Rt.viewName) !== null && zt !== void 0 ? zt : "fld"),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(this.className_(), Zo()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    this.foldable_ = Rt.foldable,
                    this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")),
                    Dt(this.foldable_, "completed", Gt(this.element, this.className_(void 0, "cpl")));
                    const nr = wt.createElement("button");
                    nr.classList.add(this.className_("b")),
                    Dt(Rt.props, "title", zn => {
                        at(zn) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"))
                    }
                    ),
                    Rt.viewProps.bindDisabled(nr),
                    this.element.appendChild(nr),
                    this.buttonElement = nr;
                    const mr = wt.createElement("div");
                    mr.classList.add(this.className_("i")),
                    this.element.appendChild(mr);
                    const Tr = wt.createElement("div");
                    Tr.classList.add(this.className_("t")),
                    Bt(Rt.props.value("title"), Tr),
                    this.buttonElement.appendChild(Tr),
                    this.titleElement = Tr;
                    const $r = wt.createElement("div");
                    $r.classList.add(this.className_("m")),
                    this.buttonElement.appendChild($r);
                    const vn = Rt.containerElement;
                    vn.classList.add(this.className_("c")),
                    this.element.appendChild(vn),
                    this.containerElement = vn
                }
            }
            class Yo extends Bo {
                constructor(wt, Rt) {
                    var zt;
                    const nr = Or.create((zt = Rt.expanded) === null || zt === void 0 || zt)
                      , mr = new zo(wt,{
                        blade: Rt.blade,
                        root: Rt.root,
                        viewProps: Rt.viewProps
                    });
                    super(Object.assign(Object.assign({}, Rt), {
                        rackController: mr,
                        view: new $o(wt,{
                            containerElement: mr.view.element,
                            foldable: nr,
                            props: Rt.props,
                            viewName: Rt.root ? "rot" : void 0,
                            viewProps: Rt.viewProps
                        })
                    })),
                    this.onTitleClick_ = this.onTitleClick_.bind(this),
                    this.props = Rt.props,
                    this.foldable = nr,
                    gn(this.foldable, this.view.containerElement),
                    this.rackController.rack.emitter.on("add", () => {
                        this.foldable.cleanUpTransition()
                    }
                    ),
                    this.rackController.rack.emitter.on("remove", () => {
                        this.foldable.cleanUpTransition()
                    }
                    ),
                    this.view.buttonElement.addEventListener("click", this.onTitleClick_)
                }
                get document() {
                    return this.view.element.ownerDocument
                }
                onTitleClick_() {
                    this.foldable.set("expanded", !this.foldable.get("expanded"))
                }
            }
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
            class Os extends jr {
                constructor(wt, Rt) {
                    const zt = Rt.valueController.viewProps;
                    super(Object.assign(Object.assign({}, Rt), {
                        value: Rt.valueController.value,
                        view: new ur(wt,{
                            props: Rt.props,
                            viewProps: zt
                        }),
                        viewProps: zt
                    })),
                    this.props = Rt.props,
                    this.valueController = Rt.valueController,
                    this.view.valueElement.appendChild(this.valueController.view.element)
                }
            }
            class $l extends h {
            }
            const wl = Et("spr");
            class Ps {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(wl()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("hr");
                    zt.classList.add(wl("r")),
                    this.element.appendChild(zt)
                }
            }
            class ys extends fr {
                constructor(wt, Rt) {
                    super(Object.assign(Object.assign({}, Rt), {
                        view: new Ps(wt,{
                            viewProps: Rt.viewProps
                        })
                    }))
                }
            }
            const as = {
                id: "separator",
                type: "blade",
                accept(Vt) {
                    const wt = gr(Vt, {
                        view: hr.required.constant("separator")
                    });
                    return wt ? {
                        params: wt
                    } : null
                },
                controller(Vt) {
                    return new ys(Vt.document,{
                        blade: Vt.blade,
                        viewProps: Vt.viewProps
                    })
                },
                api(Vt) {
                    return Vt.controller instanceof ys ? new $l(Vt.controller) : null
                }
            }
              , Ln = Et("tbi");
            class Vn {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Ln()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    Dt(Rt.props, "selected", mr => {
                        mr ? this.element.classList.add(Ln(void 0, "sel")) : this.element.classList.remove(Ln(void 0, "sel"))
                    }
                    );
                    const zt = wt.createElement("button");
                    zt.classList.add(Ln("b")),
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.buttonElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(Ln("t")),
                    Bt(Rt.props.value("title"), nr),
                    this.buttonElement.appendChild(nr),
                    this.titleElement = nr
                }
            }
            class Ys {
                constructor(wt, Rt) {
                    this.emitter = new St,
                    this.onClick_ = this.onClick_.bind(this),
                    this.props = Rt.props,
                    this.viewProps = Rt.viewProps,
                    this.view = new Vn(wt,{
                        props: Rt.props,
                        viewProps: Rt.viewProps
                    }),
                    this.view.buttonElement.addEventListener("click", this.onClick_)
                }
                onClick_() {
                    this.emitter.emit("click", {
                        sender: this
                    })
                }
            }
            class Eo {
                constructor(wt, Rt) {
                    this.onItemClick_ = this.onItemClick_.bind(this),
                    this.ic_ = new Ys(wt,{
                        props: Rt.itemProps,
                        viewProps: Rr.create()
                    }),
                    this.ic_.emitter.on("click", this.onItemClick_),
                    this.cc_ = new zo(wt,{
                        blade: Qr(),
                        viewProps: Rr.create()
                    }),
                    this.props = Rt.props,
                    Dt(this.props, "selected", zt => {
                        this.itemController.props.set("selected", zt),
                        this.contentController.viewProps.set("hidden", !zt)
                    }
                    )
                }
                get itemController() {
                    return this.ic_
                }
                get contentController() {
                    return this.cc_
                }
                onItemClick_() {
                    this.props.set("selected", !0)
                }
            }
            class Sl {
                constructor(wt, Rt) {
                    this.controller_ = wt,
                    this.rackApi_ = Rt
                }
                get title() {
                    var wt;
                    return (wt = this.controller_.itemController.props.get("title")) !== null && wt !== void 0 ? wt : ""
                }
                set title(wt) {
                    this.controller_.itemController.props.set("title", wt)
                }
                get selected() {
                    return this.controller_.props.get("selected")
                }
                set selected(wt) {
                    this.controller_.props.set("selected", wt)
                }
                get children() {
                    return this.rackApi_.children
                }
                addButton(wt) {
                    return this.rackApi_.addButton(wt)
                }
                addFolder(wt) {
                    return this.rackApi_.addFolder(wt)
                }
                addSeparator(wt) {
                    return this.rackApi_.addSeparator(wt)
                }
                addTab(wt) {
                    return this.rackApi_.addTab(wt)
                }
                add(wt, Rt) {
                    this.rackApi_.add(wt, Rt)
                }
                remove(wt) {
                    this.rackApi_.remove(wt)
                }
                addInput(wt, Rt, zt) {
                    return this.rackApi_.addInput(wt, Rt, zt)
                }
                addMonitor(wt, Rt, zt) {
                    return this.rackApi_.addMonitor(wt, Rt, zt)
                }
                addBlade(wt) {
                    return this.rackApi_.addBlade(wt)
                }
            }
            class Ks extends Mn {
                constructor(wt, Rt) {
                    super(wt, new Rn(wt.rackController,Rt)),
                    this.onPageAdd_ = this.onPageAdd_.bind(this),
                    this.onPageRemove_ = this.onPageRemove_.bind(this),
                    this.onSelect_ = this.onSelect_.bind(this),
                    this.emitter_ = new St,
                    this.pageApiMap_ = new Map,
                    this.rackApi_.on("change", zt => {
                        this.emitter_.emit("change", {
                            event: zt
                        })
                    }
                    ),
                    this.rackApi_.on("update", zt => {
                        this.emitter_.emit("update", {
                            event: zt
                        })
                    }
                    ),
                    this.controller_.tab.selectedIndex.emitter.on("change", this.onSelect_),
                    this.controller_.pageSet.emitter.on("add", this.onPageAdd_),
                    this.controller_.pageSet.emitter.on("remove", this.onPageRemove_),
                    this.controller_.pageSet.items.forEach(zt => {
                        this.setUpPageApi_(zt)
                    }
                    )
                }
                get pages() {
                    return this.controller_.pageSet.items.map(wt => {
                        const Rt = this.pageApiMap_.get(wt);
                        if (!Rt)
                            throw _t.shouldNeverHappen();
                        return Rt
                    }
                    )
                }
                addPage(wt) {
                    const Rt = this.controller_.view.element.ownerDocument
                      , zt = new Eo(Rt,{
                        itemProps: ir.fromObject({
                            selected: !1,
                            title: wt.title
                        }),
                        props: ir.fromObject({
                            selected: !1
                        })
                    });
                    this.controller_.add(zt, wt.index);
                    const nr = this.pageApiMap_.get(zt);
                    if (!nr)
                        throw _t.shouldNeverHappen();
                    return nr
                }
                removePage(wt) {
                    this.controller_.remove(wt)
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
                setUpPageApi_(wt) {
                    const Rt = this.rackApi_.apiSet_.find(nr => nr.controller_ === wt.contentController);
                    if (!Rt)
                        throw _t.shouldNeverHappen();
                    const zt = new Sl(wt,Rt);
                    this.pageApiMap_.set(wt, zt)
                }
                onPageAdd_(wt) {
                    this.setUpPageApi_(wt.item)
                }
                onPageRemove_(wt) {
                    if (!this.pageApiMap_.get(wt.item))
                        throw _t.shouldNeverHappen();
                    this.pageApiMap_.delete(wt.item)
                }
                onSelect_(wt) {
                    this.emitter_.emit("select", {
                        event: new it(this,wt.rawValue)
                    })
                }
            }
            class ds {
                constructor() {
                    this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this),
                    this.empty = or(!0),
                    this.selectedIndex = or(-1),
                    this.items_ = []
                }
                add(wt, Rt) {
                    const zt = Rt ?? this.items_.length;
                    this.items_.splice(zt, 0, wt),
                    wt.emitter.on("change", this.onItemSelectedChange_),
                    this.keepSelection_()
                }
                remove(wt) {
                    const Rt = this.items_.indexOf(wt);
                    Rt < 0 || (this.items_.splice(Rt, 1),
                    wt.emitter.off("change", this.onItemSelectedChange_),
                    this.keepSelection_())
                }
                keepSelection_() {
                    if (this.items_.length === 0)
                        return this.selectedIndex.rawValue = -1,
                        void (this.empty.rawValue = !0);
                    const wt = this.items_.findIndex(Rt => Rt.rawValue);
                    wt < 0 ? (this.items_.forEach( (Rt, zt) => {
                        Rt.rawValue = zt === 0
                    }
                    ),
                    this.selectedIndex.rawValue = 0) : (this.items_.forEach( (Rt, zt) => {
                        Rt.rawValue = zt === wt
                    }
                    ),
                    this.selectedIndex.rawValue = wt),
                    this.empty.rawValue = !1
                }
                onItemSelectedChange_(wt) {
                    if (wt.rawValue) {
                        const Rt = this.items_.findIndex(zt => zt === wt.sender);
                        this.items_.forEach( (zt, nr) => {
                            zt.rawValue = nr === Rt
                        }
                        ),
                        this.selectedIndex.rawValue = Rt
                    } else
                        this.keepSelection_()
                }
            }
            const yo = Et("tab");
            class ko {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(yo(), Zo()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    It(Rt.empty, Gt(this.element, yo(void 0, "nop")));
                    const zt = wt.createElement("div");
                    zt.classList.add(yo("t")),
                    this.element.appendChild(zt),
                    this.itemsElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(yo("i")),
                    this.element.appendChild(nr);
                    const mr = Rt.contentsElement;
                    mr.classList.add(yo("c")),
                    this.element.appendChild(mr),
                    this.contentsElement = mr
                }
            }
            class xs extends Bo {
                constructor(wt, Rt) {
                    const zt = new zo(wt,{
                        blade: Rt.blade,
                        viewProps: Rt.viewProps
                    })
                      , nr = new ds;
                    super({
                        blade: Rt.blade,
                        rackController: zt,
                        view: new ko(wt,{
                            contentsElement: zt.view.element,
                            empty: nr.empty,
                            viewProps: Rt.viewProps
                        })
                    }),
                    this.onPageAdd_ = this.onPageAdd_.bind(this),
                    this.onPageRemove_ = this.onPageRemove_.bind(this),
                    this.pageSet_ = new Tn( () => null),
                    this.pageSet_.emitter.on("add", this.onPageAdd_),
                    this.pageSet_.emitter.on("remove", this.onPageRemove_),
                    this.tab = nr
                }
                get pageSet() {
                    return this.pageSet_
                }
                add(wt, Rt) {
                    this.pageSet_.add(wt, Rt)
                }
                remove(wt) {
                    this.pageSet_.remove(this.pageSet_.items[wt])
                }
                onPageAdd_(wt) {
                    const Rt = wt.item;
                    qn(this.view.itemsElement, Rt.itemController.view.element, wt.index),
                    Rt.itemController.viewProps.set("parent", this.viewProps),
                    this.rackController.rack.add(Rt.contentController, wt.index),
                    this.tab.add(Rt.props.value("selected"))
                }
                onPageRemove_(wt) {
                    const Rt = wt.item;
                    mo(Rt.itemController.view.element),
                    Rt.itemController.viewProps.set("parent", null),
                    this.rackController.rack.remove(Rt.contentController),
                    this.tab.remove(Rt.props.value("selected"))
                }
            }
            const Js = {
                id: "tab",
                type: "blade",
                accept(Vt) {
                    const wt = hr
                      , Rt = gr(Vt, {
                        pages: wt.required.array(wt.required.object({
                            title: wt.required.string
                        })),
                        view: wt.required.constant("tab")
                    });
                    return Rt && Rt.pages.length !== 0 ? {
                        params: Rt
                    } : null
                },
                controller(Vt) {
                    const wt = new xs(Vt.document,{
                        blade: Vt.blade,
                        viewProps: Vt.viewProps
                    });
                    return Vt.params.pages.forEach(Rt => {
                        const zt = new Eo(Vt.document,{
                            itemProps: ir.fromObject({
                                selected: !1,
                                title: Rt.title
                            }),
                            props: ir.fromObject({
                                selected: !1
                            })
                        });
                        wt.add(zt)
                    }
                    ),
                    wt
                },
                api(Vt) {
                    return Vt.controller instanceof xs ? new Ks(Vt.controller,Vt.pool) : null
                }
            };
            class bs {
                constructor() {
                    this.disabled = !1,
                    this.emitter = new St
                }
                dispose() {}
                tick() {
                    this.disabled || this.emitter.emit("tick", {
                        sender: this
                    })
                }
            }
            class Bl {
                constructor(wt, Rt) {
                    this.disabled_ = !1,
                    this.timerId_ = null,
                    this.onTick_ = this.onTick_.bind(this),
                    this.doc_ = wt,
                    this.emitter = new St,
                    this.interval_ = Rt,
                    this.setTimer_()
                }
                get disabled() {
                    return this.disabled_
                }
                set disabled(wt) {
                    this.disabled_ = wt,
                    this.disabled_ ? this.clearTimer_() : this.setTimer_()
                }
                dispose() {
                    this.clearTimer_()
                }
                clearTimer_() {
                    if (this.timerId_ === null)
                        return;
                    const wt = this.doc_.defaultView;
                    wt && wt.clearInterval(this.timerId_),
                    this.timerId_ = null
                }
                setTimer_() {
                    if (this.clearTimer_(),
                    this.interval_ <= 0)
                        return;
                    const wt = this.doc_.defaultView;
                    wt && (this.timerId_ = wt.setInterval(this.onTick_, this.interval_))
                }
                onTick_() {
                    this.disabled_ || this.emitter.emit("tick", {
                        sender: this
                    })
                }
            }
            class Bm {
                constructor(wt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.reader = wt.reader,
                    this.writer = wt.writer,
                    this.emitter = new St,
                    this.value = wt.value,
                    this.value.emitter.on("change", this.onValueChange_),
                    this.target = wt.target,
                    this.read()
                }
                read() {
                    const wt = this.target.read();
                    wt !== void 0 && (this.value.rawValue = this.reader(wt))
                }
                write_(wt) {
                    this.writer(this.target, wt)
                }
                onValueChange_(wt) {
                    this.write_(wt.rawValue),
                    this.emitter.emit("change", {
                        options: wt.options,
                        rawValue: wt.rawValue,
                        sender: this
                    })
                }
            }
            function Vp(Vt, wt) {
                for (; Vt.length < wt; )
                    Vt.push(void 0)
            }
            function Lm(Vt) {
                const wt = [];
                return Vp(wt, Vt),
                or(wt)
            }
            function Om(Vt) {
                const wt = Vt.indexOf(void 0);
                return wt < 0 ? Vt : Vt.slice(0, wt)
            }
            class G_ {
                constructor(wt) {
                    this.onTick_ = this.onTick_.bind(this),
                    this.reader_ = wt.reader,
                    this.target = wt.target,
                    this.emitter = new St,
                    this.value = wt.value,
                    this.ticker = wt.ticker,
                    this.ticker.emitter.on("tick", this.onTick_),
                    this.read()
                }
                dispose() {
                    this.ticker.dispose()
                }
                read() {
                    const wt = this.target.read();
                    if (wt === void 0)
                        return;
                    const Rt = this.value.rawValue
                      , zt = this.reader_(wt);
                    this.value.rawValue = function(nr, mr) {
                        const Tr = [...Om(nr), mr];
                        return Tr.length > nr.length ? Tr.splice(0, Tr.length - nr.length) : Vp(Tr, nr.length),
                        Tr
                    }(Rt, zt),
                    this.emitter.emit("update", {
                        rawValue: zt,
                        sender: this
                    })
                }
                onTick_(wt) {
                    this.read()
                }
            }
            class lu {
                constructor(wt) {
                    this.constraints = wt
                }
                constrain(wt) {
                    return this.constraints.reduce( (Rt, zt) => zt.constrain(Rt), wt)
                }
            }
            function Zs(Vt, wt) {
                if (Vt instanceof wt)
                    return Vt;
                if (Vt instanceof lu) {
                    const Rt = Vt.constraints.reduce( (zt, nr) => zt || (nr instanceof wt ? nr : null), null);
                    if (Rt)
                        return Rt
                }
                return null
            }
            class Xl {
                constructor(wt) {
                    this.values = ir.fromObject({
                        max: wt.max,
                        min: wt.min
                    })
                }
                constrain(wt) {
                    const Rt = this.values.get("max")
                      , zt = this.values.get("min");
                    return Math.min(Math.max(wt, zt), Rt)
                }
            }
            class cu {
                constructor(wt) {
                    this.values = ir.fromObject({
                        options: wt
                    })
                }
                get options() {
                    return this.values.get("options")
                }
                constrain(wt) {
                    const Rt = this.values.get("options");
                    return Rt.length === 0 || Rt.filter(zt => zt.value === wt).length > 0 ? wt : Rt[0].value
                }
            }
            class Gp {
                constructor(wt) {
                    this.values = ir.fromObject({
                        max: wt.max,
                        min: wt.min
                    })
                }
                get maxValue() {
                    return this.values.get("max")
                }
                get minValue() {
                    return this.values.get("min")
                }
                constrain(wt) {
                    const Rt = this.values.get("max")
                      , zt = this.values.get("min");
                    let nr = wt;
                    return at(zt) || (nr = Math.max(nr, zt)),
                    at(Rt) || (nr = Math.min(nr, Rt)),
                    nr
                }
            }
            class Ru {
                constructor(wt, Rt=0) {
                    this.step = wt,
                    this.origin = Rt
                }
                constrain(wt) {
                    const Rt = this.origin % this.step;
                    return Rt + Math.round((wt - Rt) / this.step) * this.step
                }
            }
            const op = Et("lst");
            class Nm {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.props_ = Rt.props,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(op()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("select");
                    zt.classList.add(op("s")),
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.selectElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(op("m")),
                    nr.appendChild(Wn(wt, "dropdown")),
                    this.element.appendChild(nr),
                    Rt.value.emitter.on("change", this.onValueChange_),
                    this.value_ = Rt.value,
                    Dt(this.props_, "options", mr => {
                        Ur(this.selectElement),
                        mr.forEach(Tr => {
                            const $r = wt.createElement("option");
                            $r.textContent = Tr.text,
                            this.selectElement.appendChild($r)
                        }
                        ),
                        this.update_()
                    }
                    )
                }
                update_() {
                    const wt = this.props_.get("options").map(Rt => Rt.value);
                    this.selectElement.selectedIndex = wt.indexOf(this.value_.rawValue)
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class uu {
                constructor(wt, Rt) {
                    this.onSelectChange_ = this.onSelectChange_.bind(this),
                    this.props = Rt.props,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new Nm(wt,{
                        props: this.props,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view.selectElement.addEventListener("change", this.onSelectChange_)
                }
                onSelectChange_(wt) {
                    const Rt = wt.currentTarget;
                    this.value.rawValue = this.props.get("options")[Rt.selectedIndex].value
                }
            }
            const zp = Et("pop");
            class Fm {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(zp()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    It(Rt.shows, Gt(this.element, zp(void 0, "v")))
                }
            }
            class Hp {
                constructor(wt, Rt) {
                    this.shows = or(!1),
                    this.viewProps = Rt.viewProps,
                    this.view = new Fm(wt,{
                        shows: this.shows,
                        viewProps: this.viewProps
                    })
                }
            }
            const Qp = Et("txt");
            class Um {
                constructor(wt, Rt) {
                    this.onChange_ = this.onChange_.bind(this),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Qp()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    this.props_ = Rt.props,
                    this.props_.emitter.on("change", this.onChange_);
                    const zt = wt.createElement("input");
                    zt.classList.add(Qp("i")),
                    zt.type = "text",
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.inputElement = zt,
                    Rt.value.emitter.on("change", this.onChange_),
                    this.value_ = Rt.value,
                    this.refresh()
                }
                refresh() {
                    const wt = this.props_.get("formatter");
                    this.inputElement.value = wt(this.value_.rawValue)
                }
                onChange_() {
                    this.refresh()
                }
            }
            class Iu {
                constructor(wt, Rt) {
                    this.onInputChange_ = this.onInputChange_.bind(this),
                    this.parser_ = Rt.parser,
                    this.props = Rt.props,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new Um(wt,{
                        props: Rt.props,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view.inputElement.addEventListener("change", this.onInputChange_)
                }
                onInputChange_(wt) {
                    const Rt = wt.currentTarget.value
                      , zt = this.parser_(Rt);
                    at(zt) || (this.value.rawValue = zt),
                    this.view.refresh()
                }
            }
            function Wp(Vt) {
                return Vt !== "false" && !!Vt
            }
            function sp(Vt) {
                return function(wt) {
                    return String(wt)
                }(Vt)
            }
            class jm {
                constructor(wt) {
                    this.text = wt
                }
                evaluate() {
                    return Number(this.text)
                }
                toString() {
                    return this.text
                }
            }
            const Vm = {
                "**": (Vt, wt) => Math.pow(Vt, wt),
                "*": (Vt, wt) => Vt * wt,
                "/": (Vt, wt) => Vt / wt,
                "%": (Vt, wt) => Vt % wt,
                "+": (Vt, wt) => Vt + wt,
                "-": (Vt, wt) => Vt - wt,
                "<<": (Vt, wt) => Vt << wt,
                ">>": (Vt, wt) => Vt >> wt,
                ">>>": (Vt, wt) => Vt >>> wt,
                "&": (Vt, wt) => Vt & wt,
                "^": (Vt, wt) => Vt ^ wt,
                "|": (Vt, wt) => Vt | wt
            };
            class z_ {
                constructor(wt, Rt, zt) {
                    this.left = Rt,
                    this.operator = wt,
                    this.right = zt
                }
                evaluate() {
                    const wt = Vm[this.operator];
                    if (!wt)
                        throw new Error(`unexpected binary operator: '${
this.operator}`);
                    return wt(this.left.evaluate(), this.right.evaluate())
                }
                toString() {
                    return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ")
                }
            }
            const Gm = {
                "+": Vt => Vt,
                "-": Vt => -Vt,
                "~": Vt => ~Vt
            };
            class zm {
                constructor(wt, Rt) {
                    this.operator = wt,
                    this.expression = Rt
                }
                evaluate() {
                    const wt = Gm[this.operator];
                    if (!wt)
                        throw new Error(`unexpected unary operator: '${
this.operator}`);
                    return wt(this.expression.evaluate())
                }
                toString() {
                    return ["u(", this.operator, this.expression.toString(), ")"].join(" ")
                }
            }
            function ap(Vt) {
                return (wt, Rt) => {
                    for (let zt = 0; zt < Vt.length; zt++) {
                        const nr = Vt[zt](wt, Rt);
                        if (nr !== "")
                            return nr
                    }
                    return ""
                }
            }
            function ku(Vt, wt) {
                var Rt;
                const zt = Vt.substr(wt).match(/^\s+/);
                return (Rt = zt && zt[0]) !== null && Rt !== void 0 ? Rt : ""
            }
            function Du(Vt, wt) {
                var Rt;
                const zt = Vt.substr(wt).match(/^[0-9]+/);
                return (Rt = zt && zt[0]) !== null && Rt !== void 0 ? Rt : ""
            }
            function qp(Vt, wt) {
                const Rt = Vt.substr(wt, 1);
                if (wt += 1,
                Rt.toLowerCase() !== "e")
                    return "";
                const zt = function(nr, mr) {
                    const Tr = Du(nr, mr);
                    if (Tr !== "")
                        return Tr;
                    const $r = nr.substr(mr, 1);
                    if ($r !== "-" && $r !== "+")
                        return "";
                    const vn = Du(nr, mr += 1);
                    return vn === "" ? "" : $r + vn
                }(Vt, wt);
                return zt === "" ? "" : Rt + zt
            }
            function Bu(Vt, wt) {
                const Rt = Vt.substr(wt, 1);
                if (Rt === "0")
                    return Rt;
                const zt = function(nr, mr) {
                    const Tr = nr.substr(mr, 1);
                    return Tr.match(/^[1-9]$/) ? Tr : ""
                }(Vt, wt);
                return wt += zt.length,
                zt === "" ? "" : zt + Du(Vt, wt)
            }
            const lp = ap([function(Vt, wt) {
                const Rt = Bu(Vt, wt);
                if (wt += Rt.length,
                Rt === "")
                    return "";
                const zt = Vt.substr(wt, 1);
                if (wt += zt.length,
                zt !== ".")
                    return "";
                const nr = Du(Vt, wt);
                return Rt + zt + nr + qp(Vt, wt += nr.length)
            }
            , function(Vt, wt) {
                const Rt = Vt.substr(wt, 1);
                if (wt += Rt.length,
                Rt !== ".")
                    return "";
                const zt = Du(Vt, wt);
                return wt += zt.length,
                zt === "" ? "" : Rt + zt + qp(Vt, wt)
            }
            , function(Vt, wt) {
                const Rt = Bu(Vt, wt);
                return wt += Rt.length,
                Rt === "" ? "" : Rt + qp(Vt, wt)
            }
            ])
              , $p = ap([function(Vt, wt) {
                const Rt = Vt.substr(wt, 2);
                if (wt += Rt.length,
                Rt.toLowerCase() !== "0b")
                    return "";
                const zt = function(nr, mr) {
                    var Tr;
                    const $r = nr.substr(mr).match(/^[01]+/);
                    return (Tr = $r && $r[0]) !== null && Tr !== void 0 ? Tr : ""
                }(Vt, wt);
                return zt === "" ? "" : Rt + zt
            }
            , function(Vt, wt) {
                const Rt = Vt.substr(wt, 2);
                if (wt += Rt.length,
                Rt.toLowerCase() !== "0o")
                    return "";
                const zt = function(nr, mr) {
                    var Tr;
                    const $r = nr.substr(mr).match(/^[0-7]+/);
                    return (Tr = $r && $r[0]) !== null && Tr !== void 0 ? Tr : ""
                }(Vt, wt);
                return zt === "" ? "" : Rt + zt
            }
            , function(Vt, wt) {
                const Rt = Vt.substr(wt, 2);
                if (wt += Rt.length,
                Rt.toLowerCase() !== "0x")
                    return "";
                const zt = function(nr, mr) {
                    var Tr;
                    const $r = nr.substr(mr).match(/^[0-9a-f]+/i);
                    return (Tr = $r && $r[0]) !== null && Tr !== void 0 ? Tr : ""
                }(Vt, wt);
                return zt === "" ? "" : Rt + zt
            }
            ])
              , du = ap([$p, lp]);
            function pu(Vt, wt) {
                var Rt;
                return (Rt = function(zt, nr) {
                    const mr = du(zt, nr);
                    return nr += mr.length,
                    mr === "" ? null : {
                        evaluable: new jm(mr),
                        cursor: nr
                    }
                }(Vt, wt)) !== null && Rt !== void 0 ? Rt : function(zt, nr) {
                    const mr = zt.substr(nr, 1);
                    if (nr += mr.length,
                    mr !== "(")
                        return null;
                    const Tr = Xp(zt, nr);
                    if (!Tr)
                        return null;
                    nr = Tr.cursor,
                    nr += ku(zt, nr).length;
                    const $r = zt.substr(nr, 1);
                    return nr += $r.length,
                    $r !== ")" ? null : {
                        evaluable: Tr.evaluable,
                        cursor: nr
                    }
                }(Vt, wt)
            }
            function cp(Vt, wt, Rt) {
                Rt += ku(wt, Rt).length;
                const zt = Vt.filter(nr => wt.startsWith(nr, Rt))[0];
                return zt ? (Rt += zt.length,
                {
                    cursor: Rt += ku(wt, Rt).length,
                    operator: zt
                }) : null
            }
            const Hm = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce( (Vt, wt) => function(Rt, zt) {
                return (nr, mr) => {
                    const Tr = Rt(nr, mr);
                    if (!Tr)
                        return null;
                    mr = Tr.cursor;
                    let $r = Tr.evaluable;
                    for (; ; ) {
                        const vn = cp(zt, nr, mr);
                        if (!vn)
                            break;
                        mr = vn.cursor;
                        const zn = Rt(nr, mr);
                        if (!zn)
                            return null;
                        mr = zn.cursor,
                        $r = new z_(vn.operator,$r,zn.evaluable)
                    }
                    return $r ? {
                        cursor: mr,
                        evaluable: $r
                    } : null
                }
            }(Vt, wt), function Vt(wt, Rt) {
                const zt = pu(wt, Rt);
                if (zt)
                    return zt;
                const nr = wt.substr(Rt, 1);
                if (Rt += nr.length,
                nr !== "+" && nr !== "-" && nr !== "~")
                    return null;
                const mr = Vt(wt, Rt);
                return mr ? {
                    cursor: Rt = mr.cursor,
                    evaluable: new zm(nr,mr.evaluable)
                } : null
            });
            function Xp(Vt, wt) {
                return wt += ku(Vt, wt).length,
                Hm(Vt, wt)
            }
            function Ll(Vt) {
                var wt;
                const Rt = function(zt) {
                    const nr = Xp(zt, 0);
                    return nr ? nr.cursor + ku(zt, nr.cursor).length !== zt.length ? null : nr.evaluable : null
                }(Vt);
                return (wt = Rt == null ? void 0 : Rt.evaluate()) !== null && wt !== void 0 ? wt : null
            }
            function H_(Vt) {
                if (typeof Vt == "number")
                    return Vt;
                if (typeof Vt == "string") {
                    const wt = Ll(Vt);
                    if (!at(wt))
                        return wt
                }
                return 0
            }
            function S0(Vt) {
                return String(Vt)
            }
            function ts(Vt) {
                return wt => wt.toFixed(Math.max(Math.min(Vt, 20), 0))
            }
            const Ol = ts(0);
            function up(Vt) {
                return Ol(Vt) + "%"
            }
            function Qm(Vt) {
                return String(Vt)
            }
            function El(Vt) {
                return Vt
            }
            function Lu({
primary: Vt, secondary: wt, forward: Rt, backward: zt}) {
                let nr = !1;
                function mr(Tr) {
                    nr || (nr = !0,
                    Tr(),
                    nr = !1)
                }
                Vt.emitter.on("change", Tr => {
                    mr( () => {
                        wt.setRawValue(Rt(Vt, wt), Tr.options)
                    }
                    )
                }
                ),
                wt.emitter.on("change", Tr => {
                    mr( () => {
                        Vt.setRawValue(zt(Vt, wt), Tr.options)
                    }
                    ),
                    mr( () => {
                        wt.setRawValue(Rt(Vt, wt), Tr.options)
                    }
                    )
                }
                ),
                mr( () => {
                    wt.setRawValue(Rt(Vt, wt), {
                        forceEmit: !1,
                        last: !0
                    })
                }
                )
            }
            function Oo(Vt, wt) {
                const Rt = Vt * (wt.altKey ? .1 : 1) * (wt.shiftKey ? 10 : 1);
                return wt.upKey ? +Rt : wt.downKey ? -Rt : 0
            }
            function jo(Vt) {
                return {
                    altKey: Vt.altKey,
                    downKey: Vt.key === "ArrowDown",
                    shiftKey: Vt.shiftKey,
                    upKey: Vt.key === "ArrowUp"
                }
            }
            function Xo(Vt) {
                return {
                    altKey: Vt.altKey,
                    downKey: Vt.key === "ArrowLeft",
                    shiftKey: Vt.shiftKey,
                    upKey: Vt.key === "ArrowRight"
                }
            }
            function dp(Vt) {
                return function(wt) {
                    return wt === "ArrowUp" || wt === "ArrowDown"
                }(Vt) || Vt === "ArrowLeft" || Vt === "ArrowRight"
            }
            function hu(Vt, wt) {
                var Rt, zt;
                const nr = wt.ownerDocument.defaultView
                  , mr = wt.getBoundingClientRect();
                return {
                    x: Vt.pageX - (((Rt = nr && nr.scrollX) !== null && Rt !== void 0 ? Rt : 0) + mr.left),
                    y: Vt.pageY - (((zt = nr && nr.scrollY) !== null && zt !== void 0 ? zt : 0) + mr.top)
                }
            }
            class ps {
                constructor(wt) {
                    this.lastTouch_ = null,
                    this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this),
                    this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this),
                    this.onMouseDown_ = this.onMouseDown_.bind(this),
                    this.onTouchEnd_ = this.onTouchEnd_.bind(this),
                    this.onTouchMove_ = this.onTouchMove_.bind(this),
                    this.onTouchStart_ = this.onTouchStart_.bind(this),
                    this.elem_ = wt,
                    this.emitter = new St,
                    wt.addEventListener("touchstart", this.onTouchStart_, {
                        passive: !1
                    }),
                    wt.addEventListener("touchmove", this.onTouchMove_, {
                        passive: !0
                    }),
                    wt.addEventListener("touchend", this.onTouchEnd_),
                    wt.addEventListener("mousedown", this.onMouseDown_)
                }
                computePosition_(wt) {
                    const Rt = this.elem_.getBoundingClientRect();
                    return {
                        bounds: {
                            width: Rt.width,
                            height: Rt.height
                        },
                        point: wt ? {
                            x: wt.x,
                            y: wt.y
                        } : null
                    }
                }
                onMouseDown_(wt) {
                    var Rt;
                    wt.preventDefault(),
                    (Rt = wt.currentTarget) === null || Rt === void 0 || Rt.focus();
                    const zt = this.elem_.ownerDocument;
                    zt.addEventListener("mousemove", this.onDocumentMouseMove_),
                    zt.addEventListener("mouseup", this.onDocumentMouseUp_),
                    this.emitter.emit("down", {
                        altKey: wt.altKey,
                        data: this.computePosition_(hu(wt, this.elem_)),
                        sender: this,
                        shiftKey: wt.shiftKey
                    })
                }
                onDocumentMouseMove_(wt) {
                    this.emitter.emit("move", {
                        altKey: wt.altKey,
                        data: this.computePosition_(hu(wt, this.elem_)),
                        sender: this,
                        shiftKey: wt.shiftKey
                    })
                }
                onDocumentMouseUp_(wt) {
                    const Rt = this.elem_.ownerDocument;
                    Rt.removeEventListener("mousemove", this.onDocumentMouseMove_),
                    Rt.removeEventListener("mouseup", this.onDocumentMouseUp_),
                    this.emitter.emit("up", {
                        altKey: wt.altKey,
                        data: this.computePosition_(hu(wt, this.elem_)),
                        sender: this,
                        shiftKey: wt.shiftKey
                    })
                }
                onTouchStart_(wt) {
                    wt.preventDefault();
                    const Rt = wt.targetTouches.item(0)
                      , zt = this.elem_.getBoundingClientRect();
                    this.emitter.emit("down", {
                        altKey: wt.altKey,
                        data: this.computePosition_(Rt ? {
                            x: Rt.clientX - zt.left,
                            y: Rt.clientY - zt.top
                        } : void 0),
                        sender: this,
                        shiftKey: wt.shiftKey
                    }),
                    this.lastTouch_ = Rt
                }
                onTouchMove_(wt) {
                    const Rt = wt.targetTouches.item(0)
                      , zt = this.elem_.getBoundingClientRect();
                    this.emitter.emit("move", {
                        altKey: wt.altKey,
                        data: this.computePosition_(Rt ? {
                            x: Rt.clientX - zt.left,
                            y: Rt.clientY - zt.top
                        } : void 0),
                        sender: this,
                        shiftKey: wt.shiftKey
                    }),
                    this.lastTouch_ = Rt
                }
                onTouchEnd_(wt) {
                    var Rt;
                    const zt = (Rt = wt.targetTouches.item(0)) !== null && Rt !== void 0 ? Rt : this.lastTouch_
                      , nr = this.elem_.getBoundingClientRect();
                    this.emitter.emit("up", {
                        altKey: wt.altKey,
                        data: this.computePosition_(zt ? {
                            x: zt.clientX - nr.left,
                            y: zt.clientY - nr.top
                        } : void 0),
                        sender: this,
                        shiftKey: wt.shiftKey
                    })
                }
            }
            function No(Vt, wt, Rt, zt, nr) {
                return zt + (Vt - wt) / (Rt - wt) * (nr - zt)
            }
            function Vo(Vt) {
                return String(Vt.toFixed(10)).split(".")[1].replace(/0+$/, "").length
            }
            function Wo(Vt, wt, Rt) {
                return Math.min(Math.max(Vt, wt), Rt)
            }
            function Ou(Vt, wt) {
                return (Vt % wt + wt) % wt
            }
            const Hs = Et("txt");
            class Yp {
                constructor(wt, Rt) {
                    this.onChange_ = this.onChange_.bind(this),
                    this.props_ = Rt.props,
                    this.props_.emitter.on("change", this.onChange_),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Hs(), Hs(void 0, "num")),
                    Rt.arrayPosition && this.element.classList.add(Hs(void 0, Rt.arrayPosition)),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("input");
                    zt.classList.add(Hs("i")),
                    zt.type = "text",
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.inputElement = zt,
                    this.onDraggingChange_ = this.onDraggingChange_.bind(this),
                    this.dragging_ = Rt.dragging,
                    this.dragging_.emitter.on("change", this.onDraggingChange_),
                    this.element.classList.add(Hs()),
                    this.inputElement.classList.add(Hs("i"));
                    const nr = wt.createElement("div");
                    nr.classList.add(Hs("k")),
                    this.element.appendChild(nr),
                    this.knobElement = nr;
                    const mr = wt.createElementNS(vr, "svg");
                    mr.classList.add(Hs("g")),
                    this.knobElement.appendChild(mr);
                    const Tr = wt.createElementNS(vr, "path");
                    Tr.classList.add(Hs("gb")),
                    mr.appendChild(Tr),
                    this.guideBodyElem_ = Tr;
                    const $r = wt.createElementNS(vr, "path");
                    $r.classList.add(Hs("gh")),
                    mr.appendChild($r),
                    this.guideHeadElem_ = $r;
                    const vn = wt.createElement("div");
                    vn.classList.add(Et("tt")()),
                    this.knobElement.appendChild(vn),
                    this.tooltipElem_ = vn,
                    Rt.value.emitter.on("change", this.onChange_),
                    this.value = Rt.value,
                    this.refresh()
                }
                onDraggingChange_(wt) {
                    if (wt.rawValue === null)
                        return void this.element.classList.remove(Hs(void 0, "drg"));
                    this.element.classList.add(Hs(void 0, "drg"));
                    const Rt = wt.rawValue / this.props_.get("draggingScale")
                      , zt = Rt + (Rt > 0 ? -1 : Rt < 0 ? 1 : 0)
                      , nr = Wo(-zt, -4, 4);
                    this.guideHeadElem_.setAttributeNS(null, "d", [`M ${
zt + nr},0 L${
zt},4 L${
zt + nr},8`, `M ${
Rt},-1 L${
Rt},9`].join(" ")),
                    this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${
Rt},4`);
                    const mr = this.props_.get("formatter");
                    this.tooltipElem_.textContent = mr(this.value.rawValue),
                    this.tooltipElem_.style.left = `${
Rt}
px`
                }
                refresh() {
                    const wt = this.props_.get("formatter");
                    this.inputElement.value = wt(this.value.rawValue)
                }
                onChange_() {
                    this.refresh()
                }
            }
            class pp {
                constructor(wt, Rt) {
                    var zt;
                    this.originRawValue_ = 0,
                    this.onInputChange_ = this.onInputChange_.bind(this),
                    this.onInputKeyDown_ = this.onInputKeyDown_.bind(this),
                    this.onInputKeyUp_ = this.onInputKeyUp_.bind(this),
                    this.onPointerDown_ = this.onPointerDown_.bind(this),
                    this.onPointerMove_ = this.onPointerMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.baseStep_ = Rt.baseStep,
                    this.parser_ = Rt.parser,
                    this.props = Rt.props,
                    this.sliderProps_ = (zt = Rt.sliderProps) !== null && zt !== void 0 ? zt : null,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.dragging_ = or(null),
                    this.view = new Yp(wt,{
                        arrayPosition: Rt.arrayPosition,
                        dragging: this.dragging_,
                        props: this.props,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view.inputElement.addEventListener("change", this.onInputChange_),
                    this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_),
                    this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
                    const nr = new ps(this.view.knobElement);
                    nr.emitter.on("down", this.onPointerDown_),
                    nr.emitter.on("move", this.onPointerMove_),
                    nr.emitter.on("up", this.onPointerUp_)
                }
                constrainValue_(wt) {
                    var Rt, zt;
                    const nr = (Rt = this.sliderProps_) === null || Rt === void 0 ? void 0 : Rt.get("minValue")
                      , mr = (zt = this.sliderProps_) === null || zt === void 0 ? void 0 : zt.get("maxValue");
                    let Tr = wt;
                    return nr !== void 0 && (Tr = Math.max(Tr, nr)),
                    mr !== void 0 && (Tr = Math.min(Tr, mr)),
                    Tr
                }
                onInputChange_(wt) {
                    const Rt = wt.currentTarget.value
                      , zt = this.parser_(Rt);
                    at(zt) || (this.value.rawValue = this.constrainValue_(zt)),
                    this.view.refresh()
                }
                onInputKeyDown_(wt) {
                    const Rt = Oo(this.baseStep_, jo(wt));
                    Rt !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + Rt), {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onInputKeyUp_(wt) {
                    Oo(this.baseStep_, jo(wt)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onPointerDown_() {
                    this.originRawValue_ = this.value.rawValue,
                    this.dragging_.rawValue = 0
                }
                computeDraggingValue_(wt) {
                    if (!wt.point)
                        return null;
                    const Rt = wt.point.x - wt.bounds.width / 2;
                    return this.constrainValue_(this.originRawValue_ + Rt * this.props.get("draggingScale"))
                }
                onPointerMove_(wt) {
                    const Rt = this.computeDraggingValue_(wt.data);
                    Rt !== null && (this.value.setRawValue(Rt, {
                        forceEmit: !1,
                        last: !1
                    }),
                    this.dragging_.rawValue = this.value.rawValue - this.originRawValue_)
                }
                onPointerUp_(wt) {
                    const Rt = this.computeDraggingValue_(wt.data);
                    Rt !== null && (this.value.setRawValue(Rt, {
                        forceEmit: !0,
                        last: !0
                    }),
                    this.dragging_.rawValue = null)
                }
            }
            const Wm = Et("sld");
            class E0 {
                constructor(wt, Rt) {
                    this.onChange_ = this.onChange_.bind(this),
                    this.props_ = Rt.props,
                    this.props_.emitter.on("change", this.onChange_),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Wm()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(Wm("t")),
                    Rt.viewProps.bindTabIndex(zt),
                    this.element.appendChild(zt),
                    this.trackElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(Wm("k")),
                    this.trackElement.appendChild(nr),
                    this.knobElement = nr,
                    Rt.value.emitter.on("change", this.onChange_),
                    this.value = Rt.value,
                    this.update_()
                }
                update_() {
                    const wt = Wo(No(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
                    this.knobElement.style.width = `${
wt}%`
                }
                onChange_() {
                    this.update_()
                }
            }
            class T0 {
                constructor(wt, Rt) {
                    this.onKeyDown_ = this.onKeyDown_.bind(this),
                    this.onKeyUp_ = this.onKeyUp_.bind(this),
                    this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.baseStep_ = Rt.baseStep,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.props = Rt.props,
                    this.view = new E0(wt,{
                        props: this.props,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.ptHandler_ = new ps(this.view.trackElement),
                    this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_),
                    this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_),
                    this.ptHandler_.emitter.on("up", this.onPointerUp_),
                    this.view.trackElement.addEventListener("keydown", this.onKeyDown_),
                    this.view.trackElement.addEventListener("keyup", this.onKeyUp_)
                }
                handlePointerEvent_(wt, Rt) {
                    wt.point && this.value.setRawValue(No(Wo(wt.point.x, 0, wt.bounds.width), 0, wt.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), Rt)
                }
                onPointerDownOrMove_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerUp_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onKeyDown_(wt) {
                    const Rt = Oo(this.baseStep_, Xo(wt));
                    Rt !== 0 && this.value.setRawValue(this.value.rawValue + Rt, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onKeyUp_(wt) {
                    Oo(this.baseStep_, Xo(wt)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
            }
            const qm = Et("sldtxt");
            class C0 {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(qm());
                    const zt = wt.createElement("div");
                    zt.classList.add(qm("s")),
                    this.sliderView_ = Rt.sliderView,
                    zt.appendChild(this.sliderView_.element),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("div");
                    nr.classList.add(qm("t")),
                    this.textView_ = Rt.textView,
                    nr.appendChild(this.textView_.element),
                    this.element.appendChild(nr)
                }
            }
            class $m {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.sliderC_ = new T0(wt,{
                        baseStep: Rt.baseStep,
                        props: Rt.sliderProps,
                        value: Rt.value,
                        viewProps: this.viewProps
                    }),
                    this.textC_ = new pp(wt,{
                        baseStep: Rt.baseStep,
                        parser: Rt.parser,
                        props: Rt.textProps,
                        sliderProps: Rt.sliderProps,
                        value: Rt.value,
                        viewProps: Rt.viewProps
                    }),
                    this.view = new C0(wt,{
                        sliderView: this.sliderC_.view,
                        textView: this.textC_.view
                    })
                }
                get sliderController() {
                    return this.sliderC_
                }
                get textController() {
                    return this.textC_
                }
            }
            function hp(Vt, wt) {
                Vt.write(wt)
            }
            function Kp(Vt) {
                const wt = hr;
                return Array.isArray(Vt) ? wt.required.array(wt.required.object({
                    text: wt.required.string,
                    value: wt.required.raw
                }))(Vt).value : typeof Vt == "object" ? wt.required.raw(Vt).value : void 0
            }
            function Q_(Vt) {
                if (Vt === "inline" || Vt === "popup")
                    return Vt
            }
            function Yl(Vt) {
                const wt = hr;
                return wt.required.object({
                    max: wt.optional.number,
                    min: wt.optional.number,
                    step: wt.optional.number
                })(Vt).value
            }
            function W_(Vt) {
                if (Array.isArray(Vt))
                    return Vt;
                const wt = [];
                return Object.keys(Vt).forEach(Rt => {
                    wt.push({
                        text: Rt,
                        value: Vt[Rt]
                    })
                }
                ),
                wt
            }
            function Xm(Vt) {
                return at(Vt) ? null : new cu(W_(Vt))
            }
            function mp(Vt, wt) {
                const Rt = Vt && Zs(Vt, Ru);
                return Rt ? Vo(Rt.step) : Math.max(Vo(wt), 2)
            }
            function mu(Vt) {
                const wt = function(Rt) {
                    const zt = Rt ? Zs(Rt, Ru) : null;
                    return zt ? zt.step : null
                }(Vt);
                return wt ?? 1
            }
            function fu(Vt, wt) {
                var Rt;
                const zt = Vt && Zs(Vt, Ru)
                  , nr = Math.abs((Rt = zt == null ? void 0 : zt.step) !== null && Rt !== void 0 ? Rt : wt);
                return nr === 0 ? .1 : Math.pow(10, Math.floor(Math.log10(nr)) - 1)
            }
            const fp = Et("ckb");
            class q_ {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(fp()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("label");
                    zt.classList.add(fp("l")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("input");
                    nr.classList.add(fp("i")),
                    nr.type = "checkbox",
                    zt.appendChild(nr),
                    this.inputElement = nr,
                    Rt.viewProps.bindDisabled(this.inputElement);
                    const mr = wt.createElement("div");
                    mr.classList.add(fp("w")),
                    zt.appendChild(mr);
                    const Tr = Wn(wt, "check");
                    mr.appendChild(Tr),
                    Rt.value.emitter.on("change", this.onValueChange_),
                    this.value = Rt.value,
                    this.update_()
                }
                update_() {
                    this.inputElement.checked = this.value.rawValue
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class $_ {
                constructor(wt, Rt) {
                    this.onInputChange_ = this.onInputChange_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new q_(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view.inputElement.addEventListener("change", this.onInputChange_)
                }
                onInputChange_(wt) {
                    const Rt = wt.currentTarget;
                    this.value.rawValue = Rt.checked
                }
            }
            const X_ = {
                id: "input-bool",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "boolean")
                        return null;
                    const Rt = gr(wt, {
                        options: hr.optional.custom(Kp)
                    });
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Wp,
                    constraint: Vt => function(wt) {
                        const Rt = []
                          , zt = Xm(wt.options);
                        return zt && Rt.push(zt),
                        new lu(Rt)
                    }(Vt.params),
                    writer: Vt => hp
                },
                controller: Vt => {
                    const wt = Vt.document
                      , Rt = Vt.value
                      , zt = Vt.constraint
                      , nr = zt && Zs(zt, cu);
                    return nr ? new uu(wt,{
                        props: new ir({
                            options: nr.values.value("options")
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    }) : new $_(wt,{
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , Kl = Et("col");
            class Y_ {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Kl()),
                    Rt.foldable.bindExpandedClass(this.element, Kl(void 0, "expanded")),
                    Dt(Rt.foldable, "completed", Gt(this.element, Kl(void 0, "cpl")));
                    const zt = wt.createElement("div");
                    zt.classList.add(Kl("h")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("div");
                    nr.classList.add(Kl("s")),
                    zt.appendChild(nr),
                    this.swatchElement = nr;
                    const mr = wt.createElement("div");
                    if (mr.classList.add(Kl("t")),
                    zt.appendChild(mr),
                    this.textElement = mr,
                    Rt.pickerLayout === "inline") {
                        const Tr = wt.createElement("div");
                        Tr.classList.add(Kl("p")),
                        this.element.appendChild(Tr),
                        this.pickerElement = Tr
                    } else
                        this.pickerElement = null
                }
            }
            function Nu(Vt, wt, Rt) {
                const zt = Ou(Vt, 360)
                  , nr = Wo(wt / 100, 0, 1)
                  , mr = Wo(Rt / 100, 0, 1)
                  , Tr = mr * nr
                  , $r = Tr * (1 - Math.abs(zt / 60 % 2 - 1))
                  , vn = mr - Tr;
                let zn, co, is;
                return [zn,co,is] = zt >= 0 && zt < 60 ? [Tr, $r, 0] : zt >= 60 && zt < 120 ? [$r, Tr, 0] : zt >= 120 && zt < 180 ? [0, Tr, $r] : zt >= 180 && zt < 240 ? [0, $r, Tr] : zt >= 240 && zt < 300 ? [$r, 0, Tr] : [Tr, 0, $r],
                [255 * (zn + vn), 255 * (co + vn), 255 * (is + vn)]
            }
            function gu(Vt) {
                return [Vt[0], Vt[1], Vt[2]]
            }
            function K_(Vt, wt) {
                return [Vt[0], Vt[1], Vt[2], wt]
            }
            const P0 = {
                hsl: {
                    hsl: (Vt, wt, Rt) => [Vt, wt, Rt],
                    hsv: function(Vt, wt, Rt) {
                        const zt = Rt + wt * (100 - Math.abs(2 * Rt - 100)) / 200;
                        return [Vt, zt !== 0 ? wt * (100 - Math.abs(2 * Rt - 100)) / zt : 0, Rt + wt * (100 - Math.abs(2 * Rt - 100)) / 200]
                    },
                    rgb: function(Vt, wt, Rt) {
                        const zt = (Vt % 360 + 360) % 360
                          , nr = Wo(wt / 100, 0, 1)
                          , mr = Wo(Rt / 100, 0, 1)
                          , Tr = (1 - Math.abs(2 * mr - 1)) * nr
                          , $r = Tr * (1 - Math.abs(zt / 60 % 2 - 1))
                          , vn = mr - Tr / 2;
                        let zn, co, is;
                        return [zn,co,is] = zt >= 0 && zt < 60 ? [Tr, $r, 0] : zt >= 60 && zt < 120 ? [$r, Tr, 0] : zt >= 120 && zt < 180 ? [0, Tr, $r] : zt >= 180 && zt < 240 ? [0, $r, Tr] : zt >= 240 && zt < 300 ? [$r, 0, Tr] : [Tr, 0, $r],
                        [255 * (zn + vn), 255 * (co + vn), 255 * (is + vn)]
                    }
                },
                hsv: {
                    hsl: function(Vt, wt, Rt) {
                        const zt = 100 - Math.abs(Rt * (200 - wt) / 100 - 100);
                        return [Vt, zt !== 0 ? wt * Rt / zt : 0, Rt * (200 - wt) / 200]
                    },
                    hsv: (Vt, wt, Rt) => [Vt, wt, Rt],
                    rgb: Nu
                },
                rgb: {
                    hsl: function(Vt, wt, Rt) {
                        const zt = Wo(Vt / 255, 0, 1)
                          , nr = Wo(wt / 255, 0, 1)
                          , mr = Wo(Rt / 255, 0, 1)
                          , Tr = Math.max(zt, nr, mr)
                          , $r = Math.min(zt, nr, mr)
                          , vn = Tr - $r;
                        let zn = 0
                          , co = 0;
                        const is = ($r + Tr) / 2;
                        return vn !== 0 && (co = vn / (1 - Math.abs(Tr + $r - 1)),
                        zn = zt === Tr ? (nr - mr) / vn : nr === Tr ? 2 + (mr - zt) / vn : 4 + (zt - nr) / vn,
                        zn = zn / 6 + (zn < 0 ? 1 : 0)),
                        [360 * zn, 100 * co, 100 * is]
                    },
                    hsv: function(Vt, wt, Rt) {
                        const zt = Wo(Vt / 255, 0, 1)
                          , nr = Wo(wt / 255, 0, 1)
                          , mr = Wo(Rt / 255, 0, 1)
                          , Tr = Math.max(zt, nr, mr)
                          , $r = Tr - Math.min(zt, nr, mr);
                        let vn;
                        return vn = $r === 0 ? 0 : Tr === zt ? ((nr - mr) / $r % 6 + 6) % 6 * 60 : Tr === nr ? 60 * ((mr - zt) / $r + 2) : 60 * ((zt - nr) / $r + 4),
                        [vn, 100 * (Tr === 0 ? 0 : $r / Tr), 100 * Tr]
                    },
                    rgb: (Vt, wt, Rt) => [Vt, wt, Rt]
                }
            };
            function Jp(Vt, wt) {
                return [wt === "float" ? 1 : Vt === "rgb" ? 255 : 360, wt === "float" ? 1 : Vt === "rgb" ? 255 : 100, wt === "float" ? 1 : Vt === "rgb" ? 255 : 100]
            }
            function M0(Vt, wt) {
                return Vt === wt ? wt : Ou(Vt, wt)
            }
            function J_(Vt, wt, Rt, zt) {
                const nr = Jp(wt, Rt)
                  , mr = Jp(wt, zt);
                return Vt.map( (Tr, $r) => Tr / nr[$r] * mr[$r])
            }
            function Zp(Vt, wt) {
                return typeof Vt == "object" && !at(Vt) && wt in Vt && typeof Vt[wt] == "number"
            }
            class xo {
                static black(wt="int") {
                    return new xo([0, 0, 0],"rgb",wt)
                }
                static fromObject(wt, Rt="int") {
                    const zt = "a"in wt ? [wt.r, wt.g, wt.b, wt.a] : [wt.r, wt.g, wt.b];
                    return new xo(zt,"rgb",Rt)
                }
                static toRgbaObject(wt, Rt="int") {
                    return wt.toRgbaObject(Rt)
                }
                static isRgbColorObject(wt) {
                    return Zp(wt, "r") && Zp(wt, "g") && Zp(wt, "b")
                }
                static isRgbaColorObject(wt) {
                    return this.isRgbColorObject(wt) && Zp(wt, "a")
                }
                static isColorObject(wt) {
                    return this.isRgbColorObject(wt)
                }
                static equals(wt, Rt) {
                    if (wt.mode !== Rt.mode)
                        return !1;
                    const zt = wt.comps_
                      , nr = Rt.comps_;
                    for (let mr = 0; mr < zt.length; mr++)
                        if (zt[mr] !== nr[mr])
                            return !1;
                    return !0
                }
                constructor(wt, Rt, zt="int") {
                    this.mode = Rt,
                    this.type = zt,
                    this.comps_ = function(nr, mr, Tr) {
                        var $r;
                        const vn = Jp(mr, Tr);
                        return [mr === "rgb" ? Wo(nr[0], 0, vn[0]) : M0(nr[0], vn[0]), Wo(nr[1], 0, vn[1]), Wo(nr[2], 0, vn[2]), Wo(($r = nr[3]) !== null && $r !== void 0 ? $r : 1, 0, 1)]
                    }(wt, Rt, zt)
                }
                getComponents(wt, Rt="int") {
                    return K_(function(zt, nr, mr) {
                        const Tr = J_(zt, nr.mode, nr.type, "int");
                        return J_(P0[nr.mode][mr.mode](...Tr), mr.mode, "int", mr.type)
                    }(gu(this.comps_), {
                        mode: this.mode,
                        type: this.type
                    }, {
                        mode: wt ?? this.mode,
                        type: Rt
                    }), this.comps_[3])
                }
                toRgbaObject(wt="int") {
                    const Rt = this.getComponents("rgb", wt);
                    return {
                        r: Rt[0],
                        g: Rt[1],
                        b: Rt[2],
                        a: Rt[3]
                    }
                }
            }
            const Jl = Et("colp");
            class Ym {
                constructor(wt, Rt) {
                    this.alphaViews_ = null,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Jl()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(Jl("hsv"));
                    const nr = wt.createElement("div");
                    nr.classList.add(Jl("sv")),
                    this.svPaletteView_ = Rt.svPaletteView,
                    nr.appendChild(this.svPaletteView_.element),
                    zt.appendChild(nr);
                    const mr = wt.createElement("div");
                    mr.classList.add(Jl("h")),
                    this.hPaletteView_ = Rt.hPaletteView,
                    mr.appendChild(this.hPaletteView_.element),
                    zt.appendChild(mr),
                    this.element.appendChild(zt);
                    const Tr = wt.createElement("div");
                    if (Tr.classList.add(Jl("rgb")),
                    this.textView_ = Rt.textView,
                    Tr.appendChild(this.textView_.element),
                    this.element.appendChild(Tr),
                    Rt.alphaViews) {
                        this.alphaViews_ = {
                            palette: Rt.alphaViews.palette,
                            text: Rt.alphaViews.text
                        };
                        const $r = wt.createElement("div");
                        $r.classList.add(Jl("a"));
                        const vn = wt.createElement("div");
                        vn.classList.add(Jl("ap")),
                        vn.appendChild(this.alphaViews_.palette.element),
                        $r.appendChild(vn);
                        const zn = wt.createElement("div");
                        zn.classList.add(Jl("at")),
                        zn.appendChild(this.alphaViews_.text.element),
                        $r.appendChild(zn),
                        this.element.appendChild($r)
                    }
                }
                get allFocusableElements() {
                    const wt = [this.svPaletteView_.element, this.hPaletteView_.element, this.textView_.modeSelectElement, ...this.textView_.textViews.map(Rt => Rt.inputElement)];
                    return this.alphaViews_ && wt.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement),
                    wt
                }
            }
            function _h(Vt) {
                return Vt === "int" ? "int" : Vt === "float" ? "float" : void 0
            }
            function Qs(Vt) {
                const wt = hr;
                return gr(Vt, {
                    alpha: wt.optional.boolean,
                    color: wt.optional.object({
                        alpha: wt.optional.boolean,
                        type: wt.optional.custom(_h)
                    }),
                    expanded: wt.optional.boolean,
                    picker: wt.optional.custom(Q_)
                })
            }
            function na(Vt) {
                return Vt ? .1 : 1
            }
            function As(Vt) {
                var wt;
                return (wt = Vt.color) === null || wt === void 0 ? void 0 : wt.type
            }
            function Go(Vt, wt) {
                const Rt = Vt.match(/^(.+)%$/);
                return Math.min(Rt ? .01 * parseFloat(Rt[1]) * wt : parseFloat(Vt), wt)
            }
            const Z_ = {
                deg: Vt => Vt,
                grad: Vt => 360 * Vt / 400,
                rad: Vt => 360 * Vt / (2 * Math.PI),
                turn: Vt => 360 * Vt
            };
            function Zl(Vt) {
                const wt = Vt.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
                if (!wt)
                    return parseFloat(Vt);
                const Rt = parseFloat(wt[1])
                  , zt = wt[2];
                return Z_[zt](Rt)
            }
            function _u(Vt) {
                const wt = Vt.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!wt)
                    return null;
                const Rt = [Go(wt[1], 255), Go(wt[2], 255), Go(wt[3], 255)];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) ? null : Rt
            }
            function Ms(Vt) {
                return wt => {
                    const Rt = _u(wt);
                    return Rt ? new xo(Rt,"rgb",Vt) : null
                }
            }
            function qo(Vt) {
                const wt = Vt.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!wt)
                    return null;
                const Rt = [Go(wt[1], 255), Go(wt[2], 255), Go(wt[3], 255), Go(wt[4], 1)];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) || isNaN(Rt[3]) ? null : Rt
            }
            function em(Vt) {
                return wt => {
                    const Rt = qo(wt);
                    return Rt ? new xo(Rt,"rgb",Vt) : null
                }
            }
            function Fu(Vt) {
                const wt = Vt.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!wt)
                    return null;
                const Rt = [Zl(wt[1]), Go(wt[2], 100), Go(wt[3], 100)];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) ? null : Rt
            }
            function tm(Vt) {
                return wt => {
                    const Rt = Fu(wt);
                    return Rt ? new xo(Rt,"hsl",Vt) : null
                }
            }
            function Km(Vt) {
                const wt = Vt.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!wt)
                    return null;
                const Rt = [Zl(wt[1]), Go(wt[2], 100), Go(wt[3], 100), Go(wt[4], 1)];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) || isNaN(Rt[3]) ? null : Rt
            }
            function gp(Vt) {
                return wt => {
                    const Rt = Km(wt);
                    return Rt ? new xo(Rt,"hsl",Vt) : null
                }
            }
            function ws(Vt) {
                const wt = Vt.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
                if (wt)
                    return [parseInt(wt[1] + wt[1], 16), parseInt(wt[2] + wt[2], 16), parseInt(wt[3] + wt[3], 16)];
                const Rt = Vt.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
                return Rt ? [parseInt(Rt[1], 16), parseInt(Rt[2], 16), parseInt(Rt[3], 16)] : null
            }
            function oo(Vt) {
                const wt = Vt.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
                if (wt)
                    return [parseInt(wt[1] + wt[1], 16), parseInt(wt[2] + wt[2], 16), parseInt(wt[3] + wt[3], 16), No(parseInt(wt[4] + wt[4], 16), 0, 255, 0, 1)];
                const Rt = Vt.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
                return Rt ? [parseInt(Rt[1], 16), parseInt(Rt[2], 16), parseInt(Rt[3], 16), No(parseInt(Rt[4], 16), 0, 255, 0, 1)] : null
            }
            function ev(Vt) {
                const wt = Vt.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
                if (!wt)
                    return null;
                const Rt = [parseFloat(wt[1]), parseFloat(wt[2]), parseFloat(wt[3])];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) ? null : Rt
            }
            function mn(Vt) {
                return wt => {
                    const Rt = ev(wt);
                    return Rt ? new xo(Rt,"rgb",Vt) : null
                }
            }
            function lo(Vt) {
                const wt = Vt.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
                if (!wt)
                    return null;
                const Rt = [parseFloat(wt[1]), parseFloat(wt[2]), parseFloat(wt[3]), parseFloat(wt[4])];
                return isNaN(Rt[0]) || isNaN(Rt[1]) || isNaN(Rt[2]) || isNaN(Rt[3]) ? null : Rt
            }
            function rm(Vt) {
                return wt => {
                    const Rt = lo(wt);
                    return Rt ? new xo(Rt,"rgb",Vt) : null
                }
            }
            const tv = [{
                parser: ws,
                result: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "hex"
                }
            }, {
                parser: oo,
                result: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "hex"
                }
            }, {
                parser: _u,
                result: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "func"
                }
            }, {
                parser: qo,
                result: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "func"
                }
            }, {
                parser: Fu,
                result: {
                    alpha: !1,
                    mode: "hsl",
                    notation: "func"
                }
            }, {
                parser: Km,
                result: {
                    alpha: !0,
                    mode: "hsl",
                    notation: "func"
                }
            }, {
                parser: ev,
                result: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "object"
                }
            }, {
                parser: lo,
                result: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "object"
                }
            }];
            function Jm(Vt, wt="int") {
                const Rt = function(zt) {
                    return tv.reduce( (nr, {
parser: mr, result: Tr}) => nr || (mr(zt) ? Tr : null), null)
                }(Vt);
                return Rt ? Rt.notation === "hex" && wt !== "float" ? Object.assign(Object.assign({}, Rt), {
                    type: "int"
                }) : Rt.notation === "func" ? Object.assign(Object.assign({}, Rt), {
                    type: wt
                }) : null : null
            }
            const vu = {
                int: [function(Vt) {
                    const wt = ws(Vt);
                    return wt ? new xo(wt,"rgb","int") : null
                }
                , function(Vt) {
                    const wt = oo(Vt);
                    return wt ? new xo(wt,"rgb","int") : null
                }
                , Ms("int"), em("int"), tm("int"), gp("int"), mn("int"), rm("int")],
                float: [Ms("float"), em("float"), tm("float"), gp("float"), mn("float"), rm("float")]
            };
            function yu(Vt) {
                const wt = vu[Vt];
                return Rt => wt.reduce( (zt, nr) => zt || nr(Rt), null)
            }
            function Zm(Vt) {
                const wt = Wo(Math.floor(Vt), 0, 255).toString(16);
                return wt.length === 1 ? `0${
wt}` : wt
            }
            function _f(Vt, wt="#") {
                return `${
wt}${
gu(Vt.getComponents("rgb")).map(Zm).join("")}`
            }
            function xu(Vt, wt="#") {
                const Rt = Vt.getComponents("rgb");
                return `${
wt}${[Rt[0], Rt[1], Rt[2], 255 * Rt[3]].map(Zm).join("")}`
            }
            function _g(Vt, wt) {
                const Rt = ts(wt === "float" ? 2 : 0);
                return `rgb(${
gu(Vt.getComponents("rgb", wt)).map(zt => Rt(zt)).join(", ")})`
            }
            function rv(Vt) {
                return wt => _g(wt, Vt)
            }
            function bu(Vt, wt) {
                const Rt = ts(2)
                  , zt = ts(wt === "float" ? 2 : 0);
                return `rgba(${
Vt.getComponents("rgb", wt).map( (nr, mr) => (mr === 3 ? Rt : zt)(nr)).join(", ")})`
            }
            function R0(Vt) {
                return wt => bu(wt, Vt)
            }
            function Do(Vt, wt) {
                const Rt = ts(wt === "float" ? 2 : 0)
                  , zt = ["r", "g", "b"];
                return `{${
gu(Vt.getComponents("rgb", wt)).map( (nr, mr) => `${
zt[mr]}: ${
Rt(nr)}`).join(", ")}}`
            }
            function Uu(Vt) {
                return wt => Do(wt, Vt)
            }
            function nm(Vt, wt) {
                const Rt = ts(2)
                  , zt = ts(wt === "float" ? 2 : 0)
                  , nr = ["r", "g", "b", "a"];
                return `{${
Vt.getComponents("rgb", wt).map( (mr, Tr) => `${
nr[Tr]}: ${(Tr === 3 ? Rt : zt)(mr)}`).join(", ")}}`
            }
            function ju(Vt) {
                return wt => nm(wt, Vt)
            }
            const e_ = [{
                format: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "hex",
                    type: "int"
                },
                stringifier: _f
            }, {
                format: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "hex",
                    type: "int"
                },
                stringifier: xu
            }, {
                format: {
                    alpha: !1,
                    mode: "hsl",
                    notation: "func",
                    type: "int"
                },
                stringifier: function(Vt) {
                    const wt = [ts(0), up, up];
                    return `hsl(${
gu(Vt.getComponents("hsl")).map( (Rt, zt) => wt[zt](Rt)).join(", ")})`
                }
            }, {
                format: {
                    alpha: !0,
                    mode: "hsl",
                    notation: "func",
                    type: "int"
                },
                stringifier: function(Vt) {
                    const wt = [ts(0), up, up, ts(2)];
                    return `hsla(${
Vt.getComponents("hsl").map( (Rt, zt) => wt[zt](Rt)).join(", ")})`
                }
            }, ...["int", "float"].reduce( (Vt, wt) => [...Vt, {
                format: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "func",
                    type: wt
                },
                stringifier: rv(wt)
            }, {
                format: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "func",
                    type: wt
                },
                stringifier: R0(wt)
            }, {
                format: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "object",
                    type: wt
                },
                stringifier: Uu(wt)
            }, {
                format: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "object",
                    type: wt
                },
                stringifier: ju(wt)
            }], [])];
            function t_(Vt) {
                return e_.reduce( (wt, Rt) => {
                    return wt || (zt = Rt.format,
                    nr = Vt,
                    zt.alpha === nr.alpha && zt.mode === nr.mode && zt.notation === nr.notation && zt.type === nr.type ? Rt.stringifier : null);
                    var zt, nr
                }
                , null)
            }
            const ga = Et("apl");
            class r_ {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.value = Rt.value,
                    this.value.emitter.on("change", this.onValueChange_),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(ga()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    Rt.viewProps.bindTabIndex(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(ga("b")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("div");
                    nr.classList.add(ga("c")),
                    zt.appendChild(nr),
                    this.colorElem_ = nr;
                    const mr = wt.createElement("div");
                    mr.classList.add(ga("m")),
                    this.element.appendChild(mr),
                    this.markerElem_ = mr;
                    const Tr = wt.createElement("div");
                    Tr.classList.add(ga("p")),
                    this.markerElem_.appendChild(Tr),
                    this.previewElem_ = Tr,
                    this.update_()
                }
                update_() {
                    const wt = this.value.rawValue
                      , Rt = wt.getComponents("rgb")
                      , zt = new xo([Rt[0], Rt[1], Rt[2], 0],"rgb")
                      , nr = new xo([Rt[0], Rt[1], Rt[2], 255],"rgb")
                      , mr = ["to right", bu(zt), bu(nr)];
                    this.colorElem_.style.background = `linear-gradient(${
mr.join(",")})`,
                    this.previewElem_.style.backgroundColor = bu(wt);
                    const Tr = No(Rt[3], 0, 1, 0, 100);
                    this.markerElem_.style.left = `${
Tr}%`
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class I0 {
                constructor(wt, Rt) {
                    this.onKeyDown_ = this.onKeyDown_.bind(this),
                    this.onKeyUp_ = this.onKeyUp_.bind(this),
                    this.onPointerDown_ = this.onPointerDown_.bind(this),
                    this.onPointerMove_ = this.onPointerMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new r_(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.ptHandler_ = new ps(this.view.element),
                    this.ptHandler_.emitter.on("down", this.onPointerDown_),
                    this.ptHandler_.emitter.on("move", this.onPointerMove_),
                    this.ptHandler_.emitter.on("up", this.onPointerUp_),
                    this.view.element.addEventListener("keydown", this.onKeyDown_),
                    this.view.element.addEventListener("keyup", this.onKeyUp_)
                }
                handlePointerEvent_(wt, Rt) {
                    if (!wt.point)
                        return;
                    const zt = wt.point.x / wt.bounds.width
                      , nr = this.value.rawValue
                      , [mr,Tr,$r] = nr.getComponents("hsv");
                    this.value.setRawValue(new xo([mr, Tr, $r, zt],"hsv"), Rt)
                }
                onPointerDown_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerMove_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerUp_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onKeyDown_(wt) {
                    const Rt = Oo(na(!0), Xo(wt));
                    if (Rt === 0)
                        return;
                    const zt = this.value.rawValue
                      , [nr,mr,Tr,$r] = zt.getComponents("hsv");
                    this.value.setRawValue(new xo([nr, mr, Tr, $r + Rt],"hsv"), {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onKeyUp_(wt) {
                    Oo(na(!0), Xo(wt)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
            }
            const Ho = Et("coltxt");
            class Lo {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Ho()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(Ho("m")),
                    this.modeElem_ = function(Tr) {
                        const $r = Tr.createElement("select");
                        return $r.appendChild([{
                            text: "RGB",
                            value: "rgb"
                        }, {
                            text: "HSL",
                            value: "hsl"
                        }, {
                            text: "HSV",
                            value: "hsv"
                        }].reduce( (vn, zn) => {
                            const co = Tr.createElement("option");
                            return co.textContent = zn.text,
                            co.value = zn.value,
                            vn.appendChild(co),
                            vn
                        }
                        , Tr.createDocumentFragment())),
                        $r
                    }(wt),
                    this.modeElem_.classList.add(Ho("ms")),
                    zt.appendChild(this.modeSelectElement),
                    Rt.viewProps.bindDisabled(this.modeElem_);
                    const nr = wt.createElement("div");
                    nr.classList.add(Ho("mm")),
                    nr.appendChild(Wn(wt, "dropdown")),
                    zt.appendChild(nr),
                    this.element.appendChild(zt);
                    const mr = wt.createElement("div");
                    mr.classList.add(Ho("w")),
                    this.element.appendChild(mr),
                    this.textsElem_ = mr,
                    this.textViews_ = Rt.textViews,
                    this.applyTextViews_(),
                    It(Rt.colorMode, Tr => {
                        this.modeElem_.value = Tr
                    }
                    )
                }
                get modeSelectElement() {
                    return this.modeElem_
                }
                get textViews() {
                    return this.textViews_
                }
                set textViews(wt) {
                    this.textViews_ = wt,
                    this.applyTextViews_()
                }
                applyTextViews_() {
                    Ur(this.textsElem_);
                    const wt = this.element.ownerDocument;
                    this.textViews_.forEach(Rt => {
                        const zt = wt.createElement("div");
                        zt.classList.add(Ho("c")),
                        zt.appendChild(Rt.element),
                        this.textsElem_.appendChild(zt)
                    }
                    )
                }
            }
            function nv(Vt, wt, Rt) {
                const zt = Jp(Vt, wt)[Rt];
                return new Xl({
                    min: 0,
                    max: zt
                })
            }
            function Rs(Vt, wt, Rt) {
                return new pp(Vt,{
                    arrayPosition: Rt === 0 ? "fst" : Rt === 2 ? "lst" : "mid",
                    baseStep: na(!1),
                    parser: wt.parser,
                    props: ir.fromObject({
                        draggingScale: wt.colorType === "float" ? .01 : 1,
                        formatter: (zt = wt.colorType,
                        ts(zt === "float" ? 2 : 0))
                    }),
                    value: or(0, {
                        constraint: nv(wt.colorMode, wt.colorType, Rt)
                    }),
                    viewProps: wt.viewProps
                });
                var zt
            }
            class im {
                constructor(wt, Rt) {
                    this.onModeSelectChange_ = this.onModeSelectChange_.bind(this),
                    this.colorType_ = Rt.colorType,
                    this.parser_ = Rt.parser,
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.colorMode = or(this.value.rawValue.mode),
                    this.ccs_ = this.createComponentControllers_(wt),
                    this.view = new Lo(wt,{
                        colorMode: this.colorMode,
                        textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
                        viewProps: this.viewProps
                    }),
                    this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_)
                }
                createComponentControllers_(wt) {
                    const Rt = {
                        colorMode: this.colorMode.rawValue,
                        colorType: this.colorType_,
                        parser: this.parser_,
                        viewProps: this.viewProps
                    }
                      , zt = [Rs(wt, Rt, 0), Rs(wt, Rt, 1), Rs(wt, Rt, 2)];
                    return zt.forEach( (nr, mr) => {
                        Lu({
                            primary: this.value,
                            secondary: nr.value,
                            forward: Tr => Tr.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[mr],
                            backward: (Tr, $r) => {
                                const vn = this.colorMode.rawValue
                                  , zn = Tr.rawValue.getComponents(vn, this.colorType_);
                                return zn[mr] = $r.rawValue,
                                new xo(K_(gu(zn), zn[3]),vn,this.colorType_)
                            }
                        })
                    }
                    ),
                    zt
                }
                onModeSelectChange_(wt) {
                    const Rt = wt.currentTarget;
                    this.colorMode.rawValue = Rt.value,
                    this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument),
                    this.view.textViews = [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
                }
            }
            const n_ = Et("hpl");
            class i_ {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.value = Rt.value,
                    this.value.emitter.on("change", this.onValueChange_),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(n_()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    Rt.viewProps.bindTabIndex(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(n_("c")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("div");
                    nr.classList.add(n_("m")),
                    this.element.appendChild(nr),
                    this.markerElem_ = nr,
                    this.update_()
                }
                update_() {
                    const wt = this.value.rawValue
                      , [Rt] = wt.getComponents("hsv");
                    this.markerElem_.style.backgroundColor = _g(new xo([Rt, 100, 100],"hsv"));
                    const zt = No(Rt, 0, 360, 0, 100);
                    this.markerElem_.style.left = `${
zt}%`
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class k0 {
                constructor(wt, Rt) {
                    this.onKeyDown_ = this.onKeyDown_.bind(this),
                    this.onKeyUp_ = this.onKeyUp_.bind(this),
                    this.onPointerDown_ = this.onPointerDown_.bind(this),
                    this.onPointerMove_ = this.onPointerMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new i_(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.ptHandler_ = new ps(this.view.element),
                    this.ptHandler_.emitter.on("down", this.onPointerDown_),
                    this.ptHandler_.emitter.on("move", this.onPointerMove_),
                    this.ptHandler_.emitter.on("up", this.onPointerUp_),
                    this.view.element.addEventListener("keydown", this.onKeyDown_),
                    this.view.element.addEventListener("keyup", this.onKeyUp_)
                }
                handlePointerEvent_(wt, Rt) {
                    if (!wt.point)
                        return;
                    const zt = No(Wo(wt.point.x, 0, wt.bounds.width), 0, wt.bounds.width, 0, 360)
                      , nr = this.value.rawValue
                      , [,mr,Tr,$r] = nr.getComponents("hsv");
                    this.value.setRawValue(new xo([zt, mr, Tr, $r],"hsv"), Rt)
                }
                onPointerDown_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerMove_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerUp_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onKeyDown_(wt) {
                    const Rt = Oo(na(!1), Xo(wt));
                    if (Rt === 0)
                        return;
                    const zt = this.value.rawValue
                      , [nr,mr,Tr,$r] = zt.getComponents("hsv");
                    this.value.setRawValue(new xo([nr + Rt, mr, Tr, $r],"hsv"), {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onKeyUp_(wt) {
                    Oo(na(!1), Xo(wt)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
            }
            const o_ = Et("svp");
            class Is {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.value = Rt.value,
                    this.value.emitter.on("change", this.onValueChange_),
                    this.element = wt.createElement("div"),
                    this.element.classList.add(o_()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    Rt.viewProps.bindTabIndex(this.element);
                    const zt = wt.createElement("canvas");
                    zt.height = 64,
                    zt.width = 64,
                    zt.classList.add(o_("c")),
                    this.element.appendChild(zt),
                    this.canvasElement = zt;
                    const nr = wt.createElement("div");
                    nr.classList.add(o_("m")),
                    this.element.appendChild(nr),
                    this.markerElem_ = nr,
                    this.update_()
                }
                update_() {
                    const wt = function(zn) {
                        const co = zn.ownerDocument.defaultView;
                        return co && "document"in co ? zn.getContext("2d", {
                            willReadFrequently: !0
                        }) : null
                    }(this.canvasElement);
                    if (!wt)
                        return;
                    const Rt = this.value.rawValue.getComponents("hsv")
                      , zt = this.canvasElement.width
                      , nr = this.canvasElement.height
                      , mr = wt.getImageData(0, 0, zt, nr)
                      , Tr = mr.data;
                    for (let zn = 0; zn < nr; zn++)
                        for (let co = 0; co < zt; co++) {
                            const is = No(co, 0, zt, 0, 100)
                              , Ts = No(zn, 0, nr, 100, 0)
                              , ks = Nu(Rt[0], is, Ts)
                              , Fn = 4 * (zn * zt + co);
                            Tr[Fn] = ks[0],
                            Tr[Fn + 1] = ks[1],
                            Tr[Fn + 2] = ks[2],
                            Tr[Fn + 3] = 255
                        }
                    wt.putImageData(mr, 0, 0);
                    const $r = No(Rt[1], 0, 100, 0, 100);
                    this.markerElem_.style.left = `${$r}%`;
                    const vn = No(Rt[2], 0, 100, 100, 0);
                    this.markerElem_.style.top = `${
vn}%`
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class Er {
                constructor(wt, Rt) {
                    this.onKeyDown_ = this.onKeyDown_.bind(this),
                    this.onKeyUp_ = this.onKeyUp_.bind(this),
                    this.onPointerDown_ = this.onPointerDown_.bind(this),
                    this.onPointerMove_ = this.onPointerMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new Is(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.ptHandler_ = new ps(this.view.element),
                    this.ptHandler_.emitter.on("down", this.onPointerDown_),
                    this.ptHandler_.emitter.on("move", this.onPointerMove_),
                    this.ptHandler_.emitter.on("up", this.onPointerUp_),
                    this.view.element.addEventListener("keydown", this.onKeyDown_),
                    this.view.element.addEventListener("keyup", this.onKeyUp_)
                }
                handlePointerEvent_(wt, Rt) {
                    if (!wt.point)
                        return;
                    const zt = No(wt.point.x, 0, wt.bounds.width, 0, 100)
                      , nr = No(wt.point.y, 0, wt.bounds.height, 100, 0)
                      , [mr,,,Tr] = this.value.rawValue.getComponents("hsv");
                    this.value.setRawValue(new xo([mr, zt, nr, Tr],"hsv"), Rt)
                }
                onPointerDown_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerMove_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerUp_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onKeyDown_(wt) {
                    dp(wt.key) && wt.preventDefault();
                    const [Rt,zt,nr,mr] = this.value.rawValue.getComponents("hsv")
                      , Tr = na(!1)
                      , $r = Oo(Tr, Xo(wt))
                      , vn = Oo(Tr, jo(wt));
                    $r === 0 && vn === 0 || this.value.setRawValue(new xo([Rt, zt + $r, nr + vn, mr],"hsv"), {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onKeyUp_(wt) {
                    const Rt = na(!1)
                      , zt = Oo(Rt, Xo(wt))
                      , nr = Oo(Rt, jo(wt));
                    zt === 0 && nr === 0 || this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
            }
            class s_ {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.hPaletteC_ = new k0(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.svPaletteC_ = new Er(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.alphaIcs_ = Rt.supportsAlpha ? {
                        palette: new I0(wt,{
                            value: this.value,
                            viewProps: this.viewProps
                        }),
                        text: new pp(wt,{
                            parser: Ll,
                            baseStep: .1,
                            props: ir.fromObject({
                                draggingScale: .01,
                                formatter: ts(2)
                            }),
                            value: or(0, {
                                constraint: new Xl({
                                    min: 0,
                                    max: 1
                                })
                            }),
                            viewProps: this.viewProps
                        })
                    } : null,
                    this.alphaIcs_ && Lu({
                        primary: this.value,
                        secondary: this.alphaIcs_.text.value,
                        forward: zt => zt.rawValue.getComponents()[3],
                        backward: (zt, nr) => {
                            const mr = zt.rawValue.getComponents();
                            return mr[3] = nr.rawValue,
                            new xo(mr,zt.rawValue.mode)
                        }
                    }),
                    this.textC_ = new im(wt,{
                        colorType: Rt.colorType,
                        parser: Ll,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view = new Ym(wt,{
                        alphaViews: this.alphaIcs_ ? {
                            palette: this.alphaIcs_.palette.view,
                            text: this.alphaIcs_.text.view
                        } : null,
                        hPaletteView: this.hPaletteC_.view,
                        supportsAlpha: Rt.supportsAlpha,
                        svPaletteView: this.svPaletteC_.view,
                        textView: this.textC_.view,
                        viewProps: this.viewProps
                    })
                }
                get textController() {
                    return this.textC_
                }
            }
            const om = Et("colsw");
            class Tl {
                constructor(wt, Rt) {
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    Rt.value.emitter.on("change", this.onValueChange_),
                    this.value = Rt.value,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(om()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(om("sw")),
                    this.element.appendChild(zt),
                    this.swatchElem_ = zt;
                    const nr = wt.createElement("button");
                    nr.classList.add(om("b")),
                    Rt.viewProps.bindDisabled(nr),
                    this.element.appendChild(nr),
                    this.buttonElement = nr,
                    this.update_()
                }
                update_() {
                    const wt = this.value.rawValue;
                    this.swatchElem_.style.backgroundColor = xu(wt)
                }
                onValueChange_() {
                    this.update_()
                }
            }
            class Nl {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new Tl(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    })
                }
            }
            class xa {
                constructor(wt, Rt) {
                    this.onButtonBlur_ = this.onButtonBlur_.bind(this),
                    this.onButtonClick_ = this.onButtonClick_.bind(this),
                    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
                    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.foldable_ = Or.create(Rt.expanded),
                    this.swatchC_ = new Nl(wt,{
                        value: this.value,
                        viewProps: this.viewProps
                    });
                    const zt = this.swatchC_.view.buttonElement;
                    zt.addEventListener("blur", this.onButtonBlur_),
                    zt.addEventListener("click", this.onButtonClick_),
                    this.textC_ = new Iu(wt,{
                        parser: Rt.parser,
                        props: ir.fromObject({
                            formatter: Rt.formatter
                        }),
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view = new Y_(wt,{
                        foldable: this.foldable_,
                        pickerLayout: Rt.pickerLayout
                    }),
                    this.view.swatchElement.appendChild(this.swatchC_.view.element),
                    this.view.textElement.appendChild(this.textC_.view.element),
                    this.popC_ = Rt.pickerLayout === "popup" ? new Hp(wt,{
                        viewProps: this.viewProps
                    }) : null;
                    const nr = new s_(wt,{
                        colorType: Rt.colorType,
                        supportsAlpha: Rt.supportsAlpha,
                        value: this.value,
                        viewProps: this.viewProps
                    });
                    nr.view.allFocusableElements.forEach(mr => {
                        mr.addEventListener("blur", this.onPopupChildBlur_),
                        mr.addEventListener("keydown", this.onPopupChildKeydown_)
                    }
                    ),
                    this.pickerC_ = nr,
                    this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
                    this.popC_.view.element.appendChild(nr.view.element),
                    Lu({
                        primary: this.foldable_.value("expanded"),
                        secondary: this.popC_.shows,
                        forward: mr => mr.rawValue,
                        backward: (mr, Tr) => Tr.rawValue
                    })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
                    gn(this.foldable_, this.view.pickerElement))
                }
                get textController() {
                    return this.textC_
                }
                onButtonBlur_(wt) {
                    if (!this.popC_)
                        return;
                    const Rt = this.view.element
                      , zt = wt.relatedTarget;
                    zt && Rt.contains(zt) || (this.popC_.shows.rawValue = !1)
                }
                onButtonClick_() {
                    this.foldable_.set("expanded", !this.foldable_.get("expanded")),
                    this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
                }
                onPopupChildBlur_(wt) {
                    if (!this.popC_)
                        return;
                    const Rt = this.popC_.view.element
                      , zt = nn(wt);
                    zt && Rt.contains(zt) || zt && zt === this.swatchC_.view.buttonElement && !rn(Rt.ownerDocument) || (this.popC_.shows.rawValue = !1)
                }
                onPopupChildKeydown_(wt) {
                    this.popC_ ? wt.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && wt.key === "Escape" && this.swatchC_.view.buttonElement.focus()
                }
            }
            function Vu(Vt) {
                return gu(Vt.getComponents("rgb")).reduce( (wt, Rt) => wt << 8 | 255 & Math.floor(Rt), 0)
            }
            function Gu(Vt) {
                return Vt.getComponents("rgb").reduce( (wt, Rt, zt) => wt << 8 | 255 & Math.floor(zt === 3 ? 255 * Rt : Rt), 0) >>> 0
            }
            function zu(Vt) {
                return typeof Vt != "number" ? xo.black() : new xo([(wt = Vt) >> 16 & 255, wt >> 8 & 255, 255 & wt],"rgb");
                var wt
            }
            function Hu(Vt) {
                return typeof Vt != "number" ? xo.black() : new xo([(wt = Vt) >> 24 & 255, wt >> 16 & 255, wt >> 8 & 255, No(255 & wt, 0, 255, 0, 1)],"rgb");
                var wt
            }
            function Cl(Vt) {
                var wt;
                return !(!(Vt != null && Vt.alpha) && !(!((wt = Vt == null ? void 0 : Vt.color) === null || wt === void 0) && wt.alpha))
            }
            function _c(Vt) {
                return Vt ? wt => xu(wt, "0x") : wt => _f(wt, "0x")
            }
            const Au = {
                id: "input-color-number",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "number" || !function(zt) {
                        return "color"in zt || "view"in zt && zt.view === "color"
                    }(wt))
                        return null;
                    const Rt = Qs(wt);
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Cl(Vt.params) ? Hu : zu,
                    equals: xo.equals,
                    writer: Vt => function(wt) {
                        const Rt = wt ? Gu : Vu;
                        return (zt, nr) => {
                            hp(zt, Rt(nr))
                        }
                    }(Cl(Vt.params))
                },
                controller: Vt => {
                    const wt = Cl(Vt.params)
                      , Rt = "expanded"in Vt.params ? Vt.params.expanded : void 0
                      , zt = "picker"in Vt.params ? Vt.params.picker : void 0;
                    return new xa(Vt.document,{
                        colorType: "int",
                        expanded: Rt != null && Rt,
                        formatter: _c(wt),
                        parser: yu("int"),
                        pickerLayout: zt ?? "popup",
                        supportsAlpha: wt,
                        value: Vt.value,
                        viewProps: Vt.viewProps
                    })
                }
            };
            function _p(Vt) {
                return wt => function(Rt, zt) {
                    return xo.isColorObject(Rt) ? xo.fromObject(Rt, zt) : xo.black(zt)
                }(wt, Vt)
            }
            function sm(Vt, wt) {
                return Rt => Vt ? nm(Rt, wt) : Do(Rt, wt)
            }
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
            class Pl {
                constructor(wt) {
                    this.components = wt.components,
                    this.asm_ = wt.assembly
                }
                constrain(wt) {
                    const Rt = this.asm_.toComponents(wt).map( (zt, nr) => {
                        var mr, Tr;
                        return (Tr = (mr = this.components[nr]) === null || mr === void 0 ? void 0 : mr.constrain(zt)) !== null && Tr !== void 0 ? Tr : zt
                    }
                    );
                    return this.asm_.fromComponents(Rt)
                }
            }
            const iv = Et("pndtxt");
            class vp {
                constructor(wt, Rt) {
                    this.textViews = Rt.textViews,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(iv()),
                    this.textViews.forEach(zt => {
                        const nr = wt.createElement("div");
                        nr.classList.add(iv("a")),
                        nr.appendChild(zt.element),
                        this.element.appendChild(nr)
                    }
                    )
                }
            }
            class yp {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.acs_ = Rt.axes.map( (zt, nr) => function(mr, Tr, $r) {
                        return new pp(mr,{
                            arrayPosition: $r === 0 ? "fst" : $r === Tr.axes.length - 1 ? "lst" : "mid",
                            baseStep: Tr.axes[$r].baseStep,
                            parser: Tr.parser,
                            props: Tr.axes[$r].textProps,
                            value: or(0, {
                                constraint: Tr.axes[$r].constraint
                            }),
                            viewProps: Tr.viewProps
                        })
                    }(wt, Rt, nr)),
                    this.acs_.forEach( (zt, nr) => {
                        Lu({
                            primary: this.value,
                            secondary: zt.value,
                            forward: mr => Rt.assembly.toComponents(mr.rawValue)[nr],
                            backward: (mr, Tr) => {
                                const $r = Rt.assembly.toComponents(mr.rawValue);
                                return $r[nr] = Tr.rawValue,
                                Rt.assembly.fromComponents($r)
                            }
                        })
                    }
                    ),
                    this.view = new vp(wt,{
                        textViews: this.acs_.map(zt => zt.view)
                    })
                }
            }
            function Ws(Vt, wt) {
                return "step"in Vt && !at(Vt.step) ? new Ru(Vt.step,wt) : null
            }
            function Ml(Vt) {
                return at(Vt.max) || at(Vt.min) ? at(Vt.max) && at(Vt.min) ? null : new Gp({
                    max: Vt.max,
                    min: Vt.min
                }) : new Xl({
                    max: Vt.max,
                    min: Vt.min
                })
            }
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
            class ba {
                constructor(wt=0, Rt=0) {
                    this.x = wt,
                    this.y = Rt
                }
                getComponents() {
                    return [this.x, this.y]
                }
                static isObject(wt) {
                    if (at(wt))
                        return !1;
                    const Rt = wt.x
                      , zt = wt.y;
                    return typeof Rt == "number" && typeof zt == "number"
                }
                static equals(wt, Rt) {
                    return wt.x === Rt.x && wt.y === Rt.y
                }
                toObject() {
                    return {
                        x: this.x,
                        y: this.y
                    }
                }
            }
            const Fl = {
                toComponents: Vt => Vt.getComponents(),
                fromComponents: Vt => new ba(...Vt)
            }
              , eu = Et("p2d");
            class lm {
                constructor(wt, Rt) {
                    this.element = wt.createElement("div"),
                    this.element.classList.add(eu()),
                    Rt.viewProps.bindClassModifiers(this.element),
                    It(Rt.expanded, Gt(this.element, eu(void 0, "expanded")));
                    const zt = wt.createElement("div");
                    zt.classList.add(eu("h")),
                    this.element.appendChild(zt);
                    const nr = wt.createElement("button");
                    nr.classList.add(eu("b")),
                    nr.appendChild(Wn(wt, "p2dpad")),
                    Rt.viewProps.bindDisabled(nr),
                    zt.appendChild(nr),
                    this.buttonElement = nr;
                    const mr = wt.createElement("div");
                    if (mr.classList.add(eu("t")),
                    zt.appendChild(mr),
                    this.textElement = mr,
                    Rt.pickerLayout === "inline") {
                        const Tr = wt.createElement("div");
                        Tr.classList.add(eu("p")),
                        this.element.appendChild(Tr),
                        this.pickerElement = Tr
                    } else
                        this.pickerElement = null
                }
            }
            const Rl = Et("p2dp");
            class Qu {
                constructor(wt, Rt) {
                    this.onFoldableChange_ = this.onFoldableChange_.bind(this),
                    this.onValueChange_ = this.onValueChange_.bind(this),
                    this.invertsY_ = Rt.invertsY,
                    this.maxValue_ = Rt.maxValue,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(Rl()),
                    Rt.layout === "popup" && this.element.classList.add(Rl(void 0, "p")),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("div");
                    zt.classList.add(Rl("p")),
                    Rt.viewProps.bindTabIndex(zt),
                    this.element.appendChild(zt),
                    this.padElement = zt;
                    const nr = wt.createElementNS(vr, "svg");
                    nr.classList.add(Rl("g")),
                    this.padElement.appendChild(nr),
                    this.svgElem_ = nr;
                    const mr = wt.createElementNS(vr, "line");
                    mr.classList.add(Rl("ax")),
                    mr.setAttributeNS(null, "x1", "0"),
                    mr.setAttributeNS(null, "y1", "50%"),
                    mr.setAttributeNS(null, "x2", "100%"),
                    mr.setAttributeNS(null, "y2", "50%"),
                    this.svgElem_.appendChild(mr);
                    const Tr = wt.createElementNS(vr, "line");
                    Tr.classList.add(Rl("ax")),
                    Tr.setAttributeNS(null, "x1", "50%"),
                    Tr.setAttributeNS(null, "y1", "0"),
                    Tr.setAttributeNS(null, "x2", "50%"),
                    Tr.setAttributeNS(null, "y2", "100%"),
                    this.svgElem_.appendChild(Tr);
                    const $r = wt.createElementNS(vr, "line");
                    $r.classList.add(Rl("l")),
                    $r.setAttributeNS(null, "x1", "50%"),
                    $r.setAttributeNS(null, "y1", "50%"),
                    this.svgElem_.appendChild($r),
                    this.lineElem_ = $r;
                    const vn = wt.createElement("div");
                    vn.classList.add(Rl("m")),
                    this.padElement.appendChild(vn),
                    this.markerElem_ = vn,
                    Rt.value.emitter.on("change", this.onValueChange_),
                    this.value = Rt.value,
                    this.update_()
                }
                get allFocusableElements() {
                    return [this.padElement]
                }
                update_() {
                    const [wt,Rt] = this.value.rawValue.getComponents()
                      , zt = this.maxValue_
                      , nr = No(wt, -zt, +zt, 0, 100)
                      , mr = No(Rt, -zt, +zt, 0, 100)
                      , Tr = this.invertsY_ ? 100 - mr : mr;
                    this.lineElem_.setAttributeNS(null, "x2", `${
nr}%`),
                    this.lineElem_.setAttributeNS(null, "y2", `${
Tr}%`),
                    this.markerElem_.style.left = `${
nr}%`,
                    this.markerElem_.style.top = `${
Tr}%`
                }
                onValueChange_() {
                    this.update_()
                }
                onFoldableChange_() {
                    this.update_()
                }
            }
            function no(Vt, wt, Rt) {
                return [Oo(wt[0], Xo(Vt)), Oo(wt[1], jo(Vt)) * (Rt ? 1 : -1)]
            }
            class Wu {
                constructor(wt, Rt) {
                    this.onPadKeyDown_ = this.onPadKeyDown_.bind(this),
                    this.onPadKeyUp_ = this.onPadKeyUp_.bind(this),
                    this.onPointerDown_ = this.onPointerDown_.bind(this),
                    this.onPointerMove_ = this.onPointerMove_.bind(this),
                    this.onPointerUp_ = this.onPointerUp_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.baseSteps_ = Rt.baseSteps,
                    this.maxValue_ = Rt.maxValue,
                    this.invertsY_ = Rt.invertsY,
                    this.view = new Qu(wt,{
                        invertsY: this.invertsY_,
                        layout: Rt.layout,
                        maxValue: this.maxValue_,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.ptHandler_ = new ps(this.view.padElement),
                    this.ptHandler_.emitter.on("down", this.onPointerDown_),
                    this.ptHandler_.emitter.on("move", this.onPointerMove_),
                    this.ptHandler_.emitter.on("up", this.onPointerUp_),
                    this.view.padElement.addEventListener("keydown", this.onPadKeyDown_),
                    this.view.padElement.addEventListener("keyup", this.onPadKeyUp_)
                }
                handlePointerEvent_(wt, Rt) {
                    if (!wt.point)
                        return;
                    const zt = this.maxValue_
                      , nr = No(wt.point.x, 0, wt.bounds.width, -zt, +zt)
                      , mr = No(this.invertsY_ ? wt.bounds.height - wt.point.y : wt.point.y, 0, wt.bounds.height, -zt, +zt);
                    this.value.setRawValue(new ba(nr,mr), Rt)
                }
                onPointerDown_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerMove_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPointerUp_(wt) {
                    this.handlePointerEvent_(wt.data, {
                        forceEmit: !0,
                        last: !0
                    })
                }
                onPadKeyDown_(wt) {
                    dp(wt.key) && wt.preventDefault();
                    const [Rt,zt] = no(wt, this.baseSteps_, this.invertsY_);
                    Rt === 0 && zt === 0 || this.value.setRawValue(new ba(this.value.rawValue.x + Rt,this.value.rawValue.y + zt), {
                        forceEmit: !1,
                        last: !1
                    })
                }
                onPadKeyUp_(wt) {
                    const [Rt,zt] = no(wt, this.baseSteps_, this.invertsY_);
                    Rt === 0 && zt === 0 || this.value.setRawValue(this.value.rawValue, {
                        forceEmit: !0,
                        last: !0
                    })
                }
            }
            class $a {
                constructor(wt, Rt) {
                    var zt, nr;
                    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
                    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
                    this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this),
                    this.onPadButtonClick_ = this.onPadButtonClick_.bind(this),
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.foldable_ = Or.create(Rt.expanded),
                    this.popC_ = Rt.pickerLayout === "popup" ? new Hp(wt,{
                        viewProps: this.viewProps
                    }) : null;
                    const mr = new Wu(wt,{
                        baseSteps: [Rt.axes[0].baseStep, Rt.axes[1].baseStep],
                        invertsY: Rt.invertsY,
                        layout: Rt.pickerLayout,
                        maxValue: Rt.maxValue,
                        value: this.value,
                        viewProps: this.viewProps
                    });
                    mr.view.allFocusableElements.forEach(Tr => {
                        Tr.addEventListener("blur", this.onPopupChildBlur_),
                        Tr.addEventListener("keydown", this.onPopupChildKeydown_)
                    }
                    ),
                    this.pickerC_ = mr,
                    this.textC_ = new yp(wt,{
                        assembly: Fl,
                        axes: Rt.axes,
                        parser: Rt.parser,
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    this.view = new lm(wt,{
                        expanded: this.foldable_.value("expanded"),
                        pickerLayout: Rt.pickerLayout,
                        viewProps: this.viewProps
                    }),
                    this.view.textElement.appendChild(this.textC_.view.element),
                    (zt = this.view.buttonElement) === null || zt === void 0 || zt.addEventListener("blur", this.onPadButtonBlur_),
                    (nr = this.view.buttonElement) === null || nr === void 0 || nr.addEventListener("click", this.onPadButtonClick_),
                    this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
                    this.popC_.view.element.appendChild(this.pickerC_.view.element),
                    Lu({
                        primary: this.foldable_.value("expanded"),
                        secondary: this.popC_.shows,
                        forward: Tr => Tr.rawValue,
                        backward: (Tr, $r) => $r.rawValue
                    })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
                    gn(this.foldable_, this.view.pickerElement))
                }
                onPadButtonBlur_(wt) {
                    if (!this.popC_)
                        return;
                    const Rt = this.view.element
                      , zt = wt.relatedTarget;
                    zt && Rt.contains(zt) || (this.popC_.shows.rawValue = !1)
                }
                onPadButtonClick_() {
                    this.foldable_.set("expanded", !this.foldable_.get("expanded")),
                    this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
                }
                onPopupChildBlur_(wt) {
                    if (!this.popC_)
                        return;
                    const Rt = this.popC_.view.element
                      , zt = nn(wt);
                    zt && Rt.contains(zt) || zt && zt === this.view.buttonElement && !rn(Rt.ownerDocument) || (this.popC_.shows.rawValue = !1)
                }
                onPopupChildKeydown_(wt) {
                    this.popC_ ? wt.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && wt.key === "Escape" && this.view.buttonElement.focus()
                }
            }
            class qu {
                constructor(wt=0, Rt=0, zt=0) {
                    this.x = wt,
                    this.y = Rt,
                    this.z = zt
                }
                getComponents() {
                    return [this.x, this.y, this.z]
                }
                static isObject(wt) {
                    if (at(wt))
                        return !1;
                    const Rt = wt.x
                      , zt = wt.y
                      , nr = wt.z;
                    return typeof Rt == "number" && typeof zt == "number" && typeof nr == "number"
                }
                static equals(wt, Rt) {
                    return wt.x === Rt.x && wt.y === Rt.y && wt.z === Rt.z
                }
                toObject() {
                    return {
                        x: this.x,
                        y: this.y,
                        z: this.z
                    }
                }
            }
            const ov = {
                toComponents: Vt => Vt.getComponents(),
                fromComponents: Vt => new qu(...Vt)
            };
            function tu(Vt) {
                return qu.isObject(Vt) ? new qu(Vt.x,Vt.y,Vt.z) : new qu
            }
            function cm(Vt, wt) {
                Vt.writeProperty("x", wt.x),
                Vt.writeProperty("y", wt.y),
                Vt.writeProperty("z", wt.z)
            }
            function Ss(Vt, wt) {
                return {
                    baseStep: mu(wt),
                    constraint: wt,
                    textProps: ir.fromObject({
                        draggingScale: fu(wt, Vt),
                        formatter: ts(mp(wt, Vt))
                    })
                }
            }
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
            class Su {
                constructor(wt=0, Rt=0, zt=0, nr=0) {
                    this.x = wt,
                    this.y = Rt,
                    this.z = zt,
                    this.w = nr
                }
                getComponents() {
                    return [this.x, this.y, this.z, this.w]
                }
                static isObject(wt) {
                    if (at(wt))
                        return !1;
                    const Rt = wt.x
                      , zt = wt.y
                      , nr = wt.z
                      , mr = wt.w;
                    return typeof Rt == "number" && typeof zt == "number" && typeof nr == "number" && typeof mr == "number"
                }
                static equals(wt, Rt) {
                    return wt.x === Rt.x && wt.y === Rt.y && wt.z === Rt.z && wt.w === Rt.w
                }
                toObject() {
                    return {
                        x: this.x,
                        y: this.y,
                        z: this.z,
                        w: this.w
                    }
                }
            }
            const $u = {
                toComponents: Vt => Vt.getComponents(),
                fromComponents: Vt => new Su(...Vt)
            };
            function um(Vt) {
                return Su.isObject(Vt) ? new Su(Vt.x,Vt.y,Vt.z,Vt.w) : new Su
            }
            function D0(Vt, wt) {
                Vt.writeProperty("x", wt.x),
                Vt.writeProperty("y", wt.y),
                Vt.writeProperty("z", wt.z),
                Vt.writeProperty("w", wt.w)
            }
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
                            var mr, Tr
                        }
                        ),
                        parser: Ll,
                        value: wt,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , Xu = {
                id: "input-string",
                type: "input",
                accept: (Vt, wt) => {
                    if (typeof Vt != "string")
                        return null;
                    const Rt = gr(wt, {
                        options: hr.optional.custom(Kp)
                    });
                    return Rt ? {
                        initialValue: Vt,
                        params: Rt
                    } : null
                }
                ,
                binding: {
                    reader: Vt => Qm,
                    constraint: Vt => function(wt) {
                        const Rt = []
                          , zt = Xm(wt.options);
                        return zt && Rt.push(zt),
                        new lu(Rt)
                    }(Vt.params),
                    writer: Vt => hp
                },
                controller: Vt => {
                    const wt = Vt.document
                      , Rt = Vt.value
                      , zt = Vt.constraint
                      , nr = zt && Zs(zt, cu);
                    return nr ? new uu(wt,{
                        props: new ir({
                            options: nr.values.value("options")
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    }) : new Iu(wt,{
                        parser: mr => mr,
                        props: ir.fromObject({
                            formatter: El
                        }),
                        value: Rt,
                        viewProps: Vt.viewProps
                    })
                }
            }
              , Ns = {
                defaultInterval: 200,
                defaultLineCount: 3
            }
              , xp = Et("mll");
            class bp {
                constructor(wt, Rt) {
                    this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                    this.formatter_ = Rt.formatter,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(xp()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("textarea");
                    zt.classList.add(xp("i")),
                    zt.style.height = `calc(var(--bld-us) * ${
Rt.lineCount})`,
                    zt.readOnly = !0,
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.textareaElem_ = zt,
                    Rt.value.emitter.on("change", this.onValueUpdate_),
                    this.value = Rt.value,
                    this.update_()
                }
                update_() {
                    const wt = this.textareaElem_
                      , Rt = wt.scrollTop === wt.scrollHeight - wt.clientHeight
                      , zt = [];
                    this.value.rawValue.forEach(nr => {
                        nr !== void 0 && zt.push(this.formatter_(nr))
                    }
                    ),
                    wt.textContent = zt.join(`
`),
                    Rt && (wt.scrollTop = wt.scrollHeight)
                }
                onValueUpdate_() {
                    this.update_()
                }
            }
            class l_ {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new bp(wt,{
                        formatter: Rt.formatter,
                        lineCount: Rt.lineCount,
                        value: this.value,
                        viewProps: this.viewProps
                    })
                }
            }
            const lv = Et("sgl");
            class cv {
                constructor(wt, Rt) {
                    this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                    this.formatter_ = Rt.formatter,
                    this.element = wt.createElement("div"),
                    this.element.classList.add(lv()),
                    Rt.viewProps.bindClassModifiers(this.element);
                    const zt = wt.createElement("input");
                    zt.classList.add(lv("i")),
                    zt.readOnly = !0,
                    zt.type = "text",
                    Rt.viewProps.bindDisabled(zt),
                    this.element.appendChild(zt),
                    this.inputElement = zt,
                    Rt.value.emitter.on("change", this.onValueUpdate_),
                    this.value = Rt.value,
                    this.update_()
                }
                update_() {
                    const wt = this.value.rawValue
                      , Rt = wt[wt.length - 1];
                    this.inputElement.value = Rt !== void 0 ? this.formatter_(Rt) : ""
                }
                onValueUpdate_() {
                    this.update_()
                }
            }
            class dm {
                constructor(wt, Rt) {
                    this.value = Rt.value,
                    this.viewProps = Rt.viewProps,
                    this.view = new cv(wt,{
                        formatter: Rt.formatter,
                        value: this.value,
                        viewProps: this.viewProps
                    })
                }
            }
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
                    zt.style.height = `calc(var(--bld-us) * ${
Rt.lineCount})`,
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
                    Tr.style.left = `${
vn}
px`,
                    Tr.style.top = `${
zn}
px`,
                    Tr.textContent = `${
this.formatter_($r)}`,
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
            function Yu(Vt, wt) {
                return wt === 0 ? new bs : new Bl(Vt,wt ?? Ns.defaultInterval)
            }
            class Ku {
                constructor() {
                    this.pluginsMap_ = {
                        blades: [],
                        inputs: [],
                        monitors: []
                    }
                }
                getAll() {
                    return [...this.pluginsMap_.blades, ...this.pluginsMap_.inputs, ...this.pluginsMap_.monitors]
                }
                register(wt) {
                    wt.type === "blade" ? this.pluginsMap_.blades.unshift(wt) : wt.type === "input" ? this.pluginsMap_.inputs.unshift(wt) : wt.type === "monitor" && this.pluginsMap_.monitors.unshift(wt)
                }
                createInput(wt, Rt, zt) {
                    if (at(Rt.read()))
                        throw new _t({
                            context: {
                                key: Rt.key
                            },
                            type: "nomatchingcontroller"
                        });
                    const nr = this.pluginsMap_.inputs.reduce( (mr, Tr) => mr ?? function($r, vn) {
                        var zn;
                        const co = $r.accept(vn.target.read(), vn.params);
                        if (at(co))
                            return null;
                        const is = hr
                          , Ts = {
                            target: vn.target,
                            initialValue: co.initialValue,
                            params: co.params
                        }
                          , ks = $r.binding.reader(Ts)
                          , Fn = $r.binding.constraint ? $r.binding.constraint(Ts) : void 0
                          , m_ = or(ks(co.initialValue), {
                            constraint: Fn,
                            equals: $r.binding.equals
                        })
                          , fm = new Bm({
                            reader: ks,
                            target: vn.target,
                            value: m_,
                            writer: $r.binding.writer(Ts)
                        })
                          , Ds = is.optional.boolean(vn.params.disabled).value
                          , Ju = is.optional.boolean(vn.params.hidden).value
                          , Gl = $r.controller({
                            constraint: Fn,
                            document: vn.document,
                            initialValue: co.initialValue,
                            params: co.params,
                            value: fm.value,
                            viewProps: Rr.create({
                                disabled: Ds,
                                hidden: Ju
                            })
                        });
                        return new Cn(vn.document,{
                            binding: fm,
                            blade: Qr(),
                            props: ir.fromObject({
                                label: "label"in vn.params ? (zn = is.optional.string(vn.params.label).value) !== null && zn !== void 0 ? zn : null : vn.target.key
                            }),
                            valueController: Gl
                        })
                    }(Tr, {
                        document: wt,
                        target: Rt,
                        params: zt
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
                createMonitor(wt, Rt, zt) {
                    const nr = this.pluginsMap_.monitors.reduce( (mr, Tr) => mr ?? function($r, vn) {
                        var zn, co, is;
                        const Ts = hr
                          , ks = $r.accept(vn.target.read(), vn.params);
                        if (at(ks))
                            return null;
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
            class d_ extends h {
                constructor(wt) {
                    super(wt),
                    this.emitter_ = new St,
                    this.controller_.valueController.value.emitter.on("change", Rt => {
                        this.emitter_.emit("change", {
                            event: new b(this,Rt.rawValue)
                        })
                    }
                    )
                }
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                get options() {
                    return this.controller_.valueController.props.get("options")
                }
                set options(wt) {
                    this.controller_.valueController.props.set("options", wt)
                }
                get value() {
                    return this.controller_.valueController.value.rawValue
                }
                set value(wt) {
                    this.controller_.valueController.value.rawValue = wt
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
            }
            class p_ extends h {
                constructor(wt) {
                    super(wt),
                    this.emitter_ = new St,
                    this.controller_.valueController.value.emitter.on("change", Rt => {
                        this.emitter_.emit("change", {
                            event: new b(this,Rt.rawValue)
                        })
                    }
                    )
                }
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                get maxValue() {
                    return this.controller_.valueController.sliderController.props.get("maxValue")
                }
                set maxValue(wt) {
                    this.controller_.valueController.sliderController.props.set("maxValue", wt)
                }
                get minValue() {
                    return this.controller_.valueController.sliderController.props.get("minValue")
                }
                set minValue(wt) {
                    this.controller_.valueController.sliderController.props.set("minValue", wt)
                }
                get value() {
                    return this.controller_.valueController.value.rawValue
                }
                set value(wt) {
                    this.controller_.valueController.value.rawValue = wt
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
            }
            class Vl extends h {
                constructor(wt) {
                    super(wt),
                    this.emitter_ = new St,
                    this.controller_.valueController.value.emitter.on("change", Rt => {
                        this.emitter_.emit("change", {
                            event: new b(this,Rt.rawValue)
                        })
                    }
                    )
                }
                get label() {
                    return this.controller_.props.get("label")
                }
                set label(wt) {
                    this.controller_.props.set("label", wt)
                }
                get formatter() {
                    return this.controller_.valueController.props.get("formatter")
                }
                set formatter(wt) {
                    this.controller_.valueController.props.set("formatter", wt)
                }
                get value() {
                    return this.controller_.valueController.value.rawValue
                }
                set value(wt) {
                    this.controller_.valueController.value.rawValue = wt
                }
                on(wt, Rt) {
                    const zt = Rt.bind(this);
                    return this.emitter_.on(wt, nr => {
                        zt(nr.event)
                    }
                    ),
                    this
                }
            }
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
            class h_ extends Yn {
                constructor(wt, Rt) {
                    super(wt, Rt)
                }
                get element() {
                    return this.controller_.view.element
                }
                importPreset(wt) {
                    (function(Rt, zt) {
                        Rt.forEach(nr => {
                            const mr = zt[nr.target.presetKey];
                            mr !== void 0 && nr.writer(nr.target, nr.reader(mr))
                        }
                        )
                    }
                    )(this.controller_.rackController.rack.find(Cn).map(Rt => Rt.binding), wt),
                    this.refresh()
                }
                exportPreset() {
                    return this.controller_.rackController.rack.find(Cn).map(wt => wt.binding.target).reduce( (wt, Rt) => Object.assign(wt, {
                        [Rt.presetKey]: Rt.read()
                    }), {})
                }
                refresh() {
                    this.controller_.rackController.rack.find(Cn).forEach(wt => {
                        wt.binding.read()
                    }
                    ),
                    this.controller_.rackController.rack.find(bn).forEach(wt => {
                        wt.binding.read()
                    }
                    )
                }
            }
            class Gn extends Yo {
                constructor(wt, Rt) {
                    super(wt, {
                        expanded: Rt.expanded,
                        blade: Rt.blade,
                        props: Rt.props,
                        root: !0,
                        viewProps: Rt.viewProps
                    })
                }
            }
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
            function Dl(Vt, wt, Rt) {
                if (Vt.querySelector(`style[data-tp-style=${
wt}]`))
                    return;
                const zt = Vt.createElement("style");
                zt.dataset.tpStyle = wt,
                zt.textContent = Rt,
                Vt.head.appendChild(zt)
            }
            const O0 = new class {
                constructor(Vt) {
                    const [wt,Rt] = Vt.split("-")
                      , zt = wt.split(".");
                    this.major = parseInt(zt[0], 10),
                    this.minor = parseInt(zt[1], 10),
                    this.patch = parseInt(zt[2], 10),
                    this.prerelease = Rt ?? null
                }
                toString() {
                    const Vt = [this.major, this.minor, this.patch].join(".");
                    return this.prerelease !== null ? [Vt, this.prerelease].join("-") : Vt
                }
            }
            ("3.1.10");
            c.BladeApi = h,
            c.ButtonApi = bt,
            c.FolderApi = Yn,
            c.InputBindingApi = wn,
            c.ListApi = d_,
            c.MonitorBindingApi = fn,
            c.Pane = class extends h_ {
                constructor(Vt) {
                    var wt, Rt;
                    const zt = Vt ?? {}
                      , nr = (wt = zt.document) !== null && wt !== void 0 ? wt : hn()
                      , mr = function() {
                        const Tr = new Ku;
                        return [hs, sv, av, Xu, a_, wu, am, Au, X_, uv, Ul, c_, Ir, ss, as, Js].forEach($r => {
                            Tr.register($r)
                        }
                        ),
                        Tr
                    }();
                    super(new Gn(nr,{
                        expanded: zt.expanded,
                        blade: Qr(),
                        props: ir.fromObject({
                            title: zt.title
                        }),
                        viewProps: Rr.create()
                    }), mr),
                    this.pool_ = mr,
                    this.containerElem_ = (Rt = zt.container) !== null && Rt !== void 0 ? Rt : function(Tr) {
                        const $r = Tr.createElement("div");
                        return $r.classList.add(Et("dfw")()),
                        Tr.body && Tr.body.appendChild($r),
                        $r
                    }(nr),
                    this.containerElem_.appendChild(this.element),
                    this.doc_ = nr,
                    this.usesDefaultWrapper_ = !zt.container,
                    this.setUpDefaultPlugins_()
                }
                get document() {
                    if (!this.doc_)
                        throw _t.alreadyDisposed();
                    return this.doc_
                }
                dispose() {
                    const Vt = this.containerElem_;
                    if (!Vt)
                        throw _t.alreadyDisposed();
                    if (this.usesDefaultWrapper_) {
                        const wt = Vt.parentElement;
                        wt && wt.removeChild(Vt)
                    }
                    this.containerElem_ = null,
                    this.doc_ = null,
                    super.dispose()
                }
                registerPlugin(Vt) {
                    ("plugin"in Vt ? [Vt.plugin] : "plugins"in Vt ? Vt.plugins : []).forEach(wt => {
                        this.pool_.register(wt),
                        this.embedPluginStyle_(wt)
                    }
                    )
                }
                embedPluginStyle_(Vt) {
                    Vt.css && Dl(this.document, `plugin-${
Vt.id}`, Vt.css)
                }
                setUpDefaultPlugins_() {
                    Dl(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;
appearance:none;
background-color:rgba(0,0,0,0);
border-width:0;
font-family:inherit;
font-size:inherit;
font-weight:inherit;
margin:0;
outline:none;
padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{
background-color:var(--btn-bg);
border-radius:var(--elm-br);
color:var(--btn-fg);
cursor:pointer;
display:block;
font-weight:bold;
height:var(--bld-us);
line-height:var(--bld-us);
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{
background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{
background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{
background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{
opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{
background-color:var(--in-bg);
border-radius:var(--elm-br);
box-sizing:border-box;
color:var(--in-fg);
font-family:inherit;
height:var(--bld-us);
line-height:var(--bld-us);
min-width:0;
width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{
background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{
background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{
background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{
opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{
background-color:var(--mo-bg);
border-radius:var(--elm-br);
box-sizing:border-box;
color:var(--mo-fg);
height:var(--bld-us);
scrollbar-color:currentColor rgba(0,0,0,0);
scrollbar-width:thin;
width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{
height:8px;
width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{
background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{
background-clip:padding-box;
background-color:currentColor;
border:rgba(0,0,0,0) solid 2px;
border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{
margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{
border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{
border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){
margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){
margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){
margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{
margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{
margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{
border-top-left-radius:var(--elm-br);
border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{
border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{
border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{
border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{
border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{
border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{
border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{
background-color:var(--cnt-bg);
color:var(--cnt-fg);
cursor:pointer;
display:block;
height:calc(var(--bld-us) + 4px);
line-height:calc(var(--bld-us) + 4px);
overflow:hidden;
padding-left:var(--cnt-h-p);
padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));
position:relative;
text-align:left;
text-overflow:ellipsis;
white-space:nowrap;
width:100%;
transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{
background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{
background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{
background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{
opacity:.5}.tp-rotv_m,.tp-fldv_m{
background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);
border-radius:2px;
bottom:0;
content:"";
display:block;
height:6px;
right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);
margin:auto;
opacity:.5;
position:absolute;
top:0;
transform:rotate(90deg);
transition:transform .2s ease-in-out;
width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{
transform:none}.tp-rotv_c,.tp-fldv_c{
box-sizing:border-box;
height:0;
opacity:0;
overflow:hidden;
padding-bottom:0;
padding-top:0;
position:relative;
transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{
display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{
opacity:1;
padding-bottom:var(--cnt-v-p);
padding-top:var(--cnt-v-p);
transform:none;
overflow:visible;
transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{
position:relative}.tp-lstv_s{
padding:0 20px 0 4px;
width:100%}.tp-lstv_m,.tp-coltxtv_mm{
bottom:0;
margin:auto;
pointer-events:none;
position:absolute;
right:2px;
top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{
bottom:0;
height:16px;
margin:auto;
position:absolute;
right:0;
top:0;
width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{
fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{
display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{
width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{
margin-left:2px}.tp-btnv_b{
width:100%}.tp-btnv_t{
text-align:center}.tp-ckbv_l{
display:block;
position:relative}.tp-ckbv_i{
left:0;
opacity:0;
position:absolute;
top:0}.tp-ckbv_w{
background-color:var(--in-bg);
border-radius:var(--elm-br);
cursor:pointer;
display:block;
height:var(--bld-us);
position:relative;
width:var(--bld-us)}.tp-ckbv_w svg{
bottom:0;
display:block;
height:16px;
left:0;
margin:auto;
opacity:0;
position:absolute;
right:0;
top:0;
width:16px}.tp-ckbv_w svg path{
fill:none;
stroke:var(--in-fg);
stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{
background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{
background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{
background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{
opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{
opacity:.5}.tp-colv{
position:relative}.tp-colv_h{
display:flex}.tp-colv_s{
flex-grow:0;
flex-shrink:0;
width:var(--bld-us)}.tp-colv_t{
flex:1;
margin-left:4px}.tp-colv_p{
height:0;
margin-top:0;
opacity:0;
overflow:hidden;
transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{
overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{
margin-top:var(--bld-s);
opacity:1}.tp-colv .tp-popv{
left:calc(-1*var(--cnt-h-p));
right:calc(-1*var(--cnt-h-p));
top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{
margin-left:6px;
margin-right:6px}.tp-colpv_h{
margin-top:var(--bld-s)}.tp-colpv_rgb{
display:flex;
margin-top:var(--bld-s);
width:100%}.tp-colpv_a{
display:flex;
margin-top:var(--cnt-v-p);
padding-top:calc(var(--cnt-v-p) + 2px);
position:relative}.tp-colpv_a::before{
background-color:var(--grv-fg);
content:"";
height:2px;
left:calc(-1*var(--cnt-h-p));
position:absolute;
right:calc(-1*var(--cnt-h-p));
top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{
opacity:.5}.tp-colpv_ap{
align-items:center;
display:flex;
flex:3}.tp-colpv_at{
flex:1;
margin-left:4px}.tp-svpv{
border-radius:var(--elm-br);
outline:none;
overflow:hidden;
position:relative}.tp-svpv.tp-v-disabled{
opacity:.5}.tp-svpv_c{
cursor:crosshair;
display:block;
height:calc(var(--bld-us)*4);
width:100%}.tp-svpv_m{
border-radius:100%;
border:rgba(255,255,255,.75) solid 2px;
box-sizing:border-box;
filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));
height:12px;
margin-left:-6px;
margin-top:-6px;
pointer-events:none;
position:absolute;
width:12px}.tp-svpv:focus .tp-svpv_m{
border-color:#fff}.tp-hplv{
cursor:pointer;
height:var(--bld-us);
outline:none;
position:relative}.tp-hplv.tp-v-disabled{
opacity:.5}.tp-hplv_c{
background-image:url(data:image/png;
base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);
background-position:left top;
background-repeat:no-repeat;
background-size:100% 100%;
border-radius:2px;
display:block;
height:4px;
left:0;
margin-top:-2px;
position:absolute;
top:50%;
width:100%}.tp-hplv_m{
border-radius:var(--elm-br);
border:rgba(255,255,255,.75) solid 2px;
box-shadow:0 0 2px rgba(0,0,0,.1);
box-sizing:border-box;
height:12px;
left:50%;
margin-left:-6px;
margin-top:-6px;
pointer-events:none;
position:absolute;
top:50%;
width:12px}.tp-hplv:focus .tp-hplv_m{
border-color:#fff}.tp-aplv{
cursor:pointer;
height:var(--bld-us);
outline:none;
position:relative;
width:100%}.tp-aplv.tp-v-disabled{
opacity:.5}.tp-aplv_b{
background-color:#fff;
background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);
background-size:4px 4px;
background-position:0 0,2px 2px;
border-radius:2px;
display:block;
height:4px;
left:0;
margin-top:-2px;
overflow:hidden;
position:absolute;
top:50%;
width:100%}.tp-aplv_c{
bottom:0;
left:0;
position:absolute;
right:0;
top:0}.tp-aplv_m{
background-color:#fff;
background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);
background-size:12px 12px;
background-position:0 0,6px 6px;
border-radius:var(--elm-br);
box-shadow:0 0 2px rgba(0,0,0,.1);
height:12px;
left:50%;
margin-left:-6px;
margin-top:-6px;
overflow:hidden;
pointer-events:none;
position:absolute;
top:50%;
width:12px}.tp-aplv_p{
border-radius:var(--elm-br);
border:rgba(255,255,255,.75) solid 2px;
box-sizing:border-box;
bottom:0;
left:0;
position:absolute;
right:0;
top:0}.tp-aplv:focus .tp-aplv_p{
border-color:#fff}.tp-colswv{
background-color:#fff;
background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);
background-size:10px 10px;
background-position:0 0,5px 5px;
border-radius:var(--elm-br);
overflow:hidden}.tp-colswv.tp-v-disabled{
opacity:.5}.tp-colswv_sw{
border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;
appearance:none;
background-color:rgba(0,0,0,0);
border-width:0;
cursor:pointer;
display:block;
height:var(--bld-us);
left:0;
margin:0;
outline:none;
padding:0;
position:absolute;
top:0;
width:var(--bld-us)}.tp-colswv_b:focus::after{
border:rgba(255,255,255,.75) solid 2px;
border-radius:var(--elm-br);
bottom:0;
content:"";
display:block;
left:0;
position:absolute;
right:0;
top:0}.tp-coltxtv{
display:flex;
width:100%}.tp-coltxtv_m{
margin-right:4px}.tp-coltxtv_ms{
border-radius:var(--elm-br);
color:var(--lbl-fg);
cursor:pointer;
height:var(--bld-us);
line-height:var(--bld-us);
padding:0 18px 0 4px}.tp-coltxtv_ms:hover{
background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{
background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{
background-color:var(--in-bg-a)}.tp-coltxtv_mm{
color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{
opacity:.5}.tp-coltxtv_w{
flex:1}.tp-dfwv{
position:absolute;
top:8px;
right:8px;
width:256px}.tp-fldv{
position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{
display:none}.tp-fldv_t{
padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{
display:none}.tp-fldv_c{
padding-left:4px}.tp-fldv_i{
bottom:0;
color:var(--cnt-bg);
left:0;
overflow:hidden;
position:absolute;
top:calc(var(--bld-us) + 4px);
width:var(--bs-br)}.tp-fldv_i::before{
background-color:currentColor;
bottom:0;
content:"";
left:0;
position:absolute;
top:0;
width:4px}.tp-fldv_b:hover+.tp-fldv_i{
color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{
color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{
color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{
opacity:.5}.tp-grlv{
position:relative}.tp-grlv_g{
display:block;
height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{
fill:none;
stroke:var(--mo-fg);
stroke-linejoin:round}.tp-grlv_t{
margin-top:-4px;
transition:left .05s,top .05s;
visibility:hidden}.tp-grlv_t.tp-grlv_t-a{
visibility:visible}.tp-grlv_t.tp-grlv_t-in{
transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{
opacity:.5}.tp-grlv .tp-ttv{
background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{
border-top-color:var(--mo-fg)}.tp-lblv{
align-items:center;
display:flex;
line-height:1.3;
padding-left:var(--cnt-h-p);
padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{
display:block}.tp-lblv_l{
color:var(--lbl-fg);
flex:1;-webkit-hyphens:auto;
hyphens:auto;
overflow:hidden;
padding-left:4px;
padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{
opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{
display:none}.tp-lblv_v{
align-self:flex-start;
flex-grow:0;
flex-shrink:0;
width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{
width:100%}.tp-lstv_s{
padding:0 20px 0 4px;
width:100%}.tp-lstv_m{
color:var(--btn-fg)}.tp-sglv_i{
padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{
opacity:.5}.tp-mllv_i{
display:block;
height:calc(var(--bld-us)*3);
line-height:var(--bld-us);
padding:0 4px;
resize:none;
white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{
opacity:.5}.tp-p2dv{
position:relative}.tp-p2dv_h{
display:flex}.tp-p2dv_b{
height:var(--bld-us);
margin-right:4px;
position:relative;
width:var(--bld-us)}.tp-p2dv_b svg{
display:block;
height:16px;
left:50%;
margin-left:-8px;
margin-top:-8px;
position:absolute;
top:50%;
width:16px}.tp-p2dv_b svg path{
stroke:currentColor;
stroke-width:2}.tp-p2dv_b svg circle{
fill:currentColor}.tp-p2dv_t{
flex:1}.tp-p2dv_p{
height:0;
margin-top:0;
opacity:0;
overflow:hidden;
transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{
margin-top:var(--bld-s);
opacity:1}.tp-p2dv .tp-popv{
left:calc(-1*var(--cnt-h-p));
right:calc(-1*var(--cnt-h-p));
top:var(--bld-us)}.tp-p2dpv{
padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{
cursor:crosshair;
height:0;
overflow:hidden;
padding-bottom:100%;
position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{
opacity:.5}.tp-p2dpv_g{
display:block;
height:100%;
left:0;
pointer-events:none;
position:absolute;
top:0;
width:100%}.tp-p2dpv_ax{
opacity:.1;
stroke:var(--in-fg);
stroke-dasharray:1}.tp-p2dpv_l{
opacity:.5;
stroke:var(--in-fg);
stroke-dasharray:1}.tp-p2dpv_m{
border:var(--in-fg) solid 1px;
border-radius:50%;
box-sizing:border-box;
height:4px;
margin-left:-2px;
margin-top:-2px;
position:absolute;
width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{
background-color:var(--in-fg);
border-width:0}.tp-popv{
background-color:var(--bs-bg);
border-radius:6px;
box-shadow:0 2px 4px var(--bs-sh);
display:none;
max-width:168px;
padding:var(--cnt-v-p) var(--cnt-h-p);
position:absolute;
visibility:hidden;
z-index:1000}.tp-popv.tp-popv-v{
display:block;
visibility:visible}.tp-sprv_r{
background-color:var(--grv-fg);
border-width:0;
display:block;
height:2px;
margin:0;
width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{
opacity:.5}.tp-sldv.tp-v-disabled{
opacity:.5}.tp-sldv_t{
box-sizing:border-box;
cursor:pointer;
height:var(--bld-us);
margin:0 6px;
outline:none;
position:relative}.tp-sldv_t::before{
background-color:var(--in-bg);
border-radius:1px;
bottom:0;
content:"";
display:block;
height:2px;
left:0;
margin:auto;
position:absolute;
right:0;
top:0}.tp-sldv_k{
height:100%;
left:0;
position:absolute;
top:0}.tp-sldv_k::before{
background-color:var(--in-fg);
border-radius:1px;
bottom:0;
content:"";
display:block;
height:2px;
left:0;
margin-bottom:auto;
margin-top:auto;
position:absolute;
right:0;
top:0}.tp-sldv_k::after{
background-color:var(--btn-bg);
border-radius:var(--elm-br);
bottom:0;
content:"";
display:block;
height:12px;
margin-bottom:auto;
margin-top:auto;
position:absolute;
right:-6px;
top:0;
width:12px}.tp-sldv_t:hover .tp-sldv_k::after{
background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{
background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{
background-color:var(--btn-bg-a)}.tp-sldtxtv{
display:flex}.tp-sldtxtv_s{
flex:2}.tp-sldtxtv_t{
flex:1;
margin-left:4px}.tp-tabv{
position:relative}.tp-tabv_t{
align-items:flex-end;
color:var(--cnt-bg);
display:flex;
overflow:hidden;
position:relative}.tp-tabv_t:hover{
color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){
color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){
color:var(--cnt-bg-a)}.tp-tabv_t::before{
background-color:currentColor;
bottom:0;
content:"";
height:2px;
left:0;
pointer-events:none;
position:absolute;
right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{
opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{
height:calc(var(--bld-us) + 4px);
position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{
background-color:var(--cnt-bg);
bottom:0;
content:"";
height:2px;
left:0;
position:absolute;
right:0}.tp-tabv_c{
padding-bottom:var(--cnt-v-p);
padding-left:4px;
padding-top:var(--cnt-v-p)}.tp-tabv_i{
bottom:0;
color:var(--cnt-bg);
left:0;
overflow:hidden;
position:absolute;
top:calc(var(--bld-us) + 4px);
width:var(--bs-br)}.tp-tabv_i::before{
background-color:currentColor;
bottom:0;
content:"";
left:0;
position:absolute;
top:0;
width:4px}.tp-tabv_t:hover+.tp-tabv_i{
color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{
color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{
color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{
opacity:.5}.tp-tbiv{
flex:1;
min-width:0;
position:relative}.tp-tbiv+.tp-tbiv{
margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{
opacity:.5}.tp-tbiv_b{
display:block;
padding-left:calc(var(--cnt-h-p) + 4px);
padding-right:calc(var(--cnt-h-p) + 4px);
position:relative;
width:100%}.tp-tbiv_b:disabled{
opacity:.5}.tp-tbiv_b::before{
background-color:var(--cnt-bg);
bottom:2px;
content:"";
left:0;
pointer-events:none;
position:absolute;
right:0;
top:0}.tp-tbiv_b:hover::before{
background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{
background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{
background-color:var(--cnt-bg-a)}.tp-tbiv_t{
color:var(--cnt-fg);
height:calc(var(--bld-us) + 4px);
line-height:calc(var(--bld-us) + 4px);
opacity:.5;
overflow:hidden;
text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{
opacity:1}.tp-txtv{
position:relative}.tp-txtv_i{
padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{
border-bottom-right-radius:0;
border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{
border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{
border-bottom-left-radius:0;
border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{
text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{
opacity:.3}.tp-txtv_k{
cursor:pointer;
height:100%;
left:-3px;
position:absolute;
top:0;
width:12px}.tp-txtv_k::before{
background-color:var(--in-fg);
border-radius:1px;
bottom:0;
content:"";
height:calc(var(--bld-us) - 4px);
left:50%;
margin-bottom:auto;
margin-left:-1px;
margin-top:auto;
opacity:.1;
position:absolute;
top:0;
transition:border-radius .1s,height .1s,transform .1s,width .1s;
width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{
opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{
border-radius:50%;
height:4px;
transform:translateX(-1px);
width:4px}.tp-txtv_g{
bottom:0;
display:block;
height:8px;
left:50%;
margin:auto;
overflow:visible;
pointer-events:none;
position:absolute;
top:0;
visibility:hidden;
width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{
visibility:visible}.tp-txtv_gb{
fill:none;
stroke:var(--in-fg);
stroke-dasharray:1}.tp-txtv_gh{
fill:none;
stroke:var(--in-fg)}.tp-txtv .tp-ttv{
margin-left:6px;
visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{
visibility:visible}.tp-ttv{
background-color:var(--in-fg);
border-radius:var(--elm-br);
color:var(--bs-bg);
padding:2px 4px;
pointer-events:none;
position:absolute;
transform:translate(-50%, -100%)}.tp-ttv::before{
border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);
border-style:solid;
border-width:2px;
box-sizing:border-box;
content:"";
font-size:.9em;
height:4px;
left:50%;
margin-left:-2px;
position:absolute;
top:100%;
width:4px}.tp-rotv{
background-color:var(--bs-bg);
border-radius:var(--bs-br);
box-shadow:0 2px 4px var(--bs-sh);
font-family:var(--font-family);
font-size:11px;
font-weight:500;
line-height:1;
text-align:left}.tp-rotv_b{
border-bottom-left-radius:var(--bs-br);
border-bottom-right-radius:var(--bs-br);
border-top-left-radius:var(--bs-br);
border-top-right-radius:var(--bs-br);
padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));
text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{
border-bottom-left-radius:0;
border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{
display:none}.tp-rotv_b:disabled .tp-rotv_m{
display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{
border-bottom-left-radius:var(--bs-br);
border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{
border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{
border-bottom-left-radius:var(--bs-br);
border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{
border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{
margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{
border-top-left-radius:var(--bs-br);
border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{
border-bottom-left-radius:var(--bs-br);
border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{
border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{
margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{
border-top-left-radius:var(--bs-br);
border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{
pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{
display:none}'),
                    this.pool_.getAll().forEach(Vt => {
                        this.embedPluginStyle_(Vt)
                    }
                    ),
                    this.registerPlugin({
                        plugins: [ms, mm, Js, nu]
                    })
                }
            }
            ,
            c.SeparatorApi = $l,
            c.SliderApi = p_,
            c.TabApi = Ks,
            c.TabPageApi = Sl,
            c.TextApi = Vl,
            c.TpChangeEvent = b,
            c.VERSION = O0,
            Object.defineProperty(c, "__esModule", {
                value: !0
            })
        }
        )(o)
}

export default module578;
