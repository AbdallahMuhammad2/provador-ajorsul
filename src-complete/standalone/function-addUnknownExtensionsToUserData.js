/* Standalone Function: addUnknownExtensionsToUserData */

function addUnknownExtensionsToUserData(d, o, c) {
    for (const h in c.extensions)
        d[h] === void 0 && (o.userData.gltfExtensions = o.userData.gltfExtensions || {},
        o.userData.gltfExtensions[h] = c.extensions[h])
}

export default addUnknownExtensionsToUserData;
