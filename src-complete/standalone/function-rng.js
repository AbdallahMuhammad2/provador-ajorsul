/* Standalone Function: rng */

function rng() {
    if (!getRandomValues && !(getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto)))
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return getRandomValues(rnds8)
}

export default rng;
