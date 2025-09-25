/* Standalone Function: removeAxisDelta */

function removeAxisDelta(d, o=0, c=1, h=.5, _, b=d, _e=d) {
    if (percent.test(o) && (o = parseFloat(o),
    o = mixNumber$1(_e.min, _e.max, o / 100) - _e.min),
    typeof o != "number")
        return;
    let nt = mixNumber$1(b.min, b.max, h);
    d === b && (nt -= o),
    d.min = removePointDelta(d.min, o, c, nt, _),
    d.max = removePointDelta(d.max, o, c, nt, _)
}

export default removeAxisDelta;
