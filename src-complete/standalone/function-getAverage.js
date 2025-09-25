/* Standalone Function: getAverage */

function getAverage(d, o, c, h) {
    let _ = 0;
    for (let b = o, _e = o + c; b < _e; b++)
        _ += d[6 * b + 2 * h];
    return _ / c
}

export default getAverage;
