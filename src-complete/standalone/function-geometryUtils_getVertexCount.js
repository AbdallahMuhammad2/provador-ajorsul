/* Standalone Function: geometryUtils_getVertexCount */

function geometryUtils_getVertexCount(d) {
    return d.index ? d.index.count : d.attributes.position.count
}

export default geometryUtils_getVertexCount;
