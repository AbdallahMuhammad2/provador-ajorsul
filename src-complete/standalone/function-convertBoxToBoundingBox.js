/* Standalone Function: convertBoxToBoundingBox */

function convertBoxToBoundingBox({x: d, y: o}) {
    return {
        top: o.min,
        right: d.max,
        bottom: o.max,
        left: d.min
    }
}

export default convertBoxToBoundingBox;
