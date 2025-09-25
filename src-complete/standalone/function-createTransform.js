/* Standalone Function: createTransform */

function createTransform(d, o) {
    return Object.defineProperty(o, "name", {
        value: d
    }),
    o
}

export default createTransform;
