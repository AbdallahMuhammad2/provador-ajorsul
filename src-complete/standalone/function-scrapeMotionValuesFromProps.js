/* Standalone Function: scrapeMotionValuesFromProps */

function scrapeMotionValuesFromProps(d, o, c) {
    const h = scrapeMotionValuesFromProps$1(d, o, c);
    for (const _ in d)
        if (isMotionValue(d[_]) || isMotionValue(o[_])) {
            const b = transformPropOrder.indexOf(_) !== -1 ? "attr" + _.charAt(0).toUpperCase() + _.substring(1) : _;
            h[b] = d[_]
        }
    return h
}

export default scrapeMotionValuesFromProps;
