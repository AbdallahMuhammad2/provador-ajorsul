/* Standalone Function: Rg */

function Rg(d, o, c, h, _, b) {
    var _e = 2;
    if (h = d,
    typeof d == "function")
        aj(d) && (_e = 1);
    else if (typeof d == "string")
        _e = 5;
    else
        e: switch (d) {
        case ya:
            return Tg(c.children, _, b, o);
        case za:
            _e = 8,
            _ |= 8;
            break;
        case Aa:
            return d = Bg(12, c, o, _ | 2),
            d.elementType = Aa,
            d.lanes = b,
            d;
        case Ea:
            return d = Bg(13, c, o, _),
            d.elementType = Ea,
            d.lanes = b,
            d;
        case Fa:
            return d = Bg(19, c, o, _),
            d.elementType = Fa,
            d.lanes = b,
            d;
        case Ia:
            return pj(c, _, b, o);
        default:
            if (typeof d == "object" && d !== null)
                switch (d.$$typeof) {
                case Ba:
                    _e = 10;
                    break e;
                case Ca:
                    _e = 9;
                    break e;
                case Da:
                    _e = 11;
                    break e;
                case Ga:
                    _e = 14;
                    break e;
                case Ha:
                    _e = 16,
                    h = null;
                    break e
                }
            throw Error(p(130, d == null ? d : typeof d, ""))
        }
    return o = Bg(_e, c, o, _),
    o.elementType = d,
    o.type = h,
    o.lanes = b,
    o
}

export default Rg;
