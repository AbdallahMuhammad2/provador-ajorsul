/* Standalone Function: getSample */

function getSample(d, o, c) {
    o = o.clone().normalize();
    const h = new three_module.Pq0(0,-o.z,o.y).normalize()
      , _ = new three_module.Pq0().crossVectors(o, h).normalize()
      , b = d;
    b.x = 2 * b.x * Math.PI,
    b.y = 1 - b.y * c;
    const _e = Math.sqrt(1 - b.y * b.y);
    return h.multiplyScalar(Math.cos(b.x) * _e).add(_.multiplyScalar(Math.sin(b.x) * _e)).add(o.multiplyScalar(b.y))
}

export default getSample;
