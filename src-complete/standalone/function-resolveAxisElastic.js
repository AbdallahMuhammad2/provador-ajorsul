/* Standalone Function: resolveAxisElastic */

function resolveAxisElastic(d, o, c) {
    return {
        min: resolvePointElastic(d, o),
        max: resolvePointElastic(d, c)
    }
}

export default resolveAxisElastic;
