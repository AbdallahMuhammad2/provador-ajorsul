/* Standalone Class: Queue */

class Queue {
    constructor() {
        this.order = [],
        this.scheduled = new Set
    }
    add(o) {
        if (!this.scheduled.has(o))
            return this.scheduled.add(o),
            this.order.push(o),
            !0
    }
    remove(o) {
        const c = this.order.indexOf(o);
        c !== -1 && (this.order.splice(c, 1),
        this.scheduled.delete(o))
    }
    clear() {
        this.order.length = 0,
        this.scheduled.clear()
    }
}

export default Queue;
