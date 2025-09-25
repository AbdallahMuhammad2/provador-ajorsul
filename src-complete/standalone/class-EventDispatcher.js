/* Standalone Class: EventDispatcher */

class EventDispatcher {
    constructor() {
        this._listeners = {}
    }
    addEventListener(o, c) {
        const h = this._listeners;
        return h[o] === void 0 && (h[o] = []),
        h[o].indexOf(c) === -1 && h[o].push(c),
        this
    }
    removeEventListener(o, c) {
        const h = this._listeners[o];
        if (h !== void 0) {
            const _ = h.indexOf(c);
            _ !== -1 && h.splice(_, 1)
        }
        return this
    }
    dispatchEvent(o) {
        const c = this._listeners[o.type];
        if (c !== void 0) {
            const h = c.slice(0);
            for (let _ = 0, b = h.length; _ < b; _++)
                h[_].call(this, o)
        }
        return this
    }
    dispose() {
        for (const o in this._listeners)
            delete this._listeners[o]
    }
}

export default EventDispatcher;
