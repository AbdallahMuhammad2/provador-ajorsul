/* Standalone Function: dataTextureFromColor */

function dataTextureFromColor(d) {
    const o = new three_module.GYF(new Uint8Array([Math.floor(255 * d.r), Math.floor(255 * d.g), Math.floor(255 * d.b), 255]),1,1,three_module.GWd,three_module.OUM);
    return o.needsUpdate = !0,
    o.colorSpace = three_module.jf0,
    o
}

export default dataTextureFromColor;
