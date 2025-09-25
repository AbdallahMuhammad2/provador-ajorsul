/* Standalone Function: requiresPregeneratedKeyframes */

function requiresPregeneratedKeyframes(d) {
    return d.type === "spring" || d.name === "backgroundColor" || !isWaapiSupportedEasing(d.ease)
}

export default requiresPregeneratedKeyframes;
