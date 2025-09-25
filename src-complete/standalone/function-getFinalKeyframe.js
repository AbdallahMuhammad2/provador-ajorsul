/* Standalone Function: getFinalKeyframe */

function getFinalKeyframe(d, {repeat: o, repeatType: c="loop"}, h) {
    const _ = d.filter(isNotNull)
      , b = o && c !== "loop" && o % 2 === 1 ? 0 : _.length - 1;
    return !b || h === void 0 ? _[b] : h
}

export default getFinalKeyframe;
