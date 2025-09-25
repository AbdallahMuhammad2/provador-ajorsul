/* Standalone Function: rb */

function rb(d, o, c) {
    return o == null || typeof o == "boolean" || o === "" ? "" : c || typeof o != "number" || o === 0 || pb.hasOwnProperty(d) && pb[d] ? ("" + o).trim() : o + "px"
}

export default rb;
