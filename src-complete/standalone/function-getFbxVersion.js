/* Standalone Function: getFbxVersion */

function getFbxVersion(d) {
    const o = d.match(/FBXVersion: (\d+)/);
    if (o)
        return parseInt(o[1]);
    throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")
}

export default getFbxVersion;
