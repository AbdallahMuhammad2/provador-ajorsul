/* Standalone Function: buf2hex */

function buf2hex(d) {
    const o = new Uint8Array(d);
    let c = "";
    for (let h = 0; h < o.length; h++) {
        const _ = o[h];
        c += HEX_CHARS[_ >>> 4 & 15],
        c += HEX_CHARS[15 & _]
    }
    return c
}

export default buf2hex;
