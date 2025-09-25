/* Standalone Function: qh */

function qh(d, o, c, h) {
    var _ = d.updateQueue;
    jh = !1;
    var b = _.firstBaseUpdate
      , _e = _.lastBaseUpdate
      , nt = _.shared.pending;
    if (nt !== null) {
        _.shared.pending = null;
        var it = nt
          , at = it.next;
        it.next = null,
        _e === null ? b = at : _e.next = at,
        _e = it;
        var ut = d.alternate;
        ut !== null && (ut = ut.updateQueue,
        nt = ut.lastBaseUpdate,
        nt !== _e && (nt === null ? ut.firstBaseUpdate = at : nt.next = at,
        ut.lastBaseUpdate = it))
    }
    if (b !== null) {
        var pt = _.baseState;
        _e = 0,
        ut = at = it = null,
        nt = b;
        do {
            var ht = nt.lane
              , _t = nt.eventTime;
            if ((h & ht) === ht) {
                ut !== null && (ut = ut.next = {
                    eventTime: _t,
                    lane: 0,
                    tag: nt.tag,
                    payload: nt.payload,
                    callback: nt.callback,
                    next: null
                });
                e: {
                    var vt = d
                      , bt = nt;
                    switch (ht = o,
                    _t = c,
                    bt.tag) {
                    case 1:
                        if (vt = bt.payload,
                        typeof vt == "function") {
                            pt = vt.call(_t, pt, ht);
                            break e
                        }
                        pt = vt;
                        break e;
                    case 3:
                        vt.flags = vt.flags & -65537 | 128;
                    case 0:
                        if (vt = bt.payload,
                        ht = typeof vt == "function" ? vt.call(_t, pt, ht) : vt,
                        ht == null)
                            break e;
                        pt = A({}, pt, ht);
                        break e;
                    case 2:
                        jh = !0
                    }
                }
                nt.callback !== null && nt.lane !== 0 && (d.flags |= 64,
                ht = _.effects,
                ht === null ? _.effects = [nt] : ht.push(nt))
            } else
                _t = {
                    eventTime: _t,
                    lane: ht,
                    tag: nt.tag,
                    payload: nt.payload,
                    callback: nt.callback,
                    next: null
                },
                ut === null ? (at = ut = _t,
                it = pt) : ut = ut.next = _t,
                _e |= ht;
            if (nt = nt.next,
            nt === null) {
                if (nt = _.shared.pending,
                nt === null)
                    break;
                ht = nt,
                nt = ht.next,
                ht.next = null,
                _.lastBaseUpdate = ht,
                _.shared.pending = null
            }
        } while (!0);
        if (ut === null && (it = pt),
        _.baseState = it,
        _.firstBaseUpdate = at,
        _.lastBaseUpdate = ut,
        o = _.shared.interleaved,
        o !== null) {
            _ = o;
            do
                _e |= _.lane,
                _ = _.next;
            while (_ !== o)
        } else
            b === null && (_.shared.lanes = 0);
        rh |= _e,
        d.lanes = _e,
        d.memoizedState = pt
    }
}

export default qh;
