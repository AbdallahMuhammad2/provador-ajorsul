/* Standalone Function: lb */

function lb(d, o) {
    return d == null || d === "http://www.w3.org/1999/xhtml" ? kb(o) : d === "http://www.w3.org/2000/svg" && o === "foreignObject" ? "http://www.w3.org/1999/xhtml" : d
}

export default lb;
