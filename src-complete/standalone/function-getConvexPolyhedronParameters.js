/* Standalone Function: getConvexPolyhedronParameters */

function getConvexPolyhedronParameters(d) {
    const o = getGeometry(d);
    if (!o)
        return null;
    const c = 1e-4;
    for (let b = 0; b < o.attributes.position.count; b++)
        o.attributes.position.setXYZ(b, o.attributes.position.getX(b) + (Math.random() - .5) * c, o.attributes.position.getY(b) + (Math.random() - .5) * c, o.attributes.position.getZ(b) + (Math.random() - .5) * c);
    const [h,_] = new ConvexHull().setFromObject(new three_module.eaF(o)).toJSON();
    return {
        type: ShapeType.HULL,
        params: {
            vertices: new Float32Array(h),
            faces: _
        }
    }
}

export default getConvexPolyhedronParameters;
