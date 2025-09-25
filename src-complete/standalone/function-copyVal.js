/* Standalone Function: copyVal */

function copyVal(d, o, c) {
    typeof c.copy == "function" && d[o] ? d[o].copy(c) : d[o] = cloneVar(c)
}

export default copyVal;
