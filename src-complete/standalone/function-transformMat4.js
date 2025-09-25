/* Standalone Function: transformMat4 */

function transformMat4(d, o, c) {
    var h = o[0]
      , _ = o[1]
      , b = o[2]
      , _e = c[3] * h + c[7] * _ + c[11] * b + c[15];
    return _e = _e || 1,
    d[0] = (c[0] * h + c[4] * _ + c[8] * b + c[12]) / _e,
    d[1] = (c[1] * h + c[5] * _ + c[9] * b + c[13]) / _e,
    d[2] = (c[2] * h + c[6] * _ + c[10] * b + c[14]) / _e,
    d
}

export default transformMat4;
