/* Standalone Function: fillOffset */

function fillOffset(d, o) {
    const c = d[d.length - 1];
    for (let h = 1; h <= o; h++) {
        const _ = progress(0, o, h);
        d.push(mixNumber$1(c, 1, _))
    }
}

export default fillOffset;
