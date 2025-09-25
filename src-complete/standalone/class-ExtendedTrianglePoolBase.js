/* Standalone Class: ExtendedTrianglePoolBase */

class ExtendedTrianglePoolBase extends PrimitivePool {
    constructor() {
        super( () => new ExtendedTriangle)
    }
}

export default ExtendedTrianglePoolBase;
