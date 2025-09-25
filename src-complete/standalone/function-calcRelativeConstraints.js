/* Standalone Function: calcRelativeConstraints */

function calcRelativeConstraints(d, {top: o, left: c, bottom: h, right: _}) {
    return {
        x: calcRelativeAxisConstraints(d.x, c, _),
        y: calcRelativeAxisConstraints(d.y, o, h)
    }
}

export default calcRelativeConstraints;
