/* Standalone Class: DragGesture */

class DragGesture extends Feature {
    constructor(o) {
        super(o),
        this.removeGroupControls = noop,
        this.removeListeners = noop,
        this.controls = new VisualElementDragControls(o)
    }
    mount() {
        const {dragControls: o} = this.node.getProps();
        o && (this.removeGroupControls = o.subscribe(this.controls)),
        this.removeListeners = this.controls.addListeners() || noop
    }
    unmount() {
        this.removeGroupControls(),
        this.removeListeners()
    }
}

export default DragGesture;
