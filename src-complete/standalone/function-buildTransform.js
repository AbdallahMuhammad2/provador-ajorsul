/* Standalone Function: buildTransform */

function buildTransform(d, {enableHardwareAcceleration: o=!0, allowTransformNone: c=!0}, h, _) {
    let b = "";
    for (let _e = 0; _e < numTransforms; _e++) {
        const nt = transformPropOrder[_e];
        if (d[nt] !== void 0) {
            const it = translateAlias[nt] || nt;
            b += `${it}(${d[nt]}) `
        }
    }
    return o && !d.z && (b += "translateZ(0)"),
    b = b.trim(),
    _ ? b = _(d, h ? "" : b) : c && h && (b = "none"),
    b
}

export default buildTransform;
