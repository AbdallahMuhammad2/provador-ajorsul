/* Standalone Function: nc */

function nc(d) {
    return d >>>= 0,
    d === 0 ? 32 : 31 - (pc(d) / qc | 0) | 0
}

export default nc;
