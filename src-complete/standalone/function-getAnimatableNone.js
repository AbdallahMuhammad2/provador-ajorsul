/* Standalone Function: getAnimatableNone */

function getAnimatableNone(d, o) {
    let c = getDefaultValueType(d);
    return c !== filter && (c = complex),
    c.getAnimatableNone ? c.getAnimatableNone(o) : void 0
}

export default getAnimatableNone;
