/* Standalone Function: isExternalBuffer */

function isExternalBuffer(d, o) {
    return o.uri !== void 0 && !(o.uri in d.resources)
}

export default isExternalBuffer;
