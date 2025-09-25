/* Standalone Class: EventTarget */

class EventTarget {
    addEventListener(o, c) {
        this._listeners === void 0 && (this._listeners = {});
        const h = this._listeners;
        return h[o] === void 0 && (h[o] = []),
        h[o].includes(c) || h[o].push(c),
        this
    }
    hasEventListener(o, c) {
        if (this._listeners === void 0)
            return !1;
        const h = this._listeners;
        return !(h[o] === void 0 || !h[o].includes(c))
    }
    hasAnyEventListener(o) {
        return this._listeners !== void 0 && this._listeners[o] !== void 0
    }
    removeEventListener(o, c) {
        if (this._listeners === void 0)
            return this;
        const h = this._listeners;
        if (h[o] === void 0)
            return this;
        const _ = h[o].indexOf(c);
        return _ !== -1 && h[o].splice(_, 1),
        this
    }
    dispatchEvent(o) {
        if (this._listeners === void 0)
            return this;
        const c = this._listeners[o.type];
        if (c !== void 0) {
            o.target = this;
            for (let h = 0, _ = c.length; h < _; h++)
                c[h].call(this, o)
        }
        return this
    }
}

export default EventTarget;
