/* Standalone Function: createMotionProxy */

function createMotionProxy(d) {
    function o(h, _={}) {
        return createMotionComponent(d(h, _))
    }
    if (typeof Proxy > "u")
        return o;
    const c = new Map;
    return new Proxy(o,{
        get: (h, _) => (c.has(_) || c.set(_, o(_)),
        c.get(_))
    })
}

export default createMotionProxy;
