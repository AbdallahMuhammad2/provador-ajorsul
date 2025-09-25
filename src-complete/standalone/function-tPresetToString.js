/* Standalone Function: tPresetToString */

function tPresetToString(d) {
    return d && typeof d != "string" ? d.path || d.id : d
}

export default tPresetToString;
