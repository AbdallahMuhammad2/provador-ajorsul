/* Standalone Function: resolvePointElastic */

function resolvePointElastic(d, o) {
    return typeof d == "number" ? d : d[o] || 0
}

export default resolvePointElastic;
