/* Standalone Function: Ge */

function Ge(d, o) {
    return d === o && (d !== 0 || 1 / d === 1 / o) || d !== d && o !== o
}

export default Ge;
