/* Standalone Class: SeparatingAxisBounds */

class SeparatingAxisBounds {
    constructor() {
        this.min = 1 / 0,
        this.max = -1 / 0
    }
    setFromPointsField(o, c) {
        let h = 1 / 0
          , _ = -1 / 0;
        for (let b = 0, _e = o.length; b < _e; b++) {
            const nt = o[b][c];
            h = nt < h ? nt : h,
            _ = nt > _ ? nt : _
        }
        this.min = h,
        this.max = _
    }
    setFromPoints(o, c) {
        let h = 1 / 0
          , _ = -1 / 0;
        for (let b = 0, _e = c.length; b < _e; b++) {
            const nt = c[b]
              , it = o.dot(nt);
            h = it < h ? it : h,
            _ = it > _ ? it : _
        }
        this.min = h,
        this.max = _
    }
    isSeparated(o) {
        return this.min > o.max || o.min > this.max
    }
}

export default SeparatingAxisBounds;
