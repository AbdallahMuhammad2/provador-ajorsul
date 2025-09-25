/* Standalone Function: getLongestEdgeIndex */

function getLongestEdgeIndex(d) {
    let o = -1
      , c = -1 / 0;
    for (let h = 0; h < 3; h++) {
        const _ = d[h + 3] - d[h];
        _ > c && (c = _,
        o = h)
    }
    return o
}

export default getLongestEdgeIndex;
