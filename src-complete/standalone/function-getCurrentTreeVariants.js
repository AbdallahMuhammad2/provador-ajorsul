/* Standalone Function: getCurrentTreeVariants */

function getCurrentTreeVariants(d, o) {
    if (isControllingVariants(d)) {
        const {initial: c, animate: h} = d;
        return {
            initial: c === !1 || isVariantLabel(c) ? c : void 0,
            animate: isVariantLabel(h) ? h : void 0
        }
    }
    return d.inherit !== !1 ? o : {}
}

export default getCurrentTreeVariants;
