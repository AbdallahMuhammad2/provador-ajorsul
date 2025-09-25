/* Standalone Function: Kb */

function Kb(d, o) {
    var c = d.stateNode;
    if (c === null)
        return null;
    var h = Db(c);
    if (h === null)
        return null;
    c = h[o];
    e: switch (o) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (h = !h.disabled) || (d = d.type,
        h = !(d === "button" || d === "input" || d === "select" || d === "textarea")),
        d = !h;
        break e;
    default:
        d = !1
    }
    if (d)
        return null;
    if (c && typeof c != "function")
        throw Error(p(231, o, typeof c));
    return c
}

export default Kb;
