/* Standalone Function: TriangleArea */

function TriangleArea(d, o, c) {
    const h = new three_module.Pq0().copy(d)
      , _ = new three_module.Pq0().copy(o)
      , b = new three_module.Pq0().copy(c);
    return _.sub(h),
    b.sub(h),
    b.cross(_),
    .5 * b.length()
}

export default TriangleArea;
