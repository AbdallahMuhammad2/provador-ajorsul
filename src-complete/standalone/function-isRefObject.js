/* Standalone Function: isRefObject */

function isRefObject(d) {
    return d && typeof d == "object" && Object.prototype.hasOwnProperty.call(d, "current")
}

export default isRefObject;
