/* Standalone Constant: WEBGL_CONSTANTS */

const WEBGL_CONSTANTS = {
    FLOAT: 5126,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123
}
  , WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
}
  , WEBGL_FILTERS = {
    9728: three_module.hxR,
    9729: three_module.k6q,
    9984: three_module.pHI,
    9985: three_module.kRr,
    9986: three_module.Cfg,
    9987: three_module.$_I
}
  , WEBGL_WRAPPINGS = {
    33071: three_module.ghU,
    33648: three_module.kTW,
    10497: three_module.GJx
}
  , WEBGL_TYPE_SIZES = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
}
  , ATTRIBUTES = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
}
  , PATH_PROPERTIES = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
}
  , INTERPOLATION = {
    CUBICSPLINE: void 0,
    LINEAR: three_module.PJ3,
    STEP: three_module.ljd
}
  , ALPHA_MODES = {
    OPAQUE: "OPAQUE",
    MASK: "MASK",
    BLEND: "BLEND"
};

export default WEBGL_CONSTANTS;
