/* Standalone Class: TriangleIntersectionSets */

class TriangleIntersectionSets {
    constructor() {
        this.data = {}
    }
    addTriangleIntersection(o, c, h, _) {
        const {data: b} = this;
        b[o] || (b[o] = new TriangleIntersectData(c)),
        b[o].addTriangle(h, _)
    }
    getTrianglesAsArray(o=null) {
        const {data: c} = this
          , h = [];
        if (o !== null)
            o in c && h.push(c[o].triangle);
        else
            for (const _ in c)
                h.push(c[_].triangle);
        return h
    }
    getTriangleIndices() {
        return Object.keys(this.data).map(o => parseInt(o))
    }
    getIntersectionIndices(o) {
        const {data: c} = this;
        return c[o] ? Object.keys(c[o].intersects).map(h => parseInt(h)) : []
    }
    getIntersectionsAsArray(o=null, c=null) {
        const {data: h} = this
          , _ = new Set
          , b = []
          , _e = nt => {
            if (h[nt])
                if (c !== null)
                    h[nt].intersects[c] && b.push(h[nt].intersects[c]);
                else {
                    const it = h[nt].intersects;
                    for (const at in it)
                        _.has(at) || (_.add(at),
                        b.push(it[at]))
                }
        }
        ;
        if (o !== null)
            _e(o);
        else
            for (const nt in h)
                _e(nt);
        return b
    }
    reset() {
        this.data = {}
    }
}

export default TriangleIntersectionSets;
