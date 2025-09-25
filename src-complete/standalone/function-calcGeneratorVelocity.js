/* Standalone Function: calcGeneratorVelocity */

function calcGeneratorVelocity(d, o, c) {
    const h = Math.max(o - velocitySampleDuration, 0);
    return velocityPerSecond(c - d(h), o - h)
}

export default calcGeneratorVelocity;
