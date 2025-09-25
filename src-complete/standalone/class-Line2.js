/* Standalone Class: Line2 */

class Line2 extends LineSegments2 {
    constructor(o=new LineGeometry, c=new LineMaterial({
        color: 16777215 * Math.random()
    })) {
        super(o, c),
        this.isLine2 = !0,
        this.type = "Line2"
    }
}

export default Line2;
