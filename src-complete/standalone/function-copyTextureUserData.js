/* Standalone Function: copyTextureUserData */

function copyTextureUserData(d, o) {
    if (o)
        for (const c of Object.keys(o))
            iTextureIgnoredUserData.includes(c) || c.startsWith("__") || typeof d[c] != "function" && typeof o[c] != "function" && (d[c] = o[c]);
    return d
}

export default copyTextureUserData;
