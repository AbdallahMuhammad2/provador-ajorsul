/* Standalone Class: MaskPass */

class MaskPass extends Pass {
    constructor(o, c) {
        super(),
        this.scene = o,
        this.camera = c,
        this.clear = !0,
        this.needsSwap = !1,
        this.inverse = !1
    }
    render(o, c, h) {
        const _ = o.getContext()
          , b = o.state;
        let _e, nt;
        b.buffers.color.setMask(!1),
        b.buffers.depth.setMask(!1),
        b.buffers.color.setLocked(!0),
        b.buffers.depth.setLocked(!0),
        this.inverse ? (_e = 0,
        nt = 1) : (_e = 1,
        nt = 0),
        b.buffers.stencil.setTest(!0),
        b.buffers.stencil.setOp(_.REPLACE, _.REPLACE, _.REPLACE),
        b.buffers.stencil.setFunc(_.ALWAYS, _e, 4294967295),
        b.buffers.stencil.setClear(nt),
        b.buffers.stencil.setLocked(!0),
        o.setRenderTarget(h),
        this.clear && o.clear(),
        o.render(this.scene, this.camera),
        o.setRenderTarget(c),
        this.clear && o.clear(),
        o.render(this.scene, this.camera),
        b.buffers.color.setLocked(!1),
        b.buffers.depth.setLocked(!1),
        b.buffers.color.setMask(!0),
        b.buffers.depth.setMask(!0),
        b.buffers.stencil.setLocked(!1),
        b.buffers.stencil.setFunc(_.EQUAL, 1, 4294967295),
        b.buffers.stencil.setOp(_.KEEP, _.KEEP, _.KEEP),
        b.buffers.stencil.setLocked(!0)
    }
}

export default MaskPass;
