/* Standalone Function: q */

function q(d, o, c) {
    var h, _ = {}, b = null, _e = null;
    c !== void 0 && (b = "" + c),
    o.key !== void 0 && (b = "" + o.key),
    o.ref !== void 0 && (_e = o.ref);
    for (h in o)
        m$1.call(o, h) && !p$1.hasOwnProperty(h) && (_[h] = o[h]);
    if (d && d.defaultProps)
        for (h in o = d.defaultProps,
        o)
            _[h] === void 0 && (_[h] = o[h]);
    return {
        $$typeof: k,
        type: d,
        key: b,
        ref: _e,
        props: _,
        _owner: n.current
    }
}

export default q;
