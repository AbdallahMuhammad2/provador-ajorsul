/* Standalone Function: calcViewportConstraints */

function calcViewportConstraints(d, o) {
    return {
        x: calcViewportAxisConstraints(d.x, o.x),
        y: calcViewportAxisConstraints(d.y, o.y)
    }
}

export default calcViewportConstraints;
