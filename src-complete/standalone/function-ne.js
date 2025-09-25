/* Standalone Function: Ne */

function Ne(d) {
    var o = d && d.nodeName && d.nodeName.toLowerCase();
    return o && (o === "input" && (d.type === "text" || d.type === "search" || d.type === "tel" || d.type === "url" || d.type === "password") || o === "textarea" || d.contentEditable === "true")
}

export default Ne;
