/* Standalone Class: At */

class At {
                constructor(kt, Ut) {
                    this.element = kt.createElement("div"),
                    this.element.classList.add(bt()),
                    Ut.viewProps.bindClassModifiers(this.element),
                    this.input = kt.createElement("input"),
                    this.input.classList.add(bt("input")),
                    this.input.setAttribute("type", "file"),
                    this.input.setAttribute("accept", Ut.extensions.join(",")),
                    this.image_ = kt.createElement("img"),
                    this.image_.classList.add(bt("image")),
                    this.image_.classList.add(bt(`image_${Ut.imageFit}`)),
                    this.image_.crossOrigin = "anonymous",
                    this.image_.onclick = Ht => {
                        Ut.clickCallback ? Ut.clickCallback(Ht, this.input) : this.input.click()
                    }
                    ,
                    this.element.classList.add(bt("area_root")),
                    this.element.appendChild(this.image_),
                    this.element.appendChild(this.input)
                }
                changeImage(kt) {
                    this.image_.src = kt
                }
                changeDraggingState(kt) {
                    const Ut = this.element;
                    kt ? Ut == null || Ut.classList.add(bt("area_dragging")) : Ut == null || Ut.classList.remove(bt("area_dragging"))
                }
            }
            let Et = null;
            class Pt {
                constructor(kt, Ut) {
                    this.value = Ut.value,
                    this.viewProps = Ut.viewProps,
                    this.view = new At(kt,{
                        viewProps: this.viewProps,
                        extensions: Ut.extensions,
                        imageFit: Ut.imageFit,
                        clickCallback: Ut.clickCallback
                    }),
                    this.onFile = this.onFile.bind(this),
                    this.onDrop = this.onDrop.bind(this),
                    this.onDragOver = this.onDragOver.bind(this),
                    this.onDragLeave = this.onDragLeave.bind(this),
                    this.view.input.addEventListener("change", this.onFile),
                    this.view.element.addEventListener("drop", this.onDrop),
                    this.view.element.addEventListener("dragover", this.onDragOver),
                    this.view.element.addEventListener("dragleave", this.onDragLeave),
                    this.viewProps.handleDispose( () => {
                        this.view.input.removeEventListener("change", this.onFile),
                        this.view.input.removeEventListener("drop", this.onDrop),
                        this.view.input.removeEventListener("dragover", this.onDragOver),
                        this.view.input.removeEventListener("dragleave", this.onDragLeave)
                    }
                    ),
                    this.value.emitter.on("change", this.handleValueChange.bind(this)),
                    this.handleValueChange()
                }
                onFile(kt) {
                    const Ut = (kt == null ? void 0 : kt.target).files;
                    if (!Ut || !Ut.length)
                        return;
                    const Ht = Ut[0];
                    this.setValue(Ht)
                }
                onDrop(kt) {
                    return _t(this, void 0, void 0, function*() {
                        kt.preventDefault();
                        try {
                            const {dataTransfer: Ut} = kt
                              , Ht = Ut == null ? void 0 : Ut.files[0];
                            if (Ht)
                                this.setValue(Ht);
                            else {
                                const Kt = Ut == null ? void 0 : Ut.getData("url");
                                if (!Kt)
                                    throw new Error("No url");
                                this.setValue(Kt)
                            }
                        } catch (Ut) {
                            console.error("Could not parse the dropped image", Ut)
                        } finally {
                            this.view.changeDraggingState(!1)
                        }
                    })
                }
                onDragOver(kt) {
                    kt.preventDefault(),
                    this.view.changeDraggingState(!0)
                }
                onDragLeave() {
                    this.view.changeDraggingState(!1)
                }
                handleImage(kt) {
                    return _t(this, void 0, void 0, function*() {
                        kt instanceof HTMLImageElement ? this.updateImage(kt.src) : typeof kt != "string" && kt ? yield this.setValue(kt) : (kt !== "placeholder" && kt || (kt = (yield this.handlePlaceholderImage()).src),
                        this.updateImage(kt))
                    })
                }
                updateImage(kt) {
                    this.view.changeImage(kt)
                }
                setValue(kt) {
                    return _t(this, void 0, void 0, function*() {
                        if (kt instanceof HTMLImageElement)
                            this.value.setRawValue(kt);
                        else if (kt instanceof File) {
                            const Ut = URL.createObjectURL(kt) + "#" + kt.name;
                            kt.src = Ut;
                            const Ht = yield vt(Ut).catch( () => {}
                            );
                            this.value.setRawValue(Ht || kt)
                        } else
                            kt ? this.value.setRawValue(yield vt(kt)) : this.value.setRawValue(yield this.handlePlaceholderImage())
                    })
                }
                handleValueChange() {
                    this.handleImage(this.value.rawValue)
                }
                handlePlaceholderImage() {
                    return _t(this, void 0, void 0, function*() {
                        return Et || (Et = yield function() {
                            const kt = document.createElement("canvas");
                            kt.width = 320,
                            kt.height = 50;
                            const Ut = kt.getContext("2d");
                            return Ut.fillStyle = "#00000004",
                            Ut.fillRect(0, 0, kt.width, kt.height),
                            Ut.fillStyle = "#eee",
                            Ut.font = '1.25rem "Roboto Mono", "Source Code Pro", Menlo, Courier, monospace',
                            Ut.textAlign = "center",
                            Ut.textBaseline = "middle",
                            Ut.fillText("No image", .5 * kt.width, .5 * kt.height),
                            new Promise(Ht => {
                                kt.toBlob(Kt => {
                                    const Jt = new Image;
                                    Jt.src = URL.createObjectURL(Kt),
                                    Jt.isPlaceholder = !0,
                                    Jt.onload = () => {
                                        Ht(Jt)
                                    }
                                }
                                )
                            }
                            )
                        }()),
                        Et
                    })
                }
            }
            const It = [".jpg", ".png", ".gif"]
              , Dt = {
                id: "input-image",
                type: "input",
                css: ".tp-imgv{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-imgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-imgv:hover{background-color:var(--in-bg-h)}.tp-imgv:focus{background-color:var(--in-bg-f)}.tp-imgv:active{background-color:var(--in-bg-a)}.tp-imgv:disabled{opacity:.5}:root{--tp-plugin-image-dragging-color: hsla(230, 100%, 66%, 1.00)}.tp-imgv{cursor:pointer;display:inline-flex;height:auto !important;max-height:calc(var(--bld-us)*3);border-radius:4px;position:relative}.tp-imgv.tp-v-disabled{opacity:.5}.tp-imgv_input{width:0;height:0;pointer-events:none;visibility:hidden}.tp-imgv_image{width:100%;height:-moz-max-content;height:max-content;max-height:calc(var(--bld-us)*3);border:0}.tp-imgv_image_contain{-o-object-fit:contain;object-fit:contain}.tp-imgv_image_cover{-o-object-fit:cover;object-fit:cover}.tp-imgv_area_root{transition:opacity .16s ease-in-out}.tp-imgv_area_dragging{border:2px dashed var(--tp-plugin-image-dragging-color);border-radius:4px;opacity:.6}",
                accept(Bt, kt) {
                    if (!(Bt instanceof HTMLImageElement || typeof Bt == "string"))
                        return null;
                    const Ut = _e
                      , Ht = function(Kt, Jt) {
                        const or = _e.required.object(Jt)(Kt);
                        return or.succeeded ? or.value : void 0
                    }(kt, {
                        view: Ut.required.constant("input-image"),
                        acceptUrl: Ut.optional.boolean,
                        clickCallback: Ut.optional.function,
                        imageFit: Ut.optional.custom(Kt => Kt === "contain" || Kt === "cover" ? Kt : void 0),
                        extensions: Ut.optional.array(Ut.required.string)
                    });
                    return Ht ? {
                        initialValue: Bt,
                        params: Ht
                    } : null
                },
                binding: {
                    reader(Bt) {
                        return kt => kt.src !== void 0 ? kt.src === "" ? "placeholder" : kt.src : kt
                    },
                    writer(Bt) {
                        return (kt, Ut) => {
                            kt.write(Ut)
                        }
                    }
                },
                controller(Bt) {
                    var kt, Ut;
                    return new Pt(Bt.document,{
                        value: Bt.value,
                        imageFit: (kt = Bt.params.imageFit) !== null && kt !== void 0 ? kt : "cover",
                        clickCallback: Bt.params.clickCallback,
                        viewProps: Bt.viewProps,
                        extensions: (Ut = Bt.params.extensions) !== null && Ut !== void 0 ? Ut : It
                    })
                }
            }
              , Gt = Dt;
            c.plugin = Gt,
            Object.defineProperty(c, "__esModule", {
                value: !0
            })
        }
        )(o)
    },
    578: function(d, o) {
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
                invalidparams: Vt => `Invalid parameters for '${Vt.name}'`,
                nomatchingcontroller: Vt => `No matching controller for '${Vt.key}'`,
                nomatchingview: Vt => `No matching view for '${JSON.stringify(Vt.params)}'`,
                notbindable: () => "Value is not bindable",
                propertynotfound: Vt => `Property '${Vt.name}' not found`,
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
                return (wt, Rt) => [At, "-", Vt, "v", wt ? `_${wt}` : "", Rt ? `-${Rt}` : ""].join("")
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
                console.warn([`Missing '${Vt.key}' of ${Vt.target} in ${Vt.place}.`, "Please rebuild plugins with the latest core package."].join(" "))
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
                    return this.get("shouldFixHeight") && !at(wt) ? `${wt}px` : "auto"
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
                        throw new Error(`unexpected binary operator: '${this.operator}`);
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
                        throw new Error(`unexpected unary operator: '${this.operator}`);
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
            function Lu({primary: Vt, secondary: wt, forward: Rt, backward: zt}) {
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
                    this.guideHeadElem_.setAttributeNS(null, "d", [`M ${zt + nr},0 L${zt},4 L${zt + nr},8`, `M ${Rt},-1 L${Rt},9`].join(" ")),
                    this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${Rt},4`);
                    const mr = this.props_.get("formatter");
                    this.tooltipElem_.textContent = mr(this.value.rawValue),
                    this.tooltipElem_.style.left = `${Rt}px`
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
                    this.knobElement.style.width = `${wt}%`
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
                    return tv.reduce( (nr, {parser: mr, result: Tr}) => nr || (mr(zt) ? Tr : null), null)
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
                return wt.length === 1 ? `0${wt}` : wt
            }
            function _f(Vt, wt="#") {
                return `${wt}${gu(Vt.getComponents("rgb")).map(Zm).join("")}`
            }
            function xu(Vt, wt="#") {
                const Rt = Vt.getComponents("rgb");
                return `${wt}${[Rt[0], Rt[1], Rt[2], 255 * Rt[3]].map(Zm).join("")}`
            }
            function _g(Vt, wt) {
                const Rt = ts(wt === "float" ? 2 : 0);
                return `rgb(${gu(Vt.getComponents("rgb", wt)).map(zt => Rt(zt)).join(", ")})`
            }
            function rv(Vt) {
                return wt => _g(wt, Vt)
            }
            function bu(Vt, wt) {
                const Rt = ts(2)
                  , zt = ts(wt === "float" ? 2 : 0);
                return `rgba(${Vt.getComponents("rgb", wt).map( (nr, mr) => (mr === 3 ? Rt : zt)(nr)).join(", ")})`
            }
            function R0(Vt) {
                return wt => bu(wt, Vt)
            }
            function Do(Vt, wt) {
                const Rt = ts(wt === "float" ? 2 : 0)
                  , zt = ["r", "g", "b"];
                return `{${gu(Vt.getComponents("rgb", wt)).map( (nr, mr) => `${zt[mr]}: ${Rt(nr)}`).join(", ")}}`
            }
            function Uu(Vt) {
                return wt => Do(wt, Vt)
            }
            function nm(Vt, wt) {
                const Rt = ts(2)
                  , zt = ts(wt === "float" ? 2 : 0)
                  , nr = ["r", "g", "b", "a"];
                return `{${Vt.getComponents("rgb", wt).map( (mr, Tr) => `${nr[Tr]}: ${(Tr === 3 ? Rt : zt)(mr)}`).join(", ")}}`
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
                    return `hsl(${gu(Vt.getComponents("hsl")).map( (Rt, zt) => wt[zt](Rt)).join(", ")})`
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
                    return `hsla(${Vt.getComponents("hsl").map( (Rt, zt) => wt[zt](Rt)).join(", ")})`
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
                    this.colorElem_.style.background = `linear-gradient(${mr.join(",")})`,
                    this.previewElem_.style.backgroundColor = bu(wt);
                    const Tr = No(Rt[3], 0, 1, 0, 100);
                    this.markerElem_.style.left = `${Tr}%`
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
                    this.markerElem_.style.left = `${zt}%`
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
                    this.markerElem_.style.top = `${vn}%`
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
                    this.lineElem_.setAttributeNS(null, "x2", `${nr}%`),
                    this.lineElem_.setAttributeNS(null, "y2", `${Tr}%`),
                    this.markerElem_.style.left = `${nr}%`,
                    this.markerElem_.style.top = `${Tr}%`
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
                    zt.style.height = `calc(var(--bld-us) * ${Rt.lineCount})`,
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
                if (Vt.querySelector(`style[data-tp-style=${wt}]`))
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
                    Vt.css && Dl(this.document, `plugin-${Vt.id}`, Vt.css)
                }
                setUpDefaultPlugins_() {
                    Dl(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'),
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
    },
    161: function(d) {
        d.exports = function(o, c, h) {
            return o.length === 0 ? o : c ? (h || o.sort(c),
            function(_, b) {
                for (var _e = 1, nt = _.length, it = _[0], at = _[0], ut = 1; ut < nt; ++ut)
                    if (at = it,
                    b(it = _[ut], at)) {
                        if (ut === _e) {
                            _e++;
                            continue
                        }
                        _[_e++] = it
                    }
                return _.length = _e,
                _
            }(o, c)) : (h || o.sort(),
            function(_) {
                for (var b = 1, _e = _.length, nt = _[0], it = _[0], at = 1; at < _e; ++at,
                it = nt)
                    if (it = nt,
                    (nt = _[at]) !== it) {
                        if (at === b) {
                            b++;
                            continue
                        }
                        _[b++] = nt
                    }
                return _.length = b,
                _
            }(o))
        }
    },
    957: function(__unused_webpack_module, __webpackgi_exports__, __webpackgi_require__) {
        __webpackgi_require__.d(__webpackgi_exports__, {
            Z: function() {
                return DRACOLoader2
            }
        });
        var three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpackgi_require__(149)
          , three__WEBPACK_IMPORTED_MODULE_1__ = __webpackgi_require__(848);
        class DRACOLoader2 extends three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_0__.Z {
            constructor(d) {
                super(d),
                this.encoderPending = null,
                this.encoderConfig = {
                    type: "js"
                },
                this.isDRACOLoader2 = !0,
                this.setDecoderPath(DRACOLoader2.LIB_CDN_PATH),
                this.setDecoderConfig({
                    type: "js"
                })
            }
            transform(d, o) {
                return d ? new three__WEBPACK_IMPORTED_MODULE_1__.eaF(d,new three__WEBPACK_IMPORTED_MODULE_1__._4j) : void 0
            }
            preload(d=!0, o=!1) {
                return d && super.preload(),
                o && this.initEncoder(),
                this
            }
            async initEncoder() {
                if (this.encoderPending)
                    return this.encoderPending;
                const useJS = typeof WebAssembly != "object" || this.encoderConfig.type === "js"
                  , librariesPending = []
                  , libLoader = this._loadLibrary.bind(this);
                return useJS ? librariesPending.push(libLoader("draco_encoder.js", "text")) : (librariesPending.push(libLoader("draco_wasm_wrapper.js", "text")),
                librariesPending.push(libLoader("draco_encoder.wasm", "arraybuffer"))),
                this.encoderPending = Promise.all(librariesPending).then(libraries => {
                    var _a;
                    const jsContent = libraries[0];
                    return useJS || (this.encoderConfig.wasmBinary = libraries[1]),
                    (_a = eval(jsContent + `
DracoEncoderModule;`)) === null || _a === void 0 ? void 0 : _a()
                }
                ),
                this.encoderPending
            }
            async initDecoder() {
                var _a;
                await this._initDecoder();
                const jsContent = await fetch(this.workerSourceURL).then(async d => d.text()).then(d => {
                    const o = d.indexOf("/* worker */");
                    if (o < 1)
                        throw new Error("unable to load decoder module");
                    return d.substring(0, o - 1)
                }
                );
                return (_a = eval(jsContent + `
DracoDecoderModule;`)) === null || _a === void 0 ? void 0 : _a()
            }
            async _loadLibrary(d, o) {
                return DRACOLoader2.LibraryValueMap[d] ? DRACOLoader2.LibraryValueMap[d] : DRACOLoader2.LibraryValueMap[d] = await super._loadLibrary(d, o)
            }
            static SetDecoderJsString(d) {
                this.LibraryValueMap["draco_decoder.js"] = d
            }
        }
        DRACOLoader2.LIB_CDN_PATH = "https://cdn.jsdelivr.net/gh/google/draco@1.4.1/javascript/",
        DRACOLoader2.LibraryValueMap = {}
    },
    848: function(d, o, c) {
        c.d(o, {
            $EB: function() {
                return St
            },
            $Kf: function() {
                return K0
            },
            $NF: function() {
                return O_
            },
            $O9: function() {
                return Xn
            },
            $_I: function() {
                return vo
            },
            $ei: function() {
                return Jt
            },
            $p8: function() {
                return kA
            },
            A$4: function() {
                return co
            },
            AKb: function() {
                return AS
            },
            ALV: function() {
                return k0
            },
            AT1: function() {
                return o_
            },
            Am1: function() {
                return OS
            },
            B69: function() {
                return Mo
            },
            B6O: function() {
                return Xx
            },
            BH$: function() {
                return Z0
            },
            BKk: function() {
                return zl
            },
            BND: function() {
                return fE
            },
            BRH: function() {
                return PS
            },
            BXX: function() {
                return Bl
            },
            B_h: function() {
                return cu
            },
            BdL: function() {
                return V0
            },
            CMB: function() {
                return Vn
            },
            CR7: function() {
                return Q_
            },
            CSG: function() {
                return H0
            },
            CV9: function() {
                return ly
            },
            CVz: function() {
                return G_
            },
            CWW: function() {
                return ap
            },
            Cfg: function() {
                return En
            },
            CmU: function() {
                return OA
            },
            CwR: function() {
                return GS
            },
            D$Q: function() {
                return dA
            },
            DAe: function() {
                return Xp
            },
            DAr: function() {
                return ps
            },
            DXC: function() {
                return iu
            },
            Df: function() {
                return mA
            },
            E0M: function() {
                return _E
            },
            EAD: function() {
                return Lv
            },
            EQC: function() {
                return $p
            },
            EZo: function() {
                return It
            },
            EdD: function() {
                return Gt
            },
            F1T: function() {
                return Gy
            },
            F1l: function() {
                return aE
            },
            FCc: function() {
                return Hx
            },
            FFZ: function() {
                return Y_
            },
            FNr: function() {
                return _A
            },
            FV: function() {
                return pr
            },
            FXf: function() {
                return Ut
            },
            FZo: function() {
                return LA
            },
            Fn: function() {
                return sp
            },
            Fpm: function() {
                return oE
            },
            FvD: function() {
                return jv
            },
            Fvt: function() {
                return vA
            },
            G3T: function() {
                return ku
            },
            GBG: function() {
                return wA
            },
            GJx: function() {
                return Tn
            },
            GOR: function() {
                return dS
            },
            GTy: function() {
                return At
            },
            GWd: function() {
                return as
            },
            GYF: function() {
                return Pm
            },
            GZZ: function() {
                return sy
            },
            G_z: function() {
                return gA
            },
            Gu$: function() {
                return I_
            },
            Gwm: function() {
                return rn
            },
            GxU: function() {
                return Rt
            },
            H23: function() {
                return jm
            },
            HLH: function() {
                return Wm
            },
            HO_: function() {
                return zm
            },
            HPb: function() {
                return $m
            },
            HXV: function() {
                return Lm
            },
            HgN: function() {
                return e_
            },
            HiM: function() {
                return RA
            },
            Hit: function() {
                return D_
            },
            Ho_: function() {
                return Im
            },
            Hrb: function() {
                return zn
            },
            Hrq: function() {
                return J_
            },
            I46: function() {
                return Bx
            },
            I9Y: function() {
                return mn
            },
            IE4: function() {
                return xs
            },
            IUQ: function() {
                return Lo
            },
            IWo: function() {
                return mE
            },
            Ipv: function() {
                return Hl
            },
            Iw4: function() {
                return XS
            },
            IzY: function() {
                return vE
            },
            JeP: function() {
                return xx
            },
            Jnc: function() {
                return it
            },
            K52: function() {
                return hn
            },
            KDk: function() {
                return Zs
            },
            KLL: function() {
                return Vo
            },
            KPJ: function() {
                return vy
            },
            KRh: function() {
                return qn
            },
            Ke9: function() {
                return Hm
            },
            Kef: function() {
                return z_
            },
            Ktl: function() {
                return K_
            },
            Kwu: function() {
                return Dt
            },
            Kzg: function() {
                return LS
            },
            Kzv: function() {
                return Ln
            },
            Ld9: function() {
                return yE
            },
            LiQ: function() {
                return ar
            },
            LlO: function() {
                return Vy
            },
            LoY: function() {
                return bo
            },
            LuO: function() {
                return JS
            },
            MBL: function() {
                return Dm
            },
            MOq: function() {
                return Zp
            },
            MSw: function() {
                return n0
            },
            MW4: function() {
                return Ts
            },
            Mjd: function() {
                return xn
            },
            N1A: function() {
                return ep
            },
            N2s: function() {
                return qA
            },
            N5j: function() {
                return Qm
            },
            NRn: function() {
                return Tl
            },
            NTi: function() {
                return Pt
            },
            NZq: function() {
                return Hn
            },
            Nt7: function() {
                return cr
            },
            Nv2: function() {
                return aS
            },
            Nwf: function() {
                return Ro
            },
            Nz6: function() {
                return Js
            },
            O0B: function() {
                return nv
            },
            O3Y: function() {
                return o0
            },
            O49: function() {
                return H_
            },
            O9p: function() {
                return $u
            },
            ONl: function() {
                return Wx
            },
            OUM: function() {
                return $n
            },
            Oax: function() {
                return ks
            },
            Om: function() {
                return Mn
            },
            OuU: function() {
                return gr
            },
            P5j: function() {
                return qS
            },
            PFK: function() {
                return pE
            },
            PJ3: function() {
                return lp
            },
            PPD: function() {
                return Av
            },
            PTz: function() {
                return Is
            },
            Pdi: function() {
                return bA
            },
            Pem: function() {
                return lS
            },
            Pf$: function() {
                return US
            },
            Pq0: function() {
                return Er
            },
            Q1f: function() {
                return Gn
            },
            QCA: function() {
                return e0
            },
            QP0: function() {
                return pt
            },
            Qev: function() {
                return As
            },
            Qrf: function() {
                return op
            },
            R1W: function() {
                return cE
            },
            RJ4: function() {
                return Ll
            },
            ROr: function() {
                return E0
            },
            RQf: function() {
                return ss
            },
            RcT: function() {
                return Yl
            },
            RiT: function() {
                return B_
            },
            Riy: function() {
                return lu
            },
            Rkk: function() {
                return up
            },
            RlV: function() {
                return Qu
            },
            RoJ: function() {
                return q0
            },
            Ru$: function() {
                return T0
            },
            RyA: function() {
                return _t
            },
            S$4: function() {
                return Wp
            },
            S20: function() {
                return Vv
            },
            S2Q: function() {
                return Ol
            },
            S3G: function() {
                return bx
            },
            SUR: function() {
                return NA
            },
            ScU: function() {
                return CS
            },
            T6I: function() {
                return _y
            },
            TDQ: function() {
                return eA
            },
            THS: function() {
                return mr
            },
            TMh: function() {
                return Xm
            },
            Tap: function() {
                return MS
            },
            TdN: function() {
                return Qs
            },
            TiK: function() {
                return q_
            },
            TkQ: function() {
                return yo
            },
            U3G: function() {
                return Zr
            },
            UJ6: function() {
                return Ql
            },
            UPV: function() {
                return s0
            },
            UTZ: function() {
                return jr
            },
            Ua6: function() {
                return _h
            },
            Ufg: function() {
                return R_
            },
            UpK: function() {
                return Px
            },
            UtB: function() {
                return nE
            },
            UtX: function() {
                return wy
            },
            V3x: function() {
                return Ps
            },
            V58: function() {
                return m_
            },
            V5c: function() {
                return dp
            },
            V9B: function() {
                return nu
            },
            VCu: function() {
                return yx
            },
            VT0: function() {
                return Sl
            },
            VVr: function() {
                return Yp
            },
            Vb5: function() {
                return nt
            },
            VnP: function() {
                return Jx
            },
            Vnu: function() {
                return gu
            },
            VxR: function() {
                return No
            },
            W9U: function() {
                return Vm
            },
            WBB: function() {
                return t0
            },
            WNZ: function() {
                return _e
            },
            WTh: function() {
                return hE
            },
            Wdf: function() {
                return Ym
            },
            Wew: function() {
                return $l
            },
            Wk7: function() {
                return ht
            },
            Wyr: function() {
                return Jl
            },
            XG_: function() {
                return Gm
            },
            XIg: function() {
                return Et
            },
            XJ7: function() {
                return aA
            },
            XTe: function() {
                return DS
            },
            XrR: function() {
                return mo
            },
            Y9S: function() {
                return su
            },
            YHV: function() {
                return tE
            },
            YJl: function() {
                return Am
            },
            YOZ: function() {
                return Ip
            },
            YRT: function() {
                return TS
            },
            Yhb: function() {
                return AA
            },
            Yuy: function() {
                return $o
            },
            Z0B: function() {
                return oy
            },
            Z58: function() {
                return Ax
            },
            ZLX: function() {
                return Fx
            },
            ZM4: function() {
                return gE
            },
            ZQM: function() {
                return Ks
            },
            Zcv: function() {
                return _d
            },
            Zpd: function() {
                return i0
            },
            Zr2: function() {
                return Xo
            },
            ZyN: function() {
                return IA
            },
            _4j: function() {
                return hy
            },
            _QJ: function() {
                return zp
            },
            _xc: function() {
                return sE
            },
            a$r: function() {
                return Qn
            },
            a5J: function() {
                return uu
            },
            aEY: function() {
                return wr
            },
            aHM: function() {
                return $s
            },
            aMy: function() {
                return Du
            },
            aVO: function() {
                return Q0
            },
            agE: function() {
                return Nu
            },
            amv: function() {
                return mu
            },
            b4q: function() {
                return f_
            },
            bC7: function() {
                return Qp
            },
            bCz: function() {
                return Bt
            },
            bI3: function() {
                return El
            },
            bTm: function() {
                return ut
            },
            baL: function() {
                return $r
            },
            bdM: function() {
                return g_
            },
            bkx: function() {
                return Yo
            },
            brA: function() {
                return fr
            },
            bw0: function() {
                return Nn
            },
            c5h: function() {
                return uS
            },
            c90: function() {
                return ko
            },
            cHt: function() {
                return Zo
            },
            cRK: function() {
                return Pv
            },
            cZY: function() {
                return iE
            },
            caT: function() {
                return Wn
            },
            cj9: function() {
                return ev
            },
            czI: function() {
                return Gp
            },
            dAo: function() {
                return ay
            },
            dYF: function() {
                return i_
            },
            dcC: function() {
                return Eo
            },
            dhZ: function() {
                return cp
            },
            dth: function() {
                return EA
            },
            dwI: function() {
                return lo
            },
            dzP: function() {
                return KS
            },
            eB$: function() {
                return Rv
            },
            eHc: function() {
                return Cr
            },
            eHs: function() {
                return Cp
            },
            eaF: function() {
                return gs
            },
            eoi: function() {
                return $_
            },
            er$: function() {
                return jo
            },
            ezk: function() {
                return gy
            },
            f4X: function() {
                return lr
            },
            fBL: function() {
                return zo
            },
            fCn: function() {
                return Dn
            },
            fJr: function() {
                return qm
            },
            fP5: function() {
                return QA
            },
            fTw: function() {
                return uE
            },
            fc6: function() {
                return vn
            },
            g7M: function() {
                return Ir
            },
            gJ2: function() {
                return wl
            },
            gO9: function() {
                return kt
            },
            gPd: function() {
                return Ho
            },
            gWB: function() {
                return Kl
            },
            ghU: function() {
                return wn
            },
            h2z: function() {
                return pu
            },
            hB5: function() {
                return vt
            },
            hIf: function() {
                return Jp
            },
            hZF: function() {
                return kp
            },
            h_9: function() {
                return SA
            },
            hdd: function() {
                return dr
            },
            hfX: function() {
                return _x
            },
            hgQ: function() {
                return Rr
            },
            hjs: function() {
                return rE
            },
            hsX: function() {
                return bt
            },
            hxR: function() {
                return fn
            },
            hy7: function() {
                return Qr
            },
            hzE: function() {
                return dE
            },
            i7d: function() {
                return xv
            },
            i7u: function() {
                return na
            },
            iNn: function() {
                return Zu
            },
            iOZ: function() {
                return cS
            },
            iUH: function() {
                return Bo
            },
            ibB: function() {
                return $x
            },
            ie2: function() {
                return hr
            },
            imn: function() {
                return hs
            },
            ix0: function() {
                return Os
            },
            iyt: function() {
                return Ws
            },
            j6: function() {
                return a0
            },
            jGm: function() {
                return Zx
            },
            jR7: function() {
                return bs
            },
            jUj: function() {
                return Mv
            },
            jf0: function() {
                return Oo
            },
            jsO: function() {
                return Kp
            },
            jut: function() {
                return l0
            },
            jzd: function() {
                return X_
            },
            k6Q: function() {
                return Bm
            },
            k6q: function() {
                return Rn
            },
            kBv: function() {
                return _
            },
            kEx: function() {
                return ES
            },
            kG0: function() {
                return pp
            },
            kLi: function() {
                return ga
            },
            kO0: function() {
                return fp
            },
            kRr: function() {
                return Yn
            },
            kTW: function() {
                return Cn
            },
            kTp: function() {
                return Vp
            },
            kYr: function() {
                return hp
            },
            keZ: function() {
                return NS
            },
            klZ: function() {
                return W_
            },
            kn4: function() {
                return no
            },
            kqe: function() {
                return Hs
            },
            kxk: function() {
                return Tx
            },
            kyO: function() {
                return nn
            },
            l2R: function() {
                return Eu
            },
            lGu: function() {
                return tr
            },
            lGw: function() {
                return k_
            },
            lMl: function() {
                return Es
            },
            lPF: function() {
                return Zm
            },
            lc7: function() {
                return qp
            },
            ljd: function() {
                return Bu
            },
            lyL: function() {
                return Hp
            },
            mrM: function() {
                return Gs
            },
            nCl: function() {
                return PA
            },
            nEu: function() {
                return qv
            },
            nNL: function() {
                return ur
            },
            nST: function() {
                return Ht
            },
            nWS: function() {
                return Rs
            },
            nZQ: function() {
                return vx
            },
            nc$: function() {
                return Ty
            },
            nzx: function() {
                return T_
            },
            o6l: function() {
                return zy
            },
            oVO: function() {
                return C0
            },
            oh6: function() {
                return ZS
            },
            ojh: function() {
                return or
            },
            ojs: function() {
                return Iu
            },
            pBf: function() {
                return Om
            },
            pFK: function() {
                return tp
            },
            pHI: function() {
                return bn
            },
            pPE: function() {
                return $A
            },
            paN: function() {
                return ds
            },
            ppV: function() {
                return Do
            },
            psI: function() {
                return Nm
            },
            q2: function() {
                return uA
            },
            qBx: function() {
                return fA
            },
            qFE: function() {
                return Wv
            },
            qIQ: function() {
                return hu
            },
            qU7: function() {
                return Hv
            },
            qUd: function() {
                return Sv
            },
            qa3: function() {
                return Xl
            },
            qad: function() {
                return ir
            },
            qtW: function() {
                return Fn
            },
            r6x: function() {
                return Ay
            },
            rFo: function() {
                return im
            },
            rKP: function() {
                return r0
            },
            rOG: function() {
                return xo
            },
            rQf: function() {
                return du
            },
            rSH: function() {
                return Ru
            },
            rYR: function() {
                return S0
            },
            s0K: function() {
                return Kx
            },
            sKt: function() {
                return mp
            },
            sPf: function() {
                return h
            },
            tBo: function() {
                return eE
            },
            tJf: function() {
                return ao
            },
            tXL: function() {
                return hA
            },
            tcD: function() {
                return Qv
            },
            tgE: function() {
                return ts
            },
            tz3: function() {
                return L_
            },
            uB5: function() {
                return Fm
            },
            uSd: function() {
                return pA
            },
            uV5: function() {
                return gn
            },
            uWO: function() {
                return Mm
            },
            uXQ: function() {
                return P0
            },
            ubm: function() {
                return Cs
            },
            uov: function() {
                return M0
            },
            ure: function() {
                return DA
            },
            veJ: function() {
                return rp
            },
            vim: function() {
                return fu
            },
            vmz: function() {
                return is
            },
            vxI: function() {
                return go
            },
            vyJ: function() {
                return Lu
            },
            wAk: function() {
                return E_
            },
            wfO: function() {
                return qr
            },
            wn6: function() {
                return Ar
            },
            wqq: function() {
                return Ou
            },
            wrO: function() {
                return ys
            },
            wtR: function() {
                return b
            },
            wvS: function() {
                return Tr
            },
            xFO: function() {
                return Or
            },
            xJ6: function() {
                return ou
            },
            xOk: function() {
                return BA
            },
            xSv: function() {
                return vr
            },
            xZx: function() {
                return VS
            },
            xfg: function() {
                return cy
            },
            y3Z: function() {
                return Um
            },
            y9J: function() {
                return n_
            },
            y_p: function() {
                return Ur
            },
            ypk: function() {
                return Pp
            },
            ywQ: function() {
                return at
            },
            z5: function() {
                return Wo
            },
            zD7: function() {
                return GA
            },
            zdS: function() {
                return Ys
            },
            zgK: function() {
                return um
            },
            zkh: function() {
                return qs
            },
            znC: function() {
                return Kt
            }
        });
        const h = "157"
          , _ = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2
        }
          , b = {
            ROTATE: 0,
            PAN: 1,
            DOLLY_PAN: 2,
            DOLLY_ROTATE: 3
        }
          , _e = 0
          , nt = 1
          , it = 2
          , at = 3
          , ut = 0
          , pt = 1
          , ht = 2
          , _t = 3
          , vt = 0
          , bt = 1
          , St = 2
          , At = 2
          , Et = 0
          , Pt = 1
          , It = 2
          , Dt = 3
          , Gt = 4
          , Bt = 5
          , kt = 100
          , Ut = 101
          , Ht = 102
          , Kt = 103
          , Jt = 104
          , or = 200
          , ir = 201
          , lr = 202
          , ar = 203
          , hr = 204
          , gr = 205
          , dr = 206
          , cr = 207
          , Ar = 208
          , wr = 209
          , Rr = 210
          , Cr = 0
          , tr = 1
          , fr = 2
          , vr = 3
          , Zr = 4
          , rn = 5
          , hn = 6
          , Nn = 7
          , Wn = 0
          , qn = 1
          , mo = 2
          , Ur = 0
          , nn = 1
          , xn = 2
          , ur = 3
          , pr = 4
          , Ir = 5
          , jr = 300
          , Qr = 301
          , Or = 302
          , qr = 303
          , gn = 304
          , Mn = 306
          , Tn = 1e3
          , wn = 1001
          , Cn = 1002
          , fn = 1003
          , bn = 1004
          , Xn = 1004
          , En = 1005
          , Qn = 1005
          , Rn = 1006
          , Yn = 1007
          , Bo = 1007
          , vo = 1008
          , Hn = 1008
          , $n = 1009
          , ao = 1010
          , zo = 1011
          , Zo = 1012
          , $o = 1013
          , Yo = 1014
          , ss = 1015
          , Os = 1016
          , $l = 1017
          , wl = 1018
          , Ps = 1020
          , ys = 1021
          , as = 1023
          , Ln = 1024
          , Vn = 1025
          , Ys = 1026
          , Eo = 1027
          , Sl = 1028
          , Ks = 1029
          , ds = 1030
          , yo = 1031
          , ko = 1033
          , xs = 33776
          , Js = 33777
          , bs = 33778
          , Bl = 33779
          , Bm = 35840
          , Vp = 35841
          , Lm = 35842
          , Om = 35843
          , G_ = 36196
          , lu = 37492
          , Zs = 37496
          , Xl = 37808
          , cu = 37809
          , Gp = 37810
          , Ru = 37811
          , op = 37812
          , Nm = 37813
          , uu = 37814
          , zp = 37815
          , Fm = 37816
          , Hp = 37817
          , Qp = 37818
          , Um = 37819
          , Iu = 37820
          , Wp = 37821
          , sp = 36492
          , jm = 36494
          , Vm = 36495
          , z_ = 36283
          , Gm = 36284
          , zm = 36285
          , ap = 36286
          , ku = 2200
          , Du = 2201
          , qp = 2202
          , Bu = 2300
          , lp = 2301
          , $p = 2302
          , du = 2400
          , pu = 2401
          , cp = 2402
          , Hm = 2500
          , Xp = 2501
          , Ll = 0
          , H_ = 1
          , S0 = 2
          , ts = 3e3
          , Ol = 3001
          , up = 3200
          , Qm = 3201
          , El = 0
          , Lu = 1
          , Oo = ""
          , jo = "srgb"
          , Xo = "srgb-linear"
          , dp = "display-p3"
          , hu = "display-p3-linear"
          , ps = "rgbm-16"
          , No = "linear"
          , Vo = "srgb"
          , Wo = "rec709"
          , Ou = "p3"
          , Hs = 0
          , Yp = 7680
          , pp = 7681
          , Wm = 7682
          , E0 = 7683
          , T0 = 34055
          , qm = 34056
          , C0 = 5386
          , $m = 512
          , hp = 513
          , Kp = 514
          , Q_ = 515
          , Yl = 516
          , W_ = 517
          , Xm = 518
          , mp = 519
          , mu = 512
          , fu = 513
          , fp = 514
          , q_ = 515
          , $_ = 516
          , X_ = 517
          , Kl = 518
          , Y_ = 519
          , Nu = 35044
          , gu = 35048
          , K_ = 35040
          , P0 = 35045
          , Jp = 35049
          , M0 = 35041
          , J_ = 35046
          , Zp = 35050
          , xo = 35042
          , Jl = "100"
          , Ym = "300 es"
          , _h = 1035
          , Qs = 2e3
          , na = 2001;
        class As {
            addEventListener(tt, lt) {
                this._listeners === void 0 && (this._listeners = {});
                const mt = this._listeners;
                mt[tt] === void 0 && (mt[tt] = []),
                mt[tt].indexOf(lt) === -1 && mt[tt].push(lt)
            }
            hasEventListener(tt, lt) {
                if (this._listeners === void 0)
                    return !1;
                const mt = this._listeners;
                return mt[tt] !== void 0 && mt[tt].indexOf(lt) !== -1
            }
            removeEventListener(tt, lt) {
                if (this._listeners === void 0)
                    return;
                const mt = this._listeners[tt];
                if (mt !== void 0) {
                    const ft = mt.indexOf(lt);
                    ft !== -1 && mt.splice(ft, 1)
                }
            }
            dispatchEvent(tt) {
                if (this._listeners === void 0)
                    return;
                const lt = this._listeners[tt.type];
                if (lt !== void 0) {
                    tt.target = this;
                    const mt = lt.slice(0);
                    for (let ft = 0, xt = mt.length; ft < xt; ft++)
                        mt[ft].call(this, tt);
                    tt.target = null
                }
            }
        }
        const Go = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
        let Z_ = 1234567;
        const Zl = Math.PI / 180
          , _u = 180 / Math.PI;
        function Ms() {
            const Tt = 4294967295 * Math.random() | 0
              , tt = 4294967295 * Math.random() | 0
              , lt = 4294967295 * Math.random() | 0
              , mt = 4294967295 * Math.random() | 0;
            return (Go[255 & Tt] + Go[Tt >> 8 & 255] + Go[Tt >> 16 & 255] + Go[Tt >> 24 & 255] + "-" + Go[255 & tt] + Go[tt >> 8 & 255] + "-" + Go[tt >> 16 & 15 | 64] + Go[tt >> 24 & 255] + "-" + Go[63 & lt | 128] + Go[lt >> 8 & 255] + "-" + Go[lt >> 16 & 255] + Go[lt >> 24 & 255] + Go[255 & mt] + Go[mt >> 8 & 255] + Go[mt >> 16 & 255] + Go[mt >> 24 & 255]).toLowerCase()
        }
        function qo(Tt, tt, lt) {
            return Math.max(tt, Math.min(lt, Tt))
        }
        function em(Tt, tt) {
            return (Tt % tt + tt) % tt
        }
        function Fu(Tt, tt, lt) {
            return (1 - lt) * Tt + lt * tt
        }
        function tm(Tt) {
            return !(Tt & Tt - 1) && Tt !== 0
        }
        function Km(Tt) {
            return Math.pow(2, Math.ceil(Math.log(Tt) / Math.LN2))
        }
        function gp(Tt) {
            return Math.pow(2, Math.floor(Math.log(Tt) / Math.LN2))
        }
        function ws(Tt, tt) {
            switch (tt.constructor) {
            case Float32Array:
                return Tt;
            case Uint32Array:
                return Tt / 4294967295;
            case Uint16Array:
                return Tt / 65535;
            case Uint8Array:
                return Tt / 255;
            case Int32Array:
                return Math.max(Tt / 2147483647, -1);
            case Int16Array:
                return Math.max(Tt / 32767, -1);
            case Int8Array:
                return Math.max(Tt / 127, -1);
            default:
                throw new Error("Invalid component type.")
            }
        }
        function oo(Tt, tt) {
            switch (tt.constructor) {
            case Float32Array:
                return Tt;
            case Uint32Array:
                return Math.round(4294967295 * Tt);
            case Uint16Array:
                return Math.round(65535 * Tt);
            case Uint8Array:
                return Math.round(255 * Tt);
            case Int32Array:
                return Math.round(2147483647 * Tt);
            case Int16Array:
                return Math.round(32767 * Tt);
            case Int8Array:
                return Math.round(127 * Tt);
            default:
                throw new Error("Invalid component type.")
            }
        }
        const ev = {
            DEG2RAD: Zl,
            RAD2DEG: _u,
            generateUUID: Ms,
            clamp: qo,
            euclideanModulo: em,
            mapLinear: function(Tt, tt, lt, mt, ft) {
                return mt + (Tt - tt) * (ft - mt) / (lt - tt)
            },
            inverseLerp: function(Tt, tt, lt) {
                return Tt !== tt ? (lt - Tt) / (tt - Tt) : 0
            },
            lerp: Fu,
            damp: function(Tt, tt, lt, mt) {
                return Fu(Tt, tt, 1 - Math.exp(-lt * mt))
            },
            pingpong: function(Tt, tt=1) {
                return tt - Math.abs(em(Tt, 2 * tt) - tt)
            },
            smoothstep: function(Tt, tt, lt) {
                return Tt <= tt ? 0 : Tt >= lt ? 1 : (Tt = (Tt - tt) / (lt - tt)) * Tt * (3 - 2 * Tt)
            },
            smootherstep: function(Tt, tt, lt) {
                return Tt <= tt ? 0 : Tt >= lt ? 1 : (Tt = (Tt - tt) / (lt - tt)) * Tt * Tt * (Tt * (6 * Tt - 15) + 10)
            },
            randInt: function(Tt, tt) {
                return Tt + Math.floor(Math.random() * (tt - Tt + 1))
            },
            randFloat: function(Tt, tt) {
                return Tt + Math.random() * (tt - Tt)
            },
            randFloatSpread: function(Tt) {
                return Tt * (.5 - Math.random())
            },
            seededRandom: function(Tt) {
                Tt !== void 0 && (Z_ = Tt);
                let tt = Z_ += 1831565813;
                return tt = Math.imul(tt ^ tt >>> 15, 1 | tt),
                tt ^= tt + Math.imul(tt ^ tt >>> 7, 61 | tt),
                ((tt ^ tt >>> 14) >>> 0) / 4294967296
            },
            degToRad: function(Tt) {
                return Tt * Zl
            },
            radToDeg: function(Tt) {
                return Tt * _u
            },
            isPowerOfTwo: tm,
            ceilPowerOfTwo: Km,
            floorPowerOfTwo: gp,
            setQuaternionFromProperEuler: function(Tt, tt, lt, mt, ft) {
                const xt = Math.cos
                  , Ct = Math.sin
                  , Mt = xt(lt / 2)
                  , Lt = Ct(lt / 2)
                  , Nt = xt((tt + mt) / 2)
                  , jt = Ct((tt + mt) / 2)
                  , Wt = xt((tt - mt) / 2)
                  , Qt = Ct((tt - mt) / 2)
                  , qt = xt((mt - tt) / 2)
                  , Xt = Ct((mt - tt) / 2);
                switch (ft) {
                case "XYX":
                    Tt.set(Mt * jt, Lt * Wt, Lt * Qt, Mt * Nt);
                    break;
                case "YZY":
                    Tt.set(Lt * Qt, Mt * jt, Lt * Wt, Mt * Nt);
                    break;
                case "ZXZ":
                    Tt.set(Lt * Wt, Lt * Qt, Mt * jt, Mt * Nt);
                    break;
                case "XZX":
                    Tt.set(Mt * jt, Lt * Xt, Lt * qt, Mt * Nt);
                    break;
                case "YXY":
                    Tt.set(Lt * qt, Mt * jt, Lt * Xt, Mt * Nt);
                    break;
                case "ZYZ":
                    Tt.set(Lt * Xt, Lt * qt, Mt * jt, Mt * Nt);
                    break;
                default:
                    console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + ft)
                }
            },
            normalize: oo,
            denormalize: ws
        };
        class mn {
            constructor(tt=0, lt=0) {
                mn.prototype.isVector2 = !0,
                this.x = tt,
                this.y = lt
            }
            get width() {
                return this.x
            }
            set width(tt) {
                this.x = tt
            }
            get height() {
                return this.y
            }
            set height(tt) {
                this.y = tt
            }
            set(tt, lt) {
                return this.x = tt,
                this.y = lt,
                this
            }
            setScalar(tt) {
                return this.x = tt,
                this.y = tt,
                this
            }
            setX(tt) {
                return this.x = tt,
                this
            }
            setY(tt) {
                return this.y = tt,
                this
            }
            setComponent(tt, lt) {
                switch (tt) {
                case 0:
                    this.x = lt;
                    break;
                case 1:
                    this.y = lt;
                    break;
                default:
                    throw new Error("index is out of range: " + tt)
                }
                return this
            }
            getComponent(tt) {
                switch (tt) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw new Error("index is out of range: " + tt)
                }
            }
            clone() {
                return new this.constructor(this.x,this.y)
            }
            copy(tt) {
                return this.x = tt.x,
                this.y = tt.y,
                this
            }
            add(tt) {
                return this.x += tt.x,
                this.y += tt.y,
                this
            }
            addScalar(tt) {
                return this.x += tt,
                this.y += tt,
                this
            }
            addVectors(tt, lt) {
                return this.x = tt.x + lt.x,
                this.y = tt.y + lt.y,
                this
            }
            addScaledVector(tt, lt) {
                return this.x += tt.x * lt,
                this.y += tt.y * lt,
                this
            }
            sub(tt) {
                return this.x -= tt.x,
                this.y -= tt.y,
                this
            }
            subScalar(tt) {
                return this.x -= tt,
                this.y -= tt,
                this
            }
            subVectors(tt, lt) {
                return this.x = tt.x - lt.x,
                this.y = tt.y - lt.y,
                this
            }
            multiply(tt) {
                return this.x *= tt.x,
                this.y *= tt.y,
                this
            }
            multiplyScalar(tt) {
                return this.x *= tt,
                this.y *= tt,
                this
            }
            divide(tt) {
                return this.x /= tt.x,
                this.y /= tt.y,
                this
            }
            divideScalar(tt) {
                return this.multiplyScalar(1 / tt)
            }
            applyMatrix3(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = tt.elements;
                return this.x = ft[0] * lt + ft[3] * mt + ft[6],
                this.y = ft[1] * lt + ft[4] * mt + ft[7],
                this
            }
            min(tt) {
                return this.x = Math.min(this.x, tt.x),
                this.y = Math.min(this.y, tt.y),
                this
            }
            max(tt) {
                return this.x = Math.max(this.x, tt.x),
                this.y = Math.max(this.y, tt.y),
                this
            }
            clamp(tt, lt) {
                return this.x = Math.max(tt.x, Math.min(lt.x, this.x)),
                this.y = Math.max(tt.y, Math.min(lt.y, this.y)),
                this
            }
            clampScalar(tt, lt) {
                return this.x = Math.max(tt, Math.min(lt, this.x)),
                this.y = Math.max(tt, Math.min(lt, this.y)),
                this
            }
            clampLength(tt, lt) {
                const mt = this.length();
                return this.divideScalar(mt || 1).multiplyScalar(Math.max(tt, Math.min(lt, mt)))
            }
            floor() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this
            }
            ceil() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this
            }
            round() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this
            }
            roundToZero() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this
            }
            negate() {
                return this.x = -this.x,
                this.y = -this.y,
                this
            }
            dot(tt) {
                return this.x * tt.x + this.y * tt.y
            }
            cross(tt) {
                return this.x * tt.y - this.y * tt.x
            }
            lengthSq() {
                return this.x * this.x + this.y * this.y
            }
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y)
            }
            normalize() {
                return this.divideScalar(this.length() || 1)
            }
            angle() {
                return Math.atan2(-this.y, -this.x) + Math.PI
            }
            angleTo(tt) {
                const lt = Math.sqrt(this.lengthSq() * tt.lengthSq());
                if (lt === 0)
                    return Math.PI / 2;
                const mt = this.dot(tt) / lt;
                return Math.acos(qo(mt, -1, 1))
            }
            distanceTo(tt) {
                return Math.sqrt(this.distanceToSquared(tt))
            }
            distanceToSquared(tt) {
                const lt = this.x - tt.x
                  , mt = this.y - tt.y;
                return lt * lt + mt * mt
            }
            manhattanDistanceTo(tt) {
                return Math.abs(this.x - tt.x) + Math.abs(this.y - tt.y)
            }
            setLength(tt) {
                return this.normalize().multiplyScalar(tt)
            }
            lerp(tt, lt) {
                return this.x += (tt.x - this.x) * lt,
                this.y += (tt.y - this.y) * lt,
                this
            }
            lerpVectors(tt, lt, mt) {
                return this.x = tt.x + (lt.x - tt.x) * mt,
                this.y = tt.y + (lt.y - tt.y) * mt,
                this
            }
            equals(tt) {
                return tt.x === this.x && tt.y === this.y
            }
            fromArray(tt, lt=0) {
                return this.x = tt[lt],
                this.y = tt[lt + 1],
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this.x,
                tt[lt + 1] = this.y,
                tt
            }
            fromBufferAttribute(tt, lt) {
                return this.x = tt.getX(lt),
                this.y = tt.getY(lt),
                this
            }
            rotateAround(tt, lt) {
                const mt = Math.cos(lt)
                  , ft = Math.sin(lt)
                  , xt = this.x - tt.x
                  , Ct = this.y - tt.y;
                return this.x = xt * mt - Ct * ft + tt.x,
                this.y = xt * ft + Ct * mt + tt.y,
                this
            }
            random() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this
            }
            *[Symbol.iterator]() {
                yield this.x,
                yield this.y
            }
        }
        class lo {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt) {
                lo.prototype.isMatrix3 = !0,
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1],
                tt !== void 0 && this.set(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt)
            }
            set(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt) {
                const jt = this.elements;
                return jt[0] = tt,
                jt[1] = ft,
                jt[2] = Mt,
                jt[3] = lt,
                jt[4] = xt,
                jt[5] = Lt,
                jt[6] = mt,
                jt[7] = Ct,
                jt[8] = Nt,
                this
            }
            identity() {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
                this
            }
            copy(tt) {
                const lt = this.elements
                  , mt = tt.elements;
                return lt[0] = mt[0],
                lt[1] = mt[1],
                lt[2] = mt[2],
                lt[3] = mt[3],
                lt[4] = mt[4],
                lt[5] = mt[5],
                lt[6] = mt[6],
                lt[7] = mt[7],
                lt[8] = mt[8],
                this
            }
            extractBasis(tt, lt, mt) {
                return tt.setFromMatrix3Column(this, 0),
                lt.setFromMatrix3Column(this, 1),
                mt.setFromMatrix3Column(this, 2),
                this
            }
            setFromMatrix4(tt) {
                const lt = tt.elements;
                return this.set(lt[0], lt[4], lt[8], lt[1], lt[5], lt[9], lt[2], lt[6], lt[10]),
                this
            }
            multiply(tt) {
                return this.multiplyMatrices(this, tt)
            }
            premultiply(tt) {
                return this.multiplyMatrices(tt, this)
            }
            multiplyMatrices(tt, lt) {
                const mt = tt.elements
                  , ft = lt.elements
                  , xt = this.elements
                  , Ct = mt[0]
                  , Mt = mt[3]
                  , Lt = mt[6]
                  , Nt = mt[1]
                  , jt = mt[4]
                  , Wt = mt[7]
                  , Qt = mt[2]
                  , qt = mt[5]
                  , Xt = mt[8]
                  , Zt = ft[0]
                  , Yt = ft[3]
                  , sr = ft[6]
                  , er = ft[1]
                  , rr = ft[4]
                  , xr = ft[7]
                  , br = ft[2]
                  , yr = ft[5]
                  , Pr = ft[8];
                return xt[0] = Ct * Zt + Mt * er + Lt * br,
                xt[3] = Ct * Yt + Mt * rr + Lt * yr,
                xt[6] = Ct * sr + Mt * xr + Lt * Pr,
                xt[1] = Nt * Zt + jt * er + Wt * br,
                xt[4] = Nt * Yt + jt * rr + Wt * yr,
                xt[7] = Nt * sr + jt * xr + Wt * Pr,
                xt[2] = Qt * Zt + qt * er + Xt * br,
                xt[5] = Qt * Yt + qt * rr + Xt * yr,
                xt[8] = Qt * sr + qt * xr + Xt * Pr,
                this
            }
            multiplyScalar(tt) {
                const lt = this.elements;
                return lt[0] *= tt,
                lt[3] *= tt,
                lt[6] *= tt,
                lt[1] *= tt,
                lt[4] *= tt,
                lt[7] *= tt,
                lt[2] *= tt,
                lt[5] *= tt,
                lt[8] *= tt,
                this
            }
            determinant() {
                const tt = this.elements
                  , lt = tt[0]
                  , mt = tt[1]
                  , ft = tt[2]
                  , xt = tt[3]
                  , Ct = tt[4]
                  , Mt = tt[5]
                  , Lt = tt[6]
                  , Nt = tt[7]
                  , jt = tt[8];
                return lt * Ct * jt - lt * Mt * Nt - mt * xt * jt + mt * Mt * Lt + ft * xt * Nt - ft * Ct * Lt
            }
            invert() {
                const tt = this.elements
                  , lt = tt[0]
                  , mt = tt[1]
                  , ft = tt[2]
                  , xt = tt[3]
                  , Ct = tt[4]
                  , Mt = tt[5]
                  , Lt = tt[6]
                  , Nt = tt[7]
                  , jt = tt[8]
                  , Wt = jt * Ct - Mt * Nt
                  , Qt = Mt * Lt - jt * xt
                  , qt = Nt * xt - Ct * Lt
                  , Xt = lt * Wt + mt * Qt + ft * qt;
                if (Xt === 0)
                    return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
                const Zt = 1 / Xt;
                return tt[0] = Wt * Zt,
                tt[1] = (ft * Nt - jt * mt) * Zt,
                tt[2] = (Mt * mt - ft * Ct) * Zt,
                tt[3] = Qt * Zt,
                tt[4] = (jt * lt - ft * Lt) * Zt,
                tt[5] = (ft * xt - Mt * lt) * Zt,
                tt[6] = qt * Zt,
                tt[7] = (mt * Lt - Nt * lt) * Zt,
                tt[8] = (Ct * lt - mt * xt) * Zt,
                this
            }
            transpose() {
                let tt;
                const lt = this.elements;
                return tt = lt[1],
                lt[1] = lt[3],
                lt[3] = tt,
                tt = lt[2],
                lt[2] = lt[6],
                lt[6] = tt,
                tt = lt[5],
                lt[5] = lt[7],
                lt[7] = tt,
                this
            }
            getNormalMatrix(tt) {
                return this.setFromMatrix4(tt).invert().transpose()
            }
            transposeIntoArray(tt) {
                const lt = this.elements;
                return tt[0] = lt[0],
                tt[1] = lt[3],
                tt[2] = lt[6],
                tt[3] = lt[1],
                tt[4] = lt[4],
                tt[5] = lt[7],
                tt[6] = lt[2],
                tt[7] = lt[5],
                tt[8] = lt[8],
                this
            }
            setUvTransform(tt, lt, mt, ft, xt, Ct, Mt) {
                const Lt = Math.cos(xt)
                  , Nt = Math.sin(xt);
                return this.set(mt * Lt, mt * Nt, -mt * (Lt * Ct + Nt * Mt) + Ct + tt, -ft * Nt, ft * Lt, -ft * (-Nt * Ct + Lt * Mt) + Mt + lt, 0, 0, 1),
                this
            }
            scale(tt, lt) {
                return this.premultiply(rm.makeScale(tt, lt)),
                this
            }
            rotate(tt) {
                return this.premultiply(rm.makeRotation(-tt)),
                this
            }
            translate(tt, lt) {
                return this.premultiply(rm.makeTranslation(tt, lt)),
                this
            }
            makeTranslation(tt, lt) {
                return tt.isVector2 ? this.set(1, 0, tt.x, 0, 1, tt.y, 0, 0, 1) : this.set(1, 0, tt, 0, 1, lt, 0, 0, 1),
                this
            }
            makeRotation(tt) {
                const lt = Math.cos(tt)
                  , mt = Math.sin(tt);
                return this.set(lt, -mt, 0, mt, lt, 0, 0, 0, 1),
                this
            }
            makeScale(tt, lt) {
                return this.set(tt, 0, 0, 0, lt, 0, 0, 0, 1),
                this
            }
            equals(tt) {
                const lt = this.elements
                  , mt = tt.elements;
                for (let ft = 0; ft < 9; ft++)
                    if (lt[ft] !== mt[ft])
                        return !1;
                return !0
            }
            fromArray(tt, lt=0) {
                for (let mt = 0; mt < 9; mt++)
                    this.elements[mt] = tt[mt + lt];
                return this
            }
            toArray(tt=[], lt=0) {
                const mt = this.elements;
                return tt[lt] = mt[0],
                tt[lt + 1] = mt[1],
                tt[lt + 2] = mt[2],
                tt[lt + 3] = mt[3],
                tt[lt + 4] = mt[4],
                tt[lt + 5] = mt[5],
                tt[lt + 6] = mt[6],
                tt[lt + 7] = mt[7],
                tt[lt + 8] = mt[8],
                tt
            }
            clone() {
                return new this.constructor().fromArray(this.elements)
            }
        }
        const rm = new lo;
        function tv(Tt) {
            for (let tt = Tt.length - 1; tt >= 0; --tt)
                if (Tt[tt] >= 65535)
                    return !0;
            return !1
        }
        const Jm = {
            Int8Array,
            Uint8Array,
            Uint8ClampedArray,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array
        };
        function vu(Tt, tt) {
            return new Jm[Tt](tt)
        }
        function yu(Tt) {
            return document.createElementNS("http://www.w3.org/1999/xhtml", Tt)
        }
        function Zm() {
            const Tt = yu("canvas");
            return Tt.style.display = "block",
            Tt
        }
        const _f = {};
        function xu(Tt) {
            Tt in _f || (_f[Tt] = !0,
            console.warn(Tt))
        }
        const _g = new lo().set(.8224621, .177538, 0, .0331941, .9668058, 0, .0170827, .0723974, .9105199)
          , rv = new lo().set(1.2249401, -.2249404, 0, -.0420569, 1.0420571, 0, -.0196376, -.0786361, 1.0982735)
          , bu = {
            [Xo]: {
                transfer: No,
                primaries: Wo,
                toReference: Tt => Tt,
                fromReference: Tt => Tt
            },
            [jo]: {
                transfer: Vo,
                primaries: Wo,
                toReference: Tt => Tt.convertSRGBToLinear(),
                fromReference: Tt => Tt.convertLinearToSRGB()
            },
            [hu]: {
                transfer: No,
                primaries: Ou,
                toReference: Tt => Tt.applyMatrix3(rv),
                fromReference: Tt => Tt.applyMatrix3(_g)
            },
            [dp]: {
                transfer: Vo,
                primaries: Ou,
                toReference: Tt => Tt.convertSRGBToLinear().applyMatrix3(rv),
                fromReference: Tt => Tt.applyMatrix3(_g).convertLinearToSRGB()
            }
        }
          , R0 = new Set([Xo, hu])
          , Do = {
            enabled: !0,
            _workingColorSpace: Xo,
            get legacyMode() {
                return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),
                !this.enabled
            },
            set legacyMode(Tt) {
                console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),
                this.enabled = !Tt
            },
            get workingColorSpace() {
                return this._workingColorSpace
            },
            set workingColorSpace(Tt) {
                if (!R0.has(Tt))
                    throw new Error(`Unsupported working color space, "${Tt}".`);
                this._workingColorSpace = Tt
            },
            convert: function(Tt, tt, lt) {
                if (this.enabled === !1 || tt === lt || !tt || !lt)
                    return Tt;
                const mt = bu[tt].toReference;
                return (0,
                bu[lt].fromReference)(mt(Tt))
            },
            fromWorkingColorSpace: function(Tt, tt) {
                return this.convert(Tt, this._workingColorSpace, tt)
            },
            toWorkingColorSpace: function(Tt, tt) {
                return this.convert(Tt, tt, this._workingColorSpace)
            },
            getPrimaries: function(Tt) {
                return bu[Tt].primaries
            },
            getTransfer: function(Tt) {
                return Tt === Oo || Tt === ps ? No : bu[Tt].transfer
            }
        };
        function Uu(Tt) {
            return Tt < .04045 ? .0773993808 * Tt : Math.pow(.9478672986 * Tt + .0521327014, 2.4)
        }
        function nm(Tt) {
            return Tt < .0031308 ? 12.92 * Tt : 1.055 * Math.pow(Tt, .41666) - .055
        }
        let ju;
        class e_ {
            static getDataURL(tt, lt=!1) {
                if (/^data:/i.test(tt.src) || typeof HTMLCanvasElement > "u")
                    return tt.src;
                let mt;
                if (tt instanceof HTMLCanvasElement)
                    mt = tt;
                else {
                    ju === void 0 && (ju = yu("canvas")),
                    ju.width = tt.width,
                    ju.height = tt.height;
                    const ft = ju.getContext("2d");
                    tt instanceof ImageData ? ft.putImageData(tt, 0, 0) : ft.drawImage(tt, 0, 0, tt.width, tt.height),
                    mt = ju
                }
                return !lt && (mt.width > 2048 || mt.height > 2048) ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", tt),
                mt.toDataURL("image/jpeg", .6)) : mt.toDataURL("image/png")
            }
            static sRGBToLinear(tt) {
                if (typeof HTMLImageElement < "u" && tt instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && tt instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && tt instanceof ImageBitmap) {
                    const lt = yu("canvas");
                    lt.width = tt.width,
                    lt.height = tt.height;
                    const mt = lt.getContext("2d");
                    mt.drawImage(tt, 0, 0, tt.width, tt.height);
                    const ft = mt.getImageData(0, 0, tt.width, tt.height)
                      , xt = ft.data;
                    for (let Ct = 0; Ct < xt.length; Ct++)
                        xt[Ct] = 255 * Uu(xt[Ct] / 255);
                    return mt.putImageData(ft, 0, 0),
                    lt
                }
                if (tt.data) {
                    const lt = tt.data.slice(0);
                    for (let mt = 0; mt < lt.length; mt++)
                        lt instanceof Uint8Array || lt instanceof Uint8ClampedArray ? lt[mt] = Math.floor(255 * Uu(lt[mt] / 255)) : lt[mt] = Uu(lt[mt]);
                    return {
                        data: lt,
                        width: tt.width,
                        height: tt.height
                    }
                }
                return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),
                tt
            }
        }
        let t_ = 0;
        class ga {
            constructor(tt=null) {
                this.isSource = !0,
                Object.defineProperty(this, "id", {
                    value: t_++
                }),
                this.uuid = Ms(),
                this.data = tt,
                this.version = 0
            }
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
            toJSON(tt) {
                const lt = tt === void 0 || typeof tt == "string";
                if (!lt && tt.images[this.uuid] !== void 0)
                    return tt.images[this.uuid];
                const mt = {
                    uuid: this.uuid,
                    url: ""
                }
                  , ft = this.data;
                if (ft !== null) {
                    let xt;
                    if (Array.isArray(ft)) {
                        xt = [];
                        for (let Ct = 0, Mt = ft.length; Ct < Mt; Ct++)
                            ft[Ct].isDataTexture ? xt.push(r_(ft[Ct].image)) : xt.push(r_(ft[Ct]))
                    } else
                        xt = r_(ft);
                    mt.url = xt
                }
                return lt || (tt.images[this.uuid] = mt),
                mt
            }
        }
        function r_(Tt) {
            if (typeof HTMLImageElement < "u" && Tt instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && Tt instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && Tt instanceof ImageBitmap)
                return e_.getDataURL(Tt);
            if (Tt.data) {
                let tt = [];
                try {
                    tt = Array.from(Tt.data)
                } catch (lt) {
                    lt.message.includes("Invalid array length") ? console.warn("Serializing large texture, might not be saved in JSON structure.") : console.error(lt),
                    tt = Tt.data
                }
                return {
                    data: tt,
                    width: Tt.width,
                    height: Tt.height,
                    type: Tt.data.constructor.name
                }
            }
            return Tt.url !== void 0 ? Tt.url : (console.warn("THREE.Texture: Unable to serialize Texture."),
            {})
        }
        let I0 = 0;
        class Ho extends As {
            constructor(tt=Ho.DEFAULT_IMAGE, lt=Ho.DEFAULT_MAPPING, mt=wn, ft=wn, xt=Rn, Ct=vo, Mt=as, Lt=$n, Nt=Ho.DEFAULT_ANISOTROPY, jt=Oo) {
                super(),
                this.isTexture = !0,
                Object.defineProperty(this, "id", {
                    value: I0++
                }),
                this.uuid = Ms(),
                this.name = "",
                this.source = new ga(tt),
                this.mipmaps = [],
                this.mapping = lt,
                this.channel = 0,
                this.wrapS = mt,
                this.wrapT = ft,
                this.magFilter = xt,
                this.minFilter = Ct,
                this.anisotropy = Nt,
                this.format = Mt,
                this.internalFormat = null,
                this.type = Lt,
                this.offset = new mn(0,0),
                this.repeat = new mn(1,1),
                this.center = new mn(0,0),
                this.rotation = 0,
                this.matrixAutoUpdate = !0,
                this.matrix = new lo,
                this.generateMipmaps = !0,
                this.premultiplyAlpha = !1,
                this.flipY = !0,
                this.unpackAlignment = 4,
                typeof jt == "string" ? this.colorSpace = jt : (xu("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
                this.colorSpace = jt === Ol ? jo : Oo),
                this.userData = {},
                this.version = 0,
                this.onUpdate = null,
                this.isRenderTargetTexture = !1,
                this.needsPMREMUpdate = !1,
                tt instanceof ImageData && (this.needsUpdate = !0)
            }
            get image() {
                return this.source.data
            }
            set image(tt=null) {
                this.source.data = tt
            }
            updateMatrix() {
                this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                return this.name = tt.name,
                this.source = tt.source,
                this.mipmaps = tt.mipmaps.slice(0),
                this.mapping = tt.mapping,
                this.channel = tt.channel,
                this.wrapS = tt.wrapS,
                this.wrapT = tt.wrapT,
                this.magFilter = tt.magFilter,
                this.minFilter = tt.minFilter,
                this.anisotropy = tt.anisotropy,
                this.format = tt.format,
                this.internalFormat = tt.internalFormat,
                this.type = tt.type,
                this.offset.copy(tt.offset),
                this.repeat.copy(tt.repeat),
                this.center.copy(tt.center),
                this.rotation = tt.rotation,
                this.matrixAutoUpdate = tt.matrixAutoUpdate,
                this.matrix.copy(tt.matrix),
                this.generateMipmaps = tt.generateMipmaps,
                this.premultiplyAlpha = tt.premultiplyAlpha,
                this.flipY = tt.flipY,
                this.unpackAlignment = tt.unpackAlignment,
                this.colorSpace = tt.colorSpace,
                this.userData = JSON.parse(JSON.stringify(tt.userData)),
                this.needsUpdate = !0,
                this
            }
            toJSON(tt) {
                const lt = tt === void 0 || typeof tt == "string";
                if (!lt && tt.textures && tt.textures[this.uuid] !== void 0)
                    return tt.textures[this.uuid];
                const mt = {
                    metadata: {
                        version: 4.6,
                        type: "Texture",
                        generator: "Texture.toJSON"
                    },
                    uuid: this.uuid,
                    name: this.name,
                    image: this.source.toJSON(tt).uuid,
                    mapping: this.mapping,
                    channel: this.channel,
                    repeat: [this.repeat.x, this.repeat.y],
                    offset: [this.offset.x, this.offset.y],
                    center: [this.center.x, this.center.y],
                    rotation: this.rotation,
                    wrap: [this.wrapS, this.wrapT],
                    format: this.format,
                    internalFormat: this.internalFormat,
                    type: this.type,
                    colorSpace: this.colorSpace,
                    encoding: this.colorSpace === jo ? Ol : ts,
                    minFilter: this.minFilter,
                    magFilter: this.magFilter,
                    anisotropy: this.anisotropy,
                    flipY: this.flipY,
                    generateMipmaps: this.generateMipmaps,
                    premultiplyAlpha: this.premultiplyAlpha,
                    unpackAlignment: this.unpackAlignment
                };
                return Object.keys(this.userData).length > 0 && (mt.userData = this.userData),
                !lt && tt.textures && (tt.textures[this.uuid] = mt),
                mt
            }
            dispose() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
            transformUv(tt) {
                if (this.mapping !== jr)
                    return tt;
                if (tt.applyMatrix3(this.matrix),
                tt.x < 0 || tt.x > 1)
                    switch (this.wrapS) {
                    case Tn:
                        tt.x = tt.x - Math.floor(tt.x);
                        break;
                    case wn:
                        tt.x = tt.x < 0 ? 0 : 1;
                        break;
                    case Cn:
                        Math.abs(Math.floor(tt.x) % 2) === 1 ? tt.x = Math.ceil(tt.x) - tt.x : tt.x = tt.x - Math.floor(tt.x)
                    }
                if (tt.y < 0 || tt.y > 1)
                    switch (this.wrapT) {
                    case Tn:
                        tt.y = tt.y - Math.floor(tt.y);
                        break;
                    case wn:
                        tt.y = tt.y < 0 ? 0 : 1;
                        break;
                    case Cn:
                        Math.abs(Math.floor(tt.y) % 2) === 1 ? tt.y = Math.ceil(tt.y) - tt.y : tt.y = tt.y - Math.floor(tt.y)
                    }
                return this.flipY && (tt.y = 1 - tt.y),
                tt
            }
            set needsUpdate(tt) {
                tt === !0 && (this.version++,
                this.source.needsUpdate = !0,
                this.dispatchEvent({
                    type: "update"
                }))
            }
            get encoding() {
                return xu("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
                this.colorSpace === jo ? Ol : ts
            }
            set encoding(tt) {
                xu("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
                this.colorSpace = tt === Ol ? jo : Oo
            }
        }
        Ho.DEFAULT_IMAGE = null,
        Ho.DEFAULT_MAPPING = jr,
        Ho.DEFAULT_ANISOTROPY = 1;
        class Lo {
            constructor(tt=0, lt=0, mt=0, ft=1) {
                Lo.prototype.isVector4 = !0,
                this.x = tt,
                this.y = lt,
                this.z = mt,
                this.w = ft
            }
            get width() {
                return this.z
            }
            set width(tt) {
                this.z = tt
            }
            get height() {
                return this.w
            }
            set height(tt) {
                this.w = tt
            }
            set(tt, lt, mt, ft) {
                return this.x = tt,
                this.y = lt,
                this.z = mt,
                this.w = ft,
                this
            }
            setScalar(tt) {
                return this.x = tt,
                this.y = tt,
                this.z = tt,
                this.w = tt,
                this
            }
            setX(tt) {
                return this.x = tt,
                this
            }
            setY(tt) {
                return this.y = tt,
                this
            }
            setZ(tt) {
                return this.z = tt,
                this
            }
            setW(tt) {
                return this.w = tt,
                this
            }
            setComponent(tt, lt) {
                switch (tt) {
                case 0:
                    this.x = lt;
                    break;
                case 1:
                    this.y = lt;
                    break;
                case 2:
                    this.z = lt;
                    break;
                case 3:
                    this.w = lt;
                    break;
                default:
                    throw new Error("index is out of range: " + tt)
                }
                return this
            }
            getComponent(tt) {
                switch (tt) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error("index is out of range: " + tt)
                }
            }
            clone() {
                return new this.constructor(this.x,this.y,this.z,this.w)
            }
            copy(tt) {
                return this.x = tt.x,
                this.y = tt.y,
                this.z = tt.z,
                this.w = tt.w !== void 0 ? tt.w : 1,
                this
            }
            add(tt) {
                return this.x += tt.x,
                this.y += tt.y,
                this.z += tt.z,
                this.w += tt.w,
                this
            }
            addScalar(tt) {
                return this.x += tt,
                this.y += tt,
                this.z += tt,
                this.w += tt,
                this
            }
            addVectors(tt, lt) {
                return this.x = tt.x + lt.x,
                this.y = tt.y + lt.y,
                this.z = tt.z + lt.z,
                this.w = tt.w + lt.w,
                this
            }
            addScaledVector(tt, lt) {
                return this.x += tt.x * lt,
                this.y += tt.y * lt,
                this.z += tt.z * lt,
                this.w += tt.w * lt,
                this
            }
            sub(tt) {
                return this.x -= tt.x,
                this.y -= tt.y,
                this.z -= tt.z,
                this.w -= tt.w,
                this
            }
            subScalar(tt) {
                return this.x -= tt,
                this.y -= tt,
                this.z -= tt,
                this.w -= tt,
                this
            }
            subVectors(tt, lt) {
                return this.x = tt.x - lt.x,
                this.y = tt.y - lt.y,
                this.z = tt.z - lt.z,
                this.w = tt.w - lt.w,
                this
            }
            multiply(tt) {
                return this.x *= tt.x,
                this.y *= tt.y,
                this.z *= tt.z,
                this.w *= tt.w,
                this
            }
            multiplyScalar(tt) {
                return this.x *= tt,
                this.y *= tt,
                this.z *= tt,
                this.w *= tt,
                this
            }
            applyMatrix4(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = this.z
                  , xt = this.w
                  , Ct = tt.elements;
                return this.x = Ct[0] * lt + Ct[4] * mt + Ct[8] * ft + Ct[12] * xt,
                this.y = Ct[1] * lt + Ct[5] * mt + Ct[9] * ft + Ct[13] * xt,
                this.z = Ct[2] * lt + Ct[6] * mt + Ct[10] * ft + Ct[14] * xt,
                this.w = Ct[3] * lt + Ct[7] * mt + Ct[11] * ft + Ct[15] * xt,
                this
            }
            divideScalar(tt) {
                return this.multiplyScalar(1 / tt)
            }
            setAxisAngleFromQuaternion(tt) {
                this.w = 2 * Math.acos(tt.w);
                const lt = Math.sqrt(1 - tt.w * tt.w);
                return lt < 1e-4 ? (this.x = 1,
                this.y = 0,
                this.z = 0) : (this.x = tt.x / lt,
                this.y = tt.y / lt,
                this.z = tt.z / lt),
                this
            }
            setAxisAngleFromRotationMatrix(tt) {
                let lt, mt, ft, xt;
                const Lt = tt.elements
                  , Nt = Lt[0]
                  , jt = Lt[4]
                  , Wt = Lt[8]
                  , Qt = Lt[1]
                  , qt = Lt[5]
                  , Xt = Lt[9]
                  , Zt = Lt[2]
                  , Yt = Lt[6]
                  , sr = Lt[10];
                if (Math.abs(jt - Qt) < .01 && Math.abs(Wt - Zt) < .01 && Math.abs(Xt - Yt) < .01) {
                    if (Math.abs(jt + Qt) < .1 && Math.abs(Wt + Zt) < .1 && Math.abs(Xt + Yt) < .1 && Math.abs(Nt + qt + sr - 3) < .1)
                        return this.set(1, 0, 0, 0),
                        this;
                    lt = Math.PI;
                    const rr = (Nt + 1) / 2
                      , xr = (qt + 1) / 2
                      , br = (sr + 1) / 2
                      , yr = (jt + Qt) / 4
                      , Pr = (Wt + Zt) / 4
                      , zr = (Xt + Yt) / 4;
                    return rr > xr && rr > br ? rr < .01 ? (mt = 0,
                    ft = .707106781,
                    xt = .707106781) : (mt = Math.sqrt(rr),
                    ft = yr / mt,
                    xt = Pr / mt) : xr > br ? xr < .01 ? (mt = .707106781,
                    ft = 0,
                    xt = .707106781) : (ft = Math.sqrt(xr),
                    mt = yr / ft,
                    xt = zr / ft) : br < .01 ? (mt = .707106781,
                    ft = .707106781,
                    xt = 0) : (xt = Math.sqrt(br),
                    mt = Pr / xt,
                    ft = zr / xt),
                    this.set(mt, ft, xt, lt),
                    this
                }
                let er = Math.sqrt((Yt - Xt) * (Yt - Xt) + (Wt - Zt) * (Wt - Zt) + (Qt - jt) * (Qt - jt));
                return Math.abs(er) < .001 && (er = 1),
                this.x = (Yt - Xt) / er,
                this.y = (Wt - Zt) / er,
                this.z = (Qt - jt) / er,
                this.w = Math.acos((Nt + qt + sr - 1) / 2),
                this
            }
            min(tt) {
                return this.x = Math.min(this.x, tt.x),
                this.y = Math.min(this.y, tt.y),
                this.z = Math.min(this.z, tt.z),
                this.w = Math.min(this.w, tt.w),
                this
            }
            max(tt) {
                return this.x = Math.max(this.x, tt.x),
                this.y = Math.max(this.y, tt.y),
                this.z = Math.max(this.z, tt.z),
                this.w = Math.max(this.w, tt.w),
                this
            }
            clamp(tt, lt) {
                return this.x = Math.max(tt.x, Math.min(lt.x, this.x)),
                this.y = Math.max(tt.y, Math.min(lt.y, this.y)),
                this.z = Math.max(tt.z, Math.min(lt.z, this.z)),
                this.w = Math.max(tt.w, Math.min(lt.w, this.w)),
                this
            }
            clampScalar(tt, lt) {
                return this.x = Math.max(tt, Math.min(lt, this.x)),
                this.y = Math.max(tt, Math.min(lt, this.y)),
                this.z = Math.max(tt, Math.min(lt, this.z)),
                this.w = Math.max(tt, Math.min(lt, this.w)),
                this
            }
            clampLength(tt, lt) {
                const mt = this.length();
                return this.divideScalar(mt || 1).multiplyScalar(Math.max(tt, Math.min(lt, mt)))
            }
            floor() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this.w = Math.floor(this.w),
                this
            }
            ceil() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this.w = Math.ceil(this.w),
                this
            }
            round() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this.w = Math.round(this.w),
                this
            }
            roundToZero() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this.z = Math.trunc(this.z),
                this.w = Math.trunc(this.w),
                this
            }
            negate() {
                return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this.w = -this.w,
                this
            }
            dot(tt) {
                return this.x * tt.x + this.y * tt.y + this.z * tt.z + this.w * tt.w
            }
            lengthSq() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
            }
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
            }
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
            }
            normalize() {
                return this.divideScalar(this.length() || 1)
            }
            setLength(tt) {
                return this.normalize().multiplyScalar(tt)
            }
            lerp(tt, lt) {
                return this.x += (tt.x - this.x) * lt,
                this.y += (tt.y - this.y) * lt,
                this.z += (tt.z - this.z) * lt,
                this.w += (tt.w - this.w) * lt,
                this
            }
            lerpVectors(tt, lt, mt) {
                return this.x = tt.x + (lt.x - tt.x) * mt,
                this.y = tt.y + (lt.y - tt.y) * mt,
                this.z = tt.z + (lt.z - tt.z) * mt,
                this.w = tt.w + (lt.w - tt.w) * mt,
                this
            }
            equals(tt) {
                return tt.x === this.x && tt.y === this.y && tt.z === this.z && tt.w === this.w
            }
            fromArray(tt, lt=0) {
                return this.x = tt[lt],
                this.y = tt[lt + 1],
                this.z = tt[lt + 2],
                this.w = tt[lt + 3],
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this.x,
                tt[lt + 1] = this.y,
                tt[lt + 2] = this.z,
                tt[lt + 3] = this.w,
                tt
            }
            fromBufferAttribute(tt, lt) {
                return this.x = tt.getX(lt),
                this.y = tt.getY(lt),
                this.z = tt.getZ(lt),
                this.w = tt.getW(lt),
                this
            }
            random() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this.w = Math.random(),
                this
            }
            *[Symbol.iterator]() {
                yield this.x,
                yield this.y,
                yield this.z,
                yield this.w
            }
        }
        class nv extends As {
            constructor(tt=1, lt=1, mt={}) {
                super(),
                this.isRenderTarget = !0,
                this.width = tt,
                this.height = lt,
                this.depth = 1,
                this.scissor = new Lo(0,0,tt,lt),
                this.scissorTest = !1,
                this.viewport = new Lo(0,0,tt,lt);
                const ft = {
                    width: tt,
                    height: lt,
                    depth: 1
                };
                mt.encoding !== void 0 && (xu("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),
                mt.colorSpace = mt.encoding === Ol ? jo : Oo),
                mt = Object.assign({
                    generateMipmaps: !1,
                    internalFormat: null,
                    minFilter: Rn,
                    depthBuffer: !0,
                    stencilBuffer: !1,
                    depthTexture: null,
                    samples: 0
                }, mt),
                this.texture = new Ho(ft,mt.mapping,mt.wrapS,mt.wrapT,mt.magFilter,mt.minFilter,mt.format,mt.type,mt.anisotropy,mt.colorSpace),
                this.texture.isRenderTargetTexture = !0,
                this.texture.flipY = !1,
                this.texture.generateMipmaps = mt.generateMipmaps,
                this.texture.internalFormat = mt.internalFormat,
                this.depthBuffer = mt.depthBuffer,
                this.stencilBuffer = mt.stencilBuffer,
                this.depthTexture = mt.depthTexture,
                this.samples = mt.samples
            }
            setSize(tt, lt, mt=1) {
                this.width === tt && this.height === lt && this.depth === mt || (this.width = tt,
                this.height = lt,
                this.depth = mt,
                this.texture.image.width = tt,
                this.texture.image.height = lt,
                this.texture.image.depth = mt,
                this.dispose()),
                this.viewport.set(0, 0, tt, lt),
                this.scissor.set(0, 0, tt, lt)
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                this.width = tt.width,
                this.height = tt.height,
                this.depth = tt.depth,
                this.scissor.copy(tt.scissor),
                this.scissorTest = tt.scissorTest,
                this.viewport.copy(tt.viewport),
                this.texture = tt.texture.clone(),
                this.texture.isRenderTargetTexture = !0;
                const lt = Object.assign({}, tt.texture.image);
                return this.texture.source = new ga(lt),
                this.depthBuffer = tt.depthBuffer,
                this.stencilBuffer = tt.stencilBuffer,
                tt.depthTexture && (this.depthTexture = tt.depthTexture.clone()),
                this.samples = tt.samples,
                this
            }
            dispose() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }
        class Rs extends nv {
            constructor(tt=1, lt=1, mt={}) {
                super(tt, lt, mt),
                this.isWebGLRenderTarget = !0
            }
        }
        class im extends Ho {
            constructor(tt=null, lt=1, mt=1, ft=1) {
                super(null),
                this.isDataArrayTexture = !0,
                this.image = {
                    data: tt,
                    width: lt,
                    height: mt,
                    depth: ft
                },
                this.magFilter = fn,
                this.minFilter = fn,
                this.wrapR = wn,
                this.generateMipmaps = !1,
                this.flipY = !1,
                this.unpackAlignment = 1
            }
        }
        class n_ extends Rs {
            constructor(tt=1, lt=1, mt=1) {
                super(tt, lt),
                this.isWebGLArrayRenderTarget = !0,
                this.depth = mt,
                this.texture = new im(null,tt,lt,mt),
                this.texture.isRenderTargetTexture = !0
            }
        }
        class i_ extends Ho {
            constructor(tt=null, lt=1, mt=1, ft=1) {
                super(null),
                this.isData3DTexture = !0,
                this.image = {
                    data: tt,
                    width: lt,
                    height: mt,
                    depth: ft
                },
                this.magFilter = fn,
                this.minFilter = fn,
                this.wrapR = wn,
                this.generateMipmaps = !1,
                this.flipY = !1,
                this.unpackAlignment = 1
            }
        }
        class k0 extends Rs {
            constructor(tt=1, lt=1, mt=1) {
                super(tt, lt),
                this.isWebGL3DRenderTarget = !0,
                this.depth = mt,
                this.texture = new i_(null,tt,lt,mt),
                this.texture.isRenderTargetTexture = !0
            }
        }
        class o_ extends Rs {
            constructor(tt=1, lt=1, mt=1, ft={}) {
                super(tt, lt, ft),
                this.isWebGLMultipleRenderTargets = !0;
                const xt = this.texture;
                this.texture = [];
                for (let Ct = 0; Ct < mt; Ct++)
                    this.texture[Ct] = xt.clone(),
                    this.texture[Ct].isRenderTargetTexture = !0
            }
            setSize(tt, lt, mt=1) {
                if (this.width !== tt || this.height !== lt || this.depth !== mt) {
                    this.width = tt,
                    this.height = lt,
                    this.depth = mt;
                    for (let ft = 0, xt = this.texture.length; ft < xt; ft++)
                        this.texture[ft].image.width = tt,
                        this.texture[ft].image.height = lt,
                        this.texture[ft].image.depth = mt;
                    this.dispose()
                }
                this.viewport.set(0, 0, tt, lt),
                this.scissor.set(0, 0, tt, lt)
            }
            copy(tt) {
                this.dispose(),
                this.width = tt.width,
                this.height = tt.height,
                this.depth = tt.depth,
                this.scissor.copy(tt.scissor),
                this.scissorTest = tt.scissorTest,
                this.viewport.copy(tt.viewport),
                this.depthBuffer = tt.depthBuffer,
                this.stencilBuffer = tt.stencilBuffer,
                tt.depthTexture !== null && (this.depthTexture = tt.depthTexture.clone()),
                this.texture.length = 0;
                for (let lt = 0, mt = tt.texture.length; lt < mt; lt++)
                    this.texture[lt] = tt.texture[lt].clone(),
                    this.texture[lt].isRenderTargetTexture = !0;
                return this
            }
        }
        class Is {
            constructor(tt=0, lt=0, mt=0, ft=1) {
                this.isQuaternion = !0,
                this._x = tt,
                this._y = lt,
                this._z = mt,
                this._w = ft
            }
            static slerpFlat(tt, lt, mt, ft, xt, Ct, Mt) {
                let Lt = mt[ft + 0]
                  , Nt = mt[ft + 1]
                  , jt = mt[ft + 2]
                  , Wt = mt[ft + 3];
                const Qt = xt[Ct + 0]
                  , qt = xt[Ct + 1]
                  , Xt = xt[Ct + 2]
                  , Zt = xt[Ct + 3];
                if (Mt === 0)
                    return tt[lt + 0] = Lt,
                    tt[lt + 1] = Nt,
                    tt[lt + 2] = jt,
                    void (tt[lt + 3] = Wt);
                if (Mt === 1)
                    return tt[lt + 0] = Qt,
                    tt[lt + 1] = qt,
                    tt[lt + 2] = Xt,
                    void (tt[lt + 3] = Zt);
                if (Wt !== Zt || Lt !== Qt || Nt !== qt || jt !== Xt) {
                    let Yt = 1 - Mt;
                    const sr = Lt * Qt + Nt * qt + jt * Xt + Wt * Zt
                      , er = sr >= 0 ? 1 : -1
                      , rr = 1 - sr * sr;
                    if (rr > Number.EPSILON) {
                        const br = Math.sqrt(rr)
                          , yr = Math.atan2(br, sr * er);
                        Yt = Math.sin(Yt * yr) / br,
                        Mt = Math.sin(Mt * yr) / br
                    }
                    const xr = Mt * er;
                    if (Lt = Lt * Yt + Qt * xr,
                    Nt = Nt * Yt + qt * xr,
                    jt = jt * Yt + Xt * xr,
                    Wt = Wt * Yt + Zt * xr,
                    Yt === 1 - Mt) {
                        const br = 1 / Math.sqrt(Lt * Lt + Nt * Nt + jt * jt + Wt * Wt);
                        Lt *= br,
                        Nt *= br,
                        jt *= br,
                        Wt *= br
                    }
                }
                tt[lt] = Lt,
                tt[lt + 1] = Nt,
                tt[lt + 2] = jt,
                tt[lt + 3] = Wt
            }
            static multiplyQuaternionsFlat(tt, lt, mt, ft, xt, Ct) {
                const Mt = mt[ft]
                  , Lt = mt[ft + 1]
                  , Nt = mt[ft + 2]
                  , jt = mt[ft + 3]
                  , Wt = xt[Ct]
                  , Qt = xt[Ct + 1]
                  , qt = xt[Ct + 2]
                  , Xt = xt[Ct + 3];
                return tt[lt] = Mt * Xt + jt * Wt + Lt * qt - Nt * Qt,
                tt[lt + 1] = Lt * Xt + jt * Qt + Nt * Wt - Mt * qt,
                tt[lt + 2] = Nt * Xt + jt * qt + Mt * Qt - Lt * Wt,
                tt[lt + 3] = jt * Xt - Mt * Wt - Lt * Qt - Nt * qt,
                tt
            }
            get x() {
                return this._x
            }
            set x(tt) {
                this._x = tt,
                this._onChangeCallback()
            }
            get y() {
                return this._y
            }
            set y(tt) {
                this._y = tt,
                this._onChangeCallback()
            }
            get z() {
                return this._z
            }
            set z(tt) {
                this._z = tt,
                this._onChangeCallback()
            }
            get w() {
                return this._w
            }
            set w(tt) {
                this._w = tt,
                this._onChangeCallback()
            }
            set(tt, lt, mt, ft) {
                return this._x = tt,
                this._y = lt,
                this._z = mt,
                this._w = ft,
                this._onChangeCallback(),
                this
            }
            clone() {
                return new this.constructor(this._x,this._y,this._z,this._w)
            }
            copy(tt) {
                return this._x = tt.x,
                this._y = tt.y,
                this._z = tt.z,
                this._w = tt.w,
                this._onChangeCallback(),
                this
            }
            setFromEuler(tt, lt) {
                const mt = tt._x
                  , ft = tt._y
                  , xt = tt._z
                  , Ct = tt._order
                  , Mt = Math.cos
                  , Lt = Math.sin
                  , Nt = Mt(mt / 2)
                  , jt = Mt(ft / 2)
                  , Wt = Mt(xt / 2)
                  , Qt = Lt(mt / 2)
                  , qt = Lt(ft / 2)
                  , Xt = Lt(xt / 2);
                switch (Ct) {
                case "XYZ":
                    this._x = Qt * jt * Wt + Nt * qt * Xt,
                    this._y = Nt * qt * Wt - Qt * jt * Xt,
                    this._z = Nt * jt * Xt + Qt * qt * Wt,
                    this._w = Nt * jt * Wt - Qt * qt * Xt;
                    break;
                case "YXZ":
                    this._x = Qt * jt * Wt + Nt * qt * Xt,
                    this._y = Nt * qt * Wt - Qt * jt * Xt,
                    this._z = Nt * jt * Xt - Qt * qt * Wt,
                    this._w = Nt * jt * Wt + Qt * qt * Xt;
                    break;
                case "ZXY":
                    this._x = Qt * jt * Wt - Nt * qt * Xt,
                    this._y = Nt * qt * Wt + Qt * jt * Xt,
                    this._z = Nt * jt * Xt + Qt * qt * Wt,
                    this._w = Nt * jt * Wt - Qt * qt * Xt;
                    break;
                case "ZYX":
                    this._x = Qt * jt * Wt - Nt * qt * Xt,
                    this._y = Nt * qt * Wt + Qt * jt * Xt,
                    this._z = Nt * jt * Xt - Qt * qt * Wt,
                    this._w = Nt * jt * Wt + Qt * qt * Xt;
                    break;
                case "YZX":
                    this._x = Qt * jt * Wt + Nt * qt * Xt,
                    this._y = Nt * qt * Wt + Qt * jt * Xt,
                    this._z = Nt * jt * Xt - Qt * qt * Wt,
                    this._w = Nt * jt * Wt - Qt * qt * Xt;
                    break;
                case "XZY":
                    this._x = Qt * jt * Wt - Nt * qt * Xt,
                    this._y = Nt * qt * Wt - Qt * jt * Xt,
                    this._z = Nt * jt * Xt + Qt * qt * Wt,
                    this._w = Nt * jt * Wt + Qt * qt * Xt;
                    break;
                default:
                    console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + Ct)
                }
                return lt !== !1 && this._onChangeCallback(),
                this
            }
            setFromAxisAngle(tt, lt) {
                const mt = lt / 2
                  , ft = Math.sin(mt);
                return this._x = tt.x * ft,
                this._y = tt.y * ft,
                this._z = tt.z * ft,
                this._w = Math.cos(mt),
                this._onChangeCallback(),
                this
            }
            setFromRotationMatrix(tt) {
                const lt = tt.elements
                  , mt = lt[0]
                  , ft = lt[4]
                  , xt = lt[8]
                  , Ct = lt[1]
                  , Mt = lt[5]
                  , Lt = lt[9]
                  , Nt = lt[2]
                  , jt = lt[6]
                  , Wt = lt[10]
                  , Qt = mt + Mt + Wt;
                if (Qt > 0) {
                    const qt = .5 / Math.sqrt(Qt + 1);
                    this._w = .25 / qt,
                    this._x = (jt - Lt) * qt,
                    this._y = (xt - Nt) * qt,
                    this._z = (Ct - ft) * qt
                } else if (mt > Mt && mt > Wt) {
                    const qt = 2 * Math.sqrt(1 + mt - Mt - Wt);
                    this._w = (jt - Lt) / qt,
                    this._x = .25 * qt,
                    this._y = (ft + Ct) / qt,
                    this._z = (xt + Nt) / qt
                } else if (Mt > Wt) {
                    const qt = 2 * Math.sqrt(1 + Mt - mt - Wt);
                    this._w = (xt - Nt) / qt,
                    this._x = (ft + Ct) / qt,
                    this._y = .25 * qt,
                    this._z = (Lt + jt) / qt
                } else {
                    const qt = 2 * Math.sqrt(1 + Wt - mt - Mt);
                    this._w = (Ct - ft) / qt,
                    this._x = (xt + Nt) / qt,
                    this._y = (Lt + jt) / qt,
                    this._z = .25 * qt
                }
                return this._onChangeCallback(),
                this
            }
            setFromUnitVectors(tt, lt) {
                let mt = tt.dot(lt) + 1;
                return mt < Number.EPSILON ? (mt = 0,
                Math.abs(tt.x) > Math.abs(tt.z) ? (this._x = -tt.y,
                this._y = tt.x,
                this._z = 0,
                this._w = mt) : (this._x = 0,
                this._y = -tt.z,
                this._z = tt.y,
                this._w = mt)) : (this._x = tt.y * lt.z - tt.z * lt.y,
                this._y = tt.z * lt.x - tt.x * lt.z,
                this._z = tt.x * lt.y - tt.y * lt.x,
                this._w = mt),
                this.normalize()
            }
            angleTo(tt) {
                return 2 * Math.acos(Math.abs(qo(this.dot(tt), -1, 1)))
            }
            rotateTowards(tt, lt) {
                const mt = this.angleTo(tt);
                if (mt === 0)
                    return this;
                const ft = Math.min(1, lt / mt);
                return this.slerp(tt, ft),
                this
            }
            identity() {
                return this.set(0, 0, 0, 1)
            }
            invert() {
                return this.conjugate()
            }
            conjugate() {
                return this._x *= -1,
                this._y *= -1,
                this._z *= -1,
                this._onChangeCallback(),
                this
            }
            dot(tt) {
                return this._x * tt._x + this._y * tt._y + this._z * tt._z + this._w * tt._w
            }
            lengthSq() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
            }
            length() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
            }
            normalize() {
                let tt = this.length();
                return tt === 0 ? (this._x = 0,
                this._y = 0,
                this._z = 0,
                this._w = 1) : (tt = 1 / tt,
                this._x = this._x * tt,
                this._y = this._y * tt,
                this._z = this._z * tt,
                this._w = this._w * tt),
                this._onChangeCallback(),
                this
            }
            multiply(tt) {
                return this.multiplyQuaternions(this, tt)
            }
            premultiply(tt) {
                return this.multiplyQuaternions(tt, this)
            }
            multiplyQuaternions(tt, lt) {
                const mt = tt._x
                  , ft = tt._y
                  , xt = tt._z
                  , Ct = tt._w
                  , Mt = lt._x
                  , Lt = lt._y
                  , Nt = lt._z
                  , jt = lt._w;
                return this._x = mt * jt + Ct * Mt + ft * Nt - xt * Lt,
                this._y = ft * jt + Ct * Lt + xt * Mt - mt * Nt,
                this._z = xt * jt + Ct * Nt + mt * Lt - ft * Mt,
                this._w = Ct * jt - mt * Mt - ft * Lt - xt * Nt,
                this._onChangeCallback(),
                this
            }
            slerp(tt, lt) {
                if (lt === 0)
                    return this;
                if (lt === 1)
                    return this.copy(tt);
                const mt = this._x
                  , ft = this._y
                  , xt = this._z
                  , Ct = this._w;
                let Mt = Ct * tt._w + mt * tt._x + ft * tt._y + xt * tt._z;
                if (Mt < 0 ? (this._w = -tt._w,
                this._x = -tt._x,
                this._y = -tt._y,
                this._z = -tt._z,
                Mt = -Mt) : this.copy(tt),
                Mt >= 1)
                    return this._w = Ct,
                    this._x = mt,
                    this._y = ft,
                    this._z = xt,
                    this;
                const Lt = 1 - Mt * Mt;
                if (Lt <= Number.EPSILON) {
                    const qt = 1 - lt;
                    return this._w = qt * Ct + lt * this._w,
                    this._x = qt * mt + lt * this._x,
                    this._y = qt * ft + lt * this._y,
                    this._z = qt * xt + lt * this._z,
                    this.normalize(),
                    this._onChangeCallback(),
                    this
                }
                const Nt = Math.sqrt(Lt)
                  , jt = Math.atan2(Nt, Mt)
                  , Wt = Math.sin((1 - lt) * jt) / Nt
                  , Qt = Math.sin(lt * jt) / Nt;
                return this._w = Ct * Wt + this._w * Qt,
                this._x = mt * Wt + this._x * Qt,
                this._y = ft * Wt + this._y * Qt,
                this._z = xt * Wt + this._z * Qt,
                this._onChangeCallback(),
                this
            }
            slerpQuaternions(tt, lt, mt) {
                return this.copy(tt).slerp(lt, mt)
            }
            random() {
                const tt = Math.random()
                  , lt = Math.sqrt(1 - tt)
                  , mt = Math.sqrt(tt)
                  , ft = 2 * Math.PI * Math.random()
                  , xt = 2 * Math.PI * Math.random();
                return this.set(lt * Math.cos(ft), mt * Math.sin(xt), mt * Math.cos(xt), lt * Math.sin(ft))
            }
            equals(tt) {
                return tt._x === this._x && tt._y === this._y && tt._z === this._z && tt._w === this._w
            }
            fromArray(tt, lt=0) {
                return this._x = tt[lt],
                this._y = tt[lt + 1],
                this._z = tt[lt + 2],
                this._w = tt[lt + 3],
                this._onChangeCallback(),
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this._x,
                tt[lt + 1] = this._y,
                tt[lt + 2] = this._z,
                tt[lt + 3] = this._w,
                tt
            }
            fromBufferAttribute(tt, lt) {
                return this._x = tt.getX(lt),
                this._y = tt.getY(lt),
                this._z = tt.getZ(lt),
                this._w = tt.getW(lt),
                this
            }
            toJSON() {
                return this.toArray()
            }
            _onChange(tt) {
                return this._onChangeCallback = tt,
                this
            }
            _onChangeCallback() {}
            *[Symbol.iterator]() {
                yield this._x,
                yield this._y,
                yield this._z,
                yield this._w
            }
        }
        class Er {
            constructor(tt=0, lt=0, mt=0) {
                Er.prototype.isVector3 = !0,
                this.x = tt,
                this.y = lt,
                this.z = mt
            }
            set(tt, lt, mt) {
                return mt === void 0 && (mt = this.z),
                this.x = tt,
                this.y = lt,
                this.z = mt,
                this
            }
            setScalar(tt) {
                return this.x = tt,
                this.y = tt,
                this.z = tt,
                this
            }
            setX(tt) {
                return this.x = tt,
                this
            }
            setY(tt) {
                return this.y = tt,
                this
            }
            setZ(tt) {
                return this.z = tt,
                this
            }
            setComponent(tt, lt) {
                switch (tt) {
                case 0:
                    this.x = lt;
                    break;
                case 1:
                    this.y = lt;
                    break;
                case 2:
                    this.z = lt;
                    break;
                default:
                    throw new Error("index is out of range: " + tt)
                }
                return this
            }
            getComponent(tt) {
                switch (tt) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error("index is out of range: " + tt)
                }
            }
            clone() {
                return new this.constructor(this.x,this.y,this.z)
            }
            copy(tt) {
                return this.x = tt.x,
                this.y = tt.y,
                this.z = tt.z,
                this
            }
            add(tt) {
                return this.x += tt.x,
                this.y += tt.y,
                this.z += tt.z,
                this
            }
            addScalar(tt) {
                return this.x += tt,
                this.y += tt,
                this.z += tt,
                this
            }
            addVectors(tt, lt) {
                return this.x = tt.x + lt.x,
                this.y = tt.y + lt.y,
                this.z = tt.z + lt.z,
                this
            }
            addScaledVector(tt, lt) {
                return this.x += tt.x * lt,
                this.y += tt.y * lt,
                this.z += tt.z * lt,
                this
            }
            sub(tt) {
                return this.x -= tt.x,
                this.y -= tt.y,
                this.z -= tt.z,
                this
            }
            subScalar(tt) {
                return this.x -= tt,
                this.y -= tt,
                this.z -= tt,
                this
            }
            subVectors(tt, lt) {
                return this.x = tt.x - lt.x,
                this.y = tt.y - lt.y,
                this.z = tt.z - lt.z,
                this
            }
            multiply(tt) {
                return this.x *= tt.x,
                this.y *= tt.y,
                this.z *= tt.z,
                this
            }
            multiplyScalar(tt) {
                return this.x *= tt,
                this.y *= tt,
                this.z *= tt,
                this
            }
            multiplyVectors(tt, lt) {
                return this.x = tt.x * lt.x,
                this.y = tt.y * lt.y,
                this.z = tt.z * lt.z,
                this
            }
            applyEuler(tt) {
                return this.applyQuaternion(om.setFromEuler(tt))
            }
            applyAxisAngle(tt, lt) {
                return this.applyQuaternion(om.setFromAxisAngle(tt, lt))
            }
            applyMatrix3(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = this.z
                  , xt = tt.elements;
                return this.x = xt[0] * lt + xt[3] * mt + xt[6] * ft,
                this.y = xt[1] * lt + xt[4] * mt + xt[7] * ft,
                this.z = xt[2] * lt + xt[5] * mt + xt[8] * ft,
                this
            }
            applyNormalMatrix(tt) {
                return this.applyMatrix3(tt).normalize()
            }
            applyMatrix4(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = this.z
                  , xt = tt.elements
                  , Ct = 1 / (xt[3] * lt + xt[7] * mt + xt[11] * ft + xt[15]);
                return this.x = (xt[0] * lt + xt[4] * mt + xt[8] * ft + xt[12]) * Ct,
                this.y = (xt[1] * lt + xt[5] * mt + xt[9] * ft + xt[13]) * Ct,
                this.z = (xt[2] * lt + xt[6] * mt + xt[10] * ft + xt[14]) * Ct,
                this
            }
            applyQuaternion(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = this.z
                  , xt = tt.x
                  , Ct = tt.y
                  , Mt = tt.z
                  , Lt = tt.w
                  , Nt = Lt * lt + Ct * ft - Mt * mt
                  , jt = Lt * mt + Mt * lt - xt * ft
                  , Wt = Lt * ft + xt * mt - Ct * lt
                  , Qt = -xt * lt - Ct * mt - Mt * ft;
                return this.x = Nt * Lt + Qt * -xt + jt * -Mt - Wt * -Ct,
                this.y = jt * Lt + Qt * -Ct + Wt * -xt - Nt * -Mt,
                this.z = Wt * Lt + Qt * -Mt + Nt * -Ct - jt * -xt,
                this
            }
            project(tt) {
                return this.applyMatrix4(tt.matrixWorldInverse).applyMatrix4(tt.projectionMatrix)
            }
            unproject(tt) {
                return this.applyMatrix4(tt.projectionMatrixInverse).applyMatrix4(tt.matrixWorld)
            }
            transformDirection(tt) {
                const lt = this.x
                  , mt = this.y
                  , ft = this.z
                  , xt = tt.elements;
                return this.x = xt[0] * lt + xt[4] * mt + xt[8] * ft,
                this.y = xt[1] * lt + xt[5] * mt + xt[9] * ft,
                this.z = xt[2] * lt + xt[6] * mt + xt[10] * ft,
                this.normalize()
            }
            divide(tt) {
                return this.x /= tt.x,
                this.y /= tt.y,
                this.z /= tt.z,
                this
            }
            divideScalar(tt) {
                return this.multiplyScalar(1 / tt)
            }
            min(tt) {
                return this.x = Math.min(this.x, tt.x),
                this.y = Math.min(this.y, tt.y),
                this.z = Math.min(this.z, tt.z),
                this
            }
            max(tt) {
                return this.x = Math.max(this.x, tt.x),
                this.y = Math.max(this.y, tt.y),
                this.z = Math.max(this.z, tt.z),
                this
            }
            clamp(tt, lt) {
                return this.x = Math.max(tt.x, Math.min(lt.x, this.x)),
                this.y = Math.max(tt.y, Math.min(lt.y, this.y)),
                this.z = Math.max(tt.z, Math.min(lt.z, this.z)),
                this
            }
            clampScalar(tt, lt) {
                return this.x = Math.max(tt, Math.min(lt, this.x)),
                this.y = Math.max(tt, Math.min(lt, this.y)),
                this.z = Math.max(tt, Math.min(lt, this.z)),
                this
            }
            clampLength(tt, lt) {
                const mt = this.length();
                return this.divideScalar(mt || 1).multiplyScalar(Math.max(tt, Math.min(lt, mt)))
            }
            floor() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this
            }
            ceil() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this
            }
            round() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this
            }
            roundToZero() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this.z = Math.trunc(this.z),
                this
            }
            negate() {
                return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this
            }
            dot(tt) {
                return this.x * tt.x + this.y * tt.y + this.z * tt.z
            }
            lengthSq() {
                return this.x * this.x + this.y * this.y + this.z * this.z
            }
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            }
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
            }
            normalize() {
                return this.divideScalar(this.length() || 1)
            }
            setLength(tt) {
                return this.normalize().multiplyScalar(tt)
            }
            lerp(tt, lt) {
                return this.x += (tt.x - this.x) * lt,
                this.y += (tt.y - this.y) * lt,
                this.z += (tt.z - this.z) * lt,
                this
            }
            lerpVectors(tt, lt, mt) {
                return this.x = tt.x + (lt.x - tt.x) * mt,
                this.y = tt.y + (lt.y - tt.y) * mt,
                this.z = tt.z + (lt.z - tt.z) * mt,
                this
            }
            cross(tt) {
                return this.crossVectors(this, tt)
            }
            crossVectors(tt, lt) {
                const mt = tt.x
                  , ft = tt.y
                  , xt = tt.z
                  , Ct = lt.x
                  , Mt = lt.y
                  , Lt = lt.z;
                return this.x = ft * Lt - xt * Mt,
                this.y = xt * Ct - mt * Lt,
                this.z = mt * Mt - ft * Ct,
                this
            }
            projectOnVector(tt) {
                const lt = tt.lengthSq();
                if (lt === 0)
                    return this.set(0, 0, 0);
                const mt = tt.dot(this) / lt;
                return this.copy(tt).multiplyScalar(mt)
            }
            projectOnPlane(tt) {
                return s_.copy(this).projectOnVector(tt),
                this.sub(s_)
            }
            reflect(tt) {
                return this.sub(s_.copy(tt).multiplyScalar(2 * this.dot(tt)))
            }
            angleTo(tt) {
                const lt = Math.sqrt(this.lengthSq() * tt.lengthSq());
                if (lt === 0)
                    return Math.PI / 2;
                const mt = this.dot(tt) / lt;
                return Math.acos(qo(mt, -1, 1))
            }
            distanceTo(tt) {
                return Math.sqrt(this.distanceToSquared(tt))
            }
            distanceToSquared(tt) {
                const lt = this.x - tt.x
                  , mt = this.y - tt.y
                  , ft = this.z - tt.z;
                return lt * lt + mt * mt + ft * ft
            }
            manhattanDistanceTo(tt) {
                return Math.abs(this.x - tt.x) + Math.abs(this.y - tt.y) + Math.abs(this.z - tt.z)
            }
            setFromSpherical(tt) {
                return this.setFromSphericalCoords(tt.radius, tt.phi, tt.theta)
            }
            setFromSphericalCoords(tt, lt, mt) {
                const ft = Math.sin(lt) * tt;
                return this.x = ft * Math.sin(mt),
                this.y = Math.cos(lt) * tt,
                this.z = ft * Math.cos(mt),
                this
            }
            setFromCylindrical(tt) {
                return this.setFromCylindricalCoords(tt.radius, tt.theta, tt.y)
            }
            setFromCylindricalCoords(tt, lt, mt) {
                return this.x = tt * Math.sin(lt),
                this.y = mt,
                this.z = tt * Math.cos(lt),
                this
            }
            setFromMatrixPosition(tt) {
                const lt = tt.elements;
                return this.x = lt[12],
                this.y = lt[13],
                this.z = lt[14],
                this
            }
            setFromMatrixScale(tt) {
                const lt = this.setFromMatrixColumn(tt, 0).length()
                  , mt = this.setFromMatrixColumn(tt, 1).length()
                  , ft = this.setFromMatrixColumn(tt, 2).length();
                return this.x = lt,
                this.y = mt,
                this.z = ft,
                this
            }
            setFromMatrixColumn(tt, lt) {
                return this.fromArray(tt.elements, 4 * lt)
            }
            setFromMatrix3Column(tt, lt) {
                return this.fromArray(tt.elements, 3 * lt)
            }
            setFromEuler(tt) {
                return this.x = tt._x,
                this.y = tt._y,
                this.z = tt._z,
                this
            }
            setFromColor(tt) {
                return this.x = tt.r,
                this.y = tt.g,
                this.z = tt.b,
                this
            }
            equals(tt) {
                return tt.x === this.x && tt.y === this.y && tt.z === this.z
            }
            fromArray(tt, lt=0) {
                return this.x = tt[lt],
                this.y = tt[lt + 1],
                this.z = tt[lt + 2],
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this.x,
                tt[lt + 1] = this.y,
                tt[lt + 2] = this.z,
                tt
            }
            fromBufferAttribute(tt, lt) {
                return this.x = tt.getX(lt),
                this.y = tt.getY(lt),
                this.z = tt.getZ(lt),
                this
            }
            random() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this
            }
            randomDirection() {
                const tt = 2 * (Math.random() - .5)
                  , lt = Math.random() * Math.PI * 2
                  , mt = Math.sqrt(1 - tt ** 2);
                return this.x = mt * Math.cos(lt),
                this.y = mt * Math.sin(lt),
                this.z = tt,
                this
            }
            *[Symbol.iterator]() {
                yield this.x,
                yield this.y,
                yield this.z
            }
        }
        const s_ = new Er
          , om = new Is;
        class Tl {
            constructor(tt=new Er(1 / 0,1 / 0,1 / 0), lt=new Er(-1 / 0,-1 / 0,-1 / 0)) {
                this.isBox3 = !0,
                this.min = tt,
                this.max = lt
            }
            set(tt, lt) {
                return this.min.copy(tt),
                this.max.copy(lt),
                this
            }
            setFromArray(tt) {
                this.makeEmpty();
                for (let lt = 0, mt = tt.length; lt < mt; lt += 3)
                    this.expandByPoint(xa.fromArray(tt, lt));
                return this
            }
            setFromBufferAttribute(tt) {
                this.makeEmpty();
                for (let lt = 0, mt = tt.count; lt < mt; lt++)
                    this.expandByPoint(xa.fromBufferAttribute(tt, lt));
                return this
            }
            setFromPoints(tt) {
                this.makeEmpty();
                for (let lt = 0, mt = tt.length; lt < mt; lt++)
                    this.expandByPoint(tt[lt]);
                return this
            }
            setFromCenterAndSize(tt, lt) {
                const mt = xa.copy(lt).multiplyScalar(.5);
                return this.min.copy(tt).sub(mt),
                this.max.copy(tt).add(mt),
                this
            }
            setFromObject(tt, lt=!1) {
                return this.makeEmpty(),
                this.expandByObject(tt, lt)
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                return this.min.copy(tt.min),
                this.max.copy(tt.max),
                this
            }
            makeEmpty() {
                return this.min.x = this.min.y = this.min.z = 1 / 0,
                this.max.x = this.max.y = this.max.z = -1 / 0,
                this
            }
            isEmpty() {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
            }
            getCenter(tt) {
                return this.isEmpty() ? tt.set(0, 0, 0) : tt.addVectors(this.min, this.max).multiplyScalar(.5)
            }
            getSize(tt) {
                return this.isEmpty() ? tt.set(0, 0, 0) : tt.subVectors(this.max, this.min)
            }
            expandByPoint(tt) {
                return this.min.min(tt),
                this.max.max(tt),
                this
            }
            expandByVector(tt) {
                return this.min.sub(tt),
                this.max.add(tt),
                this
            }
            expandByScalar(tt) {
                return this.min.addScalar(-tt),
                this.max.addScalar(tt),
                this
            }
            expandByObject(tt, lt=!1) {
                if (tt.updateWorldMatrix(!1, !1),
                tt.boundingBox !== void 0)
                    tt.boundingBox === null && tt.computeBoundingBox(),
                    Vu.copy(tt.boundingBox),
                    Vu.applyMatrix4(tt.matrixWorld),
                    this.union(Vu);
                else {
                    const ft = tt.geometry;
                    if (ft !== void 0)
                        if (lt && ft.attributes !== void 0 && ft.attributes.position !== void 0) {
                            const xt = ft.attributes.position;
                            for (let Ct = 0, Mt = xt.count; Ct < Mt; Ct++)
                                xa.fromBufferAttribute(xt, Ct).applyMatrix4(tt.matrixWorld),
                                this.expandByPoint(xa)
                        } else
                            ft.boundingBox === null && ft.computeBoundingBox(),
                            Vu.copy(ft.boundingBox),
                            Vu.applyMatrix4(tt.matrixWorld),
                            this.union(Vu)
                }
                const mt = tt.children;
                for (let ft = 0, xt = mt.length; ft < xt; ft++)
                    this.expandByObject(mt[ft], lt);
                return this
            }
            containsPoint(tt) {
                return !(tt.x < this.min.x || tt.x > this.max.x || tt.y < this.min.y || tt.y > this.max.y || tt.z < this.min.z || tt.z > this.max.z)
            }
            containsBox(tt) {
                return this.min.x <= tt.min.x && tt.max.x <= this.max.x && this.min.y <= tt.min.y && tt.max.y <= this.max.y && this.min.z <= tt.min.z && tt.max.z <= this.max.z
            }
            getParameter(tt, lt) {
                return lt.set((tt.x - this.min.x) / (this.max.x - this.min.x), (tt.y - this.min.y) / (this.max.y - this.min.y), (tt.z - this.min.z) / (this.max.z - this.min.z))
            }
            intersectsBox(tt) {
                return !(tt.max.x < this.min.x || tt.min.x > this.max.x || tt.max.y < this.min.y || tt.min.y > this.max.y || tt.max.z < this.min.z || tt.min.z > this.max.z)
            }
            intersectsSphere(tt) {
                return this.clampPoint(tt.center, xa),
                xa.distanceToSquared(tt.center) <= tt.radius * tt.radius
            }
            intersectsPlane(tt) {
                let lt, mt;
                return tt.normal.x > 0 ? (lt = tt.normal.x * this.min.x,
                mt = tt.normal.x * this.max.x) : (lt = tt.normal.x * this.max.x,
                mt = tt.normal.x * this.min.x),
                tt.normal.y > 0 ? (lt += tt.normal.y * this.min.y,
                mt += tt.normal.y * this.max.y) : (lt += tt.normal.y * this.max.y,
                mt += tt.normal.y * this.min.y),
                tt.normal.z > 0 ? (lt += tt.normal.z * this.min.z,
                mt += tt.normal.z * this.max.z) : (lt += tt.normal.z * this.max.z,
                mt += tt.normal.z * this.min.z),
                lt <= -tt.constant && mt >= -tt.constant
            }
            intersectsTriangle(tt) {
                if (this.isEmpty())
                    return !1;
                this.getCenter(_p),
                sm.subVectors(this.max, _p),
                Gu.subVectors(tt.a, _p),
                zu.subVectors(tt.b, _p),
                Hu.subVectors(tt.c, _p),
                Cl.subVectors(zu, Gu),
                _c.subVectors(Hu, zu),
                Au.subVectors(Gu, Hu);
                let lt = [0, -Cl.z, Cl.y, 0, -_c.z, _c.y, 0, -Au.z, Au.y, Cl.z, 0, -Cl.x, _c.z, 0, -_c.x, Au.z, 0, -Au.x, -Cl.y, Cl.x, 0, -_c.y, _c.x, 0, -Au.y, Au.x, 0];
                return !!Pl(lt, Gu, zu, Hu, sm) && (lt = [1, 0, 0, 0, 1, 0, 0, 0, 1],
                !!Pl(lt, Gu, zu, Hu, sm) && (am.crossVectors(Cl, _c),
                lt = [am.x, am.y, am.z],
                Pl(lt, Gu, zu, Hu, sm)))
            }
            clampPoint(tt, lt) {
                return lt.copy(tt).clamp(this.min, this.max)
            }
            distanceToPoint(tt) {
                return this.clampPoint(tt, xa).distanceTo(tt)
            }
            getBoundingSphere(tt) {
                return this.isEmpty() ? tt.makeEmpty() : (this.getCenter(tt.center),
                tt.radius = .5 * this.getSize(xa).length()),
                tt
            }
            intersect(tt) {
                return this.min.max(tt.min),
                this.max.min(tt.max),
                this.isEmpty() && this.makeEmpty(),
                this
            }
            union(tt) {
                return this.min.min(tt.min),
                this.max.max(tt.max),
                this
            }
            applyMatrix4(tt) {
                return this.isEmpty() || (Nl[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(tt),
                Nl[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(tt),
                Nl[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(tt),
                Nl[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(tt),
                Nl[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(tt),
                Nl[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(tt),
                Nl[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(tt),
                Nl[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(tt),
                this.setFromPoints(Nl)),
                this
            }
            translate(tt) {
                return this.min.add(tt),
                this.max.add(tt),
                this
            }
            equals(tt) {
                return tt.min.equals(this.min) && tt.max.equals(this.max)
            }
        }
        const Nl = [new Er, new Er, new Er, new Er, new Er, new Er, new Er, new Er]
          , xa = new Er
          , Vu = new Tl
          , Gu = new Er
          , zu = new Er
          , Hu = new Er
          , Cl = new Er
          , _c = new Er
          , Au = new Er
          , _p = new Er
          , sm = new Er
          , am = new Er
          , wu = new Er;
        function Pl(Tt, tt, lt, mt, ft) {
            for (let xt = 0, Ct = Tt.length - 3; xt <= Ct; xt += 3) {
                wu.fromArray(Tt, xt);
                const Mt = ft.x * Math.abs(wu.x) + ft.y * Math.abs(wu.y) + ft.z * Math.abs(wu.z)
                  , Lt = tt.dot(wu)
                  , Nt = lt.dot(wu)
                  , jt = mt.dot(wu);
                if (Math.max(-Math.max(Lt, Nt, jt), Math.min(Lt, Nt, jt)) > Mt)
                    return !1
            }
            return !0
        }
        const iv = new Tl
          , vp = new Er
          , yp = new Er;
        class Ws {
            constructor(tt=new Er, lt=-1) {
                this.center = tt,
                this.radius = lt
            }
            set(tt, lt) {
                return this.center.copy(tt),
                this.radius = lt,
                this
            }
            setFromPoints(tt, lt) {
                const mt = this.center;
                lt !== void 0 ? mt.copy(lt) : iv.setFromPoints(tt).getCenter(mt);
                let ft = 0;
                for (let xt = 0, Ct = tt.length; xt < Ct; xt++)
                    ft = Math.max(ft, mt.distanceToSquared(tt[xt]));
                return this.radius = Math.sqrt(ft),
                this
            }
            copy(tt) {
                return this.center.copy(tt.center),
                this.radius = tt.radius,
                this
            }
            isEmpty() {
                return this.radius < 0
            }
            makeEmpty() {
                return this.center.set(0, 0, 0),
                this.radius = -1,
                this
            }
            containsPoint(tt) {
                return tt.distanceToSquared(this.center) <= this.radius * this.radius
            }
            distanceToPoint(tt) {
                return tt.distanceTo(this.center) - this.radius
            }
            intersectsSphere(tt) {
                const lt = this.radius + tt.radius;
                return tt.center.distanceToSquared(this.center) <= lt * lt
            }
            intersectsBox(tt) {
                return tt.intersectsSphere(this)
            }
            intersectsPlane(tt) {
                return Math.abs(tt.distanceToPoint(this.center)) <= this.radius
            }
            clampPoint(tt, lt) {
                const mt = this.center.distanceToSquared(tt);
                return lt.copy(tt),
                mt > this.radius * this.radius && (lt.sub(this.center).normalize(),
                lt.multiplyScalar(this.radius).add(this.center)),
                lt
            }
            getBoundingBox(tt) {
                return this.isEmpty() ? (tt.makeEmpty(),
                tt) : (tt.set(this.center, this.center),
                tt.expandByScalar(this.radius),
                tt)
            }
            applyMatrix4(tt) {
                return this.center.applyMatrix4(tt),
                this.radius = this.radius * tt.getMaxScaleOnAxis(),
                this
            }
            translate(tt) {
                return this.center.add(tt),
                this
            }
            expandByPoint(tt) {
                if (this.isEmpty())
                    return this.center.copy(tt),
                    this.radius = 0,
                    this;
                vp.subVectors(tt, this.center);
                const lt = vp.lengthSq();
                if (lt > this.radius * this.radius) {
                    const mt = Math.sqrt(lt)
                      , ft = .5 * (mt - this.radius);
                    this.center.addScaledVector(vp, ft / mt),
                    this.radius += ft
                }
                return this
            }
            union(tt) {
                return tt.isEmpty() ? this : this.isEmpty() ? (this.copy(tt),
                this) : (this.center.equals(tt.center) === !0 ? this.radius = Math.max(this.radius, tt.radius) : (yp.subVectors(tt.center, this.center).setLength(tt.radius),
                this.expandByPoint(vp.copy(tt.center).add(yp)),
                this.expandByPoint(vp.copy(tt.center).sub(yp))),
                this)
            }
            equals(tt) {
                return tt.center.equals(this.center) && tt.radius === this.radius
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        const Ml = new Er
          , a_ = new Er
          , ba = new Er
          , Fl = new Er
          , eu = new Er
          , lm = new Er
          , Rl = new Er;
        class Qu {
            constructor(tt=new Er, lt=new Er(0,0,-1)) {
                this.origin = tt,
                this.direction = lt
            }
            set(tt, lt) {
                return this.origin.copy(tt),
                this.direction.copy(lt),
                this
            }
            copy(tt) {
                return this.origin.copy(tt.origin),
                this.direction.copy(tt.direction),
                this
            }
            at(tt, lt) {
                return lt.copy(this.origin).addScaledVector(this.direction, tt)
            }
            lookAt(tt) {
                return this.direction.copy(tt).sub(this.origin).normalize(),
                this
            }
            recast(tt) {
                return this.origin.copy(this.at(tt, Ml)),
                this
            }
            closestPointToPoint(tt, lt) {
                lt.subVectors(tt, this.origin);
                const mt = lt.dot(this.direction);
                return mt < 0 ? lt.copy(this.origin) : lt.copy(this.origin).addScaledVector(this.direction, mt)
            }
            distanceToPoint(tt) {
                return Math.sqrt(this.distanceSqToPoint(tt))
            }
            distanceSqToPoint(tt) {
                const lt = Ml.subVectors(tt, this.origin).dot(this.direction);
                return lt < 0 ? this.origin.distanceToSquared(tt) : (Ml.copy(this.origin).addScaledVector(this.direction, lt),
                Ml.distanceToSquared(tt))
            }
            distanceSqToSegment(tt, lt, mt, ft) {
                a_.copy(tt).add(lt).multiplyScalar(.5),
                ba.copy(lt).sub(tt).normalize(),
                Fl.copy(this.origin).sub(a_);
                const xt = .5 * tt.distanceTo(lt)
                  , Ct = -this.direction.dot(ba)
                  , Mt = Fl.dot(this.direction)
                  , Lt = -Fl.dot(ba)
                  , Nt = Fl.lengthSq()
                  , jt = Math.abs(1 - Ct * Ct);
                let Wt, Qt, qt, Xt;
                if (jt > 0)
                    if (Wt = Ct * Lt - Mt,
                    Qt = Ct * Mt - Lt,
                    Xt = xt * jt,
                    Wt >= 0)
                        if (Qt >= -Xt)
                            if (Qt <= Xt) {
                                const Zt = 1 / jt;
                                Wt *= Zt,
                                Qt *= Zt,
                                qt = Wt * (Wt + Ct * Qt + 2 * Mt) + Qt * (Ct * Wt + Qt + 2 * Lt) + Nt
                            } else
                                Qt = xt,
                                Wt = Math.max(0, -(Ct * Qt + Mt)),
                                qt = -Wt * Wt + Qt * (Qt + 2 * Lt) + Nt;
                        else
                            Qt = -xt,
                            Wt = Math.max(0, -(Ct * Qt + Mt)),
                            qt = -Wt * Wt + Qt * (Qt + 2 * Lt) + Nt;
                    else
                        Qt <= -Xt ? (Wt = Math.max(0, -(-Ct * xt + Mt)),
                        Qt = Wt > 0 ? -xt : Math.min(Math.max(-xt, -Lt), xt),
                        qt = -Wt * Wt + Qt * (Qt + 2 * Lt) + Nt) : Qt <= Xt ? (Wt = 0,
                        Qt = Math.min(Math.max(-xt, -Lt), xt),
                        qt = Qt * (Qt + 2 * Lt) + Nt) : (Wt = Math.max(0, -(Ct * xt + Mt)),
                        Qt = Wt > 0 ? xt : Math.min(Math.max(-xt, -Lt), xt),
                        qt = -Wt * Wt + Qt * (Qt + 2 * Lt) + Nt);
                else
                    Qt = Ct > 0 ? -xt : xt,
                    Wt = Math.max(0, -(Ct * Qt + Mt)),
                    qt = -Wt * Wt + Qt * (Qt + 2 * Lt) + Nt;
                return mt && mt.copy(this.origin).addScaledVector(this.direction, Wt),
                ft && ft.copy(a_).addScaledVector(ba, Qt),
                qt
            }
            intersectSphere(tt, lt) {
                Ml.subVectors(tt.center, this.origin);
                const mt = Ml.dot(this.direction)
                  , ft = Ml.dot(Ml) - mt * mt
                  , xt = tt.radius * tt.radius;
                if (ft > xt)
                    return null;
                const Ct = Math.sqrt(xt - ft)
                  , Mt = mt - Ct
                  , Lt = mt + Ct;
                return Lt < 0 ? null : Mt < 0 ? this.at(Lt, lt) : this.at(Mt, lt)
            }
            intersectsSphere(tt) {
                return this.distanceSqToPoint(tt.center) <= tt.radius * tt.radius
            }
            distanceToPlane(tt) {
                const lt = tt.normal.dot(this.direction);
                if (lt === 0)
                    return tt.distanceToPoint(this.origin) === 0 ? 0 : null;
                const mt = -(this.origin.dot(tt.normal) + tt.constant) / lt;
                return mt >= 0 ? mt : null
            }
            intersectPlane(tt, lt) {
                const mt = this.distanceToPlane(tt);
                return mt === null ? null : this.at(mt, lt)
            }
            intersectsPlane(tt) {
                const lt = tt.distanceToPoint(this.origin);
                return lt === 0 || tt.normal.dot(this.direction) * lt < 0
            }
            intersectBox(tt, lt) {
                let mt, ft, xt, Ct, Mt, Lt;
                const Nt = 1 / this.direction.x
                  , jt = 1 / this.direction.y
                  , Wt = 1 / this.direction.z
                  , Qt = this.origin;
                return Nt >= 0 ? (mt = (tt.min.x - Qt.x) * Nt,
                ft = (tt.max.x - Qt.x) * Nt) : (mt = (tt.max.x - Qt.x) * Nt,
                ft = (tt.min.x - Qt.x) * Nt),
                jt >= 0 ? (xt = (tt.min.y - Qt.y) * jt,
                Ct = (tt.max.y - Qt.y) * jt) : (xt = (tt.max.y - Qt.y) * jt,
                Ct = (tt.min.y - Qt.y) * jt),
                mt > Ct || xt > ft ? null : ((xt > mt || isNaN(mt)) && (mt = xt),
                (Ct < ft || isNaN(ft)) && (ft = Ct),
                Wt >= 0 ? (Mt = (tt.min.z - Qt.z) * Wt,
                Lt = (tt.max.z - Qt.z) * Wt) : (Mt = (tt.max.z - Qt.z) * Wt,
                Lt = (tt.min.z - Qt.z) * Wt),
                mt > Lt || Mt > ft ? null : ((Mt > mt || mt != mt) && (mt = Mt),
                (Lt < ft || ft != ft) && (ft = Lt),
                ft < 0 ? null : this.at(mt >= 0 ? mt : ft, lt)))
            }
            intersectsBox(tt) {
                return this.intersectBox(tt, Ml) !== null
            }
            intersectTriangle(tt, lt, mt, ft, xt) {
                eu.subVectors(lt, tt),
                lm.subVectors(mt, tt),
                Rl.crossVectors(eu, lm);
                let Ct, Mt = this.direction.dot(Rl);
                if (Mt > 0) {
                    if (ft)
                        return null;
                    Ct = 1
                } else {
                    if (!(Mt < 0))
                        return null;
                    Ct = -1,
                    Mt = -Mt
                }
                Fl.subVectors(this.origin, tt);
                const Lt = Ct * this.direction.dot(lm.crossVectors(Fl, lm));
                if (Lt < 0)
                    return null;
                const Nt = Ct * this.direction.dot(eu.cross(Fl));
                if (Nt < 0 || Lt + Nt > Mt)
                    return null;
                const jt = -Ct * Fl.dot(Rl);
                return jt < 0 ? null : this.at(jt / Mt, xt)
            }
            applyMatrix4(tt) {
                return this.origin.applyMatrix4(tt),
                this.direction.transformDirection(tt),
                this
            }
            equals(tt) {
                return tt.origin.equals(this.origin) && tt.direction.equals(this.direction)
            }
            clone() {
                return new this.constructor().copy(this)
            }
        }
        class no {
            constructor(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt, Wt, Qt, qt, Xt, Zt, Yt) {
                no.prototype.isMatrix4 = !0,
                this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                tt !== void 0 && this.set(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt, Wt, Qt, qt, Xt, Zt, Yt)
            }
            set(tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt, jt, Wt, Qt, qt, Xt, Zt, Yt) {
                const sr = this.elements;
                return sr[0] = tt,
                sr[4] = lt,
                sr[8] = mt,
                sr[12] = ft,
                sr[1] = xt,
                sr[5] = Ct,
                sr[9] = Mt,
                sr[13] = Lt,
                sr[2] = Nt,
                sr[6] = jt,
                sr[10] = Wt,
                sr[14] = Qt,
                sr[3] = qt,
                sr[7] = Xt,
                sr[11] = Zt,
                sr[15] = Yt,
                this
            }
            identity() {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this
            }
            clone() {
                return new no().fromArray(this.elements)
            }
            copy(tt) {
                const lt = this.elements
                  , mt = tt.elements;
                return lt[0] = mt[0],
                lt[1] = mt[1],
                lt[2] = mt[2],
                lt[3] = mt[3],
                lt[4] = mt[4],
                lt[5] = mt[5],
                lt[6] = mt[6],
                lt[7] = mt[7],
                lt[8] = mt[8],
                lt[9] = mt[9],
                lt[10] = mt[10],
                lt[11] = mt[11],
                lt[12] = mt[12],
                lt[13] = mt[13],
                lt[14] = mt[14],
                lt[15] = mt[15],
                this
            }
            copyPosition(tt) {
                const lt = this.elements
                  , mt = tt.elements;
                return lt[12] = mt[12],
                lt[13] = mt[13],
                lt[14] = mt[14],
                this
            }
            setFromMatrix3(tt) {
                const lt = tt.elements;
                return this.set(lt[0], lt[3], lt[6], 0, lt[1], lt[4], lt[7], 0, lt[2], lt[5], lt[8], 0, 0, 0, 0, 1),
                this
            }
            extractBasis(tt, lt, mt) {
                return tt.setFromMatrixColumn(this, 0),
                lt.setFromMatrixColumn(this, 1),
                mt.setFromMatrixColumn(this, 2),
                this
            }
            makeBasis(tt, lt, mt) {
                return this.set(tt.x, lt.x, mt.x, 0, tt.y, lt.y, mt.y, 0, tt.z, lt.z, mt.z, 0, 0, 0, 0, 1),
                this
            }
            extractRotation(tt) {
                const lt = this.elements
                  , mt = tt.elements
                  , ft = 1 / Wu.setFromMatrixColumn(tt, 0).length()
                  , xt = 1 / Wu.setFromMatrixColumn(tt, 1).length()
                  , Ct = 1 / Wu.setFromMatrixColumn(tt, 2).length();
                return lt[0] = mt[0] * ft,
                lt[1] = mt[1] * ft,
                lt[2] = mt[2] * ft,
                lt[3] = 0,
                lt[4] = mt[4] * xt,
                lt[5] = mt[5] * xt,
                lt[6] = mt[6] * xt,
                lt[7] = 0,
                lt[8] = mt[8] * Ct,
                lt[9] = mt[9] * Ct,
                lt[10] = mt[10] * Ct,
                lt[11] = 0,
                lt[12] = 0,
                lt[13] = 0,
                lt[14] = 0,
                lt[15] = 1,
                this
            }
            makeRotationFromEuler(tt) {
                const lt = this.elements
                  , mt = tt.x
                  , ft = tt.y
                  , xt = tt.z
                  , Ct = Math.cos(mt)
                  , Mt = Math.sin(mt)
                  , Lt = Math.cos(ft)
                  , Nt = Math.sin(ft)
                  , jt = Math.cos(xt)
                  , Wt = Math.sin(xt);
                if (tt.order === "XYZ") {
                    const Qt = Ct * jt
                      , qt = Ct * Wt
                      , Xt = Mt * jt
                      , Zt = Mt * Wt;
                    lt[0] = Lt * jt,
                    lt[4] = -Lt * Wt,
                    lt[8] = Nt,
                    lt[1] = qt + Xt * Nt,
                    lt[5] = Qt - Zt * Nt,
                    lt[9] = -Mt * Lt,
                    lt[2] = Zt - Qt * Nt,
                    lt[6] = Xt + qt * Nt,
                    lt[10] = Ct * Lt
                } else if (tt.order === "YXZ") {
                    const Qt = Lt * jt
                      , qt = Lt * Wt
                      , Xt = Nt * jt
                      , Zt = Nt * Wt;
                    lt[0] = Qt + Zt * Mt,
                    lt[4] = Xt * Mt - qt,
                    lt[8] = Ct * Nt,
                    lt[1] = Ct * Wt,
                    lt[5] = Ct * jt,
                    lt[9] = -Mt,
                    lt[2] = qt * Mt - Xt,
                    lt[6] = Zt + Qt * Mt,
                    lt[10] = Ct * Lt
                } else if (tt.order === "ZXY") {
                    const Qt = Lt * jt
                      , qt = Lt * Wt
                      , Xt = Nt * jt
                      , Zt = Nt * Wt;
                    lt[0] = Qt - Zt * Mt,
                    lt[4] = -Ct * Wt,
                    lt[8] = Xt + qt * Mt,
                    lt[1] = qt + Xt * Mt,
                    lt[5] = Ct * jt,
                    lt[9] = Zt - Qt * Mt,
                    lt[2] = -Ct * Nt,
                    lt[6] = Mt,
                    lt[10] = Ct * Lt
                } else if (tt.order === "ZYX") {
                    const Qt = Ct * jt
                      , qt = Ct * Wt
                      , Xt = Mt * jt
                      , Zt = Mt * Wt;
                    lt[0] = Lt * jt,
                    lt[4] = Xt * Nt - qt,
                    lt[8] = Qt * Nt + Zt,
                    lt[1] = Lt * Wt,
                    lt[5] = Zt * Nt + Qt,
                    lt[9] = qt * Nt - Xt,
                    lt[2] = -Nt,
                    lt[6] = Mt * Lt,
                    lt[10] = Ct * Lt
                } else if (tt.order === "YZX") {
                    const Qt = Ct * Lt
                      , qt = Ct * Nt
                      , Xt = Mt * Lt
                      , Zt = Mt * Nt;
                    lt[0] = Lt * jt,
                    lt[4] = Zt - Qt * Wt,
                    lt[8] = Xt * Wt + qt,
                    lt[1] = Wt,
                    lt[5] = Ct * jt,
                    lt[9] = -Mt * jt,
                    lt[2] = -Nt * jt,
                    lt[6] = qt * Wt + Xt,
                    lt[10] = Qt - Zt * Wt
                } else if (tt.order === "XZY") {
                    const Qt = Ct * Lt
                      , qt = Ct * Nt
                      , Xt = Mt * Lt
                      , Zt = Mt * Nt;
                    lt[0] = Lt * jt,
                    lt[4] = -Wt,
                    lt[8] = Nt * jt,
                    lt[1] = Qt * Wt + Zt,
                    lt[5] = Ct * jt,
                    lt[9] = qt * Wt - Xt,
                    lt[2] = Xt * Wt - qt,
                    lt[6] = Mt * jt,
                    lt[10] = Zt * Wt + Qt
                }
                return lt[3] = 0,
                lt[7] = 0,
                lt[11] = 0,
                lt[12] = 0,
                lt[13] = 0,
                lt[14] = 0,
                lt[15] = 1,
                this
            }
            makeRotationFromQuaternion(tt) {
                return this.compose(qu, tt, ov)
            }
            lookAt(tt, lt, mt) {
                const ft = this.elements;
                return Ss.subVectors(tt, lt),
                Ss.lengthSq() === 0 && (Ss.z = 1),
                Ss.normalize(),
                tu.crossVectors(mt, Ss),
                tu.lengthSq() === 0 && (Math.abs(mt.z) === 1 ? Ss.x += 1e-4 : Ss.z += 1e-4,
                Ss.normalize(),
                tu.crossVectors(mt, Ss)),
                tu.normalize(),
                cm.crossVectors(Ss, tu),
                ft[0] = tu.x,
                ft[4] = cm.x,
                ft[8] = Ss.x,
                ft[1] = tu.y,
                ft[5] = cm.y,
                ft[9] = Ss.y,
                ft[2] = tu.z,
                ft[6] = cm.z,
                ft[10] = Ss.z,
                this
            }
            multiply(tt) {
                return this.multiplyMatrices(this, tt)
            }
            premultiply(tt) {
                return this.multiplyMatrices(tt, this)
            }
            multiplyMatrices(tt, lt) {
                const mt = tt.elements
                  , ft = lt.elements
                  , xt = this.elements
                  , Ct = mt[0]
                  , Mt = mt[4]
                  , Lt = mt[8]
                  , Nt = mt[12]
                  , jt = mt[1]
                  , Wt = mt[5]
                  , Qt = mt[9]
                  , qt = mt[13]
                  , Xt = mt[2]
                  , Zt = mt[6]
                  , Yt = mt[10]
                  , sr = mt[14]
                  , er = mt[3]
                  , rr = mt[7]
                  , xr = mt[11]
                  , br = mt[15]
                  , yr = ft[0]
                  , Pr = ft[4]
                  , zr = ft[8]
                  , Nr = ft[12]
                  , Vr = ft[1]
                  , Gr = ft[5]
                  , Hr = ft[9]
                  , _n = ft[13]
                  , dn = ft[2]
                  , kn = ft[6]
                  , Bn = ft[10]
                  , cn = ft[14]
                  , Yr = ft[3]
                  , Jr = ft[7]
                  , sn = ft[11]
                  , on = ft[15];
                return xt[0] = Ct * yr + Mt * Vr + Lt * dn + Nt * Yr,
                xt[4] = Ct * Pr + Mt * Gr + Lt * kn + Nt * Jr,
                xt[8] = Ct * zr + Mt * Hr + Lt * Bn + Nt * sn,
                xt[12] = Ct * Nr + Mt * _n + Lt * cn + Nt * on,
                xt[1] = jt * yr + Wt * Vr + Qt * dn + qt * Yr,
                xt[5] = jt * Pr + Wt * Gr + Qt * kn + qt * Jr,
                xt[9] = jt * zr + Wt * Hr + Qt * Bn + qt * sn,
                xt[13] = jt * Nr + Wt * _n + Qt * cn + qt * on,
                xt[2] = Xt * yr + Zt * Vr + Yt * dn + sr * Yr,
                xt[6] = Xt * Pr + Zt * Gr + Yt * kn + sr * Jr,
                xt[10] = Xt * zr + Zt * Hr + Yt * Bn + sr * sn,
                xt[14] = Xt * Nr + Zt * _n + Yt * cn + sr * on,
                xt[3] = er * yr + rr * Vr + xr * dn + br * Yr,
                xt[7] = er * Pr + rr * Gr + xr * kn + br * Jr,
                xt[11] = er * zr + rr * Hr + xr * Bn + br * sn,
                xt[15] = er * Nr + rr * _n + xr * cn + br * on,
                this
            }
            multiplyScalar(tt) {
                const lt = this.elements;
                return lt[0] *= tt,
                lt[4] *= tt,
                lt[8] *= tt,
                lt[12] *= tt,
                lt[1] *= tt,
                lt[5] *= tt,
                lt[9] *= tt,
                lt[13] *= tt,
                lt[2] *= tt,
                lt[6] *= tt,
                lt[10] *= tt,
                lt[14] *= tt,
                lt[3] *= tt,
                lt[7] *= tt,
                lt[11] *= tt,
                lt[15] *= tt,
                this
            }
            determinant() {
                const tt = this.elements
                  , lt = tt[0]
                  , mt = tt[4]
                  , ft = tt[8]
                  , xt = tt[12]
                  , Ct = tt[1]
                  , Mt = tt[5]
                  , Lt = tt[9]
                  , Nt = tt[13]
                  , jt = tt[2]
                  , Wt = tt[6]
                  , Qt = tt[10]
                  , qt = tt[14];
                return tt[3] * (+xt * Lt * Wt - ft * Nt * Wt - xt * Mt * Qt + mt * Nt * Qt + ft * Mt * qt - mt * Lt * qt) + tt[7] * (+lt * Lt * qt - lt * Nt * Qt + xt * Ct * Qt - ft * Ct * qt + ft * Nt * jt - xt * Lt * jt) + tt[11] * (+lt * Nt * Wt - lt * Mt * qt - xt * Ct * Wt + mt * Ct * qt + xt * Mt * jt - mt * Nt * jt) + tt[15] * (-ft * Mt * jt - lt * Lt * Wt + lt * Mt * Qt + ft * Ct * Wt - mt * Ct * Qt + mt * Lt * jt)
            }
            transpose() {
                const tt = this.elements;
                let lt;
                return lt = tt[1],
                tt[1] = tt[4],
                tt[4] = lt,
                lt = tt[2],
                tt[2] = tt[8],
                tt[8] = lt,
                lt = tt[6],
                tt[6] = tt[9],
                tt[9] = lt,
                lt = tt[3],
                tt[3] = tt[12],
                tt[12] = lt,
                lt = tt[7],
                tt[7] = tt[13],
                tt[13] = lt,
                lt = tt[11],
                tt[11] = tt[14],
                tt[14] = lt,
                this
            }
            setPosition(tt, lt, mt) {
                const ft = this.elements;
                return tt.isVector3 ? (ft[12] = tt.x,
                ft[13] = tt.y,
                ft[14] = tt.z) : (ft[12] = tt,
                ft[13] = lt,
                ft[14] = mt),
                this
            }
            invert() {
                const tt = this.elements
                  , lt = tt[0]
                  , mt = tt[1]
                  , ft = tt[2]
                  , xt = tt[3]
                  , Ct = tt[4]
                  , Mt = tt[5]
                  , Lt = tt[6]
                  , Nt = tt[7]
                  , jt = tt[8]
                  , Wt = tt[9]
                  , Qt = tt[10]
                  , qt = tt[11]
                  , Xt = tt[12]
                  , Zt = tt[13]
                  , Yt = tt[14]
                  , sr = tt[15]
                  , er = Wt * Yt * Nt - Zt * Qt * Nt + Zt * Lt * qt - Mt * Yt * qt - Wt * Lt * sr + Mt * Qt * sr
                  , rr = Xt * Qt * Nt - jt * Yt * Nt - Xt * Lt * qt + Ct * Yt * qt + jt * Lt * sr - Ct * Qt * sr
                  , xr = jt * Zt * Nt - Xt * Wt * Nt + Xt * Mt * qt - Ct * Zt * qt - jt * Mt * sr + Ct * Wt * sr
                  , br = Xt * Wt * Lt - jt * Zt * Lt - Xt * Mt * Qt + Ct * Zt * Qt + jt * Mt * Yt - Ct * Wt * Yt
                  , yr = lt * er + mt * rr + ft * xr + xt * br;
                if (yr === 0)
                    return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                const Pr = 1 / yr;
                return tt[0] = er * Pr,
                tt[1] = (Zt * Qt * xt - Wt * Yt * xt - Zt * ft * qt + mt * Yt * qt + Wt * ft * sr - mt * Qt * sr) * Pr,
                tt[2] = (Mt * Yt * xt - Zt * Lt * xt + Zt * ft * Nt - mt * Yt * Nt - Mt * ft * sr + mt * Lt * sr) * Pr,
                tt[3] = (Wt * Lt * xt - Mt * Qt * xt - Wt * ft * Nt + mt * Qt * Nt + Mt * ft * qt - mt * Lt * qt) * Pr,
                tt[4] = rr * Pr,
                tt[5] = (jt * Yt * xt - Xt * Qt * xt + Xt * ft * qt - lt * Yt * qt - jt * ft * sr + lt * Qt * sr) * Pr,
                tt[6] = (Xt * Lt * xt - Ct * Yt * xt - Xt * ft * Nt + lt * Yt * Nt + Ct * ft * sr - lt * Lt * sr) * Pr,
                tt[7] = (Ct * Qt * xt - jt * Lt * xt + jt * ft * Nt - lt * Qt * Nt - Ct * ft * qt + lt * Lt * qt) * Pr,
                tt[8] = xr * Pr,
                tt[9] = (Xt * Wt * xt - jt * Zt * xt - Xt * mt * qt + lt * Zt * qt + jt * mt * sr - lt * Wt * sr) * Pr,
                tt[10] = (Ct * Zt * xt - Xt * Mt * xt + Xt * mt * Nt - lt * Zt * Nt - Ct * mt * sr + lt * Mt * sr) * Pr,
                tt[11] = (jt * Mt * xt - Ct * Wt * xt - jt * mt * Nt + lt * Wt * Nt + Ct * mt * qt - lt * Mt * qt) * Pr,
                tt[12] = br * Pr,
                tt[13] = (jt * Zt * ft - Xt * Wt * ft + Xt * mt * Qt - lt * Zt * Qt - jt * mt * Yt + lt * Wt * Yt) * Pr,
                tt[14] = (Xt * Mt * ft - Ct * Zt * ft - Xt * mt * Lt + lt * Zt * Lt + Ct * mt * Yt - lt * Mt * Yt) * Pr,
                tt[15] = (Ct * Wt * ft - jt * Mt * ft + jt * mt * Lt - lt * Wt * Lt - Ct * mt * Qt + lt * Mt * Qt) * Pr,
                this
            }
            scale(tt) {
                const lt = this.elements
                  , mt = tt.x
                  , ft = tt.y
                  , xt = tt.z;
                return lt[0] *= mt,
                lt[4] *= ft,
                lt[8] *= xt,
                lt[1] *= mt,
                lt[5] *= ft,
                lt[9] *= xt,
                lt[2] *= mt,
                lt[6] *= ft,
                lt[10] *= xt,
                lt[3] *= mt,
                lt[7] *= ft,
                lt[11] *= xt,
                this
            }
            getMaxScaleOnAxis() {
                const tt = this.elements
                  , lt = tt[0] * tt[0] + tt[1] * tt[1] + tt[2] * tt[2]
                  , mt = tt[4] * tt[4] + tt[5] * tt[5] + tt[6] * tt[6]
                  , ft = tt[8] * tt[8] + tt[9] * tt[9] + tt[10] * tt[10];
                return Math.sqrt(Math.max(lt, mt, ft))
            }
            makeTranslation(tt, lt, mt) {
                return tt.isVector3 ? this.set(1, 0, 0, tt.x, 0, 1, 0, tt.y, 0, 0, 1, tt.z, 0, 0, 0, 1) : this.set(1, 0, 0, tt, 0, 1, 0, lt, 0, 0, 1, mt, 0, 0, 0, 1),
                this
            }
            makeRotationX(tt) {
                const lt = Math.cos(tt)
                  , mt = Math.sin(tt);
                return this.set(1, 0, 0, 0, 0, lt, -mt, 0, 0, mt, lt, 0, 0, 0, 0, 1),
                this
            }
            makeRotationY(tt) {
                const lt = Math.cos(tt)
                  , mt = Math.sin(tt);
                return this.set(lt, 0, mt, 0, 0, 1, 0, 0, -mt, 0, lt, 0, 0, 0, 0, 1),
                this
            }
            makeRotationZ(tt) {
                const lt = Math.cos(tt)
                  , mt = Math.sin(tt);
                return this.set(lt, -mt, 0, 0, mt, lt, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this
            }
            makeRotationAxis(tt, lt) {
                const mt = Math.cos(lt)
                  , ft = Math.sin(lt)
                  , xt = 1 - mt
                  , Ct = tt.x
                  , Mt = tt.y
                  , Lt = tt.z
                  , Nt = xt * Ct
                  , jt = xt * Mt;
                return this.set(Nt * Ct + mt, Nt * Mt - ft * Lt, Nt * Lt + ft * Mt, 0, Nt * Mt + ft * Lt, jt * Mt + mt, jt * Lt - ft * Ct, 0, Nt * Lt - ft * Mt, jt * Lt + ft * Ct, xt * Lt * Lt + mt, 0, 0, 0, 0, 1),
                this
            }
            makeScale(tt, lt, mt) {
                return this.set(tt, 0, 0, 0, 0, lt, 0, 0, 0, 0, mt, 0, 0, 0, 0, 1),
                this
            }
            makeShear(tt, lt, mt, ft, xt, Ct) {
                return this.set(1, mt, xt, 0, tt, 1, Ct, 0, lt, ft, 1, 0, 0, 0, 0, 1),
                this
            }
            compose(tt, lt, mt) {
                const ft = this.elements
                  , xt = lt._x
                  , Ct = lt._y
                  , Mt = lt._z
                  , Lt = lt._w
                  , Nt = xt + xt
                  , jt = Ct + Ct
                  , Wt = Mt + Mt
                  , Qt = xt * Nt
                  , qt = xt * jt
                  , Xt = xt * Wt
                  , Zt = Ct * jt
                  , Yt = Ct * Wt
                  , sr = Mt * Wt
                  , er = Lt * Nt
                  , rr = Lt * jt
                  , xr = Lt * Wt
                  , br = mt.x
                  , yr = mt.y
                  , Pr = mt.z;
                return ft[0] = (1 - (Zt + sr)) * br,
                ft[1] = (qt + xr) * br,
                ft[2] = (Xt - rr) * br,
                ft[3] = 0,
                ft[4] = (qt - xr) * yr,
                ft[5] = (1 - (Qt + sr)) * yr,
                ft[6] = (Yt + er) * yr,
                ft[7] = 0,
                ft[8] = (Xt + rr) * Pr,
                ft[9] = (Yt - er) * Pr,
                ft[10] = (1 - (Qt + Zt)) * Pr,
                ft[11] = 0,
                ft[12] = tt.x,
                ft[13] = tt.y,
                ft[14] = tt.z,
                ft[15] = 1,
                this
            }
            decompose(tt, lt, mt) {
                const ft = this.elements;
                let xt = Wu.set(ft[0], ft[1], ft[2]).length();
                const Ct = Wu.set(ft[4], ft[5], ft[6]).length()
                  , Mt = Wu.set(ft[8], ft[9], ft[10]).length();
                this.determinant() < 0 && (xt = -xt),
                tt.x = ft[12],
                tt.y = ft[13],
                tt.z = ft[14],
                $a.copy(this);
                const Lt = 1 / xt
                  , Nt = 1 / Ct
                  , jt = 1 / Mt;
                return $a.elements[0] *= Lt,
                $a.elements[1] *= Lt,
                $a.elements[2] *= Lt,
                $a.elements[4] *= Nt,
                $a.elements[5] *= Nt,
                $a.elements[6] *= Nt,
                $a.elements[8] *= jt,
                $a.elements[9] *= jt,
                $a.elements[10] *= jt,
                lt.setFromRotationMatrix($a),
                mt.x = xt,
                mt.y = Ct,
                mt.z = Mt,
                this
            }
            makePerspective(tt, lt, mt, ft, xt, Ct, Mt=Qs) {
                const Lt = this.elements
                  , Nt = 2 * xt / (lt - tt)
                  , jt = 2 * xt / (mt - ft)
                  , Wt = (lt + tt) / (lt - tt)
                  , Qt = (mt + ft) / (mt - ft);
                let qt, Xt;
                if (Mt === Qs)
                    qt = -(Ct + xt) / (Ct - xt),
                    Xt = -2 * Ct * xt / (Ct - xt);
                else {
                    if (Mt !== na)
                        throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + Mt);
                    qt = -Ct / (Ct - xt),
                    Xt = -Ct * xt / (Ct - xt)
                }
                return Lt[0] = Nt,
                Lt[4] = 0,
                Lt[8] = Wt,
                Lt[12] = 0,
                Lt[1] = 0,
                Lt[5] = jt,
                Lt[9] = Qt,
                Lt[13] = 0,
                Lt[2] = 0,
                Lt[6] = 0,
                Lt[10] = qt,
                Lt[14] = Xt,
                Lt[3] = 0,
                Lt[7] = 0,
                Lt[11] = -1,
                Lt[15] = 0,
                this
            }
            makeOrthographic(tt, lt, mt, ft, xt, Ct, Mt=Qs) {
                const Lt = this.elements
                  , Nt = 1 / (lt - tt)
                  , jt = 1 / (mt - ft)
                  , Wt = 1 / (Ct - xt)
                  , Qt = (lt + tt) * Nt
                  , qt = (mt + ft) * jt;
                let Xt, Zt;
                if (Mt === Qs)
                    Xt = (Ct + xt) * Wt,
                    Zt = -2 * Wt;
                else {
                    if (Mt !== na)
                        throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + Mt);
                    Xt = xt * Wt,
                    Zt = -1 * Wt
                }
                return Lt[0] = 2 * Nt,
                Lt[4] = 0,
                Lt[8] = 0,
                Lt[12] = -Qt,
                Lt[1] = 0,
                Lt[5] = 2 * jt,
                Lt[9] = 0,
                Lt[13] = -qt,
                Lt[2] = 0,
                Lt[6] = 0,
                Lt[10] = Zt,
                Lt[14] = -Xt,
                Lt[3] = 0,
                Lt[7] = 0,
                Lt[11] = 0,
                Lt[15] = 1,
                this
            }
            equals(tt) {
                const lt = this.elements
                  , mt = tt.elements;
                for (let ft = 0; ft < 16; ft++)
                    if (lt[ft] !== mt[ft])
                        return !1;
                return !0
            }
            fromArray(tt, lt=0) {
                for (let mt = 0; mt < 16; mt++)
                    this.elements[mt] = tt[mt + lt];
                return this
            }
            toArray(tt=[], lt=0) {
                const mt = this.elements;
                return tt[lt] = mt[0],
                tt[lt + 1] = mt[1],
                tt[lt + 2] = mt[2],
                tt[lt + 3] = mt[3],
                tt[lt + 4] = mt[4],
                tt[lt + 5] = mt[5],
                tt[lt + 6] = mt[6],
                tt[lt + 7] = mt[7],
                tt[lt + 8] = mt[8],
                tt[lt + 9] = mt[9],
                tt[lt + 10] = mt[10],
                tt[lt + 11] = mt[11],
                tt[lt + 12] = mt[12],
                tt[lt + 13] = mt[13],
                tt[lt + 14] = mt[14],
                tt[lt + 15] = mt[15],
                tt
            }
        }
        const Wu = new Er
          , $a = new no
          , qu = new Er(0,0,0)
          , ov = new Er(1,1,1)
          , tu = new Er
          , cm = new Er
          , Ss = new Er
          , sv = new no
          , Su = new Is;
        class $u {
            constructor(tt=0, lt=0, mt=0, ft=$u.DEFAULT_ORDER) {
                this.isEuler = !0,
                this._x = tt,
                this._y = lt,
                this._z = mt,
                this._order = ft
            }
            get x() {
                return this._x
            }
            set x(tt) {
                this._x = tt,
                this._onChangeCallback()
            }
            get y() {
                return this._y
            }
            set y(tt) {
                this._y = tt,
                this._onChangeCallback()
            }
            get z() {
                return this._z
            }
            set z(tt) {
                this._z = tt,
                this._onChangeCallback()
            }
            get order() {
                return this._order
            }
            set order(tt) {
                this._order = tt,
                this._onChangeCallback()
            }
            set(tt, lt, mt, ft=this._order) {
                return this._x = tt,
                this._y = lt,
                this._z = mt,
                this._order = ft,
                this._onChangeCallback(),
                this
            }
            clone() {
                return new this.constructor(this._x,this._y,this._z,this._order)
            }
            copy(tt) {
                return this._x = tt._x,
                this._y = tt._y,
                this._z = tt._z,
                this._order = tt._order,
                this._onChangeCallback(),
                this
            }
            setFromRotationMatrix(tt, lt=this._order, mt=!0) {
                const ft = tt.elements
                  , xt = ft[0]
                  , Ct = ft[4]
                  , Mt = ft[8]
                  , Lt = ft[1]
                  , Nt = ft[5]
                  , jt = ft[9]
                  , Wt = ft[2]
                  , Qt = ft[6]
                  , qt = ft[10];
                switch (lt) {
                case "XYZ":
                    this._y = Math.asin(qo(Mt, -1, 1)),
                    Math.abs(Mt) < .9999999 ? (this._x = Math.atan2(-jt, qt),
                    this._z = Math.atan2(-Ct, xt)) : (this._x = Math.atan2(Qt, Nt),
                    this._z = 0);
                    break;
                case "YXZ":
                    this._x = Math.asin(-qo(jt, -1, 1)),
                    Math.abs(jt) < .9999999 ? (this._y = Math.atan2(Mt, qt),
                    this._z = Math.atan2(Lt, Nt)) : (this._y = Math.atan2(-Wt, xt),
                    this._z = 0);
                    break;
                case "ZXY":
                    this._x = Math.asin(qo(Qt, -1, 1)),
                    Math.abs(Qt) < .9999999 ? (this._y = Math.atan2(-Wt, qt),
                    this._z = Math.atan2(-Ct, Nt)) : (this._y = 0,
                    this._z = Math.atan2(Lt, xt));
                    break;
                case "ZYX":
                    this._y = Math.asin(-qo(Wt, -1, 1)),
                    Math.abs(Wt) < .9999999 ? (this._x = Math.atan2(Qt, qt),
                    this._z = Math.atan2(Lt, xt)) : (this._x = 0,
                    this._z = Math.atan2(-Ct, Nt));
                    break;
                case "YZX":
                    this._z = Math.asin(qo(Lt, -1, 1)),
                    Math.abs(Lt) < .9999999 ? (this._x = Math.atan2(-jt, Nt),
                    this._y = Math.atan2(-Wt, xt)) : (this._x = 0,
                    this._y = Math.atan2(Mt, qt));
                    break;
                case "XZY":
                    this._z = Math.asin(-qo(Ct, -1, 1)),
                    Math.abs(Ct) < .9999999 ? (this._x = Math.atan2(Qt, Nt),
                    this._y = Math.atan2(Mt, xt)) : (this._x = Math.atan2(-jt, qt),
                    this._y = 0);
                    break;
                default:
                    console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + lt)
                }
                return this._order = lt,
                mt === !0 && this._onChangeCallback(),
                this
            }
            setFromQuaternion(tt, lt, mt) {
                return sv.makeRotationFromQuaternion(tt),
                this.setFromRotationMatrix(sv, lt, mt)
            }
            setFromVector3(tt, lt=this._order) {
                return this.set(tt.x, tt.y, tt.z, lt)
            }
            reorder(tt) {
                return Su.setFromEuler(this),
                this.setFromQuaternion(Su, tt)
            }
            equals(tt) {
                return tt._x === this._x && tt._y === this._y && tt._z === this._z && tt._order === this._order
            }
            fromArray(tt) {
                return this._x = tt[0],
                this._y = tt[1],
                this._z = tt[2],
                tt[3] !== void 0 && (this._order = tt[3]),
                this._onChangeCallback(),
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this._x,
                tt[lt + 1] = this._y,
                tt[lt + 2] = this._z,
                tt[lt + 3] = this._order,
                tt
            }
            _onChange(tt) {
                return this._onChangeCallback = tt,
                this
            }
            _onChangeCallback() {}
            *[Symbol.iterator]() {
                yield this._x,
                yield this._y,
                yield this._z,
                yield this._order
            }
        }
        $u.DEFAULT_ORDER = "XYZ";
        class um {
            constructor() {
                this.mask = 1
            }
            set(tt) {
                this.mask = 1 << tt >>> 0
            }
            enable(tt) {
                this.mask |= 1 << tt
            }
            enableAll() {
                this.mask = -1
            }
            toggle(tt) {
                this.mask ^= 1 << tt
            }
            disable(tt) {
                this.mask &= ~(1 << tt)
            }
            disableAll() {
                this.mask = 0
            }
            test(tt) {
                return !!(this.mask & tt.mask)
            }
            isEnabled(tt) {
                return !!(this.mask & 1 << tt)
            }
        }
        let D0 = 0;
        const av = new Er
          , Xu = new Is
          , Ns = new no
          , xp = new Er
          , bp = new Er
          , l_ = new Er
          , lv = new Is
          , cv = new Er(1,0,0)
          , dm = new Er(0,1,0)
          , uv = new Er(0,0,1)
          , ru = {
            type: "added"
        }
          , B0 = {
            type: "removed"
        };
        class Mo extends As {
            constructor() {
                super(),
                this.isObject3D = !0,
                Object.defineProperty(this, "id", {
                    value: D0++
                }),
                this.uuid = Ms(),
                this.name = "",
                this.type = "Object3D",
                this.parent = null,
                this.children = [],
                this.up = Mo.DEFAULT_UP.clone();
                const tt = new Er
                  , lt = new $u
                  , mt = new Is
                  , ft = new Er(1,1,1);
                lt._onChange(function() {
                    mt.setFromEuler(lt, !1)
                }),
                mt._onChange(function() {
                    lt.setFromQuaternion(mt, void 0, !1)
                }),
                Object.defineProperties(this, {
                    position: {
                        configurable: !0,
                        enumerable: !0,
                        value: tt
                    },
                    rotation: {
                        configurable: !0,
                        enumerable: !0,
                        value: lt
                    },
                    quaternion: {
                        configurable: !0,
                        enumerable: !0,
                        value: mt
                    },
                    scale: {
                        configurable: !0,
                        enumerable: !0,
                        value: ft
                    },
                    modelViewMatrix: {
                        value: new no
                    },
                    normalMatrix: {
                        value: new lo
                    }
                }),
                this.matrix = new no,
                this.matrixWorld = new no,
                this.matrixAutoUpdate = Mo.DEFAULT_MATRIX_AUTO_UPDATE,
                this.matrixWorldNeedsUpdate = !1,
                this.matrixWorldAutoUpdate = Mo.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,
                this.layers = new um,
                this.visible = !0,
                this.castShadow = !1,
                this.receiveShadow = !1,
                this.frustumCulled = !0,
                this.renderOrder = 0,
                this.animations = [],
                this.userData = {}
            }
            onBeforeRender(tt, lt, mt, ft, xt, Ct) {
                this.dispatchEvent({
                    type: "beforeRender",
                    renderer: tt,
                    scene: lt,
                    camera: mt,
                    geometry: ft,
                    material: xt,
                    group: Ct
                })
            }
            onAfterRender(tt, lt, mt, ft, xt, Ct) {
                this.dispatchEvent({
                    type: "afterRender",
                    renderer: tt,
                    scene: lt,
                    camera: mt,
                    geometry: ft,
                    material: xt,
                    group: Ct
                })
            }
            applyMatrix4(tt) {
                this.matrixAutoUpdate && this.updateMatrix(),
                this.matrix.premultiply(tt),
                this.matrix.decompose(this.position, this.quaternion, this.scale)
            }
            applyQuaternion(tt) {
                return this.quaternion.premultiply(tt),
                this
            }
            setRotationFromAxisAngle(tt, lt) {
                this.quaternion.setFromAxisAngle(tt, lt)
            }
            setRotationFromEuler(tt) {
                this.quaternion.setFromEuler(tt, !0)
            }
            setRotationFromMatrix(tt) {
                this.quaternion.setFromRotationMatrix(tt)
            }
            setRotationFromQuaternion(tt) {
                this.quaternion.copy(tt)
            }
            rotateOnAxis(tt, lt) {
                return Xu.setFromAxisAngle(tt, lt),
                this.quaternion.multiply(Xu),
                this
            }
            rotateOnWorldAxis(tt, lt) {
                return Xu.setFromAxisAngle(tt, lt),
                this.quaternion.premultiply(Xu),
                this
            }
            rotateX(tt) {
                return this.rotateOnAxis(cv, tt)
            }
            rotateY(tt) {
                return this.rotateOnAxis(dm, tt)
            }
            rotateZ(tt) {
                return this.rotateOnAxis(uv, tt)
            }
            translateOnAxis(tt, lt) {
                return av.copy(tt).applyQuaternion(this.quaternion),
                this.position.add(av.multiplyScalar(lt)),
                this
            }
            translateX(tt) {
                return this.translateOnAxis(cv, tt)
            }
            translateY(tt) {
                return this.translateOnAxis(dm, tt)
            }
            translateZ(tt) {
                return this.translateOnAxis(uv, tt)
            }
            localToWorld(tt) {
                return this.updateWorldMatrix(!0, !1),
                tt.applyMatrix4(this.matrixWorld)
            }
            worldToLocal(tt) {
                return this.updateWorldMatrix(!0, !1),
                tt.applyMatrix4(Ns.copy(this.matrixWorld).invert())
            }
            lookAt(tt, lt, mt) {
                tt.isVector3 ? xp.copy(tt) : xp.set(tt, lt, mt);
                const ft = this.parent;
                this.updateWorldMatrix(!0, !1),
                bp.setFromMatrixPosition(this.matrixWorld),
                this.isCamera || this.isLight ? Ns.lookAt(bp, xp, this.up) : Ns.lookAt(xp, bp, this.up),
                this.quaternion.setFromRotationMatrix(Ns),
                ft && (Ns.extractRotation(ft.matrixWorld),
                Xu.setFromRotationMatrix(Ns),
                this.quaternion.premultiply(Xu.invert()))
            }
            add(tt) {
                if (arguments.length > 1) {
                    for (let lt = 0; lt < arguments.length; lt++)
                        this.add(arguments[lt]);
                    return this
                }
                return tt === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", tt),
                this) : (tt && tt.isObject3D ? (tt.parent !== null && tt.parent.remove(tt),
                tt.parent = this,
                this.children.push(tt),
                tt.dispatchEvent(ru)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", tt),
                this)
            }
            remove(tt) {
                if (arguments.length > 1) {
                    for (let mt = 0; mt < arguments.length; mt++)
                        this.remove(arguments[mt]);
                    return this
                }
                const lt = this.children.indexOf(tt);
                return lt !== -1 && (tt.parent = null,
                this.children.splice(lt, 1),
                tt.dispatchEvent(B0)),
                this
            }
            removeFromParent() {
                const tt = this.parent;
                return tt !== null && tt.remove(this),
                this
            }
            clear() {
                return this.remove(...this.children)
            }
            attach(tt) {
                return this.updateWorldMatrix(!0, !1),
                Ns.copy(this.matrixWorld).invert(),
                tt.parent !== null && (tt.parent.updateWorldMatrix(!0, !1),
                Ns.multiply(tt.parent.matrixWorld)),
                tt.applyMatrix4(Ns),
                this.add(tt),
                tt.updateWorldMatrix(!1, !0),
                this
            }
            getObjectById(tt) {
                return this.getObjectByProperty("id", tt)
            }
            getObjectByName(tt) {
                return this.getObjectByProperty("name", tt)
            }
            getObjectByProperty(tt, lt) {
                if (this[tt] === lt)
                    return this;
                for (let mt = 0, ft = this.children.length; mt < ft; mt++) {
                    const xt = this.children[mt].getObjectByProperty(tt, lt);
                    if (xt !== void 0)
                        return xt
                }
            }
            getObjectsByProperty(tt, lt) {
                let mt = [];
                this[tt] === lt && mt.push(this);
                for (let ft = 0, xt = this.children.length; ft < xt; ft++) {
                    const Ct = this.children[ft].getObjectsByProperty(tt, lt);
                    Ct.length > 0 && (mt = mt.concat(Ct))
                }
                return mt
            }
            getWorldPosition(tt) {
                return this.updateWorldMatrix(!0, !1),
                tt.setFromMatrixPosition(this.matrixWorld)
            }
            getWorldQuaternion(tt) {
                return this.updateWorldMatrix(!0, !1),
                this.matrixWorld.decompose(bp, tt, l_),
                tt
            }
            getWorldScale(tt) {
                return this.updateWorldMatrix(!0, !1),
                this.matrixWorld.decompose(bp, lv, tt),
                tt
            }
            getWorldDirection(tt) {
                this.updateWorldMatrix(!0, !1);
                const lt = this.matrixWorld.elements;
                return tt.set(lt[8], lt[9], lt[10]).normalize()
            }
            raycast() {}
            traverse(tt) {
                tt(this);
                const lt = this.children;
                for (let mt = 0, ft = lt.length; mt < ft; mt++)
                    lt[mt].traverse(tt)
            }
            traverseVisible(tt) {
                if (this.visible === !1)
                    return;
                tt(this);
                const lt = this.children;
                for (let mt = 0, ft = lt.length; mt < ft; mt++)
                    lt[mt].traverseVisible(tt)
            }
            traverseAncestors(tt) {
                const lt = this.parent;
                lt !== null && (tt(lt),
                lt.traverseAncestors(tt))
            }
            updateMatrix() {
                this.matrix.compose(this.position, this.quaternion, this.scale),
                this.matrixWorldNeedsUpdate = !0
            }
            updateMatrixWorld(tt) {
                this.matrixAutoUpdate && this.updateMatrix(),
                (this.matrixWorldNeedsUpdate || tt) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                this.matrixWorldNeedsUpdate = !1,
                tt = !0);
                const lt = this.children;
                for (let mt = 0, ft = lt.length; mt < ft; mt++) {
                    const xt = lt[mt];
                    xt.matrixWorldAutoUpdate !== !0 && tt !== !0 || xt.updateMatrixWorld(tt)
                }
            }
            updateWorldMatrix(tt, lt) {
                const mt = this.parent;
                if (tt === !0 && mt !== null && mt.matrixWorldAutoUpdate === !0 && mt.updateWorldMatrix(!0, !1),
                this.matrixAutoUpdate && this.updateMatrix(),
                this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                lt === !0) {
                    const ft = this.children;
                    for (let xt = 0, Ct = ft.length; xt < Ct; xt++) {
                        const Mt = ft[xt];
                        Mt.matrixWorldAutoUpdate === !0 && Mt.updateWorldMatrix(!1, !0)
                    }
                }
            }
            toJSON(tt) {
                const lt = tt === void 0 || typeof tt == "string"
                  , mt = {};
                lt && (tt = {
                    geometries: {},
                    materials: {},
                    textures: {},
                    images: {},
                    shapes: {},
                    skeletons: {},
                    animations: {},
                    nodes: {},
                    extras: {}
                },
                mt.metadata = {
                    version: 4.6,
                    type: "Object",
                    generator: "Object3D.toJSON"
                });
                const ft = {};
                function xt(Mt, Lt) {
                    return Mt[Lt.uuid] === void 0 && (Mt[Lt.uuid] = Lt.toJSON(tt)),
                    Lt.uuid
                }
                if (ft.uuid = this.uuid,
                ft.type = this.type,
                this.name !== "" && (ft.name = this.name),
                this.castShadow === !0 && (ft.castShadow = !0),
                this.receiveShadow === !0 && (ft.receiveShadow = !0),
                this.visible === !1 && (ft.visible = !1),
                this.frustumCulled === !1 && (ft.frustumCulled = !1),
                this.renderOrder !== 0 && (ft.renderOrder = this.renderOrder),
                Object.keys(this.userData).length > 0 && (ft.userData = this.userData),
                ft.layers = this.layers.mask,
                ft.matrix = this.matrix.toArray(),
                ft.up = this.up.toArray(),
                this.matrixAutoUpdate === !1 && (ft.matrixAutoUpdate = !1),
                this.isInstancedMesh && (ft.type = "InstancedMesh",
                ft.count = this.count,
                ft.instanceMatrix = this.instanceMatrix.toJSON(),
                this.instanceColor !== null && (ft.instanceColor = this.instanceColor.toJSON())),
                this.isScene)
                    this.background && (this.background.isColor ? ft.background = this.background.toJSON() : this.background.isTexture && (ft.background = this.background.toJSON(tt).uuid)),
                    this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (ft.environment = this.environment.toJSON(tt).uuid);
                else if (this.isMesh || this.isLine || this.isPoints) {
                    ft.geometry = xt(tt.geometries, this.geometry);
                    const Mt = this.geometry.parameters;
                    if (Mt !== void 0 && Mt.shapes !== void 0) {
                        const Lt = Mt.shapes;
                        if (Array.isArray(Lt))
                            for (let Nt = 0, jt = Lt.length; Nt < jt; Nt++) {
                                const Wt = Lt[Nt];
                                xt(tt.shapes, Wt)
                            }
                        else
                            xt(tt.shapes, Lt)
                    }
                }
                if (this.isSkinnedMesh && (ft.bindMode = this.bindMode,
                ft.bindMatrix = this.bindMatrix.toArray(),
                this.skeleton !== void 0 && (xt(tt.skeletons, this.skeleton),
                ft.skeleton = this.skeleton.uuid)),
                this.material !== void 0)
                    if (Array.isArray(this.material)) {
                        const Mt = [];
                        for (let Lt = 0, Nt = this.material.length; Lt < Nt; Lt++)
                            Mt.push(xt(tt.materials, this.material[Lt]));
                        ft.material = Mt
                    } else
                        ft.material = xt(tt.materials, this.material);
                if (this.children.length > 0) {
                    ft.children = [];
                    for (let Mt = 0; Mt < this.children.length; Mt++)
                        ft.children.push(this.children[Mt].toJSON(tt).object)
                }
                if (this.animations.length > 0) {
                    ft.animations = [];
                    for (let Mt = 0; Mt < this.animations.length; Mt++) {
                        const Lt = this.animations[Mt];
                        ft.animations.push(xt(tt.animations, Lt))
                    }
                }
                if (lt) {
                    const Mt = Ct(tt.geometries)
                      , Lt = Ct(tt.materials)
                      , Nt = Ct(tt.textures)
                      , jt = Ct(tt.images)
                      , Wt = Ct(tt.shapes)
                      , Qt = Ct(tt.skeletons)
                      , qt = Ct(tt.animations)
                      , Xt = Ct(tt.nodes);
                    Mt.length > 0 && (mt.geometries = Mt),
                    Lt.length > 0 && (mt.materials = Lt),
                    Nt.length > 0 && (mt.textures = Nt),
                    jt.length > 0 && (mt.images = jt),
                    Wt.length > 0 && (mt.shapes = Wt),
                    Qt.length > 0 && (mt.skeletons = Qt),
                    qt.length > 0 && (mt.animations = qt),
                    Xt.length > 0 && (mt.nodes = Xt)
                }
                return mt.object = ft,
                mt;
                function Ct(Mt) {
                    const Lt = [];
                    for (const Nt in Mt) {
                        const jt = Mt[Nt];
                        delete jt.metadata,
                        Lt.push(jt)
                    }
                    return Lt
                }
            }
            clone(tt) {
                return new this.constructor().copy(this, tt)
            }
            copy(tt, lt=!0) {
                this.name = tt.name,
                this.up.copy(tt.up),
                this.position.copy(tt.position),
                this.rotation.order = tt.rotation.order,
                this.quaternion.copy(tt.quaternion),
                this.scale.copy(tt.scale),
                this.matrix.copy(tt.matrix),
                this.matrixWorld.copy(tt.matrixWorld),
                this.matrixAutoUpdate = tt.matrixAutoUpdate,
                this.matrixWorldNeedsUpdate = tt.matrixWorldNeedsUpdate,
                this.matrixWorldAutoUpdate = tt.matrixWorldAutoUpdate,
                this.layers.mask = tt.layers.mask,
                this.visible = tt.visible,
                this.castShadow = tt.castShadow,
                this.receiveShadow = tt.receiveShadow,
                this.frustumCulled = tt.frustumCulled,
                this.renderOrder = tt.renderOrder,
                this.animations = tt.animations.slice(),
                this.userData = {};
                for (const [mt,ft] of Object.entries(tt.userData))
                    this.userData[mt] = !ft || ft && (ft.isTexture || ft.isObject3D) ? ft : JSON.parse(JSON.stringify(ft));
                if (lt === !0)
                    for (let mt = 0; mt < tt.children.length; mt++) {
                        const ft = tt.children[mt];
                        this.add(ft.clone())
                    }
                return this
            }
        }
        Mo.DEFAULT_UP = new Er(0,1,0),
        Mo.DEFAULT_MATRIX_AUTO_UPDATE = !0,
        Mo.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
        const Fs = new Er
          , Il = new Er
          , c_ = new Er
          , Ul = new Er
          , Yu = new Er
          , Ku = new Er
          , dv = new Er
          , u_ = new Er
          , _l = new Er
          , pm = new Er;
        let hm = !1;
        class Es {
            constructor(tt=new Er, lt=new Er, mt=new Er) {
                this.a = tt,
                this.b = lt,
                this.c = mt
            }
            static getNormal(tt, lt, mt, ft) {
                ft.subVectors(mt, lt),
                Fs.subVectors(tt, lt),
                ft.cross(Fs);
                const xt = ft.lengthSq();
                return xt > 0 ? ft.multiplyScalar(1 / Math.sqrt(xt)) : ft.set(0, 0, 0)
            }
            static getBarycoord(tt, lt, mt, ft, xt) {
                Fs.subVectors(ft, lt),
                Il.subVectors(mt, lt),
                c_.subVectors(tt, lt);
                const Ct = Fs.dot(Fs)
                  , Mt = Fs.dot(Il)
                  , Lt = Fs.dot(c_)
                  , Nt = Il.dot(Il)
                  , jt = Il.dot(c_)
                  , Wt = Ct * Nt - Mt * Mt;
                if (Wt === 0)
                    return xt.set(-2, -1, -1);
                const Qt = 1 / Wt
                  , qt = (Nt * Lt - Mt * jt) * Qt
                  , Xt = (Ct * jt - Mt * Lt) * Qt;
                return xt.set(1 - qt - Xt, Xt, qt)
            }
            static containsPoint(tt, lt, mt, ft) {
                return this.getBarycoord(tt, lt, mt, ft, Ul),
                Ul.x >= 0 && Ul.y >= 0 && Ul.x + Ul.y <= 1
            }
            static getUV(tt, lt, mt, ft, xt, Ct, Mt, Lt) {
                return hm === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),
                hm = !0),
                this.getInterpolation(tt, lt, mt, ft, xt, Ct, Mt, Lt)
            }
            static getInterpolation(tt, lt, mt, ft, xt, Ct, Mt, Lt) {
                return this.getBarycoord(tt, lt, mt, ft, Ul),
                Lt.setScalar(0),
                Lt.addScaledVector(xt, Ul.x),
                Lt.addScaledVector(Ct, Ul.y),
                Lt.addScaledVector(Mt, Ul.z),
                Lt
            }
            static isFrontFacing(tt, lt, mt, ft) {
                return Fs.subVectors(mt, lt),
                Il.subVectors(tt, lt),
                Fs.cross(Il).dot(ft) < 0
            }
            set(tt, lt, mt) {
                return this.a.copy(tt),
                this.b.copy(lt),
                this.c.copy(mt),
                this
            }
            setFromPointsAndIndices(tt, lt, mt, ft) {
                return this.a.copy(tt[lt]),
                this.b.copy(tt[mt]),
                this.c.copy(tt[ft]),
                this
            }
            setFromAttributeAndIndices(tt, lt, mt, ft) {
                return this.a.fromBufferAttribute(tt, lt),
                this.b.fromBufferAttribute(tt, mt),
                this.c.fromBufferAttribute(tt, ft),
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                return this.a.copy(tt.a),
                this.b.copy(tt.b),
                this.c.copy(tt.c),
                this
            }
            getArea() {
                return Fs.subVectors(this.c, this.b),
                Il.subVectors(this.a, this.b),
                .5 * Fs.cross(Il).length()
            }
            getMidpoint(tt) {
                return tt.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
            }
            getNormal(tt) {
                return Es.getNormal(this.a, this.b, this.c, tt)
            }
            getPlane(tt) {
                return tt.setFromCoplanarPoints(this.a, this.b, this.c)
            }
            getBarycoord(tt, lt) {
                return Es.getBarycoord(tt, this.a, this.b, this.c, lt)
            }
            getUV(tt, lt, mt, ft, xt) {
                return hm === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),
                hm = !0),
                Es.getInterpolation(tt, this.a, this.b, this.c, lt, mt, ft, xt)
            }
            getInterpolation(tt, lt, mt, ft, xt) {
                return Es.getInterpolation(tt, this.a, this.b, this.c, lt, mt, ft, xt)
            }
            containsPoint(tt) {
                return Es.containsPoint(tt, this.a, this.b, this.c)
            }
            isFrontFacing(tt) {
                return Es.isFrontFacing(this.a, this.b, this.c, tt)
            }
            intersectsBox(tt) {
                return tt.intersectsTriangle(this)
            }
            closestPointToPoint(tt, lt) {
                const mt = this.a
                  , ft = this.b
                  , xt = this.c;
                let Ct, Mt;
                Yu.subVectors(ft, mt),
                Ku.subVectors(xt, mt),
                u_.subVectors(tt, mt);
                const Lt = Yu.dot(u_)
                  , Nt = Ku.dot(u_);
                if (Lt <= 0 && Nt <= 0)
                    return lt.copy(mt);
                _l.subVectors(tt, ft);
                const jt = Yu.dot(_l)
                  , Wt = Ku.dot(_l);
                if (jt >= 0 && Wt <= jt)
                    return lt.copy(ft);
                const Qt = Lt * Wt - jt * Nt;
                if (Qt <= 0 && Lt >= 0 && jt <= 0)
                    return Ct = Lt / (Lt - jt),
                    lt.copy(mt).addScaledVector(Yu, Ct);
                pm.subVectors(tt, xt);
                const qt = Yu.dot(pm)
                  , Xt = Ku.dot(pm);
                if (Xt >= 0 && qt <= Xt)
                    return lt.copy(xt);
                const Zt = qt * Nt - Lt * Xt;
                if (Zt <= 0 && Nt >= 0 && Xt <= 0)
                    return Mt = Nt / (Nt - Xt),
                    lt.copy(mt).addScaledVector(Ku, Mt);
                const Yt = jt * Xt - qt * Wt;
                if (Yt <= 0 && Wt - jt >= 0 && qt - Xt >= 0)
                    return dv.subVectors(xt, ft),
                    Mt = (Wt - jt) / (Wt - jt + (qt - Xt)),
                    lt.copy(ft).addScaledVector(dv, Mt);
                const sr = 1 / (Yt + Zt + Qt);
                return Ct = Zt * sr,
                Mt = Qt * sr,
                lt.copy(mt).addScaledVector(Yu, Ct).addScaledVector(Ku, Mt)
            }
            equals(tt) {
                return tt.a.equals(this.a) && tt.b.equals(this.b) && tt.c.equals(this.c)
            }
        }
        let L0 = 0;
        class hs extends As {
            constructor() {
                super(),
                this.isMaterial = !0,
                Object.defineProperty(this, "id", {
                    value: L0++
                }),
                this.uuid = Ms(),
                this.name = "",
                this.type = "Material",
                this.blending = Pt,
                this.side = vt,
                this.vertexColors = !1,
                this.opacity = 1,
                this.transparent = !1,
                this.alphaHash = !1,
                this.blendSrc = hr,
                this.blendDst = gr,
                this.blendEquation = kt,
                this.blendSrcAlpha = null,
                this.blendDstAlpha = null,
                this.blendEquationAlpha = null,
                this.depthFunc = vr,
                this.depthTest = !0,
                this.depthWrite = !0,
                this.stencilWriteMask = 255,
                this.stencilFunc = mp,
                this.stencilRef = 0,
                this.stencilFuncMask = 255,
                this.stencilFail = Yp,
                this.stencilZFail = Yp,
                this.stencilZPass = Yp,
                this.stencilWrite = !1,
                this.clippingPlanes = null,
                this.clipIntersection = !1,
                this.clipShadows = !1,
                this.shadowSide = null,
                this.colorWrite = !0,
                this.precision = null,
                this.polygonOffset = !1,
                this.polygonOffsetFactor = 0,
                this.polygonOffsetUnits = 0,
                this.dithering = !1,
                this.alphaToCoverage = !1,
                this.premultipliedAlpha = !1,
                this.forceSinglePass = !1,
                this.visible = !0,
                this.toneMapped = !0,
                this.userData = {},
                this.version = 0,
                this._alphaTest = 0
            }
            get alphaTest() {
                return this._alphaTest
            }
            set alphaTest(tt) {
                this._alphaTest > 0 != tt > 0 && this.version++,
                this._alphaTest = tt
            }
            onBuild() {}
            onBeforeRender() {}
            onAfterRender() {}
            onBeforeCompile() {}
            customProgramCacheKey() {
                return this.onBeforeCompile.toString()
            }
            setValues(tt) {
                if (tt !== void 0)
                    for (const lt in tt) {
                        const mt = tt[lt];
                        if (mt === void 0) {
                            console.warn(`THREE.Material: parameter '${lt}' has value of undefined.`);
                            continue
                        }
                        const ft = this[lt];
                        ft !== void 0 && (ft && ft.isColor ? ft.set(mt) : ft && ft.isVector3 && mt && mt.isVector3 ? ft.copy(mt) : Array.isArray(mt) && ft && typeof ft.fromArray == "function" ? ft.fromArray(mt) : this[lt] = mt)
                    }
            }
            toJSON(tt) {
                const lt = tt === void 0 || typeof tt == "string";
                lt && (tt = {
                    textures: {},
                    images: {}
                });
                const mt = {
                    metadata: {
                        version: 4.6,
                        type: "Material",
                        generator: "Material.toJSON"
                    }
                };
                function ft(xt) {
                    const Ct = [];
                    for (const Mt in xt) {
                        const Lt = xt[Mt];
                        delete Lt.metadata,
                        Ct.push(Lt)
                    }
                    return Ct
                }
                if (mt.uuid = this.uuid,
                mt.type = this.type,
                this.name !== "" && (mt.name = this.name),
                this.color && this.color.isColor && (mt.color = this.color.getHex()),
                this.roughness !== void 0 && (mt.roughness = this.roughness),
                this.metalness !== void 0 && (mt.metalness = this.metalness),
                this.sheen !== void 0 && (mt.sheen = this.sheen),
                this.sheenColor && this.sheenColor.isColor && (mt.sheenColor = this.sheenColor.getHex()),
                this.sheenRoughness !== void 0 && (mt.sheenRoughness = this.sheenRoughness),
                this.emissive && this.emissive.isColor && (mt.emissive = this.emissive.getHex()),
                this.emissiveIntensity && this.emissiveIntensity !== 1 && (mt.emissiveIntensity = this.emissiveIntensity),
                this.specular && this.specular.isColor && (mt.specular = this.specular.getHex()),
                this.specularIntensity !== void 0 && (mt.specularIntensity = this.specularIntensity),
                this.specularColor && this.specularColor.isColor && (mt.specularColor = this.specularColor.getHex()),
                this.shininess !== void 0 && (mt.shininess = this.shininess),
                this.clearcoat !== void 0 && (mt.clearcoat = this.clearcoat),
                this.clearcoatRoughness !== void 0 && (mt.clearcoatRoughness = this.clearcoatRoughness),
                this.clearcoatMap && this.clearcoatMap.isTexture && (mt.clearcoatMap = this.clearcoatMap.toJSON(tt).uuid),
                this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (mt.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(tt).uuid),
                this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (mt.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(tt).uuid,
                mt.clearcoatNormalScale = this.clearcoatNormalScale.toArray()),
                this.iridescence !== void 0 && (mt.iridescence = this.iridescence),
                this.iridescenceIOR !== void 0 && (mt.iridescenceIOR = this.iridescenceIOR),
                this.iridescenceThicknessRange !== void 0 && (mt.iridescenceThicknessRange = this.iridescenceThicknessRange),
                this.iridescenceMap && this.iridescenceMap.isTexture && (mt.iridescenceMap = this.iridescenceMap.toJSON(tt).uuid),
                this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (mt.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(tt).uuid),
                this.anisotropy !== void 0 && (mt.anisotropy = this.anisotropy),
                this.anisotropyRotation !== void 0 && (mt.anisotropyRotation = this.anisotropyRotation),
                this.anisotropyMap && this.anisotropyMap.isTexture && (mt.anisotropyMap = this.anisotropyMap.toJSON(tt).uuid),
                this.map && this.map.isTexture && (mt.map = this.map.toJSON(tt).uuid),
                this.matcap && this.matcap.isTexture && (mt.matcap = this.matcap.toJSON(tt).uuid),
                this.alphaMap && this.alphaMap.isTexture && (mt.alphaMap = this.alphaMap.toJSON(tt).uuid),
                this.lightMap && this.lightMap.isTexture && (mt.lightMap = this.lightMap.toJSON(tt).uuid,
                mt.lightMapIntensity = this.lightMapIntensity),
                this.aoMap && this.aoMap.isTexture && (mt.aoMap = this.aoMap.toJSON(tt).uuid,
                mt.aoMapIntensity = this.aoMapIntensity),
                this.bumpMap && this.bumpMap.isTexture && (mt.bumpMap = this.bumpMap.toJSON(tt).uuid,
                mt.bumpScale = this.bumpScale),
                this.normalMap && this.normalMap.isTexture && (mt.normalMap = this.normalMap.toJSON(tt).uuid,
                mt.normalMapType = this.normalMapType,
                mt.normalScale = this.normalScale.toArray()),
                this.displacementMap && this.displacementMap.isTexture && (mt.displacementMap = this.displacementMap.toJSON(tt).uuid,
                mt.displacementScale = this.displacementScale,
                mt.displacementBias = this.displacementBias),
                this.roughnessMap && this.roughnessMap.isTexture && (mt.roughnessMap = this.roughnessMap.toJSON(tt).uuid),
                this.metalnessMap && this.metalnessMap.isTexture && (mt.metalnessMap = this.metalnessMap.toJSON(tt).uuid),
                this.emissiveMap && this.emissiveMap.isTexture && (mt.emissiveMap = this.emissiveMap.toJSON(tt).uuid),
                this.specularMap && this.specularMap.isTexture && (mt.specularMap = this.specularMap.toJSON(tt).uuid),
                this.specularIntensityMap && this.specularIntensityMap.isTexture && (mt.specularIntensityMap = this.specularIntensityMap.toJSON(tt).uuid),
                this.specularColorMap && this.specularColorMap.isTexture && (mt.specularColorMap = this.specularColorMap.toJSON(tt).uuid),
                this.envMap && this.envMap.isTexture && (mt.envMap = this.envMap.toJSON(tt).uuid,
                this.combine !== void 0 && (mt.combine = this.combine)),
                this.envMapIntensity !== void 0 && (mt.envMapIntensity = this.envMapIntensity),
                this.reflectivity !== void 0 && (mt.reflectivity = this.reflectivity),
                this.refractionRatio !== void 0 && (mt.refractionRatio = this.refractionRatio),
                this.gradientMap && this.gradientMap.isTexture && (mt.gradientMap = this.gradientMap.toJSON(tt).uuid),
                this.transmission !== void 0 && (mt.transmission = this.transmission),
                this.transmissionMap && this.transmissionMap.isTexture && (mt.transmissionMap = this.transmissionMap.toJSON(tt).uuid),
                this.thickness !== void 0 && (mt.thickness = this.thickness),
                this.thicknessMap && this.thicknessMap.isTexture && (mt.thicknessMap = this.thicknessMap.toJSON(tt).uuid),
                this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (mt.attenuationDistance = this.attenuationDistance),
                this.attenuationColor !== void 0 && (mt.attenuationColor = this.attenuationColor.getHex()),
                this.size !== void 0 && (mt.size = this.size),
                this.shadowSide !== null && (mt.shadowSide = this.shadowSide),
                this.sizeAttenuation !== void 0 && (mt.sizeAttenuation = this.sizeAttenuation),
                this.blending !== Pt && (mt.blending = this.blending),
                this.side !== vt && (mt.side = this.side),
                this.vertexColors === !0 && (mt.vertexColors = !0),
                this.opacity < 1 && (mt.opacity = this.opacity),
                this.transparent === !0 && (mt.transparent = !0),
                mt.depthFunc = this.depthFunc,
                mt.depthTest = this.depthTest,
                mt.depthWrite = this.depthWrite,
                mt.colorWrite = this.colorWrite,
                mt.stencilWrite = this.stencilWrite,
                mt.stencilWriteMask = this.stencilWriteMask,
                mt.stencilFunc = this.stencilFunc,
                mt.stencilRef = this.stencilRef,
                mt.stencilFuncMask = this.stencilFuncMask,
                mt.stencilFail = this.stencilFail,
                mt.stencilZFail = this.stencilZFail,
                mt.stencilZPass = this.stencilZPass,
                this.rotation !== void 0 && this.rotation !== 0 && (mt.rotation = this.rotation),
                this.polygonOffset === !0 && (mt.polygonOffset = !0),
                this.polygonOffsetFactor !== 0 && (mt.polygonOffsetFactor = this.polygonOffsetFactor),
                this.polygonOffsetUnits !== 0 && (mt.polygonOffsetUnits = this.polygonOffsetUnits),
                this.linewidth !== void 0 && this.linewidth !== 1 && (mt.linewidth = this.linewidth),
                this.dashSize !== void 0 && (mt.dashSize = this.dashSize),
                this.gapSize !== void 0 && (mt.gapSize = this.gapSize),
                this.scale !== void 0 && (mt.scale = this.scale),
                this.dithering === !0 && (mt.dithering = !0),
                this.alphaTest > 0 && (mt.alphaTest = this.alphaTest),
                this.alphaHash === !0 && (mt.alphaHash = !0),
                this.alphaToCoverage === !0 && (mt.alphaToCoverage = !0),
                this.premultipliedAlpha === !0 && (mt.premultipliedAlpha = !0),
                this.forceSinglePass === !0 && (mt.forceSinglePass = !0),
                this.wireframe === !0 && (mt.wireframe = !0),
                this.wireframeLinewidth > 1 && (mt.wireframeLinewidth = this.wireframeLinewidth),
                this.wireframeLinecap !== "round" && (mt.wireframeLinecap = this.wireframeLinecap),
                this.wireframeLinejoin !== "round" && (mt.wireframeLinejoin = this.wireframeLinejoin),
                this.flatShading === !0 && (mt.flatShading = !0),
                this.visible === !1 && (mt.visible = !1),
                this.toneMapped === !1 && (mt.toneMapped = !1),
                this.fog === !1 && (mt.fog = !1),
                Object.keys(this.userData).length > 0 && (mt.userData = this.userData),
                lt) {
                    const xt = ft(tt.textures)
                      , Ct = ft(tt.images);
                    xt.length > 0 && (mt.textures = xt),
                    Ct.length > 0 && (mt.images = Ct)
                }
                return mt
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                this.name = tt.name,
                this.blending = tt.blending,
                this.side = tt.side,
                this.vertexColors = tt.vertexColors,
                this.opacity = tt.opacity,
                this.transparent = tt.transparent,
                this.blendSrc = tt.blendSrc,
                this.blendDst = tt.blendDst,
                this.blendEquation = tt.blendEquation,
                this.blendSrcAlpha = tt.blendSrcAlpha,
                this.blendDstAlpha = tt.blendDstAlpha,
                this.blendEquationAlpha = tt.blendEquationAlpha,
                this.depthFunc = tt.depthFunc,
                this.depthTest = tt.depthTest,
                this.depthWrite = tt.depthWrite,
                this.stencilWriteMask = tt.stencilWriteMask,
                this.stencilFunc = tt.stencilFunc,
                this.stencilRef = tt.stencilRef,
                this.stencilFuncMask = tt.stencilFuncMask,
                this.stencilFail = tt.stencilFail,
                this.stencilZFail = tt.stencilZFail,
                this.stencilZPass = tt.stencilZPass,
                this.stencilWrite = tt.stencilWrite;
                const lt = tt.clippingPlanes;
                let mt = null;
                if (lt !== null) {
                    const ft = lt.length;
                    mt = new Array(ft);
                    for (let xt = 0; xt !== ft; ++xt)
                        mt[xt] = lt[xt].clone()
                }
                return this.clippingPlanes = mt,
                this.clipIntersection = tt.clipIntersection,
                this.clipShadows = tt.clipShadows,
                this.shadowSide = tt.shadowSide,
                this.colorWrite = tt.colorWrite,
                this.precision = tt.precision,
                this.polygonOffset = tt.polygonOffset,
                this.polygonOffsetFactor = tt.polygonOffsetFactor,
                this.polygonOffsetUnits = tt.polygonOffsetUnits,
                this.dithering = tt.dithering,
                this.alphaTest = tt.alphaTest,
                this.alphaHash = tt.alphaHash,
                this.alphaToCoverage = tt.alphaToCoverage,
                this.premultipliedAlpha = tt.premultipliedAlpha,
                this.forceSinglePass = tt.forceSinglePass,
                this.visible = tt.visible,
                this.toneMapped = tt.toneMapped,
                this.userData = d_({}, tt.userData),
                this
            }
            dispose() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
        }
        function d_(Tt, tt) {
            if (!tt)
                return Tt;
            for (const lt of Object.keys(tt)) {
                if (lt.startsWith("__") || typeof Tt[lt] == "function" || typeof tt[lt] == "function")
                    continue;
                const mt = tt[lt]
                  , ft = !mt || mt.isTexture || mt.isObject3D || mt.isMaterial;
                ft || typeof tt[lt].clone != "function" ? ft || typeof tt[lt] != "object" && !Array.isArray(tt[lt]) ? Tt[lt] = tt[lt] : Tt[lt] = d_(Array.isArray(tt[lt]) ? [] : {}, tt[lt]) : Tt[lt] = tt[lt].clone()
            }
            return Tt
        }
        const p_ = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        }
          , Vl = {
            h: 0,
            s: 0,
            l: 0
        }
          , mm = {
            h: 0,
            s: 0,
            l: 0
        };
        function h_(Tt, tt, lt) {
            return lt < 0 && (lt += 1),
            lt > 1 && (lt -= 1),
            lt < 1 / 6 ? Tt + 6 * (tt - Tt) * lt : lt < .5 ? tt : lt < 2 / 3 ? Tt + 6 * (tt - Tt) * (2 / 3 - lt) : Tt
        }
        class Gn {
            constructor(tt, lt, mt) {
                return this.isColor = !0,
                this.r = 1,
                this.g = 1,
                this.b = 1,
                this.set(tt, lt, mt)
            }
            set(tt, lt, mt) {
                if (lt === void 0 && mt === void 0) {
                    const ft = tt;
                    ft && ft.isColor ? this.copy(ft) : typeof ft == "number" ? this.setHex(ft) : typeof ft == "string" && this.setStyle(ft)
                } else
                    this.setRGB(tt, lt, mt);
                return this
            }
            setScalar(tt) {
                return this.r = tt,
                this.g = tt,
                this.b = tt,
                this
            }
            setHex(tt, lt=jo) {
                return tt = Math.floor(tt),
                this.r = (tt >> 16 & 255) / 255,
                this.g = (tt >> 8 & 255) / 255,
                this.b = (255 & tt) / 255,
                Do.toWorkingColorSpace(this, lt),
                this
            }
            setRGB(tt, lt, mt, ft=Do.workingColorSpace) {
                return this.r = tt,
                this.g = lt,
                this.b = mt,
                Do.toWorkingColorSpace(this, ft),
                this
            }
            setHSL(tt, lt, mt, ft=Do.workingColorSpace) {
                if (tt = em(tt, 1),
                lt = qo(lt, 0, 1),
                mt = qo(mt, 0, 1),
                lt === 0)
                    this.r = this.g = this.b = mt;
                else {
                    const xt = mt <= .5 ? mt * (1 + lt) : mt + lt - mt * lt
                      , Ct = 2 * mt - xt;
                    this.r = h_(Ct, xt, tt + 1 / 3),
                    this.g = h_(Ct, xt, tt),
                    this.b = h_(Ct, xt, tt - 1 / 3)
                }
                return Do.toWorkingColorSpace(this, ft),
                this
            }
            setStyle(tt, lt=jo) {
                function mt(xt) {
                    xt !== void 0 && parseFloat(xt) < 1 && console.warn("THREE.Color: Alpha component of " + tt + " will be ignored.")
                }
                let ft;
                if (ft = /^(\w+)\(([^\)]*)\)/.exec(tt)) {
                    let xt;
                    const Ct = ft[1]
                      , Mt = ft[2];
                    switch (Ct) {
                    case "rgb":
                    case "rgba":
                        if (xt = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Mt))
                            return mt(xt[4]),
                            this.setRGB(Math.min(255, parseInt(xt[1], 10)) / 255, Math.min(255, parseInt(xt[2], 10)) / 255, Math.min(255, parseInt(xt[3], 10)) / 255, lt);
                        if (xt = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Mt))
                            return mt(xt[4]),
                            this.setRGB(Math.min(100, parseInt(xt[1], 10)) / 100, Math.min(100, parseInt(xt[2], 10)) / 100, Math.min(100, parseInt(xt[3], 10)) / 100, lt);
                        break;
                    case "hsl":
                    case "hsla":
                        if (xt = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Mt))
                            return mt(xt[4]),
                            this.setHSL(parseFloat(xt[1]) / 360, parseFloat(xt[2]) / 100, parseFloat(xt[3]) / 100, lt);
                        break;
                    default:
                        console.warn("THREE.Color: Unknown color model " + tt)
                    }
                } else if (ft = /^\#([A-Fa-f\d]+)$/.exec(tt)) {
                    const xt = ft[1]
                      , Ct = xt.length;
                    if (Ct === 3)
                        return this.setRGB(parseInt(xt.charAt(0), 16) / 15, parseInt(xt.charAt(1), 16) / 15, parseInt(xt.charAt(2), 16) / 15, lt);
                    if (Ct === 6)
                        return this.setHex(parseInt(xt, 16), lt);
                    console.warn("THREE.Color: Invalid hex color " + tt)
                } else if (tt && tt.length > 0)
                    return this.setColorName(tt, lt);
                return this
            }
            setColorName(tt, lt=jo) {
                const mt = p_[tt.toLowerCase()];
                return mt !== void 0 ? this.setHex(mt, lt) : console.warn("THREE.Color: Unknown color " + tt),
                this
            }
            clone() {
                return new this.constructor(this.r,this.g,this.b)
            }
            copy(tt) {
                return this.r = tt.r,
                this.g = tt.g,
                this.b = tt.b,
                this
            }
            copySRGBToLinear(tt) {
                return this.r = Uu(tt.r),
                this.g = Uu(tt.g),
                this.b = Uu(tt.b),
                this
            }
            copyLinearToSRGB(tt) {
                return this.r = nm(tt.r),
                this.g = nm(tt.g),
                this.b = nm(tt.b),
                this
            }
            convertSRGBToLinear() {
                return this.copySRGBToLinear(this),
                this
            }
            convertLinearToSRGB() {
                return this.copyLinearToSRGB(this),
                this
            }
            getHex(tt=jo) {
                return Do.fromWorkingColorSpace(ms.copy(this), tt),
                65536 * Math.round(qo(255 * ms.r, 0, 255)) + 256 * Math.round(qo(255 * ms.g, 0, 255)) + Math.round(qo(255 * ms.b, 0, 255))
            }
            getHexString(tt=jo) {
                return ("000000" + this.getHex(tt).toString(16)).slice(-6)
            }
            getHSL(tt, lt=Do.workingColorSpace) {
                Do.fromWorkingColorSpace(ms.copy(this), lt);
                const mt = ms.r
                  , ft = ms.g
                  , xt = ms.b
                  , Ct = Math.max(mt, ft, xt)
                  , Mt = Math.min(mt, ft, xt);
                let Lt, Nt;
                const jt = (Mt + Ct) / 2;
                if (Mt === Ct)
                    Lt = 0,
                    Nt = 0;
                else {
                    const Wt = Ct - Mt;
                    switch (Nt = jt <= .5 ? Wt / (Ct + Mt) : Wt / (2 - Ct - Mt),
                    Ct) {
                    case mt:
                        Lt = (ft - xt) / Wt + (ft < xt ? 6 : 0);
                        break;
                    case ft:
                        Lt = (xt - mt) / Wt + 2;
                        break;
                    case xt:
                        Lt = (mt - ft) / Wt + 4
                    }
                    Lt /= 6
                }
                return tt.h = Lt,
                tt.s = Nt,
                tt.l = jt,
                tt
            }
            getRGB(tt, lt=Do.workingColorSpace) {
                return Do.fromWorkingColorSpace(ms.copy(this), lt),
                tt.r = ms.r,
                tt.g = ms.g,
                tt.b = ms.b,
                tt
            }
            getStyle(tt=jo) {
                Do.fromWorkingColorSpace(ms.copy(this), tt);
                const lt = ms.r
                  , mt = ms.g
                  , ft = ms.b;
                return tt !== jo ? `color(${tt} ${lt.toFixed(3)} ${mt.toFixed(3)} ${ft.toFixed(3)})` : `rgb(${Math.round(255 * lt)},${Math.round(255 * mt)},${Math.round(255 * ft)})`
            }
            offsetHSL(tt, lt, mt) {
                return this.getHSL(Vl),
                this.setHSL(Vl.h + tt, Vl.s + lt, Vl.l + mt)
            }
            add(tt) {
                return this.r += tt.r,
                this.g += tt.g,
                this.b += tt.b,
                this
            }
            addColors(tt, lt) {
                return this.r = tt.r + lt.r,
                this.g = tt.g + lt.g,
                this.b = tt.b + lt.b,
                this
            }
            addScalar(tt) {
                return this.r += tt,
                this.g += tt,
                this.b += tt,
                this
            }
            sub(tt) {
                return this.r = Math.max(0, this.r - tt.r),
                this.g = Math.max(0, this.g - tt.g),
                this.b = Math.max(0, this.b - tt.b),
                this
            }
            multiply(tt) {
                return this.r *= tt.r,
                this.g *= tt.g,
                this.b *= tt.b,
                this
            }
            multiplyScalar(tt) {
                return this.r *= tt,
                this.g *= tt,
                this.b *= tt,
                this
            }
            lerp(tt, lt) {
                return this.r += (tt.r - this.r) * lt,
                this.g += (tt.g - this.g) * lt,
                this.b += (tt.b - this.b) * lt,
                this
            }
            lerpColors(tt, lt, mt) {
                return this.r = tt.r + (lt.r - tt.r) * mt,
                this.g = tt.g + (lt.g - tt.g) * mt,
                this.b = tt.b + (lt.b - tt.b) * mt,
                this
            }
            lerpHSL(tt, lt) {
                this.getHSL(Vl),
                tt.getHSL(mm);
                const mt = Fu(Vl.h, mm.h, lt)
                  , ft = Fu(Vl.s, mm.s, lt)
                  , xt = Fu(Vl.l, mm.l, lt);
                return this.setHSL(mt, ft, xt),
                this
            }
            setFromVector3(tt) {
                return this.r = tt.x,
                this.g = tt.y,
                this.b = tt.z,
                this
            }
            applyMatrix3(tt) {
                const lt = this.r
                  , mt = this.g
                  , ft = this.b
                  , xt = tt.elements;
                return this.r = xt[0] * lt + xt[3] * mt + xt[6] * ft,
                this.g = xt[1] * lt + xt[4] * mt + xt[7] * ft,
                this.b = xt[2] * lt + xt[5] * mt + xt[8] * ft,
                this
            }
            equals(tt) {
                return tt.r === this.r && tt.g === this.g && tt.b === this.b
            }
            fromArray(tt, lt=0) {
                return this.r = tt[lt],
                this.g = tt[lt + 1],
                this.b = tt[lt + 2],
                this
            }
            toArray(tt=[], lt=0) {
                return tt[lt] = this.r,
                tt[lt + 1] = this.g,
                tt[lt + 2] = this.b,
                tt
            }
            fromBufferAttribute(tt, lt) {
                return this.r = tt.getX(lt),
                this.g = tt.getY(lt),
                this.b = tt.getZ(lt),
                this
            }
            toJSON() {
                return this.getHex()
            }
            *[Symbol.iterator]() {
                yield this.r,
                yield this.g,
                yield this.b
            }
        }
        const ms = new Gn;
        Gn.NAMES = p_;
        class nu extends hs {
            constructor(tt) {
                super(),
                this.isMeshBasicMaterial = !0,
                this.type = "MeshBasicMaterial",
                this.color = new Gn(16777215),
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.specularMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.combine = Wn,
                this.reflectivity = 1,
                this.refractionRatio = .98,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.fog = !0,
                this.setValues(tt)
            }
            copy(tt) {
                return super.copy(tt),
                this.color.copy(tt.color),
                this.map = tt.map,
                this.lightMap = tt.lightMap,
                this.lightMapIntensity = tt.lightMapIntensity,
                this.aoMap = tt.aoMap,
                this.aoMapIntensity = tt.aoMapIntensity,
                this.specularMap = tt.specularMap,
                this.alphaMap = tt.alphaMap,
                this.envMap = tt.envMap,
                this.combine = tt.combine,
                this.reflectivity = tt.reflectivity,
                this.refractionRatio = tt.refractionRatio,
                this.wireframe = tt.wireframe,
                this.wireframeLinewidth = tt.wireframeLinewidth,
                this.wireframeLinecap = tt.wireframeLinecap,
                this.wireframeLinejoin = tt.wireframeLinejoin,
                this.fog = tt.fog,
                this
            }
        }
        const Dl = O0();
        function O0() {
            const Tt = new ArrayBuffer(4)
              , tt = new Float32Array(Tt)
              , lt = new Uint32Array(Tt)
              , mt = new Uint32Array(512)
              , ft = new Uint32Array(512);
            for (let Lt = 0; Lt < 256; ++Lt) {
                const Nt = Lt - 127;
                Nt < -27 ? (mt[Lt] = 0,
                mt[256 | Lt] = 32768,
                ft[Lt] = 24,
                ft[256 | Lt] = 24) : Nt < -14 ? (mt[Lt] = 1024 >> -Nt - 14,
                mt[256 | Lt] = 1024 >> -Nt - 14 | 32768,
                ft[Lt] = -Nt - 1,
                ft[256 | Lt] = -Nt - 1) : Nt <= 15 ? (mt[Lt] = Nt + 15 << 10,
                mt[256 | Lt] = Nt + 15 << 10 | 32768,
                ft[Lt] = 13,
                ft[256 | Lt] = 13) : Nt < 128 ? (mt[Lt] = 31744,
                mt[256 | Lt] = 64512,
                ft[Lt] = 24,
                ft[256 | Lt] = 24) : (mt[Lt] = 31744,
                mt[256 | Lt] = 64512,
                ft[Lt] = 13,
                ft[256 | Lt] = 13)
            }
            const xt = new Uint32Array(2048)
              , Ct = new Uint32Array(64)
              , Mt = new Uint32Array(64);
            for (let Lt = 1; Lt < 1024; ++Lt) {
                let Nt = Lt << 13
                  , jt = 0;
                for (; !(8388608 & Nt); )
                    Nt <<= 1,
                    jt -= 8388608;
                Nt &= -8388609,
                jt += 947912704,
                xt[Lt] = Nt | jt
            }
            for (let Lt = 1024; Lt < 2048; ++Lt)
                xt[Lt] = 939524096 + (Lt - 1024 << 13);
            for (let Lt = 1; Lt < 31; ++Lt)
                Ct[Lt] = Lt << 23;
            Ct[31] = 1199570944,
            Ct[32] = 2147483648;
            for (let Lt = 33; Lt < 63; ++Lt)
                Ct[Lt] = 2147483648 + (Lt - 32 << 23);
            Ct[63] = 3347054592;
            for (let Lt = 1; Lt < 64; ++Lt)
                Lt !== 32 && (Mt[Lt] = 1024);
            return {
                floatView: tt,
                uint32View: lt,
                baseTable: mt,
                shiftTable: ft,
                mantissaTable: xt,
                exponentTable: Ct,
                offsetTable: Mt
            }
        }
        function Vt(Tt) {
            Math.abs(Tt) > 65504 && console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),
            Tt = qo(Tt, -65504, 65504),
            Dl.floatView[0] = Tt;
            const tt = Dl.uint32View[0]
              , lt = tt >> 23 & 511;
            return Dl.baseTable[lt] + ((8388607 & tt) >> Dl.shiftTable[lt])
        }
        function wt(Tt) {
            const tt = Tt >> 10;
            return Dl.uint32View[0] = Dl.mantissaTable[Dl.offsetTable[tt] + (1023 & Tt)] + Dl.exponentTable[tt],
            Dl.floatView[0]
        }
        const Rt = {
            toHalfFloat: Vt,
            fromHalfFloat: wt
        }
          , zt = new Er
          , nr = new mn;
        class mr {
            constructor(tt, lt, mt=!1) {
                if (Array.isArray(tt))
                    throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                this.isBufferAttribute = !0,
                this.name = "",
                this.array = tt,
                this.itemSize = lt,
                this.count = tt !== void 0 ? tt.length / lt : 0,
                this.normalized = mt,
                this.usage = Nu,
                this.updateRange = {
                    offset: 0,
                    count: -1
                },
                this.gpuType = ss,
                this.version = 0
            }
            onUploadCallback() {}
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
            setUsage(tt) {
                return this.usage = tt,
                this
            }
            copy(tt) {
                return this.name = tt.name,
                this.array = new tt.array.constructor(tt.array),
                this.itemSize = tt.itemSize,
                this.count = tt.count,
                this.normalized = tt.normalized,
                this.usage = tt.usage,
                this.gpuType = tt.gpuType,
                this
            }
            copyAt(tt, lt, mt) {
                tt *= this.itemSize,
                mt *= lt.itemSize;
                for (let ft = 0, xt = this.itemSize; ft < xt; ft++)
                    this.array[tt + ft] = lt.array[mt + ft];
                return this
            }
            copyArray(tt) {
                return this.array.set(tt),
                this
            }
            applyMatrix3(tt) {
                if (this.itemSize === 2)
                    for (let lt = 0, mt = this.count; lt < mt; lt++)
                        nr.fromBufferAttribute(this, lt),
                        nr.applyMatrix3(tt),
                        this.setXY(lt, nr.x, nr.y);
                else if (this.itemSize === 3)
                    for (let lt = 0, mt = this.count; lt < mt; lt++)
                        zt.fromBufferAttribute(this, lt),
                        zt.applyMatrix3(tt),
                        this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            applyMatrix4(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.applyMatrix4(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            applyNormalMatrix(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.applyNormalMatrix(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            transformDirection(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.transformDirection(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            set(tt, lt=0) {
                return this.array.set(tt, lt),
                this
            }
            getComponent(tt, lt) {
                let mt = this.array[tt * this.itemSize + lt];
                return this.normalized && (mt = ws(mt, this.array)),
                mt
            }
            setComponent(tt, lt, mt) {
                return this.normalized && (mt = oo(mt, this.array)),
                this.array[tt * this.itemSize + lt] = mt,
                this
            }
            getX(tt) {
                let lt = this.array[tt * this.itemSize];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setX(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize] = lt,
                this
            }
            getY(tt) {
                let lt = this.array[tt * this.itemSize + 1];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setY(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 1] = lt,
                this
            }
            getZ(tt) {
                let lt = this.array[tt * this.itemSize + 2];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setZ(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 2] = lt,
                this
            }
            getW(tt) {
                let lt = this.array[tt * this.itemSize + 3];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setW(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 3] = lt,
                this
            }
            setXY(tt, lt, mt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this
            }
            setXYZ(tt, lt, mt, ft) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this.array[tt + 2] = ft,
                this
            }
            setXYZW(tt, lt, mt, ft, xt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array),
                xt = oo(xt, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this.array[tt + 2] = ft,
                this.array[tt + 3] = xt,
                this
            }
            onUpload(tt) {
                return this.onUploadCallback = tt,
                this
            }
            clone() {
                return new this.constructor(this.array,this.itemSize).copy(this)
            }
            toJSON() {
                const tt = {
                    itemSize: this.itemSize,
                    type: this.array.constructor.name,
                    array: Array.from(this.array),
                    normalized: this.normalized
                };
                return this.name !== "" && (tt.name = this.name),
                this.usage !== Nu && (tt.usage = this.usage),
                this.updateRange.offset === 0 && this.updateRange.count === -1 || (tt.updateRange = this.updateRange),
                tt
            }
        }
        class Tr extends mr {
            constructor(tt, lt, mt) {
                super(new Int8Array(tt), lt, mt)
            }
        }
        class $r extends mr {
            constructor(tt, lt, mt) {
                super(new Uint8Array(tt), lt, mt)
            }
        }
        class vn extends mr {
            constructor(tt, lt, mt) {
                super(new Uint8ClampedArray(tt), lt, mt)
            }
        }
        class zn extends mr {
            constructor(tt, lt, mt) {
                super(new Int16Array(tt), lt, mt)
            }
        }
        class co extends mr {
            constructor(tt, lt, mt) {
                super(new Uint16Array(tt), lt, mt)
            }
        }
        class is extends mr {
            constructor(tt, lt, mt) {
                super(new Int32Array(tt), lt, mt)
            }
        }
        class Ts extends mr {
            constructor(tt, lt, mt) {
                super(new Uint32Array(tt), lt, mt)
            }
        }
        class ks extends mr {
            constructor(tt, lt, mt) {
                super(new Uint16Array(tt), lt, mt),
                this.isFloat16BufferAttribute = !0
            }
            getX(tt) {
                let lt = wt(this.array[tt * this.itemSize]);
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setX(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize] = Vt(lt),
                this
            }
            getY(tt) {
                let lt = wt(this.array[tt * this.itemSize + 1]);
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setY(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 1] = Vt(lt),
                this
            }
            getZ(tt) {
                let lt = wt(this.array[tt * this.itemSize + 2]);
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setZ(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 2] = Vt(lt),
                this
            }
            getW(tt) {
                let lt = wt(this.array[tt * this.itemSize + 3]);
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setW(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 3] = Vt(lt),
                this
            }
            setXY(tt, lt, mt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array)),
                this.array[tt + 0] = Vt(lt),
                this.array[tt + 1] = Vt(mt),
                this
            }
            setXYZ(tt, lt, mt, ft) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array)),
                this.array[tt + 0] = Vt(lt),
                this.array[tt + 1] = Vt(mt),
                this.array[tt + 2] = Vt(ft),
                this
            }
            setXYZW(tt, lt, mt, ft, xt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array),
                xt = oo(xt, this.array)),
                this.array[tt + 0] = Vt(lt),
                this.array[tt + 1] = Vt(mt),
                this.array[tt + 2] = Vt(ft),
                this.array[tt + 3] = Vt(xt),
                this
            }
        }
        class Fn extends mr {
            constructor(tt, lt, mt) {
                super(new Float32Array(tt), lt, mt)
            }
        }
        class m_ extends mr {
            constructor(tt, lt, mt) {
                super(new Float64Array(tt), lt, mt)
            }
        }
        let fm = 0;
        const Ds = new no
          , Ju = new Mo
          , Gl = new Er
          , Us = new Tl
          , Ap = new Tl
          , fs = new Er;
        class bo extends As {
            constructor() {
                super(),
                this.isBufferGeometry = !0,
                Object.defineProperty(this, "id", {
                    value: fm++
                }),
                this.uuid = Ms(),
                this.name = "",
                this.type = "BufferGeometry",
                this.index = null,
                this.attributes = {},
                this.morphAttributes = {},
                this.morphTargetsRelative = !1,
                this.groups = [],
                this.boundingBox = null,
                this.boundingSphere = null,
                this.drawRange = {
                    start: 0,
                    count: 1 / 0
                },
                this.userData = {}
            }
            getIndex() {
                return this.index
            }
            setIndex(tt) {
                return Array.isArray(tt) ? this.index = new (tv(tt) ? Ts : co)(tt,1) : this.index = tt,
                this
            }
            getAttribute(tt) {
                return this.attributes[tt]
            }
            setAttribute(tt, lt) {
                return this.attributes[tt] = lt,
                this
            }
            deleteAttribute(tt) {
                return delete this.attributes[tt],
                this
            }
            hasAttribute(tt) {
                return this.attributes[tt] !== void 0
            }
            addGroup(tt, lt, mt=0) {
                this.groups.push({
                    start: tt,
                    count: lt,
                    materialIndex: mt
                })
            }
            clearGroups() {
                this.groups = []
            }
            setDrawRange(tt, lt) {
                this.drawRange.start = tt,
                this.drawRange.count = lt
            }
            applyMatrix4(tt) {
                const lt = this.attributes.position;
                lt !== void 0 && (lt.applyMatrix4(tt),
                lt.needsUpdate = !0);
                const mt = this.attributes.normal;
                if (mt !== void 0) {
                    const xt = new lo().getNormalMatrix(tt);
                    mt.applyNormalMatrix(xt),
                    mt.needsUpdate = !0
                }
                const ft = this.attributes.tangent;
                return ft !== void 0 && (ft.transformDirection(tt),
                ft.needsUpdate = !0),
                this.boundingBox !== null && this.computeBoundingBox(),
                this.boundingSphere !== null && this.computeBoundingSphere(),
                this
            }
            applyQuaternion(tt) {
                return Ds.makeRotationFromQuaternion(tt),
                this.applyMatrix4(Ds),
                this
            }
            rotateX(tt) {
                return Ds.makeRotationX(tt),
                this.applyMatrix4(Ds),
                this
            }
            rotateY(tt) {
                return Ds.makeRotationY(tt),
                this.applyMatrix4(Ds),
                this
            }
            rotateZ(tt) {
                return Ds.makeRotationZ(tt),
                this.applyMatrix4(Ds),
                this
            }
            translate(tt, lt, mt) {
                return Ds.makeTranslation(tt, lt, mt),
                this.applyMatrix4(Ds),
                this
            }
            scale(tt, lt, mt) {
                return Ds.makeScale(tt, lt, mt),
                this.applyMatrix4(Ds),
                this
            }
            lookAt(tt) {
                return Ju.lookAt(tt),
                Ju.updateMatrix(),
                this.applyMatrix4(Ju.matrix),
                this
            }
            center(tt=void 0) {
                return this.computeBoundingBox(),
                this.boundingBox.getCenter(Gl).negate(),
                this.translate(Gl.x, Gl.y, Gl.z),
                tt && tt.copy(Gl),
                this
            }
            setFromPoints(tt) {
                const lt = [];
                for (let mt = 0, ft = tt.length; mt < ft; mt++) {
                    const xt = tt[mt];
                    lt.push(xt.x, xt.y, xt.z || 0)
                }
                return this.setAttribute("position", new Fn(lt,3)),
                this
            }
            computeBoundingBox() {
                this.boundingBox === null && (this.boundingBox = new Tl);
                const tt = this.attributes.position
                  , lt = this.morphAttributes.position;
                if (tt && tt.isGLBufferAttribute)
                    return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this),
                    void this.boundingBox.set(new Er(-1 / 0,-1 / 0,-1 / 0), new Er(1 / 0,1 / 0,1 / 0));
                if (tt !== void 0) {
                    if (this.boundingBox.setFromBufferAttribute(tt),
                    lt)
                        for (let mt = 0, ft = lt.length; mt < ft; mt++) {
                            const xt = lt[mt];
                            Us.setFromBufferAttribute(xt),
                            this.morphTargetsRelative ? (fs.addVectors(this.boundingBox.min, Us.min),
                            this.boundingBox.expandByPoint(fs),
                            fs.addVectors(this.boundingBox.max, Us.max),
                            this.boundingBox.expandByPoint(fs)) : (this.boundingBox.expandByPoint(Us.min),
                            this.boundingBox.expandByPoint(Us.max))
                        }
                } else
                    this.boundingBox.makeEmpty();
                (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
            }
            computeBoundingSphere() {
                this.boundingSphere === null && (this.boundingSphere = new Ws);
                const tt = this.attributes.position
                  , lt = this.morphAttributes.position;
                if (tt && tt.isGLBufferAttribute)
                    return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this),
                    void this.boundingSphere.set(new Er, 1 / 0);
                if (tt) {
                    const mt = this.boundingSphere.center;
                    if (Us.setFromBufferAttribute(tt),
                    lt)
                        for (let xt = 0, Ct = lt.length; xt < Ct; xt++) {
                            const Mt = lt[xt];
                            Ap.setFromBufferAttribute(Mt),
                            this.morphTargetsRelative ? (fs.addVectors(Us.min, Ap.min),
                            Us.expandByPoint(fs),
                            fs.addVectors(Us.max, Ap.max),
                            Us.expandByPoint(fs)) : (Us.expandByPoint(Ap.min),
                            Us.expandByPoint(Ap.max))
                        }
                    Us.getCenter(mt);
                    let ft = 0;
                    for (let xt = 0, Ct = tt.count; xt < Ct; xt++)
                        fs.fromBufferAttribute(tt, xt),
                        ft = Math.max(ft, mt.distanceToSquared(fs));
                    if (lt)
                        for (let xt = 0, Ct = lt.length; xt < Ct; xt++) {
                            const Mt = lt[xt]
                              , Lt = this.morphTargetsRelative;
                            for (let Nt = 0, jt = Mt.count; Nt < jt; Nt++)
                                fs.fromBufferAttribute(Mt, Nt),
                                Lt && (Gl.fromBufferAttribute(tt, Nt),
                                fs.add(Gl)),
                                ft = Math.max(ft, mt.distanceToSquared(fs))
                        }
                    this.boundingSphere.radius = Math.sqrt(ft),
                    isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
                }
            }
            computeTangents() {
                const tt = this.index
                  , lt = this.attributes;
                if (tt === null || lt.position === void 0 || lt.normal === void 0 || lt.uv === void 0)
                    return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
                const mt = tt.array
                  , ft = lt.position.array
                  , xt = lt.normal.array
                  , Ct = lt.uv.array
                  , Mt = ft.length / 3;
                this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new mr(new Float32Array(4 * Mt),4));
                const Lt = this.getAttribute("tangent").array
                  , Nt = []
                  , jt = [];
                for (let Vr = 0; Vr < Mt; Vr++)
                    Nt[Vr] = new Er,
                    jt[Vr] = new Er;
                const Wt = new Er
                  , Qt = new Er
                  , qt = new Er
                  , Xt = new mn
                  , Zt = new mn
                  , Yt = new mn
                  , sr = new Er
                  , er = new Er;
                function rr(Vr, Gr, Hr) {
                    Wt.fromArray(ft, 3 * Vr),
                    Qt.fromArray(ft, 3 * Gr),
                    qt.fromArray(ft, 3 * Hr),
                    Xt.fromArray(Ct, 2 * Vr),
                    Zt.fromArray(Ct, 2 * Gr),
                    Yt.fromArray(Ct, 2 * Hr),
                    Qt.sub(Wt),
                    qt.sub(Wt),
                    Zt.sub(Xt),
                    Yt.sub(Xt);
                    const _n = 1 / (Zt.x * Yt.y - Yt.x * Zt.y);
                    isFinite(_n) && (sr.copy(Qt).multiplyScalar(Yt.y).addScaledVector(qt, -Zt.y).multiplyScalar(_n),
                    er.copy(qt).multiplyScalar(Zt.x).addScaledVector(Qt, -Yt.x).multiplyScalar(_n),
                    Nt[Vr].add(sr),
                    Nt[Gr].add(sr),
                    Nt[Hr].add(sr),
                    jt[Vr].add(er),
                    jt[Gr].add(er),
                    jt[Hr].add(er))
                }
                let xr = this.groups;
                xr.length === 0 && (xr = [{
                    start: 0,
                    count: mt.length
                }]);
                for (let Vr = 0, Gr = xr.length; Vr < Gr; ++Vr) {
                    const Hr = xr[Vr]
                      , _n = Hr.start;
                    for (let dn = _n, kn = _n + Hr.count; dn < kn; dn += 3)
                        rr(mt[dn + 0], mt[dn + 1], mt[dn + 2])
                }
                const br = new Er
                  , yr = new Er
                  , Pr = new Er
                  , zr = new Er;
                function Nr(Vr) {
                    Pr.fromArray(xt, 3 * Vr),
                    zr.copy(Pr);
                    const Gr = Nt[Vr];
                    br.copy(Gr),
                    br.sub(Pr.multiplyScalar(Pr.dot(Gr))).normalize(),
                    yr.crossVectors(zr, Gr);
                    const Hr = yr.dot(jt[Vr]) < 0 ? -1 : 1;
                    Lt[4 * Vr] = br.x,
                    Lt[4 * Vr + 1] = br.y,
                    Lt[4 * Vr + 2] = br.z,
                    Lt[4 * Vr + 3] = Hr
                }
                for (let Vr = 0, Gr = xr.length; Vr < Gr; ++Vr) {
                    const Hr = xr[Vr]
                      , _n = Hr.start;
                    for (let dn = _n, kn = _n + Hr.count; dn < kn; dn += 3)
                        Nr(mt[dn + 0]),
                        Nr(mt[dn + 1]),
                        Nr(mt[dn + 2])
                }
            }
            computeVertexNormals() {
                const tt = this.index
                  , lt = this.getAttribute("position");
                if (lt !== void 0) {
                    let mt = this.getAttribute("normal");
                    if (mt === void 0)
                        mt = new mr(new Float32Array(3 * lt.count),3),
                        this.setAttribute("normal", mt);
                    else
                        for (let Qt = 0, qt = mt.count; Qt < qt; Qt++)
                            mt.setXYZ(Qt, 0, 0, 0);
                    const ft = new Er
                      , xt = new Er
                      , Ct = new Er
                      , Mt = new Er
                      , Lt = new Er
                      , Nt = new Er
                      , jt = new Er
                      , Wt = new Er;
                    if (tt)
                        for (let Qt = 0, qt = tt.count; Qt < qt; Qt += 3) {
                            const Xt = tt.getX(Qt + 0)
                              , Zt = tt.getX(Qt + 1)
                              , Yt = tt.getX(Qt + 2);
                            ft.fromBufferAttribute(lt, Xt),
                            xt.fromBufferAttribute(lt, Zt),
                            Ct.fromBufferAttribute(lt, Yt),
                            jt.subVectors(Ct, xt),
                            Wt.subVectors(ft, xt),
                            jt.cross(Wt),
                            Mt.fromBufferAttribute(mt, Xt),
                            Lt.fromBufferAttribute(mt, Zt),
                            Nt.fromBufferAttribute(mt, Yt),
                            Mt.add(jt),
                            Lt.add(jt),
                            Nt.add(jt),
                            mt.setXYZ(Xt, Mt.x, Mt.y, Mt.z),
                            mt.setXYZ(Zt, Lt.x, Lt.y, Lt.z),
                            mt.setXYZ(Yt, Nt.x, Nt.y, Nt.z)
                        }
                    else
                        for (let Qt = 0, qt = lt.count; Qt < qt; Qt += 3)
                            ft.fromBufferAttribute(lt, Qt + 0),
                            xt.fromBufferAttribute(lt, Qt + 1),
                            Ct.fromBufferAttribute(lt, Qt + 2),
                            jt.subVectors(Ct, xt),
                            Wt.subVectors(ft, xt),
                            jt.cross(Wt),
                            mt.setXYZ(Qt + 0, jt.x, jt.y, jt.z),
                            mt.setXYZ(Qt + 1, jt.x, jt.y, jt.z),
                            mt.setXYZ(Qt + 2, jt.x, jt.y, jt.z);
                    this.normalizeNormals(),
                    mt.needsUpdate = !0
                }
            }
            normalizeNormals() {
                const tt = this.attributes.normal;
                for (let lt = 0, mt = tt.count; lt < mt; lt++)
                    fs.fromBufferAttribute(tt, lt),
                    fs.normalize(),
                    tt.setXYZ(lt, fs.x, fs.y, fs.z)
            }
            toNonIndexed() {
                function tt(Mt, Lt) {
                    const Nt = Mt.array
                      , jt = Mt.itemSize
                      , Wt = Mt.normalized
                      , Qt = new Nt.constructor(Lt.length * jt);
                    let qt = 0
                      , Xt = 0;
                    for (let Zt = 0, Yt = Lt.length; Zt < Yt; Zt++) {
                        qt = Mt.isInterleavedBufferAttribute ? Lt[Zt] * Mt.data.stride + Mt.offset : Lt[Zt] * jt;
                        for (let sr = 0; sr < jt; sr++)
                            Qt[Xt++] = Nt[qt++]
                    }
                    return new mr(Qt,jt,Wt)
                }
                if (this.index === null)
                    return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
                    this;
                const lt = new bo
                  , mt = this.index.array
                  , ft = this.attributes;
                for (const Mt in ft) {
                    const Lt = tt(ft[Mt], mt);
                    lt.setAttribute(Mt, Lt)
                }
                const xt = this.morphAttributes;
                for (const Mt in xt) {
                    const Lt = []
                      , Nt = xt[Mt];
                    for (let jt = 0, Wt = Nt.length; jt < Wt; jt++) {
                        const Qt = tt(Nt[jt], mt);
                        Lt.push(Qt)
                    }
                    lt.morphAttributes[Mt] = Lt
                }
                lt.morphTargetsRelative = this.morphTargetsRelative;
                const Ct = this.groups;
                for (let Mt = 0, Lt = Ct.length; Mt < Lt; Mt++) {
                    const Nt = Ct[Mt];
                    lt.addGroup(Nt.start, Nt.count, Nt.materialIndex)
                }
                return lt
            }
            toJSON() {
                const tt = {
                    metadata: {
                        version: 4.6,
                        type: "BufferGeometry",
                        generator: "BufferGeometry.toJSON"
                    }
                };
                if (tt.uuid = this.uuid,
                tt.type = this.type,
                this.name !== "" && (tt.name = this.name),
                Object.keys(this.userData).length > 0 && (tt.userData = this.userData),
                this.parameters !== void 0) {
                    const Lt = this.parameters;
                    for (const Nt in Lt)
                        Lt[Nt] !== void 0 && (tt[Nt] = Lt[Nt]);
                    return tt
                }
                tt.data = {
                    attributes: {}
                };
                const lt = this.index;
                lt !== null && (tt.data.index = {
                    type: lt.array.constructor.name,
                    array: Array.prototype.slice.call(lt.array)
                });
                const mt = this.attributes;
                for (const Lt in mt) {
                    const Nt = mt[Lt];
                    tt.data.attributes[Lt] = Nt.toJSON(tt.data)
                }
                const ft = {};
                let xt = !1;
                for (const Lt in this.morphAttributes) {
                    const Nt = this.morphAttributes[Lt]
                      , jt = [];
                    for (let Wt = 0, Qt = Nt.length; Wt < Qt; Wt++) {
                        const qt = Nt[Wt];
                        jt.push(qt.toJSON(tt.data))
                    }
                    jt.length > 0 && (ft[Lt] = jt,
                    xt = !0)
                }
                xt && (tt.data.morphAttributes = ft,
                tt.data.morphTargetsRelative = this.morphTargetsRelative);
                const Ct = this.groups;
                Ct.length > 0 && (tt.data.groups = JSON.parse(JSON.stringify(Ct)));
                const Mt = this.boundingSphere;
                return Mt !== null && (tt.data.boundingSphere = {
                    center: Mt.center.toArray(),
                    radius: Mt.radius
                }),
                tt
            }
            clone() {
                return new this.constructor().copy(this)
            }
            copy(tt) {
                this.index = null,
                this.attributes = {},
                this.morphAttributes = {},
                this.groups = [],
                this.boundingBox = null,
                this.boundingSphere = null;
                const lt = {};
                this.name = tt.name;
                const mt = tt.index;
                mt !== null && this.setIndex(mt.clone(lt));
                const ft = tt.attributes;
                for (const Nt in ft) {
                    const jt = ft[Nt];
                    this.setAttribute(Nt, jt.clone(lt))
                }
                const xt = tt.morphAttributes;
                for (const Nt in xt) {
                    const jt = []
                      , Wt = xt[Nt];
                    for (let Qt = 0, qt = Wt.length; Qt < qt; Qt++)
                        jt.push(Wt[Qt].clone(lt));
                    this.morphAttributes[Nt] = jt
                }
                this.morphTargetsRelative = tt.morphTargetsRelative;
                const Ct = tt.groups;
                for (let Nt = 0, jt = Ct.length; Nt < jt; Nt++) {
                    const Wt = Ct[Nt];
                    this.addGroup(Wt.start, Wt.count, Wt.materialIndex)
                }
                const Mt = tt.boundingBox;
                Mt !== null && (this.boundingBox = Mt.clone());
                const Lt = tt.boundingSphere;
                return Lt !== null && (this.boundingSphere = Lt.clone()),
                this.drawRange.start = tt.drawRange.start,
                this.drawRange.count = tt.drawRange.count,
                this.userData = tt.userData,
                this
            }
            dispose() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }
        const Ly = new no
          , wp = new Qu
          , pv = new Ws
          , Oy = new Er
          , gm = new Er
          , _m = new Er
          , vm = new Er
          , N0 = new Er
          , hv = new Er
          , mv = new mn
          , fv = new mn
          , gv = new mn
          , Ny = new Er
          , Fy = new Er
          , Uy = new Er
          , _v = new Er
          , vv = new Er;
        class gs extends Mo {
            constructor(tt=new bo, lt=new nu) {
                super(),
                this.isMesh = !0,
                this.type = "Mesh",
                this.geometry = tt,
                this.material = lt,
                this.updateMorphTargets()
            }
            copy(tt, lt) {
                return super.copy(tt, lt),
                tt.isMesh ? (tt.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = tt.morphTargetInfluences.slice()),
                tt.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, tt.morphTargetDictionary)),
                this.material = Array.isArray(tt.material) ? tt.material.slice() : tt.material,
                this.geometry = tt.geometry,
                this) : this
            }
            updateMorphTargets() {
                const tt = this.geometry.morphAttributes
                  , lt = Object.keys(tt);
                if (lt.length > 0) {
                    const mt = tt[lt[0]];
                    if (mt !== void 0) {
                        this.morphTargetInfluences = [],
                        this.morphTargetDictionary = {};
                        for (let ft = 0, xt = mt.length; ft < xt; ft++) {
                            const Ct = mt[ft].name || String(ft);
                            this.morphTargetInfluences.push(0),
                            this.morphTargetDictionary[Ct] = ft
                        }
                    }
                }
            }
            getVertexPosition(tt, lt) {
                const mt = this.geometry
                  , ft = mt.attributes.position
                  , xt = mt.morphAttributes.position
                  , Ct = mt.morphTargetsRelative;
                lt.fromBufferAttribute(ft, tt);
                const Mt = this.morphTargetInfluences;
                if (xt && Mt) {
                    hv.set(0, 0, 0);
                    for (let Lt = 0, Nt = xt.length; Lt < Nt; Lt++) {
                        const jt = Mt[Lt]
                          , Wt = xt[Lt];
                        jt !== 0 && (N0.fromBufferAttribute(Wt, tt),
                        Ct ? hv.addScaledVector(N0, jt) : hv.addScaledVector(N0.sub(lt), jt))
                    }
                    lt.add(hv)
                }
                return lt
            }
            raycast(tt, lt) {
                const mt = this.geometry
                  , ft = this.material
                  , xt = this.matrixWorld;
                if (ft !== void 0) {
                    if (mt.boundingSphere === null && mt.computeBoundingSphere(),
                    pv.copy(mt.boundingSphere),
                    pv.applyMatrix4(xt),
                    wp.copy(tt.ray).recast(tt.near),
                    pv.containsPoint(wp.origin) === !1 && (wp.intersectSphere(pv, Oy) === null || wp.origin.distanceToSquared(Oy) > (tt.far - tt.near) ** 2))
                        return;
                    Ly.copy(xt).invert(),
                    wp.copy(tt.ray).applyMatrix4(Ly),
                    mt.boundingBox !== null && wp.intersectsBox(mt.boundingBox) === !1 || this._computeIntersections(tt, lt, wp)
                }
            }
            _computeIntersections(tt, lt, mt) {
                let ft;
                const xt = this.geometry
                  , Ct = this.material
                  , Mt = xt.index
                  , Lt = xt.attributes.position
                  , Nt = xt.attributes.uv
                  , jt = xt.attributes.uv1
                  , Wt = xt.attributes.normal
                  , Qt = xt.groups
                  , qt = xt.drawRange;
                if (Mt !== null)
                    if (Array.isArray(Ct))
                        for (let Xt = 0, Zt = Qt.length; Xt < Zt; Xt++) {
                            const Yt = Qt[Xt]
                              , sr = Ct[Yt.materialIndex];
                            for (let er = Math.max(Yt.start, qt.start), rr = Math.min(Mt.count, Math.min(Yt.start + Yt.count, qt.start + qt.count)); er < rr; er += 3)
                                ft = yv(this, sr, tt, mt, Nt, jt, Wt, Mt.getX(er), Mt.getX(er + 1), Mt.getX(er + 2)),
                                ft && (ft.faceIndex = Math.floor(er / 3),
                                ft.face.materialIndex = Yt.materialIndex,
                                lt.push(ft))
                        }
                    else
                        for (let Xt = Math.max(0, qt.start), Zt = Math.min(Mt.count, qt.start + qt.count); Xt < Zt; Xt += 3)
                            ft = yv(this, Ct, tt, mt, Nt, jt, Wt, Mt.getX(Xt), Mt.getX(Xt + 1), Mt.getX(Xt + 2)),
                            ft && (ft.faceIndex = Math.floor(Xt / 3),
                            lt.push(ft));
                else if (Lt !== void 0)
                    if (Array.isArray(Ct))
                        for (let Xt = 0, Zt = Qt.length; Xt < Zt; Xt++) {
                            const Yt = Qt[Xt]
                              , sr = Ct[Yt.materialIndex];
                            for (let er = Math.max(Yt.start, qt.start), rr = Math.min(Lt.count, Math.min(Yt.start + Yt.count, qt.start + qt.count)); er < rr; er += 3)
                                ft = yv(this, sr, tt, mt, Nt, jt, Wt, er, er + 1, er + 2),
                                ft && (ft.faceIndex = Math.floor(er / 3),
                                ft.face.materialIndex = Yt.materialIndex,
                                lt.push(ft))
                        }
                    else
                        for (let Xt = Math.max(0, qt.start), Zt = Math.min(Lt.count, qt.start + qt.count); Xt < Zt; Xt += 3)
                            ft = yv(this, Ct, tt, mt, Nt, jt, Wt, Xt, Xt + 1, Xt + 2),
                            ft && (ft.faceIndex = Math.floor(Xt / 3),
                            lt.push(ft))
            }
        }
        function yv(Tt, tt, lt, mt, ft, xt, Ct, Mt, Lt, Nt) {
            Tt.getVertexPosition(Mt, gm),
            Tt.getVertexPosition(Lt, _m),
            Tt.getVertexPosition(Nt, vm);
            const jt = function(Wt, Qt, qt, Xt, Zt, Yt, sr, er) {
                let rr;
                if (rr = Qt.side === bt ? Xt.intersectTriangle(sr, Yt, Zt, !0, er) : Xt.intersectTriangle(Zt, Yt, sr, Qt.side === vt, er),
                rr === null)
                    return null;
                vv.copy(er),
                vv.applyMatrix4(Wt.matrixWorld);
                const xr = qt.ray.origin.distanceTo(vv);
                return xr < qt.near || xr > qt.far ? null : {
                    distance: xr,
                    point: vv.clone(),
                    object: Wt
                }
            }(Tt, tt, lt, mt, gm, _m, vm, _v);
            if (jt) {
                ft && (mv.fromBufferAttribute(ft, Mt),
                fv.fromBufferAttribute(ft, Lt),
                gv.fromBufferAttribute(ft, Nt),
                jt.uv = Es.getInterpolation(_v, gm, _m, vm, mv, fv, gv, new mn)),
                xt && (mv.fromBufferAttribute(xt, Mt),
                fv.fromBufferAttribute(xt, Lt),
                gv.fromBufferAttribute(xt, Nt),
                jt.uv1 = Es.getInterpolation(_v, gm, _m, vm, mv, fv, gv, new mn),
                jt.uv2 = jt.uv1),
                Ct && (Ny.fromBufferAttribute(Ct, Mt),
                Fy.fromBufferAttribute(Ct, Lt),
                Uy.fromBufferAttribute(Ct, Nt),
                jt.normal = Es.getInterpolation(_v, gm, _m, vm, Ny, Fy, Uy, new Er),
                jt.normal.dot(mt.direction) > 0 && jt.normal.multiplyScalar(-1));
                const Wt = {
                    a: Mt,
                    b: Lt,
                    c: Nt,
                    normal: new Er,
                    materialIndex: 0
                };
                Es.getNormal(gm, _m, vm, Wt.normal),
                jt.face = Wt
            }
            return jt
        }
        class Zu extends bo {
            constructor(tt=1, lt=1, mt=1, ft=1, xt=1, Ct=1) {
                super(),
                this.type = "BoxGeometry",
                this.parameters = {
                    width: tt,
                    height: lt,
                    depth: mt,
                    widthSegments: ft,
                    heightSegments: xt,
                    depthSegments: Ct
                };
                const Mt = this;
                ft = Math.floor(ft),
                xt = Math.floor(xt),
                Ct = Math.floor(Ct);
                const Lt = []
                  , Nt = []
                  , jt = []
                  , Wt = [];
                let Qt = 0
                  , qt = 0;
                function Xt(Zt, Yt, sr, er, rr, xr, br, yr, Pr, zr, Nr) {
                    const Vr = xr / Pr
                      , Gr = br / zr
                      , Hr = xr / 2
                      , _n = br / 2
                      , dn = yr / 2
                      , kn = Pr + 1
                      , Bn = zr + 1;
                    let cn = 0
                      , Yr = 0;
                    const Jr = new Er;
                    for (let sn = 0; sn < Bn; sn++) {
                        const on = sn * Gr - _n;
                        for (let Un = 0; Un < kn; Un++) {
                            const ro = Un * Vr - Hr;
                            Jr[Zt] = ro * er,
                            Jr[Yt] = on * rr,
                            Jr[sr] = dn,
                            Nt.push(Jr.x, Jr.y, Jr.z),
                            Jr[Zt] = 0,
                            Jr[Yt] = 0,
                            Jr[sr] = yr > 0 ? 1 : -1,
                            jt.push(Jr.x, Jr.y, Jr.z),
                            Wt.push(Un / Pr),
                            Wt.push(1 - sn / zr),
                            cn += 1
                        }
                    }
                    for (let sn = 0; sn < zr; sn++)
                        for (let on = 0; on < Pr; on++) {
                            const Un = Qt + on + kn * sn
                              , ro = Qt + on + kn * (sn + 1)
                              , Zn = Qt + (on + 1) + kn * (sn + 1)
                              , jn = Qt + (on + 1) + kn * sn;
                            Lt.push(Un, ro, jn),
                            Lt.push(ro, Zn, jn),
                            Yr += 6
                        }
                    Mt.addGroup(qt, Yr, Nr),
                    qt += Yr,
                    Qt += cn
                }
                Xt("z", "y", "x", -1, -1, mt, lt, tt, Ct, xt, 0),
                Xt("z", "y", "x", 1, -1, mt, lt, -tt, Ct, xt, 1),
                Xt("x", "z", "y", 1, 1, tt, mt, lt, ft, Ct, 2),
                Xt("x", "z", "y", 1, -1, tt, mt, -lt, ft, Ct, 3),
                Xt("x", "y", "z", 1, -1, tt, lt, mt, ft, xt, 4),
                Xt("x", "y", "z", -1, -1, tt, lt, -mt, ft, xt, 5),
                this.setIndex(Lt),
                this.setAttribute("position", new Fn(Nt,3)),
                this.setAttribute("normal", new Fn(jt,3)),
                this.setAttribute("uv", new Fn(Wt,2))
            }
            copy(tt) {
                return super.copy(tt),
                this.parameters = Object.assign({}, tt.parameters),
                this
            }
            static fromJSON(tt) {
                return new Zu(tt.width,tt.height,tt.depth,tt.widthSegments,tt.heightSegments,tt.depthSegments)
            }
        }
        function Sp(Tt) {
            const tt = {};
            for (const lt in Tt) {
                tt[lt] = {};
                for (const mt in Tt[lt]) {
                    const ft = Tt[lt][mt];
                    ft && (ft.isColor || ft.isMatrix3 || ft.isMatrix4 || ft.isVector2 || ft.isVector3 || ft.isVector4 || ft.isTexture || ft.isQuaternion) ? ft.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),
                    tt[lt][mt] = null) : tt[lt][mt] = ft.clone() : Array.isArray(ft) ? tt[lt][mt] = ft.slice() : tt[lt][mt] = ft
                }
            }
            return tt
        }
        function js(Tt) {
            const tt = {};
            for (let lt = 0; lt < Tt.length; lt++) {
                const mt = Sp(Tt[lt]);
                for (const ft in mt)
                    tt[ft] = mt[ft]
            }
            return tt
        }
        function jy(Tt) {
            return Tt.getRenderTarget() === null ? Tt.outputColorSpace : Do.workingColorSpace
        }
        const Vy = {
            clone: Sp,
            merge: js
        };
        class zl extends hs {
            constructor(tt) {
                super(),
                this.isShaderMaterial = !0,
                this.type = "ShaderMaterial",
                this.defines = {},
                this.uniforms = {},
                this.uniformsGroups = [],
                this.vertexShader = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

export default At;
