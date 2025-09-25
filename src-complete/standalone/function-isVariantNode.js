/* Standalone Function: isVariantNode */

function isVariantNode(d) {
    return !!(isControllingVariants(d) || d.variants)
}

export default isVariantNode;
