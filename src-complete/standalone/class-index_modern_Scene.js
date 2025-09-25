/* Standalone Class: index_modern_Scene */

class index_modern_Scene extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.SCENE
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            children: new RefSet
        })
    }
    copy(o, c=COPY_IDENTITY) {
        if (c === COPY_IDENTITY)
            throw new Error("Scene cannot be copied.");
        return super.copy(o, c)
    }
    addChild(o) {
        const c = o.getParentNode();
        return c && c.removeChild(o),
        this.addRef("children", o)
    }
    removeChild(o) {
        return this.removeRef("children", o)
    }
    listChildren() {
        return this.listRefs("children")
    }
    traverse(o) {
        for (const c of this.listChildren())
            c.traverse(o);
        return this
    }
}

export default index_modern_Scene;
