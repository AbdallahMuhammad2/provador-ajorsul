/* Standalone Function: getTexelDecodingFunction */

function getTexelDecodingFunction(d, o) {
    let c;
    switch (o) {
    case three_module.jf0:
    case three_module.Zr2:
    case three_module.er$:
        c = "";
        break;
    case three_module.DAr:
        c = "RGBM16ToLinear";
        break;
    default:
        console.warn("THREE.WebGLProgram: Unsupported color space:", o),
        c = ""
    }
    return `#define ${d}( value ) ${c} ( value )`
}

export default getTexelDecodingFunction;
