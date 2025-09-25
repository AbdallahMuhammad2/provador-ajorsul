/* Standalone Class: RefList */

class RefList {
    constructor(o) {
        if (this.list = [],
        o)
            for (const c of o)
                this.list.push(c)
    }
    add(o) {
        this.list.push(o)
    }
    remove(o) {
        const c = this.list.indexOf(o);
        c >= 0 && this.list.splice(c, 1)
    }
    removeChild(o) {
        const c = [];
        for (const h of this.list)
            h.getChild() === o && c.push(h);
        for (const h of c)
            this.remove(h);
        return c
    }
    listRefsByChild(o) {
        const c = [];
        for (const h of this.list)
            h.getChild() === o && c.push(h);
        return c
    }
    values() {
        return this.list
    }
}

export default RefList;
