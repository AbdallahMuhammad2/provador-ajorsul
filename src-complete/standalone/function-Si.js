/* Standalone Function: Si */

function Si(d, o, c) {
    var h = d.pingCache;
    if (h === null) {
        h = d.pingCache = new Mi;
        var _ = new Set;
        h.set(o, _)
    } else
        _ = h.get(o),
        _ === void 0 && (_ = new Set,
        h.set(o, _));
    _.has(c) || (_.add(c),
    d = Ti.bind(null, d, o, c),
    o.then(d, d))
}

export default Si;
