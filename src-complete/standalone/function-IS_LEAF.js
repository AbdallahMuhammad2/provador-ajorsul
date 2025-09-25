/* Standalone Function: IS_LEAF */

function IS_LEAF(d, o) {
    return o[d + 15] === 65535
}

export default IS_LEAF;
