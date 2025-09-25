/* Standalone Function: dom_getPaddedBufferSize */

function dom_getPaddedBufferSize(d) {
    return 4 * Math.ceil(d / 4)
}

export default dom_getPaddedBufferSize;
