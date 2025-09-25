/* Standalone Function: serializeTextureInExtras */

function serializeTextureInExtras(d, o, c, h) {
    var _, b, _e;
    if (o != null && o.extras[d.uuid])
        return {
            uuid: d.uuid,
            resource: "extras"
        };
    let nt = "";
    if (!((_ = d.source) === null || _ === void 0) && _._sourceImgBuffer || d.userData.__sourceBuffer) {
        const at = new Uint8Array(((b = d.source) === null || b === void 0 ? void 0 : b._sourceImgBuffer) || d.userData.__sourceBuffer)
          , ut = h || d.userData.mimeType || "";
        nt = {
            data: Array.from(at),
            type: at.constructor.name,
            path: ((_e = d.userData.__sourceBlob) === null || _e === void 0 ? void 0 : _e.name) || d.userData.rootPath || "file." + ut.split("/")[1]
        },
        ut && (nt.mimeType = ut)
    } else
        d.userData.rootPath ? nt = d.userData.rootPath : console.error("Unable to serialize LUT texture, not loaded through asset manager.");
    const it = {
        uuid: d.uuid,
        url: nt,
        userData: copyTextureUserData({}, d.userData),
        type: d.type,
        name: c || d.name
    };
    return o != null && o.extras ? (o.extras[d.uuid] = it,
    {
        uuid: d.uuid,
        resource: "extras"
    }) : it
}

export default serializeTextureInExtras;
