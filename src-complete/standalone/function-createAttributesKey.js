/* Standalone Function: createAttributesKey */

function createAttributesKey(d) {
    let o = "";
    const c = Object.keys(d).sort();
    for (let h = 0, _ = c.length; h < _; h++)
        o += c[h] + ":" + d[c[h]] + ";";
    return o
}

export default createAttributesKey;
