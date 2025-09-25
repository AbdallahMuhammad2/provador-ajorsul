/* Standalone Class: LineGeometry */

class LineGeometry extends LineSegmentsGeometry {
    constructor() {
        super(),
        this.isLineGeometry = !0,
        this.type = "LineGeometry"
    }
    setPositions(o) {
        const c = o.length - 3
          , h = new Float32Array(2 * c);
        for (let _ = 0; _ < c; _ += 3)
            h[2 * _] = o[_],
            h[2 * _ + 1] = o[_ + 1],
            h[2 * _ + 2] = o[_ + 2],
            h[2 * _ + 3] = o[_ + 3],
            h[2 * _ + 4] = o[_ + 4],
            h[2 * _ + 5] = o[_ + 5];
        return super.setPositions(h),
        this
    }
    setColors(o) {
        const c = o.length - 3
          , h = new Float32Array(2 * c);
        for (let _ = 0; _ < c; _ += 3)
            h[2 * _] = o[_],
            h[2 * _ + 1] = o[_ + 1],
            h[2 * _ + 2] = o[_ + 2],
            h[2 * _ + 3] = o[_ + 3],
            h[2 * _ + 4] = o[_ + 4],
            h[2 * _ + 5] = o[_ + 5];
        return super.setColors(h),
        this
    }
    fromLine(o) {
        const c = o.geometry;
        return this.setPositions(c.attributes.position.array),
        this
    }
}

export default LineGeometry;
