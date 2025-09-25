/* Standalone Function: isNone */

function isNone(d) {
    return typeof d == "number" ? d === 0 : d !== null ? d === "none" || d === "0" || isZeroValueString(d) : !0
}

export default isNone;
