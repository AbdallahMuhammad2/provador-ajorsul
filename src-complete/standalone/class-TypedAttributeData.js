/* Standalone Class: TypedAttributeData */

class TypedAttributeData {
    constructor() {
        this.groupAttributes = [{}],
        this.groupCount = 0
    }
    getType(o) {
        return this.groupAttributes[0][o].type
    }
    getItemSize(o) {
        return this.groupAttributes[0][o].itemSize
    }
    getNormalized(o) {
        return this.groupAttributes[0][o].normalized
    }
    getCount(o) {
        if (this.groupCount <= o)
            return 0;
        const c = this.getGroupAttrArray("position", o);
        return c.length / c.itemSize
    }
    getTotalLength(o) {
        const {groupCount: c, groupAttributes: h} = this;
        let _ = 0;
        for (let b = 0; b < c; b++)
            _ += h[b][o].length;
        return _
    }
    getGroupAttrSet(o=0) {
        const {groupAttributes: c} = this;
        if (c[o])
            return this.groupCount = Math.max(this.groupCount, o + 1),
            c[o];
        const h = c[0];
        for (this.groupCount = Math.max(this.groupCount, o + 1); o >= c.length; ) {
            const _ = {};
            c.push(_);
            for (const b in h) {
                const _e = h[b]
                  , nt = new TypeBackedArray(_e.type);
                nt.itemSize = _e.itemSize,
                nt.normalized = _e.normalized,
                _[b] = nt
            }
        }
        return c[o]
    }
    getGroupAttrArray(o, c=0) {
        const {groupAttributes: h} = this;
        if (!h[0][o])
            throw new Error(`TypedAttributeData: Attribute with "${o}" has not been initialized`);
        return this.getGroupAttrSet(c)[o]
    }
    initializeArray(o, c, h, _) {
        const {groupAttributes: b} = this
          , _e = b[0][o];
        if (_e) {
            if (_e.type !== c)
                for (let nt = 0, it = b.length; nt < it; nt++) {
                    const at = b[nt][o];
                    at.setType(c),
                    at.itemSize = h,
                    at.normalized = _
                }
        } else
            for (let nt = 0, it = b.length; nt < it; nt++) {
                const at = new TypeBackedArray(c);
                at.itemSize = h,
                at.normalized = _,
                b[nt][o] = at
            }
    }
    clear() {
        this.groupCount = 0;
        const {groupAttributes: o} = this;
        o.forEach(c => {
            for (const h in c)
                c[h].clear()
        }
        )
    }
    delete(o) {
        this.groupAttributes.forEach(c => {
            delete c[o]
        }
        )
    }
    reset() {
        this.groupAttributes = [],
        this.groupCount = 0
    }
}

export default TypedAttributeData;
