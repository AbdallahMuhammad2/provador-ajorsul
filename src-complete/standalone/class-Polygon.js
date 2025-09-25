/* Standalone Class: Polygon */

class Polygon {
    constructor(o, c) {
        this.vertices = o,
        this.shared = c,
        this.plane = Plane.fromPoints(o[0].pos, o[1].pos, o[2].pos)
    }
    clone() {
        return new Polygon(this.vertices.map(o => o.clone()),this.shared)
    }
    flip() {
        this.vertices.reverse().map(o => o.flip()),
        this.plane.flip()
    }
}

export default Polygon;
