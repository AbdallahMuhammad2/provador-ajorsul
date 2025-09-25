/* Standalone Class: TriangleIntersectData */

class TriangleIntersectData {
    constructor(o) {
        this.triangle = new three_module.lMl().copy(o),
        this.intersects = {}
    }
    addTriangle(o, c) {
        this.intersects[o] = new three_module.lMl().copy(c)
    }
    getIntersectArray() {
        const o = []
          , {intersects: c} = this;
        for (const h in c)
            o.push(c[h]);
        return o
    }
}

export default TriangleIntersectData;
