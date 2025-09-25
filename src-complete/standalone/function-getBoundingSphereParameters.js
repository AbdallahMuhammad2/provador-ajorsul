/* Standalone Function: getBoundingSphereParameters */

function getBoundingSphereParameters(d, o) {
    if (o.sphereRadius)
        return {
            type: ShapeType.SPHERE,
            params: {
                radius: o.sphereRadius
            }
        };
    const c = getGeometry(d);
    return c ? (c.computeBoundingSphere(),
    {
        type: ShapeType.SPHERE,
        params: {
            radius: c.boundingSphere.radius
        }
    }) : null
}

export default getBoundingSphereParameters;
