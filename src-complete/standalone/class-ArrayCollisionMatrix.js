/* Standalone Class: ArrayCollisionMatrix */

class ArrayCollisionMatrix {
    constructor() {
        this.matrix = []
    }
    get(o, c) {
        let {index: h} = o
          , {index: _} = c;
        if (_ > h) {
            const b = _;
            _ = h,
            h = b
        }
        return this.matrix[(h * (h + 1) >> 1) + _ - 1]
    }
    set(o, c, h) {
        let {index: _} = o
          , {index: b} = c;
        if (b > _) {
            const _e = b;
            b = _,
            _ = _e
        }
        this.matrix[(_ * (_ + 1) >> 1) + b - 1] = h ? 1 : 0
    }
    reset() {
        for (let o = 0, c = this.matrix.length; o !== c; o++)
            this.matrix[o] = 0
    }
    setNumObjects(o) {
        this.matrix.length = o * (o - 1) >> 1
    }
}

export default ArrayCollisionMatrix;
