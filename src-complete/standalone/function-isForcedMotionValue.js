/* Standalone Function: isForcedMotionValue */

function isForcedMotionValue(d, {layout: o, layoutId: c}) {
    return transformProps.has(d) || d.startsWith("origin") || (o || c !== void 0) && (!!scaleCorrectors[d] || d === "opacity")
}

export default isForcedMotionValue;
