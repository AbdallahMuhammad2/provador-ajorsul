/* Standalone Function: Lg */

function Lg(d, o, c) {
    if (d = c.ref,
    d !== null && typeof d != "function" && typeof d != "object") {
        if (c._owner) {
            if (c = c._owner,
            c) {
                if (c.tag !== 1)
                    throw Error(p(309));
                var h = c.stateNode
            }
            if (!h)
                throw Error(p(147, d));
            var _ = h
              , b = "" + d;
            return o !== null && o.ref !== null && typeof o.ref == "function" && o.ref._stringRef === b ? o.ref : (o = function(_e) {
                var nt = _.refs;
                _e === null ? delete nt[b] : nt[b] = _e
            }
            ,
            o._stringRef = b,
            o)
        }
        if (typeof d != "string")
            throw Error(p(284));
        if (!c._owner)
            throw Error(p(290, d))
    }
    return d
}

export default Lg;
