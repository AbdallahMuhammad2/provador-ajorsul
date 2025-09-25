/* Standalone Function: isFbxFormatASCII */

function isFbxFormatASCII(d) {
    const o = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
    let c = 0;
    function h(_) {
        const b = d[_ - 1];
        return d = d.slice(c + _),
        c++,
        b
    }
    for (let _ = 0; _ < o.length; ++_)
        if (h(1) === o[_])
            return !1;
    return !0
}

export default isFbxFormatASCII;
