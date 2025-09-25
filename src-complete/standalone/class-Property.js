/* Standalone Class: Property */

class Property extends GraphNode {
    constructor(o, c="") {
        super(o),
        this[$attributes].name = c,
        this.init(),
        this.dispatchEvent({
            type: "create"
        })
    }
    getGraph() {
        return this.graph
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            name: "",
            extras: {}
        })
    }
    set(o, c) {
        return Array.isArray(c) && (c = c.slice()),
        super.set(o, c)
    }
    getName() {
        return this.get("name")
    }
    setName(o) {
        return this.set("name", o)
    }
    getExtras() {
        return this.get("extras")
    }
    setExtras(o) {
        return this.set("extras", o)
    }
    clone() {
        return new this.constructor(this.graph).copy(this, COPY_IDENTITY)
    }
    copy(o, c=COPY_IDENTITY) {
        for (const h in this[$attributes]) {
            const _ = this[$attributes][h];
            if (_ instanceof GraphEdge)
                this[$immutableKeys].has(h) || _.dispose();
            else if (_ instanceof RefList || _ instanceof RefSet)
                for (const b of _.values())
                    b.dispose();
            else if (_ instanceof RefMap)
                for (const b of _.values())
                    b.dispose()
        }
        for (const h in o[$attributes]) {
            const _ = this[$attributes][h]
              , b = o[$attributes][h];
            if (b instanceof GraphEdge)
                this[$immutableKeys].has(h) ? _.getChild().copy(c(b.getChild()), c) : this.setRef(h, c(b.getChild()), b.getAttributes());
            else if (b instanceof RefSet || b instanceof RefList)
                for (const _e of b.values())
                    this.addRef(h, c(_e.getChild()), _e.getAttributes());
            else if (b instanceof RefMap)
                for (const _e of b.keys()) {
                    const nt = b.get(_e);
                    this.setRefMap(h, _e, c(nt.getChild()), nt.getAttributes())
                }
            else
                isPlainObject(b) ? this[$attributes][h] = JSON.parse(JSON.stringify(b)) : Array.isArray(b) || b instanceof ArrayBuffer || ArrayBuffer.isView(b) ? this[$attributes][h] = b.slice() : this[$attributes][h] = b
        }
        return this
    }
    equals(o, c=EMPTY_SET) {
        if (this === o)
            return !0;
        if (this.propertyType !== o.propertyType)
            return !1;
        for (const h in this[$attributes]) {
            if (c.has(h))
                continue;
            const _ = this[$attributes][h]
              , b = o[$attributes][h];
            if (_ instanceof GraphEdge || b instanceof GraphEdge) {
                if (!equalsRef(_, b))
                    return !1
            } else if (_ instanceof RefSet || b instanceof RefSet || _ instanceof RefList || b instanceof RefList) {
                if (!equalsRefSet(_, b))
                    return !1
            } else if (_ instanceof RefMap || b instanceof RefMap) {
                if (!equalsRefMap(_, b))
                    return !1
            } else if (isPlainObject(_) || isPlainObject(b)) {
                if (!equalsObject(_, b))
                    return !1
            } else if (isArray(_) || isArray(b)) {
                if (!equalsArray(_, b))
                    return !1
            } else if (_ !== b)
                return !1
        }
        return !0
    }
    detach() {
        return this.graph.disconnectParents(this, o => o.propertyType !== "Root"),
        this
    }
    listParents() {
        return this.graph.listParents(this)
    }
}

export default Property;
