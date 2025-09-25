/* Standalone Class: SubscriptionManager */

class SubscriptionManager {
    constructor() {
        this.subscriptions = []
    }
    add(o) {
        return addUniqueItem(this.subscriptions, o),
        () => removeItem(this.subscriptions, o)
    }
    notify(o, c, h) {
        const _ = this.subscriptions.length;
        if (_)
            if (_ === 1)
                this.subscriptions[0](o, c, h);
            else
                for (let b = 0; b < _; b++) {
                    const _e = this.subscriptions[b];
                    _e && _e(o, c, h)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}

export default SubscriptionManager;
