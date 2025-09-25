/* Standalone Function: isType */

function isType(d, o) {
    var c = {}.toString.call(d);
    return c.indexOf("[object") === 0 && c.indexOf(o + "]") > -1
}

export default isType;
