/* Standalone Function: getWorldSpaceHalfWidth */

function getWorldSpaceHalfWidth(d, o, c) {
    return _clipToWorldVector.set(0, 0, -o, 1).applyMatrix4(d.projectionMatrix),
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w),
    _clipToWorldVector.x = _lineWidth / c.width,
    _clipToWorldVector.y = _lineWidth / c.height,
    _clipToWorldVector.applyMatrix4(d.projectionMatrixInverse),
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w),
    Math.abs(Math.max(_clipToWorldVector.x, _clipToWorldVector.y))
}

export default getWorldSpaceHalfWidth;
