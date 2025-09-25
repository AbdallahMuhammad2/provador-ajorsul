/* Standalone Class: Box */

class Box extends Shape {
    constructor(o) {
        super({
            type: Shape.types.BOX
        }),
        this.halfExtents = o,
        this.convexPolyhedronRepresentation = null,
        this.updateConvexPolyhedronRepresentation(),
        this.updateBoundingSphereRadius()
    }
    updateConvexPolyhedronRepresentation() {
        const o = this.halfExtents.x
          , c = this.halfExtents.y
          , h = this.halfExtents.z
          , _ = Vec3
          , b = [new _(-o,-c,-h), new _(o,-c,-h), new _(o,c,-h), new _(-o,c,-h), new _(-o,-c,h), new _(o,-c,h), new _(o,c,h), new _(-o,c,h)]
          , _e = [new _(0,0,1), new _(0,1,0), new _(1,0,0)]
          , nt = new ConvexPolyhedron({
            vertices: b,
            faces: [[3, 2, 1, 0], [4, 5, 6, 7], [5, 4, 0, 1], [2, 3, 7, 6], [0, 4, 7, 3], [1, 2, 6, 5]],
            axes: _e
        });
        this.convexPolyhedronRepresentation = nt,
        nt.material = this.material
    }
    calculateLocalInertia(o, c) {
        return c === void 0 && (c = new Vec3),
        Box.calculateInertia(this.halfExtents, o, c),
        c
    }
    static calculateInertia(o, c, h) {
        const _ = o;
        h.x = 1 / 12 * c * (2 * _.y * 2 * _.y + 2 * _.z * 2 * _.z),
        h.y = 1 / 12 * c * (2 * _.x * 2 * _.x + 2 * _.z * 2 * _.z),
        h.z = 1 / 12 * c * (2 * _.y * 2 * _.y + 2 * _.x * 2 * _.x)
    }
    getSideNormals(o, c) {
        const h = o
          , _ = this.halfExtents;
        if (h[0].set(_.x, 0, 0),
        h[1].set(0, _.y, 0),
        h[2].set(0, 0, _.z),
        h[3].set(-_.x, 0, 0),
        h[4].set(0, -_.y, 0),
        h[5].set(0, 0, -_.z),
        c !== void 0)
            for (let b = 0; b !== h.length; b++)
                c.vmult(h[b], h[b]);
        return h
    }
    volume() {
        return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z
    }
    updateBoundingSphereRadius() {
        this.boundingSphereRadius = this.halfExtents.length()
    }
    forEachWorldCorner(o, c, h) {
        const _ = this.halfExtents
          , b = [[_.x, _.y, _.z], [-_.x, _.y, _.z], [-_.x, -_.y, _.z], [-_.x, -_.y, -_.z], [_.x, -_.y, -_.z], [_.x, _.y, -_.z], [-_.x, _.y, -_.z], [_.x, -_.y, _.z]];
        for (let _e = 0; _e < b.length; _e++)
            worldCornerTempPos.set(b[_e][0], b[_e][1], b[_e][2]),
            c.vmult(worldCornerTempPos, worldCornerTempPos),
            o.vadd(worldCornerTempPos, worldCornerTempPos),
            h(worldCornerTempPos.x, worldCornerTempPos.y, worldCornerTempPos.z)
    }
    calculateWorldAABB(o, c, h, _) {
        const b = this.halfExtents;
        worldCornersTemp[0].set(b.x, b.y, b.z),
        worldCornersTemp[1].set(-b.x, b.y, b.z),
        worldCornersTemp[2].set(-b.x, -b.y, b.z),
        worldCornersTemp[3].set(-b.x, -b.y, -b.z),
        worldCornersTemp[4].set(b.x, -b.y, -b.z),
        worldCornersTemp[5].set(b.x, b.y, -b.z),
        worldCornersTemp[6].set(-b.x, b.y, -b.z),
        worldCornersTemp[7].set(b.x, -b.y, b.z);
        const _e = worldCornersTemp[0];
        c.vmult(_e, _e),
        o.vadd(_e, _e),
        _.copy(_e),
        h.copy(_e);
        for (let nt = 1; nt < 8; nt++) {
            const it = worldCornersTemp[nt];
            c.vmult(it, it),
            o.vadd(it, it);
            const at = it.x
              , ut = it.y
              , pt = it.z;
            at > _.x && (_.x = at),
            ut > _.y && (_.y = ut),
            pt > _.z && (_.z = pt),
            at < h.x && (h.x = at),
            ut < h.y && (h.y = ut),
            pt < h.z && (h.z = pt)
        }
    }
}

export default Box;
