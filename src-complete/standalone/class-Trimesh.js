/* Standalone Class: Trimesh */

class Trimesh extends Shape {
    constructor(o, c) {
        super({
            type: Shape.types.TRIMESH
        }),
        this.vertices = new Float32Array(o),
        this.indices = new Int16Array(c),
        this.normals = new Float32Array(c.length),
        this.aabb = new AABB,
        this.edges = null,
        this.scale = new Vec3(1,1,1),
        this.tree = new Octree,
        this.updateEdges(),
        this.updateNormals(),
        this.updateAABB(),
        this.updateBoundingSphereRadius(),
        this.updateTree()
    }
    updateTree() {
        const o = this.tree;
        o.reset(),
        o.aabb.copy(this.aabb);
        const c = this.scale;
        o.aabb.lowerBound.x *= 1 / c.x,
        o.aabb.lowerBound.y *= 1 / c.y,
        o.aabb.lowerBound.z *= 1 / c.z,
        o.aabb.upperBound.x *= 1 / c.x,
        o.aabb.upperBound.y *= 1 / c.y,
        o.aabb.upperBound.z *= 1 / c.z;
        const h = new AABB
          , _ = new Vec3
          , b = new Vec3
          , _e = new Vec3
          , nt = [_, b, _e];
        for (let it = 0; it < this.indices.length / 3; it++) {
            const at = 3 * it;
            this._getUnscaledVertex(this.indices[at], _),
            this._getUnscaledVertex(this.indices[at + 1], b),
            this._getUnscaledVertex(this.indices[at + 2], _e),
            h.setFromPoints(nt),
            o.insert(h, it)
        }
        o.removeEmptyNodes()
    }
    getTrianglesInAABB(o, c) {
        unscaledAABB.copy(o);
        const h = this.scale
          , _ = h.x
          , b = h.y
          , _e = h.z
          , nt = unscaledAABB.lowerBound
          , it = unscaledAABB.upperBound;
        return nt.x /= _,
        nt.y /= b,
        nt.z /= _e,
        it.x /= _,
        it.y /= b,
        it.z /= _e,
        this.tree.aabbQuery(unscaledAABB, c)
    }
    setScale(o) {
        const c = this.scale.x === this.scale.y && this.scale.y === this.scale.z
          , h = o.x === o.y && o.y === o.z;
        c && h || this.updateNormals(),
        this.scale.copy(o),
        this.updateAABB(),
        this.updateBoundingSphereRadius()
    }
    updateNormals() {
        const o = computeNormals_n
          , c = this.normals;
        for (let h = 0; h < this.indices.length / 3; h++) {
            const _ = 3 * h
              , b = this.indices[_]
              , _e = this.indices[_ + 1]
              , nt = this.indices[_ + 2];
            this.getVertex(b, va$1),
            this.getVertex(_e, vb$1),
            this.getVertex(nt, vc$1),
            Trimesh.computeNormal(vb$1, va$1, vc$1, o),
            c[_] = o.x,
            c[_ + 1] = o.y,
            c[_ + 2] = o.z
        }
    }
    updateEdges() {
        const o = {}
          , c = (_, b) => {
            o[_ < b ? `${_}_${b}` : `${b}_${_}`] = !0
        }
        ;
        for (let _ = 0; _ < this.indices.length / 3; _++) {
            const b = 3 * _
              , _e = this.indices[b]
              , nt = this.indices[b + 1]
              , it = this.indices[b + 2];
            c(_e, nt),
            c(nt, it),
            c(it, _e)
        }
        const h = Object.keys(o);
        this.edges = new Int16Array(2 * h.length);
        for (let _ = 0; _ < h.length; _++) {
            const b = h[_].split("_");
            this.edges[2 * _] = parseInt(b[0], 10),
            this.edges[2 * _ + 1] = parseInt(b[1], 10)
        }
    }
    getEdgeVertex(o, c, h) {
        const _ = this.edges[2 * o + (c ? 1 : 0)];
        this.getVertex(_, h)
    }
    getEdgeVector(o, c) {
        const h = getEdgeVector_va
          , _ = getEdgeVector_vb;
        this.getEdgeVertex(o, 0, h),
        this.getEdgeVertex(o, 1, _),
        _.vsub(h, c)
    }
    static computeNormal(o, c, h, _) {
        c.vsub(o, ab$1),
        h.vsub(c, cannon_es_cb),
        cannon_es_cb.cross(ab$1, _),
        _.isZero() || _.normalize()
    }
    getVertex(o, c) {
        const h = this.scale;
        return this._getUnscaledVertex(o, c),
        c.x *= h.x,
        c.y *= h.y,
        c.z *= h.z,
        c
    }
    _getUnscaledVertex(o, c) {
        const h = 3 * o
          , _ = this.vertices;
        return c.set(_[h], _[h + 1], _[h + 2])
    }
    getWorldVertex(o, c, h, _) {
        return this.getVertex(o, _),
        cannon_es_Transform.pointToWorldFrame(c, h, _, _),
        _
    }
    getTriangleVertices(o, c, h, _) {
        const b = 3 * o;
        this.getVertex(this.indices[b], c),
        this.getVertex(this.indices[b + 1], h),
        this.getVertex(this.indices[b + 2], _)
    }
    getNormal(o, c) {
        const h = 3 * o;
        return c.set(this.normals[h], this.normals[h + 1], this.normals[h + 2])
    }
    calculateLocalInertia(o, c) {
        this.computeLocalAABB(cli_aabb);
        const h = cli_aabb.upperBound.x - cli_aabb.lowerBound.x
          , _ = cli_aabb.upperBound.y - cli_aabb.lowerBound.y
          , b = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
        return c.set(1 / 12 * o * (2 * _ * 2 * _ + 2 * b * 2 * b), 1 / 12 * o * (2 * h * 2 * h + 2 * b * 2 * b), 1 / 12 * o * (2 * _ * 2 * _ + 2 * h * 2 * h))
    }
    computeLocalAABB(o) {
        const c = o.lowerBound
          , h = o.upperBound
          , _ = this.vertices.length;
        this.vertices;
        const b = computeLocalAABB_worldVert;
        this.getVertex(0, b),
        c.copy(b),
        h.copy(b);
        for (let _e = 0; _e !== _; _e++)
            this.getVertex(_e, b),
            b.x < c.x ? c.x = b.x : b.x > h.x && (h.x = b.x),
            b.y < c.y ? c.y = b.y : b.y > h.y && (h.y = b.y),
            b.z < c.z ? c.z = b.z : b.z > h.z && (h.z = b.z)
    }
    updateAABB() {
        this.computeLocalAABB(this.aabb)
    }
    updateBoundingSphereRadius() {
        let o = 0;
        const c = this.vertices
          , h = new Vec3;
        for (let _ = 0, b = c.length / 3; _ !== b; _++) {
            this.getVertex(_, h);
            const _e = h.lengthSquared();
            _e > o && (o = _e)
        }
        this.boundingSphereRadius = Math.sqrt(o)
    }
    calculateWorldAABB(o, c, h, _) {
        const b = calculateWorldAABB_frame
          , _e = calculateWorldAABB_aabb;
        b.position = o,
        b.quaternion = c,
        this.aabb.toWorldFrame(b, _e),
        h.copy(_e.lowerBound),
        _.copy(_e.upperBound)
    }
    volume() {
        return 4 * Math.PI * this.boundingSphereRadius / 3
    }
    static createTorus(o, c, h, _, b) {
        o === void 0 && (o = 1),
        c === void 0 && (c = .5),
        h === void 0 && (h = 8),
        _ === void 0 && (_ = 6),
        b === void 0 && (b = 2 * Math.PI);
        const _e = []
          , nt = [];
        for (let it = 0; it <= h; it++)
            for (let at = 0; at <= _; at++) {
                const ut = at / _ * b
                  , pt = it / h * Math.PI * 2
                  , ht = (o + c * Math.cos(pt)) * Math.cos(ut)
                  , _t = (o + c * Math.cos(pt)) * Math.sin(ut)
                  , vt = c * Math.sin(pt);
                _e.push(ht, _t, vt)
            }
        for (let it = 1; it <= h; it++)
            for (let at = 1; at <= _; at++) {
                const ut = (_ + 1) * it + at - 1
                  , pt = (_ + 1) * (it - 1) + at - 1
                  , ht = (_ + 1) * (it - 1) + at
                  , _t = (_ + 1) * it + at;
                nt.push(ut, pt, _t),
                nt.push(pt, ht, _t)
            }
        return new Trimesh(_e,nt)
    }
}

export default Trimesh;
