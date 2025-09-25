/* Standalone Function: resolveMotionValue */

function resolveMotionValue(d) {
    const o = isMotionValue(d) ? d.get() : d;
    return isCustomValue(o) ? o.toValue() : o
}

export default resolveMotionValue;
