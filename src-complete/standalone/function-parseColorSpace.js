/* Standalone Function: parseColorSpace */

function parseColorSpace(d) {
    const o = d.dataFormatDescriptor[0];
    return o.colorPrimaries === ktx_parse_module_F ? o.transferFunction === ktx_parse_module_x ? three_module.er$ : three_module.Zr2 : o.colorPrimaries === ktx_parse_module_X ? o.transferFunction === ktx_parse_module_x ? three_module.V5c : three_module.qIQ : (o.colorPrimaries === ktx_parse_module_E || console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${o.colorPrimaries}"`),
    three_module.jf0)
}

export default parseColorSpace;
