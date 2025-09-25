/* Standalone Function: calcViewportAxisConstraints */

function calcViewportAxisConstraints(d, o) {
    let c = o.min - d.min
      , h = o.max - d.max;
    return o.max - o.min < d.max - d.min && ([c,h] = [h, c]),
    {
        min: c,
        max: h
    }
}

export default calcViewportAxisConstraints;
