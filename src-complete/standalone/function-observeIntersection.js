/* Standalone Function: observeIntersection */

function observeIntersection(d, o, c) {
    const h = initIntersectionObserver(o);
    return observerCallbacks.set(d, c),
    h.observe(d),
    () => {
        observerCallbacks.delete(d),
        h.unobserve(d)
    }
}

export default observeIntersection;
