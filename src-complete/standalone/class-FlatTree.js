/* Standalone Class: FlatTree */

class FlatTree {
    constructor() {
        this.children = [],
        this.isDirty = !1
    }
    add(o) {
        addUniqueItem(this.children, o),
        this.isDirty = !0
    }
    remove(o) {
        removeItem(this.children, o),
        this.isDirty = !0
    }
    forEach(o) {
        this.isDirty && this.children.sort(compareByDepth),
        this.isDirty = !1,
        this.children.forEach(o)
    }
}

export default FlatTree;
