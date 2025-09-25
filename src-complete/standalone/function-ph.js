/* Standalone Function: ph */

function ph(d, o) {
    var c = d.updateQueue
      , h = d.alternate;
    if (h !== null && (h = h.updateQueue,
    c === h)) {
        var _ = null
          , b = null;
        if (c = c.firstBaseUpdate,
        c !== null) {
            do {
                var _e = {
                    eventTime: c.eventTime,
                    lane: c.lane,
                    tag: c.tag,
                    payload: c.payload,
                    callback: c.callback,
                    next: null
                };
                b === null ? _ = b = _e : b = b.next = _e,
                c = c.next
            } while (c !== null);
            b === null ? _ = b = o : b = b.next = o
        } else
            _ = b = o;
        c = {
            baseState: h.baseState,
            firstBaseUpdate: _,
            lastBaseUpdate: b,
            shared: h.shared,
            effects: h.effects
        },
        d.updateQueue = c;
        return
    }
    d = c.lastBaseUpdate,
    d === null ? c.firstBaseUpdate = o : d.next = o,
    c.lastBaseUpdate = o
}

export default ph;
