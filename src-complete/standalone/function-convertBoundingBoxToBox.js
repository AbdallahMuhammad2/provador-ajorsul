/* Standalone Function: convertBoundingBoxToBox */

function convertBoundingBoxToBox({top: d, left: o, right: c, bottom: h}) {
    return {
        x: {
            min: o,
            max: c
        },
        y: {
            min: d,
            max: h
        }
    }
}

export default convertBoundingBoxToBox;
