/* Standalone Function: getTextureDataType */

function getTextureDataType(d) {
    if (!d)
        return three_module.OUM;
    const o = d.extensions.has("EXT_color_buffer_half_float") || d.capabilities.isWebGL2 && d.extensions.has("EXT_color_buffer_float")
      , c = d.capabilities.isWebGL2 || d.extensions.has("OES_texture_float") || d.extensions.has("WEBGL_color_buffer_float");
    return o ? three_module.ix0 : c ? three_module.RQf : three_module.OUM
}

export default getTextureDataType;
