/* Standalone Class: Face */

class Face {
    constructor() {
        this.normal = new three_module.Pq0,
        this.midpoint = new three_module.Pq0,
        this.area = 0,
        this.constant = 0,
        this.outside = null,
        this.mark = Visible,
        this.edge = null
    }
    static create(o, c, h) {
        const _ = new Face
          , b = new HalfEdge(o,_)
          , _e = new HalfEdge(c,_)
          , nt = new HalfEdge(h,_);
        return b.next = nt.prev = _e,
        _e.next = b.prev = nt,
        nt.next = _e.prev = b,
        _.edge = b,
        _.compute()
    }
    getEdge(o) {
        let c = this.edge;
        for (; o > 0; )
            c = c.next,
            o--;
        for (; o < 0; )
            c = c.prev,
            o++;
        return c
    }
    compute() {
        const o = this.edge.tail()
          , c = this.edge.head()
          , h = this.edge.next.head();
        return _triangle.set(o.point, c.point, h.point),
        _triangle.getNormal(this.normal),
        _triangle.getMidpoint(this.midpoint),
        this.area = _triangle.getArea(),
        this.constant = this.normal.dot(this.midpoint),
        this
    }
    distanceToPoint(o) {
        return this.normal.dot(o) - this.constant
    }
}

export default Face;
