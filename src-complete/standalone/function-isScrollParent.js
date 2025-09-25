/* Standalone Function: isScrollParent */

function isScrollParent(d) {
    var o = getComputedStyle$1(d)
      , c = o.overflow
      , h = o.overflowX
      , _ = o.overflowY;
    return /auto|scroll|overlay|hidden/.test(c + _ + h)
}

export default isScrollParent;
