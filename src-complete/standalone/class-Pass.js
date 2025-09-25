/* Standalone Class: Pass */

class Pass {
    constructor() {
        this.isPass = !0,
        this.enabled = !0,
        this.needsSwap = !0,
        this.clear = !1,
        this.renderToScreen = !1
    }
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.")
    }
    dispose() {}
}

export default Pass;
