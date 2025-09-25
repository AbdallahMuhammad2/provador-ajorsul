/* Standalone Function: updateTransientState */

function updateTransientState(d, o, c, h) {
    return !o.trackTouch || !d.el ? (d.cleanUpTouch && d.cleanUpTouch(),
    Object.assign(Object.assign({}, d), {
        cleanUpTouch: void 0
    })) : d.cleanUpTouch ? o.preventScrollOnSwipe !== c.preventScrollOnSwipe || o.touchEventOptions.passive !== c.touchEventOptions.passive ? (d.cleanUpTouch(),
    Object.assign(Object.assign({}, d), {
        cleanUpTouch: h(d.el, o)
    })) : d : Object.assign(Object.assign({}, d), {
        cleanUpTouch: h(d.el, o)
    })
}

export default updateTransientState;
