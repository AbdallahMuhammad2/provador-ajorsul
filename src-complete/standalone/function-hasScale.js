/* Standalone Function: hasScale */

function hasScale({scale: d, scaleX: o, scaleY: c}) {
    return !isIdentityScale(d) || !isIdentityScale(o) || !isIdentityScale(c)
}

export default hasScale;
