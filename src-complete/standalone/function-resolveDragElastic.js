/* Standalone Function: resolveDragElastic */

function resolveDragElastic(d=defaultElastic) {
    return d === !1 ? d = 0 : d === !0 && (d = defaultElastic),
    {
        x: resolveAxisElastic(d, "left", "right"),
        y: resolveAxisElastic(d, "top", "bottom")
    }
}

export default resolveDragElastic;
