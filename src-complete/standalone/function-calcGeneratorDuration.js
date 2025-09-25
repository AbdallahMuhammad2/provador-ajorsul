/* Standalone Function: calcGeneratorDuration */

function calcGeneratorDuration(d) {
    let o = 0;
    const c = 50;
    let h = d.next(o);
    for (; !h.done && o < maxGeneratorDuration; )
        o += c,
        h = d.next(o);
    return o >= maxGeneratorDuration ? 1 / 0 : o
}

export default calcGeneratorDuration;
