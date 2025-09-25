/* Standalone Class: ClearMaskPass */

class ClearMaskPass extends Pass {
    constructor() {
        super(),
        this.needsSwap = !1
    }
    render(o) {
        o.state.buffers.stencil.setLocked(!1),
        o.state.buffers.stencil.setTest(!1)
    }
}

export default ClearMaskPass;
