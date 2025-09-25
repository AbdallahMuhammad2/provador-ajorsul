/* Standalone Function: mix */

function mix(d, o, c) {
    return typeof d == "number" && typeof o == "number" && typeof c == "number" ? mixNumber$1(d, o, c) : getMixer$1(d)(d, o)
}

export default mix;
