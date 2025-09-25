/* Standalone Function: wf */

function wf(d, o, c, h, _) {
    for (var b = o._reactName, _e = []; c !== null && c !== h; ) {
        var nt = c
          , it = nt.alternate
          , at = nt.stateNode;
        if (it !== null && it === h)
            break;
        nt.tag === 5 && at !== null && (nt = at,
        _ ? (it = Kb(c, b),
        it != null && _e.unshift(tf(c, it, nt))) : _ || (it = Kb(c, b),
        it != null && _e.push(tf(c, it, nt)))),
        c = c.return
    }
    _e.length !== 0 && d.push({
        event: o,
        listeners: _e
    })
}

export default wf;
