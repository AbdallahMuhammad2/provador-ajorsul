/* Standalone Class: GLTFCubicSplineQuaternionInterpolant */

class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
    interpolate_(o, c, h, _) {
        const b = super.interpolate_(o, c, h, _);
        return _q.fromArray(b).normalize().toArray(b),
        b
    }
}

export default GLTFCubicSplineQuaternionInterpolant;
