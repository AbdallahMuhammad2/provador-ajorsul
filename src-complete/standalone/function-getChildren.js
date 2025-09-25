/* Standalone Function: getChildren */

function getChildren(d) {
    var o = d.firstElementChild
      , c = arrayFrom(o.children);
    return {
        box: o,
        content: c.find(function(h) {
            return h.classList.contains(CONTENT_CLASS)
        }),
        arrow: c.find(function(h) {
            return h.classList.contains(ARROW_CLASS) || h.classList.contains(SVG_ARROW_CLASS)
        }),
        backdrop: c.find(function(h) {
            return h.classList.contains(BACKDROP_CLASS)
        })
    }
}

export default getChildren;
