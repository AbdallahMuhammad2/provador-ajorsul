/* Standalone Class: PressGesture */

class PressGesture extends Feature {
    constructor() {
        super(...arguments),
        this.removeStartListeners = noop,
        this.removeEndListeners = noop,
        this.removeAccessibleListeners = noop,
        this.startPointerPress = (o, c) => {
            if (this.isPressing)
                return;
            this.removeEndListeners();
            const h = this.node.getProps()
              , b = addPointerEvent(window, "pointerup", (nt, it) => {
                if (!this.checkPressEnd())
                    return;
                const {onTap: at, onTapCancel: ut, globalTapTarget: pt} = this.node.getProps()
                  , ht = !pt && !isNodeOrChild(this.node.current, nt.target) ? ut : at;
                ht && frame.update( () => ht(nt, it))
            }
            , {
                passive: !(h.onTap || h.onPointerUp)
            })
              , _e = addPointerEvent(window, "pointercancel", (nt, it) => this.cancelPress(nt, it), {
                passive: !(h.onTapCancel || h.onPointerCancel)
            });
            this.removeEndListeners = pipe(b, _e),
            this.startPress(o, c)
        }
        ,
        this.startAccessiblePress = () => {
            const o = b => {
                if (b.key !== "Enter" || this.isPressing)
                    return;
                const _e = nt => {
                    nt.key !== "Enter" || !this.checkPressEnd() || fireSyntheticPointerEvent("up", (it, at) => {
                        const {onTap: ut} = this.node.getProps();
                        ut && frame.postRender( () => ut(it, at))
                    }
                    )
                }
                ;
                this.removeEndListeners(),
                this.removeEndListeners = addDomEvent(this.node.current, "keyup", _e),
                fireSyntheticPointerEvent("down", (nt, it) => {
                    this.startPress(nt, it)
                }
                )
            }
              , c = addDomEvent(this.node.current, "keydown", o)
              , h = () => {
                this.isPressing && fireSyntheticPointerEvent("cancel", (b, _e) => this.cancelPress(b, _e))
            }
              , _ = addDomEvent(this.node.current, "blur", h);
            this.removeAccessibleListeners = pipe(c, _)
        }
    }
    startPress(o, c) {
        this.isPressing = !0;
        const {onTapStart: h, whileTap: _} = this.node.getProps();
        _ && this.node.animationState && this.node.animationState.setActive("whileTap", !0),
        h && frame.postRender( () => h(o, c))
    }
    checkPressEnd() {
        return this.removeEndListeners(),
        this.isPressing = !1,
        this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1),
        !isDragActive()
    }
    cancelPress(o, c) {
        if (!this.checkPressEnd())
            return;
        const {onTapCancel: h} = this.node.getProps();
        h && frame.postRender( () => h(o, c))
    }
    mount() {
        const o = this.node.getProps()
          , c = addPointerEvent(o.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, {
            passive: !(o.onTapStart || o.onPointerStart)
        })
          , h = addDomEvent(this.node.current, "focus", this.startAccessiblePress);
        this.removeStartListeners = pipe(c, h)
    }
    unmount() {
        this.removeStartListeners(),
        this.removeEndListeners(),
        this.removeAccessibleListeners()
    }
}

export default PressGesture;
