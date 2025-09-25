/* Standalone Class: TupleDictionary */

class TupleDictionary {
    constructor() {
        this.data = {
            keys: []
        }
    }
    get(o, c) {
        const h = getKey(o, c);
        return this.data[h]
    }
    set(o, c, h) {
        const _ = getKey(o, c);
        this.get(o, c) || this.data.keys.push(_),
        this.data[_] = h
    }
    delete(o, c) {
        const h = getKey(o, c)
          , _ = this.data.keys.indexOf(h);
        _ !== -1 && this.data.keys.splice(_, 1),
        delete this.data[h]
    }
    reset() {
        const o = this.data
          , c = o.keys;
        for (; c.length > 0; )
            delete o[c.pop()]
    }
}

export default TupleDictionary;
