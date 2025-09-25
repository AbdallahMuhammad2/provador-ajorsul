/* Standalone Function: getTexelDecoding */

function getTexelDecoding(d, o) {
    return getTexelDecodingFunction(d + "TexelToLinear", o ?? three_module.Zr2) + `
`
}

export default getTexelDecoding;
