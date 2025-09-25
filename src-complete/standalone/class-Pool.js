/* Standalone Class: Pool */

class Pool {
    constructor() {
        this.objects = [],
        this.type = Object
    }
    release() {
        const o = arguments.length;
        for (let c = 0; c !== o; c++)
            this.objects.push(c < 0 || arguments.length <= c ? void 0 : arguments[c]);
        return this
    }
    get() {
        return this.objects.length === 0 ? this.constructObject() : this.objects.pop()
    }
    constructObject() {
        throw new Error("constructObject() not implemented in this Pool subclass yet!")
    }
    resize(o) {
        const c = this.objects;
        for (; c.length > o; )
            c.pop();
        for (; c.length < o; )
            c.push(this.constructObject());
        return this
    }
}

export default Pool;
