/* Standalone Function: getCylinderParameters */

function getCylinderParameters(d) {
    const o = d.parameters;
    return {
        type: ShapeType.CYLINDER,
        params: {
            radiusTop: o.radiusTop,
            radiusBottom: o.radiusBottom,
            height: o.height,
            segments: o.radialSegments
        },
        orientation: new Quaternion().setFromEuler(three_module.cj9.degToRad(-90), 0, 0, "XYZ").normalize()
    }
}

export default getCylinderParameters;
