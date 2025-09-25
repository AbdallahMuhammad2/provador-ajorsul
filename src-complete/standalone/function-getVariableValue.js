/* Standalone Function: getVariableValue */

function getVariableValue(d, o, c=1) {
    const [h,_] = parseCSSVariable(d);
    if (!h)
        return;
    const b = window.getComputedStyle(o).getPropertyValue(h);
    if (b) {
        const _e = b.trim();
        return isNumericalString(_e) ? parseFloat(_e) : _e
    }
    return isCSSVariableToken(_) ? getVariableValue(_, o, c + 1) : _
}

export default getVariableValue;
