/* Standalone Class: GraphNode */

class GraphNode extends EventDispatcher {
    constructor(o) {
        super(),
        this._disposed = !1,
        this.graph = void 0,
        this[$attributes] = void 0,
        this[$immutableKeys] = void 0,
        this.graph = o,
        this[$immutableKeys] = new Set,
        this[$attributes] = this._createAttributes()
    }
    getDefaults() {
        return {}
    }
    _createAttributes() {
        const o = this.getDefaults()
          , c = {};
        for (const h in o) {
            const _ = o[h];
            if (_ instanceof GraphNode) {
                const b = this.graph._createEdge(h, this, _);
                this[$immutableKeys].add(h),
                c[h] = b
            } else
                c[h] = _
        }
        return c
    }
    isOnGraph(o) {
        return this.graph === o.graph
    }
    isDisposed() {
        return this._disposed
    }
    dispose() {
        this._disposed || (this.graph.listChildEdges(this).forEach(o => o.dispose()),
        this.graph.disconnectParents(this),
        this._disposed = !0,
        this.dispatchEvent({
            type: "dispose"
        }))
    }
    detach() {
        return this.graph.disconnectParents(this),
        this
    }
    swap(o, c) {
        for (const h in this[$attributes]) {
            const _ = this[$attributes][h];
            if (_ instanceof GraphEdge) {
                const b = _;
                b.getChild() === o && this.setRef(h, c, b.getAttributes())
            } else if (_ instanceof RefList)
                for (const b of _.listRefsByChild(o)) {
                    const _e = b.getAttributes();
                    this.removeRef(h, o),
                    this.addRef(h, c, _e)
                }
            else if (_ instanceof RefSet) {
                const b = _.getRefByChild(o);
                if (b) {
                    const _e = b.getAttributes();
                    this.removeRef(h, o),
                    this.addRef(h, c, _e)
                }
            } else if (_ instanceof RefMap)
                for (const b of _.keys()) {
                    const _e = _.get(b);
                    _e.getChild() === o && this.setRefMap(h, b, c, _e.getAttributes())
                }
        }
        return this
    }
    get(o) {
        return this[$attributes][o]
    }
    set(o, c) {
        return this[$attributes][o] = c,
        this.dispatchEvent({
            type: "change",
            attribute: o
        })
    }
    getRef(o) {
        const c = this[$attributes][o];
        return c ? c.getChild() : null
    }
    setRef(o, c, h) {
        if (this[$immutableKeys].has(o))
            throw new Error(`Cannot overwrite immutable attribute, "${o}".`);
        const _ = this[$attributes][o];
        if (_ && _.dispose(),
        !c)
            return this;
        const b = this.graph._createEdge(o, this, c, h);
        return this[$attributes][o] = b,
        this.dispatchEvent({
            type: "change",
            attribute: o
        })
    }
    listRefs(o) {
        return this.assertRefList(o).values().map(c => c.getChild())
    }
    addRef(o, c, h) {
        const _ = this.graph._createEdge(o, this, c, h);
        return this.assertRefList(o).add(_),
        this.dispatchEvent({
            type: "change",
            attribute: o
        })
    }
    removeRef(o, c) {
        const h = this.assertRefList(o);
        if (h instanceof RefList)
            for (const _ of h.listRefsByChild(c))
                _.dispose();
        else {
            const _ = h.getRefByChild(c);
            _ && _.dispose()
        }
        return this
    }
    assertRefList(o) {
        const c = this[$attributes][o];
        if (c instanceof RefList || c instanceof RefSet)
            return c;
        throw new Error(`Expected RefList or RefSet for attribute "${o}"`)
    }
    listRefMapKeys(o) {
        return this.assertRefMap(o).keys()
    }
    listRefMapValues(o) {
        return this.assertRefMap(o).values().map(c => c.getChild())
    }
    getRefMap(o, c) {
        const h = this.assertRefMap(o).get(c);
        return h ? h.getChild() : null
    }
    setRefMap(o, c, h, _) {
        const b = this.assertRefMap(o)
          , _e = b.get(c);
        if (_e && _e.dispose(),
        !h)
            return this;
        _ = Object.assign(_ || {}, {
            key: c
        });
        const nt = this.graph._createEdge(o, this, h, _extends({}, _, {
            key: c
        }));
        return b.set(c, nt),
        this.dispatchEvent({
            type: "change",
            attribute: o,
            key: c
        })
    }
    assertRefMap(o) {
        const c = this[$attributes][o];
        if (c instanceof RefMap)
            return c;
        throw new Error(`Expected RefMap for attribute "${o}"`)
    }
    dispatchEvent(o) {
        return super.dispatchEvent(_extends({}, o, {
            target: this
        })),
        this.graph.dispatchEvent(_extends({}, o, {
            target: this,
            type: `node:${o.type}`
        })),
        this
    }
    _destroyRef(o) {
        const c = o.getName();
        if (this[$attributes][c] === o)
            this[$attributes][c] = null,
            this[$immutableKeys].has(c) && o.getChild().dispose();
        else if (this[$attributes][c]instanceof RefList)
            this[$attributes][c].remove(o);
        else if (this[$attributes][c]instanceof RefSet)
            this[$attributes][c].remove(o);
        else {
            if (!(this[$attributes][c]instanceof RefMap))
                return;
            {
                const h = this[$attributes][c];
                for (const _ of h.keys())
                    h.get(_) === o && h.delete(_)
            }
        }
        this.graph._destroyEdge(o),
        this.dispatchEvent({
            type: "change",
            attribute: c
        })
    }
}

export default GraphNode;
