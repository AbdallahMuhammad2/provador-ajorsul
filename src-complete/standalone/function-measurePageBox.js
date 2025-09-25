/* Standalone Function: measurePageBox */

function measurePageBox(d, o, c) {
    const h = measureViewportBox(d, c)
      , {scroll: _} = o;
    return _ && (translateAxis(h.x, _.offset.x),
    translateAxis(h.y, _.offset.y)),
    h
}

export default measurePageBox;
