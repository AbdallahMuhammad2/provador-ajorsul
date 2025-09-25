/* Standalone Function: index_modern_clean */

function index_modern_clean(d) {
    const o = [];
    for (const c in d) {
        const h = d[c];
        (Array.isArray(h) && h.length === 0 || h === null || h === "" || h && typeof h == "object" && Object.keys(h).length === 0) && o.push(c)
    }
    for (const c of o)
        delete d[c]
}

export default index_modern_clean;
