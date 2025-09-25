/* Standalone Class: PanGesture */

class PanGesture extends Feature {
    constructor() {
        super(...arguments),
        this.removePointerDownListener = noop
    }
    onPointerDown(o) {
        this.session = new PanSession(o,this.createPanHandlers(),{
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: getContextWindow(this.node)
        })
    }
    createPanHandlers() {
        const {onPanSessionStart: o, onPanStart: c, onPan: h, onPanEnd: _} = this.node.getProps();
        return {
            onSessionStart: asyncHandler(o),
            onStart: asyncHandler(c),
            onMove: h,
            onEnd: (b, _e) => {
                delete this.session,
                _ && frame.postRender( () => _(b, _e))
            }
        }
    }
    mount() {
        this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", o => this.onPointerDown(o))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(),
        this.session && this.session.end()
    }
}

export default PanGesture;
