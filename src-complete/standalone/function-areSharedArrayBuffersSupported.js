/* Standalone Function: areSharedArrayBuffersSupported */

function areSharedArrayBuffersSupported() {
    return typeof SharedArrayBuffer < "u"
}

export default areSharedArrayBuffersSupported;
