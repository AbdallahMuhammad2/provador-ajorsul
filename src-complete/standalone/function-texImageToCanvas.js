/* Standalone Function: texImageToCanvas */

function texImageToCanvas(d, o, c=!1) {
    const h = document.createElement("canvas");
    h.width = Math.min(o, d.width),
    h.height = Math.floor(1 + h.width * d.height / d.width);
    const _ = h.getContext("2d");
    if (!_)
        return console.error("textureToDataUrl: could not get canvas context"),
        h;
    c === !0 && (_.translate(0, h.height),
    _.scale(1, -1));
    let b = !1;
    if (d.data !== void 0) {
        const _e = d;
        if (d.width !== h.width || d.height !== h.height) {
            const nt = document.createElement("canvas");
            nt.width = d.width,
            nt.height = d.height;
            const it = nt.getContext("2d");
            it ? (it.putImageData(_e, 0, 0),
            _.drawImage(nt, 0, 0, h.width, h.height)) : (console.error("textureToDataUrl: could not get temp canvas context"),
            _.putImageData(_e, 0, 0))
        } else
            _.putImageData(_e, 0, 0),
            c && (b = !0)
    } else
        _.drawImage(d, 0, 0, h.width, h.height);
    return b ? Ke$1(h) : h
}

export default texImageToCanvas;
