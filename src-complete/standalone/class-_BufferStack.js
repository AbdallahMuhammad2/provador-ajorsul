/* Standalone Class: _BufferStack */

class _BufferStack {
    constructor() {
        this.float32Array = null,
        this.uint16Array = null,
        this.uint32Array = null;
        const o = [];
        let c = null;
        this.setBuffer = h => {
            c && o.push(c),
            c = h,
            this.float32Array = new Float32Array(h),
            this.uint16Array = new Uint16Array(h),
            this.uint32Array = new Uint32Array(h)
        }
        ,
        this.clearBuffer = () => {
            c = null,
            this.float32Array = null,
            this.uint16Array = null,
            this.uint32Array = null,
            o.length !== 0 && this.setBuffer(o.pop())
        }
    }
}

export default _BufferStack;
