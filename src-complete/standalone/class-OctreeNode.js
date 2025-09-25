/* Standalone Class: OctreeNode */

class OctreeNode {
    constructor(o) {
        o === void 0 && (o = {}),
        this.root = o.root || null,
        this.aabb = o.aabb ? o.aabb.clone() : new AABB,
        this.data = [],
        this.children = []
    }
    reset() {
        this.children.length = this.data.length = 0
    }
    insert(o, c, h) {
        h === void 0 && (h = 0);
        const _ = this.data;
        if (!this.aabb.contains(o))
            return !1;
        const b = this.children;
        if (h < (this.maxDepth || this.root.maxDepth)) {
            let _e = !1;
            b.length || (this.subdivide(),
            _e = !0);
            for (let nt = 0; nt !== 8; nt++)
                if (b[nt].insert(o, c, h + 1))
                    return !0;
            _e && (b.length = 0)
        }
        return _.push(c),
        !0
    }
    subdivide() {
        const o = this.aabb
          , c = o.lowerBound
          , h = o.upperBound
          , _ = this.children;
        _.push(new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,0,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,0,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,1,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,1,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,1,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,0,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,0,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,1,0)
            })
        })),
        h.vsub(c, halfDiagonal),
        halfDiagonal.scale(.5, halfDiagonal);
        const b = this.root || this;
        for (let _e = 0; _e !== 8; _e++) {
            const nt = _[_e];
            nt.root = b;
            const it = nt.aabb.lowerBound;
            it.x *= halfDiagonal.x,
            it.y *= halfDiagonal.y,
            it.z *= halfDiagonal.z,
            it.vadd(c, it),
            it.vadd(halfDiagonal, nt.aabb.upperBound)
        }
    }
    aabbQuery(o, c) {
        this.data,
        this.children;
        const h = [this];
        for (; h.length; ) {
            const _ = h.pop();
            _.aabb.overlaps(o) && Array.prototype.push.apply(c, _.data),
            Array.prototype.push.apply(h, _.children)
        }
        return c
    }
    rayQuery(o, c, h) {
        return o.getAABB(tmpAABB),
        tmpAABB.toLocalFrame(c, tmpAABB),
        this.aabbQuery(tmpAABB, h),
        h
    }
    removeEmptyNodes() {
        for (let o = this.children.length - 1; o >= 0; o--)
            this.children[o].removeEmptyNodes(),
            this.children[o].children.length || this.children[o].data.length || this.children.splice(o, 1)
    }
}

export default OctreeNode;
