/* Standalone Function: isArray */

function isArray(d) {
    return Array.isArray(d) || ArrayBuffer.isView(d)
}

export default isArray;
