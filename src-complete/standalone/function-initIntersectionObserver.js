/* Standalone Function: initIntersectionObserver */

function initIntersectionObserver({root: d, ...o}) {
    const c = d || document;
    observers.has(c) || observers.set(c, {});
    const h = observers.get(c)
      , _ = JSON.stringify(o);
    return h[_] || (h[_] = new IntersectionObserver(fireAllObserverCallbacks,{
        root: d,
        ...o
    })),
    h[_]
}

export default initIntersectionObserver;
