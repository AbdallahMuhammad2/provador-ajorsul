/* Standalone Function: cl */

function cl(d, o, c) {
    var h = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: wa,
        key: h == null ? null : "" + h,
        children: d,
        containerInfo: o,
        implementation: c
    }
}

export default cl;
