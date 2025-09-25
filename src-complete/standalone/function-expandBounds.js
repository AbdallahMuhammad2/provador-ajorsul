/* Standalone Function: expandBounds */

function expandBounds(d, o) {
    for (let c = 0; c < 3; c++)
        o.min[c] = Math.min(d[c], o.min[c]),
        o.max[c] = Math.max(d[c], o.max[c])
}

export default expandBounds;
