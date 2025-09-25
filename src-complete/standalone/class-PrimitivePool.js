/* Standalone Class: PrimitivePool */

class PrimitivePool {
    constructor(o) {
        this._getNewPrimitive = o,
        this._primitives = []
    }
    getPrimitive() {
        const o = this._primitives;
        return o.length === 0 ? this._getNewPrimitive() : o.pop()
    }
    releasePrimitive(o) {
        this._primitives.push(o)
    }
}

export default PrimitivePool;
