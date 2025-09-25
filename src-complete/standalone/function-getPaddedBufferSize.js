/* Standalone Function: getPaddedBufferSize */

function getPaddedBufferSize(d) {
    return 4 * Math.ceil(d / 4)
}

export default getPaddedBufferSize;
