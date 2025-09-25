/* Standalone Class: HoverGesture */

class HoverGesture extends Feature {
    mount() {
        this.unmount = pipe(addHoverEvent(this.node, !0), addHoverEvent(this.node, !1))
    }
    unmount() {}
}

export default HoverGesture;
