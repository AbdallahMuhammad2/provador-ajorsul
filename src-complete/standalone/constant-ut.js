/* Standalone Constant: ut */

let ut = {
        keyframes: Array.isArray(c) ? c : [null, c],
        ease: "easeOut",
        velocity: o.getVelocity(),
        ...nt,
        delay: -at,
        onUpdate: ht => {
            o.set(ht),
            nt.onUpdate && nt.onUpdate(ht)
        }
        ,
        onComplete: () => {
            _e(),
            nt.onComplete && nt.onComplete()
        }
        ,
        name: d,
        motionValue: o,
        element: b ? void 0 : _
    };

export default ut;
