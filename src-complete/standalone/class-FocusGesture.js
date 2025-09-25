/* Standalone Class: FocusGesture */

class FocusGesture extends Feature {
    constructor() {
        super(...arguments),
        this.isActive = !1
    }
    onFocus() {
        let o = !1;
        try {
            o = this.node.current.matches(":focus-visible")
        } catch {
            o = !0
        }
        !o || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0),
        this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1),
        this.isActive = !1)
    }
    mount() {
        this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() {}
}

export default FocusGesture;
