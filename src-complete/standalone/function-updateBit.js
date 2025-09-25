/* Standalone Function: updateBit */

function updateBit(d, o, c) {
    return d & ~(1 << o) | (c ? 1 : 0) << o
}

export default updateBit;
