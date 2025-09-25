/* Standalone Function: Ji */

function Ji(d, o) {
    try {
        var c = ""
          , h = o;
        do
            c += Pa(h),
            h = h.return;
        while (h);
        var _ = c
    } catch (b) {
        _ = `
Error generating stack: ` + b.message + `
` + b.stack
    }
    return {
        value: d,
        source: o,
        stack: _,
        digest: null
    }
}

export default Ji;
