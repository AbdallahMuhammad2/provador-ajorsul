/* Standalone Class: OperationDebugData */

class OperationDebugData {
    constructor() {
        this.enabled = !1,
        this.triangleIntersectsA = new TriangleIntersectionSets,
        this.triangleIntersectsB = new TriangleIntersectionSets,
        this.intersectionEdges = []
    }
    addIntersectingTriangles(o, c, h, _) {
        const {triangleIntersectsA: b, triangleIntersectsB: _e} = this;
        b.addTriangleIntersection(o, c, h, _),
        _e.addTriangleIntersection(h, _, o, c)
    }
    addEdge(o) {
        this.intersectionEdges.push(o.clone())
    }
    reset() {
        this.triangleIntersectsA.reset(),
        this.triangleIntersectsB.reset(),
        this.intersectionEdges = []
    }
    init() {
        this.enabled && (this.reset(),
        setDebugContext(this))
    }
    complete() {
        this.enabled && setDebugContext(null)
    }
}

export default OperationDebugData;
