/* Standalone Function: gd */

function gd(d, o, c, h) {
    var _ = C
      , b = cd.transition;
    cd.transition = null;
    try {
        C = 4,
        fd(d, o, c, h)
    } finally {
        C = _,
        cd.transition = b
    }
}

export default gd;
