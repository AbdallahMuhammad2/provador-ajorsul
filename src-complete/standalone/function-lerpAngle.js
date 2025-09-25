/* Standalone Function: lerpAngle */

function lerpAngle(d, o, c) {
    const h = o - d;
    return h >= Math.PI ? d + (h - 2 * Math.PI) * c : h <= -Math.PI ? d + (h + 2 * Math.PI) * c : d + h * c
}

export default lerpAngle;
