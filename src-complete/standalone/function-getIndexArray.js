/* Standalone Function: getIndexArray */

function getIndexArray(d, o=ArrayBuffer) {
    return d > 65535 ? new Uint32Array(new o(4 * d)) : new Uint16Array(new o(2 * d))
}

export default getIndexArray;
