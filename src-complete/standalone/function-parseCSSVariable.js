/* Standalone Function: parseCSSVariable */

function parseCSSVariable(d) {
    const o = splitCSSVariableRegex.exec(d);
    if (!o)
        return [, ];
    const [,c,h,_] = o;
    return [`--${c ?? h}`, _]
}

export default parseCSSVariable;
