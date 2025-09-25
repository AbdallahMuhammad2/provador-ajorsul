/* Standalone Function: setString */

function setString(d, o, c) {
    const h = textEncoder.encode(o + "\0");
    for (let _ = 0; _ < h.length; ++_)
        setUint8(d, h[_], c)
}

export default setString;
