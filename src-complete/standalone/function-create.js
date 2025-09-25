/* Standalone Function: create */

function create() {
    var d = new ARRAY_TYPE(3);
    return ARRAY_TYPE != Float32Array && (d[0] = 0,
    d[1] = 0,
    d[2] = 0),
    d
}

export default create;
