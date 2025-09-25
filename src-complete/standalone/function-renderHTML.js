/* Standalone Function: renderHTML */

function renderHTML(d, {style: o, vars: c}, h, _) {
    Object.assign(d.style, o, _ && _.getProjectionStyles(h));
    for (const b in c)
        d.style.setProperty(b, c[b])
}

export default renderHTML;
