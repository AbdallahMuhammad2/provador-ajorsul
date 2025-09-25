/* Standalone Function: ceilToFourByteStride */

function ceilToFourByteStride(d) {
    return 4 + (d = ~~d) - d % 4
}

export default ceilToFourByteStride;
