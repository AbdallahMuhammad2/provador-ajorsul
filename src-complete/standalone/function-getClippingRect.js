/* Standalone Function: getClippingRect */

function getClippingRect(d, o, c, h) {
    var _ = o === "clippingParents" ? getClippingParents(d) : [].concat(o)
      , b = [].concat(_, [c])
      , _e = b[0]
      , nt = b.reduce(function(it, at) {
        var ut = getClientRectFromMixedType(d, at, h);
        return it.top = math_max(ut.top, it.top),
        it.right = math_min(ut.right, it.right),
        it.bottom = math_min(ut.bottom, it.bottom),
        it.left = math_max(ut.left, it.left),
        it
    }, getClientRectFromMixedType(d, _e, h));
    return nt.width = nt.right - nt.left,
    nt.height = nt.bottom - nt.top,
    nt.x = nt.left,
    nt.y = nt.top,
    nt
}

export default getClippingRect;
