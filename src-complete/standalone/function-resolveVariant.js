/* Standalone Function: resolveVariant */

function resolveVariant(d, o, c) {
    const h = d.getProps();
    return resolveVariantFromProps(h, o, c !== void 0 ? c : h.custom, getCurrent(d), getVelocity$1(d))
}

export default resolveVariant;
