/* Standalone Function: transformBoxPoints */

function transformBoxPoints(d, o) {
    if (!o)
        return d;
    const c = o({
        x: d.left,
        y: d.top
    })
      , h = o({
        x: d.right,
        y: d.bottom
    });
    return {
        top: c.y,
        left: c.x,
        bottom: h.y,
        right: h.x
    }
}

export default transformBoxPoints;
