/* Standalone Function: getEulerOrder */

function getEulerOrder(d) {
    const o = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"];
    return (d = d || 0) === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),
    o[0]) : o[d]
}

export default getEulerOrder;
