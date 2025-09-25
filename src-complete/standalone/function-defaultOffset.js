/* Standalone Function: defaultOffset */

function defaultOffset(d) {
    const o = [0];
    return fillOffset(o, d.length - 1),
    o
}

export default defaultOffset;
