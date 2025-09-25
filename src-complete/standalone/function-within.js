/* Standalone Function: within */

function within(d, o, c) {
    return math_max(d, math_min(o, c))
}

export default within;
