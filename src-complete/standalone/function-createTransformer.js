/* Standalone Function: createTransformer */

function createTransformer(d) {
    const {split: o, types: c} = analyseComplexValue(d)
      , h = o.length;
    return _ => {
        let b = "";
        for (let _e = 0; _e < h; _e++)
            if (b += o[_e],
            _[_e] !== void 0) {
                const nt = c[_e];
                nt === NUMBER_TOKEN ? b += sanitize(_[_e]) : nt === COLOR_TOKEN ? b += color.transform(_[_e]) : b += _[_e]
            }
        return b
    }
}

export default createTransformer;
