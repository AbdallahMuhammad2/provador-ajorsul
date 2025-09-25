/* Standalone Function: copyRawValuesOnly */

function copyRawValuesOnly(d, o, c) {
    for (const h in o)
        !isMotionValue(o[h]) && !isForcedMotionValue(h, c) && (d[h] = o[h])
}

export default copyRawValuesOnly;
