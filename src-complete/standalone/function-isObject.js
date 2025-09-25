/* Standalone Function: isObject */

function isObject(d) {
    return Object.prototype.toString.call(d) === "[object Object]"
}

export default isObject;
