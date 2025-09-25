/* Standalone Function: copyMaterialUserData */

function copyMaterialUserData(d, o, c=!0) {
    if (!o)
        return d;
    for (const h of Object.keys(o)) {
        if (c && iMaterialIgnoredUserData.includes(h) || h.startsWith("__"))
            continue;
        const _ = o[h];
        if (typeof d[h] == "function" || typeof _ == "function")
            continue;
        const b = !_ || _.isTexture || _.isObject3D || _.isMaterial;
        b || typeof _.clone != "function" ? b || typeof _ != "object" && !Array.isArray(_) ? d[h] = _ : d[h] = copyMaterialUserData(Array.isArray(_) ? [] : {}, _, !1) : d[h] = _.clone()
    }
    return d
}

export default copyMaterialUserData;
