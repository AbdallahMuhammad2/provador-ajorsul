/* Standalone Class: GraphEdge */

class GraphEdge {
    constructor(o, c, h, _={}) {
        if (this._name = void 0,
        this._parent = void 0,
        this._child = void 0,
        this._attributes = void 0,
        this._disposed = !1,
        this._name = o,
        this._parent = c,
        this._child = h,
        this._attributes = _,
        !c.isOnGraph(h))
            throw new Error("Cannot connect disconnected graphs.")
    }
    getName() {
        return this._name
    }
    getParent() {
        return this._parent
    }
    getChild() {
        return this._child
    }
    setChild(o) {
        return this._child = o,
        this
    }
    getAttributes() {
        return this._attributes
    }
    dispose() {
        this._disposed || (this._parent._destroyRef(this),
        this._disposed = !0)
    }
    isDisposed() {
        return this._disposed
    }
}

export default GraphEdge;
