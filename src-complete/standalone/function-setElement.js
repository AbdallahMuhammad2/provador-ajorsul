/* Standalone Function: setElement */

function setElement(d, o, c) {
    for (let h = 0, _ = c.length; h < _; h++)
        d[o * _ + h] = c[h]
}

export default setElement;
