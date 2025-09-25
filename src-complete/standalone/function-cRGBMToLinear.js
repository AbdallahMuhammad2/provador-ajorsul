/* Standalone Function: cRGBMToLinear */

function cRGBMToLinear(d, o) {
    return vRGBMToLinear(d, o),
    new three_module.Q1f(d.x,d.y,d.z)
}

export default cRGBMToLinear;
