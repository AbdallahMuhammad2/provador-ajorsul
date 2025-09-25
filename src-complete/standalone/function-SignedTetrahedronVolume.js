/* Standalone Function: SignedTetrahedronVolume */

function SignedTetrahedronVolume(d, o, c) {
    const h = new three_module.Pq0().copy(d)
      , _ = new three_module.Pq0().copy(o)
      , b = new three_module.Pq0().copy(c);
    return h.dot(_.cross(b)) / 6
}

export default SignedTetrahedronVolume;
