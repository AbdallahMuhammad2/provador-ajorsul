/* Standalone Function: dataTextureFromVec4 */

function dataTextureFromVec4(d) {
    const o = new three_module.GYF(new Uint8Array([Math.floor(255 * d.x), Math.floor(255 * d.y), Math.floor(255 * d.z), Math.floor(255 * d.w)]),1,1,three_module.GWd,three_module.OUM);
    return o.needsUpdate = !0,
    o
}

export default dataTextureFromVec4;
