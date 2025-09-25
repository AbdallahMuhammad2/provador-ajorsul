/* Standalone Class: VertexList */

class VertexList {
    constructor() {
        this.head = null,
        this.tail = null
    }
    first() {
        return this.head
    }
    last() {
        return this.tail
    }
    clear() {
        return this.head = this.tail = null,
        this
    }
    insertBefore(o, c) {
        return c.prev = o.prev,
        c.next = o,
        c.prev === null ? this.head = c : c.prev.next = c,
        o.prev = c,
        this
    }
    insertAfter(o, c) {
        return c.prev = o,
        c.next = o.next,
        c.next === null ? this.tail = c : c.next.prev = c,
        o.next = c,
        this
    }
    append(o) {
        return this.head === null ? this.head = o : this.tail.next = o,
        o.prev = this.tail,
        o.next = null,
        this.tail = o,
        this
    }
    appendChain(o) {
        for (this.head === null ? this.head = o : this.tail.next = o,
        o.prev = this.tail; o.next !== null; )
            o = o.next;
        return this.tail = o,
        this
    }
    remove(o) {
        return o.prev === null ? this.head = o.next : o.prev.next = o.next,
        o.next === null ? this.tail = o.prev : o.next.prev = o.prev,
        this
    }
    removeSubList(o, c) {
        return o.prev === null ? this.head = c.next : o.prev.next = c.next,
        c.next === null ? this.tail = o.prev : c.next.prev = o.prev,
        this
    }
    isEmpty() {
        return this.head === null
    }
}

export default VertexList;
