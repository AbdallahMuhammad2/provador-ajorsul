/* Standalone Function: Ka */

function Ka(d) {
    return d === null || typeof d != "object" ? null : (d = Ja && d[Ja] || d["@@iterator"],
    typeof d == "function" ? d : null)
}

export default Ka;
