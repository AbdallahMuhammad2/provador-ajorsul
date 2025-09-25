/* Standalone Class: TrianglePool */

class TrianglePool {
    constructor() {
        this._pool = [],
        this._index = 0
    }
    getTriangle() {
        return this._index >= this._pool.length && this._pool.push(new three_module.lMl),
        this._pool[this._index++]
    }
    clear() {
        this._index = 0
    }
    reset() {
        this._pool.length = 0,
        this._index = 0
    }
}

export default TrianglePool;
