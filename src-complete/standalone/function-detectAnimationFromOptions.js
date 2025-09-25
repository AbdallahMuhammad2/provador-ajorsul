/* Standalone Function: detectAnimationFromOptions */

function detectAnimationFromOptions(d) {
    if (Array.isArray(d.to))
        return keyframes$1;
    if (types[d.type])
        return types[d.type];
    var o = new Set(Object.keys(d));
    return o.has("ease") || o.has("duration") && !o.has("dampingRatio") ? keyframes$1 : o.has("dampingRatio") || o.has("stiffness") || o.has("mass") || o.has("damping") || o.has("restSpeed") || o.has("restDelta") ? spring$1 : keyframes$1
}

export default detectAnimationFromOptions;
