/* Standalone Class: Graph */

class Graph extends EventDispatcher {
    constructor(...o) {
        super(...o),
        this._emptySet = new Set,
        this._edges = new Set,
        this._parentEdges = new Map,
        this._childEdges = new Map
    }
    listEdges() {
        return Array.from(this._edges)
    }
    listParentEdges(o) {
        return Array.from(this._childEdges.get(o) || this._emptySet)
    }
    listParents(o) {
        const c = new Set;
        for (const h of this.listParentEdges(o))
            c.add(h.getParent());
        return Array.from(c)
    }
    listChildEdges(o) {
        return Array.from(this._parentEdges.get(o) || this._emptySet)
    }
    listChildren(o) {
        const c = new Set;
        for (const h of this.listChildEdges(o))
            c.add(h.getChild());
        return Array.from(c)
    }
    disconnectParents(o, c) {
        for (const h of this.listParentEdges(o))
            c && !c(h.getParent()) || h.dispose();
        return this
    }
    _createEdge(o, c, h, _) {
        const b = new GraphEdge(o,c,h,_);
        this._edges.add(b);
        const _e = b.getParent();
        this._parentEdges.has(_e) || this._parentEdges.set(_e, new Set),
        this._parentEdges.get(_e).add(b);
        const nt = b.getChild();
        return this._childEdges.has(nt) || this._childEdges.set(nt, new Set),
        this._childEdges.get(nt).add(b),
        b
    }
    _destroyEdge(o) {
        return this._edges.delete(o),
        this._parentEdges.get(o.getParent()).delete(o),
        this._childEdges.get(o.getChild()).delete(o),
        this
    }
}

export default Graph;
