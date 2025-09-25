/* Standalone Function: getBoxParameters */

function getBoxParameters(d) {
    if (!getVertices(d).length)
        return null;
    d.computeBoundingBox();
    const o = d.boundingBox;
    return {
        type: ShapeType.BOX,
        params: {
            x: (o.max.x - o.min.x) / 2,
            y: (o.max.y - o.min.y) / 2,
            z: (o.max.z - o.min.z) / 2
        }
    }
}

export default getBoxParameters;
