/* Standalone Function: memo */

function memo(d) {
    let o;
    return () => (o === void 0 && (o = d()),
    o)
}

export default memo;
