/* Standalone Function: getCurrent */

function getCurrent(d) {
    const o = {};
    return d.values.forEach( (c, h) => o[h] = c.get()),
    o
}

export default getCurrent;
