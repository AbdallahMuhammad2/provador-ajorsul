/* Standalone Function: createTippy */

function createTippy(d, o) {
    var c, h, _, b, _e, nt, it, at = evaluateProps(d, Object.assign({}, defaultProps$1, getExtendedPassedProps(removeUndefinedProps(o)))), ut = !1, pt = !1, ht = !1, _t = !1, vt = [], bt = tippy_esm_debounce(hn, at.interactiveDebounce), St = idCounter++, At = unique(at.plugins), Et = {
        id: St,
        reference: d,
        popper: div(),
        popperInstance: null,
        props: at,
        state: {
            isEnabled: !0,
            isVisible: !1,
            isDestroyed: !1,
            isMounted: !1,
            isShown: !1
        },
        plugins: At,
        clearDelayTimeouts: function() {
            clearTimeout(c),
            clearTimeout(h),
            cancelAnimationFrame(_)
        },
        setProps: function(pr) {
            if (!Et.state.isDestroyed) {
                ar("onBeforeUpdate", [Et, pr]),
                Zr();
                var Ir = Et.props
                  , jr = evaluateProps(d, Object.assign({}, Ir, removeUndefinedProps(pr), {
                    ignoreAttributes: !0
                }));
                Et.props = jr,
                vr(),
                Ir.interactiveDebounce !== jr.interactiveDebounce && (dr(),
                bt = tippy_esm_debounce(hn, jr.interactiveDebounce)),
                Ir.triggerTarget && !jr.triggerTarget ? normalizeToArray(Ir.triggerTarget).forEach(function(Qr) {
                    Qr.removeAttribute("aria-expanded")
                }) : jr.triggerTarget && d.removeAttribute("aria-expanded"),
                gr(),
                lr(),
                Dt && Dt(Ir, jr),
                Et.popperInstance && (mo(),
                nn().forEach(function(Qr) {
                    requestAnimationFrame(Qr._tippy.popperInstance.forceUpdate)
                })),
                ar("onAfterUpdate", [Et, pr])
            }
        },
        setContent: function(pr) {
            Et.setProps({
                content: pr
            })
        },
        show: function() {
            var pr = Et.state.isVisible
              , Ir = Et.state.isDestroyed
              , jr = !Et.state.isEnabled
              , Qr = currentInput.isTouch && !Et.props.touch
              , Or = getValueAtIndexOrReturn(Et.props.duration, 0, defaultProps$1.duration);
            if (!(pr || Ir || jr || Qr || Kt().hasAttribute("disabled") || (ar("onShow", [Et], !1),
            Et.props.onShow(Et) === !1))) {
                if (Et.state.isVisible = !0,
                Ht() && (It.style.visibility = "visible"),
                lr(),
                Rr(),
                Et.state.isMounted || (It.style.transition = "none"),
                Ht()) {
                    var qr = or();
                    setTransitionDuration([qr.box, qr.content], 0)
                }
                var gn, Mn, Tn;
                nt = function() {
                    var wn;
                    if (Et.state.isVisible && !_t) {
                        if (_t = !0,
                        It.offsetHeight,
                        It.style.transition = Et.props.moveTransition,
                        Ht() && Et.props.animation) {
                            var Cn = or()
                              , fn = Cn.box
                              , bn = Cn.content;
                            setTransitionDuration([fn, bn], Or),
                            setVisibilityState([fn, bn], "visible")
                        }
                        hr(),
                        gr(),
                        pushIfUnique(mountedInstances, Et),
                        (wn = Et.popperInstance) == null || wn.forceUpdate(),
                        ar("onMount", [Et]),
                        Et.props.animation && Ht() && function(Xn) {
                            tr(Xn, function() {
                                Et.state.isShown = !0,
                                ar("onShown", [Et])
                            })
                        }(Or)
                    }
                }
                ,
                Mn = Et.props.appendTo,
                Tn = Kt(),
                (gn = Et.props.interactive && Mn === TIPPY_DEFAULT_APPEND_TO || Mn === "parent" ? Tn.parentNode : invokeWithArgsOrReturn(Mn, [Tn])).contains(It) || gn.appendChild(It),
                Et.state.isMounted = !0,
                mo()
            }
        },
        hide: function() {
            var pr = !Et.state.isVisible
              , Ir = Et.state.isDestroyed
              , jr = !Et.state.isEnabled
              , Qr = getValueAtIndexOrReturn(Et.props.duration, 1, defaultProps$1.duration);
            if (!(pr || Ir || jr) && (ar("onHide", [Et], !1),
            Et.props.onHide(Et) !== !1)) {
                if (Et.state.isVisible = !1,
                Et.state.isShown = !1,
                _t = !1,
                ut = !1,
                Ht() && (It.style.visibility = "hidden"),
                dr(),
                Cr(),
                lr(!0),
                Ht()) {
                    var Or = or()
                      , qr = Or.box
                      , gn = Or.content;
                    Et.props.animation && (setTransitionDuration([qr, gn], Qr),
                    setVisibilityState([qr, gn], "hidden"))
                }
                hr(),
                gr(),
                Et.props.animation ? Ht() && function(Mn, Tn) {
                    tr(Mn, function() {
                        !Et.state.isVisible && It.parentNode && It.parentNode.contains(It) && Tn()
                    })
                }(Qr, Et.unmount) : Et.unmount()
            }
        },
        hideWithInteractivity: function(pr) {
            Jt().addEventListener("mousemove", bt),
            pushIfUnique(mouseMoveListeners, bt),
            bt(pr)
        },
        enable: function() {
            Et.state.isEnabled = !0
        },
        disable: function() {
            Et.hide(),
            Et.state.isEnabled = !1
        },
        unmount: function() {
            Et.state.isVisible && Et.hide(),
            Et.state.isMounted && (Ur(),
            nn().forEach(function(pr) {
                pr._tippy.unmount()
            }),
            It.parentNode && It.parentNode.removeChild(It),
            mountedInstances = mountedInstances.filter(function(pr) {
                return pr !== Et
            }),
            Et.state.isMounted = !1,
            ar("onHidden", [Et]))
        },
        destroy: function() {
            Et.state.isDestroyed || (Et.clearDelayTimeouts(),
            Et.unmount(),
            Zr(),
            delete d._tippy,
            Et.state.isDestroyed = !0,
            ar("onDestroy", [Et]))
        }
    };
    if (!at.render)
        return Et;
    var Pt = at.render(Et)
      , It = Pt.popper
      , Dt = Pt.onUpdate;
    It.setAttribute("data-tippy-root", ""),
    It.id = "tippy-" + Et.id,
    Et.popper = It,
    d._tippy = Et,
    It._tippy = Et;
    var Gt = At.map(function(pr) {
        return pr.fn(Et)
    })
      , Bt = d.hasAttribute("aria-expanded");
    return vr(),
    gr(),
    lr(),
    ar("onCreate", [Et]),
    at.showOnCreate && xn(),
    It.addEventListener("mouseenter", function() {
        Et.props.interactive && Et.state.isVisible && Et.clearDelayTimeouts()
    }),
    It.addEventListener("mouseleave", function() {
        Et.props.interactive && Et.props.trigger.indexOf("mouseenter") >= 0 && Jt().addEventListener("mousemove", bt)
    }),
    Et;
    function kt() {
        var pr = Et.props.touch;
        return Array.isArray(pr) ? pr : [pr, 0]
    }
    function Ut() {
        return kt()[0] === "hold"
    }
    function Ht() {
        var pr;
        return !((pr = Et.props.render) == null || !pr.$$tippy)
    }
    function Kt() {
        return it || d
    }
    function Jt() {
        var pr = Kt().parentNode;
        return pr ? getOwnerDocument(pr) : document
    }
    function or() {
        return getChildren(It)
    }
    function ir(pr) {
        return Et.state.isMounted && !Et.state.isVisible || currentInput.isTouch || b && b.type === "focus" ? 0 : getValueAtIndexOrReturn(Et.props.delay, pr ? 0 : 1, defaultProps$1.delay)
    }
    function lr(pr) {
        pr === void 0 && (pr = !1),
        It.style.pointerEvents = Et.props.interactive && !pr ? "" : "none",
        It.style.zIndex = "" + Et.props.zIndex
    }
    function ar(pr, Ir, jr) {
        var Qr;
        jr === void 0 && (jr = !0),
        Gt.forEach(function(Or) {
            Or[pr] && Or[pr].apply(Or, Ir)
        }),
        jr && (Qr = Et.props)[pr].apply(Qr, Ir)
    }
    function hr() {
        var pr = Et.props.aria;
        if (pr.content) {
            var Ir = "aria-" + pr.content
              , jr = It.id;
            normalizeToArray(Et.props.triggerTarget || d).forEach(function(Qr) {
                var Or = Qr.getAttribute(Ir);
                if (Et.state.isVisible)
                    Qr.setAttribute(Ir, Or ? Or + " " + jr : jr);
                else {
                    var qr = Or && Or.replace(jr, "").trim();
                    qr ? Qr.setAttribute(Ir, qr) : Qr.removeAttribute(Ir)
                }
            })
        }
    }
    function gr() {
        !Bt && Et.props.aria.expanded && normalizeToArray(Et.props.triggerTarget || d).forEach(function(pr) {
            Et.props.interactive ? pr.setAttribute("aria-expanded", Et.state.isVisible && pr === Kt() ? "true" : "false") : pr.removeAttribute("aria-expanded")
        })
    }
    function dr() {
        Jt().removeEventListener("mousemove", bt),
        mouseMoveListeners = mouseMoveListeners.filter(function(pr) {
            return pr !== bt
        })
    }
    function cr(pr) {
        if (!currentInput.isTouch || !ht && pr.type !== "mousedown") {
            var Ir = pr.composedPath && pr.composedPath()[0] || pr.target;
            if (!Et.props.interactive || !actualContains(It, Ir)) {
                if (normalizeToArray(Et.props.triggerTarget || d).some(function(jr) {
                    return actualContains(jr, Ir)
                })) {
                    if (currentInput.isTouch || Et.state.isVisible && Et.props.trigger.indexOf("click") >= 0)
                        return
                } else
                    ar("onClickOutside", [Et, pr]);
                Et.props.hideOnClick === !0 && (Et.clearDelayTimeouts(),
                Et.hide(),
                pt = !0,
                setTimeout(function() {
                    pt = !1
                }),
                Et.state.isMounted || Cr())
            }
        }
    }
    function Ar() {
        ht = !0
    }
    function wr() {
        ht = !1
    }
    function Rr() {
        var pr = Jt();
        pr.addEventListener("mousedown", cr, !0),
        pr.addEventListener("touchend", cr, TOUCH_OPTIONS),
        pr.addEventListener("touchstart", wr, TOUCH_OPTIONS),
        pr.addEventListener("touchmove", Ar, TOUCH_OPTIONS)
    }
    function Cr() {
        var pr = Jt();
        pr.removeEventListener("mousedown", cr, !0),
        pr.removeEventListener("touchend", cr, TOUCH_OPTIONS),
        pr.removeEventListener("touchstart", wr, TOUCH_OPTIONS),
        pr.removeEventListener("touchmove", Ar, TOUCH_OPTIONS)
    }
    function tr(pr, Ir) {
        var jr = or().box;
        function Qr(Or) {
            Or.target === jr && (updateTransitionEndListener(jr, "remove", Qr),
            Ir())
        }
        if (pr === 0)
            return Ir();
        updateTransitionEndListener(jr, "remove", _e),
        updateTransitionEndListener(jr, "add", Qr),
        _e = Qr
    }
    function fr(pr, Ir, jr) {
        jr === void 0 && (jr = !1),
        normalizeToArray(Et.props.triggerTarget || d).forEach(function(Qr) {
            Qr.addEventListener(pr, Ir, jr),
            vt.push({
                node: Qr,
                eventType: pr,
                handler: Ir,
                options: jr
            })
        })
    }
    function vr() {
        Ut() && (fr("touchstart", rn, {
            passive: !0
        }),
        fr("touchend", Nn, {
            passive: !0
        })),
        splitBySpaces(Et.props.trigger).forEach(function(pr) {
            if (pr !== "manual")
                switch (fr(pr, rn),
                pr) {
                case "mouseenter":
                    fr("mouseleave", Nn);
                    break;
                case "focus":
                    fr(isIE11 ? "focusout" : "blur", Wn);
                    break;
                case "focusin":
                    fr("focusout", Wn)
                }
        })
    }
    function Zr() {
        vt.forEach(function(pr) {
            var Ir = pr.node
              , jr = pr.eventType
              , Qr = pr.handler
              , Or = pr.options;
            Ir.removeEventListener(jr, Qr, Or)
        }),
        vt = []
    }
    function rn(pr) {
        var Ir, jr = !1;
        if (Et.state.isEnabled && !qn(pr) && !pt) {
            var Qr = ((Ir = b) == null ? void 0 : Ir.type) === "focus";
            b = pr,
            it = pr.currentTarget,
            gr(),
            !Et.state.isVisible && isMouseEvent(pr) && mouseMoveListeners.forEach(function(Or) {
                return Or(pr)
            }),
            pr.type === "click" && (Et.props.trigger.indexOf("mouseenter") < 0 || ut) && Et.props.hideOnClick !== !1 && Et.state.isVisible ? jr = !0 : xn(pr),
            pr.type === "click" && (ut = !jr),
            jr && !Qr && ur(pr)
        }
    }
    function hn(pr) {
        var Ir = pr.target
          , jr = Kt().contains(Ir) || It.contains(Ir);
        if (pr.type !== "mousemove" || !jr) {
            var Qr = nn().concat(It).map(function(Or) {
                var qr, gn = (qr = Or._tippy.popperInstance) == null ? void 0 : qr.state;
                return gn ? {
                    popperRect: Or.getBoundingClientRect(),
                    popperState: gn,
                    props: at
                } : null
            }).filter(Boolean);
            isCursorOutsideInteractiveBorder(Qr, pr) && (dr(),
            ur(pr))
        }
    }
    function Nn(pr) {
        qn(pr) || Et.props.trigger.indexOf("click") >= 0 && ut || (Et.props.interactive ? Et.hideWithInteractivity(pr) : ur(pr))
    }
    function Wn(pr) {
        Et.props.trigger.indexOf("focusin") < 0 && pr.target !== Kt() || Et.props.interactive && pr.relatedTarget && It.contains(pr.relatedTarget) || ur(pr)
    }
    function qn(pr) {
        return !!currentInput.isTouch && Ut() !== pr.type.indexOf("touch") >= 0
    }
    function mo() {
        Ur();
        var pr = Et.props
          , Ir = pr.popperOptions
          , jr = pr.placement
          , Qr = pr.offset
          , Or = pr.getReferenceClientRect
          , qr = pr.moveTransition
          , gn = Ht() ? getChildren(It).arrow : null
          , Mn = Or ? {
            getBoundingClientRect: Or,
            contextElement: Or.contextElement || Kt()
        } : d
          , Tn = [{
            name: "offset",
            options: {
                offset: Qr
            }
        }, {
            name: "preventOverflow",
            options: {
                padding: {
                    top: 2,
                    bottom: 2,
                    left: 5,
                    right: 5
                }
            }
        }, {
            name: "flip",
            options: {
                padding: 5
            }
        }, {
            name: "computeStyles",
            options: {
                adaptive: !qr
            }
        }, {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function(wn) {
                var Cn = wn.state;
                if (Ht()) {
                    var fn = or().box;
                    ["placement", "reference-hidden", "escaped"].forEach(function(bn) {
                        bn === "placement" ? fn.setAttribute("data-placement", Cn.placement) : Cn.attributes.popper["data-popper-" + bn] ? fn.setAttribute("data-" + bn, "") : fn.removeAttribute("data-" + bn)
                    }),
                    Cn.attributes.popper = {}
                }
            }
        }];
        Ht() && gn && Tn.push({
            name: "arrow",
            options: {
                element: gn,
                padding: 3
            }
        }),
        Tn.push.apply(Tn, (Ir == null ? void 0 : Ir.modifiers) || []),
        Et.popperInstance = popper_createPopper(Mn, It, Object.assign({}, Ir, {
            placement: jr,
            onFirstUpdate: nt,
            modifiers: Tn
        }))
    }
    function Ur() {
        Et.popperInstance && (Et.popperInstance.destroy(),
        Et.popperInstance = null)
    }
    function nn() {
        return arrayFrom(It.querySelectorAll("[data-tippy-root]"))
    }
    function xn(pr) {
        Et.clearDelayTimeouts(),
        pr && ar("onTrigger", [Et, pr]),
        Rr();
        var Ir = ir(!0)
          , jr = kt()
          , Qr = jr[0]
          , Or = jr[1];
        currentInput.isTouch && Qr === "hold" && Or && (Ir = Or),
        Ir ? c = setTimeout(function() {
            Et.show()
        }, Ir) : Et.show()
    }
    function ur(pr) {
        if (Et.clearDelayTimeouts(),
        ar("onUntrigger", [Et, pr]),
        Et.state.isVisible) {
            if (!(Et.props.trigger.indexOf("mouseenter") >= 0 && Et.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(pr.type) >= 0 && ut)) {
                var Ir = ir(!1);
                Ir ? h = setTimeout(function() {
                    Et.state.isVisible && Et.hide()
                }, Ir) : _ = requestAnimationFrame(function() {
                    Et.hide()
                })
            }
        } else
            Cr()
    }
}

export default createTippy;
