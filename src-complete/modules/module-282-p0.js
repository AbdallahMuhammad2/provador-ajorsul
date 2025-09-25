/*
 * Module 282 (Pattern 0)
 * Params: d, o
 * Size: 18107 chars
 */

// === MODULE CONTENT ===
function module282(d, o) {
(function(c) {
            const h = "tp";
            function _(Bt) {
                return kt => Ut => {
                    if (!kt && Ut === void 0)
                        return {
                            succeeded: !1,
                            value: void 0
                        };
                    if (kt && Ut === void 0)
                        return {
                            succeeded: !0,
                            value: void 0
                        };
                    const Ht = Bt(Ut);
                    return Ht !== void 0 ? {
                        succeeded: !0,
                        value: Ht
                    } : {
                        succeeded: !1,
                        value: void 0
                    }
                }
            }
            function b(Bt) {
                return {
                    custom: kt => _(kt)(Bt),
                    boolean: _(kt => typeof kt == "boolean" ? kt : void 0)(Bt),
                    number: _(kt => typeof kt == "number" ? kt : void 0)(Bt),
                    string: _(kt => typeof kt == "string" ? kt : void 0)(Bt),
                    function: _(kt => typeof kt == "function" ? kt : void 0)(Bt),
                    constant: kt => _(Ut => Ut === kt ? kt : void 0)(Bt),
                    raw: _(kt => kt)(Bt),
                    object: kt => _(Ut => {
                        if ((Ht = Ut) !== null && typeof Ht == "object")
                            return function(Kt, Jt) {
                                return Object.keys(Jt).reduce( (ir, lr) => {
                                    if (ir === void 0)
                                        return;
                                    const ar = (0,
                                    Jt[lr])(Kt[lr]);
                                    return ar.succeeded ? Object.assign(Object.assign({}, ir), {
                                        [lr]: ar.value
                                    }) : void 0
                                }
                                , {})
                            }(Ut, kt);
                        var Ht
                    }
                    )(Bt),
                    array: kt => _(Ut => {
                        if (Array.isArray(Ut))
                            return Ht = kt,
                            Ut.reduce( (Kt, Jt) => {
                                if (Kt === void 0)
                                    return;
                                const or = Ht(Jt);
                                return or.succeeded && or.value !== void 0 ? [...Kt, or.value] : void 0
                            }
                            , []);
                        var Ht
                    }
                    )(Bt)
                }
            }
            const _e = {
                optional: b(!0),
                required: b(!1)
            };
            function nt(Bt) {
                return kt => kt.toFixed(Math.max(Math.min(Bt, 20), 0))
            }
            function it(Bt) {
                return [Bt[0], Bt[1], Bt[2]]
            }
            function at(Bt) {
                return kt => function(Ut, Ht) {
                    const Kt = nt(Ht === "float" ? 2 : 0);
                    return `rgb(${
it(Ut.getComponents("rgb", Ht)).map(Jt => Kt(Jt)).join(", ")})`
                }(kt, Bt)
            }
            function ut(Bt) {
                return kt => function(Ut, Ht) {
                    const Kt = nt(2)
                      , Jt = nt(Ht === "float" ? 2 : 0);
                    return `rgba(${
Ut.getComponents("rgb", Ht).map( (or, ir) => (ir === 3 ? Kt : Jt)(or)).join(", ")})`
                }(kt, Bt)
            }
            function pt(Bt) {
                return kt => function(Ut, Ht) {
                    const Kt = nt(Ht === "float" ? 2 : 0)
                      , Jt = ["r", "g", "b"];
                    return `{${
it(Ut.getComponents("rgb", Ht)).map( (or, ir) => `${
Jt[ir]}: ${
Kt(or)}`).join(", ")}}`
                }(kt, Bt)
            }
            function ht(Bt) {
                return kt => function(Ut, Ht) {
                    const Kt = nt(2)
                      , Jt = nt(Ht === "float" ? 2 : 0)
                      , or = ["r", "g", "b", "a"];
                    return `{${
Ut.getComponents("rgb", Ht).map( (ir, lr) => `${
or[lr]}: ${(lr === 3 ? Kt : Jt)(ir)}`).join(", ")}}`
                }(kt, Bt)
            }
            function _t(Bt, kt, Ut, Ht) {
                return new (Ut || (Ut = Promise))(function(Kt, Jt) {
                    function or(ar) {
                        try {
                            lr(Ht.next(ar))
                        } catch (hr) {
                            Jt(hr)
                        }
                    }
                    function ir(ar) {
                        try {
                            lr(Ht.throw(ar))
                        } catch (hr) {
                            Jt(hr)
                        }
                    }
                    function lr(ar) {
                        var hr;
                        ar.done ? Kt(ar.value) : (hr = ar.value,
                        hr instanceof Ut ? hr : new Ut(function(gr) {
                            gr(hr)
                        }
                        )).then(or, ir)
                    }
                    lr((Ht = Ht.apply(Bt, [])).next())
                }
                )
            }
            function vt(Bt) {
                return _t(this, void 0, void 0, function*() {
                    const kt = new Image;
                    return kt.crossOrigin = "anonymous",
                    new Promise( (Ut, Ht) => {
                        kt.src = Bt,
                        kt.onload = () => {
                            Ut(kt)
                        }
                        ,
                        kt.onerror = Ht
                    }
                    )
                })
            }
            ["int", "float"].reduce( (Bt, kt) => [...Bt, {
                format: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "func",
                    type: kt
                },
                stringifier: at(kt)
            }, {
                format: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "func",
                    type: kt
                },
                stringifier: ut(kt)
            }, {
                format: {
                    alpha: !1,
                    mode: "rgb",
                    notation: "object",
                    type: kt
                },
                stringifier: pt(kt)
            }, {
                format: {
                    alpha: !0,
                    mode: "rgb",
                    notation: "object",
                    type: kt
                },
                stringifier: ht(kt)
            }], []);
            const bt = (St = "img",
            (Bt, kt) => [h, "-", St, "v", Bt ? `_${
Bt}` : "", kt ? `-${
kt}` : ""].join(""));
            var St;
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
                    this.image_.classList.add(bt(`image_${
Ut.imageFit}`)),
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
                            const {
dataTransfer: Ut} = kt
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
                css: ".tp-imgv{-webkit-appearance:none;-moz-appearance:none;
appearance:none;
background-color:rgba(0,0,0,0);
border-width:0;
font-family:inherit;
font-size:inherit;
font-weight:inherit;
margin:0;
outline:none;
padding:0}.tp-imgv{
background-color:var(--in-bg);
border-radius:var(--elm-br);
box-sizing:border-box;
color:var(--in-fg);
font-family:inherit;
height:var(--bld-us);
line-height:var(--bld-us);
min-width:0;
width:100%}.tp-imgv:hover{
background-color:var(--in-bg-h)}.tp-imgv:focus{
background-color:var(--in-bg-f)}.tp-imgv:active{
background-color:var(--in-bg-a)}.tp-imgv:disabled{
opacity:.5}:root{--tp-plugin-image-dragging-color: hsla(230, 100%, 66%, 1.00)}.tp-imgv{
cursor:pointer;
display:inline-flex;
height:auto !important;
max-height:calc(var(--bld-us)*3);
border-radius:4px;
position:relative}.tp-imgv.tp-v-disabled{
opacity:.5}.tp-imgv_input{
width:0;
height:0;
pointer-events:none;
visibility:hidden}.tp-imgv_image{
width:100%;
height:-moz-max-content;
height:max-content;
max-height:calc(var(--bld-us)*3);
border:0}.tp-imgv_image_contain{-o-object-fit:contain;
object-fit:contain}.tp-imgv_image_cover{-o-object-fit:cover;
object-fit:cover}.tp-imgv_area_root{
transition:opacity .16s ease-in-out}.tp-imgv_area_dragging{
border:2px dashed var(--tp-plugin-image-dragging-color);
border-radius:4px;
opacity:.6}",
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
}

export default module282;
