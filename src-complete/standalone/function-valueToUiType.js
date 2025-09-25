/* Standalone Function: valueToUiType */

function valueToUiType(d) {
    return d == null ? null : Array.isArray(d) ? "folder" : typeof d == "boolean" ? "checkbox" : typeof d == "number" ? "number" : typeof d == "string" ? "input" : typeof d == "function" ? "button" : typeof d.x == "number" ? "vec" : typeof d.r == "number" ? "color" : d.isTexture ? "image" : typeof d == "object" ? "folder" : null
}

export default valueToUiType;
