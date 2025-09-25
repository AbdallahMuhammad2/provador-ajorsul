/* Standalone Function: applyTreeDeltas */

function applyTreeDeltas(d, o, c, h=!1) {
    const _ = c.length;
    if (!_)
        return;
    o.x = o.y = 1;
    let b, _e;
    for (let nt = 0; nt < _; nt++) {
        b = c[nt],
        _e = b.projectionDelta;
        const it = b.instance;
        it && it.style && it.style.display === "contents" || (h && b.options.layoutScroll && b.scroll && b !== b.root && transformBox(d, {
            x: -b.scroll.offset.x,
            y: -b.scroll.offset.y
        }),
        _e && (o.x *= _e.x.scale,
        o.y *= _e.y.scale,
        applyBoxDelta(d, _e)),
        h && hasTransform(b.latestValues) && transformBox(d, b.latestValues))
    }
    o.x = snapToDefault(o.x),
    o.y = snapToDefault(o.y)
}

export default applyTreeDeltas;
