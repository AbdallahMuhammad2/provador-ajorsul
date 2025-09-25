/* Standalone Class: index_modern_Node */

class index_modern_Node extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.NODE
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            weights: [],
            camera: null,
            mesh: null,
            skin: null,
            children: new RefSet
        })
    }
    copy(o, c=COPY_IDENTITY) {
        if (c === COPY_IDENTITY)
            throw new Error("Node cannot be copied.");
        return super.copy(o, c)
    }
    getTranslation() {
        return this.get("translation")
    }
    getRotation() {
        return this.get("rotation")
    }
    getScale() {
        return this.get("scale")
    }
    setTranslation(o) {
        return this.set("translation", o)
    }
    setRotation(o) {
        return this.set("rotation", o)
    }
    setScale(o) {
        return this.set("scale", o)
    }
    getMatrix() {
        return index_modern_MathUtils.compose(this.get("translation"), this.get("rotation"), this.get("scale"), [])
    }
    setMatrix(o) {
        const c = this.get("translation").slice()
          , h = this.get("rotation").slice()
          , _ = this.get("scale").slice();
        return index_modern_MathUtils.decompose(o, c, h, _),
        this.set("translation", c).set("rotation", h).set("scale", _)
    }
    getWorldTranslation() {
        const o = [0, 0, 0];
        return index_modern_MathUtils.decompose(this.getWorldMatrix(), o, [0, 0, 0, 1], [1, 1, 1]),
        o
    }
    getWorldRotation() {
        const o = [0, 0, 0, 1];
        return index_modern_MathUtils.decompose(this.getWorldMatrix(), [0, 0, 0], o, [1, 1, 1]),
        o
    }
    getWorldScale() {
        const o = [1, 1, 1];
        return index_modern_MathUtils.decompose(this.getWorldMatrix(), [0, 0, 0], [0, 0, 0, 1], o),
        o
    }
    getWorldMatrix() {
        const o = [];
        for (let _ = this; _ != null; _ = _.getParentNode())
            o.push(_);
        let c;
        const h = o.pop().getMatrix();
        for (; c = o.pop(); )
            multiply(h, h, c.getMatrix());
        return h
    }
    addChild(o) {
        const c = o.getParentNode();
        c && c.removeChild(o);
        for (const h of o.listParents())
            h.propertyType === index_modern_PropertyType.SCENE && h.removeChild(o);
        return this.addRef("children", o)
    }
    removeChild(o) {
        return this.removeRef("children", o)
    }
    listChildren() {
        return this.listRefs("children")
    }
    getParentNode() {
        for (const o of this.listParents())
            if (o.propertyType === index_modern_PropertyType.NODE)
                return o;
        return null
    }
    getMesh() {
        return this.getRef("mesh")
    }
    setMesh(o) {
        return this.setRef("mesh", o)
    }
    getCamera() {
        return this.getRef("camera")
    }
    setCamera(o) {
        return this.setRef("camera", o)
    }
    getSkin() {
        return this.getRef("skin")
    }
    setSkin(o) {
        return this.setRef("skin", o)
    }
    getWeights() {
        return this.get("weights")
    }
    setWeights(o) {
        return this.set("weights", o)
    }
    traverse(o) {
        o(this);
        for (const c of this.listChildren())
            c.traverse(o);
        return this
    }
}

export default index_modern_Node;
