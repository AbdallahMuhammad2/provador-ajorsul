/* Standalone Function: renderSVG */

function renderSVG(d, o, c, h) {
    renderHTML(d, o, void 0, h);
    for (const _ in o.attrs)
        d.setAttribute(camelCaseAttributes.has(_) ? _ : camelToDash(_), o.attrs[_])
}

export default renderSVG;
