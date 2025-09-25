/* Standalone Function: isExternalImage */

function isExternalImage(d, o) {
    return o.uri !== void 0 && !(o.uri in d.resources) && o.bufferView === void 0
}

export default isExternalImage;
