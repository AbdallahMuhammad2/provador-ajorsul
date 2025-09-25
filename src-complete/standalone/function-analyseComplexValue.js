/* Standalone Function: analyseComplexValue */

function analyseComplexValue(d) {
    const o = d.toString()
      , c = []
      , h = {
        color: [],
        number: [],
        var: []
    }
      , _ = [];
    let b = 0;
    const nt = o.replace(complexRegex, it => (color.test(it) ? (h.color.push(b),
    _.push(COLOR_TOKEN),
    c.push(color.parse(it))) : it.startsWith(VAR_FUNCTION_TOKEN) ? (h.var.push(b),
    _.push(VAR_TOKEN),
    c.push(it)) : (h.number.push(b),
    _.push(NUMBER_TOKEN),
    c.push(parseFloat(it))),
    ++b,
    SPLIT_TOKEN)).split(SPLIT_TOKEN);
    return {
        values: c,
        split: nt,
        indexes: h,
        types: _
    }
}

export default analyseComplexValue;
