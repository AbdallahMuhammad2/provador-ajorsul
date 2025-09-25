/* Standalone Function: build_b */

function build_b(d) {
    const o = d.map(build_A);
    return [o.map(h => h[0]), (c = o.map(h => h[1]),
    Array.prototype.concat.apply([], c))];
    var c
}

export default build_b;
