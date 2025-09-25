/* Standalone Function: Sa */

function Sa(d) {
    switch (typeof d) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return d;
    case "object":
        return d;
    default:
        return ""
    }
}

export default Sa;
