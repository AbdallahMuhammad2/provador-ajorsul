/* Standalone Class: NBuf2 */

class NBuf2 {
    constructor(o) {
        this.top = 0,
        this.array = new Float32Array(o)
    }
    write(o) {
        this.array[this.top++] = o.x,
        this.array[this.top++] = o.y
    }
}

export default NBuf2;
