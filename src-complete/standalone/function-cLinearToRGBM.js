/* Standalone Function: cLinearToRGBM */

function cLinearToRGBM(d, o) {
    return vLinearToRGBM(new three_module.IUQ(d.r,d.g,d.b,1), o)
}

export default cLinearToRGBM;
