/* Standalone Function: copyObject3DUserData */

function copyObject3DUserData(d, o) {
    if (o)
        for (const c of Object.keys(o))
            iModelIgnoredUserData.includes(c) || c.startsWith("__") || typeof d[c] != "function" && typeof o[c] != "function" && (d[c] = o[c]);
    return d
}

export default copyObject3DUserData;
