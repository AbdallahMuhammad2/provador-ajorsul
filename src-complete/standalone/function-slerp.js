/* Standalone Function: slerp */

function slerp(d, o, c) {
    let h = d.dot(o);
    h = Math.min(Math.max(h, -1), 1);
    const _ = Math.acos(h) * c;
    return tempVec.copy(d).multiplyScalar(h).sub(o).negate().normalize(),
    d.multiplyScalar(Math.cos(_)).add(tempVec.multiplyScalar(Math.sin(_)))
}

export default slerp;
