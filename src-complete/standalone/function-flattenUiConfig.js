/* Standalone Function: flattenUiConfig */

function flattenUiConfig(d, o, c) {
    return c = c ?? [],
    d && d.uiRef && (c.push({
        uiConfig: d,
        parentFolder: o
    }),
    typeof d.children == "function" || [...d.children || []].forEach(h => {
        typeof h != "function" && h && (Array.isArray(h) ? h.forEach(_ => c = flattenUiConfig(_, d.uiRef, c)) : c = flattenUiConfig(h, d.uiRef, c))
    }
    )),
    c
}

export default flattenUiConfig;
