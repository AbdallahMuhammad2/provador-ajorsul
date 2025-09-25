/* Standalone Function: stringToArrayBuffer */

function stringToArrayBuffer(d) {
    return new TextEncoder().encode(d).buffer
}

export default stringToArrayBuffer;
