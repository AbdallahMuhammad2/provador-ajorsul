/* Standalone Function: intersectRay */

function intersectRay(d, o, c, h) {
    return arrayToBox(d, o, _boundingBox),
    c.intersectBox(_boundingBox, h)
}

export default intersectRay;
