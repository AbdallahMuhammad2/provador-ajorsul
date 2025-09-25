/* Standalone Function: getRadius */

function getRadius(d, o) {
    return d[o] !== void 0 ? d[o] : d.borderRadius
}

export default getRadius;
