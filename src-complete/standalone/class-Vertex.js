/* Standalone Class: Vertex */

class Vertex {
    constructor(o, c, h, _) {
        this.pos = new Vector().copy(o),
        this.normal = new Vector().copy(c),
        this.uv = new Vector().copy(h),
        this.uv.z = 0,
        _ && (this.color = new Vector().copy(_))
    }
    clone() {
        return new Vertex(this.pos,this.normal,this.uv,this.color)
    }
    flip() {
        this.normal.negate()
    }
    interpolate(o, c) {
        return new Vertex(this.pos.clone().lerp(o.pos, c),this.normal.clone().lerp(o.normal, c),this.uv.clone().lerp(o.uv, c),this.color && o.color && this.color.clone().lerp(o.color, c))
    }
}

export default Vertex;
