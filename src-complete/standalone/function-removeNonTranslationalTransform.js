/* Standalone Function: removeNonTranslationalTransform */

function removeNonTranslationalTransform(d) {
    const o = [];
    return nonTranslationalTransformKeys.forEach(c => {
        const h = d.getValue(c);
        h !== void 0 && (o.push([c, h.get()]),
        h.set(c.startsWith("scale") ? 1 : 0))
    }
    ),
    o
}

export default removeNonTranslationalTransform;
