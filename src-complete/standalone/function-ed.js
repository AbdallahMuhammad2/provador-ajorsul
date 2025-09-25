/* Standalone Function: ed */

function ed(d, o, c, h) {
    var _ = C
      , b = cd.transition;
    cd.transition = null;
    try {
        C = 1,
        fd(d, o, c, h)
    } finally {
        C = _,
        cd.transition = b
    }
}

export default ed;
