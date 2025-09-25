/* Standalone Function: setContent */

function setContent(d, o) {
    tippy_esm_isElement(o.content) ? (dangerouslySetInnerHTML(d, ""),
    d.appendChild(o.content)) : typeof o.content != "function" && (o.allowHTML ? dangerouslySetInnerHTML(d, o.content) : d.textContent = o.content)
}

export default setContent;
