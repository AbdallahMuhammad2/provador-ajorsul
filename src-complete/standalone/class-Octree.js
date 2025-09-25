/* Standalone Class: Octree */

class Octree extends OctreeNode {
    constructor(o, c) {
        c === void 0 && (c = {}),
        super({
            root: null,
            aabb: o
        }),
        this.maxDepth = c.maxDepth !== void 0 ? c.maxDepth : 8
    }
}

export default Octree;
