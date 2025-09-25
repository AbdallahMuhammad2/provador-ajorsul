/* Standalone Function: hashNumber */

function hashNumber(d) {
    return ~~(d * HASH_MULTIPLIER + HASH_ADDITION)
}

export default hashNumber;
