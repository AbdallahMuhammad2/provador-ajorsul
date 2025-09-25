/* Standalone Constant: GLTFExporter_PATH_PROPERTIES */

const GLTFExporter_PATH_PROPERTIES = {
    scale: "scale",
    position: "translation",
    quaternion: "rotation",
    morphTargetInfluences: "weights"
}
  , DEFAULT_SPECULAR_COLOR = new three_module.Q1f
  , GLB_HEADER_BYTES = 12
  , GLB_HEADER_MAGIC = 1179937895
  , GLB_VERSION = 2
  , GLB_CHUNK_PREFIX_BYTES = 8
  , GLB_CHUNK_TYPE_JSON = 1313821514
  , GLB_CHUNK_TYPE_BIN = 5130562;
function equalArray(d, o) {
    return d.length === o.length && d.every(function(c, h) {
        return c === o[h]
    })
}
function stringToArrayBuffer(d) {
    return new TextEncoder().encode(d).buffer
}
function isIdentityMatrix(d) {
    return equalArray(d.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
}
function getMinMax(d, o, c) {
    const h = {
        min: new Array(d.itemSize).fill(Number.POSITIVE_INFINITY),
        max: new Array(d.itemSize).fill(Number.NEGATIVE_INFINITY)
    };

export default GLTFExporter_PATH_PROPERTIES;
