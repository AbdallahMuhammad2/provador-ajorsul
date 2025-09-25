/* Standalone Function: resolveVariantFromProps */

function resolveVariantFromProps(d, o, c, h={}, _={}) {
    return typeof o == "function" && (o = o(c !== void 0 ? c : d.custom, h, _)),
    typeof o == "string" && (o = d.variants && d.variants[o]),
    typeof o == "function" && (o = o(c !== void 0 ? c : d.custom, h, _)),
    o
}

export default resolveVariantFromProps;
