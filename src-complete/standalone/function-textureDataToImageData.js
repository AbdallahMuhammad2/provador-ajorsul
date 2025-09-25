/* Standalone Function: textureDataToImageData */

function textureDataToImageData(d, o, c) {
    var h;
    const _ = (h = c == null ? void 0 : c.data) !== null && h !== void 0 ? h : new Uint8ClampedArray(d.height * d.width * 4)
      , b = d.data instanceof Float32Array
      , _e = d.data instanceof Uint16Array;
    for (let nt = 0; nt < _.length; nt++)
        _[nt] = b ? 255 * d.data[nt] : _e ? 255 * three_module.GxU.fromHalfFloat(d.data[nt]) : d.data[nt],
        o === three_module.Zr2 && (_[nt] = 255 * ve$1(_[nt] / 255));
    return c ?? new ImageData(_,d.width,d.height)
}

export default textureDataToImageData;
