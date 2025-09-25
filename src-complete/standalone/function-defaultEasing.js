/* Standalone Function: defaultEasing */

function defaultEasing(d, o) {
    return d.map( () => o || easeInOut).splice(0, d.length - 1)
}

export default defaultEasing;
