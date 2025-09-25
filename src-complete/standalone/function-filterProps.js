/* Standalone Function: filterProps */

function filterProps(d, o, c) {
    const h = {};
    for (const _ in d)
        _ === "values" && typeof d.values == "object" || (shouldForward(_) || c === !0 && isValidMotionProp(_) || !o && !isValidMotionProp(_) || d.draggable && _.startsWith("onDrag")) && (h[_] = d[_]);
    return h
}

export default filterProps;
