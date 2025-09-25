/* Standalone Function: computeOffsets */

function computeOffsets(d) {
    var o, c = d.reference, h = d.element, _ = d.placement, b = _ ? getBasePlacement(_) : null, _e = _ ? getVariation(_) : null, nt = c.x + c.width / 2 - h.width / 2, it = c.y + c.height / 2 - h.height / 2;
    switch (b) {
    case enums_top:
        o = {
            x: nt,
            y: c.y - h.height
        };
        break;
    case bottom:
        o = {
            x: nt,
            y: c.y + c.height
        };
        break;
    case right:
        o = {
            x: c.x + c.width,
            y: it
        };
        break;
    case left:
        o = {
            x: c.x - h.width,
            y: it
        };
        break;
    default:
        o = {
            x: c.x,
            y: c.y
        }
    }
    var at = b ? getMainAxisFromPlacement(b) : null;
    if (at != null) {
        var ut = at === "y" ? "height" : "width";
        switch (_e) {
        case start:
            o[at] = o[at] - (c[ut] / 2 - h[ut] / 2);
            break;
        case end:
            o[at] = o[at] + (c[ut] / 2 - h[ut] / 2)
        }
    }
    return o
}

export default computeOffsets;
