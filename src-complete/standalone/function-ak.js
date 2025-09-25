/* Standalone Function: ak */

function ak(d) {
    var o = d.updateQueue;
    if (o !== null) {
        d.updateQueue = null;
        var c = d.stateNode;
        c === null && (c = d.stateNode = new Kj),
        o.forEach(function(h) {
            var _ = bk.bind(null, d, h);
            c.has(h) || (c.add(h),
            h.then(_, _))
        })
    }
}

export default ak;
