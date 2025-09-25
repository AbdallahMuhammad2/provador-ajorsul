/* Standalone Function: getVertexCount */

function getVertexCount(d) {
    return d.index ? d.index.count : d.attributes.position.count
}

export default getVertexCount;
