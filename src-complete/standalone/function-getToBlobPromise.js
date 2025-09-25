/* Standalone Function: getToBlobPromise */

function getToBlobPromise(d, o) {
    if (d.toBlob !== void 0)
        return new Promise(h => d.toBlob(h, o));
    let c;
    return o === "image/jpeg" ? c = .92 : o === "image/webp" && (c = .8),
    d.convertToBlob({
        type: o,
        quality: c
    })
}

export default getToBlobPromise;
