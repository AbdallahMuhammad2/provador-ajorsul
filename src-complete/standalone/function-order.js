/* Standalone Function: order */

function order(d) {
    var o = new Map
      , c = new Set
      , h = [];
    function _(b) {
        c.add(b.name),
        [].concat(b.requires || [], b.requiresIfExists || []).forEach(function(_e) {
            if (!c.has(_e)) {
                var nt = o.get(_e);
                nt && _(nt)
            }
        }),
        h.push(b)
    }
    return d.forEach(function(b) {
        o.set(b.name, b)
    }),
    d.forEach(function(b) {
        c.has(b.name) || _(b)
    }),
    h
}

export default order;
