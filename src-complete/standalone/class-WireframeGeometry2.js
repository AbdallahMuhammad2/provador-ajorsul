/* Standalone Class: WireframeGeometry2 */

class WireframeGeometry2 extends LineSegmentsGeometry {
    constructor(o) {
        super(),
        this.isWireframeGeometry2 = !0,
        this.type = "WireframeGeometry2",
        this.fromWireframeGeometry(new three_module.XJ7(o))
    }
}

export default WireframeGeometry2;
