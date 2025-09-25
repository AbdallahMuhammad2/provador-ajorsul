/* Standalone Function: fl */

function fl(d, o, c, h) {
    var _ = o.current
      , b = R()
      , _e = yi(_);
    return c = dl(c),
    o.context === null ? o.context = c : o.pendingContext = c,
    o = mh(b, _e),
    o.payload = {
        element: d
    },
    h = h === void 0 ? null : h,
    h !== null && (o.callback = h),
    d = nh(_, o, _e),
    d !== null && (gi(d, _, _e, b),
    oh(d, _, _e)),
    _e
}

export default fl;
