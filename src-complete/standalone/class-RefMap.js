/* Standalone Class: RefMap */

class RefMap {
    constructor(o) {
        this.map = {},
        o && Object.assign(this.map, o)
    }
    set(o, c) {
        this.map[o] = c
    }
    delete(o) {
        delete this.map[o]
    }
    get(o) {
        return this.map[o] || null
    }
    keys() {
        return Object.keys(this.map)
    }
    values() {
        return Object.values(this.map)
    }
}

export default RefMap;
