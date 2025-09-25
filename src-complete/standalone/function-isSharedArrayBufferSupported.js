/* Standalone Function: isSharedArrayBufferSupported */

function isSharedArrayBufferSupported() {
    return typeof SharedArrayBuffer < "u"
}

export default isSharedArrayBufferSupported;
