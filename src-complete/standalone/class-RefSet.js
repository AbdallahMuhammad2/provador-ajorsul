/* Standalone Class: RefSet */

class RefSet {
    constructor(o) {
        if (this.set = new Set,
        this.map = new Map,
        o)
            for (const c of o)
                this.add(c)
    }
    add(o) {
        const c = o.getChild();
        this.removeChild(c),
        this.set.add(o),
        this.map.set(c, o)
    }
    remove(o) {
        this.set.delete(o),
        this.map.delete(o.getChild())
    }
    removeChild(o) {
        const c = this.map.get(o) || null;
        return c && this.remove(c),
        c
    }
    getRefByChild(o) {
        return this.map.get(o) || null
    }
    values() {
        return Array.from(this.set)
    }
}

export default RefSet;
