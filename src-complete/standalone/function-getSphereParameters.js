/* Standalone Function: getSphereParameters */

function getSphereParameters(d) {
    return {
        type: ShapeType.SPHERE,
        params: {
            radius: d.parameters.radius
        }
    }
}

export default getSphereParameters;
