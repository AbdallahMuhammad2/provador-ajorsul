/* Standalone Class: HalfEdge */

class HalfEdge {
    constructor(o, c) {
        this.vertex = o,
        this.prev = null,
        this.next = null,
        this.twin = null,
        this.face = c
    }
    head() {
        return this.vertex
    }
    tail() {
        return this.prev ? this.prev.vertex : null
    }
    length() {
        const o = this.head()
          , c = this.tail();
        return c !== null ? c.point.distanceTo(o.point) : -1
    }
    lengthSquared() {
        const o = this.head()
          , c = this.tail();
        return c !== null ? c.point.distanceToSquared(o.point) : -1
    }
    setTwin(o) {
        return this.twin = o,
        o.twin = this,
        this
    }
}

export default HalfEdge;
