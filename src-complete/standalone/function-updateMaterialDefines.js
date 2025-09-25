/* Standalone Function: updateMaterialDefines */

function updateMaterialDefines(d, o) {
    let c = !1;
    o.materialObject && o.materialObject.defines === void 0 && (o.materialObject.defines = {});
    const h = Object.entries(d);
    for (const [_,b] of h)
        b === void 0 ? o.materialObject.defines[_] !== void 0 && (delete o.materialObject.defines[_],
        c = !0) : o.materialObject.defines[_] !== b && (o.materialObject.defines[_] = b,
        c = !0);
    c && (o.materialObject.needsUpdate = !0)
}

export default updateMaterialDefines;
