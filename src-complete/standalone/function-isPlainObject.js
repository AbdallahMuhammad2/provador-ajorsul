/* Standalone Function: isPlainObject */

function isPlainObject(d) {
    if (isObject(d) === !1)
        return !1;
    const o = d.constructor;
    if (o === void 0)
        return !0;
    const c = o.prototype;
    return isObject(c) !== !1 && Object.prototype.hasOwnProperty.call(c, "isPrototypeOf") !== !1
}

export default isPlainObject;
