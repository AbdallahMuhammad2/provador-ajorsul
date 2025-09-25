/* Standalone Function: getLayoutRect */

function getLayoutRect(d) {
    var o = getBoundingClientRect(d)
      , c = d.offsetWidth
      , h = d.offsetHeight;
    return Math.abs(o.width - c) <= 1 && (c = o.width),
    Math.abs(o.height - h) <= 1 && (h = o.height),
    {
        x: d.offsetLeft,
        y: d.offsetTop,
        width: c,
        height: h
    }
}

export default getLayoutRect;
