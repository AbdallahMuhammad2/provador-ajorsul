/* Standalone Function: popperGenerator */

function popperGenerator(d) {
    d === void 0 && (d = {});
    var o = d
      , c = o.defaultModifiers
      , h = c === void 0 ? [] : c
      , _ = o.defaultOptions
      , b = _ === void 0 ? DEFAULT_OPTIONS : _;
    return function(_e, nt, it) {
        it === void 0 && (it = b);
        var at = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, b),
            modifiersData: {},
            elements: {
                reference: _e,
                popper: nt
            },
            attributes: {},
            styles: {}
        }
          , ut = []
          , pt = !1
          , ht = {
            state: at,
            setOptions: function(vt) {
                var bt = typeof vt == "function" ? vt(at.options) : vt;
                _t(),
                at.options = Object.assign({}, b, at.options, bt),
                at.scrollParents = {
                    reference: isElement(_e) ? listScrollParents(_e) : _e.contextElement ? listScrollParents(_e.contextElement) : [],
                    popper: listScrollParents(nt)
                };
                var St = orderModifiers(mergeByName([].concat(h, at.options.modifiers)));
                return at.orderedModifiers = St.filter(function(At) {
                    return At.enabled
                }),
                at.orderedModifiers.forEach(function(At) {
                    var Et = At.name
                      , Pt = At.options
                      , It = Pt === void 0 ? {} : Pt
                      , Dt = At.effect;
                    if (typeof Dt == "function") {
                        var Gt = Dt({
                            state: at,
                            name: Et,
                            instance: ht,
                            options: It
                        });
                        ut.push(Gt || function() {}
                        )
                    }
                }),
                ht.update()
            },
            forceUpdate: function() {
                if (!pt) {
                    var vt = at.elements
                      , bt = vt.reference
                      , St = vt.popper;
                    if (areValidElements(bt, St)) {
                        at.rects = {
                            reference: getCompositeRect(bt, getOffsetParent(St), at.options.strategy === "fixed"),
                            popper: getLayoutRect(St)
                        },
                        at.reset = !1,
                        at.placement = at.options.placement,
                        at.orderedModifiers.forEach(function(Bt) {
                            return at.modifiersData[Bt.name] = Object.assign({}, Bt.data)
                        });
                        for (var At = 0; At < at.orderedModifiers.length; At++)
                            if (at.reset !== !0) {
                                var Et = at.orderedModifiers[At]
                                  , Pt = Et.fn
                                  , It = Et.options
                                  , Dt = It === void 0 ? {} : It
                                  , Gt = Et.name;
                                typeof Pt == "function" && (at = Pt({
                                    state: at,
                                    options: Dt,
                                    name: Gt,
                                    instance: ht
                                }) || at)
                            } else
                                at.reset = !1,
                                At = -1
                    }
                }
            },
            update: debounce(function() {
                return new Promise(function(vt) {
                    ht.forceUpdate(),
                    vt(at)
                }
                )
            }),
            destroy: function() {
                _t(),
                pt = !0
            }
        };
        if (!areValidElements(_e, nt))
            return ht;
        function _t() {
            ut.forEach(function(vt) {
                return vt()
            }),
            ut = []
        }
        return ht.setOptions(it).then(function(vt) {
            !pt && it.onFirstUpdate && it.onFirstUpdate(vt)
        }),
        ht
    }
}

export default popperGenerator;
