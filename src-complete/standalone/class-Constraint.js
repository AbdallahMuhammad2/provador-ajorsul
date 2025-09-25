/* Standalone Class: Constraint */

class Constraint {
    constructor(o, c, h) {
        h === void 0 && (h = {}),
        h = Utils.defaults(h, {
            collideConnected: !0,
            wakeUpBodies: !0
        }),
        this.equations = [],
        this.bodyA = o,
        this.bodyB = c,
        this.id = Constraint.idCounter++,
        this.collideConnected = h.collideConnected,
        h.wakeUpBodies && (o && o.wakeUp(),
        c && c.wakeUp())
    }
    update() {
        throw new Error("method update() not implmemented in this Constraint subclass!")
    }
    enable() {
        const o = this.equations;
        for (let c = 0; c < o.length; c++)
            o[c].enabled = !0
    }
    disable() {
        const o = this.equations;
        for (let c = 0; c < o.length; c++)
            o[c].enabled = !1
    }
}

export default Constraint;
