/* Standalone Function: makeSetterFor */

function makeSetterFor(d, o, c) {
    const h = d[o]
      , _ = () => {
        c == null || c()
    }
    ;
    return h && h.isColor ? b => {
        h.set(b),
        _()
    }
    : h && typeof h.copy == "function" ? b => {
        h.copy(b),
        _()
    }
    : b => {
        d[o] = b,
        _()
    }
}

export default makeSetterFor;
