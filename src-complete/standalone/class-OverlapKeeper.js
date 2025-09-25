/* Standalone Class: OverlapKeeper */

class OverlapKeeper {
    constructor() {
        this.current = [],
        this.previous = []
    }
    getKey(o, c) {
        if (c < o) {
            const h = c;
            c = o,
            o = h
        }
        return o << 16 | c
    }
    set(o, c) {
        const h = this.getKey(o, c)
          , _ = this.current;
        let b = 0;
        for (; h > _[b]; )
            b++;
        if (h !== _[b]) {
            for (let _e = _.length - 1; _e >= b; _e--)
                _[_e + 1] = _[_e];
            _[b] = h
        }
    }
    tick() {
        const o = this.current;
        this.current = this.previous,
        this.previous = o,
        this.current.length = 0
    }
    getDiff(o, c) {
        const h = this.current
          , _ = this.previous
          , b = h.length
          , _e = _.length;
        let nt = 0;
        for (let it = 0; it < b; it++) {
            let at = !1;
            const ut = h[it];
            for (; ut > _[nt]; )
                nt++;
            at = ut === _[nt],
            at || unpackAndPush(o, ut)
        }
        nt = 0;
        for (let it = 0; it < _e; it++) {
            let at = !1;
            const ut = _[it];
            for (; ut > h[nt]; )
                nt++;
            at = h[nt] === ut,
            at || unpackAndPush(c, ut)
        }
    }
}

export default OverlapKeeper;
