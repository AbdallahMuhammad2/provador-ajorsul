/* Standalone Function: he */

function he(d) {
    return d = d.detail,
    typeof d == "object" && "data"in d ? d.data : null
}

export default he;
