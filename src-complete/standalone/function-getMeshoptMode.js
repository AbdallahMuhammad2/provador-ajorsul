/* Standalone Function: getMeshoptMode */

function getMeshoptMode(d, o) {
    return o === WriterContext.BufferViewUsage.ELEMENT_ARRAY_BUFFER ? d.listParents().some(c => c instanceof index_modern_Primitive && c.getMode() === index_modern_Primitive.Mode.TRIANGLES) ? MeshoptMode.TRIANGLES : MeshoptMode.INDICES : MeshoptMode.ATTRIBUTES
}

export default getMeshoptMode;
