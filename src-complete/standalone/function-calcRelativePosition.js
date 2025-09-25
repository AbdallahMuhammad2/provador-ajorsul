/* Standalone Function: calcRelativePosition */

function calcRelativePosition(d, o, c) {
    calcRelativeAxisPosition(d.x, o.x, c.x),
    calcRelativeAxisPosition(d.y, o.y, c.y)
}

export default calcRelativePosition;
