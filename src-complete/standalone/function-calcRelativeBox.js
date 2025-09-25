/* Standalone Function: calcRelativeBox */

function calcRelativeBox(d, o, c) {
    calcRelativeAxis(d.x, o.x, c.x),
    calcRelativeAxis(d.y, o.y, c.y)
}

export default calcRelativeBox;
