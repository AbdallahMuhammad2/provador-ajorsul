/* Standalone Function: getPlaneParameters */

function getPlaneParameters(d) {
    d.computeBoundingBox();
    const o = d.boundingBox;
    return {
        type: ShapeType.BOX,
        params: {
            x: (o.max.x - o.min.x) / 2 || .1,
            y: (o.max.y - o.min.y) / 2 || .1,
            z: (o.max.z - o.min.z) / 2 || .1
        }
    }
}

export default getPlaneParameters;
