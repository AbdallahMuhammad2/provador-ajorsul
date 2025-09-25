/* Standalone Constant: Fl */

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

export default Fl;
