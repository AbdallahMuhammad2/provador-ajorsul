/* Standalone Class: IntersectionMap */

class IntersectionMap {
    constructor() {
        this.intersectionSet = {},
        this.ids = []
    }
    add(o, c) {
        const {intersectionSet: h, ids: _} = this;
        h[o] || (h[o] = [],
        _.push(o)),
        h[o].push(c)
    }
}

export default IntersectionMap;
