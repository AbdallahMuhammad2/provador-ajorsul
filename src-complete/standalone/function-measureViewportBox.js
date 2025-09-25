/* Standalone Function: measureViewportBox */

function measureViewportBox(d, o) {
    return convertBoundingBoxToBox(transformBoxPoints(d.getBoundingClientRect(), o))
}

export default measureViewportBox;
