/* Standalone Function: getGeometry */

function getGeometry(d) {
    const o = getMeshes(d);
    if (o.length === 0)
        return null;
    if (o.length === 1)
        return normalizeGeometry(o[0]);
    let c;
    const h = [];
    for (; c = o.pop(); )
        h.push(simplifyGeometry(normalizeGeometry(c)));
    return three_to_cannon_modern_mergeBufferGeometries(h)
}

export default getGeometry;
