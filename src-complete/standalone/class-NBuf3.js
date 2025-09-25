/* Standalone Class: NBuf3 */

class NBuf3 {
    constructor(o) {
        this.top = 0,
        this.array = new Float32Array(o)
    }
    write(o) {
        this.array[this.top++] = o.x,
        this.array[this.top++] = o.y,
        this.array[this.top++] = o.z
    }
}

export default NBuf3;
