/* Standalone Class: Node_Node */

class Node_Node {
    constructor(o) {
        this.plane = null,
        this.front = null,
        this.back = null,
        this.polygons = [],
        o && this.build(o)
    }
    clone() {
        const o = new Node_Node;
        return o.plane = this.plane && this.plane.clone(),
        o.front = this.front && this.front.clone(),
        o.back = this.back && this.back.clone(),
        o.polygons = this.polygons.map(c => c.clone()),
        o
    }
    invert() {
        for (let c = 0; c < this.polygons.length; c++)
            this.polygons[c].flip();
        this.plane && this.plane.flip(),
        this.front && this.front.invert(),
        this.back && this.back.invert();
        const o = this.front;
        this.front = this.back,
        this.back = o
    }
    clipPolygons(o) {
        if (!this.plane)
            return o.slice();
        let c = new Array
          , h = new Array;
        for (let _ = 0; _ < o.length; _++)
            this.plane.splitPolygon(o[_], c, h, c, h);
        return this.front && (c = this.front.clipPolygons(c)),
        h = this.back ? this.back.clipPolygons(h) : [],
        c.concat(h)
    }
    clipTo(o) {
        this.polygons = o.clipPolygons(this.polygons),
        this.front && this.front.clipTo(o),
        this.back && this.back.clipTo(o)
    }
    allPolygons() {
        let o = this.polygons.slice();
        return this.front && (o = o.concat(this.front.allPolygons())),
        this.back && (o = o.concat(this.back.allPolygons())),
        o
    }
    build(o) {
        if (!o.length)
            return;
        this.plane || (this.plane = o[0].plane.clone());
        const c = []
          , h = [];
        for (let _ = 0; _ < o.length; _++)
            this.plane.splitPolygon(o[_], this.polygons, this.polygons, c, h);
        c.length && (this.front || (this.front = new Node_Node),
        this.front.build(c)),
        h.length && (this.back || (this.back = new Node_Node),
        this.back.build(h))
    }
}

export default Node_Node;
