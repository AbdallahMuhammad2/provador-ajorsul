/* Standalone Function: cloneScriptTag */

function cloneScriptTag(d, o) {
    (o = o ?? document.createElement("script")).type = d.type || "text/javascript",
    o.text = d.text;
    for (let c = 0; c < d.attributes.length; c++) {
        const h = d.attributes[c];
        o.setAttribute(h.name, h.value)
    }
    return o
}

export default cloneScriptTag;
