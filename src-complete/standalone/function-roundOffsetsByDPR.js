/* Standalone Function: roundOffsetsByDPR */

function roundOffsetsByDPR(d, o) {
    var c = d.x
      , h = d.y
      , _ = o.devicePixelRatio || 1;
    return {
        x: round(c * _) / _ || 0,
        y: round(h * _) / _ || 0
    }
}

export default roundOffsetsByDPR;
