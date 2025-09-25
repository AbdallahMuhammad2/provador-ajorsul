/* Standalone Function: assignExtrasToUserData */

function assignExtrasToUserData(d, o) {
    o.extras !== void 0 && (typeof o.extras == "object" ? Object.assign(d.userData, o.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + o.extras))
}

export default assignExtrasToUserData;
