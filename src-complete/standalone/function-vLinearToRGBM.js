/* Standalone Function: vLinearToRGBM */

function vLinearToRGBM(d, o) {
    const c = Math.max(d.x, Math.max(d.y, d.z));
    let h = Math.max(Math.min(c / o, 1), 0);
    return h = Math.ceil(255 * h) / 255,
    d.divideScalar(h * o),
    d.w = h,
    d
}

export default vLinearToRGBM;
