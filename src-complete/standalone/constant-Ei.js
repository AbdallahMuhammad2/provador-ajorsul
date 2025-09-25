/* Standalone Constant: Ei */

var Ei = {
    isMounted: function(d) {
        return (d = d._reactInternals) ? Vb(d) === d : !1
    },
    enqueueSetState: function(d, o, c) {
        d = d._reactInternals;
        var h = R()
          , _ = yi(d)
          , b = mh(h, _);
        b.payload = o,
        c != null && (b.callback = c),
        o = nh(d, b, _),
        o !== null && (gi(o, d, _, h),
        oh(o, d, _))
    },
    enqueueReplaceState: function(d, o, c) {
        d = d._reactInternals;
        var h = R()
          , _ = yi(d)
          , b = mh(h, _);
        b.tag = 1,
        b.payload = o,
        c != null && (b.callback = c),
        o = nh(d, b, _),
        o !== null && (gi(o, d, _, h),
        oh(o, d, _))
    },
    enqueueForceUpdate: function(d, o) {
        d = d._reactInternals;
        var c = R()
          , h = yi(d)
          , _ = mh(c, h);
        _.tag = 2,
        o != null && (_.callback = o),
        o = nh(d, _, h),
        o !== null && (gi(o, d, h, c),
        oh(o, d, h))
    }
};

export default Ei;
