/* Standalone Function: getElement */

function getElement(d, o, c) {
    for (let h = 0, _ = c.length; h < _; h++)
        c[h] = d[o * _ + h];
    return c
}

export default getElement;
