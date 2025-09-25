/* Standalone Function: oe */

function oe(d, o) {
    for (var c = o + "Capture", h = []; d !== null; ) {
        var _ = d
          , b = _.stateNode;
        _.tag === 5 && b !== null && (_ = b,
        b = Kb(d, c),
        b != null && h.unshift(tf(d, b, _)),
        b = Kb(d, o),
        b != null && h.push(tf(d, b, _))),
        d = d.return
    }
    return h
}

export default oe;
