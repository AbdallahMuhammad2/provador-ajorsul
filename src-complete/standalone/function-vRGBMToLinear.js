/* Standalone Function: vRGBMToLinear */

function vRGBMToLinear(d, o) {
    return d.multiplyScalar(d.w * o),
    d.w = 1,
    d
}

export default vRGBMToLinear;
