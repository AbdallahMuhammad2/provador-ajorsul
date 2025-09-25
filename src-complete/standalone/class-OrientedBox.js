/* Standalone Class: OrientedBox */

class OrientedBox {
    constructor(o, c, h) {
        this.isOrientedBox = !0,
        this.min = new three_module.Pq0,
        this.max = new three_module.Pq0,
        this.matrix = new three_module.kn4,
        this.invMatrix = new three_module.kn4,
        this.points = new Array(8).fill().map( () => new three_module.Pq0),
        this.satAxes = new Array(3).fill().map( () => new three_module.Pq0),
        this.satBounds = new Array(3).fill().map( () => new SeparatingAxisBounds),
        this.alignedSatBounds = new Array(3).fill().map( () => new SeparatingAxisBounds),
        this.needsUpdate = !1,
        o && this.min.copy(o),
        c && this.max.copy(c),
        h && this.matrix.copy(h)
    }
    set(o, c, h) {
        this.min.copy(o),
        this.max.copy(c),
        this.matrix.copy(h),
        this.needsUpdate = !0
    }
    copy(o) {
        this.min.copy(o.min),
        this.max.copy(o.max),
        this.matrix.copy(o.matrix),
        this.needsUpdate = !0
    }
}

export default OrientedBox;
