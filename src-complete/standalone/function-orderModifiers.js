/* Standalone Function: orderModifiers */

function orderModifiers(d) {
    var o = order(d);
    return modifierPhases.reduce(function(c, h) {
        return c.concat(o.filter(function(_) {
            return _.phase === h
        }))
    }, [])
}

export default orderModifiers;
