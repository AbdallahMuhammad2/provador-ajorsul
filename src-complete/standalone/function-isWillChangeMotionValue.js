/* Standalone Function: isWillChangeMotionValue */

function isWillChangeMotionValue(d) {
    return !!(isMotionValue(d) && d.add)
}

export default isWillChangeMotionValue;
