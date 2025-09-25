/* Standalone Function: applyDefaultFilter */

function applyDefaultFilter(d) {
    const [o,c] = d.slice(0, -1).split("(");
    if (o === "drop-shadow")
        return d;
    const [h] = c.match(floatRegex) || [];
    if (!h)
        return d;
    const _ = c.replace(h, "");
    let b = maxDefaults.has(o) ? 1 : 0;
    return h !== c && (b *= 100),
    o + "(" + b + _ + ")"
}

export default applyDefaultFilter;
